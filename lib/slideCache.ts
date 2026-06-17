import { getBasePath, getSlideHtmlUrl } from "@/lib/basePath";
import type { SlideManifestItem } from "@/lib/presentationConfig";
import { parseSlideHtml, type ParsedSlide } from "@/lib/parseSlideHtml";

const cache = new Map<string, ParsedSlide>();
const pending = new Map<string, Promise<ParsedSlide>>();

const FETCH_TIMEOUT_MS = 15000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, { signal: controller.signal, cache: "no-store" });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchBuiltinSlide(fileName: string): Promise<ParsedSlide> {
  const url = getSlideHtmlUrl(fileName);
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error(`Failed to load ${url} (${response.status})`);
  }

  const html = await response.text();
  return parseSlideHtml(html);
}

export async function getSlideContent(item: SlideManifestItem): Promise<ParsedSlide> {
  if (item.type === "custom") {
    return parseSlideHtml(item.html);
  }

  const cacheKey = `builtin:${item.fileName}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const inflight = pending.get(cacheKey);
  if (inflight) return inflight;

  const promise = fetchBuiltinSlide(item.fileName)
    .then((parsed) => {
      cache.set(cacheKey, parsed);
      pending.delete(cacheKey);
      return parsed;
    })
    .catch((error) => {
      pending.delete(cacheKey);
      throw error;
    });

  pending.set(cacheKey, promise);
  return promise;
}

export function prefetchSlides(items: SlideManifestItem[], currentIndex: number): void {
  const neighbors = [currentIndex - 1, currentIndex + 1];
  for (const index of neighbors) {
    const item = items[index];
    if (!item || item.type === "custom") continue;
    void getSlideContent(item);
  }
}

export function clearSlideCache(): void {
  cache.clear();
  pending.clear();
}

export function getResolvedBasePath(): string {
  return getBasePath();
}
