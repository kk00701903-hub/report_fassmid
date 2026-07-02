"use client";

export default function Slide42AgentWorkflow() {
  return (
    <div className="ax-workflow-canvas">
      <svg
        className="ax-workflow-svg"
        viewBox="0 0 488 324"
        width="488"
        height="324"
        aria-hidden="true"
      >
        <path d="M150,162 L169,162" stroke="#c46a43" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path
          d="M319,162 C334,162 326,56 340,56"
          stroke="#c46a43"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M319,162 C334,162 326,266 340,266"
          stroke="#3fbfa6"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M150,162 L169,162"
          stroke="#e5936a"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 12"
          className="ax-workflow-flow"
        />
        <path
          d="M319,162 C334,162 326,56 340,56"
          stroke="#e5936a"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 12"
          className="ax-workflow-flow"
        />
        <path
          d="M319,162 C334,162 326,266 340,266"
          stroke="#5fd6bf"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 12"
          className="ax-workflow-flow"
        />
      </svg>

      <div className="ax-workflow-node ax-workflow-node--trigger" style={{ left: 0, top: 136 }}>
        <span className="ax-workflow-node__icon ax-workflow-node__icon--teal">
          <i className="fas fa-bolt" />
        </span>
        <div>
          <div className="ax-workflow-node__title">웹훅 트리거</div>
          <div className="ax-workflow-node__meta">trigger</div>
        </div>
      </div>

      <div className="ax-workflow-node" style={{ left: 169, top: 136 }}>
        <span className="ax-workflow-node__icon ax-workflow-node__icon--orange">
          <i className="fas fa-code-branch" />
        </span>
        <div>
          <div className="ax-workflow-node__title">의도 분류</div>
          <div className="ax-workflow-node__meta">LLM · Opus</div>
        </div>
      </div>

      <div className="ax-workflow-node" style={{ left: 338, top: 30 }}>
        <span className="ax-workflow-node__icon ax-workflow-node__icon--orange">
          <i className="fas fa-pen-nib" />
        </span>
        <div>
          <div className="ax-workflow-node__title">응답 초안 작성</div>
          <div className="ax-workflow-node__meta">agent</div>
        </div>
      </div>

      <div className="ax-workflow-node" style={{ left: 338, top: 240 }}>
        <span className="ax-workflow-node__icon ax-workflow-node__icon--gold">
          <i className="fas fa-user-check" />
        </span>
        <div>
          <div className="ax-workflow-node__title">사람 승인</div>
          <div className="ax-workflow-node__meta">HITL</div>
        </div>
      </div>
    </div>
  );
}
