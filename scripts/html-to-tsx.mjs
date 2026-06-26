#!/usr/bin/env node
/**
 * Converts public/slides/N.html → components/slides/SlideNN.tsx + styles/SlideNN.css
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scopeSlideCss } from "./scope-slide-css.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SLIDES_DIR = path.join(ROOT, "public", "slides");
const OUT_DIR = path.join(ROOT, "components", "slides");
const CSS_DIR = path.join(OUT_DIR, "styles");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function stripGlobalRules(css) {
  return css
    .replace(/:root\s*\{[\s\S]*?\}/gi, "")
    .replace(/(^|\n)\s*html\s*\{[\s\S]*?\}/gi, "")
    .replace(/(^|\n)\s*body\s*\{[\s\S]*?\}/gi, "")
    .replace(/^\*\s*\{[\s\S]*?\}/m, "")
    .replace(
      /\[data-motion="([^"]+)"\s+data-motion-tier="([^"]+)"\]/g,
      '[data-motion="$1"][data-motion-tier="$2"]',
    )
    .trim();
}

function extractMotion(html) {
  const match = html.match(/data-motion="([^"]+)"/);
  const tierMatch = html.match(/data-motion-tier="([^"]+)"/);
  return {
    motion: match?.[1] ?? "cards",
    tier: tierMatch?.[1] ?? "medium",
  };
}

function extractStyles(html) {
  const styles = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html))) {
    styles.push(m[1]);
  }
  return stripGlobalRules(styles.join("\n"));
}

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) return "";
  return match[1].replace(/<script[\s\S]*?<\/script>/gi, "").trim();
}

function prepareBodyHtml(bodyHtml) {
  let s = bodyHtml;
  s = s.replace(/\sdata-motion="[^"]*"/g, "");
  s = s.replace(/\sdata-motion-tier="[^"]*"/g, "");
  s = s.replace(/src="assets\//g, 'src="/report_fassmid/assets/slides/');
  s = s.replace(/src='assets\//g, "src='/report_fassmid/assets/slides/");
  return s.trim();
}

function escapeTemplateLiteral(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function convertSlide(id) {
  const htmlPath = path.join(SLIDES_DIR, `${id}.html`);
  if (!fs.existsSync(htmlPath)) {
    console.warn(`Skip missing: ${htmlPath}`);
    return false;
  }

  const html = fs.readFileSync(htmlPath, "utf8");
  const css = scopeSlideCss(extractStyles(html), id);
  const bodyHtml = prepareBodyHtml(extractBody(html));
  const { motion, tier } = extractMotion(bodyHtml + html);

  const name = `Slide${pad2(id)}`;
  const cssFile = `styles/${name}.css`;

  fs.writeFileSync(path.join(CSS_DIR, `${name}.css`), css, "utf8");

  const tsx = `"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./${cssFile}";

const SLIDE_HTML = \`${escapeTemplateLiteral(bodyHtml)}\`;

export default function ${name}() {
  return (
    <SlideCanvas slideId={${id}} motion="${motion}" motionTier="${tier}">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
`;

  fs.writeFileSync(path.join(OUT_DIR, `${name}.tsx`), tsx, "utf8");
  console.log(`Converted slide ${id} → ${name}.tsx`);
  return true;
}

fs.mkdirSync(CSS_DIR, { recursive: true });

const start = Number(process.argv[2] ?? "1");
const end = Number(process.argv[3] ?? "38");

for (let i = start; i <= end; i++) {
  convertSlide(i);
}

console.log("Done.");
