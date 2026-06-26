"use client";

import { Suspense } from "react";

import SlideParticlesProvider from "@/components/slides/motion/SlideParticlesProvider";
import { getSlideComponent } from "@/lib/slideRegistry";

type AuditSlideViewProps = {
  slideId: number;
};

export default function AuditSlideView({ slideId }: AuditSlideViewProps) {
  const SlideComponent = getSlideComponent(slideId);
  if (!SlideComponent) return null;

  return (
    <SlideParticlesProvider>
    <div
      className="audit-slide-shell"
      style={{
        width: 960,
        height: 720,
        overflow: "hidden",
        margin: 0,
        background: "#0a0e1a",
      }}
    >
      <Suspense fallback={null}>
        <SlideComponent />
      </Suspense>
    </div>
    </SlideParticlesProvider>
  );
}
