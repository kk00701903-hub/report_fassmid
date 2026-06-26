"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide10.css";

const SLIDE_HTML = `<div class="slide fluent-slide">
  <!-- Title -->
  <div class="title-region">
    <div class="title-header">
      <div class="title-bar"></div>
      <span class="title-badge">FUTURE VISION</span>
      <h1 class="title-text">디지털 트렌드 — AI 디지털 워커 (AI Digital Worker)</h1>
    </div>
  <div class="title-sub">출근·업무·퇴근하는 '디지털 직원' — AI가 조직의 일원으로 편성되는 시대</div>
    <div class="title-line"></div>
  </div>

  <!-- Main 3 pillars -->
  <div class="main-container">

    <!-- Pillar 1: 출퇴근 & 조직 편성 -->
    <div class="pillar-card cyan">
      <div class="pillar-icon-row">
        <div class="pillar-icon-box cyan"><i class="fas fa-user-clock"></i></div>
        <div class="pillar-heading">
          <div class="pillar-title">출퇴근하는 AI 에이전트</div>
          <div class="pillar-en">AI Agent Work Schedule</div>
        </div>
      </div>
      <div class="pillar-divider"></div>
      <div class="pillar-items">
        <div class="pillar-item">
          <i class="fas fa-sun pillar-item-icon cyan"></i>
          <div class="pillar-item-text">
            <div class="pillar-item-title">09:00 출근 — 태스크 자동 할당</div>
            <div class="pillar-item-desc">수요예측·문서처리·재고분석 등 업무 즉시 시작</div>
          </div>
        </div>
        <div class="pillar-item">
          <i class="fas fa-moon pillar-item-icon cyan"></i>
          <div class="pillar-item-text">
            <div class="pillar-item-title">18:00 퇴근 — 결과 리포트 생성</div>
            <div class="pillar-item-desc">처리 결과·이상·미결 항목 정리 후 유휴 전환</div>
          </div>
        </div>
        <div class="pillar-item">
          <i class="fas fa-sitemap pillar-item-icon cyan"></i>
          <div class="pillar-item-text">
            <div class="pillar-item-title">팀·부서 단위 조직 편성</div>
            <div class="pillar-item-desc">물류·정산·고객지원 AI를 사람 조직과 동일 구조로 배치</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pillar 2: 채용 = 스크립트 복사 & 평가 -->
    <div class="pillar-card amber">
      <div class="pillar-icon-row">
        <div class="pillar-icon-box amber"><i class="fas fa-copy"></i></div>
        <div class="pillar-heading">
          <div class="pillar-title">"채용"은 스크립트 복사</div>
          <div class="pillar-en">Hire = Duplicate Script</div>
        </div>
      </div>
      <div class="pillar-divider"></div>
      <div class="pillar-items">
        <div class="pillar-item">
          <i class="fas fa-user-plus pillar-item-icon amber"></i>
          <div class="pillar-item-text">
            <div class="pillar-item-title">채용 = 검증된 스크립트 복사</div>
            <div class="pillar-item-desc">복제 즉시 투입 — 온보딩 0일</div>
          </div>
        </div>
        <div class="pillar-item">
          <i class="fas fa-chart-bar pillar-item-icon amber"></i>
          <div class="pillar-item-text">
            <div class="pillar-item-title">KPI 기반 성과 평가</div>
            <div class="pillar-item-desc">처리량·정확도·오류율로 사람과 동일하게 평가</div>
          </div>
        </div>
        <div class="pillar-item">
          <i class="fas fa-trash-alt pillar-item-icon amber"></i>
          <div class="pillar-item-text">
            <div class="pillar-item-title">저성과 버전 교체 (= 해고)</div>
            <div class="pillar-item-desc">성과 미달 시 고도화 신버전으로 즉시 교체</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pillar 3: IT 부서 모니터링 -->
    <div class="pillar-card green">
      <div class="pillar-icon-row">
        <div class="pillar-icon-box green"><i class="fas fa-desktop"></i></div>
        <div class="pillar-heading">
          <div class="pillar-title">IT 부서 = AI 워커 관제 센터</div>
          <div class="pillar-en">IT Dept. as AI Control Tower</div>
        </div>
      </div>
      <div class="pillar-divider"></div>
      <div class="pillar-items">
        <div class="pillar-item">
          <i class="fas fa-tachometer-alt pillar-item-icon green"></i>
          <div class="pillar-item-text">
            <div class="pillar-item-title">실시간 모니터링 대시보드</div>
            <div class="pillar-item-desc">전 에이전트 업무 상태를 Grafana에서 실시간 관제</div>
          </div>
        </div>
        <div class="pillar-item">
          <i class="fas fa-exclamation-triangle pillar-item-icon green"></i>
          <div class="pillar-item-text">
            <div class="pillar-item-title">이상 감지 → 알림·인터벤션</div>
            <div class="pillar-item-desc">응답 지연·오판 시 즉시 알림, 담당자 개입</div>
          </div>
        </div>
        <div class="pillar-item">
          <i class="fas fa-shield-alt pillar-item-icon green"></i>
          <div class="pillar-item-text">
            <div class="pillar-item-title">AI 거버넌스 · 감사 로그</div>
            <div class="pillar-item-desc">처리 이력 보존 — 책임 추적·규정 준수</div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Bottom global banner -->
  <div class="bottom-banner">
    <div class="banner-icon"><i class="fas fa-globe"></i></div>
    <div class="banner-text">
      <strong>글로벌 선제 움직임:</strong>&nbsp;
      Microsoft·Salesforce·ServiceNow 등이 <strong>'AI 디지털 워커 조직'</strong>을 핵심 전략으로 채택 —
      (주)제때 IT도 <strong>AI 관제 조직</strong>으로 진화합니다.
    </div>
    <div class="banner-logos">
      <span class="global-tag">Microsoft</span>
      <span class="global-tag">Salesforce</span>
      <span class="global-tag">ServiceNow</span>
    </div>
  </div>
</div>`;

export default function Slide09() {
  return (
    <SlideCanvas slideId={10} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
