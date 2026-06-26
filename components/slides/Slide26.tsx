"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide26.css";

const SLIDE_HTML = `<div class="slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">BUSINESS INNOVATION</span>
      <h1 class="title-main">비즈니스 혁신1: 차세대 영업 핵심 IT 엔진 보유</h1>
    </div>
    <p class="sub">차세대 웹 아키텍처 기반 — 영업 경쟁력 · 운영 효율 · 데이터 의사결정 · 안정성 · FinOps 5대 전략</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="engine-panel">
      <div class="engine-icon"><i class="fas fa-rocket"></i></div>
      <div class="engine-label">Core IT Engine</div>
      <div class="engine-title">차세대 영업<br/>핵심 IT 엔진</div>
      <div class="engine-tags">
        <span class="etag"><i class="fas fa-cubes"></i>모듈형 배포</span>
        <span class="etag"><i class="fas fa-plug"></i>API 통합</span>
        <span class="etag"><i class="fas fa-shield-halved"></i>Zero-Defect</span>
        <span class="etag"><i class="fas fa-coins"></i>FinOps</span>
      </div>
    </div>

    <div class="strategies">
      <div class="strat s1">
        <div class="strat-num">1</div>
        <div class="strat-icon"><i class="fas fa-bolt"></i></div>
        <div class="strat-body">
          <div class="strat-title">전략 1. 시장 경쟁력 강화를 위한 민첩성 확보</div>
          <div class="strat-desc">차세대 웹 아키텍처는 기능 단위의 모듈화된 배포를 가능하게 합니다. 시장 환경 변화나 고객의 요구사항에 즉각적으로 대응함으로써, 비즈니스 기회 선점과 프로젝트 성공률 제고에 직접적으로 기여합니다.</div>
        </div>
      </div>
      <div class="strat s2">
        <div class="strat-num">2</div>
        <div class="strat-icon"><i class="fas fa-gauge-high"></i></div>
        <div class="strat-body">
          <div class="strat-title">전략 2. 기술 부채 해소를 통한 업무 효율 증대</div>
          <div class="strat-desc">최신 웹 프레임워크 기반의 고도화된 아키텍처는 시스템 응답 속도를 개선하여 실무자의 업무 생산성을 높입니다. 이는 시스템 운영 관점에서의 성능 향상을 넘어, 전사적 운영 비용 절감으로 이어지는 핵심 동력이 될 것입니다.</div>
        </div>
      </div>
      <div class="strat s3">
        <div class="strat-num">3</div>
        <div class="strat-icon"><i class="fas fa-chart-line"></i></div>
        <div class="strat-body">
          <div class="strat-title">전략 3. 데이터 기반의 의사결정 체계 구축</div>
          <div class="strat-desc">유연한 API 통합 및 데이터 연동 환경을 구축하여, 파편화된 기업 데이터를 실시간으로 가시화합니다. 이를 통해 경영진의 데이터 기반 의사결정을 지원하는 전략적 플랫폼으로서의 위상을 강화하겠습니다.</div>
        </div>
      </div>
      <div class="strat s4">
        <div class="strat-num">4</div>
        <div class="strat-icon"><i class="fas fa-shield-virus"></i></div>
        <div class="strat-body">
          <div class="strat-title">전략 4. 리스크 최소화 및 시스템 안정성 강화</div>
          <div class="strat-desc">'무결점(Zero-Defect) 코드 품질 통제 체계'를 통해 대형 프로젝트에서 발생할 수 있는 장애 요인을 사전에 차단하겠습니다. 기술적 안정성은 비즈니스 연속성을 보장하며, 고객과 이해관계자들에게 우리 기술 솔루션에 대한 강력한 신뢰를 제공할 것입니다.</div>
        </div>
      </div>
      <div class="strat s5">
        <div class="strat-num">5</div>
        <div class="strat-icon"><i class="fas fa-piggy-bank"></i></div>
        <div class="strat-body">
          <div class="strat-title">전략 5. 경영 효율화를 위한 클라우드 예산 최적화</div>
          <div class="strat-desc">FinOps 관점의 철저한 클라우드 예산 절감 훈련과 운영 프로세스 최적화를 추진하겠습니다. 단순 기술 도입을 넘어, 기술 자산이 실제적인 경영 성과와 비용 효율로 직결되도록 관리하겠습니다.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <strong>영업 핵심 IT 엔진:</strong> 기술 자산을 수익 창출·민첩성·안정성·비용 효율의 경영 가치로 전환하는 차세대 FaSS 플랫폼의 비즈니스 혁신 기반
  </div>
</div>`;

export default function Slide26() {
  return (
    <SlideCanvas motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
