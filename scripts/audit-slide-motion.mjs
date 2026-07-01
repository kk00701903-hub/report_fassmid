#!/usr/bin/env node
/**
 * Verify diagram motion on key slides (Framer Motion transform changes over time).
 * Requires: npm run build
 * Usage: node scripts/audit-slide-motion.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { existsSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "out");
const BASE_PATH = "/report_fassmid";
const DEFAULT_PORT = Number(process.env.MOTION_AUDIT_PORT ?? "4179");

/** deck page → slideId in URL (audit route) */
const TARGETS = [
  { page: 3, slideId: 3, kind: "text", selector: ".arch-flow-caption", label: "3-Tier arch flow" },
  { page: 4, slideId: 4, kind: "svg-d", selector: ".s04-tier-hero--logistics path", label: "Docker logistics wave" },
  { page: 7, slideId: 7, kind: "transform", selector: ".s07-hub__core", label: "AI hub core pulse" },
  { page: 23, slideId: 23, kind: "transform", selector: ".s23-spot-visual", label: "Tech spotlights" },
  { page: 26, slideId: 26, kind: "count", selector: ".circuit-pipeline__wires circle", label: "CI/CD pipeline wires" },
];

async function startStaticServer(port) {
  const handler = async (req, res) => {
    const url = new URL(req.url ?? "/", `http://127.0.0.1:${port}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.startsWith(BASE_PATH)) pathname = pathname.slice(BASE_PATH.length) || "/";
    if (pathname.endsWith("/")) pathname += "index.html";
    if (pathname === "/") pathname = "/index.html";

    const filePath = join(OUT_DIR, pathname.replace(/^\//, ""));
    const { readFile } = await import("node:fs/promises");
    try {
      const data = await readFile(filePath);
      const ext = filePath.split(".").pop()?.toLowerCase();
      const types = { html: "text/html", js: "text/javascript", css: "text/css", json: "application/json" };
      res.writeHead(200, { "Content-Type": types[ext] ?? "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  };

  return new Promise((resolvePromise, reject) => {
    const server = http.createServer(handler);
    server.on("error", reject);
    server.listen(port, "127.0.0.1", () => resolvePromise(server));
  });
}

async function sampleTransform(page, selector) {
  return page.evaluate((sel) => {
    const pick =
      document.querySelector(sel) ??
      document.querySelector(sel.split(",")[0]?.trim() ?? sel);
    if (!pick) return null;
    const style = window.getComputedStyle(pick);
    return {
      transform: style.transform,
      opacity: style.opacity,
      animationName: style.animationName,
    };
  }, selector);
}

async function motionChanged(before, after) {
  if (!before || !after) return false;
  return before.transform !== after.transform || before.opacity !== after.opacity;
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error("Missing out/ — run npm run build first");
    process.exit(1);
  }

  const port = DEFAULT_PORT;
  const server = await startStaticServer(port);
  const baseUrl = process.argv[2] ?? `http://127.0.0.1:${port}${BASE_PATH}`;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    reducedMotion: "no-preference",
    viewport: { width: 1280, height: 900 },
  });
  await context.addInitScript(() => {
    localStorage.removeItem("fass-presentation-config");
    localStorage.removeItem("fass-presentation-title-version");
  });
  const page = await context.newPage();

  const results = [];

  for (const target of TARGETS) {
    const url = `${baseUrl}/audit/${target.slideId}/`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForSelector(".slide-canvas-root", { timeout: 25_000, state: "attached" });
    await page.waitForSelector(".slide-motion-entered", { timeout: 12_000 }).catch(() => undefined);
    await page.waitForTimeout(1600);

    let moving = false;
    let samples = {};

    if (target.kind === "text") {
      const before = await page.textContent(target.selector);
      await page.waitForTimeout(2600);
      const after = await page.textContent(target.selector);
      moving = Boolean(before && after && before !== after);
      samples = { before, after };
    } else if (target.kind === "svg-d") {
      const before = await page.evaluate((sel) => document.querySelector(sel)?.getAttribute("d") ?? null, target.selector);
      await page.waitForTimeout(1200);
      const after = await page.evaluate((sel) => document.querySelector(sel)?.getAttribute("d") ?? null, target.selector);
      moving = Boolean(before && after && before !== after);
      samples = { before: before?.slice(0, 40), after: after?.slice(0, 40) };
    } else if (target.kind === "count") {
      const count = await page.locator(target.selector).count();
      moving = count > 0;
      samples = { count };
    } else {
      const before = await sampleTransform(page, target.selector);
      await page.waitForTimeout(900);
      const mid = await sampleTransform(page, target.selector);
      await page.waitForTimeout(900);
      const after = await sampleTransform(page, target.selector);
      moving =
        (await motionChanged(before, mid)) ||
        (await motionChanged(mid, after)) ||
        Boolean(before?.animationName && before.animationName !== "none");
      samples = { before, mid, after };
    }

    results.push({
      page: target.page,
      slideId: target.slideId,
      label: target.label,
      selector: target.selector,
      moving,
      samples,
    });
  }

  await browser.close();
  server.close();

  const outFile = join(ROOT, "slide-motion-audit.json");
  writeFileSync(outFile, JSON.stringify(results, null, 2));

  const failed = results.filter((r) => !r.moving);
  for (const r of results) {
    const status = r.moving ? "OK" : "FAIL";
    console.log(`[${status}] page ${r.page} (slide ${r.slideId}) — ${r.label}`);
  }

  if (failed.length) {
    console.error(`\n${failed.length} slide(s) without detected motion. See ${outFile}`);
    process.exit(1);
  }

  console.log(`\nAll ${results.length} targets show motion.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
