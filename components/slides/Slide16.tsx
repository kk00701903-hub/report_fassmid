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
            TFT가 실제 사용하는 <strong>유료·상용 개발 툴</strong>의 역할과 활용을 단계별로 세부 설명하는
            페이지 — Jira · Figma · Claude Code · GitLab CI 등
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
