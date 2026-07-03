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
            계획 대비 정상 진행
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
                strokeWidth="4"
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
            <strong>{p.elapsedDays}일</strong>
            <span className="s17-progress__hero-elapsed">경과</span>
            <span className="s17-progress__hero-total">전체 {p.totalDays}일 중</span>
          </div>
        </motion.div>

        <div className="s17-progress__timeline">
          <div className="s17-progress__axis">
            <span className="s17-progress__axis-start">
              <i className="fas fa-flag-checkered" aria-hidden="true" />
              착수 {p.startLabel}
            </span>
            <span className="s17-progress__axis-end">
              라이브 {p.liveLabel}
              <i className="fas fa-flag" aria-hidden="true" />
            </span>
          </div>

          <div className="s17-progress__track">
            <div className="s17-progress__track-rail" aria-hidden="true" />
            <div
              className="s17-progress__planned"
              style={{ left: `${p.percent}%`, width: `${100 - p.percent}%` }}
              aria-hidden="true"
            />
            <motion.div
              className="s17-progress__fill"
              initial={{ width: 0 }}
              animate={{ width: `${p.percent}%` }}
              transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />

            <div
              className="s17-progress__marker s17-progress__marker--today"
              style={{ left: `${p.percent}%` }}
            >
              <span className="s17-progress__marker-label">현재</span>
              <span className="s17-progress__marker-pin">
                <i className="fas fa-location-dot" aria-hidden="true" />
              </span>
              <span className="s17-progress__marker-date">{p.asOfLabel}</span>
            </div>

            <div
              className="s17-progress__marker s17-progress__marker--proto"
              style={{ left: `${p.prototypePercent}%` }}
            >
              <span className="s17-progress__marker-label">프로토타입</span>
              <span className="s17-progress__marker-pin">
                <i className="fas fa-flask" aria-hidden="true" />
              </span>
              <span className="s17-progress__marker-date">{p.prototypeLabel}</span>
            </div>

            <div className="s17-progress__marker s17-progress__marker--live" style={{ left: "100%" }}>
              <span className="s17-progress__marker-label">라이브</span>
              <span className="s17-progress__marker-pin">
                <i className="fas fa-rocket" aria-hidden="true" />
              </span>
              <span className="s17-progress__marker-date">{p.liveLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="s17-progress__stats">
        <div className="s17-progress__stat">
          <span className="s17-progress__stat-label">본격 착수</span>
          <strong>{p.startLabel}</strong>
        </div>
        <div className="s17-progress__stat s17-progress__stat--accent">
          <span className="s17-progress__stat-label">현재 진척 ({p.asOfLabel})</span>
          <strong>
            {p.percent}% <em>({p.elapsedDays}일 경과)</em>
          </strong>
        </div>
        <div className="s17-progress__stat s17-progress__stat--proto">
          <span className="s17-progress__stat-label">프로토타입 예정</span>
          <strong>
            {p.prototypeLabel} <em>(D-{p.daysToPrototype})</em>
          </strong>
        </div>
        <div className="s17-progress__stat s17-progress__stat--live">
          <span className="s17-progress__stat-label">라이브 예정</span>
          <strong>
            {p.liveLabel} <em>(D-{p.daysToLive})</em>
          </strong>
        </div>
      </div>
    </section>
  );
}
