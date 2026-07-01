"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";

import { usePresentationMotion } from "@/components/presentation/PresentationMotionContext";
import type { SlideMotionType, SlideMotionTier } from "@/components/slides/SlideCanvas";
import { getMotionProfile } from "@/lib/slideMotionProfiles";
import { restartSlideAnimations } from "@/lib/restartSlideAnimations";

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
  const { motionEpoch, isFullscreen } = usePresentationMotion();
  const [entered, setEntered] = useState(Boolean(reduceMotion));
  const slideKey = `${slideId ?? 0}-${motion ?? "default"}`;

  useSlideGsapEntrance(contentRef, profile, slideKey);

  const markEntered = () => {
    contentRef.current?.classList.add("slide-motion-entered");
    setEntered(true);
  };

  useEffect(() => {
    if (reduceMotion) {
      markEntered();
      return;
    }

    setEntered(false);
    contentRef.current?.classList.remove("slide-motion-entered");

    const fallback = window.setTimeout(markEntered, 750);
    return () => window.clearTimeout(fallback);
  }, [slideKey, reduceMotion]);

  useEffect(() => {
    if (!entered || reduceMotion) return;

    const shell = contentRef.current?.closest(".presentation-shell");
    const restart = () => restartSlideAnimations(shell ?? contentRef.current ?? document);

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(restart);
    });
    const timer = window.setTimeout(restart, isFullscreen ? 120 : 60);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [entered, motionEpoch, isFullscreen, reduceMotion]);

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
          onAnimationComplete={markEntered}
        >
          <div key={`diagram-epoch-${motionEpoch}`} className="slide-motion-diagram-root">
            {children}
          </div>
        </Motion.div>
      </SlideMotionReadyProvider>
    </div>
  );
}
