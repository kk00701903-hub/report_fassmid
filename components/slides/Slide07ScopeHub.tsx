"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const VIEW_W = 560;
const VIEW_H = 320;

type GearSpec = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  cx: number;
  cy: number;
  teeth: number;
  outerR: number;
  innerR: number;
  color: string;
  faceColor: string;
  clockwise: boolean;
  duration: number;
};

const GEARS: GearSpec[] = [
  {
    id: "ai",
    title: "AI",
    subtitle: "생산성 혁신",
    icon: "fa-robot",
    cx: 272,
    cy: 152,
    teeth: 12,
    outerR: 36,
    innerR: 28,
    color: "#14b8a6",
    faceColor: "#0f766e",
    clockwise: true,
    duration: 22,
  },
  {
    id: "sec",
    title: "보안",
    subtitle: "SSO · RBAC",
    icon: "fa-shield-halved",
    cx: 196,
    cy: 96,
    teeth: 14,
    outerR: 42,
    innerR: 33,
    color: "#a78bfa",
    faceColor: "#7c3aed",
    clockwise: false,
    duration: 28,
  },
  {
    id: "fe",
    title: "FE",
    subtitle: "Next.js · React",
    icon: "fa-desktop",
    cx: 348,
    cy: 94,
    teeth: 14,
    outerR: 40,
    innerR: 31,
    color: "#94a3b8",
    faceColor: "#64748b",
    clockwise: true,
    duration: 26,
  },
  {
    id: "was",
    title: "WAS",
    subtitle: "수주 · 발주 API",
    icon: "fa-cogs",
    cx: 378,
    cy: 162,
    teeth: 15,
    outerR: 44,
    innerR: 34,
    color: "#78716c",
    faceColor: "#57534e",
    clockwise: false,
    duration: 30,
  },
  {
    id: "db",
    title: "DB",
    subtitle: "PostgreSQL · CDC",
    icon: "fa-database",
    cx: 202,
    cy: 228,
    teeth: 14,
    outerR: 40,
    innerR: 31,
    color: "#86efac",
    faceColor: "#059669",
    clockwise: true,
    duration: 26,
  },
  {
    id: "infra",
    title: "Infra",
    subtitle: "Docker · CI/CD",
    icon: "fa-cloud",
    cx: 318,
    cy: 238,
    teeth: 11,
    outerR: 30,
    innerR: 23,
    color: "#fcd34d",
    faceColor: "#d97706",
    clockwise: false,
    duration: 18,
  },
];

function buildGearPath(cx: number, cy: number, teeth: number, outerR: number, innerR: number) {
  const step = (Math.PI * 2) / teeth;
  const toothHalf = step * 0.24;
  let d = "";

  for (let i = 0; i < teeth; i++) {
    const angle = i * step - Math.PI / 2;
    const innerStart = angle - toothHalf;
    const outerStart = angle - toothHalf * 0.38;
    const outerEnd = angle + toothHalf * 0.38;
    const innerEnd = angle + toothHalf;

    const points: [number, number][] = [
      [cx + innerR * Math.cos(innerStart), cy + innerR * Math.sin(innerStart)],
      [cx + outerR * Math.cos(outerStart), cy + outerR * Math.sin(outerStart)],
      [cx + outerR * Math.cos(outerEnd), cy + outerR * Math.sin(outerEnd)],
      [cx + innerR * Math.cos(innerEnd), cy + innerR * Math.sin(innerEnd)],
    ];

    if (i === 0) {
      d += `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)} `;
    }
    for (let j = 1; j < points.length; j++) {
      d += `L ${points[j][0].toFixed(2)} ${points[j][1].toFixed(2)} `;
    }
  }

  return `${d}Z`;
}

function GearShape({ gear, reduceMotion }: { gear: GearSpec; reduceMotion: boolean | null }) {
  const path = buildGearPath(gear.cx, gear.cy, gear.teeth, gear.outerR, gear.innerR);
  const faceR = gear.innerR * 0.62;

  return (
    <motion.g
      animate={reduceMotion ? undefined : { rotate: gear.clockwise ? 360 : -360 }}
      transition={{ duration: gear.duration, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: `${gear.cx}px ${gear.cy}px`, transformBox: "fill-box" as const }}
    >
      <path
        d={path}
        fill={gear.color}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <circle cx={gear.cx} cy={gear.cy} r={faceR + 2} fill="rgba(0,0,0,0.06)" />
      <circle cx={gear.cx} cy={gear.cy} r={faceR} fill={gear.faceColor} opacity={0.92} />
    </motion.g>
  );
}

export default function Slide07ScopeHub() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="s07-gears" aria-hidden="true">
      <svg className="s07-gears__svg" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="s07-gear-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.12" />
          </filter>
        </defs>

        {GEARS.map((gear) => (
          <g key={`shadow-${gear.id}`} filter="url(#s07-gear-shadow)">
            <GearShape gear={gear} reduceMotion={reduceMotion} />
          </g>
        ))}
      </svg>

      {GEARS.map((gear, i) => {
        const leftPct = (gear.cx / VIEW_W) * 100;
        const topPct = (gear.cy / VIEW_H) * 100;
        const isCenter = gear.id === "ai";

        return (
          <motion.div
            key={gear.id}
            className={`s07-gear-label${isCenter ? " s07-gear-label--center" : ""}`}
            style={
              {
                left: `${leftPct}%`,
                top: `${topPct}%`,
                "--gear-color": gear.faceColor,
              } as CSSProperties
            }
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <i className={`fas ${gear.icon}`} aria-hidden="true" />
            <span className="s07-gear-label__title">{gear.title}</span>
            <span className="s07-gear-label__sub">{gear.subtitle}</span>
          </motion.div>
        );
      })}

      <p className="s07-gears__caption">
        각 영역이 톱니바퀴처럼 맞물려 <strong>AI 생산성 혁신</strong>을 함께 굴립니다
      </p>
    </div>
  );
}
