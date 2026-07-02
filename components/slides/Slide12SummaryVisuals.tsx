"use client";

export type SummaryColumnData = {
  id: "progress" | "roadmap" | "infra";
  step: string;
  icon: string;
  title: string;
  highlight: string;
  items: {
    tag: string;
    tagVariant: "completed" | "ongoing" | "planned";
    text: string;
    subtext: string;
  }[];
};

export function Slide12SummaryBoard({ columns }: { columns: SummaryColumnData[] }) {
  return (
    <div className="summary-grid-container">
      {columns.map((col) => (
        <article key={col.id} className="summary-column-item">
          <div className="summary-column-header">
            <div className="summary-column-icon">
              <i className={col.icon} aria-hidden="true" />
            </div>
            <div className="summary-column-heading">
              <span className="summary-column-step">{col.step}</span>
              <div className="summary-column-title">{col.title}</div>
            </div>
          </div>

          <div className="summary-list-container">
            {col.items.map((item) => (
              <div key={item.tag + item.text} className="summary-list-item">
                <span className={`summary-item-tag tag-${item.tagVariant}`}>{item.tag}</span>
                <div className="summary-item-text">{item.text}</div>
                <div className="summary-item-subtext">{item.subtext}</div>
              </div>
            ))}
          </div>

          <div className="summary-highlight-box">
            <div className="summary-highlight-text">{col.highlight}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
