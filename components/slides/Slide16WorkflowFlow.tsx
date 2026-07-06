"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useSlideDiagramMotion } from "@/components/slides/motion/SlideMotionReadyContext";
import { hexToRgbTriplet } from "@/lib/cssColor";
import {
  WORKFLOW_PHASES,
  WORKFLOW_PHASE_STEPS,
  WORKFLOW_PIPELINE,
  type WorkflowPhase,
  type WorkflowTool,
} from "@/components/slides/workflowBoardData";

type PhaseState = "pending" | "active" | "visited";

function getPhaseState(index: number, activeStep: number): PhaseState {
  if (index === activeStep) return "active";
  if (index < activeStep) return "visited";
  return "pending";
}

function ToolCard({ tool, compact }: { tool: WorkflowTool; compact?: boolean }) {
  return (
    <div className={`s16-tool-card s16-tool-card--${tool.theme}${compact ? " s16-tool-card--compact" : ""}`}>
      <div className="s16-tool-card__icon">
        {tool.iconClass ? <i className={tool.iconClass} aria-hidden="true" /> : tool.iconText}
      </div>
      <div className="s16-tool-card__body">
        <div className="s16-tool-card__name">{tool.name}</div>
        <p className="s16-tool-card__use">
          {tool.use.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < tool.use.split("\n").length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function PhaseColumn({
  phase,
  state,
  reduceMotion,
}: {
  phase: WorkflowPhase;
  state: PhaseState;
  reduceMotion: boolean | null;
}) {
  const dgx = phase.tools.find((t) => t.theme === "dgx");
  const ides = phase.tools.filter((t) => t.theme === "cursor" || t.theme === "idea");
  const claudeDev = phase.tools.find((t) => t.id === "claude-dev");
  const regularTools = phase.tools.filter(
    (t) => t.theme !== "dgx" && t.theme !== "cursor" && t.theme !== "idea" && t.id !== "claude-dev",
  );

  return (
    <motion.div
      className={`s16-flow-col s16-flow-col--${phase.phaseKey} s16-flow-col--${state}`}
      style={{ "--col-accent": phase.accent, "--col-accent-rgb": hexToRgbTriplet(phase.accent) } as CSSProperties}
      animate={
        state === "active" && !reduceMotion
          ? {
              boxShadow: [
                "0 1px 4px rgba(0,0,0,0.04)",
                "0 6px 20px rgba(0,120,212,0.18)",
                "0 1px 4px rgba(0,0,0,0.04)",
              ],
              borderColor: ["#edebe9", "rgba(0,120,212,0.55)", "#edebe9"],
            }
          : { boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }
      }
      transition={{ duration: 1.8, repeat: state === "active" && !reduceMotion ? Infinity : 0, ease: "easeInOut" }}
    >
      <div className="s16-flow-col__label">{phase.colLabel}</div>

      {phase.phaseKey === "dev" ? (
        <>
          {dgx ? (
            <div className="s16-dgx-hub">
              <div className="s16-dgx-hub__icon">
                <i className={dgx.iconClass} aria-hidden="true" />
              </div>
              <div>
                <div className="s16-dgx-hub__title">{dgx.name}</div>
                <p className="s16-dgx-hub__sub">
                  RAG·GPU 추론
                  <br />
                  레거시·문서 컨텍스트
                </p>
              </div>
            </div>
          ) : null}
          <div className="s16-dev-ides">
            {ides.map((tool) => (
              <ToolCard key={tool.id} tool={tool} compact />
            ))}
          </div>
          {claudeDev ? <ToolCard tool={claudeDev} compact /> : null}
        </>
      ) : (
        regularTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} compact={phase.phaseKey === "design"} />
        ))
      )}

      {phase.caption ? (
        <p className={`s16-flow-col__caption${phase.captionAgile ? " s16-flow-col__caption--agile" : ""}`}>
          {phase.captionAgile ? <i className="fas fa-rotate" aria-hidden="true" /> : null}
          {phase.caption.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < phase.caption!.split("\n").length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      ) : null}
    </motion.div>
  );
}

function FlowConnector({
  active,
  visited,
  animating,
  reduceMotion,
}: {
  active: boolean;
  visited: boolean;
  animating: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <div className={`s16-flow-connector${active ? " is-active" : ""}${visited ? " is-visited" : ""}`}>
      <div className="s16-flow-connector__line" aria-hidden="true" />
      {animating && active ? (
        <span className="s16-flow-connector__packet is-animated" aria-hidden="true" />
      ) : null}
      <motion.span
        className="s16-flow-connector__arrow"
        animate={
          active && !reduceMotion ? { opacity: [0.45, 1, 0.45], x: [0, 3, 0] } : { opacity: visited ? 0.9 : 0.4 }
        }
        transition={{ duration: 1, repeat: active ? Infinity : 0 }}
        aria-hidden="true"
      >
        <i className="fas fa-chevron-right" />
      </motion.span>
    </div>
  );
}

function FlowSpine({
  activeStep,
  spineAnimating,
}: {
  activeStep: number;
  spineAnimating: boolean;
}) {
  const segmentCount = WORKFLOW_PHASES.length;
  const progress = (activeStep + 0.5) / segmentCount;
  const fillScale = Math.max(0.08, progress);

  return (
    <div className="s16-flow-spine" aria-hidden="true">
      <div className="s16-flow-spine__track">
        <div
          className={`s16-flow-spine__fill${spineAnimating ? " is-animated" : ""}`}
          style={spineAnimating ? undefined : { transform: `scaleX(${fillScale})` }}
        />
      </div>

      {WORKFLOW_PHASES.map((phase, i) => (
        <div
          key={phase.id}
          className={`s16-flow-spine__dot${i <= activeStep ? " is-lit" : ""}${i === activeStep ? " is-active" : ""}`}
          style={{ left: `${((i + 0.5) / segmentCount) * 100}%` }}
        />
      ))}
    </div>
  );
}

const PIPELINE_ACTIVE_INDEX = [0, 1, 3, 4, 5] as const;

export default function Slide16WorkflowFlow() {
  const reduceMotion = useReducedMotion();
  const { animating, ready } = useSlideDiagramMotion();
  const spineAnimating = Boolean(animating && !reduceMotion);
  const [activeStep, setActiveStep] = useState(0);
  const pipelineActive = PIPELINE_ACTIVE_INDEX[activeStep] ?? activeStep;

  useEffect(() => {
    if (!animating) return;
    const id = window.setInterval(
      () => setActiveStep((v) => (v + 1) % WORKFLOW_PHASES.length),
      2000,
    );
    return () => window.clearInterval(id);
  }, [animating]);

  return (
    <div className="s16-workflow">
      <div className="s16-phase-strip">
        {WORKFLOW_PHASES.map((phase, i) => {
          const state = getPhaseState(i, activeStep);
          return (
            <div key={phase.id} className="s16-phase-strip__item">
              {i > 0 ? (
                <span className={`s16-phase-strip__arrow${state !== "pending" ? " is-lit" : ""}`}>
                  <i className="fas fa-chevron-right" aria-hidden="true" />
                </span>
              ) : null}
              <div className={`s16-phase-step s16-phase-step--${state}`}>
                <span className="s16-phase-step__num">{phase.phaseNum}</span>
                {phase.phaseLabel}
              </div>
            </div>
          );
        })}
      </div>

      <div className="s16-flow-board">
        <FlowSpine key={ready ? "flow-run" : "flow-idle"} activeStep={activeStep} spineAnimating={spineAnimating} />

        <div className="s16-flow-pipeline">
          {WORKFLOW_PHASES.map((phase, i) => {
            const state = getPhaseState(i, activeStep);
            const pipeActive = activeStep === i;
            const pipeVisited = activeStep > i;

            return (
              <div key={phase.id} className="s16-flow-segment">
                <PhaseColumn phase={phase} state={state} reduceMotion={reduceMotion} />
                {i < WORKFLOW_PHASES.length - 1 ? (
                  <FlowConnector
                    active={pipeActive}
                    visited={pipeVisited}
                    animating={animating}
                    reduceMotion={reduceMotion}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <motion.div
        key={activeStep}
        className="s16-flow-caption"
        initial={reduceMotion ? false : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
      >
        {WORKFLOW_PHASE_STEPS[activeStep]}
      </motion.div>

      <div className="s16-pipeline">
        <div className="s16-pipeline__head">
          <i className="fas fa-diagram-project" aria-hidden="true" /> End-to-End 개발 흐름
        </div>
        <div className="s16-pipeline__flow">
          {WORKFLOW_PIPELINE.flatMap((node, i) => {
            const items = [
              <div
                key={node.id}
                className={`s16-pipeline__node${node.variant ? ` s16-pipeline__node--${node.variant}` : ""}${
                  i <= pipelineActive ? " is-lit" : ""
                }${i === pipelineActive ? " is-active" : ""}`}
              >
                <strong>
                  {node.title.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < node.title.split("\n").length - 1 ? <br /> : null}
                    </span>
                  ))}
                </strong>
                <span>{node.sub}</span>
              </div>,
            ];
            if (i < WORKFLOW_PIPELINE.length - 1) {
              items.push(
                <span key={`${node.id}-arrow`} className={`s16-pipeline__arrow${i < pipelineActive ? " is-lit" : ""}`}>
                  <i className="fas fa-arrow-right" aria-hidden="true" />
                </span>,
              );
            }
            return items;
          })}
        </div>
        <p className="s16-pipeline__loop">
          <strong>Human + AI 협업 루프</strong> — 기획(Jira) → 설계(Figma·Adobe·
          <strong>Claude Code</strong>) → <strong>DGX Spark</strong>가 RAG 컨텍스트를 제공하고{" "}
          <strong>Claude Code</strong>·<strong>Cursor</strong>가 코드를 생성 → <strong>GitLab</strong> MR·CI/CD →{" "}
          <strong>Jira</strong> 완료 후 다음 스프린트 반복
        </p>
      </div>
    </div>
  );
}
