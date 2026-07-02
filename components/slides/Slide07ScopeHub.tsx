"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useSlideDiagramMotion } from "@/components/slides/motion/SlideMotionReadyContext";

/** viewBox 0–100 기준 허브 기하 (첨부 레퍼런스 펜타곤 배치) */
const CX = 50;
const CY = 50;
const RING_R = 23.5;
const LINE_R = 36.5;

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

const SEGMENT_ARC = 62;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

function describeArc(radius: number, startDeg: number, endDeg: number) {
  const start = polar(startDeg, radius);
  const end = polar(endDeg, radius);
  const sweep = endDeg - startDeg;
  const largeArc = Math.abs(sweep) > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

type Attachment = {
  transform: string;
  transformOrigin: string;
  join: "top" | "right" | "bottom" | "left";
};

function getAttachment(angleDeg: number): Attachment {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const absCos = Math.abs(cos);
  const absSin = Math.abs(sin);

  if (absCos > absSin) {
    if (cos > 0) {
      return { transform: "translate(0%, -50%)", transformOrigin: "0% 50%", join: "left" };
    }
    return { transform: "translate(-100%, -50%)", transformOrigin: "100% 50%", join: "right" };
  }

  if (sin < 0) {
    return { transform: "translate(-50%, -100%)", transformOrigin: "50% 100%", join: "bottom" };
  }
  return { transform: "translate(-50%, 0%)", transformOrigin: "50% 0%", join: "top" };
}

export default function Slide07ScopeHub() {
  const reduceMotion = useReducedMotion();
  const { animating, ready } = useSlideDiagramMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(() => setActiveIdx((v) => (v + 1) % SPOKES.length), 2600);
    return () => window.clearInterval(id);
  }, [ready]);

  return (
    <div className="s07-hub">
      <div className="s07-hub__stage" aria-hidden="true">
        <svg className="s07-hub__canvas" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="s07-grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(0,120,212,0.11)" strokeWidth="0.22" />
            </pattern>
            <radialGradient id="s07-hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,120,212,0.14)" />
              <stop offset="70%" stopColor="rgba(0,120,212,0.03)" />
              <stop offset="100%" stopColor="rgba(0,120,212,0)" />
            </radialGradient>
          </defs>

          <rect x={0} y={0} width={100} height={100} fill="url(#s07-grid)" />
          <rect x={0} y={0} width={100} height={100} fill="url(#s07-hub-glow)" />

          <circle cx={CX} cy={CY} r={RING_R + 4.5} fill="none" stroke="rgba(0,120,212,0.08)" strokeWidth={0.35} />
          <circle cx={CX} cy={CY} r={RING_R + 7.5} fill="none" stroke="rgba(0,120,212,0.05)" strokeWidth={0.28} />

          {SPOKES.map((spoke, spokeIdx) => {
            const half = SEGMENT_ARC / 2;
            const lit = animating && activeIdx === spokeIdx;
            return (
              <path
                key={`${spoke.id}-arc`}
                d={describeArc(RING_R, spoke.angle - half, spoke.angle + half)}
                fill="none"
                stroke={spoke.color}
                strokeWidth={lit ? 1.15 : 0.85}
                strokeLinecap="round"
                opacity={lit ? 1 : 0.82}
              />
            );
          })}

          {SPOKES.map((spoke, spokeIdx) => {
            const ringPt = polar(spoke.angle, RING_R);
            const end = polar(spoke.angle, LINE_R);
            const lit = animating && activeIdx === spokeIdx;
            return (
              <g key={spoke.id}>
                <line
                  x1={ringPt.x}
                  y1={ringPt.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={spoke.color}
                  strokeWidth={lit ? 0.8 : 0.62}
                  strokeLinecap="round"
                  opacity={lit ? 1 : 0.78}
                />
                <circle
                  cx={ringPt.x}
                  cy={ringPt.y}
                  r={lit ? 1.55 : 1.35}
                  fill="#ffffff"
                  stroke={spoke.color}
                  strokeWidth={0.55}
                />
                {animating ? (
                  <motion.circle
                    r={1.2}
                    fill="#ffffff"
                    stroke={spoke.color}
                    strokeWidth={0.45}
                    animate={{
                      cx: [ringPt.x, end.x],
                      cy: [ringPt.y, end.y],
                      opacity: lit ? [0.4, 1, 0.4] : [0.25, 0.6, 0.25],
                    }}
                    transition={{
                      duration: lit ? 1.4 : 2.2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: spokeIdx * 0.15,
                    }}
                  />
                ) : (
                  <circle cx={end.x} cy={end.y} r={2} fill="#ffffff" stroke={spoke.color} strokeWidth={0.55} />
                )}
              </g>
            );
          })}
        </svg>

        <div className="s07-hub__core-wrap">
          <motion.div
            className="s07-hub__core"
            initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
            animate={animating ? { scale: [1, 1.04, 1], opacity: 1 } : { scale: 1, opacity: 1 }}
            transition={
              animating
                ? { scale: { duration: 2.6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.45 } }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="s07-hub__core-icon">
              <i className="fas fa-robot" aria-hidden="true" />
            </div>
            <div className="s07-hub__core-title">AI</div>
            <div className="s07-hub__core-sub">생산성 혁신</div>
          </motion.div>
        </div>

        {SPOKES.map((spoke, i) => {
          const anchor = polar(spoke.angle, LINE_R);
          const placement = getAttachment(spoke.angle);

          return (
            <div
              key={spoke.id}
              className={`s07-hub__node-wrap s07-hub__node-wrap--${spoke.id}`}
              data-join={placement.join}
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
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={
                  animating && activeIdx === i
                    ? { opacity: 1, scale: [1, 1.03, 1] }
                    : { opacity: 1, scale: 1 }
                }
                transition={
                  animating && activeIdx === i
                    ? { scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.45 } }
                    : { duration: 0.45, delay: 0.14 + i * 0.07, ease: [0.22, 1, 0.36, 1] }
                }
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
      </div>

      <p className="s07-hub__caption">
        AI를 허브로 <strong>5대 기술 영역</strong>이 유기적으로 연결되는 통합 플랫폼
      </p>
    </div>
  );
}
