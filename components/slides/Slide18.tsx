"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide17Progress from "@/components/slides/Slide17Progress";
import "./styles/Slide18.css";

const TITLE_HTML = `<div class="title-region">
  <div class="title-header">
    <div class="title-bar"></div>
    <h1 class="title-main">프로젝트 진행경과 마일스톤</h1>
  </div>
  <div class="title-sub">FaSS 차세대 플랫폼 구축 — 7단계 로드맵</div>
  <div class="title-line"></div>
</div>`;

const CONTENT_HTML = `<div class="content">
  <div class="milestone-grid">
    <div class="milestone-card p1">
      <div class="card-head">
        <div class="card-head-left"><span class="phase-badge">1단계</span></div>
        <span class="period"><span class="period-ym"><span class="period-y">26</span><span class="period-dot">.</span><span class="period-m">01</span></span><span class="period-sep">~</span><span class="period-ym period-end"><span class="period-y">26</span><span class="period-dot">.</span><span class="period-m">02</span></span></span>
      </div>
      <div class="card-title">AS-IS 분석 · AI 에이전트 기반</div>
      <p class="card-desc">시스템 아키텍처·비즈니스 프레임워크 분석, AI 모델·서브에이전트 구축</p>
      <div class="card-foot"><span class="status-tag status-done">완료</span></div>
    </div>

    <div class="milestone-card p2">
      <div class="card-head">
        <div class="card-head-left"><span class="phase-badge">2단계</span></div>
        <span class="period"><span class="period-ym"><span class="period-y">26</span><span class="period-dot">.</span><span class="period-m">03</span></span><span class="period-sep">~</span><span class="period-ym period-end"><span class="period-y">26</span><span class="period-dot">.</span><span class="period-m">05</span></span></span>
      </div>
      <div class="card-title">TO-BE 모델 · 표준 프레임워크</div>
      <p class="card-desc">요구사항 정의 및 차세대 표준 프레임워크 모델 정립</p>
      <div class="card-foot"><span class="status-tag status-done">완료</span></div>
    </div>

    <div class="milestone-card p3 current">
      <div class="card-head">
        <div class="card-head-left"><span class="phase-badge">3단계</span></div>
        <span class="period"><span class="period-ym"><span class="period-y">26</span><span class="period-dot">.</span><span class="period-m">05</span></span><span class="period-sep">~</span><span class="period-ym period-end"><span class="period-y">26</span><span class="period-dot">.</span><span class="period-m">09</span></span></span>
      </div>
      <div class="card-title">공통 아키텍처 · 프레임워크 PoC</div>
      <p class="card-desc">공통 아키텍처 설계 및 프레임워크 기술 타당성 검증(PoC) — 현재 스프린트를 애자일 방식으로 진행 중</p>
      <div class="card-foot"><span class="status-tag status-now">진행 중</span></div>
    </div>

    <div class="milestone-card p4">
      <div class="card-head">
        <div class="card-head-left"><span class="phase-badge">4단계</span></div>
        <span class="period"><span class="period-ym"><span class="period-y">26</span><span class="period-dot">.</span><span class="period-m">10</span></span><span class="period-sep">~</span><span class="period-ym period-end"><span class="period-y">27</span><span class="period-dot">.</span><span class="period-m">03</span></span></span>
      </div>
      <div class="card-title">JTGS 프로토타입 개발</div>
      <p class="card-desc">주요소관리시스템 프로토타입, 템플릿·스토리보드 완성</p>
      <div class="card-foot"><span class="status-tag status-next">예정</span></div>
    </div>

    <div class="milestone-card p5">
      <div class="card-head">
        <div class="card-head-left"><span class="phase-badge">5단계</span></div>
        <span class="period"><span class="period-ym"><span class="period-y">27</span><span class="period-dot">.</span><span class="period-m">04</span></span><span class="period-sep">~</span><span class="period-ym period-end"><span class="period-y">27</span><span class="period-dot">.</span><span class="period-m">06</span></span></span>
      </div>
      <div class="card-title">시스템 안정화</div>
      <p class="card-desc">프로토타입 운영 안정화 및 품질·성능 검증</p>
      <div class="card-foot"><span class="status-tag status-next">예정</span></div>
    </div>

    <div class="milestone-card p6">
      <div class="card-head">
        <div class="card-head-left"><span class="phase-badge">6단계</span></div>
        <span class="period"><span class="period-ym"><span class="period-y">27</span><span class="period-dot">.</span><span class="period-m">07</span></span><span class="period-sep">~</span><span class="period-ym period-end"><span class="period-y">27</span><span class="period-dot">.</span><span class="period-m">08</span></span></span>
      </div>
      <div class="card-title">3PL · 유통물류 전환 준비</div>
      <p class="card-desc">3PL/유통물류 전환 준비 및 현업 요구사항 반영</p>
      <div class="card-foot"><span class="status-tag status-next">예정</span></div>
    </div>

    <div class="milestone-card p7 span2">
      <div class="card-head">
        <div class="card-head-left"><span class="phase-badge">7단계</span></div>
        <span class="period"><span class="period-ym"><span class="period-y">27</span><span class="period-dot">.</span><span class="period-m">09</span></span><span class="period-sep">~</span></span>
      </div>
      <div class="card-title">3PL · 유통물류 본 전환</div>
      <p class="card-desc">3PL 전환 및 유통물류 전환 본격 개발 — 차세대 FaSS 플랫폼 단계적 롤아웃 완료</p>
      <div class="card-foot"><span class="status-tag status-next">예정</span></div>
    </div>
  </div>
</div>

<div class="bottom-bar">
  <strong>전환 경로</strong> 주유소(JTGS) → 프로토타입 → 3PL · 유통물류 단계적 전환
</div>`;

export default function Slide17() {
  return (
    <SlideCanvas slideId={18} motion="timeline" motionTier="medium">
      <div className="slide-root fluent-slide">
        <div dangerouslySetInnerHTML={{ __html: TITLE_HTML }} />
        <Slide17Progress />
        <div dangerouslySetInnerHTML={{ __html: CONTENT_HTML }} />
      </div>
    </SlideCanvas>
  );
}
