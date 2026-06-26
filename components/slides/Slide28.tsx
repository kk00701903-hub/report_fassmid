"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide28.css";

const SLIDE_HTML = `<div class="roi-asset-slide-root" style="overflow: hidden;">
<!-- Non-Cover-Page Title Region -->
<div class="title-r">
<div class="title-row">
<div class="bar"></div>
<span class="badge">BUSINESS INNOVATION</span>
<h1 class="title-main">비즈니스 혁신3: 전략적 수익화 IT 플랫폼 확보</h1>
</div>
<p class="sub">내재화 기술 자산 가치 극대화 — ASP 수익화를 위한 전략적 IT 플랫폼</p>
<div class="line"></div>
</div>
<!-- Main Content Body -->
<div class="roi-asset-main-content">
<!-- Top Focus Statement Section -->
<div class="roi-asset-focus-wrapper">
<div class="roi-asset-highlight-left">
<div class="roi-asset-label-top">내재화 기술 자산 가치</div>
<div class="roi-asset-value-main">
            100 <span class="roi-asset-value-unit">억 원+</span>
</div>
<p class="roi-asset-tagline">IT 부서를 넘어, 회사의 핵심 수익 파이프라인(Profit Center)으로 격상</p>
</div>
<div class="roi-asset-description-right">
<h2 class="roi-asset-desc-title">비즈니스 모델의 근본적 전환</h2>
<p class="roi-asset-desc-body">
            대규모 외주 SI에 의존하던 과거 방식에서 탈피하여, 독자적인 기술 스택과 AI 에이전트를 결합한 차세대 FaSS 플랫폼을 완성했습니다. 이는 단순한 시스템 구축을 넘어, 유관 기업 및 중소 물류사에 즉각 공급 가능한 '패키지형 자산'을 확보했음을 의미합니다.
          </p>
</div>
</div>
<!-- Bottom Evidence Strip -->
<div class="roi-asset-evidence-strip">
<div class="roi-asset-evidence-card">
<div class="roi-asset-card-icon-box">
<i class="fas fa-shield-halved"></i>
</div>
<div class="roi-asset-card-text-group">
<div class="roi-asset-card-heading">외주 SI 비용 방어</div>
<div class="roi-asset-card-subtext">약 80억 원 규모의 SI 외주비를 내부 인력 및 AI로 대체</div>
<div class="roi-asset-card-accent-label">비용 절감 효과 극대화</div>
</div>
</div>
<div class="roi-asset-evidence-card">
<div class="roi-asset-card-icon-box">
<i class="fas fa-database"></i>
</div>
<div class="roi-asset-card-text-group">
<div class="roi-asset-card-heading">라이선스 비용 영구 절감</div>
<div class="roi-asset-card-subtext">Oracle → PostgreSQL 마이그레이션 및 오픈소스 표준화</div>
<div class="roi-asset-card-accent-label">수억 원 단위 고정비 제거</div>
</div>
</div>
<div class="roi-asset-evidence-card">
<div class="roi-asset-card-icon-box">
<i class="fas fa-money-bill-trend-up"></i>
</div>
<div class="roi-asset-card-text-group">
<div class="roi-asset-card-heading">ASP 수익화 모델 확보</div>
<div class="roi-asset-card-subtext">완성된 플랫폼을 구독형(ASP) 솔루션으로 패키지화</div>
<div class="roi-asset-card-accent-label">신규 매출 파이프라인 창출</div>
</div>
</div>
</div>
</div>
</div>`;

export default function Slide28() {
  return (
    <SlideCanvas motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
