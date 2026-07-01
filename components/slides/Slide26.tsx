"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide26CircuitPipeline from "@/components/slides/Slide26CircuitPipeline";
import "./styles/Slide26.css";

export default function Slide26() {
  return (
    <SlideCanvas slideId={26} motion="pipeline" motionTier="medium">
      <div className="slide fluent-slide">
        <div className="title-region-wrapper">
          <div className="title-region-header">
            <div className="title-region-bar" />
            <h1 className="title-region-text">아키텍처 원칙 3: CI/CD 자동화 (DevOps · GitOps)</h1>
          </div>
          <div className="title-region-line" />
        </div>

        <div className="body">
          <Slide26CircuitPipeline />

          <div className="gitops-strip">
            <div className="gitops-icon">
              <i className="fas fa-arrows-rotate" />
            </div>
            <div className="gitops-text">
              <strong>GitOps 배포 흐름</strong>
              <p>
                GitLab 파이프라인이 검증된 이미지를 Nexus에 등록하면, Argo CD가 선언적 매니페스트를 감시하여 FaSS 운영
                환경에 자동 동기화합니다.
              </p>
            </div>
            <div className="gitops-flow">
              <span className="gf-item">Nexus Image</span>
              <i className="fas fa-arrow-right gf-arrow" />
              <span className="gf-item">Argo CD</span>
              <i className="fas fa-arrow-right gf-arrow" />
              <span className="gf-item">FaSS Runtime</span>
            </div>
          </div>
        </div>

        <div className="footer">
          <strong>핵심 원칙</strong> GitLab CI 단일 파이프라인 + Jenkins 보조 연동 — Quality Gate 통과 후에만 배포, 전
          구간 Webhook·감사 로그 추적
        </div>
      </div>
    </SlideCanvas>
  );
}
