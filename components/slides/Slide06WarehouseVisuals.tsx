"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SHELF_SLOTS = [
  { x: 10, y: 26 },
  { x: 28, y: 26 },
  { x: 46, y: 26 },
  { x: 64, y: 26 },
  { x: 10, y: 40 },
  { x: 28, y: 40 },
  { x: 46, y: 40 },
  { x: 64, y: 40 },
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
    <rect x={x} y={y} width={14} height={10} rx={2} fill={fill} stroke={stroke} strokeWidth={scanned || active ? 1.6 : 1} />
  );

  if (active && tone === "batch") {
    return (
      <motion.g animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
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

function CounterWorker({ scanning, beamTargetX, beamTargetY }: { scanning?: boolean; beamTargetX: number; beamTargetY: number }) {
  return (
    <g transform="translate(2, 51)">
      <circle cx={0} cy={-7} r={5} fill="#fde68a" stroke="#334155" strokeWidth={0.9} />
      <rect x={-5} y={-1} width={10} height={11} rx={2} fill="#991b1b" stroke="#334155" strokeWidth={0.7} />
      <line x1={-3} y1={10} x2={-4} y2={15} stroke="#334155" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={3} y1={10} x2={4} y2={15} stroke="#334155" strokeWidth={1.5} strokeLinecap="round" />
      {scanning ? (
        <>
          <motion.line
            x1={4}
            y1={3}
            x2={beamTargetX - 2}
            y2={beamTargetY - 51}
            stroke="#fbbf24"
            strokeWidth={1.2}
            strokeDasharray="3 2"
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          <motion.circle
            cx={beamTargetX - 2}
            cy={beamTargetY - 51}
            r={3}
            fill="rgba(251,191,36,0.45)"
            animate={{ opacity: [0.3, 0.85, 0.3], r: [2.5, 4, 2.5] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </>
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
        width={62}
        height={54}
        rx={4}
        fill={tone === "batch" ? "rgba(100,116,139,0.08)" : "rgba(0,120,212,0.08)"}
        stroke={stroke}
        strokeWidth={1.4}
      />
      <text x={31} y={16} textAnchor="middle" fontSize={9} fontWeight={700} fill="#334155">
        {label}
      </text>
      <text x={31} y={28} textAnchor="middle" fontSize={8} fill={tone === "batch" ? "#991b1b" : "#059669"}>
        {sub}
      </text>
      {tone === "cdc" ? (
        <motion.circle
          cx={31}
          cy={42}
          r={5}
          fill="#10b981"
          animate={{ opacity: [0.45, 1, 0.45], r: [5, 6.5, 5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      ) : (
        <motion.rect
          x={10}
          y={38}
          width={42}
          height={5}
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
      animate={{ x: [0, 34], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <rect width={9} height={7} rx={1.5} fill={color} />
    </motion.g>
  );
}

function WarehouseHeader({ tone, status }: { tone: "batch" | "cdc"; status: string }) {
  const stroke = tone === "batch" ? "#991b1b" : "#0078d4";
  const badgeFill = tone === "batch" ? "#991b1b" : "#10b981";

  return (
    <>
      <path d="M0 22 H100" stroke={stroke} strokeWidth={0.8} opacity={0.35} />
      <text x={6} y={12} fontSize={9} fontWeight={700} fill={tone === "batch" ? "#7f1d1d" : "#0c4a6e"}>
        물류센터
      </text>
      <text x={6} y={19} fontSize={7.5} fill={tone === "batch" ? "#991b1b" : "#0078d4"}>
        운영 DB
      </text>
      <rect x={68} y={3} width={28} height={12} rx={2} fill={badgeFill} />
      <text x={82} y={11.5} textAnchor="middle" fontSize={7.5} fontWeight={800} fill="#fff">
        {status}
      </text>
    </>
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
  const beamTargetX = slot.x + 7;
  const beamTargetY = slot.y + 5;

  return (
    <div className="s06-scene s06-scene--batch">
      <svg viewBox="0 0 240 104" className="s06-scene__svg" aria-hidden="true">
        <rect x={0} y={0} width={240} height={22} rx={4} fill="#1e293b" opacity={0.14} />
        <motion.circle
          cx={214}
          cy={11}
          r={8}
          fill="#fbbf24"
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.95, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x={200} y={14} fontSize={8} fill="#78716c">
          🌙 자정
        </text>
        <text x={8} y={14} fontSize={9} fontWeight={700} fill="#991b1b">
          야간 Batch · 문 닫고 전수조사
        </text>

        <g transform="translate(6, 24)">
          <rect x={0} y={0} width={100} height={68} rx={4} fill="rgba(185,28,28,0.06)" stroke="#991b1b" strokeWidth={1.5} />
          <WarehouseHeader tone="batch" status="CLOSED" />

          {[0, 1, 2, 3].map((i) => (
            <rect key={`shelf-${i}`} x={8 + i * 20} y={22} width={18} height={2} rx={1} fill="#cbd5e1" opacity={0.7} />
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

          <CounterWorker scanning={phase === "counting"} beamTargetX={beamTargetX} beamTargetY={beamTargetY} />

          <rect x={24} y={58} width={68} height={4} rx={2} fill="#fecaca" />
          <motion.rect
            x={24}
            y={58}
            height={4}
            rx={2}
            fill="#991b1b"
            animate={{ width: (68 * progress) / 100 }}
            transition={{ duration: 0.25 }}
          />
        </g>

        <motion.path
          d="M112 58 H148"
          stroke="#991b1b"
          strokeWidth={2}
          markerEnd="url(#s06-arrow-red)"
          strokeDasharray="6 4"
          animate={phase === "reporting" ? { strokeDashoffset: [0, -20] } : { strokeDashoffset: 0 }}
          transition={{ duration: 0.5, repeat: phase === "reporting" ? Infinity : 0, ease: "linear" }}
        />
        {phase === "reporting" ? (
          <g transform="translate(112, 54)">
            <DataPacket color="#991b1b" delay={0} />
            <DataPacket color="#b91c1c" delay={0.35} />
            <DataPacket color="#dc2626" delay={0.7} />
          </g>
        ) : null}

        <HqBuilding x={168} y={30} tone="batch" label="본사 (분석 DB)" sub="어제 자정 기준" />

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
          ? "전수조사 완료 → 전일 자정 기준 일괄 전송"
          : `야간 전수조사 ${scanIdx + 1}/${SHELF_SLOTS.length} · 재집계 ${progress}%`}
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
      <svg viewBox="0 0 240 104" className="s06-scene__svg" aria-hidden="true">
        <rect x={0} y={0} width={240} height={22} rx={4} fill="#e0f2fe" opacity={0.6} />
        <text x={8} y={14} fontSize={9} fontWeight={700} fill="#0078d4">
          실시간 CDC · 정상 운영 중
        </text>
        <motion.text
          x={178}
          y={14}
          fontSize={8}
          fill="#059669"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ☀️ 주간 가동
        </motion.text>

        <g transform="translate(6, 24)">
          <rect x={0} y={0} width={100} height={68} rx={4} fill="rgba(0,120,212,0.05)" stroke="#0078d4" strokeWidth={1.5} />
          <WarehouseHeader tone="cdc" status="OPEN" />

          {[0, 1, 2, 3].map((i) => (
            <rect key={`cdc-shelf-${i}`} x={8 + i * 20} y={22} width={18} height={2} rx={1} fill="#bae6fd" opacity={0.8} />
          ))}

          {SHELF_SLOTS.map((s) => (
            <WarehouseBox key={`cdc-${s.x}-${s.y}`} x={s.x} y={s.y} tone="cdc" />
          ))}

          {/* 입출고 센서 — 우측 전용 구역 */}
          <rect x={80} y={24} width={14} height={28} rx={2} fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth={1} />
          <motion.circle
            cx={87}
            cy={30}
            r={4}
            fill="#10b981"
            animate={{ opacity: [0.5, 1, 0.5], r: [4, 5.5, 4] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <text x={87} y={42} textAnchor="middle" fontSize={6.5} fill="#059669" fontWeight={700}>
            입·출고
          </text>
          <text x={87} y={49} textAnchor="middle" fontSize={6.5} fill="#059669" fontWeight={700}>
            센서
          </text>

          <AnimatePresenceParcel event={event} eventIdx={eventIdx} />
        </g>

        {/* 변동분 라벨 — 창고·본사 사이 */}
        <motion.g
          key={`evt-${eventIdx}`}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <rect
            x={108}
            y={46}
            width={36}
            height={14}
            rx={7}
            fill={event.type === "in" ? "#10b981" : "#f59e0b"}
          />
          <text x={126} y={56} textAnchor="middle" fontSize={8} fontWeight={700} fill="#fff">
            {event.label}
          </text>
        </motion.g>

        <motion.path
          d="M112 58 H148"
          stroke="#10b981"
          strokeWidth={2}
          strokeDasharray="5 3"
          markerEnd="url(#s06-arrow-green)"
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
        />
        <g transform="translate(112, 54)">
          <DataPacket color="#10b981" delay={0} />
          <DataPacket color="#059669" delay={0.4} />
          <DataPacket color="#34d399" delay={0.8} />
        </g>

        <HqBuilding x={168} y={30} tone="cdc" label="본사 (분석 DB)" sub="실시간 동기화" />
      </svg>
      <div className="s06-scene__status is-success">
        변동분({event.label})만 즉시 동기화 — 전체 재집계 없음
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
  const startX = event.type === "in" ? 52 : 87;
  const endX = event.type === "in" ? 87 : 52;
  const y = 34;

  return (
    <motion.g
      key={eventIdx}
      initial={{ x: startX, y, opacity: 0 }}
      animate={{ x: [startX, endX], opacity: [0, 1, 1, 0.6] }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <rect
        x={-6}
        y={-4}
        width={12}
        height={9}
        rx={2}
        fill={event.type === "in" ? "#f59e0b" : "#fb923c"}
        stroke="#b45309"
        strokeWidth={0.8}
      />
    </motion.g>
  );
}
