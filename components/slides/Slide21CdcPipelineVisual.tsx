"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const STACK = [
  { id: "oracle", label: "Oracle", sub: "Legacy Source", color: "#c2410c", glow: "#fb923c" },
  { id: "debezium", label: "Debezium", sub: "CDC Capture", color: "#0078d4", glow: "#38bdf8", hero: true },
  { id: "kafka", label: "Kafka", sub: "Event Stream", color: "#7c3aed", glow: "#a78bfa", hero: true },
  { id: "postgres", label: "PostgreSQL", sub: "Next-Gen Target", color: "#107c10", glow: "#4ade80" },
] as const;

const PACKET_COLORS = ["#38bdf8", "#a78bfa", "#4ade80", "#fbbf24"];

function DataPacket({ pathId, delay, color }: { pathId: string; delay: number; color: string }) {
  return (
    <motion.circle
      r={4}
      fill={color}
      filter="url(#s21-glow)"
      animate={{ offsetDistance: ["0%", "100%"] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay }}
      style={{ offsetPath: `path('${pathId}')`, offsetRotate: "0deg" }}
    />
  );
}

export default function Slide21CdcPipelineVisual() {
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(1);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setActiveIdx((v) => (v + 1) % STACK.length), 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const animating = !reduceMotion;
  const activeStack = STACK[activeIdx];
  const heroActive = "hero" in activeStack && activeStack.hero === true;

  const pathMain =
    "M 72 58 C 110 58, 118 58, 156 58 C 194 58, 202 58, 240 58";

  return (
    <div className="poc-pipeline-visual-wrap">
      <div className="poc-pipeline-visual-stage">
        <svg viewBox="0 0 312 118" className="poc-pipeline-svg" aria-hidden="true">
          <defs>
            <linearGradient id="s21-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f2744" />
            </linearGradient>
            <linearGradient id="s21-stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#a78bfa" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.85" />
            </linearGradient>
            <filter id="s21-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="s21-hero-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x={4} y={4} width={304} height={110} rx={10} fill="url(#s21-bg-grad)" stroke="rgba(56,189,248,0.35)" strokeWidth={1.2} />

          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`grid-${i}`}
              x1={20 + i * 68}
              y1={12}
              x2={20 + i * 68}
              y2={106}
              stroke="rgba(148,163,184,0.08)"
              strokeWidth={1}
            />
          ))}

          <motion.text
            x={156}
            y={18}
            textAnchor="middle"
            fontSize={9}
            fontWeight={800}
            fill="#7dd3fc"
            letterSpacing="0.12em"
            animate={animating ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.85 }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            REAL-TIME CDC PIPELINE
          </motion.text>

          {/* Oracle node */}
          <g transform="translate(18, 34)">
            <motion.rect
              x={0}
              y={0}
              width={54}
              height={48}
              rx={8}
              fill={activeIdx === 0 ? "rgba(251,146,60,0.22)" : "rgba(251,146,60,0.08)"}
              stroke={activeIdx === 0 ? "#fb923c" : "rgba(251,146,60,0.45)"}
              strokeWidth={activeIdx === 0 ? 2.2 : 1.2}
              animate={activeIdx === 0 && animating ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              style={{ transformOrigin: "27px 24px" }}
              transition={{ duration: 1.2, repeat: activeIdx === 0 && animating ? Infinity : 0 }}
            />
            <text x={27} y={22} textAnchor="middle" fontSize={16}>
              🗄️
            </text>
            <text x={27} y={38} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#fdba74">
              Oracle
            </text>
            <text x={27} y={48} textAnchor="middle" fontSize={7} fill="#94a3b8">
              Legacy
            </text>
          </g>

          {/* Hero hub: Debezium + Kafka */}
          <g transform="translate(118, 26)">
            <motion.ellipse
              cx={38}
              cy={34}
              rx={52}
              ry={38}
              fill="none"
              stroke="url(#s21-stream-grad)"
              strokeWidth={heroActive && animating ? 2.4 : 1.2}
              opacity={heroActive ? 0.95 : 0.35}
              animate={
                animating
                  ? { rotate: 360, scale: heroActive ? [1, 1.06, 1] : 1 }
                  : { rotate: 0, scale: 1 }
              }
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.4, repeat: heroActive ? Infinity : 0 },
              }}
              style={{ transformOrigin: "38px 34px" }}
            />
            <motion.rect
              x={0}
              y={0}
              width={76}
              height={68}
              rx={10}
              fill={
                heroActive
                  ? "rgba(56,189,248,0.18)"
                  : activeIdx === 3
                    ? "rgba(74,222,128,0.08)"
                    : "rgba(56,189,248,0.06)"
              }
              stroke={heroActive ? "#38bdf8" : "rgba(56,189,248,0.35)"}
              strokeWidth={heroActive ? 2.5 : 1.2}
              filter={heroActive ? "url(#s21-hero-glow)" : undefined}
            />
            <motion.text
              x={38}
              y={24}
              textAnchor="middle"
              fontSize={18}
              animate={heroActive && animating ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.9, repeat: heroActive ? Infinity : 0 }}
            >
              ⚡
            </motion.text>
            <text x={38} y={42} textAnchor="middle" fontSize={9} fontWeight={800} fill="#7dd3fc">
              Debezium
            </text>
            <text x={38} y={54} textAnchor="middle" fontSize={9} fontWeight={800} fill="#c4b5fd">
              Kafka
            </text>
            <text x={38} y={64} textAnchor="middle" fontSize={7} fill="#94a3b8">
              CDC · Stream
            </text>

            {animating
              ? [0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.circle
                    key={`spark-${i}`}
                    cx={12 + (i % 3) * 26}
                    cy={10 + Math.floor(i / 3) * 48}
                    r={2}
                    fill={i % 2 === 0 ? "#38bdf8" : "#a78bfa"}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.4, 0.5],
                      y: [0, -6, 0],
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
                  />
                ))
              : null}
          </g>

          {/* PostgreSQL node */}
          <g transform="translate(240, 34)">
            <motion.rect
              x={0}
              y={0}
              width={54}
              height={48}
              rx={8}
              fill={activeIdx === 3 ? "rgba(74,222,128,0.22)" : "rgba(74,222,128,0.08)"}
              stroke={activeIdx === 3 ? "#4ade80" : "rgba(74,222,128,0.45)"}
              strokeWidth={activeIdx === 3 ? 2.2 : 1.2}
              animate={activeIdx === 3 && animating ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              style={{ transformOrigin: "27px 24px" }}
              transition={{ duration: 1.2, repeat: activeIdx === 3 && animating ? Infinity : 0 }}
            />
            <text x={27} y={22} textAnchor="middle" fontSize={16}>
              🐘
            </text>
            <text x={27} y={38} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#86efac">
              PostgreSQL
            </text>
            <text x={27} y={48} textAnchor="middle" fontSize={7} fill="#94a3b8">
              Target
            </text>
          </g>

          {/* Stream paths */}
          <motion.path
            d={pathMain}
            fill="none"
            stroke="url(#s21-stream-grad)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="8 6"
            animate={animating ? { strokeDashoffset: [0, -28] } : { strokeDashoffset: 0 }}
            transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
          />

          {animating
            ? PACKET_COLORS.map((color, i) => (
                <DataPacket key={color} pathId={pathMain} delay={i * 0.35} color={color} />
              ))
            : null}

          <motion.circle
            cx={156}
            cy={58}
            r={5}
            fill="#38bdf8"
            filter="url(#s21-glow)"
            animate={animating ? { cx: [72, 156, 240, 240], opacity: [0.4, 1, 1, 0.3] } : { cx: 156, opacity: 0.6 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.85, 1] }}
          />

          <text x={156} y={98} textAnchor="middle" fontSize={8} fontWeight={700} fill="#64748b">
            INSERT · UPDATE · DELETE → 0.1s 실시간 동기화
          </text>
        </svg>

        {animating ? (
          <motion.span
            className="poc-pipeline-live-badge"
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.96, 1, 0.96] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            LIVE
          </motion.span>
        ) : null}
      </div>

      <div className="poc-pipeline-stack-row">
        {STACK.map((item, idx) => {
          const active = activeIdx === idx;
          return (
            <motion.div
              key={item.id}
              className={`poc-stack-chip${"hero" in item && item.hero ? " poc-stack-chip--hero" : ""}${active ? " poc-stack-chip--active" : ""}`}
              animate={
                active && animating
                  ? {
                      scale: "hero" in item && item.hero ? 1.08 : 1.04,
                      boxShadow: `0 0 18px ${item.glow}88, 0 0 0 2px ${item.color}`,
                    }
                  : { scale: 1, boxShadow: "0 0 0 0 transparent" }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="poc-stack-chip__dot" style={{ background: item.color, boxShadow: active ? `0 0 8px ${item.glow}` : "none" }} />
              <span className="poc-stack-chip__label">{item.label}</span>
              <span className="poc-stack-chip__sub">{item.sub}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
