"use client";

import { useState } from "react";
import DetailPreviewPanel from "@/components/DetailPreviewPanel";
import TechStackVisualizer from "@/components/TechStackVisualizer";
import type { CodeSample, DetailSection, DetailTable, DetailTopic, ProcessStep } from "@/lib/slideDetails";

type DetailContentProps = {
  topic: DetailTopic;
};

function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="detail-section">
      <h3 className="detail-section__title">
        <i className="fa-solid fa-diagram-project" aria-hidden="true" />
        프로세스 상세
      </h3>
      <ol className="detail-process">
        {steps.map((step) => (
          <li key={step.step} className="detail-process__item">
            <span className="detail-process__step">{step.step}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CodeSection({ samples }: { samples: CodeSample[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function handleCopy(filename: string, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(filename);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section className="detail-section">
      <h3 className="detail-section__title">
        <i className="fa-solid fa-code" aria-hidden="true" />
        코드 예시
      </h3>
      {samples.map((sample) => (
        <div key={sample.filename} className="detail-code-block">
          <div className="detail-code-block__header">
            <span>{sample.filename}</span>
            <div className="detail-code-block__actions">
              <span className="detail-code-block__lang">{sample.language}</span>
              <button
                type="button"
                className="detail-code-block__copy"
                onClick={() => handleCopy(sample.filename, sample.content)}
              >
                {copied === sample.filename ? (
                  <>
                    <i className="fa-solid fa-check" aria-hidden="true" /> 복사됨
                  </>
                ) : (
                  <>
                    <i className="fa-regular fa-copy" aria-hidden="true" /> 복사
                  </>
                )}
              </button>
            </div>
          </div>
          <pre>
            <code>{sample.content}</code>
          </pre>
        </div>
      ))}
    </section>
  );
}

function DetailTableView({ table }: { table: DetailTable }) {
  return (
    <div className="detail-table-wrap">
      {table.caption ? <p className="detail-table__caption">{table.caption}</p> : null}
      <table className="detail-table">
        <thead>
          <tr>
            {table.headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionsBlock({ sections }: { sections: DetailSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title} className="detail-section">
          <h3 className="detail-section__title">
            <i
              className={section.icon ?? "fa-solid fa-layer-group"}
              aria-hidden="true"
            />
            {section.title}
          </h3>
          {section.summary ? <p className="detail-section__summary">{section.summary}</p> : null}
          {section.bullets?.length ? (
            <ul className="detail-bullets">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.table ? <DetailTableView table={section.table} /> : null}
          {section.note ? <p className="detail-section__note">{section.note}</p> : null}
        </section>
      ))}
    </>
  );
}

function MetaGrid({ items }: { items: NonNullable<DetailTopic["meta"]> }) {
  return (
    <dl className="detail-meta">
      {items.map((item) => (
        <div key={item.label} className="detail-meta__item">
          <dt>{item.label}</dt>
          <dd>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function DetailContent({ topic }: DetailContentProps) {
  const categoryLabel =
    topic.category === "code" ? "코드" : topic.category === "process" ? "프로세스" : "아키텍처";

  const showTechStack =
    topic.techLayers &&
    (topic.category === "architecture" || topic.category === "code");

  return (
    <article className="detail-content">
      <header className="detail-content__header">
        <span className={`detail-badge detail-badge--${topic.category}`}>{categoryLabel}</span>
        <h2 id="detail-panel-title">{topic.title}</h2>
        <p>{topic.summary}</p>
      </header>

      {topic.meta?.length ? <MetaGrid items={topic.meta} /> : null}

      {showTechStack ? <TechStackVisualizer layers={topic.techLayers} /> : null}

      {topic.preview ? (
        <DetailPreviewPanel preview={topic.preview} flowNodes={topic.flowNodes} />
      ) : null}

      {topic.sections?.length ? <SectionsBlock sections={topic.sections} /> : null}
      {topic.process?.length ? <ProcessSection steps={topic.process} /> : null}
      {topic.code?.length ? <CodeSection samples={topic.code} /> : null}

      {topic.links?.length ? (
        <section className="detail-section">
          <h3 className="detail-section__title">
            <i className="fa-solid fa-link" aria-hidden="true" />
            참고 링크
          </h3>
          <ul className="detail-links">
            {topic.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
