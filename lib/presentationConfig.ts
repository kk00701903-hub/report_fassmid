import { isAppendixSlideId, SLIDES } from "@/lib/slides";

export type BuiltinSlideItem = {
  key: string;
  title: string;
  type: "builtin";
  slideId: number;
  /** false이면 발표 시 이전/다음 탐색에서 제외 (기본 true) */
  visible?: boolean;
};

export type CustomSlideItem = {
  key: string;
  title: string;
  type: "custom";
  html: string;
  visible?: boolean;
};

export type SlideManifestItem = BuiltinSlideItem | CustomSlideItem;

export type PresentationConfig = {
  slides: SlideManifestItem[];
};

const STORAGE_KEY = "fass-presentation-config";
const TITLE_VERSION_KEY = "fass-presentation-title-version";
/** slides.ts 제목 변경 시 로컬 설정의 목차 제목을 갱신하기 위한 버전 */
const CONFIG_TITLE_VERSION = 19;

export function isSlideVisible(slide: SlideManifestItem): boolean {
  return slide.visible !== false;
}

export function getBuiltinSlideId(item: SlideManifestItem | undefined): number | null {
  if (!item || item.type !== "builtin") return null;
  return item.slideId;
}

export function normalizePresentationConfig(config: PresentationConfig): PresentationConfig {
  return {
    slides: config.slides.map((slide) => migrateSlideItem(slide)),
  };
}

function migrateSlideItem(slide: SlideManifestItem): SlideManifestItem {
  if (slide.type !== "builtin") {
    return { ...slide, visible: slide.visible !== false };
  }

  const legacy = slide as BuiltinSlideItem & { fileName?: string };
  if (typeof legacy.slideId === "number" && Number.isFinite(legacy.slideId)) {
    return { ...legacy, visible: legacy.visible !== false };
  }

  if (legacy.fileName) {
    const match = legacy.fileName.match(/^(\d+)\.html$/i);
    if (match) {
      const { fileName, ...rest } = legacy;
      void fileName;
      return {
        ...rest,
        slideId: Number(match[1]),
        visible: legacy.visible !== false,
      };
    }
  }

  return { ...legacy, slideId: 1, visible: legacy.visible !== false };
}

export function getVisibleSlides(config: PresentationConfig): SlideManifestItem[] {
  return config.slides.filter(isSlideVisible);
}

function getDefaultSlideOrder() {
  const main = SLIDES.filter((slide) => !isAppendixSlideId(slide.id));
  const appendix = SLIDES.filter((slide) => isAppendixSlideId(slide.id));
  return [...main, ...appendix];
}

export function createDefaultConfig(): PresentationConfig {
  return {
    slides: getDefaultSlideOrder().map((slide) => ({
      key: `builtin-${slide.id}`,
      title: slide.title,
      type: "builtin" as const,
      slideId: slide.id,
      visible: !isAppendixSlideId(slide.id),
    })),
  };
}

/** 저장된 설정을 현재 빌트인 슬라이드 목록과 맞춥니다 (삭제·추가된 슬라이드 반영). */
export function syncPresentationConfig(config: PresentationConfig): PresentationConfig {
  const defaults = createDefaultConfig();
  const migrated = config.slides.map(migrateSlideItem);
  const validIds = new Set(
    defaults.slides
      .filter((slide): slide is BuiltinSlideItem => slide.type === "builtin")
      .map((slide) => slide.slideId),
  );
  const defaultById = new Map(
    defaults.slides
      .filter((slide): slide is BuiltinSlideItem => slide.type === "builtin")
      .map((slide) => [slide.slideId, slide]),
  );

  const kept: SlideManifestItem[] = [];
  const seenBuiltin = new Set<number>();

  for (const slide of migrated) {
    if (slide.type === "custom") {
      kept.push(slide);
      continue;
    }
    if (!validIds.has(slide.slideId)) continue;

    seenBuiltin.add(slide.slideId);
    const fresh = defaultById.get(slide.slideId)!;
    kept.push({
      ...fresh,
      title: fresh.title,
      visible: slide.visible,
    });
  }

  for (const slide of defaults.slides) {
    if (slide.type !== "builtin" || seenBuiltin.has(slide.slideId)) continue;
    kept.push(slide);
  }

  const custom = kept.filter((slide) => slide.type === "custom");
  const builtinById = new Map(
    kept
      .filter((slide): slide is BuiltinSlideItem => slide.type === "builtin")
      .map((slide) => [slide.slideId, slide]),
  );
  const orderedBuiltin = defaults.slides
    .filter((slide): slide is BuiltinSlideItem => slide.type === "builtin")
    .map((slide) => builtinById.get(slide.slideId))
    .filter((slide): slide is BuiltinSlideItem => Boolean(slide));

  return normalizePresentationConfig({ slides: [...orderedBuiltin, ...custom] });
}

export function loadPresentationConfig(): PresentationConfig {
  if (typeof window === "undefined") {
    return createDefaultConfig();
  }

  try {
    const storedVersion = Number(localStorage.getItem(TITLE_VERSION_KEY) ?? "0");
    if (storedVersion !== CONFIG_TITLE_VERSION) {
      localStorage.setItem(TITLE_VERSION_KEY, String(CONFIG_TITLE_VERSION));
      return resetPresentationConfig();
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultConfig();

    const parsed = JSON.parse(raw) as PresentationConfig;
    if (!parsed.slides?.length) return createDefaultConfig();

    const synced = syncPresentationConfig(parsed);
    savePresentationConfig(synced);
    return synced;
  } catch {
    return createDefaultConfig();
  }
}

export function savePresentationConfig(config: PresentationConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function resetPresentationConfig(): PresentationConfig {
  const defaults = createDefaultConfig();
  savePresentationConfig(defaults);
  return defaults;
}

export function extractTitleFromHtml(html: string, fallback: string): string {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1]?.trim() || fallback;
}

export function createCustomSlideFromFile(fileName: string, html: string): CustomSlideItem {
  return {
    key: `custom-${crypto.randomUUID()}`,
    title: extractTitleFromHtml(html, fileName.replace(/\.html$/i, "")),
    type: "custom",
    html,
  };
}
