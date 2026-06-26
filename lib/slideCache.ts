import { prefetchSlideComponent } from "@/lib/slideRegistry";
import { getBuiltinSlideId, type SlideManifestItem } from "@/lib/presentationConfig";

export function prefetchSlides(items: SlideManifestItem[], currentIndex: number): void {
  const neighbors = [currentIndex - 1, currentIndex + 1];
  for (const index of neighbors) {
    const item = items[index];
    if (!item) continue;
    const slideId = getBuiltinSlideId(item);
    if (slideId) prefetchSlideComponent(slideId);
  }
}

export function clearSlideCache(): void {
  // React slides prefetch via dynamic import; no persistent cache to clear.
}
