"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide03.css";

const SLIDE_HTML = `<div class="slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">C-LEVEL PRIMER</span>
      <h1>IT 시스템 이해하기 — 웹 · 프론트엔드 · WAS · DB</h1>
    </div>
    <p class="sub">앞으로 소개될 기술·아키텍처 장표를 이해하기 위한 최소 개념 — 3층 구조로 읽으시면 됩니다.</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="stack">
      <div class="layer" style="--lc:var(--c-web)">
        <div class="layer-icon" style="color:var(--c-web)"><i class="fas fa-window-maximize"></i></div>
        <div class="layer-body">
          <div class="layer-name">웹(Web) · 프론트엔드</div>
          <div class="layer-en">Frontend — 사용자가 보는 화면</div>
          <p class="layer-desc">PC·모바일 브라우저에서 보이는 메뉴, 버튼, 표, 입력 화면입니다. 사용자 경험(UX)과 화면 반응 속도가 여기서 결정됩니다.</p>
          <div class="layer-tags"><span class="tag">화면·UI</span><span class="tag">브라우저</span><span class="tag">Next.js · React</span></div>
        </div>
      </div>
      <div class="arrow-down"><i class="fas fa-arrow-down"></i> 요청 · 응답</div>
      <div class="layer" style="--lc:var(--c-was)">
        <div class="layer-icon" style="color:var(--c-was)"><i class="fas fa-server"></i></div>
        <div class="layer-body">
          <div class="layer-name">WAS (웹 애플리케이션 서버)</div>
          <div class="layer-en">Backend Application — 업무 처리 엔진</div>
          <p class="layer-desc">수주·발주·정산 등 <strong>비즈니스 규칙을 실행</strong>하는 서버 프로그램입니다. 화면에서 '저장'을 누르면 WAS가 검증·계산·처리를 수행합니다.</p>
          <div class="layer-tags"><span class="tag">업무 로직</span><span class="tag">API</span><span class="tag">Spring · Java</span></div>
        </div>
      </div>
      <div class="arrow-down"><i class="fas fa-arrow-down"></i> 읽기 · 쓰기</div>
      <div class="layer" style="--lc:var(--c-db)">
        <div class="layer-icon" style="color:var(--c-db)"><i class="fas fa-database"></i></div>
        <div class="layer-body">
          <div class="layer-name">DB (데이터베이스)</div>
          <div class="layer-en">Database — 데이터 저장소</div>
          <p class="layer-desc">거래·재고·고객·정산 데이터가 <strong>안전하게 저장·조회</strong>되는 창고입니다. 시스템의 신뢰성과 연속성은 DB 설계·동기화 품질에 달려 있습니다.</p>
          <div class="layer-tags"><span class="tag">Oracle · PostgreSQL</span><span class="tag">트랜잭션</span><span class="tag">데이터 무결성</span></div>
        </div>
      </div>
    </div>

    <div class="right-col">
      <div class="flow-card">
        <div class="flow-title"><i class="fas fa-route"></i> 사용자 한 번의 업무 처리 흐름</div>
        <div class="flow-steps">
          <div class="flow-step"><span class="step-num">1</span><p class="step-text"><strong>웹</strong> — 담당자가 화면에서 수주 정보 입력</p></div>
          <div class="flow-step"><span class="step-num">2</span><p class="step-text"><strong>WAS</strong> — 재고·가격·권한 검증 후 업무 규칙 적용</p></div>
          <div class="flow-step"><span class="step-num">3</span><p class="step-text"><strong>DB</strong> — 수주 데이터 영구 저장, 타 시스템 연동 기준 확보</p></div>
          <div class="flow-step"><span class="step-num">4</span><p class="step-text"><strong>응답</strong> — 결과가 다시 웹 화면에 표시</p></div>
        </div>
      </div>
      <div class="analogy">
        <div class="analogy-title"><i class="fas fa-lightbulb"></i> 비유 — 식당 운영</div>
        <div class="analogy-row"><em>웹</em>홀·메뉴판 (고객이 보는 공간)</div>
        <div class="analogy-row"><em>WAS</em>주방·요리 (주문을 받아 요리하는 곳)</div>
        <div class="analogy-row"><em>DB</em>창고·재고 장부 (식자재·매출 기록 보관)</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <strong>이후 장표 안내:</strong> API·MSA·Cloud·보안·AI 등은 이 3층 구조를 <strong>확장·고도화</strong>한 개념입니다. 본 보고서의 아키텍처·기술 스택은 모두 이 흐름 위에 쌓입니다.
  </div>
</div>`;

export default function Slide03() {
  return (
    <SlideCanvas slideId={3} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
