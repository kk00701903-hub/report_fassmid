import { SLIDES } from "@/lib/slides";

export type BuiltinSlideItem = {
  key: string;
  title: string;
  type: "builtin";
  fileName: string;
};

export type CustomSlideItem = {
  key: string;
  title: string;
  type: "custom";
  html: string;
};

export type SlideManifestItem = BuiltinSlideItem | CustomSlideItem;

export type PresentationConfig = {
  slides: SlideManifestItem[];
};

const STORAGE_KEY = "fass-presentation-config";

export function createDefaultConfig(): PresentationConfig {
  return {
    slides: SLIDES.map((slide) => ({
      key: `builtin-${slide.id}`,
      title: slide.title,
      type: "builtin" as const,
      fileName: `${slide.id}.html`,
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
    return parsed;
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
