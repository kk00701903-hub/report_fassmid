/**
 * 구버전(최대 36장) 슬라이드 번호 → 현재 슬라이드 ID.
 * 북마크·공유 URL 호환용.
 * 현재 유효한 슬라이드 ID(1–33)는 포함하지 않습니다.
 */
export const LEGACY_SLIDE_REDIRECTS: Record<number, number> = {
  8: 10,
  9: 11,
  10: 12,
  11: 13,
  12: 14,
  13: 15,
  14: 16,
  15: 17,
  16: 18, // PART 4 간지 (구 16p)
  17: 19,
  18: 20,
  19: 21, // PART 4 간지 (구 19p)
  20: 22,
  21: 23,
  22: 24,
  23: 25,
  24: 26,
  25: 27,
  26: 28,
  27: 8,
  28: 9,
  33: 8, // 스프린트 운영현황 (구 덱)
  34: 21, // 비즈니스 혁신1
  35: 30, // 롤아웃 로드맵
  36: 33, // 맺음말
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
