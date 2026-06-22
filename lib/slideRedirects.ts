/**
 * 구버전(최대 36장) 슬라이드 번호 → 현재 슬라이드 ID.
 * 북마크·공유 URL 호환용.
 */
export const LEGACY_SLIDE_REDIRECTS: Record<number, number> = {
  16: 18, // PART 4 간지 (구 16p)
  19: 18, // PART 4 간지 (구 19p)
  27: 29, // PART 5 간지 (구 27p)
  30: 29, // PART 5 간지 (구 30p)
  34: 29, // PART 5 간지 (36장 덱 시절 34p)
  35: 31, // 롤아웃 로드맵
  36: 32, // 맺음말
};

export function isLegacySlideId(slideId: number): boolean {
  return slideId in LEGACY_SLIDE_REDIRECTS;
}

export function resolveSlideId(slideId: number): number {
  return LEGACY_SLIDE_REDIRECTS[slideId] ?? slideId;
}

export function getLegacySlideIds(): number[] {
  return Object.keys(LEGACY_SLIDE_REDIRECTS).map(Number);
}

/** 구버전 슬라이드 번호용 상세 페이지 정적 경로 (대상 슬라이드의 detail 복제) */
export function getLegacyDetailParams(
  currentParams: { id: string; detailId: string }[],
): { id: string; detailId: string }[] {
  const legacy: { id: string; detailId: string }[] = [];
  for (const [legacyId, targetId] of Object.entries(LEGACY_SLIDE_REDIRECTS)) {
    for (const param of currentParams) {
      if (Number(param.id) === targetId) {
        legacy.push({ id: legacyId, detailId: param.detailId });
      }
    }
  }
  return legacy;
}
