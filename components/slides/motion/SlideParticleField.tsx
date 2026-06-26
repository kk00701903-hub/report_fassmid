"use client";

import { useMemo } from "react";
import Particles, { useParticlesProvider } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

import type { ParticleTheme } from "@/lib/slideMotionProfiles";

type SlideParticleFieldProps = {
  theme: ParticleTheme;
};

function buildOptions(theme: ParticleTheme): ISourceOptions {
  const base: ISourceOptions = {
    fullScreen: false,
    detectRetina: true,
    fpsLimit: 60,
    particles: {
      number: { value: 0 },
      color: { value: ["#00f0ff", "#facc15", "#8b5cf6"] },
      opacity: { value: { min: 0.15, max: 0.55 } },
      size: { value: { min: 1, max: 2.5 } },
      move: {
        enable: true,
        speed: 0.35,
        direction: "none",
        outModes: { default: "out" },
      },
      links: {
        enable: false,
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
        resize: { enable: true },
      },
    },
  };

  if (theme === "spark") {
    return {
      ...base,
      particles: {
        ...base.particles,
        number: { value: 42 },
        move: { ...base.particles!.move, speed: 0.55, random: true },
        opacity: { value: { min: 0.2, max: 0.75 } },
      },
    };
  }

  if (theme === "flow") {
    return {
      ...base,
      particles: {
        ...base.particles,
        number: { value: 28 },
        move: {
          enable: true,
          speed: 0.8,
          direction: "right",
          straight: true,
          outModes: { default: "out" },
        },
        opacity: { value: { min: 0.1, max: 0.45 } },
      },
    };
  }

  if (theme === "grid") {
    return {
      ...base,
      particles: {
        ...base.particles,
        number: { value: 36 },
        move: { enable: true, speed: 0.25, direction: "top" },
        links: {
          enable: true,
          distance: 110,
          opacity: 0.12,
          width: 1,
          color: "#00f0ff",
        },
      },
    };
  }

  return base;
}

export default function SlideParticleField({ theme }: SlideParticleFieldProps) {
  const { loaded } = useParticlesProvider();
  const options = useMemo(() => buildOptions(theme), [theme]);

  if (!loaded || theme === "none") return null;

  return (
    <Particles
      id={`slide-particles-${theme}`}
      className="slide-dynamic-particles"
      options={options}
    />
  );
}
