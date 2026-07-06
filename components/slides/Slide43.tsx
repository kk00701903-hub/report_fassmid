"use client";

import { Fragment } from "react";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide43.css";

const PHASES = [
  {
    phase: "PHASE 1",
    badge: "검증",
    icon: "fa-building-user",
    title: "내부 성공 모델 구축",
    highlight: "효과 입증",
  },
  {
    phase: "PHASE 2",
    badge: "확장",
    icon: "fa-cloud",
    title: "클라우드 기반 서비스(SaaS) 출시",
    highlight: "시장 침투",
  },
  {
    phase: "PHASE 3",
    badge: "도약",
    icon: "fa-shield-halved",
    title: "대형 엔터프라이즈 전용 환경 구축",
    highlight: "보안/신뢰성 확보",
  },
] as const;

export default function Slide43() {
  return (
    <SlideCanvas slideId={43} motion="roadmap" motionTier="medium">
      <div className="ax-gtm-slide-root fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">비즈니스 성장</span>
            <h1>비즈니스 성장 전략: 내부 검증에서 상용 플랫폼으로</h1>
          </div>
          <p className="sub">
            당사의 IT 기술력을 바탕으로 독자적인 사업 운영을 위한 클라우드 독립 기반 마련.
          </p>
          <div className="line" />
        </div>

        <div className="ax-gtm-phases">
          {PHASES.map((item, index) => (
            <Fragment key={item.phase}>
              <div className="ax-gtm-phase-card">
                <div className="ax-gtm-phase-card__head">
                  <span className="ax-gtm-phase-card__phase">{item.phase}</span>
                  <span className="ax-gtm-phase-card__badge">{item.badge}</span>
                </div>
                <div className="ax-gtm-phase-card__body">
                  <div className="ax-gtm-phase-card__icon">
                    <i className={`fas ${item.icon}`} />
                  </div>
                  <div className="ax-gtm-phase-card__title">{item.title}</div>
                </div>
                <div className="ax-gtm-phase-card__highlight">{item.highlight}</div>
              </div>
              {index < PHASES.length - 1 ? (
                <div key={`${item.phase}-chevron`} className="ax-gtm-chevron" aria-hidden="true">
                  <i className="fas fa-chevron-right" />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>

        <div className="ax-gtm-footer">
          <div className="ax-gtm-footer__item">
            <div className="ax-gtm-footer__label">
              <i className="fas fa-diagram-project" />
              <span>AGENT STUDIO</span>
            </div>
            <p>코드 없는 워크플로우 빌더</p>
          </div>
          <div className="ax-gtm-footer__divider" />
          <div className="ax-gtm-footer__item">
            <div className="ax-gtm-footer__label">
              <i className="fas fa-book-open" />
              <span>LLM WIKI</span>
            </div>
            <p>지식 허브</p>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
