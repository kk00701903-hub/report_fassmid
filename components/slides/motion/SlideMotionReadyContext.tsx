"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

import { usePresentationMotion } from "@/components/presentation/PresentationMotionContext";

type SlideMotionReadyContextValue = {
  entered: boolean;
};

const SlideMotionReadyContext = createContext<SlideMotionReadyContextValue>({ entered: false });

export function SlideMotionReadyProvider({
  entered,
  children,
}: {
  entered: boolean;
  children: ReactNode;
}) {
  return (
    <SlideMotionReadyContext.Provider value={{ entered }}>{children}</SlideMotionReadyContext.Provider>
  );
}

export function useSlideMotionEntered() {
  return useContext(SlideMotionReadyContext).entered;
}

/**
 * Defers diagram loops until the slide entrance animation has finished and layout
 * has settled — avoids empty SVG paths and motion that never starts during blur.
 * Re-runs when presentation fullscreen / scale changes (motionEpoch).
 */
export function useSlideDiagramMotion(enabled = true) {
  const reduceMotion = useReducedMotion();
  const entered = useSlideMotionEntered();
  const { motionEpoch } = usePresentationMotion();
  const [layoutReady, setLayoutReady] = useState(false);

  useEffect(() => {
    setLayoutReady(false);
    if (!enabled || reduceMotion || !entered) return;

    let cancelled = false;
    const markReady = () => {
      if (!cancelled) setLayoutReady(true);
    };

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(markReady);
    });
    const timer = window.setTimeout(markReady, motionEpoch > 0 ? 80 : 120);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      window.clearTimeout(timer);
    };
  }, [enabled, reduceMotion, entered, motionEpoch]);

  const ready = enabled && entered && layoutReady && !reduceMotion;

  return {
    ready,
    animating: ready,
    reduceMotion: Boolean(reduceMotion),
  };
}
