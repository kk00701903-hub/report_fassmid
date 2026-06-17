import { getSlideHtmlUrl } from "@/lib/basePath";
import type { SlideManifestItem } from "@/lib/presentationConfig";

function prefetchSlideUrl(url: string): void {
  if (typeof document === "undefined") return;

  const existing = document.querySelector(`link[data-slide-prefetch="${url}"]`);
  if (existing) return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "document";
  link.href = url;
  link.setAttribute("data-slide-prefetch", url);
  document.head.appendChild(link);
}

export function prefetchSlides(items: SlideManifestItem[], currentIndex: number): void {
  const neighbors = [currentIndex - 1, currentIndex + 1];
  for (const index of neighbors) {
    const item = items[index];
    if (!item || item.type !== "builtin") continue;
    prefetchSlideUrl(getSlideHtmlUrl(item.fileName));
  }
}

export function clearSlideCache(): void {
  // Builtin slides load directly in iframe; no parsed cache to clear.
}
