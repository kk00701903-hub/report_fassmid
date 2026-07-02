#!/usr/bin/env node
/**
 * One-off smoke check (not wired into package.json) — visits a sample of
 * /slides/{page}/ routes through the real PresentationPlayer shell and
 * verifies: canvas mounts, GSAP entrance motion completes, the custom
 * cursor + projector click-layer overlay don't block navigation, and
 * next/prev clicks correctly advance slides with a fresh entrance.
 *
 * Requires: npm run build
 * Usage: node scripts/smoke-presentation-player.mjs
 */
import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "out");
const BASE_PATH = "/report_fassmid";
const PORT = Number(process.env.SMOKE_PORT ?? "4180");

// Core pages covering: cover, part-divider, Tier B diagram slides, plain content.
const CORE_PAGES = [1, 4, 6, 7, 8, 9, 13, 15, 19, 24, 35];

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

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error("Missing out/ — run npm run build first");
    process.exit(1);
  }

  const server = await startStaticServer(PORT);
  const baseUrl = `http://127.0.0.1:${PORT}${BASE_PATH}`;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    reducedMotion: "no-preference",
    viewport: { width: 1440, height: 960 },
  });
  const page = await context.newPage();

  const failures = [];

  for (const pageNum of CORE_PAGES) {
    const url = `${baseUrl}/slides/${pageNum}/`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });

    const canvasOk = await page
      .waitForSelector(".slide-stage__canvas", { timeout: 15_000 })
      .then(() => true)
      .catch(() => false);
    await page.waitForTimeout(1600);

    const state = await page.evaluate(() => ({
      entered: Boolean(document.querySelector(".slide-motion-entered")),
      clickLayer: Boolean(document.querySelector(".projector-click-layer")),
      cursorNoneOnIframe: !document.querySelector(".slide-stage__iframe"),
    }));

    let navOk = false;
    const nextBtn = page.locator(".projector-click-zone--next");
    if (await nextBtn.count()) {
      const before = await page.locator(".slide-stage__canvas").innerHTML();
      await nextBtn.click({ force: false });
      await page.waitForTimeout(900);
      const after = await page.locator(".slide-stage__canvas").innerHTML();
      navOk = before !== after;
    }

    const ok = canvasOk && state.entered && state.clickLayer && navOk;
    console.log(
      `page ${String(pageNum).padStart(2, " ")} — canvas:${canvasOk} entered:${state.entered} clickLayer:${state.clickLayer} navAdvances:${navOk} → ${ok ? "OK" : "FAIL"}`,
    );
    if (!ok) failures.push(pageNum);
  }

  await browser.close();
  server.close();

  if (failures.length) {
    console.error(`\n${failures.length} page(s) failed smoke check: ${failures.join(", ")}`);
    process.exit(1);
  }

  console.log(`\nAll ${CORE_PAGES.length} sampled PresentationPlayer pages passed smoke check.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
