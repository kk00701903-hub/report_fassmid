"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { useSlideDiagramMotion } from "@/components/slides/motion/SlideMotionReadyContext";

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

type NodeKey = `${number}:${string}`;

type PipePath = {
  id: string;
  d: string;
  delay: number;
  phaseIdx: number;
  trunk?: boolean;
  trunkFrom?: number;
  trunkTo?: number;
  sx: number;
  sy: number;
};

const PHASES: PhaseDef[] = [
  {
    num: 1,
    title: "Source & Trigger",
    desc: "소스 변경 감지 · MR 기반 협업",
    color: "var(--ppt-accent-2, #ca5010)",
    layout: "stack",
    nodes: [
      {
        id: "dev",
        label: "Developer",
        sub: "Git Push · Merge Request",
        icon: "fas fa-code-branch",
        color: "var(--ppt-accent-2, #ca5010)",
      },
      {
        id: "gitlab",
        label: "GitLab",
        sub: "소스 저장소 · 파이프라인 트리거",
        icon: "fab fa-gitlab",
        color: "var(--c-gitlab, #fc6d26)",
      },
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
      {
        id: "sonar",
        label: "SonarQube",
        sub: "Gate",
        icon: "fas fa-magnifying-glass-chart",
        color: "var(--c-sonar, #4e9bcd)",
      },
      {
        id: "jenkins",
        label: "Jenkins",
        sub: "보조",
        icon: "fab fa-jenkins",
        color: "var(--c-jenkins, #d33833)",
        aux: true,
      },
      { id: "docker", label: "Docker", icon: "fab fa-docker", color: "var(--c-docker, #2496ed)" },
      { id: "nexus", label: "Nexus", icon: "fas fa-warehouse", color: "var(--c-nexus, #5c6bc0)" },
    ],
    flows: [
      { from: "gci", to: "docker", label: "build" },
      { from: "gci", to: "sonar", label: "scan" },
      { from: "jenkins", to: "docker" },
      { from: "sonar", to: "nexus" },
      { from: "docker", to: "nexus", label: "push" },
    ],
  },
  {
    num: 3,
    title: "Deploy · GitOps",
    desc: "선언적 배포 · 환경 동기화",
    color: "var(--c-argo, #ef7b4d)",
    layout: "split",
    nodes: [
      {
        id: "argo",
        label: "Argo CD",
        sub: "GitOps Sync · 자동 배포",
        icon: "fas fa-ship",
        color: "var(--c-argo, #ef7b4d)",
      },
      {
        id: "fass",
        label: "FaSS Runtime",
        sub: "On-Prem · Docker 환경 운영",
        icon: "fas fa-server",
        color: "var(--ppt-good, #107c10)",
      },
      {
        id: "rollout",
        label: "무중단 롤아웃",
        sub: "Blue-Green · Canary 전략",
        icon: "fas fa-rotate",
        color: "var(--ppt-accent, #0078d4)",
      },
    ],
    flows: [
      { from: "argo", to: "fass", label: "rolling deploy" },
      { from: "argo", to: "rollout" },
    ],
  },
];

const TRUNK_FLOWS = [
  { from: { phase: 0, node: "gitlab" }, to: { phase: 1, node: "gci" }, label: "CI\n시작" },
  { from: { phase: 1, node: "nexus" }, to: { phase: 2, node: "argo" }, label: "CD\n배포" },
] as const;

function nodeKey(phaseIdx: number, nodeId: string): NodeKey {
  return `${phaseIdx}:${nodeId}`;
}

function getAnchors(from: DOMRect, to: DOMRect, root: DOMRect) {
  const fx = from.left - root.left;
  const fy = from.top - root.top;
  const tx = to.left - root.left;
  const ty = to.top - root.top;
  const fcx = fx + from.width / 2;
  const fcy = fy + from.height / 2;
  const tcx = tx + to.width / 2;
  const tcy = ty + to.height / 2;
  const dx = tcx - fcx;
  const dy = tcy - fcy;

  if (Math.abs(dx) >= Math.abs(dy)) {
    if (dx >= 0) {
      return { x1: fx + from.width, y1: fcy, x2: tx, y2: tcy };
    }
    return { x1: fx, y1: fcy, x2: tx + to.width, y2: tcy };
  }

  if (dy >= 0) {
    return { x1: fcx, y1: fy + from.height, x2: tcx, y2: ty };
  }
  return { x1: fcx, y1: fy, x2: tcx, y2: ty + to.height };
}

function buildPipePath(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (Math.abs(dx) < 4 && Math.abs(dy) < 4) {
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }

  if (Math.abs(dx) >= Math.abs(dy) * 0.55) {
    const midX = x1 + dx / 2;
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${midX.toFixed(1)} ${y1.toFixed(1)} L ${midX.toFixed(1)} ${y2.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }

  const midY = y1 + dy / 2;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x1.toFixed(1)} ${midY.toFixed(1)} L ${x2.toFixed(1)} ${midY.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function FlowPipe({
  pipe,
  lit,
  animating,
}: {
  pipe: PipePath;
  lit: boolean;
  animating: boolean;
}) {
  const stroke = lit ? "#0078d4" : "#5a9fd4";
  const glow = lit ? "rgba(0,120,212,0.55)" : "rgba(0,120,212,0.2)";

  return (
    <g className="circuit-pipe">
      <path
        d={pipe.d}
        fill="none"
        stroke={stroke}
        strokeWidth={lit ? 5 : 4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.14}
      />
      <path
        d={pipe.d}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={lit ? 0.45 : 0.28}
      />
      {animating ? (
        <>
          <motion.path
            d={pipe.d}
            fill="none"
            stroke={stroke}
            strokeWidth={lit ? 3 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 7"
            animate={{ strokeDashoffset: [0, -34] }}
            transition={{
              duration: lit ? 0.85 : 1.25,
              repeat: Infinity,
              ease: "linear",
              delay: pipe.delay,
            }}
          />
          <motion.circle
            r={lit ? 4.5 : 3.5}
            fill={stroke}
            filter={`url(#s26-flow-glow)`}
            style={{ offsetPath: `path('${pipe.d}')`, offsetRotate: "0deg" }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{
              duration: lit ? 1.6 : 2.4,
              repeat: Infinity,
              ease: "linear",
              delay: pipe.delay,
            }}
          />
        </>
      ) : null}
      {lit ? (
        <circle cx={pipe.sx} cy={pipe.sy} r={3} fill={stroke} opacity={0.85} style={{ filter: `drop-shadow(0 0 4px ${glow})` }} />
      ) : null}
    </g>
  );
}

function PhaseCircuitPanel({
  phase,
  phaseIdx,
  active,
  animating,
  registerNode,
}: {
  phase: PhaseDef;
  phaseIdx: number;
  active: boolean;
  animating: boolean;
  registerNode: (key: NodeKey, el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.article
      className={`circuit-phase circuit-phase--${phase.layout}${active ? " circuit-phase--active" : ""}`}
      style={{ "--ph": phase.color } as CSSProperties}
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

      <div className="circuit-phase__board">
        <div className={`circuit-phase__body circuit-phase__body--${phase.layout}`}>
          {phase.nodes.map((node) => (
            <div
              key={node.id}
              ref={(el) => registerNode(nodeKey(phaseIdx, node.id), el)}
              className={`circuit-node${node.aux ? " circuit-node--aux" : ""}${active ? " circuit-node--lit" : ""}`}
              style={{ "--nc": node.color } as CSSProperties}
            >
              <div className="circuit-node__port circuit-node__port--in" aria-hidden="true" />
              <div className="circuit-node__icon">
                <i className={node.icon} />
              </div>
              <div className="circuit-node__text">
                <div className="circuit-node__name">{node.label}</div>
                {node.sub ? <div className="circuit-node__sub">{node.sub}</div> : null}
              </div>
              <div className="circuit-node__port circuit-node__port--out" aria-hidden="true" />
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
      <div className="circuit-connector__lane" aria-hidden="true">
        {animating ? (
          <>
            <span className="circuit-connector__dot circuit-connector__dot--a" />
            <span className="circuit-connector__dot circuit-connector__dot--b" />
          </>
        ) : null}
      </div>
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
  const { animating, ready } = useSlideDiagramMotion();
  const [activePhase, setActivePhase] = useState(0);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<NodeKey, HTMLDivElement>>(new Map());
  const [pipes, setPipes] = useState<PipePath[]>([]);
  const [layoutTick, setLayoutTick] = useState(0);

  const registerNode = useCallback((key: NodeKey, el: HTMLDivElement | null) => {
    if (el) {
      nodeRefs.current.set(key, el);
      window.requestAnimationFrame(() => setLayoutTick((v) => v + 1));
    } else {
      nodeRefs.current.delete(key);
    }
  }, []);

  const recomputePaths = useCallback(() => {
    const root = pipelineRef.current;
    if (!root) return;

    const rootRect = root.getBoundingClientRect();
    const next: PipePath[] = [];

    PHASES.forEach((phase, phaseIdx) => {
      phase.flows.forEach((flow, idx) => {
        const fromEl = nodeRefs.current.get(nodeKey(phaseIdx, flow.from));
        const toEl = nodeRefs.current.get(nodeKey(phaseIdx, flow.to));
        if (!fromEl || !toEl) return;

        const anchors = getAnchors(fromEl.getBoundingClientRect(), toEl.getBoundingClientRect(), rootRect);
        next.push({
          id: `p${phaseIdx}-${flow.from}-${flow.to}`,
          d: buildPipePath(anchors.x1, anchors.y1, anchors.x2, anchors.y2),
          delay: idx * 0.12,
          phaseIdx,
          sx: anchors.x1,
          sy: anchors.y1,
        });
      });
    });

    TRUNK_FLOWS.forEach((flow, idx) => {
      const fromEl = nodeRefs.current.get(nodeKey(flow.from.phase, flow.from.node));
      const toEl = nodeRefs.current.get(nodeKey(flow.to.phase, flow.to.node));
      if (!fromEl || !toEl) return;

      const anchors = getAnchors(fromEl.getBoundingClientRect(), toEl.getBoundingClientRect(), rootRect);
      next.push({
        id: `trunk-${flow.from.node}-${flow.to.node}`,
        d: buildPipePath(anchors.x1, anchors.y1, anchors.x2, anchors.y2),
        delay: 0.35 + idx * 0.2,
        phaseIdx: flow.to.phase,
        trunk: true,
        trunkFrom: flow.from.phase,
        trunkTo: flow.to.phase,
        sx: anchors.x1,
        sy: anchors.y1,
      });
    });

    setPipes(next);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    recomputePaths();
  }, [recomputePaths, layoutTick, activePhase, ready]);

  useEffect(() => {
    if (!ready) return;
    const root = pipelineRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(() => setLayoutTick((v) => v + 1));
    });

    ro.observe(root);
    nodeRefs.current.forEach((el) => ro.observe(el));

    const onResize = () => setLayoutTick((v) => v + 1);
    window.addEventListener("resize", onResize);

    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady.then(() => setLayoutTick((v) => v + 1)).catch(() => undefined);
    }

    const id = window.setTimeout(() => setLayoutTick((v) => v + 1), 180);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(id);
    };
  }, [recomputePaths, ready]);

  useEffect(() => {
    if (reduceMotion || !ready) return;
    const id = window.setInterval(() => setActivePhase((v) => (v + 1) % PHASES.length), 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion, ready]);

  return (
    <div ref={pipelineRef} className="circuit-pipeline">
      <svg className="circuit-pipeline__wires" aria-hidden="true">
        <defs>
          <filter id="s26-flow-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {pipes.map((pipe) => {
          const lit = pipe.trunk
            ? activePhase >= (pipe.trunkFrom ?? pipe.phaseIdx) && activePhase <= (pipe.trunkTo ?? pipe.phaseIdx)
            : activePhase === pipe.phaseIdx;
          return <FlowPipe key={pipe.id} pipe={pipe} lit={lit} animating={animating} />;
        })}
      </svg>

      {PHASES.map((phase, idx) => (
        <Fragment key={phase.num}>
          <PhaseCircuitPanel
            phase={phase}
            phaseIdx={idx}
            active={activePhase === idx}
            animating={animating}
            registerNode={registerNode}
          />
          {idx < PHASES.length - 1 ? (
            <PhaseConnector label={TRUNK_FLOWS[idx]?.label ?? ""} animating={animating} />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
