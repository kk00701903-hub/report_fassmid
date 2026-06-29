"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SCENE_WIDTH = 120;
const SCENE_HEIGHT = 228;
const WH_X = 10;
const WH_Y = 26;
const WH_W = 100;
const WH_H = 102;
const HQ_Y = 162;
const HQ_H = 56;
const FLOW_X = WH_X + WH_W / 2;
const FLOW_TOP = WH_Y + WH_H + 2;
const FLOW_BOTTOM = HQ_Y - 2;

const SHELF_SLOTS = [
  { x: 12, y: 28 },
  { x: 30, y: 28 },
  { x: 48, y: 28 },
  { x: 66, y: 28 },
  { x: 12, y: 44 },
  { x: 30, y: 44 },
  { x: 48, y: 44 },
  { x: 66, y: 44 },
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
    <g transform="translate(4, 58)">
      <circle cx={0} cy={-7} r={5} fill="#fde68a" stroke="#334155" strokeWidth={0.9} />
      <rect x={-5} y={-1} width={10} height={11} rx={2} fill="#991b1b" stroke="#334155" strokeWidth={0.7} />
      <line x1={-3} y1={10} x2={-4} y2={15} stroke="#334155" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={3} y1={10} x2={4} y2={15} stroke="#334155" strokeWidth={1.5} strokeLinecap="round" />
      {scanning ? (
        <>
          <motion.line
            x1={4}
            y1={3}
            x2={beamTargetX - 4}
            y2={beamTargetY - 58}
            stroke="#fbbf24"
            strokeWidth={1.2}
            strokeDasharray="3 2"
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          <motion.circle
            cx={beamTargetX - 4}
            cy={beamTargetY - 58}
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

function HqBuilding({ tone, label, sub }: { tone: "batch" | "cdc"; label: string; sub: string }) {
  const stroke = tone === "batch" ? "#64748b" : "#0078d4";
  return (
    <g transform={`translate(${WH_X}, ${HQ_Y})`}>
      <rect
        x={0}
        y={0}
        width={WH_W}
        height={HQ_H}
        rx={4}
        fill={tone === "batch" ? "rgba(100,116,139,0.08)" : "rgba(0,120,212,0.08)"}
        stroke={stroke}
        strokeWidth={1.4}
      />
      <text x={WH_W / 2} y={18} textAnchor="middle" fontSize={10} fontWeight={700} fill="#334155">
        {label}
      </text>
      <text x={WH_W / 2} y={32} textAnchor="middle" fontSize={8.5} fill={tone === "batch" ? "#991b1b" : "#059669"}>
        {sub}
      </text>
      {tone === "cdc" ? (
        <motion.circle
          cx={WH_W / 2}
          cy={44}
          r={6}
          fill="#10b981"
          animate={{ opacity: [0.45, 1, 0.45], r: [6, 7.5, 6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      ) : (
        <motion.rect
          x={24}
          y={40}
          width={52}
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

function VerticalDataPacket({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.g
      animate={{ y: [FLOW_TOP + 2, FLOW_BOTTOM - 10], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <rect x={FLOW_X - 4.5} width={9} height={7} rx={1.5} fill={color} />
    </motion.g>
  );
}

function WarehouseHeader({ tone, status }: { tone: "batch" | "cdc"; status: string }) {
  const stroke = tone === "batch" ? "#991b1b" : "#0078d4";
  const badgeFill = tone === "batch" ? "#991b1b" : "#10b981";

  return (
    <>
      <path d={`M0 24 H${WH_W}`} stroke={stroke} strokeWidth={0.8} opacity={0.35} />
      <text x={WH_W / 2} y={11} textAnchor="middle" fontSize={10} fontWeight={700} fill={tone === "batch" ? "#7f1d1d" : "#0c4a6e"}>
        물류센터
      </text>
      <text x={WH_W / 2} y={20} textAnchor="middle" fontSize={8} fill={tone === "batch" ? "#991b1b" : "#0078d4"}>
        운영 DB
      </text>
      <rect x={WH_W - 32} y={2} width={28} height={12} rx={2} fill={badgeFill} />
      <text x={WH_W - 18} y={10.5} textAnchor="middle" fontSize={7.5} fontWeight={800} fill="#fff">
        {status}
      </text>
    </>
  );
}

function FlowArrow({ tone, animated }: { tone: "batch" | "cdc"; animated?: boolean }) {
  const stroke = tone === "batch" ? "#991b1b" : "#10b981";
  const marker = tone === "batch" ? "url(#s06-arrow-red-down)" : "url(#s06-arrow-green-down)";

  return (
    <motion.path
      d={`M${FLOW_X} ${FLOW_TOP} V${FLOW_BOTTOM}`}
      stroke={stroke}
      strokeWidth={2}
      markerEnd={marker}
      strokeDasharray={tone === "batch" ? "6 4" : "5 3"}
      animate={animated ? { strokeDashoffset: [0, -20] } : tone === "cdc" ? { strokeDashoffset: [0, -16] } : undefined}
      transition={{
        duration: tone === "cdc" ? 0.7 : 0.5,
        repeat: animated || tone === "cdc" ? Infinity : 0,
        ease: "linear",
      }}
    />
  );
}

function WarehouseInterior({ tone, children }: { tone: "batch" | "cdc"; children?: ReactNode }) {
  const stroke = tone === "batch" ? "#991b1b" : "#0078d4";
  const shelfFill = tone === "batch" ? "#cbd5e1" : "#bae6fd";

  return (
    <g transform={`translate(${WH_X}, ${WH_Y})`}>
      <rect x={0} y={0} width={WH_W} height={WH_H} rx={4} fill={tone === "batch" ? "rgba(185,28,28,0.06)" : "rgba(0,120,212,0.05)"} stroke={stroke} strokeWidth={1.5} />
      <WarehouseHeader tone={tone} status={tone === "batch" ? "CLOSED" : "OPEN"} />

      {[0, 1, 2, 3].map((i) => (
        <rect key={`shelf-${i}`} x={10 + i * 20} y={24} width={18} height={2} rx={1} fill={shelfFill} opacity={0.7} />
      ))}

      {children}
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
  const beamTargetX = WH_X + slot.x + 8;
  const beamTargetY = WH_Y + slot.y + 6;

  return (
    <div className="s06-scene s06-scene--batch">
      <svg
        viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
        className="s06-scene__svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <rect x={0} y={0} width={SCENE_WIDTH} height={22} rx={4} fill="#1e293b" opacity={0.14} />
        <motion.circle
          cx={SCENE_WIDTH - 26}
          cy={11}
          r={8}
          fill="#fbbf24"
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.95, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x={SCENE_WIDTH - 40} y={14} fontSize={8} fill="#78716c">
          🌙 자정
        </text>
        <text x={8} y={14} fontSize={9} fontWeight={700} fill="#991b1b">
          야간 Batch · 문 닫고 전수조사
        </text>

        <WarehouseInterior tone="batch">
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

          <rect x={20} y={84} width={60} height={5} rx={2} fill="#fecaca" />
          <motion.rect
            x={20}
            y={84}
            height={5}
            rx={2}
            fill="#991b1b"
            animate={{ width: (60 * progress) / 100 }}
            transition={{ duration: 0.25 }}
          />
        </WarehouseInterior>

        <FlowArrow tone="batch" animated={phase === "reporting"} />
        {phase === "reporting" ? (
          <>
            <VerticalDataPacket color="#991b1b" delay={0} />
            <VerticalDataPacket color="#b91c1c" delay={0.35} />
            <VerticalDataPacket color="#dc2626" delay={0.7} />
          </>
        ) : null}

        <HqBuilding tone="batch" label="본사 (분석 DB)" sub="어제 자정 기준" />

        <defs>
          <marker id="s06-arrow-red-down" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L6,6 L0,6 Z" fill="#991b1b" />
          </marker>
          <marker id="s06-arrow-green-down" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L6,6 L0,6 Z" fill="#10b981" />
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
      <svg
        viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
        className="s06-scene__svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <rect x={0} y={0} width={SCENE_WIDTH} height={22} rx={4} fill="#e0f2fe" opacity={0.6} />
        <text x={8} y={14} fontSize={9} fontWeight={700} fill="#0078d4">
          실시간 CDC · 정상 운영 중
        </text>
        <motion.text
          x={SCENE_WIDTH - 42}
          y={14}
          fontSize={8}
          fill="#059669"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ☀️ 주간 가동
        </motion.text>

        <WarehouseInterior tone="cdc">
          {SHELF_SLOTS.map((s) => (
            <WarehouseBox key={`cdc-${s.x}-${s.y}`} x={s.x} y={s.y} tone="cdc" />
          ))}

          <rect x={82} y={26} width={14} height={32} rx={2} fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth={1} />
          <motion.circle
            cx={89}
            cy={32}
            r={4}
            fill="#10b981"
            animate={{ opacity: [0.5, 1, 0.5], r: [4, 5.5, 4] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <text x={89} y={44} textAnchor="middle" fontSize={6.5} fill="#059669" fontWeight={700}>
            입·출고
          </text>
          <text x={89} y={51} textAnchor="middle" fontSize={6.5} fill="#059669" fontWeight={700}>
            센서
          </text>

          <AnimatePresenceParcel event={event} eventIdx={eventIdx} />
        </WarehouseInterior>

        <motion.g
          key={`evt-${eventIdx}`}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <rect
            x={FLOW_X - 18}
            y={(FLOW_TOP + FLOW_BOTTOM) / 2 - 7}
            width={36}
            height={14}
            rx={7}
            fill={event.type === "in" ? "#10b981" : "#f59e0b"}
          />
          <text x={FLOW_X} y={(FLOW_TOP + FLOW_BOTTOM) / 2 + 3} textAnchor="middle" fontSize={8} fontWeight={700} fill="#fff">
            {event.label}
          </text>
        </motion.g>

        <FlowArrow tone="cdc" />
        <VerticalDataPacket color="#10b981" delay={0} />
        <VerticalDataPacket color="#059669" delay={0.4} />
        <VerticalDataPacket color="#34d399" delay={0.8} />

        <HqBuilding tone="cdc" label="본사 (분석 DB)" sub="실시간 동기화" />

        <defs>
          <marker id="s06-arrow-red-down" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L6,6 L0,6 Z" fill="#991b1b" />
          </marker>
          <marker id="s06-arrow-green-down" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L6,6 L0,6 Z" fill="#10b981" />
          </marker>
        </defs>
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
  const startX = event.type === "in" ? 54 : 89;
  const endX = event.type === "in" ? 89 : 54;
  const y = 36;

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
