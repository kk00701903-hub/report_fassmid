"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  E2E_ANALOGY_ROWS,
  E2E_PHASES,
  E2E_SCENARIO_STEPS,
} from "@/components/slides/e2eFlowData";

export default function Slide17E2EFlow() {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setActiveStep((v) => (v + 1) % E2E_PHASES.length), 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const activePhase = E2E_PHASES[activeStep];

  return (
    <div className="s17-slide fluent-slide">
      <header className="s17-header">
        <div className="s17-header__row">
          <div className="s17-header__bar" />
          <span className="s17-header__badge">보조 설명</span>
          <h1 className="s17-header__title">End-to-End 개발 흐름 — 5단계 한눈에</h1>
        </div>
        <p className="s17-header__sub">
          직전 장표(AI-Augmented 워크플로우)의 도구·단계를 경영진 관점에서 다시 정리합니다.{" "}
          <strong>기획 → 설계 → 개발 → 배포 → 검증</strong>이 하나의 연결된 흐름입니다.
        </p>
        <div className="s17-header__line" />
      </header>

      <section className="s17-stepper" aria-label="5단계 개발 흐름">
        {E2E_PHASES.map((phase, i) => {
          const isActive = i === activeStep;
          const isDone = i < activeStep;
          return (
            <div key={phase.id} className="s17-stepper__group">
              {i > 0 ? (
                <span className={`s17-stepper__conn${isDone || isActive ? " is-lit" : ""}`} aria-hidden="true">
                  <i className="fas fa-chevron-right" />
                </span>
              ) : null}
              <button
                type="button"
                className={`s17-step-card${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`}
                style={{ "--step-accent": phase.accent } as CSSProperties}
                onClick={() => setActiveStep(i)}
              >
                <span className="s17-step-card__num">{phase.num}</span>
                <span className="s17-step-card__name">{phase.name}</span>
                <span className="s17-step-card__en">{phase.en}</span>
              </button>
            </div>
          );
        })}
      </section>

      <motion.section
        key={activePhase.id}
        className="s17-detail"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        style={{ "--step-accent": activePhase.accent } as CSSProperties}
      >
        <div className="s17-detail__head">
          <span className="s17-detail__num">{activePhase.num}</span>
          <div>
            <h2 className="s17-detail__title">{activePhase.name}</h2>
            <p className="s17-detail__en">{activePhase.en}</p>
          </div>
        </div>
        <p className="s17-detail__desc">{activePhase.desc}</p>
        <div className="s17-detail__tools">
          {activePhase.tools.map((tool) => (
            <span key={tool} className="s17-detail__tool">
              {tool}
            </span>
          ))}
        </div>
      </motion.section>

      <section className="s17-panels">
        <div className="s17-scenario">
          <div className="s17-panel-head">
            <i className="fas fa-play-circle" aria-hidden="true" />
            <div>
              <h3>예시 — &quot;수주 화면에 필드 하나 추가&quot;</h3>
              <p>하나의 작은 기능도 5단계를 거칩니다. 단계가 끊기면 일정·품질 리스크가 커집니다.</p>
            </div>
          </div>
          <ol className="s17-scenario__list">
            {E2E_SCENARIO_STEPS.map((step) => (
              <li
                key={step.num}
                className={`s17-scenario__item${step.num - 1 === activeStep ? " is-active" : ""}`}
              >
                <span className={`s17-scenario__tag${step.tagVariant === "deploy" ? " s17-scenario__tag--deploy" : ""}`}>
                  {step.num} {step.label}
                </span>
                <p className="s17-scenario__text">
                  {step.highlight ? <strong>{step.highlight}</strong> : null}
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="s17-analogy">
          <div className="s17-panel-head s17-panel-head--analogy">
            <i className="fas fa-lightbulb" aria-hidden="true" />
            <h3>비유 — 신제품 출시</h3>
          </div>
          <div className="s17-analogy__grid">
            <div className="s17-analogy__head-row">
              <span>단계</span>
              <span>비유</span>
            </div>
            {E2E_ANALOGY_ROWS.map((row, i) => (
              <div
                key={row.phase}
                className={`s17-analogy__row${i === activeStep ? " is-active" : ""}`}
              >
                <span className="s17-analogy__phase">{row.phase}</span>
                <span className="s17-analogy__text">{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="s17-footer">
        <strong>다음 장표:</strong> 프로젝트 마일스톤·최적화 방안으로 이어집니다. E2E 흐름은{" "}
        <strong>매 스프린트마다 반복</strong>되며, AI 도구는 3·4단계의 속도와 품질을 동시에 끌어올립니다.
      </footer>
    </div>
  );
}
