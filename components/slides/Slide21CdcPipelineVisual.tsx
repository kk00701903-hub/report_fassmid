"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";

import { mixHex } from "@/lib/cssColor";

const STACK = [
  { id: "oracle", label: "Oracle", sub: "Legacy Source", color: "#c2410c", bg: "#fff7ed" },
  { id: "debezium", label: "Debezium", sub: "CDC Capture", color: "#0078d4", bg: "#eff6fc", hero: true },
  { id: "kafka", label: "Kafka", sub: "Event Stream", color: "#5c2d91", bg: "#f5f0fa", hero: true },
  { id: "postgres", label: "PostgreSQL", sub: "Target DB", color: "#107c10", bg: "#f1faf1" },
] as const;

const FLOW_PATH = "M 84 68 L 108 68 L 108 68 L 212 68 L 236 68";

function FlowArrow({ x, y }: { x: number; y: number }) {
  return (
    <polygon
      points={`${x},${y - 4} ${x + 7},${y} ${x},${y + 4}`}
      fill="#0078d4"
    />
  );
}

function DataPacket({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.circle
      r={4.5}
      fill={color}
      stroke="#ffffff"
      strokeWidth={1.5}
      animate={{ offsetDistance: ["0%", "100%"] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay }}
      style={{ offsetPath: `path('${FLOW_PATH}')`, offsetRotate: "0deg" }}
    />
  );
}

export default function Slide21CdcPipelineVisual() {
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(1);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setActiveIdx((v) => (v + 1) % STACK.length), 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const animating = !reduceMotion;
  const oracleActive = activeIdx === 0;
  const debeziumActive = activeIdx === 1;
  const kafkaActive = activeIdx === 2;
  const pgActive = activeIdx === 3;
  const hubActive = debeziumActive || kafkaActive;

  return (
    <div className="poc-pipeline-visual-wrap">
      <div className="poc-pipeline-visual-stage">
        <svg viewBox="0 0 320 128" className="poc-pipeline-svg" aria-hidden="true">
          <defs>
            <linearGradient id="s21-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c2410c" stopOpacity={0.35} />
              <stop offset="45%" stopColor="#0078d4" />
              <stop offset="55%" stopColor="#5c2d91" />
              <stop offset="100%" stopColor="#107c10" />
            </linearGradient>
            <marker id="s21-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#0078d4" />
            </marker>
          </defs>

          {/* Canvas */}
          <rect x={0} y={0} width={320} height={128} rx={10} fill="#f8fbff" stroke="#c7e0f4" strokeWidth={1.2} />

          {/* Title */}
          <text x={160} y={22} textAnchor="middle" fontSize={10.5} fontWeight={800} fill="#004578" letterSpacing="0.1em">
            REAL-TIME CDC PIPELINE
          </text>
          <line x1={48} y1={28} x2={272} y2={28} stroke="#deecf9" strokeWidth={1} />

          {/* Flow track */}
          <line
            x1={84}
            y1={68}
            x2={236}
            y2={68}
            stroke="#deecf9"
            strokeWidth={6}
            strokeLinecap="round"
          />
          <motion.line
            x1={84}
            y1={68}
            x2={236}
            y2={68}
            stroke="url(#s21-flow-grad)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="10 7"
            animate={animating ? { strokeDashoffset: [0, -34] } : { strokeDashoffset: 0 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
          <FlowArrow x={118} y={68} />
          <FlowArrow x={206} y={68} />

          {animating ? (
            <>
              <DataPacket delay={0} color="#0078d4" />
              <DataPacket delay={0.45} color="#5c2d91" />
              <DataPacket delay={0.9} color="#107c10" />
            </>
          ) : null}

          {/* Oracle */}
          <g transform="translate(16, 38)">
            <motion.rect
              x={0}
              y={0}
              width={68}
              height={58}
              rx={10}
              fill={oracleActive ? "#fff7ed" : "#ffffff"}
              stroke={oracleActive ? "#c2410c" : "#e1a88e"}
              strokeWidth={oracleActive ? 2.5 : 1.5}
              animate={oracleActive && animating ? { scale: [1, 1.03, 1] } : { scale: 1 }}
              style={{ transformOrigin: "34px 29px" }}
              transition={{ duration: 1.2, repeat: oracleActive && animating ? Infinity : 0 }}
            />
            <rect x={0} y={0} width={68} height={4} rx={10} fill="#c2410c" />
            <text x={34} y={26} textAnchor="middle" fontSize={18}>
              🗄️
            </text>
            <text x={34} y={42} textAnchor="middle" fontSize={10.5} fontWeight={800} fill="#9a3412">
              Oracle
            </text>
            <text x={34} y={53} textAnchor="middle" fontSize={8.5} fontWeight={600} fill="#605e5c">
              Legacy Source
            </text>
          </g>

          {/* Debezium + Kafka hub */}
          <g transform="translate(108, 28)">
            <motion.rect
              x={0}
              y={0}
              width={104}
              height={76}
              rx={12}
              fill={hubActive ? "#eff6fc" : "#ffffff"}
              stroke={hubActive ? "#0078d4" : "#b4d6fa"}
              strokeWidth={hubActive ? 2.5 : 1.5}
              animate={hubActive && animating ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              style={{ transformOrigin: "52px 38px" }}
              transition={{ duration: 1.2, repeat: hubActive && animating ? Infinity : 0 }}
            />
            <rect x={0} y={0} width={104} height={4} rx={12} fill="#0078d4" />
            <rect x={52} y={0} width={52} height={4} rx={12} fill="#5c2d91" />

            <rect x={10} y={12} width={40} height={54} rx={8} fill={debeziumActive ? "#deecf9" : "#f3f9fd"} stroke={debeziumActive ? "#0078d4" : "#c7e0f4"} strokeWidth={debeziumActive ? 2 : 1} />
            <text x={30} y={28} textAnchor="middle" fontSize={14}>
              ⚡
            </text>
            <text x={30} y={42} textAnchor="middle" fontSize={7} fontWeight={800} fill="#004578">
              <tspan x={30} dy={0}>
                Debezium
              </tspan>
              <tspan x={30} dy={11} fontSize={7} fontWeight={600} fill="#605e5c">
                CDC
              </tspan>
            </text>

            <rect x={54} y={12} width={40} height={54} rx={8} fill={kafkaActive ? "#ede7f6" : "#faf6ff"} stroke={kafkaActive ? "#5c2d91" : "#d4c4e8"} strokeWidth={kafkaActive ? 2 : 1} />
            <text x={74} y={28} textAnchor="middle" fontSize={14}>
              📨
            </text>
            <text x={74} y={42} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#3b1d5c">
              <tspan x={74} dy={0}>
                Kafka
              </tspan>
              <tspan x={74} dy={12} fontSize={7.5} fontWeight={600} fill="#605e5c">
                Stream
              </tspan>
            </text>
          </g>

          {/* PostgreSQL */}
          <g transform="translate(236, 38)">
            <motion.rect
              x={0}
              y={0}
              width={68}
              height={58}
              rx={10}
              fill={pgActive ? "#f1faf1" : "#ffffff"}
              stroke={pgActive ? "#107c10" : "#9fd89f"}
              strokeWidth={pgActive ? 2.5 : 1.5}
              animate={pgActive && animating ? { scale: [1, 1.03, 1] } : { scale: 1 }}
              style={{ transformOrigin: "34px 29px" }}
              transition={{ duration: 1.2, repeat: pgActive && animating ? Infinity : 0 }}
            />
            <rect x={0} y={0} width={68} height={4} rx={10} fill="#107c10" />
            <text x={34} y={26} textAnchor="middle" fontSize={18}>
              🐘
            </text>
            <text x={34} y={42} textAnchor="middle" fontSize={10} fontWeight={800} fill="#0b6a0b">
              PostgreSQL
            </text>
            <text x={34} y={53} textAnchor="middle" fontSize={8.5} fontWeight={600} fill="#605e5c">
              Target DB
            </text>
          </g>

          {/* Caption bar */}
          <rect x={16} y={106} width={288} height={18} rx={6} fill="#eff6fc" stroke="#c7e0f4" strokeWidth={1} />
          <text x={160} y={118} textAnchor="middle" fontSize={9} fontWeight={700} fill="#323130">
            INSERT · UPDATE · DELETE  →  0.1s 실시간 동기화
          </text>
        </svg>

        {animating ? (
          <motion.span
            className="poc-pipeline-live-badge"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            LIVE
          </motion.span>
        ) : null}
      </div>

      <div className="poc-pipeline-stack-row">
        {STACK.map((item, idx) => {
          const active = activeIdx === idx;
          return (
            <motion.div
              key={item.id}
              className={`poc-stack-chip${"hero" in item && item.hero ? " poc-stack-chip--hero" : ""}${active ? " poc-stack-chip--active" : ""}`}
              style={{ "--chip-accent": item.color, "--chip-bg": item.bg, "--chip-border": mixHex(item.color, "#e1dfdd", 0.35) } as CSSProperties}
              animate={
                active && animating
                  ? { scale: 1.03, boxShadow: `0 0 0 2px ${item.color}` }
                  : { scale: 1, boxShadow: "0 0 0 0 transparent" }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="poc-stack-chip__dot" />
              <span className="poc-stack-chip__label">{item.label}</span>
              <span className="poc-stack-chip__sub">{item.sub}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
