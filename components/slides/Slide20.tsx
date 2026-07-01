"use client";

import type { CSSProperties, ReactNode } from "react";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide20.css";

const ANALYTICS_URL = "https://kk00701903-hub.github.io/fass-dailyscrum/#/analytics";

type Chip = { label: string; tone?: "blue" | "warn" | "good" };
type Metric = { label: string; value: string; href?: string; tone?: "blue" | "good" };

type WarRoomCard = {
  id: string;
  accent: string;
  icon: string;
  title: string;
  tag?: string;
  bullets: { icon: string; text: ReactNode }[];
  chips?: Chip[];
  metrics?: Metric[];
};

const KPI_STRIP = [
  { icon: "fa-location-dot", label: "남양주 1공장 2층 프로젝트룸", tone: "location" as const },
  { icon: "fa-stopwatch", label: "Wait Time 0s", tone: "blue" as const },
  { icon: "fa-bolt", label: "Real-time Decision", tone: "blue" as const },
  { icon: "fa-chart-line", label: "MTTR 70%+ 단축", tone: "good" as const },
];

const CARDS: WarRoomCard[] = [
  {
    id: "all-in-one",
    accent: "#0078d4",
    icon: "fa-users-rectangle",
    title: "일체형 조직 운영",
    tag: "All-in-One",
    bullets: [
      {
        icon: "fa-check",
        text: "단독 프로젝트 룸으로 커뮤니케이션 사일로(silo) 제거 — 기획·개발·QA가 한 공간에서 협업",
      },
      {
        icon: "fa-check",
        text: "이슈 발생 즉시 토론·의사결정 — 결재·대기 시간을 구조적으로 삭제",
      },
    ],
    chips: [{ label: "물리적 통합 완료" }, { label: "Agile 스프린트 최적화", tone: "good" }],
  },
  {
    id: "dashboard",
    accent: "#5c2d91",
    icon: "fa-desktop",
    title: "실시간 가시성 대시보드",
    tag: "Visibility",
    bullets: [
      {
        icon: "fa-chart-line",
        text: (
          <>
            <a href={ANALYTICS_URL} target="_blank" rel="noopener noreferrer" className="s20-link">
              FASS 데일리 스크럼 Analytics
            </a>
            로 일단위 업무·스프린트 진척도를 워룸 대형 화면에 공유
          </>
        ),
      },
      {
        icon: "fa-bug",
        text: "태스크 완료율·블로커·버그 지표 시각화 — 품질 리스크 상시 모니터링",
      },
    ],
    metrics: [
      { label: "Daily Scrum", value: "Analytics", href: ANALYTICS_URL, tone: "blue" },
      { label: "Sprint", value: "Progress", tone: "good" },
    ],
  },
  {
    id: "zero-latency",
    accent: "#ca5010",
    icon: "fa-bolt",
    title: "의사결정 리드타임 제로화",
    tag: "Zero Latency",
    bullets: [
      {
        icon: "fa-circle-arrow-right",
        text: "현장 즉결 처리 체계 — 프로젝트 지연 요소를 선제적으로 차단",
      },
      {
        icon: "fa-circle-arrow-right",
        text: "부서 간 업무 이관 단계 축소 — 개발 생산성 극대화",
      },
    ],
    metrics: [
      { label: "Wait Time", value: "0s", tone: "blue" },
      { label: "Decision", value: "Real-time", tone: "good" },
    ],
  },
  {
    id: "acceleration",
    accent: "#107c10",
    icon: "fa-gauge-high",
    title: "프로젝트 성공 속도 가속화",
    tag: "Acceleration",
    bullets: [
      {
        icon: "fa-shield-halved",
        text: "이슈 감지→해결 MTTR(평균 복구 시간) 70% 이상 단축",
      },
      {
        icon: "fa-shield-halved",
        text: "전 팀원이 동일 KPI를 실시간 인지 — 성과 중심 조직으로 변모",
      },
    ],
    chips: [
      { label: "핵심 KPI 연동", tone: "warn" },
      { label: "무결점 배포 보장", tone: "good" },
    ],
  },
];

function WarRoomCardView({ card }: { card: WarRoomCard }) {
  return (
    <article className="s20-card" style={{ "--s20-accent": card.accent } as CSSProperties}>
      <header className="s20-card__head">
        <span className="s20-card__icon" aria-hidden="true">
          <i className={`fas ${card.icon}`} />
        </span>
        <div className="s20-card__titles">
          {card.tag ? <span className="s20-card__tag">{card.tag}</span> : null}
          <h2 className="s20-card__title">{card.title}</h2>
        </div>
      </header>

      <ul className="s20-card__list">
        {card.bullets.map((bullet, i) => (
          <li key={i} className="s20-card__item">
            <i className={`fas ${bullet.icon} s20-card__bullet`} aria-hidden="true" />
            <span>{bullet.text}</span>
          </li>
        ))}
      </ul>

      {card.chips && card.chips.length > 0 ? (
        <footer className="s20-card__foot s20-card__foot--chips">
          {card.chips.map((chip) => (
            <span key={chip.label} className={`s20-chip s20-chip--${chip.tone ?? "blue"}`}>
              {chip.label}
            </span>
          ))}
        </footer>
      ) : null}

      {card.metrics && card.metrics.length > 0 ? (
        <footer className="s20-card__foot s20-card__foot--metrics">
          {card.metrics.map((metric) => {
            const cls = `s20-metric s20-metric--${metric.tone ?? "blue"}`;
            if (metric.href) {
              return (
                <a key={metric.label} className={cls} href={metric.href} target="_blank" rel="noopener noreferrer">
                  <span className="s20-metric__label">{metric.label}</span>
                  <span className="s20-metric__value">{metric.value}</span>
                </a>
              );
            }
            return (
              <div key={metric.label} className={cls}>
                <span className="s20-metric__label">{metric.label}</span>
                <span className="s20-metric__value">{metric.value}</span>
              </div>
            );
          })}
        </footer>
      ) : null}
    </article>
  );
}

export default function Slide20() {
  return (
    <SlideCanvas slideId={20} motion="cards" motionTier="medium">
      <div className="s20-root">
        <header className="s20-head">
          <div className="s20-head__row">
            <div className="s20-head__bar" />
            <div>
              <h1 className="s20-head__title">최적화 방안 2. 애자일 워룸 운영</h1>
              <p className="s20-head__sub">
                물리적 워룸 + 실시간 데이터 허브로 <strong>의사결정·배포 속도</strong>를 동시에 끌어올립니다
              </p>
            </div>
          </div>
          <div className="s20-head__line" />
        </header>

        <div className="s20-kpi-strip" aria-label="워룸 핵심 지표">
          {KPI_STRIP.map((kpi) => (
            <span key={kpi.label} className={`s20-kpi s20-kpi--${kpi.tone}`}>
              <i className={`fas ${kpi.icon}`} aria-hidden="true" />
              {kpi.label}
            </span>
          ))}
        </div>

        <div className="s20-grid">
          {CARDS.map((card) => (
            <WarRoomCardView key={card.id} card={card} />
          ))}
        </div>

        <footer className="s20-hub">
          <span className="s20-hub__icon" aria-hidden="true">
            <i className="fas fa-clipboard-list" />
          </span>
          <div className="s20-hub__copy">
            <strong>FASS 데일리 스크럼 — TFT 애자일 운영 허브</strong>
            <p>일일 스크럼·태스크·스프린트 데이터를 기록하고 Analytics로 진척·블로커·완료율을 공유합니다.</p>
          </div>
          <a className="s20-hub__cta" href={ANALYTICS_URL} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-chart-line" aria-hidden="true" /> Analytics 열기
          </a>
        </footer>
      </div>
    </SlideCanvas>
  );
}
