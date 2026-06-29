"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CX = 280;
const CY = 168;
const RADIUS = 118;

const SPOKES = [
  {
    id: "fe",
    title: "프론트엔드",
    subtitle: "Next.js · React · RealGrid",
    icon: "fa-desktop",
    color: "#0078d4",
    angle: -90,
  },
  {
    id: "was",
    title: "백엔드 (WAS)",
    subtitle: "수주 · 발주 · 정산 API",
    icon: "fa-cogs",
    color: "#0891b2",
    angle: -18,
  },
  {
    id: "db",
    title: "데이터베이스",
    subtitle: "PostgreSQL · CDC",
    icon: "fa-database",
    color: "#10b981",
    angle: 54,
  },
  {
    id: "sec",
    title: "보안 · 거버넌스",
    subtitle: "SSO · RBAC · Quality Gate",
    icon: "fa-shield-halved",
    color: "#8b5cf6",
    angle: 126,
  },
  {
    id: "infra",
    title: "인프라 · DevOps",
    subtitle: "Docker · CI/CD · K8s",
    icon: "fa-cloud",
    color: "#f97316",
    angle: 198,
  },
] as const;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

export default function Slide07ScopeHub() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="s07-hub" aria-hidden="true">
      <svg className="s07-hub__svg" viewBox="0 0 560 336">
        <defs>
          <radialGradient id="s07-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
          </radialGradient>
          <filter id="s07-hub-blur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <circle cx={CX} cy={CY} r={92} fill="url(#s07-hub-glow)" filter="url(#s07-hub-blur)" />

        {!reduceMotion ? (
          <motion.circle
            cx={CX}
            cy={CY}
            r={52}
            fill="none"
            stroke="rgba(56,189,248,0.35)"
            strokeWidth={1.5}
            animate={{ r: [52, 68, 52], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}

        {SPOKES.map((spoke, i) => {
          const end = polar(spoke.angle, RADIUS);
          return (
            <g key={spoke.id}>
              <motion.line
                x1={CX}
                y1={CY}
                x2={end.x}
                y2={end.y}
                stroke={spoke.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="6 5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8, strokeDashoffset: reduceMotion ? 0 : [0, -22] }}
                transition={{
                  opacity: { duration: 0.4, delay: i * 0.08 },
                  strokeDashoffset: reduceMotion ? undefined : { duration: 1.2, repeat: Infinity, ease: "linear" },
                }}
              />
              {!reduceMotion ? (
                <motion.circle
                  r={4}
                  fill={spoke.color}
                  animate={{
                    cx: [CX, end.x],
                    cy: [CY, end.y],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.35,
                    ease: "easeInOut",
                  }}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      <motion.div
        className="s07-hub__core"
        initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="s07-hub__core-ring" />
        <motion.div
          className="s07-hub__core-icon"
          animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <i className="fas fa-robot" />
        </motion.div>
        <div className="s07-hub__core-title">AI</div>
        <div className="s07-hub__core-sub">생산성 혁신</div>
        <div className="s07-hub__core-tags">
          <span>디지털 워커</span>
          <span>Claude Code</span>
          <span>PoC · 워룸</span>
        </div>
      </motion.div>

      {SPOKES.map((spoke, i) => {
        const pos = polar(spoke.angle, RADIUS);
        const leftPct = (pos.x / 560) * 100;
        const topPct = (pos.y / 336) * 100;

        return (
          <motion.div
            key={spoke.id}
            className="s07-hub__node"
            style={
              {
                left: `${leftPct}%`,
                top: `${topPct}%`,
                "--node-color": spoke.color,
              } as CSSProperties
            }
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="s07-hub__node-icon">
              <i className={`fas ${spoke.icon}`} />
            </div>
            <div className="s07-hub__node-title">{spoke.title}</div>
            <div className="s07-hub__node-sub">{spoke.subtitle}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
