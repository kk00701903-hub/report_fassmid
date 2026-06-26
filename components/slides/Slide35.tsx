"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide35.css";

const SLIDE_HTML = `<div class="section-slide-root">
  <div class="bg-grid-overlay"></div>
  <div class="bg-glow-circle"></div>
  <div class="bg-left-bar"></div>
  <div class="section-part-number">05</div>
  <div class="section-part-label">PART 05</div>
  <div class="section-title-ko">로드맵 및 미래 비전</div>
  <div class="section-title-en">Roadmap &amp; Future Vision</div>
  <div class="section-divider-line"></div>
  <div class="section-topics-list">
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">단계적 롤아웃 로드맵</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">중장기 목표 1: Kubernetes 운영</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">중장기 목표 2: MSA 전환</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">맺음말</span>
    </div>
  </div>
</div>`;

export default function Slide35() {
  return (
    <SlideCanvas slideId={35} motion="part" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
