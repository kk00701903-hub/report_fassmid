"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide34.css";

const SLIDE_HTML = `<div class="fass-slide-root fluent-slide" style="overflow: hidden;">
<!-- Non-Cover-Page Title Region -->
<div class="title-r">
<div class="title-row">
<div class="bar"></div>
<h1 class="title-main">AI 오케스트레이션</h1>
</div>
<p class="sub">오케스트레이션·프로세스 지침 기반 지능형 코드 변환 — 외주 인력 0 M/M 마이그레이션</p>
<div class="line"></div>
</div>
<!-- Main Content: AI Impact Hero Layout -->
<div class="ai-innovation-hero-main-layout">
<!-- Left Column: Stat Anchor -->
<div class="ai-innovation-left-stat-column">
<div class="ai-stat-panel">
<div class="ai-stat-panel__head">
<span class="ai-stat-panel__badge"><i class="fas fa-users-slash"></i> COST DEFENSE</span>
<div class="ai-innovation-stat-label-top">외주 개발 인력 투입 최소화</div>
</div>
<div class="ai-stat-panel__hero">
<div class="ai-stat-panel__value-row">
<span class="ai-innovation-hero-stat-number">0</span>
<span class="ai-innovation-stat-unit-text">M/M</span>
</div>
<span class="ai-stat-panel__hero-caption">외주 Man-Month 투입</span>
</div>
<div class="ai-stat-panel__impact ai-innovation-stat-description-box">
<p class="ai-innovation-stat-impact-summary">
            과거 수백 명의 하급 인력이 수행하던<br/>
            수작업 마이그레이션을 AI가 전담
          </p>
<p class="ai-innovation-stat-impact-subtext">
            * 인건비 획기적 방어 및 휴먼 에러 원천 차단
          </p>
</div>
</div>
</div>
<!-- Right Column: Content Area -->
<div class="ai-innovation-right-content-column">
<!-- Tech Process 1 -->
<div class="ai-tech-process-group-item">
<div class="ai-tech-process-header-row">
<div class="ai-tech-process-icon-circle">
<i class="fas fa-microchip"></i>
</div>
<div class="ai-tech-process-title-text">DGX·Claude Code 마이그레이션 오케스트레이션</div>
</div>
<p class="ai-tech-process-body-description">
            독자적인 VectorDB를 따로 구성한 것이 아니라, DGX Spark와 Claude Code에
            <b>적절한 오케스트레이션(Orchestration)</b>과 <b>프로세스 지침</b>을 제공했습니다.
            AI 에이전트가 레거시 C#·DB 맥락을 활용해 비즈니스 로직을 분석하고 차세대 표준 코드 변환 초안을 생성합니다.
          </p>
<div class="ai-tech-process-highlight-chip-list">
<span class="ai-tech-process-chip-badge active">DGX Spark</span>
<span class="ai-tech-process-chip-badge active">Claude Code</span>
<span class="ai-tech-process-chip-badge">Orchestration</span>
<span class="ai-tech-process-chip-badge">Process Guide</span>
</div>
<a class="agent-demo-trigger-btn is-disabled" href="#" id="langgraphDemoLinkBtn" target="_blank" rel="noopener noreferrer" title="링크 연결 예정">
<i class="fas fa-play-circle"></i> LangGraph 멀티에이전트 동작 보기
<i class="fas fa-arrow-up-right-from-square" style="font-size:13px;opacity:0.85;"></i>
</a>
</div>
<!-- Impact Summary -->
<div class="ai-impact-management-summary-box">
<div class="ai-impact-management-title">
<i class="fas fa-chart-line"></i> 핵심 경영 임팩트
          </div>
<ul class="ai-impact-management-list">
<li class="ai-impact-management-list-entry">
<i class="fa-solid fa-circle-check"></i>
<span><b>인건비 절감:</b> 외주 인건비 리스크 해소 및 휴먼 에러 원천 차단</span>
</li>
<li class="ai-impact-management-list-entry">
<i class="fa-solid fa-check"></i>
<span><b>품질 상향 평준화:</b> 숙련도 편차 제거 및 표준 아키텍처 준수</span>
</li>
<li class="ai-impact-management-list-entry">
<i class="fa-solid fa-heart-circle-check"></i>
<span><b>기술 자산화:</b> 레거시 분석 데이터 확보로 유지보수 효율 극대화</span>
</li>
</ul>
</div>
</div>
</div>
<!-- Multi-Agent Orchestration Demo Overlay -->
<div aria-hidden="true" class="agent-demo-overlay" id="agentDemoOverlay">
<div class="agent-demo-header">
<div class="agent-demo-header-title">
<i class="fas fa-diagram-project"></i> LangGraph 멀티에이전트 오케스트레이션
</div>
<button class="agent-demo-close-btn" id="agentDemoCloseBtn" type="button">닫기 ✕</button>
</div>
<div class="agent-demo-stage-wrap">
<div class="agent-demo-stage" id="agentDemoStage">
<svg class="agent-demo-svg" id="agentDemoSvg"></svg>
<div class="agent-demo-packet" id="agentDemoPacket"></div>
</div>
</div>
<div class="agent-demo-status" id="agentDemoStatus">
<span>버튼을 눌러 LangGraph가 에이전트를 조율하는 과정을 확인하세요.</span>
</div>
<div class="agent-demo-legend">
<span>LangGraph Orchestrator</span>
<span>DGX Spark · Orchestration</span>
<span>Claude Code · Multi-Agent</span>
</div>
</div>
</div>`;

export default function Slide33() {
  return (
    <SlideCanvas slideId={34} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
