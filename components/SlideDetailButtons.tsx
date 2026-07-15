"use client";

import { useEffect, useState } from "react";
import SlideDetailPanel from "@/components/SlideDetailPanel";
import { getSlideDetails } from "@/lib/slideDetails";
import type { DetailTopic } from "@/lib/slideDetails";
import { getBuiltinSlideId, type SlideManifestItem } from "@/lib/presentationConfig";

/** 발표 페이지 번호(1-based) — 사이드바 클릭 유도 힌트를 보여줄 페이지 */
const DETAIL_HINT_PAGE = 2;

type SlideDetailButtonsProps = {
  slideIndex: number;
  manifestItem: SlideManifestItem | undefined;
};

export default function SlideDetailButtons({ slideIndex, manifestItem }: SlideDetailButtonsProps) {
  const [activeTopic, setActiveTopic] = useState<DetailTopic | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  const builtinId = getBuiltinSlideId(manifestItem);
  const detailSet = builtinId ? getSlideDetails(builtinId) : undefined;
  const topics = detailSet?.topics ?? [];
  const showHint =
    !hintDismissed && !activeTopic && topics.length > 0 && slideIndex + 1 === DETAIL_HINT_PAGE;

  useEffect(() => {
    setActiveTopic(null);
    setHintDismissed(false);
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

  function openTopic(topic: DetailTopic) {
    setHintDismissed(true);
    setActiveTopic(topic);
  }

  return (
    <>
      <div className="slide-detail-buttons slide-detail-buttons--compact" aria-label="개발자 상세 자료">
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            className={`slide-detail-buttons__item slide-detail-buttons__item--${topic.category}${showHint ? " is-hint-target" : ""}`}
            onClick={() => openTopic(topic)}
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

        {showHint ? (
          <div className="slide-detail-hint" aria-live="polite">
            <div className="slide-detail-hint__arrow" aria-hidden="true">
              <span className="slide-detail-hint__chevron" />
              <span className="slide-detail-hint__chevron" />
              <span className="slide-detail-hint__chevron" />
            </div>
            <div className="slide-detail-hint__bubble">
              <i className="fa-solid fa-hand-pointer" aria-hidden="true" />
              <span>클릭 후 참고내용 확인</span>
            </div>
          </div>
        ) : null}
      </div>

      {activeTopic ? (
        <SlideDetailPanel slideId={builtinId} topic={activeTopic} onClose={() => setActiveTopic(null)} />
      ) : null}
    </>
  );
}
