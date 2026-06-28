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
      <span class="topic-text">IT 시스템 이해하기 — 웹 · 프론트엔드 · WAS · DB</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">핵심 용어집 ① — 클라우드 · 오픈소스 · API</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">MSA(마이크로서비스) — 아키텍처 전환 검토</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">CDC(Change Data Capture) — 데이터 동기화 전환</span>
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
