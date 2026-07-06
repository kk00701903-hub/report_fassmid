"use client";

import { Fragment } from "react";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide43.css";

const PHASES = [
  {
    phase: "PHASE 1",
    badge: "검증",
    icon: "fa-building-user",
    title: "사내 검증",
    subtitle: "Internal Validation",
    audience: "자사 · 사내 팀",
    desc: (
      <>
        사내 업무에 먼저 도입해
        <br />— <strong>효과를 검증하는 단계</strong>.
      </>
    ),
    featured: false,
  },
  {
    phase: "PHASE 2",
    badge: "확장",
    icon: "fa-cloud",
    title: "SaaS 제공",
    subtitle: "Cloud SaaS",
    audience: "스타트업 · SMB",
    desc: (
      <>
        구독형 클라우드로 시장 진입
        <br />— <strong>LLM API 키·락인 없음</strong>, REST API 발행.
      </>
    ),
    featured: false,
  },
  {
    phase: "PHASE 3",
    badge: "엔터프라이즈",
    icon: "fa-server",
    title: "온프렘 구축",
    subtitle: "On-prem · Air-gap",
    audience: "중견기업↑ · 규제 산업",
    desc: (
      <>
        자체 구축·에어갭으로 <strong>데이터 레지던시</strong> 충족
        <br />— 금융·의료·국방.
      </>
    ),
    featured: true,
  },
] as const;

export default function Slide43() {
  return (
    <SlideCanvas slideId={43} motion="roadmap" motionTier="medium">
      <div className="ax-gtm-slide-root fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">GO-TO-MARKET</span>
            <h1>사내 도구를 넘어, 상용 플랫폼으로</h1>
          </div>
          <p className="sub">
            당사의 IT 기술력을 통한 고객사 제공 (SaaS) 및 고부가 가치 (&amp; Lock In) 물류/유통전략 추진.
          </p>
          <div className="line" />
        </div>

        <div className="ax-gtm-phases">
          {PHASES.map((item, index) => (
            <Fragment key={item.phase}>
              <div className={`ax-gtm-phase-card${item.featured ? " is-featured" : ""}`}>
                <div className="ax-gtm-phase-card__head">
                  <span className="ax-gtm-phase-card__phase">{item.phase}</span>
                  <span className="ax-gtm-phase-card__badge">{item.badge}</span>
                </div>
                <div className="ax-gtm-phase-card__body">
                  <div className="ax-gtm-phase-card__icon">
                    <i className={`fas ${item.icon}`} />
                  </div>
                  <div>
                    <div className="ax-gtm-phase-card__title">{item.title}</div>
                    <div className="ax-gtm-phase-card__subtitle">{item.subtitle}</div>
                  </div>
                  <span className="ax-gtm-phase-card__audience">{item.audience}</span>
                </div>
                <p className="ax-gtm-phase-card__desc">{item.desc}</p>
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
            <p>
              코드 없이 워크플로우를 <strong>설계·실행·배포</strong>하는 빌더
            </p>
          </div>
          <div className="ax-gtm-footer__divider" />
          <div className="ax-gtm-footer__item">
            <div className="ax-gtm-footer__label">
              <i className="fas fa-book-open" />
              <span>LLM WIKI</span>
            </div>
            <p>
              리소스에서 자동 갱신되는 <strong>&apos;AI 팀용 Knowledge Hub&apos;</strong>
            </p>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
