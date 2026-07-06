"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide28.css";

const SLIDE_HTML = `<div class="engine-slide-root fluent-slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <h1 class="title-main">비즈니스 혁신1: 차세대 영업 핵심 IT 엔진 보유</h1>
    </div>
    <p class="sub">당사 차세대 웹프레임워크 기술을 영업의 새로운 승부수로 장착하여 고부가가치 비지니스를 견인하겠습니다.</p>
    <div class="line"></div>
  </div>

  <div class="engine-main-content">
    <div class="engine-focus-wrapper">
      <div class="engine-highlight-left">
        <div class="engine-hero-deco" aria-hidden="true">
          <span class="engine-hero-deco__orb engine-hero-deco__orb--1"></span>
          <span class="engine-hero-deco__orb engine-hero-deco__orb--2"></span>
          <span class="engine-hero-deco__ring"></span>
          <span class="engine-hero-deco__slash"></span>
          <span class="engine-hero-deco__grid"></span>
        </div>
        <div class="engine-hero-body">
        <div class="engine-icon-box"><i class="fas fa-rocket"></i></div>
        <div class="engine-label-top">Core IT Engine</div>
        <div class="engine-value-main">차세대 영업<br/><span class="engine-value-accent">핵심 IT 엔진</span></div>
        <p class="engine-tagline">기술 자산을 수익 창출 · 민첩성 · 안정성 · 비용 효율의 경영 가치로 전환</p>
        <div class="engine-pill-row">
          <span class="engine-pill"><i class="fas fa-cubes"></i>모듈형 배포</span>
          <span class="engine-pill"><i class="fas fa-plug"></i>API 통합</span>
          <span class="engine-pill"><i class="fas fa-shield-halved"></i>Zero-Defect</span>
          <span class="engine-pill"><i class="fas fa-cloud"></i>Cloud-Ready</span>
        </div>
        </div>
      </div>
      <div class="engine-description-right">
        <h2 class="engine-desc-title"><i class="fas fa-lightbulb" aria-hidden="true"></i> 사업 확장 관점</h2>
        <p class="engine-desc-body">
          당사 유통물류 및 3PL 고객사에 <strong>IT 컨설팅 개념</strong>으로 당사 차세대 프레임워크를 제공하고,
          <strong>AI 워크플로우 자동화 툴</strong>을 제공한다면 <strong>고부가가치 물류</strong>를 실현할 수 있으며
          <strong>락인(Lock-in) 효과</strong>도 기대할 수 있습니다.
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
        <div class="engine-card-icon-box"><i class="fas fa-cloud-arrow-up"></i></div>
        <div class="engine-card-text-group">
          <div class="engine-card-num">전략 5</div>
          <div class="engine-card-heading">Cloud-Ready · 확장성 확보</div>
          <div class="engine-card-subtext">Docker·K8s 표준 기반으로 기능·트래픽 단위 확장, ASP/SaaS 전환 대비</div>
          <div class="engine-card-accent-label">중장기 플랫폼 성장성</div>
        </div>
      </div>
    </div>
  </div>
</div>`;

export default function Slide27() {
  return (
    <SlideCanvas slideId={28} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
