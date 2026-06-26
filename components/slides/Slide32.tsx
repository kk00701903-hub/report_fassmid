"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide32.css";

const SLIDE_HTML = `<div class="slide-root-container" style="overflow: hidden;">
<!-- Title Region -->
<div class="title-r">
<div class="title-row">
<div class="bar"></div>
<span class="badge">BUSINESS INNOVATION</span>
<h1 class="title-main">비즈니스 혁신6: FinOps 관점에서의 클라우드 전환 대비</h1>
</div>
<p class="sub">유휴 자원 자동 셧다운 등 비용 최적화 습관을 자산화하여, ASP 공급 시 수익성을 극대화합니다.</p>
<div class="line"></div>
</div>
<!-- Main Content -->
<div class="finops-main-content-layout">
<!-- Column 1: Strategy -->
<div class="finops-column-item-wrapper">
<div class="finops-content-card-box">
<div class="finops-card-header-group">
<div class="finops-card-icon-circle">
<i class="fas fa-bullseye"></i>
</div>
<h2 class="finops-card-title-text">미래 ASP 수익성 기반</h2>
<div class="finops-card-divider-line"></div>
</div>
<p class="finops-card-body-text">
            개발 단계부터 비용 효율적인 인프라 운영 습관을 내재화하여 향후 솔루션 패키지화 시 가격 경쟁력을 확보합니다.
          </p>
<ul class="finops-list-container-group">
<li class="finops-list-item-row">인프라 비용의 변동비화 (FinOps)</li>
<li class="finops-list-item-row">리소스 사용량 실시간 가시성 확보</li>
<li class="finops-list-item-row">수익 창출 부서(Profit Center) 전환 대비</li>
</ul>
<div class="finops-highlight-badge-tag">비용 관리 체계 자산화</div>
</div>
</div>
<!-- Column 2: Action -->
<div class="finops-column-item-wrapper">
<div class="finops-content-card-box">
<div class="finops-card-header-group">
<div class="finops-card-icon-circle">
<i class="fas fa-toggle-off"></i>
</div>
<h2 class="finops-card-title-text">인프라 최적화 실행</h2>
<div class="finops-card-divider-line"></div>
</div>
<div class="finops-policy-visual-item">
<span class="finops-policy-time-label">야간/주말</span>
<span class="finops-policy-desc-text">Cloud Run 등 테스트 서버 자동 셧다운(Shut-down) 강제 적용</span>
</div>
<div class="finops-policy-visual-item">
<span class="finops-policy-time-label">상시 모니터링</span>
<span class="finops-policy-desc-text">유휴 인스턴스 및 미사용 스토리지 자동 탐지 및 즉각 삭제</span>
</div>
<ul class="finops-list-container-group">
<li class="finops-list-item-row">불필요한 클라우드 낭비 요소 원천 차단</li>
<li class="finops-list-item-row">자동화 스크립트를 통한 운영 리소스 최소화</li>
</ul>
<div class="finops-highlight-badge-tag" style="background-color: rgba(0, 240, 255, 0.1);border-color: var(--ppt-accent);color: var(--ppt-accent);">자동화 기반 비용 절감</div>
</div>
</div>
<!-- Column 3: Impact -->
<div class="finops-column-item-wrapper">
<div class="finops-content-card-box">
<div class="finops-card-header-group">
<div class="finops-card-icon-circle">
<i class="fas fa-coins"></i>
</div>
<h2 class="finops-card-title-text">경영적 기대 효과</h2>
<div class="finops-card-divider-line"></div>
</div>
<p class="finops-card-body-text">
            절감된 인프라 유지 비용은 그대로 회사의 이익으로 직결되며, 외부 고객사 공급 시 강력한 운영 노하우로 작용합니다.
          </p>
<ul class="finops-list-container-group">
<li class="finops-list-item-row">SaaS/ASP 서비스 마진율 극대화</li>
<li class="finops-list-item-row">오픈 소스 DB 전환과 결합된 시너지</li>
<li class="finops-list-item-row">연간 수억 원 단위의 클라우드 비용 방어</li>
</ul>
<div class="finops-highlight-badge-tag">핵심 운영 노하우 자산화</div>
</div>
</div>
</div>
</div>`;

export default function Slide32() {
  return (
    <SlideCanvas slideId={32} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
