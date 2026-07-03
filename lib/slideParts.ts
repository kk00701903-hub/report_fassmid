import {
  DECK_MANIFEST,
  getDeckEntryBySlideId,
  getDeckIndexBySlideId,
} from "@/lib/deckManifest";

export type SlidePart = {
  partNumber: number;
  title: string;
};

/** manifest에서 파생된 PART 구간 (slideId 범위는 참고용) */
export const SLIDE_PARTS: Array<SlidePart & { startSlideId: number; endSlideId: number }> =
  buildSlidePartsFromManifest();

function buildSlidePartsFromManifest(): Array<SlidePart & { startSlideId: number; endSlideId: number }> {
  const parts: Array<SlidePart & { startSlideId: number; endSlideId: number }> = [];

  for (let i = 0; i < DECK_MANIFEST.length; i++) {
    const entry = DECK_MANIFEST[i];
    if (entry.role !== "part-divider" || !entry.partNumber) continue;

    const title = entry.partTitleKo ?? entry.title;
    let endSlideId = entry.slideId;

    for (let j = i + 1; j < DECK_MANIFEST.length; j++) {
      const next = DECK_MANIFEST[j];
      if (next.role === "part-divider" || next.role === "glossary-divider" || next.role === "appendix-divider") {
        break;
      }
      if (next.role === "content" || next.role === "closing") {
        endSlideId = next.slideId;
      }
      if (next.role === "appendix") break;
    }

    parts.push({
      partNumber: entry.partNumber,
      title,
      startSlideId: entry.slideId,
      endSlideId,
    });
  }

  return parts;
}

/** PART · Glossary 등 간지 슬라이드(사이드바 붉은색 하이라이트) */
export function isSidebarDividerSlide(slideId: number | null): boolean {
  if (slideId === null) return false;
  const entry = getDeckEntryBySlideId(slideId);
  return entry?.role === "glossary-divider" || entry?.role === "appendix-divider" || entry?.role === "part-divider";
}

/** 표지 · Glossary 구간 등 PART 미표시 슬라이드 */
export function getSlidePart(builtinSlideId: number | null): SlidePart | null {
  if (builtinSlideId === null) return null;

  const index = getDeckIndexBySlideId(builtinSlideId);
  if (index < 0) return null;

  const entry = DECK_MANIFEST[index];

  if (entry.role === "part-divider" && entry.partNumber) {
    return { partNumber: entry.partNumber, title: entry.partTitleKo ?? entry.title };
  }

  if (
    entry.role === "cover" ||
    entry.role === "glossary-divider" ||
    entry.role === "appendix-divider" ||
    entry.role === "glossary" ||
    entry.role === "appendix"
  ) {
    return null;
  }

  for (let i = index - 1; i >= 0; i--) {
    const prev = DECK_MANIFEST[i];
    if (prev.role === "part-divider" && prev.partNumber) {
      return { partNumber: prev.partNumber, title: prev.partTitleKo ?? prev.title };
    }
    if (prev.role === "glossary-divider" || prev.role === "appendix-divider") break;
  }

  return null;
}
