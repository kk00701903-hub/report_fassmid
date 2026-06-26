"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide27.css";

const SLIDE_HTML = `<div class="engine-slide-root">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">BUSINESS INNOVATION</span>
      <h1 class="title-main">비즈니스 혁신1: 차세대 영업 핵심 IT 엔진 보유</h1>
    </div>
    <p class="sub">차세대 웹 아키텍처 기반 — 영업 경쟁력 · 운영 효율 · 데이터 의사결정 · 안정성 · FinOps 5대 전략</p>
    <div class="line"></div>
  </div>

  <div class="engine-main-content">
    <div class="engine-focus-wrapper">
      <div class="engine-highlight-left">
        <div class="engine-icon-box"><i class="fas fa-rocket"></i></div>
        <div class="engine-label-top">Core IT Engine</div>
        <div class="engine-value-main">차세대 영업<br/><span class="engine-value-accent">핵심 IT 엔진</span></div>
        <p class="engine-tagline">기술 자산을 수익 창출 · 민첩성 · 안정성 · 비용 효율의 경영 가치로 전환</p>
        <div class="engine-pill-row">
          <span class="engine-pill"><i class="fas fa-cubes"></i>모듈형 배포</span>
          <span class="engine-pill"><i class="fas fa-plug"></i>API 통합</span>
          <span class="engine-pill"><i class="fas fa-shield-halved"></i>Zero-Defect</span>
          <span class="engine-pill"><i class="fas fa-coins"></i>FinOps</span>
        </div>
      </div>
      <div class="engine-description-right">
        <h2 class="engine-desc-title">5대 전략 프레임워크</h2>
        <p class="engine-desc-body">
          차세대 웹 아키텍처는 기능 단위 모듈화 배포, 최신 프레임워크 기반 성능 개선, 유연한 API·데이터 연동,
          무결점(Zero-Defect) 품질 통제, FinOps 기반 클라우드 비용 최적화를 하나의 IT 엔진으로 통합합니다.
          시장 변화에 즉각 대응하고, 운영 효율과 데이터 기반 의사결정, 시스템 안정성, 경영 효율화를 동시에 실현하는
          FaSS 차세대 플랫폼의 비즈니스 혁신 기반입니다.
        </p>
      </div>
    </div>

    <div class="engine-evidence-grid">
      <div class="engine-evidence-card s1">
        <div class="engine-card-icon-box"><i class="fas fa-bolt"></i></div>
        <div class="engine-card-text-group">
          <div class="engine-card-num">전략 1</div>
          <div class="engine-card-heading">시장 경쟁력 · 민첩성 확보</div>
          <div class="engine-card-subtext">모듈화된 배포로 시장·고객 요구에 즉각 대응, 비즈니스 기회 선점</div>
          <div class="engine-card-accent-label">프로젝트 성공률 제고</div>
        </div>
      </div>
      <div class="engine-evidence-card s2">
        <div class="engine-card-icon-box"><i class="fas fa-gauge-high"></i></div>
        <div class="engine-card-text-group">
          <div class="engine-card-num">전략 2</div>
          <div class="engine-card-heading">기술 부채 해소 · 업무 효율</div>
          <div class="engine-card-subtext">최신 웹 프레임워크로 응답 속도 개선, 실무 생산성·운영비 절감</div>
          <div class="engine-card-accent-label">전사적 비용 절감 동력</div>
        </div>
      </div>
      <div class="engine-evidence-card s3">
        <div class="engine-card-icon-box"><i class="fas fa-chart-line"></i></div>
        <div class="engine-card-text-group">
          <div class="engine-card-num">전략 3</div>
          <div class="engine-card-heading">데이터 기반 의사결정</div>
          <div class="engine-card-subtext">API 통합·데이터 연동으로 파편화 데이터를 실시간 가시화</div>
          <div class="engine-card-accent-label">전략적 플랫폼 위상 강화</div>
        </div>
      </div>
      <div class="engine-evidence-card s4">
        <div class="engine-card-icon-box"><i class="fas fa-shield-virus"></i></div>
        <div class="engine-card-text-group">
          <div class="engine-card-num">전략 4</div>
          <div class="engine-card-heading">리스크 최소화 · 안정성</div>
          <div class="engine-card-subtext">Zero-Defect 품질 통제로 장애 요인 사전 차단, 비즈니스 연속성 보장</div>
          <div class="engine-card-accent-label">이해관계자 신뢰 확보</div>
        </div>
      </div>
      <div class="engine-evidence-card s5">
        <div class="engine-card-icon-box"><i class="fas fa-piggy-bank"></i></div>
        <div class="engine-card-text-group">
          <div class="engine-card-num">전략 5</div>
          <div class="engine-card-heading">클라우드 예산 최적화</div>
          <div class="engine-card-subtext">FinOps 관점 예산 절감 훈련·운영 프로세스 최적화 추진</div>
          <div class="engine-card-accent-label">경영 성과·비용 효율 직결</div>
        </div>
      </div>
    </div>
  </div>
</div>`;

export default function Slide27() {
  return (
    <SlideCanvas slideId={27} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
