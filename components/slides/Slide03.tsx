"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide03ArchDiagram from "@/components/slides/Slide03ArchDiagram";
import "./styles/Slide03.css";

export default function Slide03() {
  return (
    <SlideCanvas slideId={3} motion="architecture" motionTier="medium">
      <div className="slide fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">C-LEVEL PRIMER</span>
            <h1>기술 방향성 설명 ① — 3Tier 구조 (Web-WAS-DB)</h1>
          </div>
          <p className="sub">
            당사의 웹프레임워크는 크게 WEB · WAS · DB로 구분되며 전체 영역이 프로젝트 영역임
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <Slide03ArchDiagram />

          <div className="arch-notes">
            <div className="cloud-note">
              <div className="cloud-note-icon">
                <i className="fas fa-link" />
              </div>
              <p>
                <strong>jette.co.kr 접속 시:</strong> 브라우저가 <strong>Web Server(프론트엔드)</strong>에서
                화면을 받고, 물류 조회·주문 등 업무는 <strong>WAS</strong>가 처리하며, 실제 데이터는{" "}
                <strong>DB</strong>에 저장·조회됩니다.
              </p>
            </div>
            <div className="scope-summary">
              <span className="scope-pill scope-pill--fe">Web Server</span>
              <span className="scope-pill scope-pill--was">WAS</span>
              <span className="scope-pill scope-pill--db">DB</span>
              <span className="scope-summary-text">
                차세대 FaSS 플랫폼은 위 세 계층을 전면 재구축·고도화합니다.
              </span>
            </div>
          </div>
        </div>

        <div className="footer">
          <strong>이후 장표:</strong> Docker · MSA · CDC 등은 이 5단계 구조 위에{" "}
          <strong>배포·분리·동기화</strong> 개념을 더하는 것입니다.
        </div>
      </div>
    </SlideCanvas>
  );
}
