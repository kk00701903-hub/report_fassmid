"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  getCursorPosition,
  hideCursorPosition,
  subscribeCursorPosition,
  updateCursorPosition,
} from "@/lib/cursorPosition";
import "./CustomCursor.css";

const SPRING_MAIN = { stiffness: 700, damping: 32, mass: 0.35 };
const SPRING_TRAIL_1 = { stiffness: 420, damping: 28, mass: 0.5 };
const SPRING_TRAIL_2 = { stiffness: 280, damping: 26, mass: 0.65 };
const SPRING_TRAIL_3 = { stiffness: 180, damping: 24, mass: 0.8 };

function useCursorEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!reduceMotion && !coarsePointer);
  }, []);

  return enabled;
}

export default function CustomCursor() {
  const enabled = useCursorEnabled();
  const [mounted, setMounted] = useState(false);
  const cursor = useSyncExternalStore(subscribeCursorPosition, getCursorPosition, () => ({
    x: 0,
    y: 0,
    visible: false,
  }));

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xMain = useSpring(x, SPRING_MAIN);
  const yMain = useSpring(y, SPRING_MAIN);
  const xTrail1 = useSpring(x, SPRING_TRAIL_1);
  const yTrail1 = useSpring(y, SPRING_TRAIL_1);
  const xTrail2 = useSpring(x, SPRING_TRAIL_2);
  const yTrail2 = useSpring(y, SPRING_TRAIL_2);
  const xTrail3 = useSpring(x, SPRING_TRAIL_3);
  const yTrail3 = useSpring(y, SPRING_TRAIL_3);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onPointerMove = (event: PointerEvent) => {
      updateCursorPosition(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      hideCursorPosition();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      hideCursorPosition();
    };
  }, [enabled, mounted]);

  useEffect(() => {
    if (!cursor.visible) return;
    x.set(cursor.x);
    y.set(cursor.y);
  }, [cursor.visible, cursor.x, cursor.y, x, y]);

  const rootClassName = useMemo(
    () => `custom-cursor-root${cursor.visible ? "" : " is-hidden"}`,
    [cursor.visible],
  );

  if (!enabled || !mounted) return null;

  return (
    <div className={rootClassName} aria-hidden="true">
      <motion.span
        className="custom-cursor-trail custom-cursor-trail--3"
        style={{ x: xTrail3, y: yTrail3 }}
        aria-hidden="true"
      />
      <motion.span
        className="custom-cursor-trail custom-cursor-trail--2"
        style={{ x: xTrail2, y: yTrail2 }}
        aria-hidden="true"
      />
      <motion.span
        className="custom-cursor-trail custom-cursor-trail--1"
        style={{ x: xTrail1, y: yTrail1 }}
        aria-hidden="true"
      />
      <motion.span className="custom-cursor-dot" style={{ x: xMain, y: yMain }} aria-hidden="true" />
    </div>
  );
}
