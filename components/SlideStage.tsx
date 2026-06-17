"use client";

import type { ParsedSlide } from "@/lib/parseSlideHtml";

export const SLIDE_WIDTH = 960;
export const SLIDE_HEIGHT = 720;
export const SLIDE_ASPECT = SLIDE_WIDTH / SLIDE_HEIGHT; // 4:3

type SlideStageProps = {
  slide: ParsedSlide;
  scale: number;
  direction: "forward" | "back" | "none";
};

export default function SlideStage({ slide, scale, direction }: SlideStageProps) {
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
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {slide.styles ? <style dangerouslySetInnerHTML={{ __html: slide.styles }} /> : null}
        <div className="slide-stage__content" dangerouslySetInnerHTML={{ __html: slide.bodyHtml }} />
      </div>
    </div>
  );
}
