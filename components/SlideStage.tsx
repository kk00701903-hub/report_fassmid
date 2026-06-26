"use client";

import {
  Suspense,
  forwardRef,
  useEffect,
  type ComponentType,
  type LazyExoticComponent,
} from "react";

export const SLIDE_WIDTH = 960;
export const SLIDE_HEIGHT = 720;
export const SLIDE_ASPECT = SLIDE_WIDTH / SLIDE_HEIGHT;

type SlideComponentType = ComponentType | LazyExoticComponent<ComponentType>;

type SlideStageProps = {
  SlideComponent?: SlideComponentType | null;
  src?: string;
  srcDoc?: string;
  scale: number;
  direction: "forward" | "back" | "none";
  title?: string;
  onReady?: () => void;
};

const SlideStage = forwardRef<HTMLDivElement, SlideStageProps>(function SlideStage(
  { SlideComponent, src, srcDoc, scale, direction, title = "슬라이드", onReady },
  ref,
) {
  const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
  const animationClass =
    direction === "forward"
      ? "slide-stage--enter-forward"
      : direction === "back"
        ? "slide-stage--enter-back"
        : "";

  const frameWidth = SLIDE_WIDTH * safeScale;
  const frameHeight = SLIDE_HEIGHT * safeScale;
  const isCustom = Boolean(src || srcDoc);

  useEffect(() => {
    if (isCustom || !SlideComponent || !onReady) return;

    let cancelled = false;
    const finish = () => {
      if (!cancelled) onReady();
    };

    const raf = requestAnimationFrame(() => {
      void document.fonts?.ready.then(finish).catch(finish);
    });
    const timer = window.setTimeout(finish, 600);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [SlideComponent, isCustom, onReady, src, srcDoc]);

  return (
    <div className={`slide-stage slide-stage--projector ${animationClass}`}>
      <div
        className="slide-stage__frame"
        style={{
          width: frameWidth,
          height: frameHeight,
        }}
      >
        {isCustom ? (
          <iframe
            className="slide-stage__iframe"
            src={src}
            srcDoc={srcDoc}
            title={title}
            onLoad={onReady}
            style={{
              width: SLIDE_WIDTH,
              height: SLIDE_HEIGHT,
              transform: `scale(${safeScale})`,
            }}
          />
        ) : SlideComponent ? (
          <div
            ref={ref}
            className="slide-stage__canvas"
            style={{
              width: SLIDE_WIDTH,
              height: SLIDE_HEIGHT,
              transform: `scale(${safeScale})`,
            }}
          >
            <div className="slide-stage__content">
              <Suspense fallback={null}>
                <SlideComponent />
              </Suspense>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default SlideStage;
