"use client";

import { motion, useReducedMotion } from "framer-motion";

import Slide18Phase3Visual from "@/components/slides/Slide18Phase3Visual";

type Milestone = {
  id: string;
  phase: string;
  phaseClass: string;
  periodStart: { y: string; m: string };
  periodEnd?: { y: string; m: string };
  title: string;
  desc: string;
  status: "done" | "now" | "next";
  statusLabel: string;
  span2?: boolean;
  current?: boolean;
};

const MILESTONES: Milestone[] = [
  {
    id: "p1",
    phase: "1단계",
    phaseClass: "p1",
    periodStart: { y: "26", m: "01" },
    periodEnd: { y: "26", m: "02" },
    title: "AS-IS 분석 · AI 에이전트 기반",
    desc: "시스템 아키텍처·비즈니스 프레임워크 분석, AI 모델·서브에이전트 구축",
    status: "done",
    statusLabel: "완료",
  },
  {
    id: "p2",
    phase: "2단계",
    phaseClass: "p2",
    periodStart: { y: "26", m: "03" },
    periodEnd: { y: "26", m: "05" },
    title: "TO-BE 모델 · 표준 프레임워크",
    desc: "요구사항 정의 및 차세대 표준 프레임워크 모델 정립",
    status: "done",
    statusLabel: "완료",
  },
  {
    id: "p3",
    phase: "3단계",
    phaseClass: "p3",
    periodStart: { y: "26", m: "05" },
    periodEnd: { y: "26", m: "09" },
    title: "공통 아키텍처 · 프레임워크 PoC",
    desc: "공통 아키텍처 설계 및 프레임워크 기술 타당성 검증(PoC) — 현재 스프린트를 애자일 방식으로 진행 중",
    status: "now",
    statusLabel: "진행 중",
    current: true,
  },
  {
    id: "p4",
    phase: "4단계",
    phaseClass: "p4",
    periodStart: { y: "26", m: "10" },
    periodEnd: { y: "27", m: "03" },
    title: "JTGS 프로토타입 개발",
    desc: "주요소관리시스템 프로토타입, 템플릿·스토리보드 완성",
    status: "next",
    statusLabel: "예정",
  },
  {
    id: "p5",
    phase: "5단계",
    phaseClass: "p5",
    periodStart: { y: "27", m: "04" },
    periodEnd: { y: "27", m: "06" },
    title: "시스템 안정화",
    desc: "프로토타입 운영 안정화 및 품질·성능 검증",
    status: "next",
    statusLabel: "예정",
  },
  {
    id: "p6",
    phase: "6단계",
    phaseClass: "p6",
    periodStart: { y: "27", m: "07" },
    periodEnd: { y: "27", m: "08" },
    title: "3PL · 유통물류 전환 준비",
    desc: "3PL/유통물류 전환 준비 및 현업 요구사항 반영",
    status: "next",
    statusLabel: "예정",
  },
  {
    id: "p7",
    phase: "7단계",
    phaseClass: "p7",
    periodStart: { y: "27", m: "09" },
    title: "3PL · 유통물류 본 전환",
    desc: "3PL 전환 및 유통물류 전환 본격 개발 — 차세대 FaSS 플랫폼 단계적 롤아웃 완료",
    status: "next",
    statusLabel: "예정",
    span2: true,
  },
];

function PeriodBadge({
  start,
  end,
  highlight,
}: {
  start: { y: string; m: string };
  end?: { y: string; m: string };
  highlight?: boolean;
}) {
  return (
    <span className={`period${highlight ? " period--active" : ""}`}>
      <span className="period-ym">
        <span className="period-y">{start.y}</span>
        <span className="period-dot">.</span>
        <span className="period-m">{start.m}</span>
      </span>
      {end ? (
        <>
          <span className="period-sep">~</span>
          <span className="period-ym period-end">
            <span className="period-y">{end.y}</span>
            <span className="period-dot">.</span>
            <span className="period-m">{end.m}</span>
          </span>
        </>
      ) : (
        <span className="period-sep">~</span>
      )}
    </span>
  );
}

function MilestoneCard({ item }: { item: Milestone }) {
  const reduceMotion = useReducedMotion();
  const isPhase3 = item.phaseClass === "p3" && item.current;
  const cardClass = [
    "milestone-card",
    item.phaseClass,
    item.current ? "current current--animated" : "",
    isPhase3 ? "current--3d" : "",
    item.span2 ? "span2" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const cardInner = (
    <>
      {item.current ? (
        <>
          <motion.span
            className="current-ring"
            aria-hidden="true"
            animate={reduceMotion ? undefined : { opacity: [0.35, 0.75, 0.35], scale: [1, 1.04, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="current-shimmer"
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: ["-120%", "120%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
          />
          {isPhase3 ? <span className="current-depth-shadow" aria-hidden="true" /> : null}
          {isPhase3 ? <Slide18Phase3Visual /> : null}
        </>
      ) : null}

      <div className="card-head">
        <div className="card-head-left">
          {item.current ? (
            <motion.span
              className="phase-badge phase-badge--live"
              animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              {item.phase}
            </motion.span>
          ) : (
            <span className="phase-badge">{item.phase}</span>
          )}
          {item.current ? (
            <motion.span
              className="current-pill"
              animate={reduceMotion ? undefined : { opacity: [1, 0.65, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="current-pill-dot" />
              NOW
            </motion.span>
          ) : null}
        </div>
        <PeriodBadge start={item.periodStart} end={item.periodEnd} highlight={item.current} />
      </div>

      <div className="card-title">{item.title}</div>
      <p className="card-desc">{item.desc}</p>
      <div className="card-foot">
        {item.current ? (
          <motion.span
            className={`status-tag status-${item.status}`}
            animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            {item.statusLabel}
          </motion.span>
        ) : (
          <span className={`status-tag status-${item.status}`}>{item.statusLabel}</span>
        )}
      </div>
    </>
  );

  if (item.current) {
    return (
      <motion.article
        className={cardClass}
        style={isPhase3 ? { transformStyle: "preserve-3d" } : undefined}
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={{
          opacity: 1,
          scale: reduceMotion ? 1 : isPhase3 ? [1, 1.03, 1] : [1, 1.02, 1],
          y: reduceMotion ? 0 : isPhase3 ? [0, -5, 0] : 0,
          rotateX: reduceMotion || !isPhase3 ? 0 : [2, -1.5, 2],
          rotateY: reduceMotion || !isPhase3 ? 0 : [-2.5, 2.5, -2.5],
          boxShadow: reduceMotion
            ? "0 0 0 2px rgba(202, 80, 16, 0.55), 0 6px 20px rgba(202, 80, 16, 0.22)"
            : isPhase3
              ? [
                  "0 0 0 2px rgba(202, 80, 16, 0.45), 0 8px 18px rgba(202, 80, 16, 0.2), 0 18px 36px rgba(138, 59, 0, 0.12)",
                  "0 0 0 3px rgba(202, 80, 16, 0.7), 0 14px 28px rgba(202, 80, 16, 0.32), 0 24px 48px rgba(138, 59, 0, 0.18)",
                  "0 0 0 2px rgba(202, 80, 16, 0.45), 0 8px 18px rgba(202, 80, 16, 0.2), 0 18px 36px rgba(138, 59, 0, 0.12)",
                ]
              : [
                  "0 0 0 2px rgba(202, 80, 16, 0.4), 0 4px 14px rgba(202, 80, 16, 0.16)",
                  "0 0 0 3px rgba(202, 80, 16, 0.65), 0 8px 24px rgba(202, 80, 16, 0.28)",
                  "0 0 0 2px rgba(202, 80, 16, 0.4), 0 4px 14px rgba(202, 80, 16, 0.16)",
                ],
        }}
        transition={{
          opacity: { duration: 0.45 },
          y: { duration: isPhase3 ? 3.2 : 0.45, repeat: isPhase3 && !reduceMotion ? Infinity : 0, ease: "easeInOut" },
          scale: { duration: isPhase3 ? 3.2 : 2.6, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" },
          rotateX: { duration: 4.5, repeat: reduceMotion || !isPhase3 ? 0 : Infinity, ease: "easeInOut" },
          rotateY: { duration: 5.2, repeat: reduceMotion || !isPhase3 ? 0 : Infinity, ease: "easeInOut" },
          boxShadow: { duration: 2.6, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" },
        }}
      >
        {cardInner}
      </motion.article>
    );
  }

  return <article className={cardClass}>{cardInner}</article>;
}

export default function Slide18MilestoneBoard() {
  return (
    <div className="content">
      <div className="milestone-grid milestone-grid--3d">
        {MILESTONES.map((item) => (
          <MilestoneCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
