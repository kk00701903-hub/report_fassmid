#!/usr/bin/env node
/**
 * Normalize slide CSS: replace fixed 960x720 with 100%, ensure flex shell on roots/body.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSS_DIR = path.join(__dirname, "..", "components", "slides", "styles");

const ROOT_PATTERNS = [
  /\.slide-s\d+ \.slide\b/,
  /\.slide-s\d+ \.slide-root\b/,
  /\.slide-s\d+ \.fass-report-slide-root\b/,
  /\.slide-s\d+ \.section-slide-root\b/,
  /\.slide-s\d+ \.migration-slide-root\b/,
  /\.slide-s\d+ \.slide-root-container\b/,
  /\.slide-s\d+ \.fass-summary-slide-root\b/,
  /\.slide-s\d+ \.fass-identity-slide-root\b/,
];

const BODY_SELECTORS = [
  "body",
  "content",
  "flow-main",
  "milestone-grid",
  "phase-stack",
  "finops-main-content-layout",
  "migration-content-wrapper",
  "main-content",
  "slide-content",
];

function pad2(n) {
  return String(n).padStart(2, "0");
}

function normalizeDimensions(css) {
  let s = css;
  s = s.replace(/width:\s*960px\s*;\s*height:\s*720px/gi, "width:100%;height:100%");
  s = s.replace(/width:960px;height:720px/gi, "width:100%;height:100%");
  s = s.replace(/width:\s*960px/gi, "width:100%");
  s = s.replace(/height:\s*720px/gi, "height:100%");
  s = s.replace(/width: 960px;\s*height: 720px/gi, "width: 100%; height: 100%");
  return s;
}

function appendProps(body, additions) {
  let b = body.trimEnd();
  if (b.length && !b.endsWith(";")) b += ";";
  for (const [prop, value] of additions) {
    const re = new RegExp(`${prop}\\s*:\\s*[^;]+`, "i");
    if (!re.test(b)) b += `${prop}:${value};`;
  }
  return b;
}

function ensureRootFlex(css, scope) {
  const rootNames =
    "slide|slide-root|fass-report-slide-root|section-slide-root|migration-slide-root|slide-root-container|fass-summary-slide-root|fass-identity-slide-root";
  const re = new RegExp(
    `(${scope.replace(".", "\\.")} \\.(?:${rootNames}))\\s*\\{([^}]*)\\}`,
    "g",
  );
  return css.replace(re, (match, selector, body) => {
    const b = appendProps(body, [
      ["display", "flex"],
      ["flex-direction", "column"],
      ["overflow", "hidden"],
      ["min-height", "0"],
      ["box-sizing", "border-box"],
    ]);
    return `${selector}{${b}}`;
  });
}

function ensureBodyFlex(css, scope) {
  for (const name of BODY_SELECTORS) {
    const re = new RegExp(`(${scope.replace(".", "\\.")} \\.${name})\\s*\\{([^}]*)\\}`, "g");
    css = css.replace(re, (match, selector, body) => {
      const b = appendProps(body, [
        ["flex", "1"],
        ["min-height", "0"],
      ]);
      return `${selector}{${b}}`;
    });
  }
  return css;
}

function normalizeFile(slideId) {
  const name = `Slide${pad2(slideId)}`;
  const filePath = path.join(CSS_DIR, `${name}.css`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skip ${name}.css`);
    return false;
  }

  const scope = `.slide-s${pad2(slideId)}`;
  let css = fs.readFileSync(filePath, "utf8");
  css = normalizeDimensions(css);
  css = ensureRootFlex(css, scope);
  css = ensureBodyFlex(css, scope);
  fs.writeFileSync(filePath, css, "utf8");
  console.log(`Normalized ${name}.css`);
  return true;
}

const count = Number(process.argv[2] ?? "39");
for (let i = 1; i <= count; i++) {
  normalizeFile(i);
}
console.log("Done.");
