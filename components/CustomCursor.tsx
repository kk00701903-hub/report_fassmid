"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  getCursorPosition,
  hideCursorPosition,
  subscribeCursorPosition,
  updateCursorPosition,
} from "@/lib/cursorPosition";
import "./CustomCursor.css";

const SPRING_MAIN = { stiffness: 700, damping: 32, mass: 0.35 };

function useProjectorMode(): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function sync() {
      const shell = document.getElementById("presentation-shell");
      setActive(Boolean(shell?.classList.contains("presentation-shell--projector")));
    }

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

function getViewportCenter(): { x: number; y: number } {
  return {
    x: Math.round(window.innerWidth / 2),
    y: Math.round(window.innerHeight / 2),
  };
}

export default function CustomCursor() {
  const isProjector = useProjectorMode();
  const [mounted, setMounted] = useState(false);
  const cursor = useSyncExternalStore(subscribeCursorPosition, getCursorPosition, () => ({
    x: 0,
    y: 0,
    visible: true,
  }));

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xMain = useSpring(x, SPRING_MAIN);
  const yMain = useSpring(y, SPRING_MAIN);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isProjector || !mounted) return;

    document.documentElement.classList.add("custom-cursor-active");

    const center = getViewportCenter();
    updateCursorPosition(center.x, center.y);
    x.set(center.x);
    y.set(center.y);

    const onMove = (event: MouseEvent | PointerEvent) => {
      updateCursorPosition(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
      hideCursorPosition();
    };
  }, [isProjector, mounted, x, y]);

  useEffect(() => {
    x.set(cursor.x);
    y.set(cursor.y);
  }, [cursor.x, cursor.y, x, y]);

  if (!isProjector || !mounted) return null;

  return (
    <div className="custom-cursor-root custom-cursor-root--projector" aria-hidden="true">
      <motion.div className="custom-cursor-marker" style={{ x: xMain, y: yMain }} aria-hidden="true">
        <span className="custom-cursor-ring" />
        <span className="custom-cursor-dot" />
      </motion.div>
    </div>
  );
}
