"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

type NodeDef = {
  id: string;
  label: string;
  sub?: string;
  icon: string;
  color: string;
  aux?: boolean;
};

type PhaseDef = {
  num: number;
  title: string;
  desc?: string;
  color: string;
  layout: "stack" | "dense" | "split";
  nodes: NodeDef[];
  flows: { from: string; to: string; label?: string }[];
};

const PHASES: PhaseDef[] = [
  {
    num: 1,
    title: "Source & Trigger",
    desc: "소스 변경 감지 · MR 기반 협업",
    color: "var(--ppt-accent-2, #ca5010)",
    layout: "stack",
    nodes: [
      { id: "dev", label: "Developer", sub: "Git Push · Merge Request", icon: "fas fa-code-branch", color: "var(--ppt-accent-2, #ca5010)" },
      { id: "gitlab", label: "GitLab", sub: "소스 저장소 · 파이프라인 트리거", icon: "fab fa-gitlab", color: "var(--c-gitlab, #fc6d26)" },
    ],
    flows: [{ from: "dev", to: "gitlab", label: "push / webhook" }],
  },
  {
    num: 2,
    title: "Build & Quality",
    color: "var(--c-gitlab, #fc6d26)",
    layout: "dense",
    nodes: [
      { id: "gci", label: "GitLab CI", icon: "fas fa-gears", color: "var(--c-gitlab, #fc6d26)" },
      { id: "sonar", label: "SonarQube", sub: "Gate", icon: "fas fa-magnifying-glass-chart", color: "var(--c-sonar, #4e9bcd)" },
      { id: "jenkins", label: "Jenkins", sub: "보조", icon: "fab fa-jenkins", color: "var(--c-jenkins, #d33833)", aux: true },
      { id: "docker", label: "Docker", icon: "fab fa-docker", color: "var(--c-docker, #2496ed)" },
      { id: "nexus", label: "Nexus", icon: "fas fa-warehouse", color: "var(--c-nexus, #5c6bc0)" },
    ],
    flows: [
      { from: "gci", to: "docker", label: "push" },
      { from: "sonar", to: "nexus" },
      { from: "jenkins", to: "docker" },
      { from: "gci", to: "sonar" },
    ],
  },
  {
    num: 3,
    title: "Deploy · GitOps",
    desc: "선언적 배포 · 환경 동기화",
    color: "var(--c-argo, #ef7b4d)",
    layout: "split",
    nodes: [
      { id: "argo", label: "Argo CD", sub: "GitOps Sync · 자동 배포", icon: "fas fa-ship", color: "var(--c-argo, #ef7b4d)" },
      { id: "fass", label: "FaSS Runtime", sub: "On-Prem · Docker 환경 운영", icon: "fas fa-server", color: "var(--ppt-good, #107c10)" },
      { id: "rollout", label: "무중단 롤아웃", sub: "Blue-Green · Canary 전략", icon: "fas fa-rotate", color: "var(--ppt-accent, #0078d4)" },
    ],
    flows: [
      { from: "argo", to: "fass", label: "rolling deploy" },
      { from: "argo", to: "rollout" },
    ],
  },
];

function CircuitTrace({
  d,
  color,
  delay,
  active,
}: {
  d: string;
  color: string;
  delay: number;
  active: boolean;
}) {
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={2} opacity={0.15} strokeLinecap="round" />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="6 5"
        animate={active ? { strokeDashoffset: [0, -22] } : { strokeDashoffset: 0 }}
        transition={{ duration: 0.8, repeat: active ? Infinity : 0, ease: "linear", delay }}
      />
      {active ? (
        <motion.circle
          r={4}
          fill={color}
          filter="url(#s26-pulse-glow)"
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay }}
          style={{ offsetPath: `path('${d}')`, offsetRotate: "0deg" }}
        />
      ) : null}
    </g>
  );
}

function PhaseCircuitPanel({
  phase,
  active,
  animating,
}: {
  phase: PhaseDef;
  active: boolean;
  animating: boolean;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<{ d: string; delay: number }[]>([]);

  useEffect(() => {
    const compute = () => {
      const board = boardRef.current;
      if (!board) return;

      const boardRect = board.getBoundingClientRect();
      const next = phase.flows
        .map((flow, idx) => {
          const fromEl = nodeRefs.current[flow.from];
          const toEl = nodeRefs.current[flow.to];
          if (!fromEl || !toEl) return null;

          const a = fromEl.getBoundingClientRect();
          const b = toEl.getBoundingClientRect();
          const x1 = a.left + a.width / 2 - boardRect.left;
          const y1 = a.bottom - boardRect.top - 2;
          const x2 = b.left + b.width / 2 - boardRect.left;
          const y2 = b.top - boardRect.top + 2;
          const midY = (y1 + y2) / 2;

          let d: string;
          if (Math.abs(x2 - x1) < 8) {
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
          } else if (y2 > y1 + 8) {
            d = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
          } else {
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
          }

          return { d, delay: idx * 0.18 };
        })
        .filter(Boolean) as { d: string; delay: number }[];

      setPaths(next);
    };

    compute();
    window.addEventListener("resize", compute);
    const id = window.setTimeout(compute, 120);
    return () => {
      window.removeEventListener("resize", compute);
      window.clearTimeout(id);
    };
  }, [phase.flows, phase.nodes]);

  return (
    <motion.article
      className={`circuit-phase circuit-phase--${phase.layout}${active ? " circuit-phase--active" : ""}`}
      style={{ "--ph": phase.color } as React.CSSProperties}
      animate={
        active && animating
          ? { boxShadow: "0 0 26px rgba(0,120,212,0.2), 0 0 0 1px rgba(0,120,212,0.38)" }
          : { boxShadow: "none" }
      }
      transition={{ duration: 0.45 }}
    >
      <div className="circuit-phase__head">
        <div className="circuit-phase__num">{phase.num}</div>
        <div>
          <div className="circuit-phase__title">{phase.title}</div>
          {phase.desc ? <div className="circuit-phase__desc">{phase.desc}</div> : null}
        </div>
        {active && animating ? <span className="circuit-phase__live">● LIVE</span> : null}
      </div>

      <div ref={boardRef} className="circuit-phase__board">
        <svg className="circuit-phase__svg" aria-hidden="true">
          <defs>
            <filter id="s26-pulse-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {paths.map((path, i) => (
            <CircuitTrace
              key={`${path.d}-${i}`}
              d={path.d}
              color={active ? "#0078d4" : "#94a3b8"}
              delay={path.delay}
              active={animating}
            />
          ))}
        </svg>

        <div className={`circuit-phase__body circuit-phase__body--${phase.layout}`}>
          {phase.nodes.map((node) => (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[node.id] = el;
              }}
              className={`circuit-node${node.aux ? " circuit-node--aux" : ""}${active ? " circuit-node--lit" : ""}`}
              style={{ "--nc": node.color } as React.CSSProperties}
            >
              <div className="circuit-node__icon">
                <i className={node.icon} />
              </div>
              <div className="circuit-node__text">
                <div className="circuit-node__name">{node.label}</div>
                {node.sub ? <div className="circuit-node__sub">{node.sub}</div> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function PhaseConnector({ label, animating }: { label: string; animating: boolean }) {
  const lines = label.split("\n");
  return (
    <div className="circuit-connector">
      <svg viewBox="0 0 52 72" className="circuit-connector__svg" aria-hidden="true">
        <motion.path
          d="M 6 36 H 46"
          fill="none"
          stroke="#0078d4"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="7 5"
          animate={animating ? { strokeDashoffset: [0, -24] } : { strokeDashoffset: 0 }}
          transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
        />
        {animating ? (
          <motion.circle
            r={4.5}
            fill="#38bdf8"
            cy={36}
            animate={{ cx: [6, 46, 46], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
        <polygon points="46,31 52,36 46,41" fill="#0078d4" />
      </svg>
      <span className="circuit-connector__label">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </div>
  );
}

export default function Slide26CircuitPipeline() {
  const reduceMotion = useReducedMotion();
  const [activePhase, setActivePhase] = useState(0);
  const animating = !reduceMotion;

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setActivePhase((v) => (v + 1) % PHASES.length), 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="circuit-pipeline">
      {PHASES.map((phase, idx) => (
        <Fragment key={phase.num}>
          <PhaseCircuitPanel phase={phase} active={activePhase === idx} animating={animating} />
          {idx < PHASES.length - 1 ? (
            <PhaseConnector label={idx === 0 ? "CI\n시작" : "CD\n배포"} animating={animating} />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
