"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";

import type { SlideMotionType, SlideMotionTier } from "@/components/slides/SlideCanvas";
import { getMotionProfile } from "@/lib/slideMotionProfiles";

import { SlideMotionReadyProvider } from "./SlideMotionReadyContext";
import SlideParticleField from "./SlideParticleField";
import { useSlideGsapEntrance } from "./useSlideGsapEntrance";

type SlideMotionOrchestratorProps = {
  slideId?: number;
  motion?: SlideMotionType;
  motionTier?: SlideMotionTier;
  children: ReactNode;
};

export default function SlideMotionOrchestrator({
  slideId,
  motion,
  motionTier = "medium",
  children,
}: SlideMotionOrchestratorProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const profile = getMotionProfile(motion);
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(Boolean(reduceMotion));
  const slideKey = `${slideId ?? 0}-${motion ?? "default"}`;

  useSlideGsapEntrance(contentRef, profile, slideKey);

  useEffect(() => {
    setEntered(Boolean(reduceMotion));
  }, [slideKey, reduceMotion]);

  return (
    <div
      className="slide-motion-orchestrator"
      data-dynamic-motion={motion}
      data-dynamic-tier={motionTier}
    >
      {profile.particles !== "none" ? <SlideParticleField theme={profile.particles} /> : null}
      <div className="slide-dynamic-aurora" aria-hidden="true" />
      <div className="slide-dynamic-scanlines" aria-hidden="true" />
      <SlideMotionReadyProvider entered={entered}>
        <Motion.div
          ref={contentRef}
          className="slide-motion-content"
          key={slideKey}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985, filter: "blur(6px)" }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            contentRef.current?.classList.add("slide-motion-entered");
            setEntered(true);
          }}
        >
          {children}
        </Motion.div>
      </SlideMotionReadyProvider>
    </div>
  );
}
