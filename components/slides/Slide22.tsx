"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide22.css";

const SLIDE_HTML = `<div class="section-slide-root">
  <div class="bg-grid-overlay"></div>
  <div class="bg-glow-circle"></div>
  <div class="bg-left-bar"></div>
  <div class="section-part-number">03</div>
  <div class="section-part-label">PART 03</div>
  <div class="section-title-ko">기술 스택 및 아키텍처</div>
  <div class="section-title-en">Tech Stack &amp; Architecture</div>
  <div class="section-divider-line"></div>
  <div class="section-topics-list">
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">핵심 기술 스택</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">아키텍처 원칙 1: 모듈러 모놀리스</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">아키텍처 원칙 2: 무중단 데이터 동기화</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">아키텍처 원칙 3: CI/CD 자동화 (DevOps · GitOps)</span>
    </div>
  </div>
</div>`;

export default function Slide21() {
  return (
    <SlideCanvas slideId={22} motion="part" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
