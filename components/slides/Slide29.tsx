"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide29.css";

const SLIDE_HTML = `<div class="fass-slide-root fluent-slide">
<div class="title-r">
  <div class="title-row">
    <div class="bar"></div>
    <span class="badge">BUSINESS INNOVATION</span>
    <h1 class="title-main">비즈니스 혁신2: AI 지능형 물류 플랫폼으로의 전환</h1>
  </div>
  <p class="sub">단순 기록/조회에서 데이터 기반 예측·자동화 시스템으로의 전환</p>
  <div class="line"></div>
</div>

<div class="fass-smart-logistics-content-wrapper">
  <div class="fass-smart-logistics-left-concept-block">
    <div class="fass-smart-logistics-paradigm-text-box">
      <span class="fass-smart-logistics-concept-label">Paradigm Shift</span>
      <p class="fass-smart-logistics-concept-description">
        단순 기록/조회 시스템에서<br/>
        데이터 기반 <span class="fass-smart-logistics-concept-highlight">예측 및 자동화 시스템</span>으로의 전환
      </p>
    </div>
    <div class="fass-smart-logistics-visual-image-box">
      <img alt="Smart Logistics Visual" src="https://agents-download.skywork.ai/image/rt/d6fd321f922784da7bb75669ba52eb67.jpg"/>
    </div>
  </div>

  <div class="fass-smart-logistics-right-action-block">
    <div class="fass-smart-logistics-action-item-card">
      <div class="fass-smart-logistics-card-header">
        <div class="fass-smart-logistics-card-icon">
          <i class="fas fa-window-maximize"></i>
        </div>
        <h2 class="fass-smart-logistics-card-title">적응형 웹 경험 (Adaptive Web Experience)</h2>
      </div>
      <div class="fass-smart-logistics-card-body">
        차세대 FaSS는 <b>웹(Next.js)</b> 기반으로 구성되어 AI 연동성이 뛰어납니다.
        표준 <b>REST/OpenAPI</b>를 다수 제공해 일반 사용자도 회사 데이터에 쉽게 접근하고,
        AI·업무 앱이 동일 API로 물류·재고 데이터를 활용할 수 있습니다.
      </div>
      <div class="fass-smart-logistics-impact-badge">
        <i class="fas fa-plug"></i>
        <span class="fass-smart-logistics-impact-text">표준 API 기반 · 데이터 접근 민주화</span>
      </div>
    </div>

    <div class="fass-smart-logistics-action-item-card">
      <div class="fass-smart-logistics-card-header">
        <div class="fass-smart-logistics-card-icon">
          <i class="fas fa-brain"></i>
        </div>
        <h2 class="fass-smart-logistics-card-title">AI 업무 어시스턴트 (RAG)</h2>
      </div>
      <div class="fass-smart-logistics-card-body">
        복잡한 3PL 계약서 및 무역 규정을 AI가 자동 검증하여 실무진의 서류 검토 리드타임을 극강으로 단축합니다.
      </div>
      <div class="fass-smart-logistics-impact-badge">
        <i class="fas fa-bolt"></i>
        <span class="fass-smart-logistics-impact-text">검토 리드타임 60% 이상 단축 예상</span>
      </div>
    </div>
  </div>
</div>
</div>`;

export default function Slide29() {
  return (
    <SlideCanvas slideId={29} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
