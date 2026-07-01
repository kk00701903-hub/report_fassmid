"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { CountUp } from "countup.js";

import type { SlideMotionProfile } from "@/lib/slideMotionProfiles";

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function queryAll(root: HTMLElement, selector: string): HTMLElement[] {
  if (!selector.trim()) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter((el) => {
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
  });
}

function parseNumericText(text: string): number | null {
  const cleaned = text.replace(/,/g, "").trim();
  const match = cleaned.match(/^([+-]?\d+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

export function useSlideGsapEntrance(
  containerRef: RefObject<HTMLElement | null>,
  profile: SlideMotionProfile,
  slideKey: string,
) {
  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root || prefersReducedMotion()) return;

    const titles = queryAll(root, profile.titleSelectors);
    const items = queryAll(root, profile.staggerSelectors);
    const counts = queryAll(root, profile.countSelectors);

    const ctx = gsap.context(() => {
      gsap.set([...titles, ...items], { willChange: "transform, opacity" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (titles.length) {
        tl.from(titles, {
          y: 22,
          opacity: 0,
          duration: 0.55,
          stagger: 0.07,
        });
      }

      if (items.length) {
        tl.from(
          items,
          {
            y: 16,
            opacity: 0,
            scale: 0.97,
            duration: 0.42,
            stagger: 0.045,
          },
          titles.length ? "-=0.18" : 0,
        );
      }

      const counters: CountUp[] = [];
      counts.forEach((el, index) => {
        const raw = el.textContent ?? "";
        const target = parseNumericText(raw);
        if (target === null || target > 99999) return;

        const counter = new CountUp(el, target, {
          duration: 1.6,
          separator: ",",
          useGrouping: true,
        });
        counters.push(counter);
        tl.add(() => {
          if (!counter.error) counter.start();
        }, 0.4 + index * 0.08);
      });

      if (profile.accentSweep) {
        tl.add(() => {
          root.classList.add("slide-dynamic-sweep-active");
        }, 0.1);
      }

      const animatedEls = [...titles, ...items];
      if (animatedEls.length) {
        tl.eventCallback("onComplete", () => {
          gsap.set(animatedEls, { opacity: 1, clearProps: "transform,scale,willChange" });
          root.classList.add("slide-gsap-complete");
        });
      }
    }, root);

    return () => {
      root.classList.remove("slide-dynamic-sweep-active", "slide-gsap-complete");
      root.classList.remove("slide-motion-entered");
      ctx.revert();
    };
  }, [containerRef, profile, slideKey]);
}
