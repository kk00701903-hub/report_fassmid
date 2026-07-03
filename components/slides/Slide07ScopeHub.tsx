"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CX = 50;
const CY = 50;
const RADIUS = 36;
const CORE_R = 11.5;

const SPOKES: ReadonlyArray<{
  id: string;
  title: string;
  subtitle: string;
  descriptor?: string;
  icon: string;
  color: string;
  angle: number;
}> = [
  {
    id: "fe",
    title: "프론트엔드",
    descriptor: "눈에 보이는 부분",
    subtitle: "Next.js · React · RealGrid",
    icon: "fa-desktop",
    color: "#0078d4",
    angle: -90,
  },
  {
    id: "was",
    title: "백엔드 (WAS)",
    descriptor: "눈에 보이지 않는 부분",
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

function lineEndpoints(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const end = polar(angleDeg, RADIUS);
  const start = {
    x: CX + CORE_R * Math.cos(rad),
    y: CY + CORE_R * Math.sin(rad),
  };
  const nodeHalf = 7.2;
  const endOnSquare = {
    x: end.x - nodeHalf * Math.cos(rad),
    y: end.y - nodeHalf * Math.sin(rad),
  };
  return { start, end: endOnSquare };
}

export default function Slide07ScopeHub() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="s07-hub"
      role="img"
      aria-label="AI 생산성 혁신을 중심으로 프론트엔드, 백엔드, 데이터베이스, 보안·거버넌스, 인프라·DevOps가 연결된 통합 플랫폼 다이어그램"
    >
      <div className="s07-hub__stage">
        <svg className="s07-hub__canvas" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <radialGradient id="s07-hub-glow" cx="50%" cy="50%" r="45%">
              <stop offset="0%" stopColor="#0078d4" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#0078d4" stopOpacity={0} />
            </radialGradient>
          </defs>

          <rect x={0} y={0} width={100} height={100} fill="url(#s07-hub-glow)" />

          {!reduceMotion ? (
            <motion.circle
              className="s07-hub__pulse-ring"
              cx={CX}
              cy={CY}
              r={CORE_R + 1.5}
              fill="none"
              stroke="rgba(0,120,212,0.22)"
              strokeWidth={0.35}
              animate={{ r: [CORE_R + 1.5, CORE_R + 4, CORE_R + 1.5], opacity: [0.45, 0.12, 0.45] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {SPOKES.map((spoke) => {
            const { start, end } = lineEndpoints(spoke.angle);
            return (
              <line
                key={spoke.id}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={spoke.color}
                strokeWidth={0.65}
                strokeLinecap="square"
                opacity={0.72}
              />
            );
          })}

          <circle
            cx={CX}
            cy={CY}
            r={CORE_R}
            fill="#ffffff"
            stroke="#0078d4"
            strokeWidth={0.55}
          />
        </svg>

        <motion.div
          className="s07-hub__core"
          initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
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
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="s07-hub__node-icon">
                <i className={`fas ${spoke.icon}`} aria-hidden="true" />
              </div>
              <div className="s07-hub__node-title">{spoke.title}</div>
              {spoke.descriptor ? (
                <div className="s07-hub__node-hint">{spoke.descriptor}</div>
              ) : null}
              <div className="s07-hub__node-sub">{spoke.subtitle}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="s07-hub__caption">
        AI를 허브로 <strong>5대 기술 영역</strong>이 유기적으로 연결되는 통합 플랫폼
      </div>
    </div>
  );
}
