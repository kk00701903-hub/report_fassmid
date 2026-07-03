"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide16WorkflowFlow from "@/components/slides/Slide16WorkflowFlow";
import "./styles/Slide16.css";

export default function Slide16() {
  return (
    <SlideCanvas slideId={16} motion="pipeline" motionTier="medium">
      <div className="slide fluent-slide wf-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">AI WORKFLOW</span>
            <h1>AI 협력 개발 워크플로우 (AI-Augmented)</h1>
          </div>
          <div className="line" />
        </div>

        <div className="body">
          <Slide16WorkflowFlow />
        </div>
      </div>
    </SlideCanvas>
  );
}
