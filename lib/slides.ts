import {
  DECK_MANIFEST,
  getDeckEntryAtPage,
  getDeckEntryBySlideId,
  getDeckLength,
  getPageForSlideId,
  isAppendixRole,
  type DeckSlideEntry,
} from "@/lib/deckManifest";

export type Slide = {
  id: number;
  title: string;
};

/** 본편 발표 흐름에서 제외하고 별첨으로만 제공하는 슬라이드 ID */
export const APPENDIX_SLIDE_IDS = DECK_MANIFEST.filter((entry) => isAppendixRole(entry.role)).map(
  (entry) => entry.slideId,
) as readonly number[];

/** Digital Insight Glossary 간지 및 용어 풀이 슬라이드 */
export const GLOSSARY_DIVIDER_SLIDE_ID =
  DECK_MANIFEST.find((entry) => entry.role === "glossary-divider")?.slideId ?? 41;

export const GLOSSARY_CONTENT_SLIDE_IDS = DECK_MANIFEST.filter((entry) => entry.role === "glossary").map(
  (entry) => entry.slideId,
) as readonly number[];

/** 등록된 최대 slideId (컴포넌트 파일 범위) */
export const SLIDE_COUNT = Math.max(...DECK_MANIFEST.map((entry) => entry.slideId));

/** 덱 발표 순서 (manifest 파생) */
export const SLIDES: Slide[] = DECK_MANIFEST.map((entry) => ({
  id: entry.slideId,
  title: entry.title,
}));

export function isAppendixSlideId(id: number): boolean {
  return (APPENDIX_SLIDE_IDS as readonly number[]).includes(id);
}

export function isGlossarySlideId(id: number): boolean {
  return id === GLOSSARY_DIVIDER_SLIDE_ID || (GLOSSARY_CONTENT_SLIDE_IDS as readonly number[]).includes(id);
}

export function getSlideById(id: number): Slide | undefined {
  return SLIDES.find((slide) => slide.id === id);
}

/** slideId(컴포넌트 ID) 유효성 — audit 등 slideId 기준 라우트용 */
export function isValidSlideId(id: number): boolean {
  return id >= 1 && id <= SLIDE_COUNT && getDeckEntryBySlideId(id) !== undefined;
}

/** 페이지 번호(1-based) 유효성 — /slides/{page}/ 라우트용 */
export function isValidPageNumber(page: number): boolean {
  return Number.isFinite(page) && page >= 1 && page <= getDeckLength();
}

export {
  getDeckEntryAtPage,
  getDeckEntryBySlideId,
  getDeckLength,
  getPageForSlideId,
  type DeckSlideEntry,
};
