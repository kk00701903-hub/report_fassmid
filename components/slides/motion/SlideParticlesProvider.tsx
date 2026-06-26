"use client";

import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ReactNode } from "react";

type SlideParticlesProviderProps = {
  children: ReactNode;
};

export default function SlideParticlesProvider({ children }: SlideParticlesProviderProps) {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      {children}
    </ParticlesProvider>
  );
}
