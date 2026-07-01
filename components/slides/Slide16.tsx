"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide16WorkflowFlow from "@/components/slides/Slide16WorkflowFlow";
import "./styles/Slide16.css";

export default function Slide16() {
  return (
    <SlideCanvas slideId={16} motion="pipeline" motionTier="medium">
      <div className="slide fluent-slide wf-slide">
        <div className="title-region">
          <div className="title-row">
            <div className="title-bar" />
            <h1 className="title-text">AI-Augmented 개발 워크플로우</h1>
          </div>
          <p className="title-sub">
            기획·설계·AI 개발·통합·배포·검증까지 AI 도구가 연결된 End-to-End 개발 파이프라인
          </p>
          <div className="title-line" />
        </div>

        <div className="body">
          <Slide16WorkflowFlow />
        </div>
      </div>
    </SlideCanvas>
  );
}
