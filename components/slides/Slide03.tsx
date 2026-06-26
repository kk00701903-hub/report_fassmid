"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide03.css";

const SLIDE_HTML = `<div class="slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">C-LEVEL PRIMER</span>
      <h1>IT 시스템 이해하기 — 웹 · WAS · DB</h1>
    </div>
    <p class="sub">사용자 화면(프론트엔드)과 서버(백엔드)가 어떻게 연결되는지, 그리고 본 프로젝트가 담당하는 영역을 한눈에 봅니다.</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="arch-diagram">
      <!-- 프론트엔드 영역 -->
      <div class="arch-zone arch-zone--fe">
        <div class="arch-zone-label">
          <span class="arch-zone-line"></span>
          <span>프론트엔드 (Front-End)</span>
          <span class="arch-zone-line"></span>
        </div>
        <div class="arch-fe-stack">
          <div class="browser-mock">
            <div class="browser-chrome">
              <span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>
            </div>
            <div class="browser-body browser-body--search">
              <span class="browser-input">컴퓨터</span>
              <span class="browser-btn">검색</span>
            </div>
            <div class="arch-step-badge">① 검색</div>
          </div>
          <div class="browser-mock">
            <div class="browser-chrome">
              <span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>
            </div>
            <div class="browser-body browser-body--result">
              <span class="browser-result">Computer</span>
            </div>
            <div class="arch-step-badge">④ 결과확인</div>
          </div>
        </div>
      </div>

      <!-- 요청 · 응답 화살표 -->
      <div class="arch-mid-flow">
        <div class="arch-flow-row arch-flow-row--req">
          <span class="arch-flow-label">② 요청</span>
          <span class="arch-flow-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        <div class="arch-flow-row arch-flow-row--res">
          <span class="arch-flow-arrow"><i class="fas fa-arrow-left"></i></span>
          <span class="arch-flow-label">③ 응답</span>
        </div>
      </div>

      <!-- 백엔드 영역 — 구축 범위 강조 -->
      <div class="arch-zone arch-zone--be arch-zone--scope">
        <div class="scope-ribbon"><i class="fas fa-bullseye"></i> 본 프로젝트 구축 영역 — Web · WAS · DB</div>
        <div class="arch-zone-label arch-zone-label--be">
          <span class="arch-zone-line"></span>
          <span>백엔드 (Back-End)</span>
          <span class="arch-zone-line"></span>
        </div>
        <div class="arch-be-row">
          <div class="arch-server arch-server--web">
            <div class="server-icon server-icon--web">
              <div class="server-blade"></div>
              <div class="server-blade"></div>
              <div class="server-blade"></div>
            </div>
            <div class="server-name">Web Server</div>
            <div class="server-desc">웹 · 정적·화면 전달</div>
          </div>
          <div class="arch-connector"><i class="fas fa-exchange-alt"></i></div>
          <div class="arch-server arch-server--was">
            <div class="server-icon server-icon--was">
              <div class="server-blade"></div>
              <div class="server-blade"></div>
              <div class="server-blade"></div>
            </div>
            <div class="server-name">WAS</div>
            <div class="server-desc">업무 로직 · API</div>
          </div>
          <div class="arch-connector"><i class="fas fa-exchange-alt"></i></div>
          <div class="arch-server arch-server--db">
            <div class="server-icon server-icon--db">
              <div class="db-cylinder">
                <div class="db-top"></div>
                <div class="db-body"></div>
              </div>
            </div>
            <div class="server-name">DB</div>
            <div class="server-desc">데이터 저장소</div>
          </div>
        </div>
      </div>
    </div>

    <div class="arch-notes">
      <div class="cloud-note">
        <div class="cloud-note-icon"><i class="fas fa-cloud"></i></div>
        <p><strong>클라우드(Cloud)란?</strong> 웹·WAS·DB 중 <strong>하나 이상</strong>을 회사 내부가 아닌 <strong>외부 전문 업체</strong>에 맡겨 운영·관리하는 방식입니다. (예: DB만 AWS RDS, WAS만 클라우드 호스팅 등)</p>
      </div>
      <div class="scope-summary">
        <span class="scope-pill scope-pill--web">Web</span>
        <span class="scope-pill scope-pill--was">WAS</span>
        <span class="scope-pill scope-pill--db">DB</span>
        <span class="scope-summary-text">세 계층 모두 FaSS 플랫폼의 핵심 구축·고도화 대상입니다.</span>
      </div>
    </div>
  </div>

  <div class="footer">
    <strong>이후 장표:</strong> API · MSA · 보안 · AI 등은 이 구조를 <strong>확장·연결</strong>하는 개념입니다. 클라우드는 위 세 계층 중 일부를 외부에 두는 <strong>운영 방식</strong>입니다.
  </div>
</div>`;

export default function Slide03() {
  return (
    <SlideCanvas slideId={3} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
