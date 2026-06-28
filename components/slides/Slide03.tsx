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
            <h1>IT 시스템 이해하기 — 프론트엔드 · WAS · DB</h1>
          </div>
          <p className="sub">
            사용자 화면(브라우저)에서 검색·결과 확인까지, 요청이 프론트엔드·WAS·DB를 거쳐 처리되는 흐름을
            한눈에 봅니다.
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <Slide03ArchDiagram />

          <div className="arch-notes">
            <div className="cloud-note">
              <div className="cloud-note-icon">
                <i className="fas fa-cloud" />
              </div>
              <p>
                <strong>클라우드(Cloud)란?</strong> 프론트엔드·WAS·DB 중 <strong>하나 이상</strong>을 회사
                내부가 아닌 <strong>외부 전문 업체</strong>에 맡겨 운영·관리하는 방식입니다. (예: DB만 AWS
                RDS, WAS만 클라우드 호스팅 등)
              </p>
            </div>
            <div className="scope-summary">
              <span className="scope-pill scope-pill--fe">프론트엔드</span>
              <span className="scope-pill scope-pill--was">WAS</span>
              <span className="scope-pill scope-pill--db">DB</span>
              <span className="scope-summary-text">세 계층 모두 FaSS 플랫폼의 핵심 구축·고도화 대상입니다.</span>
            </div>
          </div>
        </div>

        <div className="footer">
          <strong>이후 장표:</strong> API · MSA · 보안 · AI 등은 이 구조를 <strong>확장·연결</strong>하는
          개념입니다. 클라우드는 위 세 계층 중 일부를 외부에 두는 <strong>운영 방식</strong>입니다.
        </div>
      </div>
    </SlideCanvas>
  );
}
