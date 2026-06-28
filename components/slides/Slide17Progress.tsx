"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SLIDE17_PROGRESS } from "@/lib/slide17Progress";

export default function Slide17Progress() {
  const reduceMotion = useReducedMotion();
  const p = SLIDE17_PROGRESS;

  return (
    <section className="s17-progress" aria-label="프로젝트 일정 진척률">
      <div className="s17-progress-head">
        <div className="s17-progress-title">
          <i className="fas fa-chart-line" />
          <span>일정 진척률</span>
          <span className="s17-progress-ontrack">계획 대비 동일 속도 진행</span>
        </div>
        <span className="s17-progress-asof">기준일 {p.asOfLabel}</span>
      </div>

      <div className="s17-progress-body">
        <motion.div
          className="s17-progress-pct"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {p.percent}
          <span>%</span>
        </motion.div>

        <div className="s17-progress-track-wrap">
          <div className="s17-progress-track">
            <motion.div
              className="s17-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${p.percent}%` }}
              transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
            <div
              className="s17-progress-marker s17-progress-marker--proto"
              style={{ left: `${p.prototypePercent}%` }}
              title={`프로토타입 ${p.prototypeLabel}`}
            >
              <span className="s17-marker-dot" />
              <span className="s17-marker-label">프로토타입</span>
            </div>
            <div className="s17-progress-marker s17-progress-marker--today" style={{ left: `${p.percent}%` }}>
              <span className="s17-marker-dot" />
              <span className="s17-marker-label">현재</span>
            </div>
          </div>
          <div className="s17-progress-axis">
            <span>{p.endLabel}</span>
          </div>
        </div>
      </div>

      <p className="s17-progress-desc">
        착수 <strong>{p.startLabel}</strong> → 프로토타입 <strong>{p.prototypeLabel}</strong> (
        <strong>{p.prototypeDays}일</strong>) 구간 <strong>100% 완료</strong> · 전체{" "}
        <strong>{p.totalDays}일</strong> 일정 중 <strong>{p.elapsedDays}일</strong> 경과 (
        <strong>{p.percent}%</strong>) — 계획 진척률과 <strong>동일한 %</strong>로 순조롭게 진행 중
      </p>
    </section>
  );
}
