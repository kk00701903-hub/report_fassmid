"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SCENE_WIDTH = 132;
const SCENE_HEIGHT = 232;
const HEADER_H = 30;
const WH_X = 10;
const WH_Y = HEADER_H + 4;
const WH_W = 100;
const WH_H = 102;
const HQ_Y = 162;
const HQ_H = 56;
const FLOW_X = WH_X + WH_W / 2;
const FLOW_TOP = WH_Y + WH_H + 2;
const FLOW_BOTTOM = HQ_Y - 2;

/** CDC 입·출고 센서 — 물류센터 박스 우측 외부 */
const SENSOR_W = 16;
const SENSOR_H = 34;
const SENSOR_X = WH_X + WH_W + 4;
const SENSOR_Y = WH_Y + 38;
const SENSOR_CX = SENSOR_X + SENSOR_W / 2;
const SENSOR_CY = SENSOR_Y + SENSOR_H / 2;
const WH_DOCK_X = WH_X + WH_W;
const WH_DOCK_Y = WH_Y + 52;

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

function WarehouseHeader({ tone }: { tone: "batch" | "cdc" }) {
  const stroke = tone === "batch" ? "#991b1b" : "#0078d4";

  return (
    <>
      <path d={`M0 24 H${WH_W}`} stroke={stroke} strokeWidth={0.8} opacity={0.35} />
      <text x={WH_W / 2} y={16} textAnchor="middle" fontSize={10} fontWeight={700} fill={tone === "batch" ? "#7f1d1d" : "#0c4a6e"}>
        물류센터
      </text>
    </>
  );
}

function CdcIoSensor() {
  return (
    <g>
      <line
        x1={WH_DOCK_X}
        y1={WH_DOCK_Y}
        x2={SENSOR_X}
        y2={SENSOR_CY}
        stroke="#10b981"
        strokeWidth={1.2}
        strokeDasharray="3 2"
        opacity={0.85}
      />
      <circle cx={WH_DOCK_X} cy={WH_DOCK_Y} r={2.2} fill="#10b981" />
      <rect
        x={SENSOR_X}
        y={SENSOR_Y}
        width={SENSOR_W}
        height={SENSOR_H}
        rx={2}
        fill="rgba(16,185,129,0.12)"
        stroke="#10b981"
        strokeWidth={1.2}
      />
      <motion.circle
        cx={SENSOR_CX}
        cy={SENSOR_Y + 9}
        r={4}
        fill="#10b981"
        animate={{ opacity: [0.5, 1, 0.5], r: [4, 5.5, 4] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
      <text x={SENSOR_CX} y={SENSOR_Y + 22} textAnchor="middle" fontSize={6.5} fill="#059669" fontWeight={700}>
        입·출고
      </text>
      <text x={SENSOR_CX} y={SENSOR_Y + 29} textAnchor="middle" fontSize={6.5} fill="#059669" fontWeight={700}>
        센서
      </text>
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

function SceneHeaderBatch({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <>
      <rect x={0} y={0} width={SCENE_WIDTH} height={HEADER_H} rx={4} fill="#1e293b" opacity={0.14} />
      <text x={8} y={12} fontSize={9} fontWeight={700} fill="#991b1b">
        야간 Batch
      </text>
      <text x={8} y={22} fontSize={8.5} fontWeight={600} fill="#7f1d1d">
        문 닫고 전수조사
      </text>
      <g transform={`translate(${SCENE_WIDTH - 8}, 0)`}>
        <motion.circle
          cx={0}
          cy={11}
          r={6}
          fill="#fbbf24"
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.95, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x={0} y={24} textAnchor="end" fontSize={7.5} fill="#78716c">
          🌙 자정
        </text>
      </g>
    </>
  );
}

function SceneHeaderCdc() {
  return (
    <>
      <rect x={0} y={0} width={SCENE_WIDTH} height={HEADER_H} rx={4} fill="#e0f2fe" opacity={0.6} />
      <text x={8} y={12} fontSize={9} fontWeight={700} fill="#0078d4">
        실시간 CDC
      </text>
      <text x={8} y={22} fontSize={8.5} fontWeight={600} fill="#0369a1">
        정상 운영 중
      </text>
      <motion.text
        x={SCENE_WIDTH - 8}
        y={17}
        textAnchor="end"
        fontSize={7.5}
        fill="#059669"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ☀️ 주간 가동
      </motion.text>
    </>
  );
}

function FlowArrow({ tone, animated }: { tone: "batch" | "cdc"; animated?: boolean }) {
  const stroke = tone === "batch" ? "#991b1b" : "#10b981";
  const tipY = FLOW_BOTTOM;
  const shaftEnd = tipY - 6;

  return (
    <g>
      <motion.line
        x1={FLOW_X}
        y1={FLOW_TOP}
        x2={FLOW_X}
        y2={shaftEnd}
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={tone === "batch" ? "5 4" : undefined}
        animate={animated ? { strokeDashoffset: [0, -18] } : tone === "cdc" ? { strokeDashoffset: [0, -14] } : undefined}
        transition={{
          duration: tone === "cdc" ? 0.7 : 0.5,
          repeat: animated || tone === "cdc" ? Infinity : 0,
          ease: "linear",
        }}
      />
      <path
        d={`M${FLOW_X - 7} ${shaftEnd - 1} L${FLOW_X} ${tipY} L${FLOW_X + 7} ${shaftEnd - 1} Z`}
        fill={stroke}
      />
    </g>
  );
}

function WarehouseInterior({ tone, children }: { tone: "batch" | "cdc"; children?: ReactNode }) {
  const stroke = tone === "batch" ? "#991b1b" : "#0078d4";
  const shelfFill = tone === "batch" ? "#cbd5e1" : "#bae6fd";

  return (
    <g transform={`translate(${WH_X}, ${WH_Y})`}>
      <rect x={0} y={0} width={WH_W} height={WH_H} rx={4} fill={tone === "batch" ? "rgba(185,28,28,0.06)" : "rgba(0,120,212,0.05)"} stroke={stroke} strokeWidth={1.5} />
      <WarehouseHeader tone={tone} />

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

  const progress = Math.round(((scanIdx + 1) / SHELF_SLOTS.length) * 100);

  return (
    <div className="s06-scene s06-scene--batch">
      <svg
        viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
        className="s06-scene__svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <SceneHeaderBatch reduceMotion={reduceMotion} />

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
        <SceneHeaderCdc />

        <WarehouseInterior tone="cdc">
          {SHELF_SLOTS.map((s) => (
            <WarehouseBox key={`cdc-${s.x}-${s.y}`} x={s.x} y={s.y} tone="cdc" />
          ))}
        </WarehouseInterior>

        <CdcIoSensor />
        <AnimatePresenceParcel event={event} eventIdx={eventIdx} />

        <FlowArrow tone="cdc" />
        <VerticalDataPacket color="#10b981" delay={0} />
        <VerticalDataPacket color="#059669" delay={0.4} />
        <VerticalDataPacket color="#34d399" delay={0.8} />

        <HqBuilding tone="cdc" label="본사 (분석 DB)" sub="실시간 동기화" />
      </svg>
      <div className="s06-scene__status is-success">
        변동분만 즉시 동기화 — 전체 재집계 없음
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
  const shelfX = WH_X + 54;
  const shelfY = WH_Y + 36;
  const sensorX = SENSOR_CX;
  const sensorY = SENSOR_CY;
  const startX = event.type === "in" ? shelfX : sensorX;
  const endX = event.type === "in" ? sensorX : shelfX;
  const startY = event.type === "in" ? shelfY : sensorY;
  const endY = event.type === "in" ? sensorY : shelfY;

  return (
    <motion.g
      key={eventIdx}
      initial={{ x: startX, y: startY, opacity: 0 }}
      animate={{ x: [startX, endX], y: [startY, endY], opacity: [0, 1, 1, 0.6] }}
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
