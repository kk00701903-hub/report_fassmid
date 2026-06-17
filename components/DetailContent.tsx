import type { CodeSample, DetailTopic, ProcessStep } from "@/lib/slideDetails";

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
            <span className="detail-code-block__lang">{sample.language}</span>
          </div>
          <pre>
            <code>{sample.content}</code>
          </pre>
        </div>
      ))}
    </section>
  );
}

export default function DetailContent({ topic }: DetailContentProps) {
  const categoryLabel =
    topic.category === "code" ? "코드" : topic.category === "process" ? "프로세스" : "아키텍처";

  return (
    <article className="detail-content">
      <header className="detail-content__header">
        <span className={`detail-badge detail-badge--${topic.category}`}>{categoryLabel}</span>
        <h2>{topic.title}</h2>
        <p>{topic.summary}</p>
      </header>

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
