"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide22.css";

const TOPICS = [
  "핵심 기술 스택",
  "아키텍처 원칙 1: 모듈러 모놀리스 (안정성 극대화)",
  "아키텍처 원칙 2: 무중단 데이터 동기화 (Zero-downtime migration)",
  "아키텍처 원칙 3: CI/CD 자동화 (DevOps · GitOps)",
];

export default function Slide22() {
  return (
    <SlideCanvas slideId={22} motion="part" motionTier="medium">
      <div className="section-slide-root">
        <div className="bg-grid-overlay" aria-hidden="true" />
        <div className="bg-glow-circle" aria-hidden="true" />
        <div className="bg-left-bar" aria-hidden="true" />
        <div className="section-part-number" aria-hidden="true">
          03
        </div>

        <div className="section-part-label">PART 03</div>
        <h1 className="section-title-ko">기술 스택 및 아키텍처</h1>
        <p className="section-title-en">Tech Stack &amp; Architecture</p>
        <div className="section-divider-line" aria-hidden="true" />

        <ul className="section-topics-list">
          {TOPICS.map((topic) => (
            <li key={topic} className="section-topic-item">
              <span className="topic-dot" aria-hidden="true" />
              <span className="topic-text">{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </SlideCanvas>
  );
}
