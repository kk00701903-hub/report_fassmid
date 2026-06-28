"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide16.css";

const SLIDE_HTML = `<div class="slide fluent-slide fluent-slide-dense">
  <div class="title-region">
    <div class="title-row">
      <div class="title-bar"></div>
      <h1 class="title-text">AI-Augmented 개발 워크플로우</h1>
    </div>
    <p class="title-sub">기획·설계·AI 개발·통합·배포·검증까지 AI 도구가 연결된 End-to-End 개발 파이프라인</p>
    <div class="title-line"></div>
    <div class="core-tools-bar">
      <span class="core-tools-label">핵심 도구</span>
      <span class="core-tool-chip jira"><i class="fab fa-jira"></i> Jira</span>
      <span class="core-tool-chip claude"><i class="fas fa-robot"></i> Claude Code</span>
      <span class="core-tool-chip gitlab"><i class="fab fa-gitlab"></i> GitLab</span>
      <span class="core-tool-chip idea"><span class="ij-mark">IJ</span> IntelliJ</span>
    </div>
  </div>

  <div class="body">
    <div class="phase-strip">
      <div class="phase-step"><span class="num">1</span>기획·관리</div>
      <span class="phase-arrow"><i class="fas fa-chevron-right"></i></span>
      <div class="phase-step"><span class="num">2</span>설계·UI/UX</div>
      <span class="phase-arrow"><i class="fas fa-chevron-right"></i></span>
      <div class="phase-step"><span class="num">3</span>AI 개발</div>
      <span class="phase-arrow"><i class="fas fa-chevron-right"></i></span>
      <div class="phase-step"><span class="num">4</span>통합·배포</div>
      <span class="phase-arrow"><i class="fas fa-chevron-right"></i></span>
      <div class="phase-step"><span class="num">5</span>검증·완료</div>
    </div>

    <div class="flow-main">
      <!-- 1. Plan -->
      <div class="flow-col col-plan">
        <div class="col-label">PLAN</div>
        <div class="tool-card jira tool-hero tool-hero-a">
          <div class="tool-icon"><i class="fab fa-jira"></i></div>
          <div>
            <div class="tool-name">Jira</div>
            <p class="tool-use">프로젝트·업무 관리<br/>스프린트·백로그·이슈 추적</p>
          </div>
        </div>
        <div style="font-size:13px;color:var(--ppt-text-3);text-align:center;line-height:1.35;padding:2px 0">
          Epic → Story → Task<br/>애자일 보드 운영
        </div>
      </div>

      <!-- 2. Design -->
      <div class="flow-col col-design">
        <div class="col-label">DESIGN</div>
        <div class="tool-card figma">
          <div class="tool-icon"><i class="fab fa-figma"></i></div>
          <div>
            <div class="tool-name">Figma</div>
            <p class="tool-use">화면설계·스토리북 편집<br/>UI 컴포넌트·프로토타입</p>
          </div>
        </div>
        <div class="tool-card adobe">
          <div class="tool-icon"><i class="fab fa-adobe"></i></div>
          <div>
            <div class="tool-name">Adobe</div>
            <p class="tool-use">디자인·영상·문서 편집<br/>브랜드·가이드·산출물</p>
          </div>
        </div>
        <div class="tool-card claude tool-hero tool-hero-b">
          <div class="tool-icon"><i class="fas fa-robot"></i></div>
          <div>
            <div class="tool-name">Claude Code</div>
            <p class="tool-use">Figma 스펙 → UI 코드 생성<br/>컴포넌트·스토리북 초안</p>
          </div>
        </div>
      </div>

      <!-- 3. AI Dev -->
      <div class="flow-col col-dev">
        <div class="col-label">AI DEVELOP</div>
        <div class="dgx-hub">
          <div class="dgx-icon"><i class="fas fa-microchip"></i></div>
          <div>
            <div class="dgx-title">DGX Spark</div>
            <p class="dgx-sub">RAG·GPU 추론<br/>레거시·문서 컨텍스트</p>
          </div>
        </div>
        <div class="dev-ides">
          <div class="tool-card cursor">
            <div class="tool-icon"><i class="fas fa-code"></i></div>
            <div>
              <div class="tool-name">Cursor</div>
              <p class="tool-use">개발 전용 AI IDE</p>
            </div>
          </div>
          <div class="tool-card idea tool-hero tool-hero-d">
            <div class="tool-icon">IJ</div>
            <div>
              <div class="tool-name">IntelliJ</div>
              <p class="tool-use">웹 개발 전용 IDE</p>
            </div>
          </div>
        </div>
        <div class="tool-card claude tool-hero tool-hero-c">
          <div class="tool-icon"><i class="fas fa-robot"></i></div>
          <div>
            <div class="tool-name">Claude Code</div>
            <p class="tool-use">코드 생성·리팩터링<br/>RAG 기반 개발</p>
          </div>
        </div>
      </div>

      <!-- 4. Git -->
      <div class="flow-col col-git">
        <div class="col-label">INTEGRATE</div>
        <div class="tool-card gitlab tool-hero tool-hero-e">
          <div class="tool-icon"><i class="fab fa-gitlab"></i></div>
          <div>
            <div class="tool-name">GitLab</div>
            <p class="tool-use">소스코드 버전 관리<br/>MR·Code Review·CI/CD</p>
          </div>
        </div>
        <div class="col-git-caption">
          Feature Branch → MR<br/>Quality Gate → Merge
        </div>
      </div>

      <!-- 5. Done -->
      <div class="flow-col col-done">
        <div class="col-label">DONE</div>
        <div class="tool-card done jira tool-hero tool-hero-f">
          <div class="tool-icon"><i class="fas fa-check-double"></i></div>
          <div>
            <div class="tool-name">Jira 완료 처리</div>
            <p class="tool-use">스프린트 리뷰·회고<br/>다음 스프린트 피드백</p>
          </div>
        </div>
        <div style="font-size:13px;color:var(--ppt-good);text-align:center;line-height:1.35;padding:2px 0">
          <i class="fas fa-rotate"></i> 애자일 순환
        </div>
      </div>
    </div>

    <div class="arrow-row">
      <div class="arrow-seg"><div class="arrow-line"></div><i class="fas fa-caret-right arrow-icon"></i></div>
      <div class="arrow-seg"><div class="arrow-line"></div><i class="fas fa-caret-right arrow-icon"></i></div>
      <div class="arrow-seg"><div class="arrow-line"></div><i class="fas fa-caret-right arrow-icon"></i></div>
      <div class="arrow-seg"><div class="arrow-line"></div><i class="fas fa-caret-right arrow-icon"></i></div>
    </div>

    <div class="pipeline">
      <div class="pipe-head"><i class="fas fa-diagram-project"></i> End-to-End 개발 흐름</div>
      <div class="pipe-flow">
        <div class="pipe-node pipe-hero pipe-hero-jira"><strong>Jira 이슈 등록</strong><span>요구사항·스프린트 할당</span></div>
        <span class="pipe-arrow"><i class="fas fa-arrow-right"></i></span>
        <div class="pipe-node pipe-hero pipe-hero-claude"><strong>Figma·Adobe<br/>+ Claude Code</strong><span>UI/UX 설계·코드 초안</span></div>
        <span class="pipe-arrow"><i class="fas fa-arrow-right"></i></span>
        <div class="pipe-node ai"><strong>DGX Spark</strong><span>RAG·GPU 추론</span></div>
        <span class="pipe-arrow"><i class="fas fa-arrow-right"></i></span>
        <div class="pipe-node pipe-hero pipe-hero-dev highlight"><strong>IntelliJ<br/>+ Claude Code</strong><span>AI 협업 코딩</span></div>
        <span class="pipe-arrow"><i class="fas fa-arrow-right"></i></span>
        <div class="pipe-node pipe-hero pipe-hero-gitlab"><strong>GitLab Push/MR</strong><span>리뷰·CI/CD·배포</span></div>
        <span class="pipe-arrow"><i class="fas fa-arrow-right"></i></span>
        <div class="pipe-node pipe-hero pipe-hero-jira"><strong>Jira Done</strong><span>검증·회고·다음 Sprint</span></div>
      </div>
      <div class="pipe-loop">
        <strong>Human + AI 협업 루프</strong> — 기획(<strong class="hl-jira">Jira</strong>) → 설계(Figma·Adobe·<strong class="hl-claude">Claude Code</strong>) →
        <strong>DGX Spark</strong> RAG 컨텍스트 → <strong class="hl-idea">IntelliJ</strong>·<strong class="hl-claude">Claude Code</strong> 협업 코딩 →
        <strong class="hl-gitlab">GitLab</strong> MR·CI/CD → <strong class="hl-jira">Jira</strong> 완료 후 다음 스프린트 반복
      </div>
    </div>
  </div>
</div>`;

export default function Slide15() {
  return (
    <SlideCanvas slideId={16} motion="pipeline" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
