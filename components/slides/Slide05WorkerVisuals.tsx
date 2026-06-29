"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const TASKS = ["입고", "분류", "포장", "출고"] as const;
const STATION_Y = [36, 76, 116, 156] as const;
const CONVEYOR_X = 16;
const WORKER_X = 34;
const LABEL_X = 52;
const SCENE_WIDTH = 88;
const SCENE_HEIGHT = 196;

type WorkerFigureProps = {
  x?: number;
  y?: number;
  tone?: "legacy" | "msa" | "swap";
  active?: boolean;
  injured?: boolean;
  label?: string;
  working?: boolean;
};

export function WorkerFigure({
  x = 0,
  y = 20,
  tone = "msa",
  active = false,
  injured = false,
  label,
  working = false,
}: WorkerFigureProps) {
  const skin = injured ? "#fca5a5" : "#fde68a";
  const shirt =
    tone === "legacy"
      ? injured
        ? "#991b1b"
        : "#b91c1c"
      : tone === "swap"
        ? "#10b981"
        : active
          ? "#0078d4"
          : "#64748b";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {active && !injured ? <circle cx={0} cy={-20} r={16} fill="rgba(0,120,212,0.15)" /> : null}
      <circle cx={0} cy={-11} r={9} fill={skin} stroke="#334155" strokeWidth={1.2} />
      <rect x={-10} y={-2} width={20} height={22} rx={3} fill={shirt} stroke="#334155" strokeWidth={0.9} />
      <motion.line
        x1={-10}
        y1={5}
        x2={-17}
        y2={14}
        stroke="#334155"
        strokeWidth={2.4}
        strokeLinecap="round"
        animate={working && !injured ? { rotate: [0, -18, 0] } : undefined}
        style={{ transformOrigin: "-10px 5px" }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
      <motion.line
        x1={10}
        y1={5}
        x2={17}
        y2={14}
        stroke="#334155"
        strokeWidth={2.4}
        strokeLinecap="round"
        animate={working && !injured ? { rotate: [0, 18, 0] } : undefined}
        style={{ transformOrigin: "10px 5px" }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
      />
      <line x1={-6} y1={20} x2={-7} y2={32} stroke="#334155" strokeWidth={2.4} strokeLinecap="round" />
      <line x1={6} y1={20} x2={7} y2={32} stroke="#334155" strokeWidth={2.4} strokeLinecap="round" />
      {label ? (
        <text x={0} y={38} textAnchor="middle" fontSize={8} fontWeight={700} fill={injured ? "#991b1b" : "#334155"}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Station({ y, label, lit, danger }: { y: number; label: string; lit?: boolean; danger?: boolean }) {
  return (
    <g transform={`translate(${LABEL_X}, ${y})`}>
      <rect
        x={0}
        y={-10}
        width={34}
        height={20}
        rx={3}
        fill={danger ? "rgba(185,28,28,0.15)" : lit ? "rgba(0,120,212,0.12)" : "#f1f5f9"}
        stroke={danger ? "#b91c1c" : lit ? "#0078d4" : "#cbd5e1"}
        strokeWidth={lit || danger ? 1.5 : 1}
      />
      <text x={17} y={4} textAnchor="middle" fontSize={9} fontWeight={700} fill={danger ? "#991b1b" : "#334155"}>
        {label}
      </text>
    </g>
  );
}

function VerticalConveyor() {
  return (
    <>
      <rect x={CONVEYOR_X} y={24} width={8} height={148} rx={2} fill="#64748b" opacity={0.35} />
      <motion.line
        x1={CONVEYOR_X + 4}
        y1={24}
        x2={CONVEYOR_X + 4}
        y2={172}
        stroke="#475569"
        strokeWidth={2}
        strokeDasharray="8 6"
        animate={{ strokeDashoffset: [0, -28] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {STATION_Y.slice(0, -1).map((y, i) => (
        <g key={TASKS[i]}>
          <line
            x1={CONVEYOR_X + 8}
            y1={y + 10}
            x2={LABEL_X - 2}
            y2={STATION_Y[i + 1] - 10}
            stroke="#94a3b8"
            strokeWidth={1}
            strokeDasharray="3 2"
            opacity={0.5}
          />
          <polygon
            points={`${CONVEYOR_X + 10},${(y + STATION_Y[i + 1]) / 2 + 2} ${CONVEYOR_X + 6},${(y + STATION_Y[i + 1]) / 2 - 2} ${CONVEYOR_X + 14},${(y + STATION_Y[i + 1]) / 2 - 2}`}
            fill="#94a3b8"
            opacity={0.55}
          />
        </g>
      ))}
    </>
  );
}

function Parcel({ y = 28 }: { y?: number }) {
  return (
    <motion.g animate={{ x: [0, -2, 0] }} transition={{ duration: 0.7, repeat: Infinity }}>
      <rect x={CONVEYOR_X - 1} y={y} width={13} height={18} rx={2} fill="#f59e0b" stroke="#b45309" strokeWidth={0.8} />
      <line x1={CONVEYOR_X - 1} y1={y + 6} x2={CONVEYOR_X + 12} y2={y + 6} stroke="#b45309" strokeWidth={0.6} opacity={0.6} />
    </motion.g>
  );
}

export function Slide05MonoScene() {
  const reduceMotion = useReducedMotion();
  const [taskIdx, setTaskIdx] = useState(0);
  const [incident, setIncident] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setTaskIdx((prev) => {
        const next = (prev + 1) % TASKS.length;
        if (next === 0) {
          setIncident(true);
          window.setTimeout(() => setIncident(false), 2400);
        }
        return next;
      });
    }, 900);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const workerY = STATION_Y[taskIdx];

  return (
    <div className="s05-scene s05-scene--legacy">
      <svg viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`} className="s05-scene__svg" aria-hidden="true">
        <VerticalConveyor />
        {TASKS.map((task, i) => (
          <Station key={task} y={STATION_Y[i]} label={task} lit={!incident && i === taskIdx} danger={incident} />
        ))}

        {incident ? (
          <motion.rect
            x={4}
            y={16}
            width={SCENE_WIDTH - 8}
            height={SCENE_HEIGHT - 24}
            rx={6}
            fill="rgba(185,28,28,0.08)"
            stroke="#fca5a5"
            strokeWidth={1.5}
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        ) : null}

        <AnimatePresence mode="wait">
          {!incident ? (
            <motion.g
              key="worker-active"
              initial={false}
              animate={{ y: workerY - STATION_Y[0] }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <WorkerFigure x={WORKER_X} y={STATION_Y[0] - 20} tone="legacy" active working label="단일 담당" />
              <motion.rect
                x={CONVEYOR_X - 1}
                y={STATION_Y[0] + 2}
                width={13}
                height={11}
                rx={1.5}
                fill="#f59e0b"
                stroke="#b45309"
                strokeWidth={0.7}
                animate={{ y: [STATION_Y[0] + 2, STATION_Y[0], STATION_Y[0] + 2] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.g>
          ) : (
            <motion.g key="worker-incident" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <WorkerFigure x={WORKER_X} y={workerY - 20} tone="legacy" injured label="장애" />
              <rect x={8} y={82} width={72} height={18} rx={9} fill="#b91c1c" />
              <text x={44} y={94} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">
                ⚠ 전체 라인 마비
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
      <div className={`s05-scene__status ${incident ? "is-danger" : ""}`}>
        {incident ? "단일 장애 → 전 공정 중단" : `단일 인력 전 공정 처리 (${TASKS[taskIdx]})`}
      </div>
    </div>
  );
}

export function Slide05MsaScene() {
  const reduceMotion = useReducedMotion();
  const [boxPos, setBoxPos] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setBoxPos((v) => (v + 1) % 4), 750);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setSwapping(true);
      window.setTimeout(() => setSwapping(false), 2200);
    }, 5200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="s05-scene s05-scene--msa">
      <svg viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`} className="s05-scene__svg" aria-hidden="true">
        <VerticalConveyor />
        {TASKS.map((task, i) => (
          <Station key={task} y={STATION_Y[i]} label={task} lit={boxPos === i && !(swapping && i === 2)} />
        ))}

        {TASKS.map((task, i) => {
          if (i === 2 && swapping) {
            return (
              <AnimatePresence key={task} mode="wait">
                <motion.g
                  key="swap-in"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <WorkerFigure x={WORKER_X} y={STATION_Y[i] - 20} tone="swap" active working />
                </motion.g>
              </AnimatePresence>
            );
          }

          return (
            <WorkerFigure
              key={task}
              x={WORKER_X}
              y={STATION_Y[i] - 20}
              tone="msa"
              active={boxPos === i}
              working={boxPos === i || i !== 2}
            />
          );
        })}

        <motion.g
          animate={{ y: STATION_Y[boxPos] - STATION_Y[0] }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          <Parcel y={STATION_Y[0]} />
        </motion.g>

        {swapping ? (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={LABEL_X - 4} y={STATION_Y[2] - 22} width={56} height={16} rx={8} fill="#10b981" />
            <text x={LABEL_X + 24} y={STATION_Y[2] - 11} textAnchor="middle" fontSize={9} fontWeight={800} fill="#fff">
              1:1 교체
            </text>
          </motion.g>
        ) : null}
      </svg>
      <div className={`s05-scene__status ${swapping ? "is-success" : ""}`}>
        {swapping ? "포장 모듈만 교체 — 나머지 무중단" : `전담 4인 · ${TASKS[boxPos]} 구간 운영`}
      </div>
    </div>
  );
}
