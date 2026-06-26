"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide36.css";

const SLIDE_HTML = `<div class="roadmap-slide-root" style="overflow: hidden;">
<!-- Title Region -->
<div class="title-region-wrapper">
<div class="title-region-main">
<div class="title-region-bar"></div>
<h1 class="title-region-text">단계적 롤아웃 로드맵</h1>
</div>
<div class="title-region-line"></div>
</div>
<!-- Content Area -->
<div class="roadmap-content-container">
<!-- Strategy Summary & Visual Track -->
<div class="roadmap-strategy-summary-wrapper">
<div class="roadmap-strategy-card">
<div class="roadmap-strategy-icon">
<i class="fas fa-shield-halved"></i>
</div>
<div class="roadmap-strategy-text-group">
<span class="roadmap-strategy-label">목표 기간</span>
<span class="roadmap-strategy-desc">2027.03 주유소 관리시스템 프로토타입 Live → 7~8월 분석 → 3PL 선행 전환 → 2028.12 통합 완료</span>
</div>
</div>
<div style="flex: 2;padding: 8px 0;">
<div class="roadmap-visual-track-container">
<div class="roadmap-visual-track-line"></div>
<div class="roadmap-track-runner" aria-hidden="true"></div>
<div class="roadmap-step-node step-kickoff">
<div class="roadmap-node-circle"></div>
<span class="roadmap-kickoff-badge">LIVE</span>
<span class="roadmap-node-date">2027.03</span>
<span class="roadmap-node-label">주유소 관리<br/>프로토타입 Live</span>
</div>
<span class="roadmap-step-arrow" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
<div class="roadmap-step-node">
<div class="roadmap-node-circle"></div>
<span class="roadmap-node-date">2027.07~08</span>
<span class="roadmap-node-label">3PL·유통물류<br/>분석·요구사항</span>
</div>
<span class="roadmap-step-arrow" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
<div class="roadmap-step-node">
<div class="roadmap-node-circle gold"></div>
<span class="roadmap-node-date">2027.09~</span>
<span class="roadmap-node-label">3PL<br/>단계적 전환</span>
</div>
<span class="roadmap-step-arrow" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
<div class="roadmap-step-node">
<div class="roadmap-node-circle gold"></div>
<span class="roadmap-node-date">~2028.12</span>
<span class="roadmap-node-label">유통물류 전환<br/>· 시스템 통합</span>
</div>
</div>
</div>
</div>
<!-- Roadmap Table Area -->
<div class="roadmap-table-section-wrapper">
<div class="roadmap-table-container">
<div style="flex: 1;">
<table class="roadmap-data-table">
<colgroup>
<col style="width: 22%;"/>
<col style="width: 22%;"/>
<col style="width: 56%;"/>
</colgroup>
<thead>
<tr>
<th>이관 단계</th>
<th>목표 일정</th>
<th>주요 추진 내용 및 기대 효과</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<span class="roadmap-phase-badge">Phase 1</span>
<div style="font-weight: 600;">주유소 관리시스템 프로토타입 Live</div>
</td>
<td>
<span class="roadmap-schedule-text">2027년 3월</span>
</td>
<td>
<div class="roadmap-content-list">
<span class="roadmap-content-item highlight">2027년 3월 주유소(JTGS) 관리시스템 프로토타입 Live — 차세대 스택 실전 가동</span>
<span class="roadmap-content-item">SiteFramework 등 프레임워크 템플릿·AI 파이프라인 실전 검증 및 안정화</span>
<span class="roadmap-content-item">프로토타입 Live 이후 고도화·표준 템플릿 확정 — 본격 이관의 기술·조직 기반 마련</span>
</div>
</td>
</tr>
<tr>
<td>
<span class="roadmap-phase-badge">Phase 2</span>
<div style="font-weight: 600;">분석 · 요구사항 수렴</div>
</td>
<td>
<span class="roadmap-schedule-text">2027.07 ~ 2027.08</span>
</td>
<td>
<div class="roadmap-content-list">
<span class="roadmap-content-item highlight">3PL 시스템·유통물류 시스템 현행 분석 및 Gap·개선 방향 도출</span>
<span class="roadmap-content-item">현업·IT 요구사항 수렴 — 전환 범위·우선순위·통합 아키텍처 합의</span>
<span class="roadmap-content-item">단계적 롤아웃 상세 계획·Quality Gate 기준 확정</span>
</div>
</td>
</tr>
<tr>
<td>
<span class="roadmap-phase-badge">Phase 3</span>
<div style="font-weight: 600;">3PL 차세대 전환</div>
</td>
<td>
<span class="roadmap-schedule-text">2027.09 ~</span>
</td>
<td>
<div class="roadmap-content-list">
<span class="roadmap-content-item highlight">3PL 시스템부터 단계적 차세대 FaSS 플랫폼 전환 착수</span>
<span class="roadmap-content-item">검증된 프레임워크·AI 패턴을 3PL 업무 모듈에 순차 적용</span>
<span class="roadmap-content-item">모듈별 Quality Gate 통과 후 다음 범위 확대 — 상시 롤백 가능</span>
</div>
</td>
</tr>
<tr>
<td>
<span class="roadmap-phase-badge final">Phase 4</span>
<div style="font-weight: 600;">유통물류 전환 · 통합</div>
</td>
<td>
<span class="roadmap-schedule-text">~2028.12</span>
</td>
<td>
<div class="roadmap-content-list">
<span class="roadmap-content-item">유통물류 시스템 차세대 전환 병행·후속 추진</span>
<span class="roadmap-content-item highlight">3PL·유통물류 양 시스템 통합 — 단일 FaSS 플랫폼으로 업무·데이터 일원화</span>
<span class="roadmap-content-item">2028년 12월까지 단계적 롤아웃 완료 — 레거시 단계적 폐기 및 전사 표준 가동</span>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div style="margin-top: 13px;display: flex;align-items: center;gap: 6px 8px;">
<i class="fas fa-circle-info" style="color: var(--ppt-accent);font-size:13px;"></i>
<span style="font-size: 14px;color: var(--ppt-text-2);">
            3PL 선행 전환 → 유통물류 전환 → 양 시스템 통합. 각 단계 Quality Gate 통과 시에만 다음 단계 진행, 상시 롤백 가능 파이프라인 유지
          </span>
</div>
</div>
</div>
</div>`;

export default function Slide36() {
  return (
    <SlideCanvas slideId={36} motion="roadmap" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
