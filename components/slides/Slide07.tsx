"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide07ScopeHub from "@/components/slides/Slide07ScopeHub";
import "./styles/Slide07.css";

export default function Slide07() {
  return (
    <SlideCanvas slideId={7} motion="architecture" motionTier="medium">
      <div className="slide fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">PROJECT SCOPE</span>
            <h1>차세대 FaSS 구축 프로젝트 범위</h1>
          </div>
          <p className="sub">
            AI 생산성 혁신을 중심으로 <strong>기술 아키텍처</strong>가 유기적으로 연결되는 대형 엔터프라이즈
            플랫폼 생태계
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <div className="scope-banner">
            <i className="fas fa-layer-group" />
            <p>
              <strong>단순 화면 개편이 아닙니다.</strong> 수주·발주·정산·물류·유통 전 영역을 차세대 웹 표준과 AI
              협업 체제로 <strong>일괄 전환</strong>하는 전략 프로젝트입니다.
            </p>
          </div>

          <Slide07ScopeHub />

          <div className="pill-row">
            <span className="pill">
              <i className="fas fa-check" />
              19개 Mega-Sprint
            </span>
            <span className="pill">
              <i className="fas fa-check" />
              1.5년 · 핵심 7명 + AI 8
            </span>
            <span className="pill">
              <i className="fas fa-check" />
              3PL·유통물류 전사 전환
            </span>
            <span className="pill">
              <i className="fas fa-check" />
              ASP/SaaS 확장 가능 아키텍처
            </span>
          </div>
        </div>

        <div className="footer">
          <strong>프로젝트 성격:</strong> AI를 중심 허브로 각 기술 영역이 방사형으로 연결된{" "}
          <strong>대형 통합 플랫폼 구축</strong> — 이후 PART에서 각 영역을 상세히 다룹니다.
        </div>
      </div>
    </SlideCanvas>
  );
}
