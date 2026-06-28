"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const TASKS = ["입고", "분류", "포장", "출고"] as const;
const STATION_X = [36, 88, 140, 192];

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
  y = 28,
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
      {active && !injured ? <circle cx={0} cy={-18} r={14} fill="rgba(0,120,212,0.15)" /> : null}
      <circle cx={0} cy={-10} r={7} fill={skin} stroke="#334155" strokeWidth={1} />
      <rect x={-8} y={-2} width={16} height={18} rx={3} fill={shirt} stroke="#334155" strokeWidth={0.8} />
      <motion.line
        x1={-8}
        y1={4}
        x2={-14}
        y2={12}
        stroke="#334155"
        strokeWidth={2}
        strokeLinecap="round"
        animate={working && !injured ? { rotate: [0, -18, 0] } : undefined}
        style={{ transformOrigin: "-8px 4px" }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
      <motion.line
        x1={8}
        y1={4}
        x2={14}
        y2={12}
        stroke="#334155"
        strokeWidth={2}
        strokeLinecap="round"
        animate={working && !injured ? { rotate: [0, 18, 0] } : undefined}
        style={{ transformOrigin: "8px 4px" }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
      />
      <line x1={-5} y1={16} x2={-6} y2={28} stroke="#334155" strokeWidth={2} strokeLinecap="round" />
      <line x1={5} y1={16} x2={6} y2={28} stroke="#334155" strokeWidth={2} strokeLinecap="round" />
      {label ? (
        <text x={0} y={38} textAnchor="middle" fontSize={8} fontWeight={700} fill={injured ? "#991b1b" : "#334155"}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Station({ x, label, lit, danger }: { x: number; label: string; lit?: boolean; danger?: boolean }) {
  return (
    <g transform={`translate(${x}, 72)`}>
      <rect
        x={-22}
        y={0}
        width={44}
        height={22}
        rx={3}
        fill={danger ? "rgba(185,28,28,0.15)" : lit ? "rgba(0,120,212,0.12)" : "#f1f5f9"}
        stroke={danger ? "#b91c1c" : lit ? "#0078d4" : "#cbd5e1"}
        strokeWidth={lit || danger ? 1.5 : 1}
      />
      <text x={0} y={14} textAnchor="middle" fontSize={9} fontWeight={700} fill={danger ? "#991b1b" : "#334155"}>
        {label}
      </text>
    </g>
  );
}

function Conveyor({ y = 58 }: { y?: number }) {
  return (
    <>
      <rect x={16} y={y} width={208} height={8} rx={2} fill="#64748b" opacity={0.35} />
      <motion.line
        x1={16}
        y1={y + 4}
        x2={224}
        y2={y + 4}
        stroke="#475569"
        strokeWidth={2}
        strokeDasharray="8 6"
        animate={{ strokeDashoffset: [0, -28] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
}

function Parcel({ y = 50 }: { y?: number }) {
  return (
    <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 0.7, repeat: Infinity }}>
      <rect x={-8} y={y} width={16} height={12} rx={2} fill="#f59e0b" stroke="#b45309" strokeWidth={0.8} />
      <line x1={-8} y1={y + 4} x2={8} y2={y + 4} stroke="#b45309" strokeWidth={0.6} opacity={0.6} />
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

  const workerX = STATION_X[taskIdx];

  return (
    <div className="s05-scene s05-scene--legacy">
      <svg viewBox="0 0 228 108" className="s05-scene__svg" aria-hidden="true">
        <Conveyor y={56} />
        {TASKS.map((task, i) => (
          <Station key={task} x={STATION_X[i]} label={task} lit={!incident && i === taskIdx} danger={incident} />
        ))}

        <AnimatePresence mode="wait">
          {!incident ? (
            <motion.g
              key="worker-active"
              initial={false}
              animate={{ x: workerX }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <WorkerFigure x={0} tone="legacy" active working label="단일 담당" />
              <motion.rect
                x={-7}
                y={46}
                width={14}
                height={10}
                rx={1.5}
                fill="#f59e0b"
                stroke="#b45309"
                strokeWidth={0.7}
                animate={{ y: [46, 44, 46] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.g>
          ) : (
            <motion.g key="worker-incident" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <WorkerFigure x={workerX} tone="legacy" injured label="장애 발생" />
              <text x={114} y={22} textAnchor="middle" fontSize={11} fontWeight={800} fill="#b91c1c">
                ⚠ 전체 라인 마비
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {incident ? (
          <motion.rect
            x={8}
            y={8}
            width={212}
            height={92}
            rx={6}
            fill="rgba(185,28,28,0.08)"
            stroke="#fca5a5"
            strokeWidth={1.5}
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        ) : null}
      </svg>
      <div className={`s05-scene__status ${incident ? "is-danger" : ""}`}>
        {incident ? "단일 장애 → 입고·분류·포장·출고 전 공정 중단" : `단일 인력이 전 공정 일괄 처리 중 (${TASKS[taskIdx]} 포함)`}
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
      <svg viewBox="0 0 228 108" className="s05-scene__svg" aria-hidden="true">
        <Conveyor />
        {TASKS.map((task, i) => (
          <Station key={task} x={STATION_X[i]} label={task} lit={boxPos === i && !(swapping && i === 2)} />
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
                  <WorkerFigure x={STATION_X[i]} tone="swap" active working label="대체 배치" />
                </motion.g>
              </AnimatePresence>
            );
          }

          return (
            <WorkerFigure
              key={task}
              x={STATION_X[i]}
              tone="msa"
              active={boxPos === i}
              working={boxPos === i || i !== 2}
              label={task}
            />
          );
        })}

        <motion.g
          animate={{ x: STATION_X[boxPos] }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          <Parcel />
        </motion.g>

        {swapping ? (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={118} y={6} width={52} height={16} rx={8} fill="#10b981" />
            <text x={144} y={17} textAnchor="middle" fontSize={8} fontWeight={800} fill="#fff">
              1:1 교체
            </text>
          </motion.g>
        ) : (
          <text x={114} y={102} textAnchor="middle" fontSize={8} fill="#10b981" fontWeight={700}>
            나머지 라인 100% 정상 가동
          </text>
        )}
      </svg>
      <div className={`s05-scene__status ${swapping ? "is-success" : ""}`}>
        {swapping
          ? "포장 모듈만 교체·배포 — 입고·분류·출고는 무중단 가동"
          : `전담 인력 4명 · ${TASKS[boxPos]} 구간 병렬 운영 중`}
      </div>
    </div>
  );
}
