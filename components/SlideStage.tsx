"use client";

import type { ParsedSlide } from "@/lib/parseSlideHtml";

const SLIDE_WIDTH = 960;
const SLIDE_HEIGHT = 720;

type SlideStageProps = {
  slide: ParsedSlide;
  scale: number;
  direction: "forward" | "back" | "none";
  presentationMode: boolean;
};

export default function SlideStage({ slide, scale, direction, presentationMode }: SlideStageProps) {
  const animationClass =
    direction === "forward"
      ? "slide-stage--enter-forward"
      : direction === "back"
        ? "slide-stage--enter-back"
        : "";

  return (
    <div className={`slide-stage ${animationClass}`}>
      <div
        className="slide-stage__canvas"
        style={{
          width: SLIDE_WIDTH,
          height: SLIDE_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {slide.styles ? <style dangerouslySetInnerHTML={{ __html: slide.styles }} /> : null}
        <div className="slide-stage__content" dangerouslySetInnerHTML={{ __html: slide.bodyHtml }} />
      </div>
      {presentationMode ? (
        <>
          <div className="slide-stage__hit-zone slide-stage__hit-zone--left" data-nav="prev" aria-hidden="true" />
          <div className="slide-stage__hit-zone slide-stage__hit-zone--right" data-nav="next" aria-hidden="true" />
        </>
      ) : null}
    </div>
  );
}

export { SLIDE_HEIGHT, SLIDE_WIDTH };
