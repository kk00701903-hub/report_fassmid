import { DECK_MANIFEST, isAppendixRole } from "@/lib/deckManifest";

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
/** deckManifest 제목·순서 변경 시 로컬 설정을 갱신하기 위한 버전
 *  ⚠️ deckManifest 순서/제목을 바꿀 때마다 이 값을 반드시 올려야
 *  기존 사용자 localStorage 저장 순서가 새 manifest로 재동기화됩니다. */
const CONFIG_TITLE_VERSION = 32;

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

function manifestEntryToBuiltin(entry: (typeof DECK_MANIFEST)[number]): BuiltinSlideItem {
  const defaultVisible = entry.defaultVisible ?? !isAppendixRole(entry.role);
  return {
    key: `builtin-${entry.slideId}`,
    title: entry.title,
    type: "builtin",
    slideId: entry.slideId,
    visible: defaultVisible,
  };
}

export function createDefaultConfig(): PresentationConfig {
  return {
    slides: DECK_MANIFEST.map(manifestEntryToBuiltin),
  };
}

function getDefaultBuiltinOrder(): number[] {
  return DECK_MANIFEST.map((entry) => entry.slideId);
}

/** 저장된 설정을 현재 빌트인 슬라이드 목록과 맞춥니다 (삭제·추가된 슬라이드 반영, 순서 보존). */
export function syncPresentationConfig(config: PresentationConfig): PresentationConfig {
  const defaults = createDefaultConfig();
  const migrated = config.slides.map(migrateSlideItem);
  const defaultOrder = getDefaultBuiltinOrder();
  const validIds = new Set(defaultOrder);
  const defaultById = new Map(
    defaults.slides
      .filter((slide): slide is BuiltinSlideItem => slide.type === "builtin")
      .map((slide) => [slide.slideId, slide]),
  );

  const savedOrder: number[] = [];
  const savedById = new Map<number, BuiltinSlideItem>();
  const custom: CustomSlideItem[] = [];

  for (const slide of migrated) {
    if (slide.type === "custom") {
      custom.push(slide);
      continue;
    }
    if (!validIds.has(slide.slideId)) continue;

    if (!savedById.has(slide.slideId)) {
      savedOrder.push(slide.slideId);
    }
    const fresh = defaultById.get(slide.slideId)!;
    savedById.set(slide.slideId, {
      ...fresh,
      title: fresh.title,
      visible: slide.visible,
    });
  }

  for (const slideId of defaultOrder) {
    if (savedById.has(slideId)) continue;

    const fresh = defaultById.get(slideId)!;
    const defaultIdx = defaultOrder.indexOf(slideId);
    let insertAt = savedOrder.length;

    for (let i = 0; i < savedOrder.length; i++) {
      const savedDefaultIdx = defaultOrder.indexOf(savedOrder[i]);
      if (savedDefaultIdx > defaultIdx) {
        insertAt = i;
        break;
      }
    }

    savedOrder.splice(insertAt, 0, slideId);
    savedById.set(slideId, fresh);
  }

  const orderedBuiltin = savedOrder
    .map((slideId) => savedById.get(slideId))
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
