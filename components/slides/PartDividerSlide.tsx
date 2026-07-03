"use client";

type PartDividerSlideProps = {
  variant: "part" | "glossary" | "appendix";
  partNumber?: number;
  titleKo: string;
  titleEn: string;
  topics: string[];
};

export default function PartDividerSlide({
  variant,
  partNumber,
  titleKo,
  titleEn,
  topics,
}: PartDividerSlideProps) {
  const partLabel =
    variant === "glossary"
      ? "DIGITAL INSIGHT"
      : variant === "appendix"
        ? "APPENDIX"
        : `PART ${String(partNumber ?? 0).padStart(2, "0")}`;
  const partNumberDisplay =
    variant === "glossary" ? "G" : variant === "appendix" ? "A" : String(partNumber ?? 0).padStart(2, "0");

  return (
    <div
      className={`section-slide-root${
        variant === "glossary"
          ? " section-slide-glossary"
          : variant === "appendix"
            ? " section-slide-appendix"
            : ""
      }`}
    >
      <div className="bg-grid-overlay" aria-hidden="true" />
      <div className="bg-glow-circle" aria-hidden="true" />
      <div className="bg-left-bar" aria-hidden="true" />
      <div className="section-part-number" aria-hidden="true">
        {partNumberDisplay}
      </div>

      <div className="section-part-label">{partLabel}</div>
      <h1 className="section-title-ko">{titleKo}</h1>
      <p className="section-title-en">{titleEn}</p>
      <div className="section-divider-line" aria-hidden="true" />

      <ul className="section-topics-list">
        {topics.map((topic) => (
          <li key={topic} className="section-topic-item">
            <span className="topic-dot" aria-hidden="true" />
            <span className="topic-text">{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
