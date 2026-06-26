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
  motion?: SlideMotionType;
  motionTier?: SlideMotionTier;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const SlideCanvas = forwardRef<HTMLDivElement, SlideCanvasProps>(function SlideCanvas(
  { motion, motionTier = "medium", className, style, children },
  ref,
) {
  return (
    <div
      ref={ref}
      className={[SLIDE_CANVAS_CLASS, className].filter(Boolean).join(" ")}
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
