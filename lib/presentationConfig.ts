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

export function loadPresentationConfig(): PresentationConfig {
  if (typeof window === "undefined") {
    return createDefaultConfig();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultConfig();

    const parsed = JSON.parse(raw) as PresentationConfig;
    if (!parsed.slides?.length) return createDefaultConfig();
    return normalizePresentationConfig(parsed);
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
