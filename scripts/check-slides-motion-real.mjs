#!/usr/bin/env node
/**
 * Verifies Tier B (looping/continuous) motion on the *real* production
 * routes — /slides/{page}/ — as rendered inside PresentationPlayer /
 * SlideStage, rather than the isolated /audit/{slideId}/ routes.
 *
 * This exists because SlideStage wraps every slide in AnimatePresence +
 * Suspense, which previously froze looping animations even though the
 * isolated /audit/ routes (no AnimatePresence/Suspense wrapper) reported
 * them as fine. See SlideStage.tsx for the root-cause note.
 *
 * Requires: npm run build
 * Usage: node scripts/check-slides-motion-real.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { existsSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import http from "node:http";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "out");
const BASE_PATH = "/report_fassmid";
const DEFAULT_PORT = Number(process.env.MOTION_AUDIT_PORT ?? "4180");

const { DECK_MANIFEST } = await import(pathToFileURL(join(ROOT, "lib", "deckManifest.ts")));
const { SLIDE_MOTION_AUDIT_TARGETS } = await import(
  pathToFileURL(join(ROOT, "lib", "slideMotionAuditTargets.ts"))
);

const TARGET_BY_SLIDE_ID = new Map(SLIDE_MOTION_AUDIT_TARGETS.map((t) => [t.slideId, t]));

const DECK_ENTRIES = DECK_MANIFEST.map((entry, index) => ({
  page: index + 1,
  slideId: entry.slideId,
  title: entry.title,
}));

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

async function sampleStyle(page, selector, properties) {
  return page.evaluate(
    ({ sel, props }) => {
      const pick = document.querySelector(sel) ?? document.querySelector(sel.split(",")[0]?.trim() ?? sel);
      if (!pick) return null;
      const style = window.getComputedStyle(pick);
      const out = { animationName: style.animationName };
      for (const prop of props) out[prop] = style[prop] ?? style.getPropertyValue(prop);
      return out;
    },
    { sel: selector, props: properties },
  );
}

function styleChanged(before, after) {
  if (!before || !after) return false;
  return Object.keys(before).some((key) => before[key] !== after[key]);
}

async function checkTierB(page, target) {
  if (!target) return null;

  if (target.kind === "text") {
    const before = await page.textContent(target.selector).catch(() => null);
    await page.waitForTimeout(2600);
    const after = await page.textContent(target.selector).catch(() => null);
    return { moving: Boolean(before && after && before !== after), samples: { before, after } };
  }

  if (target.kind === "svg-d") {
    const read = () => page.evaluate((sel) => document.querySelector(sel)?.getAttribute("d") ?? null, target.selector);
    const before = await read();
    await page.waitForTimeout(1200);
    const after = await read();
    return {
      moving: Boolean(before && after && before !== after),
      samples: { before: before?.slice(0, 40), after: after?.slice(0, 40) },
    };
  }

  if (target.kind === "count") {
    const count = await page.locator(target.selector).count();
    return { moving: count > 0, samples: { count } };
  }

  if (target.kind === "attr") {
    const read = () =>
      page.evaluate(
        ({ sel, attr }) => document.querySelector(sel)?.getAttribute(attr) ?? null,
        { sel: target.selector, attr: target.attribute },
      );
    const before = await read();
    await page.waitForTimeout(900);
    const mid = await read();
    await page.waitForTimeout(900);
    const after = await read();
    return {
      moving: Boolean(before !== null && (before !== mid || mid !== after)),
      samples: { before, mid, after },
    };
  }

  const properties = target.properties ?? ["transform", "opacity"];
  const before = await sampleStyle(page, target.selector, properties);
  await page.waitForTimeout(900);
  const mid = await sampleStyle(page, target.selector, properties);
  await page.waitForTimeout(900);
  const after = await sampleStyle(page, target.selector, properties);

  const moving =
    styleChanged(before, mid) ||
    styleChanged(mid, after) ||
    Boolean(before?.animationName && before.animationName !== "none");

  return { moving, samples: { before, mid, after } };
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

  const entriesWithTargets = DECK_ENTRIES.filter((e) => TARGET_BY_SLIDE_ID.has(e.slideId));
  const results = [];

  for (const entry of entriesWithTargets) {
    const url = `${baseUrl}/slides/${entry.page}/`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForSelector(".slide-canvas-root", { timeout: 20_000, state: "attached" }).catch(() => undefined);
    await page.waitForTimeout(1500);

    const target = TARGET_BY_SLIDE_ID.get(entry.slideId);
    const tierB = await checkTierB(page, target);

    results.push({ page: entry.page, slideId: entry.slideId, title: entry.title, tierB });
  }

  await browser.close();
  server.close();

  const outFile = join(ROOT, "slide-motion-real-routes.json");
  writeFileSync(outFile, JSON.stringify(results, null, 2));

  for (const r of results) {
    const status = r.tierB?.moving ? "OK" : "FAIL";
    console.log(`page ${String(r.page).padStart(2, " ")} (slide ${r.slideId}) — Tier B on /slides/: ${status} — ${r.title}`);
  }

  const failures = results.filter((r) => !r.tierB?.moving);
  console.log(`\n${results.length} slides with registered Tier B targets checked on real /slides/ routes.`);

  if (failures.length) {
    console.error(`\n${failures.length} slide(s) still frozen on real routes:`);
    for (const r of failures) console.error(`  - page ${r.page} (slide ${r.slideId}) ${r.title}`);
    console.error(`\nSee ${outFile} for details.`);
    process.exit(1);
  }

  console.log("\nAll registered Tier B diagrams show motion on the real /slides/ routes.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
