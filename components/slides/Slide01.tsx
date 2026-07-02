"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide01.css";

const SLIDE_HTML = `<div class="fass-report-slide-root" style="overflow: hidden;">
<div class="fass-background-image-container">
<img alt="FaSS Platform Background" class="fass-background-image-element" src="https://agents-download.skywork.ai/image/ppt/7467390590712455169/03c74e0b26cc32ff7c809ac5088e2e3b.png"/>
</div>
<div class="fass-content-overlay-layer">
<div class="fass-cover-top">
<div class="fass-top-header-section">
<div class="fass-company-brand-label">
<div class="fass-brand-accent-bar"></div>
          (주)제때
        </div>
</div>
<h1 class="fass-title-main-heading">
          차세대 <span>FaSS 플랫폼</span> 구축<br/>중간 보고
        </h1>
</div>
<div class="fass-cover-middle">
<p class="fass-subtitle-description-text">
          "AI와 결합된 디지털 물류의 표준, IT를 넘어 회사의 새로운 수익을 창출하다"
        </p>
<div class="fass-vision-statement-container">
<div class="fass-vision-slogan-label">Vision Slogan</div>
<div class="fass-vision-content-text">
          상용 솔루션의 종속을 끊고, AI와 글로벌 웹 표준으로 무장한 독자적 비즈니스 엔진의 성공적 안착
        </div>
</div>
</div>
<div class="fass-cover-bottom">
<div class="fass-footer-info-group">
<div class="fass-info-item-box">
<div class="fass-info-label-text">Department</div>
<div class="fass-info-value-text">차세대웹프레임워크 TFT</div>
</div>
<div class="fass-info-item-box">
<div class="fass-info-label-text">Date</div>
<div class="fass-info-value-text">2026. 7.7</div>
</div>
</div>
</div>
</div>
</div>`;

export default function Slide01() {
  return (
    <SlideCanvas slideId={1} motion="cover" motionTier="medium" style={{ background: "#0a0e1a" }}>
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
