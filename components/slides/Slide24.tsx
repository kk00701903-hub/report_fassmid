"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide24.css";

const SLIDE_HTML = `<div class="fass-slide-root fluent-slide" style="overflow: hidden;">
<!-- Non-Cover-Page Title Region -->
<div class="title-region-wrapper">
<div class="title-region-header">
<div class="title-region-bar"></div>
<h1 class="title-region-text">아키텍처 원칙 1: 모듈러 모놀리스 (안정성 극대화)</h1>
</div>
<div class="title-region-line"></div>
</div>
<div class="fass-architecture-main-container">
<div class="fass-architecture-columns-wrapper">
<!-- Left Visual Column -->
<div class="architecture-left-visual-column">
<div class="architecture-visual-card-item">
<div class="architecture-visual-label-group">
<span class="architecture-visual-badge-cyan">FaSS V3.0 Phase 1 Architecture</span>
<div style="font-size: 14px;color: var(--ppt-text-3);">
<i class="fas fa-microchip"></i> On-Premise Optimized
              </div>
</div>
<div class="architecture-diagram-container">
<div style="margin-bottom: 8px;font-size:13px;font-weight: 600;color: var(--ppt-text-2);">
                [ 논리적 MSA 구현 ]
              </div>
<div class="architecture-physical-server-box">
<div class="architecture-server-title-text">Single Physical Server (On-Premise)<br/><span style="font-size:13px;color:var(--ppt-accent);font-weight:600;">유통물류 시스템</span></div>
<div class="architecture-module-grid-wrapper">
<div class="architecture-module-unit-box">
<i class="fa-solid fa-file-invoice architecture-module-icon-element"></i>
<span class="architecture-module-name-text">수주</span>
</div>
<div class="architecture-module-unit-box">
<i class="fa-solid fa-cart-shopping architecture-module-icon-element"></i>
<span class="architecture-module-name-text">발주</span>
</div>
<div class="architecture-module-unit-box">
<i class="fa-solid fa-calculator architecture-module-icon-element"></i>
<span class="architecture-module-name-text">정산</span>
</div>
</div>
<div style="height: 1px;background: var(--ppt-accent);opacity: 0.3;"></div>
<div style="text-align: center;font-size:13px;color: var(--ppt-accent);">API-First Communication Only</div>
</div>
<div class="architecture-db-isolation-row">
<div class="architecture-db-icon-item">
<i class="fas fa-database"></i>
<span class="architecture-db-label-caption">Schema A</span>
</div>
<div class="architecture-db-icon-item" style="color: var(--ppt-accent);">
<i class="fa-solid fa-shield"></i>
<span class="architecture-db-label-caption">격리벽</span>
</div>
<div class="architecture-db-icon-item">
<i class="fas fa-database"></i>
<span class="architecture-db-label-caption">Schema B</span>
</div>
<div class="architecture-db-icon-item" style="color: var(--ppt-accent);">
<i class="fa-solid fa-shield-cat"></i>
<span class="architecture-db-label-caption">격리벽</span>
</div>
<div class="architecture-db-icon-item">
<i class="fas fa-database"></i>
<span class="architecture-db-label-caption">Schema C</span>
</div>
</div>
</div>
<div style="font-size:13px;color: var(--ppt-text-3);text-align: center;">
              * 물리적 통합 운영 + 논리적 격리로 안정성·비용 동시 확보
            </div>
<div class="architecture-mini-strategy">
<div class="architecture-mini-strategy-item"><i class="fas fa-server"></i><span>물리적 서버 단일화 — 인프라 비용·운영 포인트 일원화</span></div>
<div class="architecture-mini-strategy-item"><i class="fas fa-layer-group"></i><span>도메인별 DB 스키마 격리 — 수주·발주·정산 데이터 간섭 차단</span></div>
<div class="architecture-mini-strategy-item"><i class="fa-solid fa-diagram-project"></i><span>API-First 통신 — MSA 전환·AI 에이전트 연동 기반</span></div>
</div>
</div>
</div>
<!-- Right: Architecture Comparison -->
<div class="architecture-right-content-column">
<div class="arch-compare-panel-title"><i class="fas fa-scale-balanced"></i> 아키텍처 선택 — FaSS는 모듈러 모놀리스</div>
<div class="arch-compare-list">
<div class="arch-compare-card">
<div class="arch-compare-header">
<span class="arch-compare-num">1</span>
<div class="arch-compare-title">모놀리스 <em>Monolithic</em></div>
</div>
<p class="arch-compare-tagline">전체를 <strong>하나의 덩어리</strong>로 개발·배포</p>
<p class="arch-compare-key">초기에는 단순 — 규모가 커지면 변경·확장 부담 증가</p>
</div>
<div class="arch-compare-card arch-compare-card--highlight">
<div class="arch-compare-header">
<span class="arch-compare-num">2</span>
<div class="arch-compare-title">모듈러 모놀리스 <em>Modular Monolith</em></div>
<span class="arch-compare-fass-badge">FaSS V3.0 선택</span>
</div>
<p class="arch-compare-tagline">서버는 <strong>하나</strong>, 업무 모듈은 <strong>독립 격리</strong></p>
<p class="arch-compare-key arch-compare-key--choice">안정적 운영 + 비용 효율 + 향후 MSA 전환 준비</p>
</div>
<div class="arch-compare-card arch-compare-card--msa">
<div class="arch-compare-header">
<span class="arch-compare-num">3</span>
<div class="arch-compare-title">MSA <em>Microservices</em></div>
</div>
<p class="arch-compare-tagline">기능별로 <strong>완전 분리</strong>해 각각 운영</p>
<p class="arch-compare-key">최대 유연성 — 분산 운영·인프라 비용 부담 큼</p>
</div>
</div>
</div>
</div>
<!-- Business Impact Footer -->
<div class="architecture-impact-highlight-box">
<div class="architecture-impact-content-row" style="display:flex;align-items:center;gap:10px;">
<div class="architecture-impact-label-text">경영 임팩트</div>
<div class="architecture-impact-desc-text">
            성급한 MSA 대신 <span style="color: var(--ppt-accent);font-weight: 700;">모듈러 모놀리스</span> — 안정성·비용·전환 용이성을 동시에 확보
          </div>
</div>
</div>
</div>
</div>`;

export default function Slide23() {
  return (
    <SlideCanvas slideId={24} motion="architecture" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
