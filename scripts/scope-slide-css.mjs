#!/usr/bin/env node
/**
 * Scope slide CSS under .slide-s{NN} to prevent cross-slide global class collisions.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CSS_DIR = path.join(ROOT, "components", "slides", "styles");
const TSX_DIR = path.join(ROOT, "components", "slides");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function scopeClass(slideId) {
  return `.slide-s${pad2(slideId)}`;
}

function stripCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function fixBrokenSelectors(css) {
  return css.replace(
    /\[data-motion="([^"]+)"\s+data-motion-tier="([^"]+)"\]/g,
    '[data-motion="$1"][data-motion-tier="$2"]',
  );
}

function prefixSelectorList(selectors, scope) {
  return selectors
    .split(",")
    .map((raw) => {
      const selector = raw.trim();
      if (!selector) return selector;
      if (selector.startsWith(scope + " ") || selector === scope) return selector;
      return `${scope} ${selector}`;
    })
    .join(", ");
}

function scopeRuleBlock(block, scope) {
  const open = block.indexOf("{");
  if (open === -1) return block;

  const selectorPart = block.slice(0, open).trim();
  const bodyPart = block.slice(open);

  if (!selectorPart || selectorPart.startsWith("@")) {
    return block;
  }

  return `${prefixSelectorList(selectorPart, scope)}${bodyPart}`;
}

function scopeCssRecursive(css, scope) {
  let output = "";
  let i = 0;

  while (i < css.length) {
    const rest = css.slice(i);
    const wsMatch = rest.match(/^\s+/);
    if (wsMatch) {
      output += wsMatch[0];
      i += wsMatch[0].length;
      continue;
    }

    if (css[i] === "@") {
      const semi = css.indexOf(";", i);
      const brace = css.indexOf("{", i);
      const headerEnd =
        semi !== -1 && (brace === -1 || semi < brace) ? semi + 1 : brace + 1;

      if (brace === -1) {
        output += css.slice(i);
        break;
      }

      const header = css.slice(i, brace).trim();
      const name = header.slice(1).split(/\s+/)[0].toLowerCase();

      if (name === "keyframes" || name === "-webkit-keyframes") {
        let depth = 0;
        let j = brace;
        for (; j < css.length; j++) {
          if (css[j] === "{") depth++;
          else if (css[j] === "}") {
            depth--;
            if (depth === 0) {
              j++;
              break;
            }
          }
        }
        output += css.slice(i, j);
        i = j;
        continue;
      }

      let depth = 0;
      let j = brace;
      for (; j < css.length; j++) {
        if (css[j] === "{") depth++;
        else if (css[j] === "}") {
          depth--;
          if (depth === 0) {
            j++;
            break;
          }
        }
      }

      const inner = css.slice(brace + 1, j - 1);
      output += `${css.slice(i, brace + 1)}${scopeCssRecursive(inner, scope)}}`;
      i = j;
      continue;
    }

    const nextBrace = css.indexOf("{", i);
    if (nextBrace === -1) {
      output += css.slice(i);
      break;
    }

    let depth = 0;
    let j = nextBrace;
    for (; j < css.length; j++) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") {
        depth--;
        if (depth === 0) {
          j++;
          break;
        }
      }
    }

    const block = css.slice(i, j);
    output += scopeRuleBlock(block, scope);
    i = j;
  }

  return output;
}

function fixInnerMotionSelectors(css) {
  return css.replace(/(\.slide-s\d+)\s+\.slide(?:\[[^\]]+\])+\s+/g, "$1 ");
}

export function scopeSlideCss(css, slideId) {
  const scope = scopeClass(slideId);
  const withoutComments = stripCssComments(css);
  const fixed = fixBrokenSelectors(withoutComments);
  const scoped = scopeCssRecursive(fixed, scope);
  return fixInnerMotionSelectors(scoped);
}

function scopeCssFile(slideId) {
  const name = `Slide${pad2(slideId)}`;
  const cssPath = path.join(CSS_DIR, `${name}.css`);
  if (!fs.existsSync(cssPath)) {
    console.warn(`Skip missing: ${cssPath}`);
    return false;
  }

  const raw = fs.readFileSync(cssPath, "utf8");
  const scoped = scopeSlideCss(raw, slideId);
  fs.writeFileSync(cssPath, scoped, "utf8");
  console.log(`Scoped ${name}.css → ${scopeClass(slideId)}`);
  return true;
}

function updateTsxSlideId(slideId) {
  const name = `Slide${pad2(slideId)}`;
  const tsxPath = path.join(TSX_DIR, `${name}.tsx`);
  if (!fs.existsSync(tsxPath)) {
    console.warn(`Skip missing: ${tsxPath}`);
    return false;
  }

  let tsx = fs.readFileSync(tsxPath, "utf8");
  if (tsx.includes(`slideId={${slideId}}`)) {
    return true;
  }

  tsx = tsx.replace(
    /<SlideCanvas(?![^>]*slideId=)/,
    `<SlideCanvas slideId={${slideId}}`,
  );
  fs.writeFileSync(tsxPath, tsx, "utf8");
  console.log(`Updated ${name}.tsx with slideId={${slideId}}`);
  return true;
}

const start = Number(process.argv[2] ?? "1");
const end = Number(process.argv[3] ?? "38");

for (let i = start; i <= end; i++) {
  scopeCssFile(i);
  updateTsxSlideId(i);
}

console.log("Done.");
