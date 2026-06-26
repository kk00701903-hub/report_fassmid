"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide16.css";

const SLIDE_HTML = `<div class="slide fluent-slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">보조 설명</span>
      <h1>End-to-End 개발 흐름 — 5단계 한눈에</h1>
    </div>
    <p class="sub">직전 장표(AI-Augmented 워크플로우)의 도구·단계를 경영진 관점에서 다시 정리합니다. <strong>기획 → 설계 → 개발 → 배포 → 검증</strong>이 하나의 연결된 흐름입니다.</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="phase-stack">
      <div class="phase" style="--pc:#FACC15">
        <div class="phase-num">1</div>
        <div class="phase-body">
          <div class="phase-name">기획 · 관리</div>
          <div class="phase-en">Plan — 무엇을, 언제까지 할 것인가</div>
          <p class="phase-desc">Epic·Story·Task로 업무를 쪼개고, 스프린트(2주 단위) 목표와 우선순위를 정합니다. <strong>일정·범위·담당</strong>이 여기서 확정됩니다.</p>
          <div class="phase-tools"><span class="tool">Jira</span><span class="tool">백로그</span><span class="tool">스프린트</span></div>
        </div>
      </div>
      <div class="arrow-down"><i class="fas fa-arrow-down"></i></div>
      <div class="phase" style="--pc:#A78BFA">
        <div class="phase-num">2</div>
        <div class="phase-body">
          <div class="phase-name">설계 · UI/UX</div>
          <div class="phase-en">Design — 화면과 데이터 구조를 정의</div>
          <p class="phase-desc">사용자가 볼 화면(메뉴·버튼·표)과 API·데이터 구조를 설계합니다. 개발 전 <strong>설계도·프로토타입</strong>을 확정해 rework를 줄입니다.</p>
          <div class="phase-tools"><span class="tool">Figma</span><span class="tool">Adobe</span><span class="tool">UI 스펙</span></div>
        </div>
      </div>
      <div class="arrow-down"><i class="fas fa-arrow-down"></i></div>
      <div class="phase" style="--pc:#00F0FF">
        <div class="phase-num">3</div>
        <div class="phase-body">
          <div class="phase-name">AI 개발</div>
          <div class="phase-en">Develop — 코드·테스트·문서 생성</div>
          <p class="phase-desc">Claude Code·DGX Spark가 설계 스펙·레거시 문서(RAG)를 참고해 코드·단위테스트·API 문서 초안을 생성합니다. <strong>사람이 설계·검수</strong>하고 AI가 반복 작업을 담당합니다.</p>
          <div class="phase-tools"><span class="tool">Claude Code</span><span class="tool">DGX Spark</span><span class="tool">Cursor</span></div>
        </div>
      </div>
      <div class="arrow-down"><i class="fas fa-arrow-down"></i></div>
      <div class="phase" style="--pc:#3B82F6">
        <div class="phase-num">4</div>
        <div class="phase-body">
          <div class="phase-name">통합 · 배포</div>
          <div class="phase-en">Integrate &amp; Deploy — 실제 서버에 반영</div>
          <p class="phase-desc">Git에 코드를 합치고, CI/CD 파이프라인이 빌드·테스트·배포를 자동 실행합니다. <strong>스테이징 → 운영</strong> 순으로 안전하게 올립니다.</p>
          <div class="phase-tools"><span class="tool">GitLab</span><span class="tool">Jenkins</span><span class="tool">CI/CD</span></div>
        </div>
      </div>
      <div class="arrow-down"><i class="fas fa-arrow-down"></i></div>
      <div class="phase" style="--pc:#22C55E">
        <div class="phase-num">5</div>
        <div class="phase-body">
          <div class="phase-name">검증 · 완료</div>
          <div class="phase-en">Verify — 품질 확인 후 완료</div>
          <p class="phase-desc">자동 테스트·회귀 검증·Human-in-the-loop 검수로 결함을 잡습니다. Jira 이슈를 <strong>Done</strong> 처리하고 다음 스프린트로 넘깁니다.</p>
          <div class="phase-tools"><span class="tool">QA</span><span class="tool">회귀 테스트</span><span class="tool">품질 Gate</span></div>
        </div>
      </div>
    </div>

    <div class="right-col">
      <div class="scenario">
        <div class="scenario-title"><i class="fas fa-play-circle"></i> 예시 — "수주 화면에 필드 하나 추가"</div>
        <p class="scenario-sub">하나의 작은 기능도 5단계를 거칩니다. 단계가 끊기면 일정·품질 리스크가 커집니다.</p>
        <div class="scenario-steps">
          <div class="scenario-step"><span class="step-tag">1 기획</span><p class="step-text"><strong>Jira Story</strong> 등록 — "납기일 필드 추가", 스프린트 배정</p></div>
          <div class="scenario-step"><span class="step-tag">2 설계</span><p class="step-text"><strong>Figma</strong> 화면 수정 · API 스펙 정의</p></div>
          <div class="scenario-step"><span class="step-tag">3 개발</span><p class="step-text"><strong>Claude Code</strong> UI·API·테스트 코드 생성 → 개발자 검수</p></div>
          <div class="scenario-step"><span class="step-tag">4 배포</span><p class="step-text"><strong>GitLab CI</strong> 빌드·테스트 통과 → 스테이징·운영 반영</p></div>
          <div class="scenario-step"><span class="step-tag">5 검증</span><p class="step-text">QA·현업 확인 후 <strong>Done</strong> — 다음 기능으로</p></div>
        </div>
      </div>
      <div class="analogy">
        <div class="analogy-title"><i class="fas fa-lightbulb"></i> 비유 — 신제품 출시</div>
        <div class="analogy-row"><em>기획</em>출시 계획·일정·우선순위</div>
        <div class="analogy-row"><em>설계</em>제품 설계도·포장·UX</div>
        <div class="analogy-row"><em>개발</em>공장 생산(AI+사람 협업)</div>
        <div class="analogy-row"><em>배포</em>물류·매장 진열(서버 반영)</div>
        <div class="analogy-row"><em>검증</em>품질 검사·고객 피드백</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <strong>다음 장표:</strong> 프로젝트 마일스톤·최적화 방안으로 이어집니다. E2E 흐름은 <strong>매 스프린트마다 반복</strong>되며, AI 도구는 3·4단계의 속도와 품질을 동시에 끌어올립니다.
  </div>
</div>`;

export default function Slide16() {
  return (
    <SlideCanvas slideId={16} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
