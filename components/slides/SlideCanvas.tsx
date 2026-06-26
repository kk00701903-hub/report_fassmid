"use client";

import { forwardRef, type CSSProperties, type ReactNode } from "react";

import { SLIDE_CANVAS_CLASS } from "@/lib/slideConstants";

export type SlideMotionType =
  | "cover"
  | "part"
  | "cards"
  | "timeline"
  | "pipeline"
  | "compare"
  | "innovation"
  | "architecture"
  | "roadmap"
  | "closing";

export type SlideMotionTier = "medium" | "subtle";

export type SlideCanvasProps = {
  slideId?: number;
  motion?: SlideMotionType;
  motionTier?: SlideMotionTier;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function getScopeClass(slideId?: number): string | undefined {
  if (!slideId || slideId < 1) return undefined;
  return `slide-s${String(slideId).padStart(2, "0")}`;
}

const SlideCanvas = forwardRef<HTMLDivElement, SlideCanvasProps>(function SlideCanvas(
  { slideId, motion, motionTier = "medium", className, style, children },
  ref,
) {
  const scopeClass = getScopeClass(slideId);

  return (
    <div
      ref={ref}
      className={[SLIDE_CANVAS_CLASS, scopeClass, className].filter(Boolean).join(" ")}
      data-motion={motion}
      data-motion-tier={motionTier}
      style={{
        width: 960,
        height: 720,
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
});

export default SlideCanvas;
