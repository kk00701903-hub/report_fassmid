"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide02.css";

const SLIDE_HTML = `<div class="section-slide-root">
  <div class="bg-grid-overlay"></div>
  <div class="bg-glow-circle"></div>
  <div class="bg-left-bar"></div>
  <div class="section-part-number">01</div>
  <div class="section-part-label">PART 01</div>
  <div class="section-title-ko">전략적 비전 및 목표</div>
  <div class="section-title-en">Strategic Vision &amp; Objectives</div>
  <div class="section-divider-line"></div>
  <div class="section-topics-list">
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">IT 시스템 이해하기 — 웹 · 프론트엔드 · WAS · DB</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
          <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">핵심 용어집 ① — 클라우드 · 오픈소스 · API</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">핵심 용어집 ② — MSA · 모듈러 모놀리스 · Docker · Kubernetes</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">핵심 용어집 ③ — DevOps · CI/CD · CDC · AI · 품질·비용</span>
    </div>
      <span class="topic-text">차세대 FaSS 구축 프로젝트 범위</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">디지털 트렌드 — IT 업계 트렌드 (MSA · Cloud · Open Source · AI)</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">디지털 트렌드 — AI 디지털 워커 (AI Digital Worker)</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">FaSS 플랫폼 아이덴티티</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">Executive Summary - FaSS 플랫폼 구축</span>
    </div>
  </div>
</div>`;

export default function Slide02() {
  return (
    <SlideCanvas motion="part" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
