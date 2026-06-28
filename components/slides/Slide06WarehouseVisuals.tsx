"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SHELF_SLOTS = [
  { x: 22, y: 54 },
  { x: 38, y: 54 },
  { x: 54, y: 54 },
  { x: 70, y: 54 },
  { x: 22, y: 68 },
  { x: 38, y: 68 },
  { x: 54, y: 68 },
  { x: 70, y: 68 },
];

function WarehouseBox({ x, y, scanned, tone }: { x: number; y: number; scanned?: boolean; tone: "batch" | "cdc" }) {
  const stroke = tone === "batch" ? "#991b1b" : "#0078d4";
  const fill = scanned
    ? tone === "batch"
      ? "rgba(185,28,28,0.25)"
      : "rgba(16,185,129,0.2)"
    : tone === "batch"
      ? "rgba(185,28,28,0.06)"
      : "rgba(0,120,212,0.06)";

  return (
    <rect x={x} y={y} width={13} height={10} rx={1.5} fill={fill} stroke={stroke} strokeWidth={scanned ? 1.4 : 0.9} />
  );
}

function CounterWorker({ x, y, scanning }: { x: number; y: number; scanning?: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx={0} cy={-8} r={5} fill="#fde68a" stroke="#334155" strokeWidth={0.8} />
      <rect x={-5} y={-2} width={10} height={12} rx={2} fill="#991b1b" stroke="#334155" strokeWidth={0.7} />
      <line x1={-4} y1={10} x2={-5} y2={18} stroke="#334155" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={4} y1={10} x2={5} y2={18} stroke="#334155" strokeWidth={1.5} strokeLinecap="round" />
      {scanning ? (
        <motion.polygon
          points="0,-2 18,6 0,14"
          fill="rgba(251,191,36,0.35)"
          stroke="#fbbf24"
          strokeWidth={0.8}
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      ) : null}
    </g>
  );
}

function HqBuilding({ x, y, tone, label, sub }: { x: number; y: number; tone: "batch" | "cdc"; label: string; sub: string }) {
  const stroke = tone === "batch" ? "#64748b" : "#0078d4";
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={0} width={58} height={52} rx={4} fill={tone === "batch" ? "rgba(100,116,139,0.08)" : "rgba(0,120,212,0.08)"} stroke={stroke} strokeWidth={1.3} />
      <text x={29} y={16} textAnchor="middle" fontSize={9} fontWeight={700} fill="#334155">
        {label}
      </text>
      <text x={29} y={30} textAnchor="middle" fontSize={8} fill={tone === "batch" ? "#991b1b" : "#059669"}>
        {sub}
      </text>
      {tone === "cdc" ? (
        <motion.circle
          cx={29}
          cy={42}
          r={5}
          fill="#10b981"
          animate={{ opacity: [0.5, 1, 0.5], r: [5, 6, 5] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      ) : (
        <rect x={8} y={38} width={42} height={5} rx={2} fill="#991b1b" opacity={0.25} />
      )}
    </g>
  );
}

export function Slide06BatchScene() {
  const reduceMotion = useReducedMotion();
  const [scanIdx, setScanIdx] = useState(0);
  const [phase, setPhase] = useState<"counting" | "reporting">("counting");

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setScanIdx((prev) => {
        if (prev >= SHELF_SLOTS.length - 1) {
          setPhase("reporting");
          window.setTimeout(() => {
            setPhase("counting");
            setScanIdx(0);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 650);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const slot = SHELF_SLOTS[scanIdx] ?? SHELF_SLOTS[0];
  const progress = Math.round(((scanIdx + 1) / SHELF_SLOTS.length) * 100);

  return (
    <div className="s06-scene s06-scene--batch">
      <svg viewBox="0 0 228 118" className="s06-scene__svg" aria-hidden="true">
        <rect x={0} y={0} width={228} height={28} rx={4} fill="#1e293b" opacity={0.14} />
        <motion.circle
          cx={200}
          cy={14}
          r={9}
          fill="#fbbf24"
          opacity={0.7}
          animate={reduceMotion ? undefined : { opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <text x={188} y={17} fontSize={9} fill="#78716c">
          🌙 자정
        </text>
        <text x={8} y={16} fontSize={10} fontWeight={700} fill="#991b1b">
          야간 Batch · 문 닫고 전수조사
        </text>

        <g transform="translate(10, 30)">
          <rect x={0} y={0} width={96} height={72} rx={4} fill="rgba(185,28,28,0.05)" stroke="#991b1b" strokeWidth={1.4} />
          <path d="M0 14 H96" stroke="#991b1b" strokeWidth={0.8} opacity={0.35} />
          <text x={8} y={11} fontSize={9} fontWeight={700} fill="#7f1d1d">
            물류센터 (운영 DB)
          </text>
          <rect x={68} y={2} width={24} height={10} rx={2} fill="#991b1b" opacity={0.85} />
          <text x={80} y={9} textAnchor="middle" fontSize={7} fontWeight={800} fill="#fff">
            CLOSED
          </text>

          {SHELF_SLOTS.map((s, i) => (
            <WarehouseBox key={`${s.x}-${s.y}`} x={s.x} y={s.y} scanned={i <= scanIdx} tone="batch" />
          ))}

          <motion.g animate={{ x: slot.x + 6, y: slot.y + 14 }} transition={{ type: "spring", stiffness: 100, damping: 16 }}>
            <CounterWorker x={0} y={0} scanning={phase === "counting"} />
          </motion.g>

          <rect x={8} y={82} width={80} height={5} rx={2} fill="#fecaca" />
          <motion.rect
            x={8}
            y={82}
            height={5}
            rx={2}
            fill="#991b1b"
            animate={{ width: (80 * progress) / 100 }}
            transition={{ duration: 0.3 }}
          />
          <text x={48} y={80} textAnchor="middle" fontSize={7} fill="#991b1b">
            전체 재고 {progress}% 재계산…
          </text>
        </g>

        <motion.path
          d="M112 72 H148"
          stroke="#991b1b"
          strokeWidth={1.8}
          markerEnd="url(#s06-arrow-red)"
          animate={phase === "reporting" ? { strokeDashoffset: [0, -12] } : undefined}
          transition={{ duration: 0.6, repeat: phase === "reporting" ? Infinity : 0, ease: "linear" }}
          strokeDasharray="6 4"
        />
        {phase === "reporting" ? (
          <motion.rect
            x={118}
            y={66}
            width={12}
            height={10}
            rx={1}
            fill="#991b1b"
            animate={{ x: [118, 136] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        ) : null}

        <HqBuilding x={158} y={38} tone="batch" label="본사 (분석 DB)" sub="어제 자정 기준" />

        <defs>
          <marker id="s06-arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#991b1b" />
          </marker>
          <marker id="s06-arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#10b981" />
          </marker>
        </defs>
      </svg>
      <div className={`s06-scene__status ${phase === "reporting" ? "is-warn" : "is-danger"}`}>
        {phase === "reporting"
          ? "전수조사 완료 → 과거 데이터만 본사에 일괄 전송 (운영 DB 부하↑)"
          : `야간 전수조사 진행 중 — 모든 선반 ${scanIdx + 1}/${SHELF_SLOTS.length} 구역 카운트`}
      </div>
    </div>
  );
}

export function Slide06CdcScene() {
  const reduceMotion = useReducedMotion();
  const [eventIdx, setEventIdx] = useState(0);
  const events = [
    { type: "in" as const, label: "+입고" },
    { type: "out" as const, label: "-출고" },
    { type: "in" as const, label: "+입고" },
  ];
  const event = events[eventIdx];

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setEventIdx((v) => (v + 1) % events.length), 1400);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="s06-scene s06-scene--cdc">
      <svg viewBox="0 0 228 118" className="s06-scene__svg" aria-hidden="true">
        <rect x={0} y={0} width={228} height={28} rx={4} fill="#e0f2fe" opacity={0.55} />
        <text x={8} y={16} fontSize={10} fontWeight={700} fill="#0078d4">
          실시간 CDC · 정상 운영 중
        </text>
        <text x={170} y={16} fontSize={9} fill="#059669">
          ☀️ 주간 가동
        </text>

        <g transform="translate(10, 30)">
          <rect x={0} y={0} width={96} height={72} rx={4} fill="rgba(0,120,212,0.05)" stroke="#0078d4" strokeWidth={1.4} />
          <path d="M0 14 H96" stroke="#0078d4" strokeWidth={0.8} opacity={0.3} />
          <text x={8} y={11} fontSize={9} fontWeight={700} fill="#0c4a6e">
            물류센터 (운영 DB)
          </text>
          <rect x={68} y={2} width={24} height={10} rx={2} fill="#10b981" opacity={0.9} />
          <text x={80} y={9} textAnchor="middle" fontSize={7} fontWeight={800} fill="#fff">
            OPEN
          </text>

          {SHELF_SLOTS.map((s) => (
            <WarehouseBox key={`cdc-${s.x}-${s.y}`} x={s.x} y={s.y} tone="cdc" />
          ))}

          <rect x={78} y={48} width={12} height={18} rx={2} fill="#10b981" opacity={0.85} />
          <circle cx={84} cy={44} r={5} fill="#10b981" opacity={0.75} />
          <text x={84} y={72} textAnchor="middle" fontSize={7} fill="#059669">
            센서
          </text>

          <motion.g
            key={eventIdx}
            initial={{ x: 62, opacity: 0 }}
            animate={{ x: event.type === "in" ? 74 : 90, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2 }}
          >
            <rect x={0} y={52} width={12} height={10} rx={1.5} fill={event.type === "in" ? "#f59e0b" : "#fb923c"} stroke="#b45309" strokeWidth={0.7} />
          </motion.g>

          <rect x={96} y={event.type === "in" ? 44 : 58} width={18} height={10} rx={2} fill={event.type === "in" ? "#10b981" : "#f59e0b"} opacity={0.85} />
          <text x={105} y={event.type === "in" ? 42 : 56} textAnchor="middle" fontSize={8} fontWeight={700} fill={event.type === "in" ? "#059669" : "#b45309"}>
            {event.label}
          </text>
        </g>

        <motion.path
          d="M112 64 H148"
          stroke="#10b981"
          strokeWidth={1.8}
          strokeDasharray="5 3"
          markerEnd="url(#s06-arrow-green)"
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx={130}
          cy={64}
          r={3}
          fill="#10b981"
          animate={{ cx: [118, 146], opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        <HqBuilding x={158} y={38} tone="cdc" label="본사 (분석 DB)" sub="실시간 동기화" />
      </svg>
      <div className="s06-scene__status is-success">
        변동분({event.label})만 즉시 전송 — 재고 전체를 다시 세지 않음 · 운영 DB 부하 제로
      </div>
    </div>
  );
}
