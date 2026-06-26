#!/usr/bin/env node
/** Repair CSS broken by normalize-slide-layout missing semicolons. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CSS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "components", "slides", "styles");

function repair(css) {
  let s = css;
  s = s.replace(/overflow:hiddenmin-height/g, "overflow:hidden;min-height");
  s = s.replace(/position:relativemin-height/g, "position:relative;min-height");
  s = s.replace(/(flex-direction:\s*column)(\s*)(overflow|min-height|display|box-sizing)/g, "$1;$2$3");
  s = s.replace(/(font-family:\s*[^;{}\n]+)(\s*)(display|overflow|min-height)/g, "$1;$2$3");
  s = s.replace(/(color:\s*var\(--ppt-text-1\))(\s*)(overflow|min-height|display|box-sizing)/g, "$1;$2$3");
  s = s.replace(/(position:\s*relative)(\s*)(overflow|min-height|display)/g, "$1;$2$3");
  return s;
}

for (const file of fs.readdirSync(CSS_DIR).filter((f) => f.endsWith(".css"))) {
  const p = path.join(CSS_DIR, file);
  const before = fs.readFileSync(p, "utf8");
  const after = repair(before);
  if (after !== before) {
    fs.writeFileSync(p, after, "utf8");
    console.log(`Repaired ${file}`);
  }
}
