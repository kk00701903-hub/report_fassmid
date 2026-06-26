"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide14.css";

const SLIDE_HTML = `<div class="slide fluent-slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge"><span class="pulse"></span> LIVE · 동시 진행</span>
      <h1>스프린트 운영현황</h1>
    </div>
    <p class="sub">FaSS Platform v3.0 — 19개 Mega-Sprint · ACTIVE 9 · 종료 2 · 예정 8</p>
    <div class="line"></div>
  </div>

  <div class="hero">
    <div class="hero-text">
      <div class="hero-title">스프린트 백로그 기준 <em>실제 운영 현황</em> · S01·S08 <em>종료</em> · S23 리포트 Tool 추가</div>
      <div class="hero-desc">별첨 스프린트/태스크 현황 반영 — 진행중(ACTIVE) · 예정(FUTURE) · 종료(CLOSED) 상태별 표시</div>
    </div>
    <div class="hero-stats">
      <div class="hstat"><div class="hstat-val">19</div><div class="hstat-lbl">TOTAL</div></div>
      <div class="hstat"><div class="hstat-val">9</div><div class="hstat-lbl">ACTIVE</div></div>
      <div class="hstat"><div class="hstat-val">2</div><div class="hstat-lbl">CLOSED</div></div>
    </div>
  </div>

  <div class="lanes">
    <div class="lane l0"></div>
    <div class="lane l1"></div>
    <div class="lane l2"></div>
    <div class="lane l3"></div>
    <div class="lane lx"></div>
  </div>
  <div class="lane-labels">
    <span>Phase 0</span><span>Phase 1</span><span>Phase 2</span><span>Phase 3</span><span>추가 과제</span>
  </div>

  <div class="board">
    <div class="phase-col p0">
      <div class="phase-head">
        <div class="phase-num">Phase 0</div>
        <div class="phase-name">기반 · 표준</div>
        <div class="phase-count">3 Sprints</div>
      </div>
      <div class="sprint-list">
        <div class="sprint s-done"><span class="sprint-id">S01</span><div class="sprint-body"><div class="sprint-title">개발 명명 규칙 표준화 작업</div><div class="sprint-meta"><span class="sprint-done"><i class="fas fa-check"></i>종료</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S02</span><div class="sprint-body"><div class="sprint-title">개발 환경 및 인프라 기반 구축</div><div class="sprint-meta"><span class="sprint-future"><i class="fas fa-clock"></i>예정</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S03</span><div class="sprint-body"><div class="sprint-title">공통 플랫폼 인프라</div><div class="sprint-meta"><span class="sprint-live"><i class="fas fa-circle"></i>진행중</span></div></div></div>
      </div>
    </div>

    <div class="phase-col p1">
      <div class="phase-head">
        <div class="phase-num">Phase 1</div>
        <div class="phase-name">인증/보안/권한</div>
        <div class="phase-count">4 Sprints</div>
      </div>
      <div class="sprint-list">
        <div class="sprint"><span class="sprint-id">S05</span><div class="sprint-body"><div class="sprint-title">SSO 연동 구축</div><div class="sprint-meta"><span class="sprint-future"><i class="fas fa-clock"></i>예정</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S07</span><div class="sprint-body"><div class="sprint-title">권한 관리</div><div class="sprint-meta"><span class="sprint-live"><i class="fas fa-circle"></i>진행중</span></div></div></div>
        <div class="sprint s-done"><span class="sprint-id">S08</span><div class="sprint-body"><div class="sprint-title">상태관리 및 API 통신 공통 모듈 개발</div><div class="sprint-meta"><span class="sprint-done"><i class="fas fa-check"></i>종료</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S15</span><div class="sprint-body"><div class="sprint-title">데이터 보안</div><div class="sprint-meta"><span class="sprint-future"><i class="fas fa-clock"></i>예정</span></div></div></div>
      </div>
    </div>

    <div class="phase-col p2">
      <div class="phase-head">
        <div class="phase-num">Phase 2</div>
        <div class="phase-name">아키텍처/공통</div>
        <div class="phase-count">5 Sprints</div>
      </div>
      <div class="sprint-list">
        <div class="sprint"><span class="sprint-id">S04</span><div class="sprint-body"><div class="sprint-title">공통 프레임워크 아키텍처</div><div class="sprint-meta"><span class="sprint-live"><i class="fas fa-circle"></i>진행중</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S09</span><div class="sprint-body"><div class="sprint-title">공통 UI 컴포넌트 라이브러리 개발</div><div class="sprint-meta"><span class="sprint-future"><i class="fas fa-clock"></i>예정</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S10</span><div class="sprint-body"><div class="sprint-title">비즈니스 컴포넌트 개발 가이드</div><div class="sprint-meta"><span class="sprint-live"><i class="fas fa-circle"></i>진행중</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S11</span><div class="sprint-body"><div class="sprint-title">멀티 컴퍼니 지원</div><div class="sprint-meta"><span class="sprint-future"><i class="fas fa-clock"></i>예정</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S16</span><div class="sprint-body"><div class="sprint-title">SSR-RSC 최적화 및 Web Vitals</div><div class="sprint-meta"><span class="sprint-future"><i class="fas fa-clock"></i>예정</span></div></div></div>
      </div>
    </div>

    <div class="phase-col p3">
      <div class="phase-head">
        <div class="phase-num">Phase 3</div>
        <div class="phase-name">데이터/통합/AI</div>
        <div class="phase-count">3 Sprints</div>
      </div>
      <div class="sprint-list">
        <div class="sprint"><span class="sprint-id">S12</span><div class="sprint-body"><div class="sprint-title">외부 인터페이스</div><div class="sprint-meta"><span class="sprint-future"><i class="fas fa-clock"></i>예정</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S14</span><div class="sprint-body"><div class="sprint-title">AI 연동 모듈 개발</div><div class="sprint-meta"><span class="sprint-live"><i class="fas fa-circle"></i>진행중</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S17</span><div class="sprint-body"><div class="sprint-title">CDC 데이터 동기화 파이프라인 구축</div><div class="sprint-meta"><span class="sprint-future"><i class="fas fa-clock"></i>예정</span></div></div></div>
      </div>
    </div>

    <div class="phase-col px">
      <div class="phase-head">
        <div class="phase-num">추가 과제</div>
        <div class="phase-name">전략·품질·Tool</div>
        <div class="phase-count">4 Sprints</div>
      </div>
      <div class="sprint-list">
        <div class="sprint"><span class="sprint-id">S18</span><div class="sprint-body"><div class="sprint-title">MSA 전환 로드맵 실행 (Phase 1→2→3)</div><div class="sprint-meta"><span class="sprint-tag">대규모</span><span class="sprint-live"><i class="fas fa-circle"></i>진행중</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S19</span><div class="sprint-body"><div class="sprint-title">표준 라이브러리 골든셋 (Golden Set)</div><div class="sprint-meta"><span class="sprint-tag">대규모</span><span class="sprint-live"><i class="fas fa-circle"></i>진행중</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S20</span><div class="sprint-body"><div class="sprint-title">SCA 도입 (Nexus IQ — OSS 공급망 보안)</div><div class="sprint-meta"><span class="sprint-tag">대규모</span><span class="sprint-live"><i class="fas fa-circle"></i>진행중</span></div></div></div>
        <div class="sprint"><span class="sprint-id">S23</span><div class="sprint-body"><div class="sprint-title">리포트 Tool 도입</div><div class="sprint-meta"><span class="sprint-live"><i class="fas fa-circle"></i>진행중</span></div></div></div>
      </div>
    </div>
  </div>

  <div class="footer">
    <strong>현황 기준:</strong> 별첨 스프린트 백로그 반영 — <strong>S01·S08 종료</strong>, ACTIVE 9건 (일반 6 + 대규모 S18~S20·S23), FUTURE 8건 예정
  </div>
</div>`;

export default function Slide13() {
  return (
    <SlideCanvas slideId={14} motion="timeline" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
