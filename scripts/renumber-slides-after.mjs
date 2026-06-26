#!/usr/bin/env node
/** Renumber slides from `fromId` upward by +1 (file rename + slideId/scope update). Run before inserting new slide at fromId. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SLIDES_DIR = path.join(ROOT, "components", "slides");
const CSS_DIR = path.join(SLIDES_DIR, "styles");

function pad2(n) {
  return String(n).padStart(2, "0");
}

const fromId = Number(process.argv[2] ?? "16");
const maxId = Number(process.argv[3] ?? "38");

for (let i = maxId; i >= fromId; i--) {
  const from = pad2(i);
  const to = pad2(i + 1);
  const tsxFrom = path.join(SLIDES_DIR, `Slide${from}.tsx`);
  const tsxTo = path.join(SLIDES_DIR, `Slide${to}.tsx`);
  const cssFrom = path.join(CSS_DIR, `Slide${from}.css`);
  const cssTo = path.join(CSS_DIR, `Slide${to}.css`);

  if (!fs.existsSync(tsxFrom)) {
    console.warn(`Skip missing ${tsxFrom}`);
    continue;
  }

  let tsx = fs.readFileSync(tsxFrom, "utf8");
  tsx = tsx
    .replace(new RegExp(`slideId=\\{${i}\\}`, "g"), `slideId={${i + 1}}`)
    .replace(new RegExp(`Slide${from}\\.css`, "g"), `Slide${to}.css`)
    .replace(new RegExp(`function Slide${from}\\b`, "g"), `function Slide${to}`);
  fs.writeFileSync(tsxTo, tsx, "utf8");

  if (fs.existsSync(cssFrom)) {
    let css = fs.readFileSync(cssFrom, "utf8");
    css = css.replace(new RegExp(`\\.slide-s${from}\\b`, "g"), `.slide-s${to}`);
    fs.writeFileSync(cssTo, css, "utf8");
    fs.unlinkSync(cssFrom);
  }

  fs.unlinkSync(tsxFrom);
  console.log(`Slide${from} → Slide${to}`);
}

console.log("Done.");
