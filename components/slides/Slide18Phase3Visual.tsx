"use client";

import { motion, useReducedMotion } from "framer-motion";

const ORBIT_DOTS = [0, 120, 240] as const;

export default function Slide18Phase3Visual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="s18-p3-visual" aria-hidden="true">
      <div className="s18-p3-visual__scene">
        <motion.div
          className="s18-p3-plate s18-p3-plate--base"
          animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="s18-p3-plate s18-p3-plate--mid"
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        />
        <motion.div
          className="s18-p3-plate s18-p3-plate--top"
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />

        <motion.div
          className="s18-p3-core"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -5, 0],
                  rotateY: [0, 180, 360],
                }
          }
          transition={{
            y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 7, repeat: Infinity, ease: "linear" },
          }}
        >
          <i className="fas fa-cubes" />
        </motion.div>

        {!reduceMotion
          ? ORBIT_DOTS.map((startDeg, i) => (
              <motion.div
                key={startDeg}
                className="s18-p3-orbit"
                initial={{ rotate: startDeg }}
                animate={{ rotate: startDeg + 360 }}
                transition={{
                  duration: 5 + i * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="s18-p3-orbit__dot" />
              </motion.div>
            ))
          : null}

        <motion.div
          className="s18-p3-tag s18-p3-tag--arch"
          animate={reduceMotion ? undefined : { x: [0, 2, 0], y: [0, -2, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Arch
        </motion.div>
        <motion.div
          className="s18-p3-tag s18-p3-tag--poc"
          animate={reduceMotion ? undefined : { x: [0, -2, 0], y: [0, 2, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          PoC
        </motion.div>
      </div>
    </div>
  );
}
