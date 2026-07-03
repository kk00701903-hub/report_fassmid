"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide42AgentWorkflow from "@/components/slides/Slide42AgentWorkflow";
import "./styles/Slide42.css";

const VALUE_CARDS = [
  {
    icon: "fa-diagram-project",
    title: "노코드 구축",
    desc: "비주얼 빌더로 현업이 직접 구축 · 엔지니어링 핸드오프 제거",
  },
  {
    icon: "fa-circle-nodes",
    title: "멀티 에이전트 구축",
    desc: "병렬·순환 구조와 자가 개선 루프까지 구현",
  },
  {
    icon: "fa-bolt",
    title: "시스템 직접 실행",
    desc: "사내 API·DB·코드 직접 실행 · 샌드박스로 안전",
  },
] as const;

export default function Slide42() {
  return (
    <SlideCanvas slideId={42} motion="innovation" motionTier="medium">
      <div className="ax-platform-slide-root fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">INTERNAL AX</span>
            <h1>
              코드 없이 구축하는 사내 AI 에이전트{" "}
              <span className="title-tail">No-code 워크플로우 시연</span>
            </h1>
          </div>
          <p className="sub">
            현업이 직접 워크플로우를 설계하고, 전사에 공유하며 사내 시스템을 자동화하는 통합 플랫폼.
          </p>
          <div className="line" />
        </div>

        <div className="ax-platform-body">
          <div className="ax-studio-panel">
            <div className="ax-studio-panel__head">
              <div className="ax-studio-panel__brand">
                <span className="ax-studio-panel__logo">
                  <i className="fas fa-diagram-project" />
                </span>
                <span className="ax-studio-panel__name">Agent Studio</span>
                <span className="ax-studio-panel__tag">비주얼 워크플로우 빌더</span>
              </div>
              <span className="ax-studio-panel__chip">예시 워크플로우</span>
            </div>

            <div className="ax-studio-panel__canvas-wrap">
              <Slide42AgentWorkflow />
            </div>

            <div className="ax-studio-panel__hint">
              <i className="fas fa-arrow-pointer" />
              <span>코드 없이 드래그로 설계 — 누구나 제작</span>
            </div>
          </div>

          <div className="ax-value-column">
            <div className="ax-section-label">
              <i className="fas fa-diagram-project" />
              <span>AGENT STUDIO</span>
              <em>에이전트 빌더</em>
            </div>
            <div className="ax-value-grid ax-value-grid--studio">
              {VALUE_CARDS.map((card) => (
                <div key={card.title} className="ax-value-card">
                  <div className="ax-value-card__icon">
                    <i className={`fas ${card.icon}`} />
                  </div>
                  <div>
                    <div className="ax-value-card__title">{card.title}</div>
                    <div className="ax-value-card__desc">{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ax-section-label">
              <i className="fas fa-book-open" />
              <span>LLM WIKI</span>
              <em>별도 플랫폼 · 지식베이스</em>
            </div>
            <div className="ax-value-grid ax-value-grid--wiki">
              <div className="ax-value-card">
                <div className="ax-value-card__icon">
                  <i className="fas fa-book-open" />
                </div>
                <div>
                  <div className="ax-value-card__title">지식 자산화</div>
                  <div className="ax-value-card__desc">
                    코드·리소스에서 스스로 최신화되는 자가갱신 지식베이스
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ax-proof-strip">
          <div className="ax-proof-strip__label">
            <i className="fas fa-flask-vial" />
            <span>PROOF</span>
          </div>
          <div className="ax-proof-strip__divider" />
          <p className="ax-proof-strip__text">
            실행 트레이스·토큰·비용 관측 · 실행 전 비용 시뮬레이터 ·{" "}
            <code>agent-lib.com</code> 테스트 운영 중
          </p>
        </div>
      </div>
    </SlideCanvas>
  );
}
