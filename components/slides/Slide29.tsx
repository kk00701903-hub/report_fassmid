"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide29.css";

const SMART_LOGISTICS_IMAGE =
  "https://agents-download.skywork.ai/image/rt/d6fd321f922784da7bb75669ba52eb67.jpg";

export default function Slide29() {
  return (
    <SlideCanvas slideId={29} motion="innovation" motionTier="medium" style={{ background: "#ffffff" }}>
      <div className="fass-slide-root">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">BUSINESS INNOVATION</span>
            <h1 className="title-main">비즈니스 혁신2: AI 지능형 물류 플랫폼으로의 전환</h1>
          </div>
          <p className="sub">수동 관리 중심의 시스템에서 AI 기반의 예측·자동화 체계로 전환하여, 물류 운영 효율과 관리 생산성을 극대화합니다.</p>
          <div className="line" />
        </div>

        <div className="fass-smart-logistics-content-wrapper">
          <div className="fass-smart-logistics-left-concept-block">
            <div className="fass-smart-logistics-paradigm-text-box">
              <span className="fass-smart-logistics-concept-label">Paradigm Shift</span>
              <p className="fass-smart-logistics-concept-description">
                단순 기록/조회 시스템에서
                <br />
                데이터 기반{" "}
                <span className="fass-smart-logistics-concept-highlight">예측 및 자동화 시스템</span>
                으로의 전환
              </p>
            </div>
            <div className="fass-smart-logistics-visual-image-box">
              <img alt="Smart Logistics Visual" src={SMART_LOGISTICS_IMAGE} />
            </div>
          </div>

          <div className="fass-smart-logistics-right-action-block">
            <div className="fass-smart-logistics-action-item-card">
              <div className="fass-smart-logistics-card-header">
                <div className="fass-smart-logistics-card-icon">
                  <i className="fas fa-window-maximize" aria-hidden="true" />
                </div>
                <h2 className="fass-smart-logistics-card-title">
                  적응형 웹 경험 (Adaptive Web Experience)
                </h2>
              </div>
              <div className="fass-smart-logistics-card-body">
                차세대 FaSS는 <b>웹(Next.js)</b> 기반으로 구성되어 AI 연동성이 뛰어납니다. 표준{" "}
                <b>REST/OpenAPI</b>를 다수 제공해 일반 사용자도 회사 데이터에 쉽게 접근하고, AI·업무
                앱이 동일 API로 물류·재고 데이터를 활용할 수 있습니다.
              </div>
              <div className="fass-smart-logistics-impact-badge">
                <i className="fas fa-plug" aria-hidden="true" />
                <span className="fass-smart-logistics-impact-text">표준 API 기반 · 데이터 접근 민주화</span>
              </div>
            </div>

            <div className="fass-smart-logistics-action-item-card">
              <div className="fass-smart-logistics-card-header">
                <div className="fass-smart-logistics-card-icon">
                  <i className="fas fa-brain" aria-hidden="true" />
                </div>
                <h2 className="fass-smart-logistics-card-title">AI 업무 어시스턴트 (RAG)</h2>
              </div>
              <div className="fass-smart-logistics-card-body">
                복잡한 3PL 계약서 및 무역 규정을 AI가 자동 검증하여 실무진의 서류 검토 리드타임을
                극강으로 단축합니다.
              </div>
              <div className="fass-smart-logistics-impact-badge">
                <i className="fas fa-bolt" aria-hidden="true" />
                <span className="fass-smart-logistics-impact-text">검토 리드타임 60% 이상 단축 예상</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
