"use client";

export const SLIDE_WIDTH = 960;
export const SLIDE_HEIGHT = 720;
export const SLIDE_ASPECT = SLIDE_WIDTH / SLIDE_HEIGHT; // 4:3

type SlideStageProps = {
  src?: string;
  srcDoc?: string;
  scale: number;
  direction: "forward" | "back" | "none";
  title?: string;
  onLoad?: () => void;
};

export default function SlideStage({
  src,
  srcDoc,
  scale,
  direction,
  title = "슬라이드",
  onLoad,
}: SlideStageProps) {
  const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
  const animationClass =
    direction === "forward"
      ? "slide-stage--enter-forward"
      : direction === "back"
        ? "slide-stage--enter-back"
        : "";

  const frameWidth = SLIDE_WIDTH * safeScale;
  const frameHeight = SLIDE_HEIGHT * safeScale;

  return (
    <div className={`slide-stage slide-stage--projector ${animationClass}`}>
      <div
        className="slide-stage__frame"
        style={{
          width: frameWidth,
          height: frameHeight,
        }}
      >
        <iframe
          className="slide-stage__iframe"
          src={src}
          srcDoc={srcDoc}
          title={title}
          onLoad={onLoad}
          style={{
            width: SLIDE_WIDTH,
            height: SLIDE_HEIGHT,
            transform: `scale(${safeScale})`,
          }}
        />
      </div>
    </div>
  );
}
