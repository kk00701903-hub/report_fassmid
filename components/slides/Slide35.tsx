"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide35.css";

const SLIDE_HTML = `<div class="slide fluent-slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">BUSINESS INNOVATION</span>
      <h1 class="title-main">비즈니스 혁신8: 빌더형 인재 육성</h1>
    </div>
    <p class="sub"><strong>빌더형 인재</strong>란? 현업 담당자가 차세대 웹 프레임워크와 MCP·챗봇 등 외부 AI를 연결해 <strong style="color:var(--ppt-good);">바이브 코딩</strong>으로 서비스를 직접 만들고 운영하는 인재입니다.</p>
    <div class="line"></div>
  </div>

  <div class="main-body">
    <div class="concept-strip">
      <div class="concept-box old">
        <span class="concept-label">Before · 사용자형</span>
        <div class="concept-title">만들어진 것을 <em class="concept-kw">사용</em>하는 인력</div>
        <div class="concept-analogy">비유 — 완성차만 운전하는 운전사</div>
        <ul class="concept-list">
          <li>기능 변경·신규 개발은 외주·SI에 의존</li>
          <li>내부는 매뉴얼대로 조작·운영 위주</li>
          <li>조직 IT 역량이 프로젝트마다 흩어짐</li>
        </ul>
      </div>
      <div class="concept-arrow">
        <span>전환</span>
        <i class="fas fa-arrow-right"></i>
      </div>
      <div class="concept-box new">
        <span class="concept-label">After · 빌더형</span>
        <div class="concept-title">직접 <em class="concept-kw">만들고·고치고·운영</em>하는 인력</div>
        <div class="concept-analogy">비유 — 설계도 보고 차를 직접 조립·정비하는 장인</div>
        <ul class="concept-list">
          <li><strong style="color:var(--ppt-text-1);">Build</strong> — 요구사항을 AI 바이브 코딩으로 코드·서비스로 구현</li>
          <li><strong style="color:var(--ppt-text-1);">Monitor</strong> — 배포·품질·외부 AI(MCP/챗봇) 연동 관제·개선</li>
          <li><strong style="color:var(--ppt-text-1);">Share</strong> — 표준·문서를 남겨 조직 역량을 축적</li>
        </ul>
      </div>
    </div>

    <div class="concept-oneline">
      현업 담당자가 AI 협업(Vibe Coding·MCP) 위에서 <strong>Build · Monitor · Share</strong>를 실전 연마하는 인재 &nbsp;|&nbsp; 훈련장 = <strong>차세대 웹 프레임워크 테스트 사이트</strong>
    </div>

    <div class="hub-row">
      <div class="role-col">
        <div class="role-card role-card--learn">
          <div class="role-icon cyan"><i class="fas fa-graduation-cap"></i></div>
          <div class="role-body">
            <h3>① 차세대 웹 프레임워크 &amp; MCP 아키텍처 학습</h3>
            <p>SiteFramework·MCP 연결 아키텍처를 이해하고, 마이크로서비스·API 기반 설계 코드를 학습합니다.</p>
          </div>
        </div>
        <div class="role-card role-card--monitor">
          <div class="role-icon purple"><i class="fas fa-satellite-dish"></i></div>
          <div class="role-body">
            <h3>② 외부 AI(챗봇·MCP) 연결 모니터링</h3>
            <p>외부 AI 챗봇·MCP 에이전트 연동 상태·품질·보안을 실시간 관제하고, 로그 분석·이슈 대응을 수행합니다.</p>
          </div>
        </div>
      </div>

      <div class="hub-center hub-center--hi">
        <span class="hub-ribbon"><i class="fas fa-star"></i> Live Connect Core</span>
        <i class="fas fa-cubes hub-icon"></i>
        <div class="hub-title">SiteFramework<br/>차세대 웹 프레임워크</div>
        <div class="hub-sub">현업 기반 실전 훈련<br/>외부 AI(MCP·챗봇) 연결</div>
        <div class="hub-tags">
          <span class="hub-tag">S04</span><span class="hub-tag">S09</span><span class="hub-tag">S18</span>
        </div>
      </div>

      <div class="role-col">
        <div class="role-card role-card--build">
          <div class="role-icon green"><i class="fas fa-hammer"></i></div>
          <div class="role-body">
            <h3>③ 현업 기반 바이브 코딩(Build) 실습</h3>
            <p>현업 요구사항을 AI와 협업(Vibe Coding)해 신속하게 코드·서비스로 직접 구현·배포합니다.</p>
          </div>
        </div>
        <div class="role-card role-card--doc">
          <div class="role-icon gold"><i class="fas fa-book"></i></div>
          <div class="role-body">
            <h3>④ AI/MCP-Ready 문서 기여</h3>
            <p>README·OpenAPI 등 마크다운을 기여해 RAG·MCP 컨텍스트를 구축하고 AI 협업을 최적화합니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <i class="fas fa-link"></i>
    <p><strong>왜 지금인가:</strong> AI가 바이브 코딩을 돕고 외부 AI(MCP)가 연결되는 시대 — 현업이 "직접 만드는" 빌더형으로 전환해 비즈니스 속도와 내재화를 달성해야 할 때입니다.</p>
  </div>
</div>`;

export default function Slide34() {
  return (
    <SlideCanvas slideId={35} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
