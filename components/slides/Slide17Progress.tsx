"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SLIDE17_PROGRESS } from "@/lib/slide17Progress";

const RING_R = 18;
const RING_C = 2 * Math.PI * RING_R;

export default function Slide17Progress() {
  const reduceMotion = useReducedMotion();
  const p = SLIDE17_PROGRESS;

  return (
    <section className="s17-progress" aria-label="프로젝트 일정 진척률">
      <div className="s17-progress__header">
        <div className="s17-progress__title-block">
          <span className="s17-progress__icon" aria-hidden="true">
            <i className="fas fa-chart-line" />
          </span>
          <div>
            <div className="s17-progress__title">일정 진척률</div>
            <div className="s17-progress__subtitle">전체 로드맵 대비 시간 경과</div>
          </div>
        </div>
        <div className="s17-progress__meta">
          <span className="s17-progress__ontrack">
            <i className="fas fa-circle-check" aria-hidden="true" />
            계획 대비 동일 속도
          </span>
          <span className="s17-progress__asof">기준일 {p.asOfLabel}</span>
        </div>
      </div>

      <div className="s17-progress__body">
        <motion.div
          className="s17-progress__hero"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="s17-progress__ring" aria-hidden="true">
            <svg viewBox="0 0 44 44">
              <circle className="s17-progress__ring-bg" cx="22" cy="22" r={RING_R} />
              <motion.circle
                className="s17-progress__ring-fill"
                cx="22"
                cy="22"
                r={RING_R}
                fill="none"
                stroke="#0078d4"
                strokeWidth="3.5"
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
                strokeDasharray={RING_C}
                initial={{ strokeDashoffset: RING_C }}
                animate={{ strokeDashoffset: RING_C * (1 - p.percent / 100) }}
                transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              />
            </svg>
            <div className="s17-progress__pct">
              {p.percent}
              <span>%</span>
            </div>
          </div>
          <div className="s17-progress__hero-copy">
            <strong>{p.elapsedDays}일</strong> 경과
            <span>
              전체 {p.totalDays}일 중
            </span>
          </div>
        </motion.div>

        <div className="s17-progress__timeline">
          <div className="s17-progress__axis">
            <span className="s17-progress__axis-start">
              <i className="fas fa-flag-checkered" aria-hidden="true" />
              {p.startLabel}
            </span>
            <span className="s17-progress__axis-end">{p.endLabel}</span>
          </div>

          <div className="s17-progress__track">
            <motion.div
              className="s17-progress__fill"
              initial={{ width: 0 }}
              animate={{ width: `${p.percent}%` }}
              transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
            <div
              className="s17-progress__marker s17-progress__marker--proto"
              style={{ left: `${p.prototypePercent}%` }}
            >
              <span className="s17-progress__marker-pin">
                <i className="fas fa-flask" aria-hidden="true" />
              </span>
              <span className="s17-progress__marker-label">프로토타입</span>
              <span className="s17-progress__marker-date">{p.prototypeLabel}</span>
            </div>
            <div className="s17-progress__marker s17-progress__marker--today" style={{ left: `${p.percent}%` }}>
              <span className="s17-progress__marker-pin">
                <i className="fas fa-location-dot" aria-hidden="true" />
              </span>
              <span className="s17-progress__marker-label">현재</span>
              <span className="s17-progress__marker-date">{p.asOfLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="s17-progress__stats">
        <div className="s17-progress__stat">
          <span className="s17-progress__stat-label">착수</span>
          <strong>{p.startLabel}</strong>
        </div>
        <div className="s17-progress__stat s17-progress__stat--good">
          <span className="s17-progress__stat-label">프로토타입 구간</span>
          <strong>
            100% 완료 <em>({p.prototypeDays}일)</em>
          </strong>
        </div>
        <div className="s17-progress__stat">
          <span className="s17-progress__stat-label">경과 / 전체</span>
          <strong>
            {p.elapsedDays}일 / {p.totalDays}일
          </strong>
        </div>
        <div className="s17-progress__stat s17-progress__stat--accent">
          <span className="s17-progress__stat-label">계획 대비</span>
          <strong>동일 {p.percent}% 진행</strong>
        </div>
      </div>
    </section>
  );
}
