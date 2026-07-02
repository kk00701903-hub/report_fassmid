"use client";

import {
  Suspense,
  forwardRef,
  useEffect,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { updateCursorPosition } from "@/lib/cursorPosition";

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
  slideKey?: string;
  onReady?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  canGoPrev?: boolean;
  canGoNext?: boolean;
};

const SlideStage = forwardRef<HTMLDivElement, SlideStageProps>(function SlideStage(
  {
    SlideComponent,
    src,
    srcDoc,
    scale,
    direction,
    title = "슬라이드",
    slideKey = "slide",
    onReady,
    onPrev,
    onNext,
    canGoPrev = false,
    canGoNext = false,
  },
  ref,
) {
  const reduceMotion = useReducedMotion();
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

  const enterX = direction === "forward" ? 48 : direction === "back" ? -48 : 0;

  return (
    <div className={`slide-stage slide-stage--projector ${animationClass}`}>
      <div
        className="slide-stage__frame"
        style={{
          width: frameWidth,
          height: frameHeight,
        }}
        onPointerMove={(event) => updateCursorPosition(event.clientX, event.clientY)}
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={slideKey}
                  className="slide-stage__motion-shell"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x: enterX, scale: 0.97, filter: "blur(4px)" }
                  }
                  animate={
                    reduceMotion
                      ? undefined
                      : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                  }
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          x: direction === "forward" ? -36 : direction === "back" ? 36 : 0,
                          scale: 0.98,
                          filter: "blur(3px)",
                        }
                  }
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Suspense fallback={null}>
                    <SlideComponent />
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : null}

        {onPrev && onNext ? (
          <div
            className="projector-click-layer"
            aria-hidden="true"
            onPointerMove={(event) => updateCursorPosition(event.clientX, event.clientY)}
          >
            <button
              type="button"
              className="projector-click-zone projector-click-zone--prev"
              onMouseDown={(event) => event.preventDefault()}
              onClick={onPrev}
              disabled={!canGoPrev}
              tabIndex={-1}
              aria-hidden="true"
            />
            <button
              type="button"
              className="projector-click-zone projector-click-zone--next"
              onMouseDown={(event) => event.preventDefault()}
              onClick={onNext}
              disabled={!canGoNext}
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default SlideStage;
