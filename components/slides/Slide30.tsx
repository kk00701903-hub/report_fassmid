"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide30.css";

const SLIDE_HTML = `<div class="slide-root-container" style="overflow: hidden;">
<!-- Title Region -->
<div class="title-r">
<div class="title-row">
<div class="bar"></div>
<span class="badge">BUSINESS INNOVATION</span>
<h1 class="title-main">비즈니스 혁신5: Zero-Defect 코드 품질 통제 체계</h1>
</div>
<p class="sub">AI 가속 CI/CD + SonarQube 정적 분석 — 무결점 코드 품질 통제 체계</p>
<div class="line"></div>
</div>
<!-- Content Area -->
<div class="quality-content-main-wrapper">
<!-- Left Column: Pipeline -->
<div class="quality-left-pipeline-column">
<div class="quality-pipeline-step-card">
<div class="quality-step-header-group">
<div class="quality-step-icon-box">
<i class="fa-solid fa-code-merge"></i>
</div>
<div class="quality-step-title-text">AI 가속화 기반 CI/CD 파이프라인 연동</div>
</div>
<div class="quality-step-description-list">
<div class="quality-step-description-item">AI가 생성한 대량의 코드를 SonarQube 정적 분석 도구로 즉시 정밀 검사</div>
<div class="quality-step-description-item">개발자의 코드 병합(Merge) 요청 시 보안 취약점 및 구조적 결함 자동 탐지</div>
<div class="quality-step-description-item">사람의 눈으로 놓치기 쉬운 런타임 잠재 에러를 사전에 100% 필터링</div>
</div>
</div>
<div class="quality-pipeline-step-card">
<div class="quality-step-header-group">
<div class="quality-step-icon-box">
<i class="fa-solid fa-magnifying-glass-chart"></i>
</div>
<div class="quality-step-title-text">실시간 품질 모니터링 및 시각화</div>
</div>
<div class="quality-step-description-list">
<div class="quality-step-description-item">코드 복잡도(Complexity) 및 중복도(Duplication) 실시간 지표화</div>
<div class="quality-step-description-item">기술 부채(Technical Debt) 발생 구간을 추적하여 리팩토링 우선순위 자동 할당</div>
<div class="quality-step-description-item">워룸(War-Room) 내 대시보드를 통해 팀 전체의 코드 건강도 상시 공유</div>
</div>
</div>
</div>
<!-- Right Column: Quality Gates -->
<div class="quality-right-gate-column">
<div class="quality-gate-summary-container">
<div class="quality-gate-title-badge">Pass/Fail Standard</div>
<div class="quality-gate-heading-text">배포 자동 차단 품질 게이트 (Quality Gate)</div>
<div class="quality-gate-metrics-grid">
<div class="quality-metric-item-box">
<div class="quality-metric-label-group">
<span class="quality-metric-name-text">Critical &amp; Blocker Bugs</span>
<span class="quality-metric-value-text">0 Items</span>
</div>
<span class="quality-gate-status-indicator status-strict">Strict Block</span>
</div>
<div class="quality-metric-item-box safe">
<div class="quality-metric-label-group">
<span class="quality-metric-name-text">Unit Test Coverage</span>
<span class="quality-metric-value-text">Min 80% Over</span>
</div>
<span class="quality-gate-status-indicator status-standard">Mandatory</span>
</div>
<div class="quality-metric-item-box">
<div class="quality-metric-label-group">
<span class="quality-metric-name-text">Security Vulnerabilities</span>
<span class="quality-metric-value-text">Zero Tolerance</span>
</div>
<span class="quality-gate-status-indicator status-strict">Strict Block</span>
</div>
</div>
<div class="quality-impact-footer-note">
<i class="fa-solid fa-circle-check"></i>
<span>품질 기준 미달 시 운영 환경 배포 원천 차단으로 무결점 보장</span>
</div>
</div>
</div>
</div>
</div>`;

export default function Slide30() {
  return (
    <SlideCanvas motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
