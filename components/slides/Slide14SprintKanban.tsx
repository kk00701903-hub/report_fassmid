"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  SPRINT_BOARD_STATS,
  SPRINT_PHASES,
  type SprintItem,
  type SprintStatus,
} from "@/components/slides/sprintBoardData";

const STATUS_LABEL: Record<SprintStatus, string> = {
  closed: "종료",
  future: "예정",
  active: "진행중",
};

const STATUS_ICON: Record<SprintStatus, string> = {
  closed: "fa-check",
  future: "fa-clock",
  active: "fa-circle",
};

function SprintStatusBadge({ status }: { status: SprintStatus }) {
  return (
    <span className={`s14-kanban__badge s14-kanban__badge--${status}`}>
      <i className={`fas ${STATUS_ICON[status]}`} aria-hidden="true" />
      {STATUS_LABEL[status]}
    </span>
  );
}

function SprintCard({ sprint, activeIndex }: { sprint: SprintItem; activeIndex?: number }) {
  const reduceMotion = useReducedMotion();
  const isActive = sprint.status === "active";
  const delay = (activeIndex ?? 0) * 0.22;

  const cardInner = (
    <>
      {isActive ? <span className="s14-kanban__card-glow" aria-hidden="true" /> : null}
      {isActive ? <span className="s14-kanban__card-border" aria-hidden="true" /> : null}
      <span className="s14-kanban__card-id">{sprint.id}</span>
      <div className="s14-kanban__card-body">
        <div className="s14-kanban__card-title">{sprint.title}</div>
        <div className="s14-kanban__card-meta">
          {sprint.tag ? <span className="s14-kanban__card-tag">{sprint.tag}</span> : null}
          <SprintStatusBadge status={sprint.status} />
        </div>
      </div>
    </>
  );

  if (isActive) {
    return (
      <motion.article
        className={`s14-kanban__card s14-kanban__card--active s14-kanban__card--${sprint.status}`}
        style={{ "--s14-active-delay": `${delay}s` } as CSSProperties}
        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
        animate={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : {
                opacity: 1,
                y: 0,
                scale: [1, 1.015, 1],
                boxShadow: [
                  "0 0 0 1px rgba(11,106,11,0.28), 0 2px 10px rgba(11,106,11,0.12)",
                  "0 0 0 2px rgba(34,197,94,0.55), 0 0 18px rgba(34,197,94,0.28)",
                  "0 0 0 1px rgba(11,106,11,0.28), 0 2px 10px rgba(11,106,11,0.12)",
                ],
              }
        }
        transition={{
          opacity: { duration: 0.35, delay },
          y: { duration: 0.35, delay },
          scale: { duration: 2.6, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut", delay },
          boxShadow: { duration: 2.6, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut", delay },
        }}
      >
        {cardInner}
      </motion.article>
    );
  }

  return (
    <article className={`s14-kanban__card s14-kanban__card--${sprint.status}`}>{cardInner}</article>
  );
}

export default function Slide14SprintKanban() {
  let activeCounter = 0;

  return (
    <div className="sprint-board-slide">
      <header className="title-r">
        <div className="title-row">
          <div className="bar" />
          <span className="badge">
            <span className="pulse" />
            LIVE · 동시 진행
          </span>
          <h1>스프린트 운영현황</h1>
        </div>
        <p className="sub">
          FaSS Platform v3.0 — {SPRINT_BOARD_STATS.total}개 Mega-Sprint · ACTIVE{" "}
          {SPRINT_BOARD_STATS.active} · 종료 {SPRINT_BOARD_STATS.closed} · 예정{" "}
          {SPRINT_BOARD_STATS.future}
        </p>
        <div className="line" />
      </header>

      <section className="s14-kanban__summary" aria-label="스프린트 현황 요약">
        <div className="s14-kanban__stat s14-kanban__stat--total">
          <span className="s14-kanban__stat-val">{SPRINT_BOARD_STATS.total}</span>
          <span className="s14-kanban__stat-lbl">TOTAL</span>
        </div>
        <div className="s14-kanban__stat s14-kanban__stat--active">
          <span className="s14-kanban__stat-val">{SPRINT_BOARD_STATS.active}</span>
          <span className="s14-kanban__stat-lbl">ACTIVE</span>
        </div>
        <div className="s14-kanban__stat s14-kanban__stat--closed">
          <span className="s14-kanban__stat-val">{SPRINT_BOARD_STATS.closed}</span>
          <span className="s14-kanban__stat-lbl">CLOSED</span>
        </div>
        <div className="s14-kanban__stat s14-kanban__stat--future">
          <span className="s14-kanban__stat-val">{SPRINT_BOARD_STATS.future}</span>
          <span className="s14-kanban__stat-lbl">FUTURE</span>
        </div>
      </section>

      <p className="s14-kanban__desc">
        스프린트 백로그 기준 <strong>실제 운영 현황</strong> · S01·S08 <strong>종료</strong> · S23
        리포트 Tool 추가
      </p>

      <div className="s14-kanban__board">
        {SPRINT_PHASES.map((phase) => (
          <section key={phase.id} className={`s14-kanban__col s14-kanban__col--${phase.phaseKey}`}>
            <header className="s14-kanban__col-head">
              <div className="s14-kanban__col-num">{phase.phaseNum}</div>
              <div className="s14-kanban__col-name">{phase.phaseName}</div>
              <div className="s14-kanban__col-count">{phase.sprints.length} Sprints</div>
            </header>
            <div className="s14-kanban__col-list">
              {phase.sprints.map((sprint) => {
                const activeIndex =
                  sprint.status === "active" ? activeCounter++ : undefined;
                return (
                  <SprintCard key={sprint.id} sprint={sprint} activeIndex={activeIndex} />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <footer className="footer">
        <strong>현황 기준:</strong> 별첨 스프린트 백로그 반영 — <strong>S01·S08 종료</strong>, ACTIVE
        9건 (일반 6 + 대규모 S18~S20·S23), FUTURE 8건 예정
      </footer>
    </div>
  );
}
