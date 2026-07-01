"use client";

import type { ReactNode } from "react";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide20.css";

const ANALYTICS_URL = "https://kk00701903-hub.github.io/fass-dailyscrum/#/analytics";

type Badge = { text: string; variant?: "default" | "warn" | "good" };
type DashboardBox = { label: string; value: string; href?: string; accent?: "blue" | "good" };
type Bullet = { text: ReactNode; icon?: string };

type WarRoomCard = {
  id: string;
  icon: string;
  title: string;
  location?: string;
  bullets: Bullet[];
  badges?: Badge[];
  dashboard?: DashboardBox[];
};

const WAR_ROOM_CARDS: { left: WarRoomCard[]; right: WarRoomCard[] } = {
  left: [
    {
      id: "all-in-one",
      icon: "fa-users-rectangle",
      title: "일체형 조직 운영 (All-in-One)",
      location: "남양주 1공장 2층 프로젝트룸",
      bullets: [
        { text: "단독 프로젝트 룸 운영을 통한 커뮤니케이션 사일로(silo) 제거", icon: "fa-check" },
        {
          text: "이슈 발생 시 그 자리에서 즉시 토론하고 의사결정하여 '결재 및 대기 시간'을 완벽하게 삭제",
          icon: "fa-check",
        },
      ],
      badges: [{ text: "물리적 통합 완료" }, { text: "Agile 스프린트 최적화" }],
    },
    {
      id: "zero-latency",
      icon: "fa-bolt",
      title: "의사결정 리드타임 제로화",
      bullets: [
        { text: "현장 즉결 처리 체계 도입으로 프로젝트 지연 요소 선제적 차단", icon: "fa-circle-arrow-right" },
        { text: "부서 간 업무 이관 단계 축소를 통한 개발 생산성 극대화", icon: "fa-circle-arrow-right" },
      ],
      dashboard: [
        { label: "Wait Time", value: "0s" },
        { label: "Decision Speed", value: "Real-time" },
      ],
    },
  ],
  right: [
    {
      id: "dashboard",
      icon: "fa-desktop",
      title: "실시간 가시성 대시보드",
      bullets: [
        {
          text: (
            <>
              <a href={ANALYTICS_URL} target="_blank" rel="noopener noreferrer" className="s20-link">
                FASS 데일리 스크럼 Analytics
              </a>
              으로 일단위 업무·스프린트 진척도를 점검하고 워룸에서 공유
            </>
          ),
          icon: "fa-chart-line",
        },
        { text: "태스크 완료율·블로커·버그 지표 시각화로 품질 리스크 상시 모니터링", icon: "fa-bug" },
      ],
      dashboard: [
        { label: "Daily Scrum", value: "Analytics", href: ANALYTICS_URL, accent: "blue" },
        { label: "Sprint", value: "Progress", accent: "good" },
      ],
    },
    {
      id: "acceleration",
      icon: "fa-gauge-high",
      title: "프로젝트 성공 속도 가속화",
      bullets: [
        { text: "이슈 감지부터 해결까지의 MTTR(평균 복구 시간) 70% 이상 단축", icon: "fa-shield-halved" },
        { text: "전 팀원이 동일한 목표 지표를 실시간으로 인지하여 성과 중심 조직으로 변모", icon: "fa-shield-halved" },
      ],
      badges: [
        { text: "핵심 성과 지표(KPI) 연동", variant: "warn" },
        { text: "무결점 배포 보장", variant: "good" },
      ],
    },
  ],
};

function FeatureCard({ card }: { card: WarRoomCard }) {
  return (
    <article className="war-room-feature-card">
      <div className="war-room-card-header">
        <div className="war-room-card-icon">
          <i className={`fas ${card.icon}`} aria-hidden="true" />
        </div>
        <h2 className="war-room-card-title">{card.title}</h2>
      </div>

      <div className="war-room-card-body">
        {card.location ? (
          <span className="war-room-location-tag">
            <i className="fas fa-location-dot" aria-hidden="true" /> {card.location}
          </span>
        ) : null}
        {card.bullets.map((bullet, i) => (
          <div key={i} className="war-room-highlight-item">
            <i className={`fas ${bullet.icon ?? "fa-check"} war-room-highlight-bullet`} aria-hidden="true" />
            <span>{bullet.text}</span>
          </div>
        ))}
      </div>

      {card.badges && card.badges.length > 0 ? (
        <div className="war-room-badge-container">
          {card.badges.map((badge) => (
            <span
              key={badge.text}
              className={`war-room-status-badge${badge.variant ? ` war-room-status-badge--${badge.variant}` : ""}`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      ) : null}

      {card.dashboard && card.dashboard.length > 0 ? (
        <div className="war-room-dashboard-preview">
          {card.dashboard.map((box) => {
            const cls = `war-room-dashboard-box war-room-dashboard-box--${box.accent ?? "blue"}`;
            if (box.href) {
              return (
                <a key={box.label} className={cls} href={box.href} target="_blank" rel="noopener noreferrer">
                  <span className="war-room-dashboard-label">{box.label}</span>
                  <span className="war-room-dashboard-value">{box.value}</span>
                </a>
              );
            }
            return (
              <div key={box.label} className={cls}>
                <span className="war-room-dashboard-label">{box.label}</span>
                <span className="war-room-dashboard-value">{box.value}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </article>
  );
}

export default function Slide20() {
  return (
    <SlideCanvas slideId={20} motion="cards" motionTier="medium">
      <div className="war-room-slide-root fluent-slide">
        <header className="title-region-container">
          <div className="title-region-header">
            <div className="title-region-bar" />
            <h1 className="title-region-text">최적화 방안 2. 애자일 워룸 운영</h1>
          </div>
          <div className="title-region-line" />
        </header>

        <div className="war-room-content-wrapper">
          <div className="war-room-left-column">
            {WAR_ROOM_CARDS.left.map((card) => (
              <FeatureCard key={card.id} card={card} />
            ))}
          </div>
          <div className="war-room-right-column">
            {WAR_ROOM_CARDS.right.map((card) => (
              <FeatureCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        <div className="war-room-dailyscrum-banner">
          <div className="war-room-dailyscrum-icon">
            <i className="fas fa-clipboard-list" aria-hidden="true" />
          </div>
          <div className="war-room-dailyscrum-body">
            <div className="war-room-dailyscrum-title">FASS 데일리 스크럼 — TFT 애자일 운영 허브</div>
            <p className="war-room-dailyscrum-desc">
              일일 스크럼·태스크·스프린트 데이터를 기록하고 Analytics로 진척·블로커·완료율을 워룸 대형 화면에
              공유합니다.
            </p>
          </div>
          <a className="war-room-dailyscrum-link" href={ANALYTICS_URL} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-chart-line" aria-hidden="true" /> Analytics
          </a>
        </div>
      </div>
    </SlideCanvas>
  );
}
