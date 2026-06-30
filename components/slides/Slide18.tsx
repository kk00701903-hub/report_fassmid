"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide17Progress from "@/components/slides/Slide17Progress";
import Slide18MilestoneBoard from "@/components/slides/Slide18MilestoneBoard";
import "./styles/Slide18.css";

const TITLE_HTML = `<div class="title-region">
  <div class="title-header">
    <div class="title-bar"></div>
    <h1 class="title-main">프로젝트 진행경과 마일스톤</h1>
  </div>
  <div class="title-sub">FaSS 차세대 플랫폼 구축 — 7단계 로드맵</div>
  <div class="title-line"></div>
</div>`;

const FOOTER_HTML = `<div class="bottom-bar">
  <strong>전환 경로</strong> 주유소(JTGS) → 프로토타입 → 3PL · 유통물류 단계적 전환
</div>`;

export default function Slide17() {
  return (
    <SlideCanvas slideId={18} motion="timeline" motionTier="medium">
      <div className="slide-root fluent-slide">
        <div dangerouslySetInnerHTML={{ __html: TITLE_HTML }} />
        <Slide17Progress />
        <Slide18MilestoneBoard />
        <div dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />
      </div>
    </SlideCanvas>
  );
}
