"use client";

import type { DetailPreview, FlowNode } from "@/lib/slideDetails";

type DetailPreviewPanelProps = {
  preview: DetailPreview;
  flowNodes?: FlowNode[];
};

const SPRINT_CARDS = [
  { id: "S02", title: "개발 환경·인프라", status: "done" },
  { id: "S04", title: "SiteFramework", status: "active" },
  { id: "S06", title: "JWT + Security", status: "active" },
  { id: "S09", title: "RealGrid UI", status: "active" },
  { id: "S17", title: "CDC Kafka", status: "active" },
];

const TERMINAL_LINES = [
  "$ fass init --module order-mgmt",
  "✓ SiteFramework scaffold created",
  "$ fass dev --port 3000",
  "▸ Next.js ready on http://localhost:3000",
  "$ curl -H \"Authorization: Bearer $JWT\" /api/orders",
  '{ "id": "ord-001", "status": "CONFIRMED" }',
];

export function FlowDiagram({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="detail-flow-diagram">
      {nodes.map((node, i) => (
        <div key={node.id} className="detail-flow-diagram__segment">
          <div className="detail-flow-diagram__node">
            {node.icon ? <i className={node.icon} aria-hidden="true" /> : null}
            <span className="detail-flow-diagram__label">{node.label}</span>
            {node.sub ? <span className="detail-flow-diagram__sub">{node.sub}</span> : null}
          </div>
          {i < nodes.length - 1 ? (
            <div className="detail-flow-diagram__connector" aria-hidden="true">
              <span className="detail-flow-diagram__line" />
              <span className="detail-flow-diagram__packet" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function SprintBacklogPreview() {
  return (
    <div className="detail-preview-mock detail-preview-mock--backlog">
      <div className="detail-preview-mock__chrome">
        <span className="detail-preview-mock__dot" />
        <span className="detail-preview-mock__dot" />
        <span className="detail-preview-mock__dot" />
        <span className="detail-preview-mock__url">sprint-backlog / FaSS v3.0</span>
      </div>
      <div className="detail-preview-mock__body">
        <div className="detail-preview-mock__stats">
          <div>
            <strong>23</strong>
            <span>스프린트</span>
          </div>
          <div>
            <strong>3%</strong>
            <span>진행률</span>
          </div>
          <div>
            <strong>196</strong>
            <span>태스크</span>
          </div>
        </div>
        <div className="detail-preview-mock__cards">
          {SPRINT_CARDS.map((card) => (
            <div
              key={card.id}
              className={`detail-preview-mock__sprint-card detail-preview-mock__sprint-card--${card.status}`}
            >
              <span className="detail-preview-mock__sprint-id">{card.id}</span>
              <span>{card.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TerminalPreview() {
  return (
    <div className="detail-preview-mock detail-preview-mock--terminal">
      <div className="detail-preview-mock__chrome">
        <span className="detail-preview-mock__dot" />
        <span className="detail-preview-mock__dot" />
        <span className="detail-preview-mock__dot" />
        <span className="detail-preview-mock__url">fass-cli · zsh</span>
      </div>
      <pre className="detail-preview-mock__terminal">
        {TERMINAL_LINES.map((line, i) => (
          <span
            key={line}
            className="detail-preview-mock__terminal-line"
            style={{ animationDelay: `${i * 0.35}s` }}
          >
            {line}
          </span>
        ))}
      </pre>
    </div>
  );
}

function RealGridPreview() {
  return (
    <div className="detail-preview-mock detail-preview-mock--grid">
      <div className="detail-preview-mock__chrome">
        <span className="detail-preview-mock__dot" />
        <span className="detail-preview-mock__dot" />
        <span className="detail-preview-mock__dot" />
        <span className="detail-preview-mock__url">order-mgmt / RealGrid 2.0</span>
      </div>
      <div className="detail-preview-mock__grid">
        <div className="detail-preview-mock__grid-header">
          <span>수주번호</span>
          <span>고객</span>
          <span>상태</span>
          <span>금액</span>
        </div>
        {[
          ["ORD-24001", "제때물류", "확정", "12,400,000"],
          ["ORD-24002", "한국유통", "배송중", "8,750,000"],
          ["ORD-24003", "글로벌3PL", "대기", "3,200,000"],
        ].map((row) => (
          <div key={row[0]} className="detail-preview-mock__grid-row">
            {row.map((cell) => (
              <span key={cell}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DetailPreviewPanel({ preview, flowNodes }: DetailPreviewPanelProps) {
  const showFlow =
    preview.type === "api-flow" ||
    preview.type === "auth-flow" ||
    preview.type === "agent-flow";

  return (
    <section className="detail-preview-section">
      <h3 className="detail-section__title">
        <i className="fa-solid fa-display" aria-hidden="true" />
        {preview.title ?? "화면·흐름 예시"}
      </h3>
      {preview.type === "sprint-backlog" ? <SprintBacklogPreview /> : null}
      {preview.type === "terminal" ? <TerminalPreview /> : null}
      {preview.type === "realgrid" ? <RealGridPreview /> : null}
      {showFlow && flowNodes?.length ? <FlowDiagram nodes={flowNodes} /> : null}
      {preview.caption ? <p className="detail-preview-section__caption">{preview.caption}</p> : null}
    </section>
  );
}
