"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide27.css";

const SLIDE_HTML = `<div class="section-slide-root">
  <div class="bg-grid-overlay"></div>
  <div class="bg-glow-circle"></div>
  <div class="bg-left-bar"></div>
  <div class="section-part-number">04</div>
  <div class="section-part-label">PART 04</div>
  <div class="section-title-ko">혁신 및 검증</div>
  <div class="section-title-en">Innovation &amp; Validation</div>
  <div class="section-divider-line"></div>
  <div class="section-topics-list">
    <div class="section-topic-item"><div class="topic-dot"></div><span class="topic-text">비즈니스 혁신1: 차세대 영업 핵심 IT 엔진 보유</span></div>
    <div class="section-topic-item"><div class="topic-dot"></div><span class="topic-text">비즈니스 혁신2: AI 지능형 물류 플랫폼으로의 전환</span></div>
    <div class="section-topic-item"><div class="topic-dot"></div><span class="topic-text">비즈니스 혁신3: 전략적 수익화 IT 플랫폼 확보</span></div>
    <div class="section-topic-item"><div class="topic-dot"></div><span class="topic-text">비즈니스 혁신4: 프로토타입 엔진을 통한 아키텍처 내재화</span></div>
    <div class="section-topic-item"><div class="topic-dot"></div><span class="topic-text">비즈니스 혁신5: Zero-Defect 코드 품질 통제 체계</span></div>
    <div class="section-topic-item"><div class="topic-dot"></div><span class="topic-text">비즈니스 혁신6: FinOps 관점에서의 클라우드 전환 대비</span></div>
    <div class="section-topic-item"><div class="topic-dot"></div><span class="topic-text">비즈니스 혁신7: DGX·Claude Code 오케스트레이션 및 프로세스 지침</span></div>
    <div class="section-topic-item"><div class="topic-dot"></div><span class="topic-text">비즈니스 혁신8: 빌더형 인재 육성을 위한 전환</span></div>
  </div>
</div>`;

export default function Slide26() {
  return (
    <SlideCanvas slideId={27} motion="part" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
