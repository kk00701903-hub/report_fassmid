"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide10.css";

const SLIDE_HTML = `<div class="fass-identity-slide-root fluent-slide" style="overflow: hidden;">
<!-- Non-Cover-Page Title Region -->
<div class="title-region-wrapper">
<div class="title-region-main">
<div class="title-region-bar"></div>
<h1 class="title-region-text">FaSS 플랫폼 아이덴티티</h1>
</div>
<div class="title-region-line"></div>
</div>
<!-- Main Body Content -->
<div class="fass-identity-main-container">
<!-- Left Flow Section -->
<div class="fass-identity-left-flow-section">
<div class="fass-identity-rail-vertical-line"></div>
<!-- F - Faster -->
<div class="fass-identity-value-item-row">
<div class="fass-identity-value-marker">
<span class="fass-identity-value-marker-letter">F</span>
</div>
<div class="fass-identity-value-text-block">
<div class="fass-identity-value-heading-group">
<span class="fass-identity-value-title">Faster</span>
<span class="fass-identity-value-subtitle">신속성</span>
</div>
<p class="fass-identity-value-description">
              신속한 개발 및 배포 환경을 구축하고, <span class="fass-identity-highlight-text">Next.js SSR</span> 도입을 통해 고객이 체감하는 응답 속도를 극대화합니다.
            </p>
</div>
</div>
<!-- a - Agile -->
<div class="fass-identity-value-item-row">
<div class="fass-identity-value-marker">
<span class="fass-identity-value-marker-letter">a</span>
</div>
<div class="fass-identity-value-text-block">
<div class="fass-identity-value-heading-group">
<span class="fass-identity-value-title">Agile</span>
<span class="fass-identity-value-subtitle">민첩성</span>
</div>
<p class="fass-identity-value-description">
              비즈니스 변화에 유연하게 대응하는 <span class="fass-identity-highlight-text">컨테이너 기반의 블록 조립형(모듈러)</span> 아키텍처를 지향합니다.
            </p>
</div>
</div>
<!-- S - Smarter -->
<div class="fass-identity-value-item-row">
<div class="fass-identity-value-marker">
<span class="fass-identity-value-marker-letter">S</span>
</div>
<div class="fass-identity-value-text-block">
<div class="fass-identity-value-heading-group">
<span class="fass-identity-value-title">Smarter</span>
<span class="fass-identity-value-subtitle">지능화</span>
</div>
<p class="fass-identity-value-description">
<span class="fass-identity-highlight-text">AI 기반의 지능형 운영</span>, 수요 예측 및 AI 코딩 에이전트를 통해 플랫폼 스스로 진화하는 시스템을 구축합니다.
            </p>
</div>
</div>
<!-- S - Stronger -->
<div class="fass-identity-value-item-row">
<div class="fass-identity-value-marker">
<span class="fass-identity-value-marker-letter">S</span>
</div>
<div class="fass-identity-value-text-block">
<div class="fass-identity-value-heading-group">
<span class="fass-identity-value-title">Stronger</span>
<span class="fass-identity-value-subtitle">강건함</span>
</div>
<p class="fass-identity-value-description">
              강력한 보안 체계(<span class="fass-identity-highlight-text">Stateless JWT</span>) 및 무중단 데이터 동기화를 통해 비즈니스 리스크를 제로화합니다.
            </p>
</div>
</div>
</div>
<!-- Right Vision Section -->
<div class="fass-identity-right-vision-section">
<div class="fass-identity-logo-info-card">
<div class="fass-identity-logo-visual-wrap">
<img alt="FASS 로고" class="fass-identity-logo-image" src="/report_fassmid/assets/slides/fass-logo.png"/>
</div>
<h2 class="fass-identity-logo-title">FaSS 로고 디자인 의미</h2>
<div class="fass-identity-logo-body-text">
            클라우드와 무한 궤도(Infinity), 상승 화살표가 결합된 형상으로 <span class="fass-identity-highlight-text">지속적 성장</span>과 <span class="fass-identity-highlight-text">클라우드 확장성</span>을 상징합니다.
            <br/><br/>
            (주)제때의 <span class="fass-identity-highlight-text">물류 비즈니스 연속성</span>과 한계 없는 <span class="fass-identity-highlight-text">외부 확장성</span>을 시각적으로 표현합니다.
          </div>
<div class="fass-identity-logo-keyword-tag">
<i class="fas fa-link" style="margin-right: 8px;"></i> 비즈니스 무한 확장
          </div>
</div>
</div>
</div>
</div>`;

export default function Slide10() {
  return (
    <SlideCanvas slideId={10} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
