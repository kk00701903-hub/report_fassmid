"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide41.css";

const SLIDE_HTML = `<div class="section-slide-root section-slide-glossary">
  <div class="bg-grid-overlay"></div>
  <div class="bg-glow-circle"></div>
  <div class="bg-left-bar"></div>
  <div class="section-part-number">G</div>
  <div class="section-part-label">DIGITAL INSIGHT</div>
  <div class="section-title-ko">Digital Insight Glossary</div>
  <div class="section-title-en">CEO · C-Level Primer — 핵심 용어 풀이</div>
  <div class="section-divider-line"></div>
  <div class="section-topics-list">
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">추진 방향성 설명 ① — 3Tier 구조</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">추진 방향성 설명 ② — 도커 / 컨테이너</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">추진 방향성 설명 ③ — MSA 구조</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">핵심용어집 ④ — CDC 방식</span>
    </div>
  </div>
</div>`;

export default function Slide41() {
  return (
    <SlideCanvas slideId={41} motion="part" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
