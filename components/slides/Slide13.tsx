"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide13.css";

const SLIDE_HTML = `<div class="section-slide-root">
  <div class="bg-grid-overlay"></div>
  <div class="bg-glow-circle"></div>
  <div class="bg-left-bar"></div>
  <div class="section-part-number">02</div>
  <div class="section-part-label">PART 02</div>
  <div class="section-title-ko">프로젝트 진행 경과 및 방향성</div>
  <div class="section-title-en">Project Progress &amp; Direction</div>
  <div class="section-divider-line"></div>
  <div class="section-topics-list">
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">스프린트 운영현황</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">타사 프로젝트 비교</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">AI-Augmented 개발 워크플로우</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">프로젝트 진행경과 마일스톤</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">최적화 방안 1. AI 디지털 워커 활용</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">최적화 방안 2. 애자일 워룸 운영</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">최적화 방안 3. 사전 POC 운영</span>
    </div>
  </div>
</div>`;

export default function Slide12() {
  return (
    <SlideCanvas slideId={13} motion="part" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
