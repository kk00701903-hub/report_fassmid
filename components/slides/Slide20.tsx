"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide20.css";

const SLIDE_HTML = `<div class="war-room-slide-root fluent-slide" style="overflow: hidden;">
<!-- Title Region -->
<div class="title-region-container">
<div class="title-region-header">
<div class="title-region-bar"></div>
<h1 class="title-region-text">최적화 방안 2. 애자일 워룸 운영</h1>
</div>
<div class="title-region-line"></div>
</div>
<!-- Main Content -->
<div class="war-room-content-wrapper">
<div class="war-room-columns">
<!-- Left Column: Infrastructure & Strategy -->
<div class="war-room-left-column">
<div class="war-room-feature-card">
<div class="war-room-card-header">
<div class="war-room-card-icon"><i class="fas fa-users-rectangle"></i></div>
<div class="war-room-card-title">일체형 조직 운영 (All-in-One)</div>
</div>
<div class="war-room-card-body">
<span class="war-room-location-tag"><i class="fas fa-location-dot"></i> 남양주 1공장 2층 프로젝트룸</span>
<div class="war-room-highlight-item">
<i class="fas fa-check war-room-highlight-bullet"></i>
<span>단독 프로젝트 룸 운영을 통한 커뮤니케이션 사일로(silo) 제거</span>
</div>
<div class="war-room-highlight-item">
<i class="fas fa-check war-room-highlight-bullet"></i>
<span>이슈 발생 시 그 자리에서 즉시 토론하고 의사결정하여 '결재 및 대기 시간'을 완벽하게 삭제</span>
</div>
</div>
<div class="war-room-badge-container">
<div class="war-room-status-badge">물리적 통합 완료</div>
<div class="war-room-status-badge">Agile 스프린트 최적화</div>
</div>
</div>
<div class="war-room-feature-card">
<div class="war-room-card-header">
<div class="war-room-card-icon"><i class="fas fa-bolt"></i></div>
<div class="war-room-card-title">의사결정 리드타임 제로화</div>
</div>
<div class="war-room-card-body">
<div class="war-room-highlight-item">
<i class="fas fa-circle-arrow-right war-room-highlight-bullet"></i>
<span>현장 즉결 처리 체계 도입으로 프로젝트 지연 요소 선제적 차단</span>
</div>
<div class="war-room-highlight-item">
<i class="fas fa-circle-arrow-right war-room-highlight-bullet"></i>
<span>부서 간 업무 이관 단계 축소를 통한 개발 생산성 극대화</span>
</div>
</div>
<div class="war-room-dashboard-preview">
<div class="war-room-dashboard-box">
<span class="war-room-dashboard-label">Wait Time</span>
<span class="war-room-dashboard-value">0s</span>
</div>
<div class="war-room-dashboard-box">
<span class="war-room-dashboard-label">Decision Speed</span>
<span class="war-room-dashboard-value">Real-time</span>
</div>
</div>
</div>
</div>
<!-- Right Column: Monitoring & Visualization -->
<div class="war-room-right-column">
<div class="war-room-feature-card">
<div class="war-room-card-header">
<div class="war-room-card-icon"><i class="fas fa-desktop"></i></div>
<div class="war-room-card-title">실시간 가시성 대시보드</div>
</div>
<div class="war-room-card-body">
<div class="war-room-highlight-item">
<i class="fas fa-chart-line war-room-highlight-bullet"></i>
<span><a href="https://kk00701903-hub.github.io/fass-dailyscrum/#/analytics" target="_blank" rel="noopener noreferrer" style="color:var(--fluent-blue);font-weight:600;">FASS 데일리 스크럼 Analytics</a>으로 일단위 업무·스프린트 진척도를 점검하고 워룸에서 공유</span>
</div>
<div class="war-room-highlight-item">
<i class="fas fa-bug war-room-highlight-bullet"></i>
<span>태스크 완료율·블로커·버그 지표 시각화로 품질 리스크 상시 모니터링</span>
</div>
</div>
<div class="war-room-dashboard-preview">
<a class="war-room-dashboard-box" href="https://kk00701903-hub.github.io/fass-dailyscrum/#/analytics" target="_blank" rel="noopener noreferrer" style="border-color:var(--fluent-blue);text-decoration:none;cursor:pointer;">
<span class="war-room-dashboard-label">Daily Scrum</span>
<span class="war-room-dashboard-value">Analytics</span>
</a>
<div class="war-room-dashboard-box" style="border-color: var(--ppt-good);">
<span class="war-room-dashboard-label">Sprint</span>
<span class="war-room-dashboard-value">Progress</span>
</div>
</div>
</div>
<div class="war-room-feature-card">
<div class="war-room-card-header">
<div class="war-room-card-icon"><i class="fas fa-gauge-high"></i></div>
<div class="war-room-card-title">프로젝트 성공 속도 가속화</div>
</div>
<div class="war-room-card-body">
<div class="war-room-highlight-item">
<i class="fas fa-shield-halved war-room-highlight-bullet"></i>
<span>이슈 감지부터 해결까지의 MTTR(평균 복구 시간) 70% 이상 단축</span>
</div>
<div class="war-room-highlight-item">
<i class="fas fa-shield-halved war-room-highlight-bullet"></i>
<span>전 팀원이 동일한 목표 지표를 실시간으로 인지하여 성과 중심 조직으로 변모</span>
</div>
</div>
<div class="war-room-badge-container">
<div class="war-room-status-badge" style="border-color: var(--fluent-warn);color: var(--fluent-warn);">핵심 성과 지표(KPI) 연동</div>
<div class="war-room-status-badge" style="border-color: var(--fluent-good);color: var(--fluent-good);">무결점 배포 보장</div>
</div>
</div>
</div>
</div>
<!-- FASS Daily Scrum -->
<div class="war-room-dailyscrum-banner">
<div class="war-room-dailyscrum-icon"><i class="fas fa-clipboard-list"></i></div>
<div class="war-room-dailyscrum-body">
<div class="war-room-dailyscrum-title">FASS 데일리 스크럼 — TFT 애자일 운영 허브</div>
<p class="war-room-dailyscrum-desc">일일 스크럼·태스크·스프린트 데이터를 기록하고 Analytics로 진척·블로커·완료율을 워룸 대형 화면에 공유합니다.</p>
</div>
<a class="war-room-dailyscrum-link" href="https://kk00701903-hub.github.io/fass-dailyscrum/#/analytics" target="_blank" rel="noopener noreferrer">
<i class="fas fa-chart-line"></i> Analytics
</a>
</div>
</div>
</div>`;

export default function Slide19() {
  return (
    <SlideCanvas slideId={20} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
