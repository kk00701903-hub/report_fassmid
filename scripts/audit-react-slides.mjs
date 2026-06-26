#!/usr/bin/env node
/**
 * Audit React slides for overflow (>720px) and content overlap.
 * Requires: npm run build (static export in out/)
 * Usage: node scripts/audit-react-slides.mjs [baseUrl] [slideCount]
 */
import { chromium } from "playwright";
import { writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "out");
const BASE_PATH = "/report_fassmid";
const SLIDE_H = 720;
const SLIDE_W = 960;

const DEFAULT_PORT = Number(process.env.AUDIT_PORT ?? "4178");
const baseUrlArg = process.argv[2];
const slideCount = Number(process.argv[3] ?? "39");
const outPath = process.argv[4] ?? join(ROOT, "slide-audit-react.json");

const BODY_SELECTORS = [
  ".body",
  ".content",
  ".flow-main",
  ".milestone-grid",
  ".phase-stack",
  ".finops-main-content-layout",
  ".migration-content-wrapper",
].join(",");

async function startStaticServer(port) {
  const handler = async (req, res) => {
    const url = new URL(req.url ?? "/", `http://127.0.0.1:${port}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.startsWith(BASE_PATH)) {
      pathname = pathname.slice(BASE_PATH.length) || "/";
    }
    if (pathname.endsWith("/")) pathname += "index.html";
    if (pathname === "/") pathname = "/index.html";

    const filePath = join(OUT_DIR, pathname.replace(/^\//, "").replace(/\//g, "\\"));
    const { readFile } = await import("node:fs/promises");
    try {
      const data = await readFile(filePath);
      const ext = filePath.split(".").pop()?.toLowerCase();
      const types = {
        html: "text/html",
        js: "text/javascript",
        css: "text/css",
        json: "application/json",
        png: "image/png",
        svg: "image/svg+xml",
        woff2: "font/woff2",
      };
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

async function findFreePort(start) {
  for (let port = start; port < start + 20; port++) {
    try {
      const server = await startStaticServer(port);
      return { server, port };
    } catch (e) {
      if (e.code !== "EADDRINUSE") throw e;
    }
  }
  throw new Error("No free port for audit server");
}

async function auditSlide(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForSelector(".slide-canvas-root", { timeout: 45000, state: "attached" });
  await page.waitForTimeout(1200);

  return page.evaluate(
    ({ slideH, slideW, bodySelectors }) => {
      const canvas = document.querySelector(".slide-canvas-root");
      if (!canvas) return { error: "no canvas" };

      const canvasRect = canvas.getBoundingClientRect();
      const inner =
        canvas.querySelector(".slide, .slide-root, .fass-report-slide-root, .section-slide-root") ??
        canvas.querySelector(".slide-canvas-inner > div");

      const bodyRoot =
        canvas.querySelector(bodySelectors) ??
        canvas.querySelector(".body, .content, [class*='content']");

      const candidates = bodyRoot
        ? Array.from(
            bodyRoot.querySelectorAll(
              "div, section, article, ul, ol, table, p, h1, h2, h3, .card, .layer, .phase, .milestone-card, .tool-card, .flow-col",
            ),
          )
        : [];

      const visible = candidates.filter((el) => {
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return false;
        const r = el.getBoundingClientRect();
        return r.width > 8 && r.height > 8;
      });

      const overlaps = [];
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const a = visible[i];
          const b = visible[j];
          if (a.contains(b) || b.contains(a)) continue;

          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          const xO = Math.max(0, Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left));
          const yO = Math.max(0, Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top));
          const area = xO * yO;
          if (area >= 120) {
            overlaps.push({
              a: `${a.className || a.tagName}`.slice(0, 60),
              b: `${b.className || b.tagName}`.slice(0, 60),
              area: Math.round(area),
            });
          }
        }
      }

      const belowFold = visible.filter((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom > canvasRect.bottom + 2;
      }).length;

      const overflow =
        canvas.scrollHeight > canvas.clientHeight + 2 ||
        Boolean(inner && inner.scrollHeight > canvas.clientHeight + 2);

      return {
        scrollHeight: canvas.scrollHeight,
        clientHeight: canvas.clientHeight,
        innerHeight: inner?.getBoundingClientRect().height ?? null,
        overflow,
        belowFold,
        overlapCount: overlaps.length,
        overlaps: overlaps.slice(0, 8),
      };
    },
    { slideH: SLIDE_H, slideW: SLIDE_W, bodySelectors: BODY_SELECTORS },
  );
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error("Missing out/ — run npm run build first");
    process.exit(1);
  }

  let server = null;
  let auditBase = baseUrlArg;
  if (!auditBase) {
    const found = await findFreePort(DEFAULT_PORT);
    server = found.server;
    auditBase = `http://127.0.0.1:${found.port}${BASE_PATH}`;
    console.log(`Serving ${OUT_DIR} at ${auditBase}`);
  }

  const browser = await chromium.launch({ headless: true });

  const results = [];
  for (let i = 1; i <= slideCount; i++) {
    const url = `${auditBase}/audit/${i}/`;
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.addInitScript(() => {
      localStorage.removeItem("fass-presentation-config");
      localStorage.removeItem("fass-presentation-title-version");
    });
    const page = await context.newPage();
    try {
      const info = await auditSlide(page, url);
      results.push({ slide: i, url, ...info });
      const flag = info.overflow || (info.overlapCount ?? 0) > 3 ? " !" : "";
      console.log(
        `slide ${String(i).padStart(2)}: overflow=${info.overflow} overlaps=${info.overlapCount} belowFold=${info.belowFold}${flag}`,
      );
    } catch (e) {
      results.push({ slide: i, url, error: String(e) });
      console.log(`slide ${i}: ERROR ${e.message ?? e}`);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  if (server) server.close();

  writeFileSync(outPath, JSON.stringify(results, null, 2));
  const overflow = results.filter((r) => r.overflow);
  const highOverlap = results.filter((r) => (r.overlapCount ?? 0) > 3);
  console.log(`\nWrote ${outPath}`);
  console.log(`Overflow: ${overflow.length}, high overlap (>3): ${highOverlap.length}`);
  overflow.forEach((r) => console.log(`  overflow slide ${r.slide}: scroll=${r.scrollHeight}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
