import { SLIDES } from "@/lib/slides";

export type BuiltinSlideItem = {
  key: string;
  title: string;
  type: "builtin";
  fileName: string;
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
const CONFIG_TITLE_VERSION = 3;

export function isSlideVisible(slide: SlideManifestItem): boolean {
  return slide.visible !== false;
}

export function normalizePresentationConfig(config: PresentationConfig): PresentationConfig {
  return {
    slides: config.slides.map((slide) => ({
      ...slide,
      visible: slide.visible !== false,
    })),
  };
}

export function getVisibleSlides(config: PresentationConfig): SlideManifestItem[] {
  return config.slides.filter(isSlideVisible);
}

export function createDefaultConfig(): PresentationConfig {
  return {
    slides: SLIDES.map((slide) => ({
      key: `builtin-${slide.id}`,
      title: slide.title,
      type: "builtin" as const,
      fileName: `${slide.id}.html`,
      visible: true,
    })),
  };
}

/** 저장된 설정을 현재 빌트인 슬라이드 목록과 맞춥니다 (삭제·추가된 슬라이드 반영). */
export function syncPresentationConfig(config: PresentationConfig): PresentationConfig {
  const defaults = createDefaultConfig();
  const validFiles = new Set(
    defaults.slides
      .filter((slide): slide is BuiltinSlideItem => slide.type === "builtin")
      .map((slide) => slide.fileName),
  );
  const defaultByFile = new Map(
    defaults.slides
      .filter((slide): slide is BuiltinSlideItem => slide.type === "builtin")
      .map((slide) => [slide.fileName, slide]),
  );

  const kept: SlideManifestItem[] = [];
  const seenBuiltin = new Set<string>();

  for (const slide of config.slides) {
    if (slide.type === "custom") {
      kept.push(slide);
      continue;
    }
    if (!validFiles.has(slide.fileName)) continue;

    seenBuiltin.add(slide.fileName);
    const fresh = defaultByFile.get(slide.fileName)!;
    kept.push({
      ...fresh,
      title: fresh.title,
      visible: slide.visible,
    });
  }

  for (const slide of defaults.slides) {
    if (slide.type !== "builtin" || seenBuiltin.has(slide.fileName)) continue;
    kept.push(slide);
  }

  return normalizePresentationConfig({ slides: kept });
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
