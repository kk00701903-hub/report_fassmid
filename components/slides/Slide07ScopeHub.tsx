"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CX = 50;
const CY = 48;
const RADIUS = 34;

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
    <div className="s07-hub" aria-hidden="true">
      <svg className="s07-hub__canvas" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="s07-hub-glow" cx="50%" cy="48%" r="42%">
            <stop offset="0%" stopColor="#0078d4" stopOpacity={0.1} />
            <stop offset="100%" stopColor="#0078d4" stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect x={0} y={0} width={100} height={100} fill="url(#s07-hub-glow)" />

        {!reduceMotion ? (
          <motion.circle
            cx={CX}
            cy={CY}
            r={11}
            fill="none"
            stroke="rgba(0,120,212,0.22)"
            strokeWidth={0.35}
            strokeDasharray="2 1.5"
            animate={{ r: [11, 14.5, 11], opacity: [0.45, 0.15, 0.45] }}
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
                strokeWidth={0.45}
                strokeLinecap="round"
                opacity={0.35}
              />
              <line
                x1={CX}
                y1={CY}
                x2={end.x}
                y2={end.y}
                stroke={spoke.color}
                strokeWidth={0.45}
                strokeLinecap="round"
                strokeDasharray="1.8 1.4"
                opacity={0.55}
              >
                {!reduceMotion ? (
                  <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="2.4s" repeatCount="indefinite" />
                ) : null}
              </line>
              {!reduceMotion ? (
                <motion.circle
                  r={0.55}
                  fill={spoke.color}
                  animate={{
                    cx: [CX, end.x],
                    cy: [CY, end.y],
                    opacity: [0, 0.85, 0],
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
        <div className="s07-hub__core-tags">
          <span>디지털 워커</span>
          <span>Claude Code</span>
          <span>PoC · 워룸</span>
        </div>
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

      <p className="s07-hub__caption">
        AI를 허브로 <strong>5대 기술 영역</strong>이 유기적으로 연결되는 통합 플랫폼
      </p>
    </div>
  );
}
