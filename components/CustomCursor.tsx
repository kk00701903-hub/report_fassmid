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

function useCursorEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!reduceMotion && !coarsePointer);
  }, []);

  return enabled;
}

function usePresentationFullscreen(): boolean {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function sync() {
      setIsFullscreen(document.fullscreenElement?.id === "presentation-shell");
    }

    sync();
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  return isFullscreen;
}

export default function CustomCursor() {
  const deviceEnabled = useCursorEnabled();
  const isPresentationFullscreen = usePresentationFullscreen();
  const enabled = deviceEnabled && isPresentationFullscreen;
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
    () =>
      `custom-cursor-root custom-cursor-root--presentation${cursor.visible ? "" : " is-hidden"}`,
    [cursor.visible],
  );

  if (!enabled || !mounted) return null;

  return (
    <div className={rootClassName} aria-hidden="true">
      <motion.span className="custom-cursor-dot" style={{ x: xMain, y: yMain }} aria-hidden="true" />
    </div>
  );
}
