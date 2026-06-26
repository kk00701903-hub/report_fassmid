#!/usr/bin/env node
/**
 * Migrate content slides to Fluent CEO theme.
 * - Adds fluent-slide class to TSX root elements
 * - Rewrites SlideNN.css token colors for light theme
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SLIDES_DIR = path.join(ROOT, "components", "slides");
const CSS_DIR = path.join(SLIDES_DIR, "styles");

const EXCLUDED = new Set([1, 2, 12, 21, 26, 35]);
const CONTENT_SLIDES = Array.from({ length: 39 }, (_, i) => i + 1).filter((id) => !EXCLUDED.has(id));

const ROOT_CLASS_PATTERNS = [
  "slide fluent-slide",
  "slide-root fluent-slide",
  "fass-summary-slide-root fluent-slide",
  "fass-identity-slide-root fluent-slide",
  "fass-closing-slide-root fluent-slide",
  "roi-asset-slide-root fluent-slide",
  "engine-slide-root fluent-slide",
  "fass-slide-root fluent-slide",
  "migration-slide-root fluent-slide",
  "slide-root-container fluent-slide",
];

function addFluentSlideToTsx(content, slideId) {
  if (content.includes("fluent-slide")) return content;

  // Slide17 uses React wrapper
  if (slideId === 17) {
    return content.replace(
      /className="slide-root"/,
      'className="slide-root fluent-slide"',
    );
  }

  // Slide18 uses React wrapper
  if (slideId === 18) {
    return content.replace(
      /className="slide-root s18-root"/,
      'className="slide-root fluent-slide s18-root"',
    );
  }

  const rootClasses = [
    "fluent-slide",
    "slide",
    "slide-root",
    "fass-summary-slide-root",
    "fass-identity-slide-root",
    "fass-closing-slide-root",
    "roi-asset-slide-root",
    "engine-slide-root",
    "fass-slide-root",
    "migration-slide-root",
    "slide-root-container",
    "war-room-slide-root",
    "poc-slide-root",
    "roadmap-slide-root",
  ];

  for (const cls of rootClasses) {
    const re = new RegExp(`class="(${cls})([^"]*)"`, "g");
    if (re.test(content)) {
      return content.replace(
        new RegExp(`class="(${cls})([^"]*)"`, "g"),
        (match, c, rest) => {
          if (rest.includes("fluent-slide")) return match;
          return `class="${c} fluent-slide${rest}"`;
        },
      );
    }
  }

  return content;
}

function migrateCss(css) {
  let out = css;

  // Remove dark radial gradient overlays on slide roots
  out = out.replace(
    /\.slide-s\d+ \.(?:slide|slide-root|fluent-slide|engine-slide-root|fass-slide-root|roi-asset-slide-root|fass-summary-slide-root|fass-closing-slide-root|fass-identity-slide-root|migration-slide-root)::before\s*\{[^}]*\}/gs,
    "",
  );

  // Token remaps
  const replacements = [
    [/background-color:\s*var\(--ppt-bg\)/g, "background-color: var(--fluent-bg, #ffffff)"],
    [/background:\s*var\(--ppt-bg\)/g, "background: var(--fluent-bg, #ffffff)"],
    [/var\(--ppt-bg-soft\)/g, "var(--fluent-card-bg, #f8f8f8)"],
    [/var\(--ppt-surface\)/g, "var(--fluent-surface, #ffffff)"],
    [/var\(--ppt-surface-2\)/g, "#f3f2f1"],
    [/var\(--ppt-border\)/g, "var(--fluent-border, #d2d0ce)"],
    [/var\(--ppt-text-1\)/g, "var(--fluent-grey-160, #201f1e)"],
    [/var\(--ppt-text-2\)/g, "var(--fluent-grey-130, #484644)"],
    [/var\(--ppt-text-3\)/g, "var(--fluent-grey-90, #8a8886)"],
    [/var\(--ppt-accent\)/g, "var(--fluent-blue, #0078d4)"],
    [/var\(--ppt-accent-2\)/g, "var(--fluent-blue, #0078d4)"],
    [/var\(--ppt-good\)/g, "var(--fluent-good, #107c10)"],
    [/rgba\(0,\s*240,\s*255/g, "rgba(0, 120, 212"],
    [/#00f0ff/gi, "#0078d4"],
    [/rgba\(10,\s*14,\s*26/g, "rgba(255, 255, 255"],
    [/rgba\(255,\s*255,\s*255,\s*0\.0[0-6]\)/g, "rgba(0, 0, 0, 0.04)"],
    [/rgba\(255,\s*255,\s*255,\s*0\.1\)/g, "rgba(0, 0, 0, 0.08)"],
    [/rgba\(255,\s*255,\s*255,\s*0\.06\)/g, "rgba(0, 0, 0, 0.05)"],
    [/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, "rgba(0, 0, 0, 0.04)"],
    [/background:\s*#0a0e1a/g, "background: #ffffff"],
    [/background-color:\s*#0a0e1a/g, "background-color: #ffffff"],
    [/background:\s*#141b2d/g, "background: #f8f8f8"],
    [/background-color:\s*#141b2d/g, "background-color: #f8f8f8"],
    [/background:\s*#1e2638/g, "background: #ffffff"],
    [/color:\s*#fff\b/g, "color: var(--fluent-grey-160, #201f1e)"],
    [/color:\s*#ffffff\b/gi, "color: var(--fluent-grey-160, #201f1e)"],
    [/color:\s*#FDE68A/g, "color: var(--fluent-warn, #ca5010)"],
    [/color:\s*#94a3b8/g, "color: var(--fluent-grey-130, #484644)"],
    [/border:\s*1px solid #334155/g, "border: 1px solid var(--fluent-border, #d2d0ce)"],
    [/border-color:\s*rgba\(255,\s*192,\s*0/g, "border-color: rgba(0, 120, 212"],
    [/box-shadow:\s*0 0 28px rgba\(255,\s*192,\s*0/g, "box-shadow: 0 2px 8px rgba(0, 120, 212"],
  ];

  for (const [re, rep] of replacements) {
    out = out.replace(re, rep);
  }

  // Bump very small body fonts (11-12px -> min 13px) for CEO readability
  out = out.replace(/font-size:\s*10\.5px/g, "font-size: 12px");
  out = out.replace(/font-size:\s*10px/g, "font-size: 12px");
  out = out.replace(/font-size:\s*11px/g, "font-size: 13px");
  out = out.replace(/font-size:\s*11\.5px/g, "font-size: 13px");
  out = out.replace(/font-size:\s*12\.5px/g, "font-size: 14px");
  out = out.replace(/font-size:\s*12px/g, "font-size: 14px");

  // Add box-shadow to cards missing elevation on light bg
  out = out.replace(
    /(\.(?:milestone-card|term|tool-card|panel|strat|sprint|summary-column-item|vision-pillar-card)\b[^{]*\{[^}]*background:[^;]+;)(?![^}]*box-shadow)/g,
    "$1\n  box-shadow: var(--fluent-shadow, 0 2px 8px rgba(0,0,0,0.08));",
  );

  return out.replace(/\n{3,}/g, "\n\n");
}

let tsxCount = 0;
let cssCount = 0;

for (const id of CONTENT_SLIDES) {
  const nn = String(id).padStart(2, "0");
  const tsxPath = path.join(SLIDES_DIR, `Slide${nn}.tsx`);
  const cssPath = path.join(CSS_DIR, `Slide${nn}.css`);

  if (fs.existsSync(tsxPath)) {
    const before = fs.readFileSync(tsxPath, "utf8");
    const after = addFluentSlideToTsx(before, id);
    if (after !== before) {
      fs.writeFileSync(tsxPath, after);
      tsxCount++;
    }
  }

  if (fs.existsSync(cssPath)) {
    const before = fs.readFileSync(cssPath, "utf8");
    const after = migrateCss(before);
    if (after !== before) {
      fs.writeFileSync(cssPath, after);
      cssCount++;
    }
  }
}

console.log(`Migrated ${tsxCount} TSX files, ${cssCount} CSS files (${CONTENT_SLIDES.length} content slides).`);
