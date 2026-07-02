#!/usr/bin/env node
/**
 * Deck manifest 검증 — npm run validate:deck
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const manifestPath = path.join(root, "lib", "deckManifest.ts");
const slidesDir = path.join(root, "components", "slides");
const slideDetailsPath = path.join(root, "lib", "slideDetails.ts");

const manifestSource = fs.readFileSync(manifestPath, "utf8");

/** DECK_MANIFEST 배열 본문에서 slideId·role·partNumber 추출 */
function parseManifestEntries(source) {
  const entries = [];
  const blockMatch = source.match(/export const DECK_MANIFEST[^=]*=\s*\[([\s\S]*?)\n\];/);
  if (!blockMatch) {
    throw new Error("DECK_MANIFEST 배열을 찾을 수 없습니다.");
  }

  const block = blockMatch[1];
  const objectStarts = [...block.matchAll(/\{\s*slideId:\s*(\d+)/g)];

  for (let i = 0; i < objectStarts.length; i++) {
    const start = objectStarts[i].index ?? 0;
    const end = i + 1 < objectStarts.length ? (objectStarts[i + 1].index ?? block.length) : block.length;
    const chunk = block.slice(start, end);

    const slideId = Number(objectStarts[i][1]);
    const roleMatch = chunk.match(/role:\s*"([^"]+)"/);
    const partNumberMatch = chunk.match(/partNumber:\s*(\d+)/);
    if (!roleMatch) continue;

    entries.push({
      slideId,
      role: roleMatch[1],
      partNumber: partNumberMatch ? Number(partNumberMatch[1]) : undefined,
    });
  }

  return entries;
}

function slideComponentExists(slideId) {
  const padded = String(slideId).padStart(2, "0");
  return fs.existsSync(path.join(slidesDir, `Slide${padded}.tsx`));
}

function parseSlideDetailIds(source) {
  const ids = new Set();
  const re = /^\s*(\d+):\s*\{/gm;
  let match;
  while ((match = re.exec(source)) !== null) {
    ids.add(Number(match[1]));
  }
  return ids;
}

const entries = parseManifestEntries(manifestSource);
const errors = [];
const warnings = [];

if (entries.length === 0) {
  errors.push("DECK_MANIFEST 항목이 비어 있습니다.");
}

const seenIds = new Set();
for (const entry of entries) {
  if (seenIds.has(entry.slideId)) {
    errors.push(`중복 slideId: ${entry.slideId}`);
  }
  seenIds.add(entry.slideId);

  if (!slideComponentExists(entry.slideId)) {
    errors.push(`Slide${String(entry.slideId).padStart(2, "0")}.tsx 가 없습니다 (slideId ${entry.slideId})`);
  }
}

const partDividers = entries.filter((entry) => entry.role === "part-divider");
if (partDividers.length !== 5) {
  errors.push(`part-divider는 5개여야 합니다 (현재 ${partDividers.length}개)`);
}

const partNumbers = partDividers.map((entry) => entry.partNumber).filter((n) => n !== undefined);
for (let expected = 1; expected <= 5; expected++) {
  if (!partNumbers.includes(expected)) {
    errors.push(`part-divider partNumber ${expected} 가 없습니다`);
  }
}

if (fs.existsSync(slideDetailsPath)) {
  const detailIds = parseSlideDetailIds(fs.readFileSync(slideDetailsPath, "utf8"));
  const contentRoles = new Set(["content", "glossary", "closing", "appendix"]);
  for (const entry of entries) {
    if (!contentRoles.has(entry.role)) continue;
    if (!detailIds.has(entry.slideId)) {
      warnings.push(`slideDetails.ts에 slideId ${entry.slideId} 항목이 없습니다`);
    }
  }
}

console.log(`Deck manifest: ${entries.length} slides`);

if (warnings.length > 0) {
  console.warn("\n경고:");
  for (const warning of warnings) {
    console.warn(`  - ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("\n오류:");
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log("validate:deck OK");
