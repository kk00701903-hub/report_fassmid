"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide38.css";

const SLIDE_HTML = `<div class="slide fluent-slide-root">
  <!-- Title -->
  <div class="title-region">
    <div class="title-header">
      <div class="title-bar"></div>
      <span class="title-badge">ULTIMATE GOAL</span>
      <h1 class="title-text">중장기 목표 2: MSA 전환</h1>
    </div>
    <div class="title-line"></div>
  </div>

  <!-- Main -->
  <div class="main-container">
    <!-- Left: Diagram -->
    <div class="left-col">
      <div class="diagram-card">
        <div class="diagram-label">
          <i class="fas fa-project-diagram"></i> Strangler Fig Pattern — 점진적 신규 시스템 확대
        </div>
        <div class="diagram-stages">
          <!-- Stage 1 -->
          <div class="stage-row">
            <div class="stage-label-col">현재<br/>(Phase 1)</div>
            <div class="stage-blocks">
              <div class="block-legacy block-lg" style="flex:2.5; height:44px;">레거시 모놀리스<br/>(C# 시스템)</div>
              <div class="arrow-right"><i class="fas fa-arrow-right"></i></div>
              <div class="block-legacy block-new" style="flex:1.2; height:44px;">FaSS<br/>V3.0</div>
            </div>
          </div>
          <div class="stage-arrow-row"><i class="fas fa-chevron-down"></i><span style="font-size:13px; margin-left:4px;">AI 접목 신규 시스템 점진적 확대</span></div>
          <!-- Stage 2 -->
          <div class="stage-row">
            <div class="stage-label-col">전환기<br/>(Phase 2)</div>
            <div class="stage-blocks">
              <div class="block-legacy block-lg" style="flex:1.2; height:44px;">레거시<br/>(축소)</div>
              <div class="arrow-right"><i class="fas fa-arrow-right"></i></div>
              <div class="block-legacy block-new" style="flex:1.5; height:44px;">FaSS<br/>Core</div>
              <div class="arrow-right"><i class="fas fa-arrow-right"></i></div>
              <div class="block-legacy block-ai" style="flex:1.3; height:44px;">AI<br/>Service</div>
            </div>
          </div>
          <div class="stage-arrow-row"><i class="fas fa-chevron-down"></i><span style="font-size:13px; margin-left:4px;">레거시 완전 제거 — 완전한 MSA 구현</span></div>
          <!-- Stage 3 -->
          <div class="stage-row">
            <div class="stage-label-col">최종<br/>(MSA)</div>
            <div class="stage-blocks">
              <div class="block-legacy block-msa" style="flex:1; height:44px;">유통<br/>물류</div>
              <div class="block-legacy block-msa" style="flex:1; height:44px;">3PL<br/>시스템</div>
              <div class="block-legacy block-msa" style="flex:1; height:44px;">주유소관리<br/>시스템</div>
              <div class="block-legacy block-ai" style="flex:1; height:44px;">AI<br/>Engine</div>
            </div>
          </div>
        </div>
        <div class="strangler-note">
          <i class="fas fa-leaf" style="color:var(--ppt-accent);"></i>
          &nbsp;기존 시스템을 한 번에 교체하지 않고, 신규 AI 접목 시스템부터 독립 서비스로 래핑하여 점진적으로 레거시를 대체
        </div>
      </div>
    </div>

    <!-- Right: Reasons + Trade-off -->
    <div class="right-col">
      <div class="section-title">
        <i class="fas fa-bullseye"></i> FaSS 최종 목표 — MSA가 반드시 필요한 3가지 이유
      </div>
      <div class="reasons-grid">
        <div class="reason-card">
          <div class="reason-num">1</div>
          <div class="reason-content">
            <div class="reason-title">볼륨 성장 → 무중단 배포 필수</div>
            <div class="reason-desc">유통물류 유저 및 트래픽이 커질수록, 특정 모듈 배포 시 전체 시스템을 중단할 수 없음. MSA는 모듈별 독립 배포로 <span style="color:var(--ppt-accent); font-weight:600;">365일 무중단 운영</span>을 보장합니다.</div>
          </div>
        </div>
        <div class="reason-card">
          <div class="reason-num">2</div>
          <div class="reason-content">
            <div class="reason-title">부분 장애 → 전체 마비 리스크 차단</div>
            <div class="reason-desc">시스템 규모가 커질수록 단일 서비스 오류가 전 시스템을 마비시키는 위험이 급증함. MSA의 서킷 브레이커 패턴으로 <span style="color:var(--ppt-accent); font-weight:600;">장애 격리(Fault Isolation)</span> 를 실현합니다.</div>
          </div>
        </div>
        <div class="reason-card">
          <div class="reason-num">3</div>
          <div class="reason-content">
            <div class="reason-title">AI 서비스 — 단일 시스템 내 동시 운영 불가</div>
            <div class="reason-desc">AI 추론 엔진(수요예측·RAG)은 막대한 CPU/GPU 자원을 요구함. 단일 시스템에서 AI와 비즈니스 로직을 공존시키면 서로 자원 충돌. <span style="color:var(--ppt-accent-2); font-weight:600;">AI 서비스 독립 분리</span>가 핵심 전제 조건입니다.</div>
          </div>
        </div>
      </div>
      <!-- Trade-off note -->
      <div class="tradeoff-box">
        <div class="tradeoff-icon"><i class="fas fa-balance-scale"></i></div>
        <div class="tradeoff-text">
          <strong>⚠ 개발팀에 가해지는 복잡도 증가</strong>는 MSA 전환의 피할 수 없는 부산물입니다. 서비스 간 통신 설계, 분산 트랜잭션, 운영 복잡성이 높아지지만, 이는 <strong>회사의 대의(성장·수익화)를 위해 TFT 전원이 감수해야 할 기술적 부채</strong>입니다.
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="bottom-bar">
    <div class="bottom-bar-icon"><i class="fas fa-flag-checkered"></i></div>
    <div class="bottom-bar-text">MSA는 선택이 아닌 필수</div>
    <div class="bottom-bar-sub">— FaSS 플랫폼이 진정한 'AI 디지털 물류 엔진'으로 거듭나기 위한 최종 아키텍처 목적지</div>
  </div>
</div>`;

export default function Slide38() {
  return (
    <SlideCanvas slideId={38} motion="architecture" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
