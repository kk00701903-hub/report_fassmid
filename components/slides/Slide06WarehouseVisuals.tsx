"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SHELF_SLOTS = [
  { x: 20, y: 38 },
  { x: 40, y: 38 },
  { x: 60, y: 38 },
  { x: 80, y: 38 },
  { x: 20, y: 54 },
  { x: 40, y: 54 },
  { x: 60, y: 54 },
  { x: 80, y: 54 },
] as const;

const CDC_EVENTS = [
  { type: "in" as const, label: "+입고" },
  { type: "out" as const, label: "-출고" },
  { type: "in" as const, label: "+입고" },
  { type: "out" as const, label: "-출고" },
];

function WarehouseBox({
  x,
  y,
  scanned,
  active,
  tone,
}: {
  x: number;
  y: number;
  scanned?: boolean;
  active?: boolean;
  tone: "batch" | "cdc";
}) {
  const stroke = tone === "batch" ? "#991b1b" : "#0078d4";
  const fill = scanned
    ? tone === "batch"
      ? "rgba(185,28,28,0.28)"
      : "rgba(16,185,129,0.22)"
    : tone === "batch"
      ? "rgba(185,28,28,0.07)"
      : "rgba(0,120,212,0.07)";

  const rect = (
    <rect x={x} y={y} width={16} height={12} rx={2} fill={fill} stroke={stroke} strokeWidth={scanned || active ? 1.6 : 1} />
  );

  if (active && tone === "batch") {
    return (
      <motion.g animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
        {rect}
      </motion.g>
    );
  }

  if (tone === "cdc") {
    return (
      <motion.g animate={{ opacity: [0.85, 1, 0.85] }} transition={{ duration: 2.2, repeat: Infinity, delay: (x + y) * 0.01 }}>
        {rect}
      </motion.g>
    );
  }

  return rect;
}

function CounterWorker({ scanning }: { scanning?: boolean }) {
  return (
    <g>
      <circle cx={0} cy={-10} r={7} fill="#fde68a" stroke="#334155" strokeWidth={1} />
      <rect x={-7} y={-2} width={14} height={16} rx={2} fill="#991b1b" stroke="#334155" strokeWidth={0.8} />
      <line x1={-5} y1={14} x2={-6} y2={24} stroke="#334155" strokeWidth={2} strokeLinecap="round" />
      <line x1={5} y1={14} x2={6} y2={24} stroke="#334155" strokeWidth={2} strokeLinecap="round" />
      <motion.line
        x1={8}
        y1={2}
        x2={22}
        y2={8}
        stroke="#334155"
        strokeWidth={2}
        strokeLinecap="round"
        animate={scanning ? { rotate: [0, 12, -8, 0] } : undefined}
        style={{ transformOrigin: "8px 2px" }}
        transition={{ duration: 0.7, repeat: Infinity }}
      />
      {scanning ? (
        <motion.polygon
          points="0,0 24,8 0,16"
          fill="rgba(251,191,36,0.35)"
          stroke="#fbbf24"
          strokeWidth={1}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      ) : null}
    </g>
  );
}

function HqBuilding({ x, y, tone, label, sub }: { x: number; y: number; tone: "batch" | "cdc"; label: string; sub: string }) {
  const stroke = tone === "batch" ? "#64748b" : "#0078d4";
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={0}
        y={0}
        width={64}
        height={58}
        rx={4}
        fill={tone === "batch" ? "rgba(100,116,139,0.08)" : "rgba(0,120,212,0.08)"}
        stroke={stroke}
        strokeWidth={1.4}
      />
      <text x={32} y={18} textAnchor="middle" fontSize={10} fontWeight={700} fill="#334155">
        {label}
      </text>
      <text x={32} y={32} textAnchor="middle" fontSize={9} fill={tone === "batch" ? "#991b1b" : "#059669"}>
        {sub}
      </text>
      {tone === "cdc" ? (
        <motion.circle
          cx={32}
          cy={46}
          r={6}
          fill="#10b981"
          animate={{ opacity: [0.45, 1, 0.45], r: [6, 7.5, 6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      ) : (
        <motion.rect
          x={10}
          y={42}
          width={44}
          height={6}
          rx={2}
          fill="#991b1b"
          animate={{ opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </g>
  );
}

function DataPacket({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.g
      animate={{ x: [0, 36], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <rect width={10} height={8} rx={1.5} fill={color} />
    </motion.g>
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
          }, 2400);
          return prev;
        }
        return prev + 1;
      });
    }, 580);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const slot = SHELF_SLOTS[scanIdx] ?? SHELF_SLOTS[0];
  const progress = Math.round(((scanIdx + 1) / SHELF_SLOTS.length) * 100);

  return (
    <div className="s06-scene s06-scene--batch">
      <svg viewBox="0 0 228 96" className="s06-scene__svg" aria-hidden="true">
        <rect x={0} y={0} width={228} height={24} rx={4} fill="#1e293b" opacity={0.16} />
        <motion.circle
          cx={204}
          cy={12}
          r={10}
          fill="#fbbf24"
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.95, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x={192} y={15} fontSize={9} fill="#78716c">
          🌙 자정
        </text>
        <text x={8} y={15} fontSize={10} fontWeight={700} fill="#991b1b">
          야간 Batch · 문 닫고 전수조사
        </text>

        <g transform="translate(8, 26)">
          <rect x={0} y={0} width={108} height={66} rx={4} fill="rgba(185,28,28,0.06)" stroke="#991b1b" strokeWidth={1.5} />
          <path d="M0 14 H108" stroke="#991b1b" strokeWidth={0.8} opacity={0.35} />
          <text x={8} y={11} fontSize={10} fontWeight={700} fill="#7f1d1d">
            물류센터 (운영 DB)
          </text>
          <motion.rect
            x={76}
            y={2}
            width={28}
            height={11}
            rx={2}
            fill="#991b1b"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <text x={90} y={10} textAnchor="middle" fontSize={8} fontWeight={800} fill="#fff">
            CLOSED
          </text>

          {[0, 1, 2, 3].map((i) => (
            <rect key={`shelf-${i}`} x={14 + i * 24} y={32} width={20} height={3} rx={1} fill="#cbd5e1" opacity={0.7} />
          ))}

          {SHELF_SLOTS.map((s, i) => (
            <WarehouseBox
              key={`${s.x}-${s.y}`}
              x={s.x}
              y={s.y}
              scanned={i <= scanIdx}
              active={phase === "counting" && i === scanIdx}
              tone="batch"
            />
          ))}

          <motion.g
            animate={{ x: slot.x + 8, y: slot.y + 16 }}
            transition={{ type: "spring", stiffness: 110, damping: 15 }}
          >
            <CounterWorker scanning={phase === "counting"} />
          </motion.g>

          <rect x={8} y={74} width={92} height={6} rx={2} fill="#fecaca" />
          <motion.rect
            x={8}
            y={74}
            height={6}
            rx={2}
            fill="#991b1b"
            animate={{ width: (92 * progress) / 100 }}
            transition={{ duration: 0.25 }}
          />
          <text x={54} y={72} textAnchor="middle" fontSize={8} fill="#991b1b" fontWeight={700}>
            전체 재고 {progress}% 재계산…
          </text>
        </g>

        <motion.path
          d="M118 58 H152"
          stroke="#991b1b"
          strokeWidth={2}
          markerEnd="url(#s06-arrow-red)"
          strokeDasharray="6 4"
          animate={phase === "reporting" ? { strokeDashoffset: [0, -20] } : { strokeDashoffset: 0 }}
          transition={{ duration: 0.5, repeat: phase === "reporting" ? Infinity : 0, ease: "linear" }}
        />
        {phase === "reporting" ? (
          <g transform="translate(118, 54)">
            <DataPacket color="#991b1b" delay={0} />
            <DataPacket color="#b91c1c" delay={0.35} />
            <DataPacket color="#dc2626" delay={0.7} />
          </g>
        ) : null}

        <HqBuilding x={158} y={28} tone="batch" label="본사 (분석 DB)" sub="어제 자정 기준" />

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
          ? "전수조사 완료 → 전일 자정 기준 데이터 일괄 전송 (운영 DB 부하↑)"
          : `야간 전수조사 진행 — 전 구역 재집계 ${scanIdx + 1}/${SHELF_SLOTS.length}`}
      </div>
    </div>
  );
}

export function Slide06CdcScene() {
  const reduceMotion = useReducedMotion();
  const [eventIdx, setEventIdx] = useState(0);
  const event = CDC_EVENTS[eventIdx];

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setEventIdx((v) => (v + 1) % CDC_EVENTS.length), 1200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="s06-scene s06-scene--cdc">
      <svg viewBox="0 0 228 96" className="s06-scene__svg" aria-hidden="true">
        <rect x={0} y={0} width={228} height={24} rx={4} fill="#e0f2fe" opacity={0.6} />
        <text x={8} y={15} fontSize={10} fontWeight={700} fill="#0078d4">
          실시간 CDC · 정상 운영 중
        </text>
        <motion.text
          x={168}
          y={15}
          fontSize={9}
          fill="#059669"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ☀️ 주간 가동
        </motion.text>

        <g transform="translate(8, 26)">
          <rect x={0} y={0} width={108} height={66} rx={4} fill="rgba(0,120,212,0.05)" stroke="#0078d4" strokeWidth={1.5} />
          <path d="M0 14 H108" stroke="#0078d4" strokeWidth={0.8} opacity={0.3} />
          <text x={8} y={11} fontSize={10} fontWeight={700} fill="#0c4a6e">
            물류센터 (운영 DB)
          </text>
          <motion.rect
            x={76}
            y={2}
            width={28}
            height={11}
            rx={2}
            fill="#10b981"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <text x={90} y={10} textAnchor="middle" fontSize={8} fontWeight={800} fill="#fff">
            OPEN
          </text>

          {[0, 1, 2, 3].map((i) => (
            <rect key={`cdc-shelf-${i}`} x={14 + i * 24} y={32} width={20} height={3} rx={1} fill="#bae6fd" opacity={0.8} />
          ))}

          {SHELF_SLOTS.map((s) => (
            <WarehouseBox key={`cdc-${s.x}-${s.y}`} x={s.x} y={s.y} tone="cdc" />
          ))}

          <rect x={88} y={44} width={14} height={22} rx={2} fill="#10b981" opacity={0.85} />
          <motion.circle
            cx={95}
            cy={40}
            r={6}
            fill="#10b981"
            animate={{ opacity: [0.5, 1, 0.5], r: [6, 8, 6] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <text x={95} y={70} textAnchor="middle" fontSize={8} fill="#059669" fontWeight={700}>
            입출고 센서
          </text>

          <AnimatePresenceParcel event={event} eventIdx={eventIdx} />

          <motion.rect
            x={104}
            y={event.type === "in" ? 40 : 54}
            width={20}
            height={11}
            rx={2}
            fill={event.type === "in" ? "#10b981" : "#f59e0b"}
            opacity={0.9}
            key={`tag-${eventIdx}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 0.25 }}
          />
          <text
            x={114}
            y={event.type === "in" ? 38 : 52}
            textAnchor="middle"
            fontSize={9}
            fontWeight={700}
            fill={event.type === "in" ? "#059669" : "#b45309"}
          >
            {event.label}
          </text>
        </g>

        <motion.path
          d="M118 56 H152"
          stroke="#10b981"
          strokeWidth={2}
          strokeDasharray="5 3"
          markerEnd="url(#s06-arrow-green)"
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
        />
        <g transform="translate(118, 52)">
          <DataPacket color="#10b981" delay={0} />
          <DataPacket color="#059669" delay={0.4} />
          <DataPacket color="#34d399" delay={0.8} />
        </g>

        <HqBuilding x={158} y={28} tone="cdc" label="본사 (분석 DB)" sub="실시간 동기화" />
      </svg>
      <div className="s06-scene__status is-success">
        변동분({event.label})만 즉시 동기화 — 전체 재집계 없음 · 운영 DB 부하 최소
      </div>
    </div>
  );
}

function AnimatePresenceParcel({
  event,
  eventIdx,
}: {
  event: (typeof CDC_EVENTS)[number];
  eventIdx: number;
}) {
  const startX = event.type === "in" ? 58 : 95;
  const endX = event.type === "in" ? 88 : 58;
  const y = 52;

  return (
    <motion.g
      key={eventIdx}
      initial={{ x: startX, y, opacity: 0 }}
      animate={{ x: [startX, endX], opacity: [0, 1, 1, 0.6] }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <rect
        x={0}
        y={0}
        width={14}
        height={11}
        rx={2}
        fill={event.type === "in" ? "#f59e0b" : "#fb923c"}
        stroke="#b45309"
        strokeWidth={0.8}
      />
      {event.type === "in" ? (
        <motion.g animate={{ x: [-4, 0] }} transition={{ duration: 0.3 }}>
          <rect x={-10} y={2} width={8} height={7} rx={1} fill="#64748b" />
        </motion.g>
      ) : null}
    </motion.g>
  );
}
