"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide34.css";

const SLIDE_HTML = `<div class="slide fluent-slide-root">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">BUSINESS INNOVATION</span>
      <h1 class="title-main">비즈니스 혁신8: 빌더형 인재 육성을 위한 전환</h1>
    </div>
    <p class="sub"><strong>빌더형 인재</strong>란? 완성된 시스템만 쓰는 사람이 아니라, AI와 함께 <strong style="color:var(--ppt-good);">직접 만들고·운영하며 개선하는</strong> 차세대 비개발 IT 인재입니다.</p>
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
          <li><strong style="color:var(--ppt-text-1);">Build</strong> — 요구사항을 코드·서비스로 직접 구현</li>
          <li><strong style="color:var(--ppt-text-1);">Monitor</strong> — 배포·품질·AI를 스스로 관제·개선</li>
          <li><strong style="color:var(--ppt-text-1);">Share</strong> — 표준·문서를 남겨 조직 역량을 축적</li>
        </ul>
      </div>
    </div>

    <div class="concept-oneline">
      <em>한 줄 정의</em> — 빌더형 인재 = AI 협업 위에서 <strong>Build · Monitor · Share</strong>를 실전에서 연마하는 인재 &nbsp;|&nbsp; 훈련장 = <strong>SiteFramework</strong>
    </div>

    <div class="hub-row">
      <div class="role-col">
        <div class="role-card role-card--learn">
          <div class="role-icon cyan"><i class="fas fa-graduation-cap"></i></div>
          <div class="role-body">
            <h3>① 표준 아키텍처 학습장</h3>
            <p>SiteFramework·API-First·모듈 경계를 실제 코드로 익히며, 신입·전환 인력의 온보딩 시간을 단축합니다.</p>
          </div>
        </div>
        <div class="role-card role-card--monitor">
          <div class="role-icon purple"><i class="fas fa-satellite-dish"></i></div>
          <div class="role-body">
            <h3>② Monitor 역량 실습</h3>
            <p>CI/CD·Quality Gate·AI 에이전트 로그를 관제하며, 운영 이상 징후 대응 역량을 키웁니다.</p>
          </div>
        </div>
      </div>

      <div class="hub-center">
        <i class="fas fa-cubes hub-icon"></i>
        <div class="hub-title">실전 훈련장<br/>SiteFramework</div>
        <div class="hub-sub">이론 교육이 아닌<br/>실제 코드·배포·관제 실습</div>
        <div class="hub-tags">
          <span class="hub-tag">S04</span><span class="hub-tag">S09</span><span class="hub-tag">S18</span>
        </div>
      </div>

      <div class="role-col">
        <div class="role-card role-card--build">
          <div class="role-icon green"><i class="fas fa-hammer"></i></div>
          <div class="role-body">
            <h3>③ Build 역량 실습</h3>
            <p>수주·발주 모듈 PoC를 직접 설계·구현·배포하며, 요구사항→MR→운영까지 풀사이클을 경험합니다.</p>
          </div>
        </div>
        <div class="role-card role-card--doc">
          <div class="role-icon gold"><i class="fas fa-book"></i></div>
          <div class="role-body">
            <h3>④ AI-Ready 문서 기여</h3>
            <p>README·위키·OpenAPI를 마크다운으로 기여해 RAG 컨텍스트를 쌓고, AI 협업 문화를 체득합니다.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <i class="fas fa-link"></i>
      <p><strong>왜 지금인가:</strong> AI가 코딩·문서·테스트를 돕는 시대 — "요청만 하는" 사용자형에서 "직접 만드는" 빌더형으로 전환해야 속도·품질·내재화를 동시에 확보합니다.</p>
    </div>
  </div>
</div>`;

export default function Slide34() {
  return (
    <SlideCanvas slideId={34} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
