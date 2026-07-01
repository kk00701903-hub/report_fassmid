"use client";

import { createContext, useContext, type ReactNode } from "react";

type PresentationMotionContextValue = {
  /** Increments on fullscreen toggle / viewport relayout — restarts diagram loops */
  motionEpoch: number;
  isFullscreen: boolean;
};

const PresentationMotionContext = createContext<PresentationMotionContextValue>({
  motionEpoch: 0,
  isFullscreen: false,
});

export function PresentationMotionProvider({
  motionEpoch,
  isFullscreen,
  children,
}: {
  motionEpoch: number;
  isFullscreen: boolean;
  children: ReactNode;
}) {
  return (
    <PresentationMotionContext.Provider value={{ motionEpoch, isFullscreen }}>
      {children}
    </PresentationMotionContext.Provider>
  );
}

export function usePresentationMotion() {
  return useContext(PresentationMotionContext);
}
