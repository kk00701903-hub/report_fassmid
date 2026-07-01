"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide40.css";

const SLIDE_HTML = `<div class="fass-closing-slide-root fluent-slide">
  <div class="title-region-wrapper">
    <div class="title-horizontal-group">
      <div class="title-accent-bar"></div>
      <h1 class="title-main-text">맺음말</h1>
    </div>
    <p class="title-sub-text">로드맵을 넘어 — 완성 시 (주)제때가 그리는 차세대 디지털 운영의 모습</p>
    <div class="title-gradient-line"></div>
  </div>

  <div class="fass-closing-content-body">
    <div class="closing-visionary-left-group">
      <div class="vision-pillar-grid">
        <div class="vision-pillar-card" style="--vc:#0078d4">
          <div class="vision-pillar-icon"><i class="fas fa-layer-group"></i></div>
          <div class="vision-pillar-body">
            <div class="vision-pillar-tag">통합 플랫폼</div>
            <div class="vision-pillar-title">One FaSS — 3PL · 유통물류 · 영업이 하나로</div>
            <p class="vision-pillar-desc">파편화된 시스템이 단일 차세대 플랫폼으로 수렴합니다. API-First·실시간 데이터로 업무·의사결정이 끊김 없이 이어지는 통합 운영 체계가 완성됩니다.</p>
          </div>
        </div>
        <div class="vision-pillar-card" style="--vc:#ca5010">
          <div class="vision-pillar-icon"><i class="fas fa-robot"></i></div>
          <div class="vision-pillar-body">
            <div class="vision-pillar-tag">AI 네이티브 조직</div>
            <div class="vision-pillar-title">Human + Digital Worker — 24/7 협업 체계</div>
            <p class="vision-pillar-desc">TFT와 AI 디지털 워커가 상시 협업하고, 빌더형 인재가 직접 만들고·운영·개선합니다. 반복 업무는 AI, 판단·품질은 사람이 책임지는 지속 가능한 조직 모델입니다.</p>
          </div>
        </div>
        <div class="vision-pillar-card" style="--vc:#107c10">
          <div class="vision-pillar-icon"><i class="fas fa-cloud-arrow-up"></i></div>
          <div class="vision-pillar-body">
            <div class="vision-pillar-tag">진화 가능 아키텍처</div>
            <div class="vision-pillar-title">Cloud-Ready → K8s · MSA — 무중단으로 성장</div>
            <p class="vision-pillar-desc">모듈러 모놀리스에서 출발해 CDC·GitOps 기반으로 점진 확장합니다. 레거시와 공존하며 전환하고, 중장기적으로 클라우드·MSA로 무리 없이 진화하는 기술 기반이 갖춰집니다.</p>
          </div>
        </div>
        <div class="vision-pillar-card" style="--vc:#5c2d91">
          <div class="vision-pillar-icon"><i class="fas fa-coins"></i></div>
          <div class="vision-pillar-body">
            <div class="vision-pillar-tag">경영 · 사업 가치</div>
            <div class="vision-pillar-title">ASP 수익화 · FinOps · Zero-Defect 내재화</div>
            <p class="vision-pillar-desc">내재화된 기술 자산이 패키지·서비스로 확장 가능한 표준이 됩니다. 비용 효율·품질 통제·영업 경쟁력이 기술 투자와 직결되는 경영 엔진으로 완성됩니다.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="closing-visionary-right-group">
      <div class="closing-anchor-keyword-wrapper">
        <span class="closing-anchor-top-label">Completion Vision</span>
        <div class="closing-anchor-main-keyword">One FaSS</div>
        <div class="closing-anchor-accent-keyword">Platform</div>
      </div>
      <div class="closing-anchor-divider"></div>
      <div class="closing-anchor-stat-group">
        <span class="closing-anchor-stat-value closing-anchor-stat-value--accent">통합 · 지능 · 확장</span>
        <span class="closing-anchor-stat-label">완성 시 핵심 키워드</span>
      </div>
      <div class="closing-check-list">
        <div class="closing-check-item"><i class="fas fa-check"></i>전사 물류·유통 업무가 하나의 데이터·프로세스로 연결</div>
        <div class="closing-check-item"><i class="fas fa-check"></i>AI·자동화가 일상 운영에 스며든 디지털 조직</div>
        <div class="closing-check-item"><i class="fas fa-check"></i>레거시 퇴장과 신규 확장이 공존하는 진화형 아키텍처</div>
      </div>
      <p class="closing-vision-quote-text">
        「기술 프로젝트의 완료」가 아니라<br/><strong>지속 성장하는 디지털 운영 체계</strong>의 시작
      </p>
    </div>
  </div>

  <div class="closing-commitment-bar">
    <strong>TFT 실행 약속</strong>
    <span class="commit-pill"><i class="fas fa-calendar-check"></i>일정 ±1주</span>
    <span class="commit-pill"><i class="fas fa-shield-halved"></i>Quality Gate 100%</span>
    <span class="commit-pill"><i class="fas fa-rocket"></i>ASP 전개 가능 아키텍처</span>
  </div>
</div>`;

export default function Slide40() {
  return (
    <SlideCanvas slideId={40} motion="closing" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
