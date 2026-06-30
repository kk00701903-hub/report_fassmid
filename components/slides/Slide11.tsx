"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide11.css";

const PILLARS = [
  {
    id: "schedule",
    tone: "cyan" as const,
    icon: "fa-user-clock",
    title: "출퇴근하는 AI 에이전트",
    en: "AI Agent Work Schedule",
    items: [
      {
        icon: "fa-sun",
        title: "09:00 출근 — 태스크 자동 할당",
        desc: "수요예측·문서처리·재고분석 등 업무 즉시 시작",
      },
      {
        icon: "fa-moon",
        title: "18:00 퇴근 — 결과 리포트 생성",
        desc: "처리 결과·이상·미결 항목 정리 후 유휴 전환",
      },
      {
        icon: "fa-sitemap",
        title: "팀·부서 단위 조직 편성",
        desc: "물류·정산·고객지원 AI를 사람 조직과 동일 구조로 배치",
      },
    ],
  },
  {
    id: "hire",
    tone: "amber" as const,
    icon: "fa-copy",
    title: '"채용"은 스크립트 복사',
    en: "Hire = Duplicate Script",
    items: [
      {
        icon: "fa-user-plus",
        title: "채용 = 검증된 스크립트 복사",
        desc: "복제 즉시 투입 — 온보딩 0일",
      },
      {
        icon: "fa-chart-bar",
        title: "KPI 기반 성과 평가",
        desc: "처리량·정확도·오류율로 사람과 동일하게 평가",
      },
      {
        icon: "fa-trash-alt",
        title: "저성과 버전 교체 (= 해고)",
        desc: "성과 미달 시 고도화 신버전으로 즉시 교체",
      },
    ],
  },
  {
    id: "control",
    tone: "green" as const,
    icon: "fa-desktop",
    title: "IT 부서 = AI 워커 관제 센터",
    en: "IT Dept. as AI Control Tower",
    items: [
      {
        icon: "fa-tachometer-alt",
        title: "실시간 모니터링 대시보드",
        desc: "전 에이전트 업무 상태를 Grafana에서 실시간 관제",
      },
      {
        icon: "fa-exclamation-triangle",
        title: "이상 감지 → 알림·인터벤션",
        desc: "응답 지연·오판 시 즉시 알림, 담당자 개입",
      },
      {
        icon: "fa-shield-alt",
        title: "AI 거버넌스 · 감사 로그",
        desc: "처리 이력 보존 — 책임 추적·규정 준수",
      },
    ],
  },
] as const;

const GLOBAL_TAGS = ["Microsoft", "Salesforce", "ServiceNow"] as const;

export default function Slide11() {
  return (
    <SlideCanvas slideId={11} motion="cards" motionTier="medium">
      <div className="dw-slide fluent-slide">
        <div className="title-region">
          <div className="title-header">
            <div className="title-bar" />
            <span className="title-badge">FUTURE VISION</span>
            <h1 className="title-text">디지털 트렌드 — AI 디지털 워커 (AI Digital Worker)</h1>
          </div>
          <p className="title-sub">
            출근·업무·퇴근하는 &apos;디지털 직원&apos; — AI가 조직의 일원으로 편성되는 시대
          </p>
          <div className="title-line" />
        </div>

        <div className="main-container">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className={`pillar-card ${pillar.tone}`}>
              <div className="pillar-icon-row">
                <div className={`pillar-icon-box ${pillar.tone}`}>
                  <i className={`fas ${pillar.icon}`} aria-hidden="true" />
                </div>
                <div className="pillar-heading">
                  <div className="pillar-title">{pillar.title}</div>
                  <div className="pillar-en">{pillar.en}</div>
                </div>
              </div>
              <div className="pillar-divider" />
              <div className="pillar-items">
                {pillar.items.map((item) => (
                  <div key={item.title} className="pillar-item">
                    <i className={`fas ${item.icon} pillar-item-icon ${pillar.tone}`} aria-hidden="true" />
                    <div className="pillar-item-text">
                      <div className="pillar-item-title">{item.title}</div>
                      <div className="pillar-item-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-banner">
          <div className="banner-icon">
            <i className="fas fa-globe" aria-hidden="true" />
          </div>
          <p className="banner-text">
            <strong>글로벌 선제 움직임:</strong>{" "}
            Microsoft·Salesforce·ServiceNow 등이 <strong>&apos;AI 디지털 워커 조직&apos;</strong>을 핵심 전략으로
            채택 — (주)제때 IT도 <strong>AI 관제 조직</strong>으로 진화합니다.
          </p>
          <div className="banner-logos">
            {GLOBAL_TAGS.map((tag) => (
              <span key={tag} className="global-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
