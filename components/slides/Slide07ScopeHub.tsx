"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CX = 50;
const CY = 48;
const RADIUS = 35;

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
    icon: "fa-server",
    color: "#0891b2",
    angle: -18,
  },
  {
    id: "db",
    title: "데이터베이스",
    subtitle: "PostgreSQL · CDC",
    icon: "fa-database",
    color: "#0b6a0b",
    angle: 54,
  },
  {
    id: "sec",
    title: "보안 · 거버넌스",
    subtitle: "SSO · RBAC · Quality Gate",
    icon: "fa-shield-halved",
    color: "#5c2d91",
    angle: 126,
  },
  {
    id: "infra",
    title: "인프라 · DevOps",
    subtitle: "Docker · CI/CD · K8s",
    icon: "fa-cloud",
    color: "#ca5010",
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
    <div
      className="s07-hub"
      role="img"
      aria-label="AI 생산성 혁신을 중심으로 프론트엔드, 백엔드, 데이터베이스, 보안·거버넌스, 인프라·DevOps가 연결된 통합 플랫폼 다이어그램"
    >
      <svg className="s07-hub__canvas" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id="s07-hub-glow" cx="50%" cy="48%" r="42%">
            <stop offset="0%" stopColor="#0078d4" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#0078d4" stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect x={0} y={0} width={100} height={100} fill="url(#s07-hub-glow)" />

        {!reduceMotion ? (
          <motion.circle
            cx={CX}
            cy={CY}
            r={12}
            fill="none"
            stroke="rgba(0,120,212,0.2)"
            strokeWidth={0.4}
            strokeDasharray="2 1.5"
            animate={{ r: [12, 15.5, 12], opacity: [0.5, 0.18, 0.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}

        {SPOKES.map((spoke, i) => {
          const end = polar(spoke.angle, RADIUS);
          return (
            <g key={spoke.id}>
              <line
                x1={CX}
                y1={CY}
                x2={end.x}
                y2={end.y}
                stroke={spoke.color}
                strokeWidth={0.55}
                strokeLinecap="round"
                opacity={0.28}
              />
              <line
                x1={CX}
                y1={CY}
                x2={end.x}
                y2={end.y}
                stroke={spoke.color}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeDasharray="2 1.6"
                opacity={0.62}
              >
                {!reduceMotion ? (
                  <animate attributeName="stroke-dashoffset" from="0" to="-7" dur="2.4s" repeatCount="indefinite" />
                ) : null}
              </line>
              <circle cx={end.x} cy={end.y} r={0.75} fill={spoke.color} opacity={0.85} />
              {!reduceMotion ? (
                <motion.circle
                  r={0.65}
                  fill={spoke.color}
                  animate={{
                    cx: [CX, end.x],
                    cy: [CY, end.y],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{
                    duration: 2.2,
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
        initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="s07-hub__core-ring" aria-hidden="true" />
        <div className="s07-hub__core-icon">
          <i className="fas fa-robot" aria-hidden="true" />
        </div>
        <div className="s07-hub__core-title">AI</div>
        <div className="s07-hub__core-sub">생산성 혁신</div>
      </motion.div>

      {SPOKES.map((spoke, i) => {
        const pos = polar(spoke.angle, RADIUS);
        return (
          <motion.div
            key={spoke.id}
            className="s07-hub__node"
            style={
              {
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                "--node-color": spoke.color,
              } as CSSProperties
            }
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.42, delay: 0.12 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="s07-hub__node-icon">
              <i className={`fas ${spoke.icon}`} aria-hidden="true" />
            </div>
            <div className="s07-hub__node-copy">
              <div className="s07-hub__node-title">{spoke.title}</div>
              <div className="s07-hub__node-sub">{spoke.subtitle}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
