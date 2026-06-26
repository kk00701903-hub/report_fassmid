#!/usr/bin/env node
/**
 * Normalize slide CSS for 4:3 vertical fill:
 * - Remove per-slide title padding overrides (global tokens apply)
 * - Stretch body stacks instead of center clustering
 * - PART dividers: space-between + padding-block
 * - Relax UX compact title/body padding
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSS_DIR = path.join(__dirname, "..", "components", "slides", "styles");

const TITLE_SEL =
  /\.(title-r|title-region|title-region-wrapper|title-region-container)\b/;
const STACK_SEL = /\.(stack|phase-stack|cat-body)\b/;
const SECTION_SEL = /\.section-slide-root\b/;
const CLOSING_SEL = /\.(fass-closing-slide-root|fass-closing-content-body)\b/;

function stripProp(body, prop) {
  return body.replace(new RegExp(`${prop}\\s*:[^;]+;?`, "gi"), "");
}

function ensureProp(body, prop, value) {
  const re = new RegExp(`${prop}\\s*:`, "i");
  if (re.test(body)) {
    return body.replace(new RegExp(`${prop}\\s*:[^;]+;?`, "i"), `${prop}:${value};`);
  }
  const trimmed = body.trimEnd();
  const sep = trimmed.length && !trimmed.endsWith(";") ? ";" : "";
  return `${trimmed}${sep}${prop}:${value};`;
}

function processRule(selector, body, inUxCompact) {
  let b = body;

  if (TITLE_SEL.test(selector)) {
    b = stripProp(b, "padding");
    if (inUxCompact && !b.replace(/;/g, "").trim()) return null;
  }

  if (SECTION_SEL.test(selector)) {
    b = b.replace(/justify-content\s*:\s*center/gi, "justify-content:space-between");
    if (!/padding-block/i.test(b)) {
      b = stripProp(b, "padding");
      b = ensureProp(b, "padding", "48px 80px");
    }
    b = ensureProp(b, "box-sizing", "border-box");
  }

  if (STACK_SEL.test(selector) && !/term-icon|phase-num|node-icon|item-ico|strat-ico/i.test(selector)) {
    b = b.replace(/justify-content\s*:\s*center/gi, "justify-content:stretch");
    if (!/flex\s*:/i.test(b)) b = ensureProp(b, "flex", "1 1 auto");
    b = ensureProp(b, "min-height", "0");
  }

  if (CLOSING_SEL.test(selector)) {
    b = b.replace(/justify-content\s*:\s*center/gi, "justify-content:space-between");
  }

  if (inUxCompact && /\.body\b/.test(selector)) {
    b = stripProp(b, "padding");
  }

  b = b.replace(/;\s*;/g, ";").trim();
  if (!b) return null;
  return b;
}

function processCss(css) {
  let inUxCompact = false;
  return css.replace(/(\/\*[\s\S]*?\*\/)|([^{}]+)\{([^{}]*)\}/g, (match, comment, selector, body) => {
    if (comment) {
      if (/UX compact/i.test(comment)) inUxCompact = true;
      return comment;
    }
    const sel = selector.trim();
    const processed = processRule(sel, body, inUxCompact);
    if (processed === null) return "";
    return `${selector}{${processed}}`;
  });
}

let changed = 0;
for (const file of fs.readdirSync(CSS_DIR).filter((f) => /^Slide\d+\.css$/.test(f))) {
  const fp = path.join(CSS_DIR, file);
  const before = fs.readFileSync(fp, "utf8");
  const after = processCss(before);
  if (after !== before) {
    fs.writeFileSync(fp, after, "utf8");
    changed++;
    console.log("updated", file);
  }
}
console.log(`fill-slide-layout: ${changed} files updated`);
