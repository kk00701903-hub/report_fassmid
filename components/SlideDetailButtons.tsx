"use client";

import { useEffect, useState } from "react";
import SlideDetailPanel from "@/components/SlideDetailPanel";
import { getSlideDetails } from "@/lib/slideDetails";
import type { DetailTopic } from "@/lib/slideDetails";
import { getBuiltinSlideId, type SlideManifestItem } from "@/lib/presentationConfig";

type SlideDetailButtonsProps = {
  slideIndex: number;
  manifestItem: SlideManifestItem | undefined;
};

export default function SlideDetailButtons({ slideIndex, manifestItem }: SlideDetailButtonsProps) {
  const [activeTopic, setActiveTopic] = useState<DetailTopic | null>(null);

  const builtinId = getBuiltinSlideId(manifestItem);
  const detailSet = builtinId ? getSlideDetails(builtinId) : undefined;
  const topics = detailSet?.topics ?? [];

  useEffect(() => {
    setActiveTopic(null);
  }, [slideIndex, manifestItem?.key]);

  useEffect(() => {
    if (!activeTopic) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveTopic(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTopic]);

  if (!topics.length || !builtinId) return null;

  return (
    <>
      <div className="slide-detail-buttons slide-detail-buttons--compact" aria-label="개발자 상세 자료">
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            className={`slide-detail-buttons__item slide-detail-buttons__item--${topic.category}`}
            onClick={() => setActiveTopic(topic)}
            title={topic.title}
            aria-label={topic.title}
          >
            <i
              className={
                topic.category === "code"
                  ? "fa-solid fa-code"
                  : topic.category === "process"
                    ? "fa-solid fa-list-check"
                    : "fa-solid fa-sitemap"
              }
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      {activeTopic ? (
        <SlideDetailPanel slideId={builtinId} topic={activeTopic} onClose={() => setActiveTopic(null)} />
      ) : null}
    </>
  );
}
