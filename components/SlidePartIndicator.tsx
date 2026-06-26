"use client";

import { getBuiltinSlideId } from "@/lib/presentationConfig";
import { getSlidePart } from "@/lib/slideParts";
import type { SlideManifestItem } from "@/lib/presentationConfig";

type SlidePartIndicatorProps = {
  manifestItem: SlideManifestItem | undefined;
};

export default function SlidePartIndicator({ manifestItem }: SlidePartIndicatorProps) {
  const builtinId = getBuiltinSlideId(manifestItem);
  const part = getSlidePart(builtinId);

  if (!part) return null;

  return (
    <div className="slide-part-indicator" aria-label={`PART ${part.partNumber} ${part.title}`}>
      <span className="slide-part-indicator__badge">PART {part.partNumber}</span>
      <span className="slide-part-indicator__title">{part.title}</span>
    </div>
  );
}
