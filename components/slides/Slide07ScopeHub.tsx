"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** viewBox 0–100 기준 허브 기하 */
const CX = 50;
const CY = 50;
const CORE_R = 13.5;
const NODE_R = 44.5;

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

type CardPlacement = {
  transform: string;
  transformOrigin: string;
};

/** spoke id별 — 선 끝(anchor)에 카드 안쪽 모서리가 닿도록 */
const PLACEMENT_BY_ID: Record<(typeof SPOKES)[number]["id"], CardPlacement> = {
  fe: { transform: "translate(-50%, -100%)", transformOrigin: "50% 100%" },
  was: { transform: "translate(0%, -50%)", transformOrigin: "0% 50%" },
  db: { transform: "translate(-50%, 0%)", transformOrigin: "50% 0%" },
  sec: { transform: "translate(-100%, 0%)", transformOrigin: "100% 0%" },
  infra: { transform: "translate(-100%, -50%)", transformOrigin: "100% 50%" },
};

function cardPlacement(spokeId: (typeof SPOKES)[number]["id"], angleDeg: number): CardPlacement {
  if (PLACEMENT_BY_ID[spokeId]) return PLACEMENT_BY_ID[spokeId];

  const cos = Math.cos((angleDeg * Math.PI) / 180);
  const sin = Math.sin((angleDeg * Math.PI) / 180);

  if (sin < -0.75) return { transform: "translate(-50%, -100%)", transformOrigin: "50% 100%" };
  if (sin > 0.75) return { transform: "translate(-50%, 0%)", transformOrigin: "50% 0%" };
  if (cos > 0.45) return { transform: "translate(0%, -50%)", transformOrigin: "0% 50%" };
  return { transform: "translate(-100%, -50%)", transformOrigin: "100% 50%" };
}

export default function Slide07ScopeHub() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="s07-hub" aria-hidden="true">
      <svg className="s07-hub__canvas" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="s07-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0078d4" stopOpacity={0.12} />
            <stop offset="55%" stopColor="#0078d4" stopOpacity={0.04} />
            <stop offset="100%" stopColor="#0078d4" stopOpacity={0} />
          </radialGradient>
          {SPOKES.map((spoke) => (
            <linearGradient
              key={`grad-${spoke.id}`}
              id={`s07-spoke-${spoke.id}`}
              gradientUnits="userSpaceOnUse"
              x1={String(CX)}
              y1={String(CY)}
              x2={String(polar(spoke.angle, NODE_R).x)}
              y2={String(polar(spoke.angle, NODE_R).y)}
            >
              <stop offset="0%" stopColor={spoke.color} stopOpacity={0.55} />
              <stop offset="100%" stopColor={spoke.color} stopOpacity={0.95} />
            </linearGradient>
          ))}
        </defs>

        <rect x={0} y={0} width={100} height={100} fill="url(#s07-hub-glow)" />

        <circle
          cx={CX}
          cy={CY}
          r={CORE_R + 7}
          fill="none"
          stroke="rgba(0,120,212,0.08)"
          strokeWidth={0.35}
        />
        <circle
          cx={CX}
          cy={CY}
          r={NODE_R - 2}
          fill="none"
          stroke="rgba(0,120,212,0.06)"
          strokeWidth={0.25}
          strokeDasharray="1.2 1.8"
        />

        {!reduceMotion ? (
          <motion.circle
            cx={CX}
            cy={CY}
            r={CORE_R + 2}
            fill="none"
            stroke="rgba(0,120,212,0.25)"
            strokeWidth={0.3}
            strokeDasharray="2 1.5"
            animate={{ r: [CORE_R + 2, CORE_R + 6, CORE_R + 2], opacity: [0.5, 0.12, 0.5] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}

        {SPOKES.map((spoke, i) => {
          const start = polar(spoke.angle, CORE_R);
          const end = polar(spoke.angle, NODE_R);
          return (
            <g key={spoke.id}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={`url(#s07-spoke-${spoke.id})`}
                strokeWidth={0.55}
                strokeLinecap="round"
              />
              <circle cx={end.x} cy={end.y} r={1.1} fill={spoke.color} opacity={0.95} />
              <circle cx={end.x} cy={end.y} r={2.2} fill="none" stroke={spoke.color} strokeWidth={0.35} opacity={0.45} />
              {!reduceMotion ? (
                <motion.circle
                  r={0.65}
                  fill="#ffffff"
                  stroke={spoke.color}
                  strokeWidth={0.35}
                  animate={{
                    cx: [start.x, end.x],
                    cy: [start.y, end.y],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: i * 0.32,
                    ease: "easeInOut",
                  }}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      <div className="s07-hub__core-wrap">
        <motion.div
          className="s07-hub__core"
          initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="s07-hub__core-ring" aria-hidden="true" />
          <div className="s07-hub__core-glow" aria-hidden="true" />
          <div className="s07-hub__core-icon">
            <i className="fas fa-robot" aria-hidden="true" />
          </div>
          <div className="s07-hub__core-title">AI</div>
          <div className="s07-hub__core-sub">생산성 혁신</div>
        </motion.div>
      </div>

      {SPOKES.map((spoke, i) => {
        const anchor = polar(spoke.angle, NODE_R);
        const placement = cardPlacement(spoke.id, spoke.angle);

        return (
          <div
            key={spoke.id}
            className={`s07-hub__node-wrap s07-hub__node-wrap--${spoke.id}`}
            style={
              {
                left: `${anchor.x}%`,
                top: `${anchor.y}%`,
                transform: placement.transform,
                transformOrigin: placement.transformOrigin,
                "--node-color": spoke.color,
              } as CSSProperties
            }
          >
            <span className="s07-hub__node-join" aria-hidden="true" />
            <motion.div
              className="s07-hub__node"
              style={{ "--node-color": spoke.color } as CSSProperties}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.14 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="s07-hub__node-icon">
                <i className={`fas ${spoke.icon}`} aria-hidden="true" />
              </div>
              <div className="s07-hub__node-copy">
                <div className="s07-hub__node-title">{spoke.title}</div>
                <div className="s07-hub__node-sub">{spoke.subtitle}</div>
              </div>
            </motion.div>
          </div>
        );
      })}

      <p className="s07-hub__caption">
        AI를 허브로 <strong>5대 기술 영역</strong>이 유기적으로 연결되는 통합 플랫폼
      </p>
    </div>
  );
}
