"use client";

import type { CSSProperties, FC } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useSlideDiagramMotion } from "@/components/slides/motion/SlideMotionReadyContext";

type SpotlightId = "devops" | "docker" | "gitlab" | "nextjs" | "gateway";

type SpotlightDef = {
  id: SpotlightId;
  label: string;
  sub: string;
  color: string;
  bg: string;
  border: string;
  glow: string;
};

export const SPOTLIGHTS: SpotlightDef[] = [
  {
    id: "devops",
    label: "DevOps",
    sub: "인프라 · 자동화",
    color: "#004578",
    bg: "linear-gradient(145deg, #deecf9 0%, #c7e0f4 100%)",
    border: "#0078d4",
    glow: "rgba(0, 120, 212, 0.55)",
  },
  {
    id: "docker",
    label: "Docker",
    sub: "컨테이너 표준화",
    color: "#0a558c",
    bg: "linear-gradient(145deg, #cce9ff 0%, #99d5ff 100%)",
    border: "#0091e2",
    glow: "rgba(0, 145, 226, 0.6)",
  },
  {
    id: "gitlab",
    label: "GitLab CI",
    sub: "빌드 · 배포 파이프라인",
    color: "#8a2400",
    bg: "linear-gradient(145deg, #ffe8dc 0%, #ffc9a8 100%)",
    border: "#e24329",
    glow: "rgba(226, 67, 41, 0.55)",
  },
  {
    id: "nextjs",
    label: "Next.js",
    sub: "React 19 · SSR",
    color: "#201f1e",
    bg: "linear-gradient(145deg, #f3f2f1 0%, #e1dfdd 100%)",
    border: "#201f1e",
    glow: "rgba(32, 31, 30, 0.35)",
  },
  {
    id: "gateway",
    label: "API Gateway",
    sub: "인증 · 라우팅",
    color: "#4c1d95",
    bg: "linear-gradient(145deg, #ede9fe 0%, #ddd6fe 100%)",
    border: "#7c3aed",
    glow: "rgba(124, 58, 237, 0.55)",
  },
];

function DevOpsAnim({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="s23-spot-svg" aria-hidden="true">
      <motion.rect
        x={14}
        y={22}
        width={36}
        height={26}
        rx={4}
        fill="#0078d4"
        stroke="#004578"
        strokeWidth={2}
        animate={active ? { y: [22, 20, 22] } : {}}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x={18} y={26} width={8} height={6} rx={1} fill="#deecf9" />
      <rect x={28} y={26} width={8} height={6} rx={1} fill="#deecf9" />
      <rect x={38} y={26} width={8} height={6} rx={1} fill="#deecf9" />
      <motion.g
        animate={active ? { rotate: 360 } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "32px 14px" }}
      >
        <circle cx={32} cy={14} r={9} fill="none" stroke="#004578" strokeWidth={2.5} />
        <circle cx={32} cy={14} r={3} fill="#004578" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <line
            key={deg}
            x1={32}
            y1={14}
            x2={32 + 7 * Math.cos((deg * Math.PI) / 180)}
            y2={14 + 7 * Math.sin((deg * Math.PI) / 180)}
            stroke="#004578"
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}
      </motion.g>
      <motion.circle
        cx={32}
        cy={35}
        r={18}
        fill="none"
        stroke="#0078d4"
        strokeWidth={1.5}
        opacity={0.5}
        animate={active ? { scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function DockerAnim({ active }: { active: boolean }) {
  const boxes = [
    { x: 8, y: 28, w: 12, h: 10 },
    { x: 22, y: 28, w: 12, h: 10 },
    { x: 36, y: 28, w: 12, h: 10 },
    { x: 15, y: 16, w: 12, h: 10 },
    { x: 29, y: 16, w: 12, h: 10 },
  ];
  return (
    <svg viewBox="0 0 64 64" className="s23-spot-svg" aria-hidden="true">
      {boxes.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={2}
          fill="#0091e2"
          stroke="#0a558c"
          strokeWidth={1.5}
          animate={active ? { y: [b.y, b.y - 2, b.y] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
      <motion.path
        d="M 48 44 Q 56 36 52 28 Q 58 24 54 18"
        fill="none"
        stroke="#0a558c"
        strokeWidth={2}
        strokeLinecap="round"
        animate={active ? { pathLength: [0.4, 1, 0.4] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse
        cx={46}
        cy={46}
        rx={14}
        ry={6}
        fill="#0091e2"
        opacity={0.25}
        animate={active ? { rx: [14, 16, 14] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function GitLabAnim({ active }: { active: boolean }) {
  const stages = [10, 26, 42, 58];
  return (
    <svg viewBox="0 0 64 64" className="s23-spot-svg" aria-hidden="true">
      <line x1={8} y1={32} x2={56} y2={32} stroke="#8a2400" strokeWidth={3} strokeLinecap="round" opacity={0.35} />
      {stages.map((x, i) => (
        <g key={x}>
          <rect x={x - 6} y={24} width={12} height={16} rx={3} fill="#e24329" stroke="#8a2400" strokeWidth={1.5} />
          <motion.rect
            x={x - 4}
            y={28}
            width={8}
            height={4}
            rx={1}
            fill="#fff"
            opacity={0.85}
            animate={active ? { opacity: [0.3, 1, 0.3] } : {}}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
          />
        </g>
      ))}
      <motion.circle
        r={5}
        fill="#fc6d26"
        stroke="#fff"
        strokeWidth={2}
        animate={active ? { cx: [10, 26, 42, 58, 10], cy: 32 } : { cx: 10, cy: 32 }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />
      <motion.g
        animate={active ? { rotate: 360 } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "32px 12px" }}
      >
        <circle cx={32} cy={12} r={7} fill="none" stroke="#e24329" strokeWidth={2} />
        <path d="M32 5 L35 12 L32 19 L29 12 Z" fill="#e24329" />
      </motion.g>
    </svg>
  );
}

function NextJsAnim({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="s23-spot-svg" aria-hidden="true">
      <circle cx={32} cy={32} r={26} fill="#201f1e" stroke="#0078d4" strokeWidth={2.5} />
      <text x={32} y={40} textAnchor="middle" fontSize={22} fontWeight={800} fill="#ffffff" fontFamily="Arial, sans-serif">
        N
      </text>
      <motion.circle
        cx={32}
        cy={32}
        r={30}
        fill="none"
        stroke="#0078d4"
        strokeWidth={2}
        strokeDasharray="6 4"
        animate={active ? { rotate: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      />
      <motion.circle
        cx={32}
        cy={8}
        r={4}
        fill="#0078d4"
        animate={active ? { rotate: 360 } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      />
    </svg>
  );
}

function GatewayAnim({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="s23-spot-svg" aria-hidden="true">
      <path
        d="M32 8 L52 18 V34 C52 46 32 56 32 56 C32 56 12 46 12 34 V18 Z"
        fill="#7c3aed"
        stroke="#4c1d95"
        strokeWidth={2}
      />
      <path d="M32 16 L44 22 V34 C44 42 32 48 32 48 C32 48 20 42 20 34 V22 Z" fill="#a78bfa" opacity={0.9} />
      <motion.g
        animate={active ? { x: [-6, 6, -6] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="24,30 18,32 24,34" fill="#fbbf24" />
        <rect x={24} y={30.5} width={16} height={3} rx={1} fill="#fbbf24" />
        <polygon points="40,30 46,32 40,34" fill="#fbbf24" />
      </motion.g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={20 + i * 12}
          cy={40}
          r={2}
          fill="#fde68a"
          animate={active ? { opacity: [0.2, 1, 0.2], cy: [40, 36, 40] } : {}}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

const ANIM_MAP: Record<SpotlightId, FC<{ active: boolean }>> = {
  devops: DevOpsAnim,
  docker: DockerAnim,
  gitlab: GitLabAnim,
  nextjs: NextJsAnim,
  gateway: GatewayAnim,
};

export function SpotlightTile({ def, index }: { def: SpotlightDef; index: number }) {
  const reduce = useReducedMotion();
  const { animating } = useSlideDiagramMotion();
  const active = animating && !reduce;
  const Anim = ANIM_MAP[def.id];

  return (
    <motion.div
      className="s23-spot-tile"
      style={
        {
          "--spot-bg": def.bg,
          "--spot-border": def.border,
          "--spot-glow": def.glow,
          "--spot-color": def.color,
        } as CSSProperties
      }
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <motion.div
        className="s23-spot-visual"
        animate={active ? { y: [0, -3, 0] } : {}}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
      >
        <Anim active={active} />
      </motion.div>
      <div className="s23-spot-label">{def.label}</div>
      <div className="s23-spot-sub">{def.sub}</div>
    </motion.div>
  );
}

export function SpotlightRibbon() {
  return (
    <div className="s23-spotlight-ribbon" aria-label="핵심 기술 강조">
      {SPOTLIGHTS.map((def, i) => (
        <SpotlightTile key={def.id} def={def} index={i} />
      ))}
    </div>
  );
}
