"use client";

import { type ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const CYCLE_MS = 3800;

type ColumnId = "progress" | "roadmap" | "infra";

function ProgressVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 72" className="s12-visual-svg" aria-hidden="true">
      <rect x="8" y="8" width="184" height="56" rx="6" fill="#f3f2f1" stroke="#d2d0ce" strokeWidth="1" />
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={16 + i * 58}
          y={18}
          width={50}
          height={28}
          rx={4}
          fill={i === 0 ? "rgba(0,120,212,0.18)" : i === 1 ? "rgba(16,124,16,0.15)" : "rgba(202,80,16,0.12)"}
          stroke={i === 0 ? "#0078d4" : i === 1 ? "#107c10" : "#ca5010"}
          strokeWidth={1.2}
          animate={active ? { opacity: [0.5, 1, 0.5], y: [20, 18, 20] } : { opacity: 0.65, y: 20 }}
          transition={{ duration: 1.4, repeat: active ? Infinity : 0, delay: i * 0.2 }}
        />
      ))}
      {["Java", "React", "Next"].map((label, i) => (
        <text key={label} x={41 + i * 58} y={36} textAnchor="middle" fontSize={9} fontWeight={700} fill="#201f1e">
          {label}
        </text>
      ))}
      <rect x="16" y="52" width="168" height="6" rx={3} fill="#edebe9" />
      <motion.rect
        x="16"
        y="52"
        height="6"
        rx={3}
        fill="#0078d4"
        animate={active ? { width: [40, 118, 118] } : { width: 72 }}
        transition={{ duration: 2.6, repeat: active ? Infinity : 0, ease: "easeInOut" }}
      />
      {active ? (
        <motion.circle
          cx="134"
          cy="55"
          r={4}
          fill="#ca5010"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      ) : null}
    </svg>
  );
}

function RoadmapVisual({ active }: { active: boolean }) {
  const nodes = [
    { x: 28, label: "PoC", done: true },
    { x: 100, label: "26.10", done: false },
    { x: 172, label: "전환", done: false },
  ];

  return (
    <svg viewBox="0 0 200 72" className="s12-visual-svg" aria-hidden="true">
      <rect x="8" y="8" width="184" height="56" rx="6" fill="#f3f2f1" stroke="#d2d0ce" strokeWidth="1" />
      <line x1="28" y1="38" x2="172" y2="38" stroke="#d2d0ce" strokeWidth="2" strokeDasharray="4 3" />
      {nodes.map((node) => (
        <g key={node.label}>
          <circle
            cx={node.x}
            cy={38}
            r={10}
            fill={node.done ? "#107c10" : "#ffffff"}
            stroke={node.done ? "#107c10" : "#0078d4"}
            strokeWidth={2}
          />
          {node.done ? (
            <path d={`M ${node.x - 4} 38 L ${node.x - 1} 41 L ${node.x + 5} 34`} stroke="#fff" strokeWidth={2} fill="none" />
          ) : null}
          <text x={node.x} y={58} textAnchor="middle" fontSize={8} fontWeight={700} fill="#484644">
            {node.label}
          </text>
        </g>
      ))}
      {active ? (
        <motion.circle
          r={5}
          fill="#0078d4"
          animate={{ cx: [28, 100, 172, 172], cy: [38, 38, 38, 38] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.85, 1] }}
        />
      ) : (
        <circle cx={28} cy={38} r={5} fill="#0078d4" opacity={0.5} />
      )}
    </svg>
  );
}

function InfraVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 72" className="s12-visual-svg" aria-hidden="true">
      <rect x="8" y="8" width="184" height="56" rx="6" fill="#f3f2f1" stroke="#d2d0ce" strokeWidth="1" />
      <ellipse cx="44" cy="32" rx="22" ry="12" fill="rgba(0,120,212,0.12)" stroke="#0078d4" strokeWidth="1.2" />
      <text x="44" y="35" textAnchor="middle" fontSize={8} fontWeight={700} fill="#0078d4">
        Cloud
      </text>
      <rect x="88" y="22" width="28" height="22" rx="3" fill="#ffffff" stroke="#484644" strokeWidth="1.2" />
      <line x1="92" y1="28" x2="112" y2="28" stroke="#0078d4" strokeWidth="1" />
      <line x1="92" y1="33" x2="108" y2="33" stroke="#d2d0ce" strokeWidth="1" />
      <text x="102" y="52" textAnchor="middle" fontSize={8} fontWeight={700} fill="#484644">
        On-Prem
      </text>
      <rect x="148" y="20" width="32" height="26" rx="3" fill="rgba(92,45,145,0.1)" stroke="#5c2d91" strokeWidth="1.2" />
      <text x="164" y="36" textAnchor="middle" fontSize={8} fontWeight={700} fill="#5c2d91">
        ASP
      </text>
      <motion.path
        d="M 66 32 L 88 32"
        stroke="#0078d4"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3 2"
        animate={active ? { strokeDashoffset: [0, -10] } : undefined}
        transition={{ duration: 0.8, repeat: active ? Infinity : 0, ease: "linear" }}
      />
      <motion.path
        d="M 116 32 L 148 32"
        stroke="#5c2d91"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3 2"
        animate={active ? { strokeDashoffset: [0, -10] } : undefined}
        transition={{ duration: 0.8, repeat: active ? Infinity : 0, ease: "linear", delay: 0.15 }}
      />
      {active
        ? [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r={3}
              fill={i === 2 ? "#5c2d91" : "#0078d4"}
              animate={{ cx: [44, 102, 164], cy: [32, 32, 32], opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            />
          ))
        : null}
    </svg>
  );
}

const VISUALS: Record<ColumnId, (props: { active: boolean }) => ReactNode> = {
  progress: ProgressVisual,
  roadmap: RoadmapVisual,
  infra: InfraVisual,
};

export type SummaryColumnData = {
  id: ColumnId;
  icon: string;
  title: string;
  highlight: string;
  items: {
    tag: string;
    tagVariant: "completed" | "ongoing" | "planned";
    text: string;
    subtext: string;
  }[];
};

export function Slide12SummaryBoard({ columns }: { columns: SummaryColumnData[] }) {
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setActiveIdx((v) => (v + 1) % columns.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, columns.length]);

  return (
    <div className="summary-grid-container">
      {columns.map((col, idx) => {
        const Visual = VISUALS[col.id];
        const active = activeIdx === idx;
        const animating = active && !reduceMotion;

        return (
          <motion.article
            key={col.id}
            className={`summary-column-item${active ? " summary-column-item--active" : ""}`}
            animate={
              active
                ? {
                    scale: 1.015,
                    boxShadow: "0 4px 18px rgba(0,120,212,0.14), 0 0 0 1px rgba(0,120,212,0.28)",
                  }
                : { scale: 1, boxShadow: "var(--ppt-shadow-soft)" }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="summary-column-header">
              <div className="summary-column-icon">
                <i className={col.icon} />
              </div>
              <div className="summary-column-title">{col.title}</div>
              <AnimatePresence>
                {active ? (
                  <motion.span
                    className="summary-column-live"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                  >
                    재생 중
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="summary-visual-wrap">
              <Visual active={animating} />
            </div>

            <div className="summary-list-container">
              {col.items.map((item) => (
                <div key={item.tag + item.text} className="summary-list-item">
                  <span className={`summary-item-tag tag-${item.tagVariant}`}>{item.tag}</span>
                  <div className="summary-item-text">{item.text}</div>
                  <div className="summary-item-subtext">{item.subtext}</div>
                </div>
              ))}
            </div>

            <div className="summary-highlight-box">
              <div className="summary-highlight-text">{col.highlight}</div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
