"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createCustomSlideFromFile,
  resetPresentationConfig,
  savePresentationConfig,
  type PresentationConfig,
  type SlideManifestItem,
} from "@/lib/presentationConfig";
import { clearSlideCache } from "@/lib/slideCache";

type SlideOptionsPanelProps = {
  config: PresentationConfig;
  onClose: () => void;
  onApply: (config: PresentationConfig) => void;
};

function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export default function SlideOptionsPanel({ config, onClose, onApply }: SlideOptionsPanelProps) {
  const [draft, setDraft] = useState<PresentationConfig>(config);

  useEffect(() => {
    setDraft(config);
  }, [config]);

  const updateTitle = (index: number, title: string) => {
    setDraft((prev) => ({
      slides: prev.slides.map((slide, i) => (i === index ? { ...slide, title } : slide)),
    }));
  };

  const removeSlide = (index: number) => {
    setDraft((prev) => ({
      slides: prev.slides.filter((_, i) => i !== index),
    }));
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    setDraft((prev) => ({ slides: moveItem(prev.slides, index, index - 1) }));
  };

  const moveDown = (index: number) => {
    if (index >= draft.slides.length - 1) return;
    setDraft((prev) => ({ slides: moveItem(prev.slides, index, index + 1) }));
  };

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files?.length) return;

    const items: SlideManifestItem[] = [];
    for (const file of Array.from(files)) {
      const html = await file.text();
      items.push(createCustomSlideFromFile(file.name, html));
    }

    setDraft((prev) => ({ slides: [...prev.slides, ...items] }));
  }, []);

  const handleApply = () => {
    if (!draft.slides.length) return;
    savePresentationConfig(draft);
    clearSlideCache();
    onApply(draft);
    onClose();
  };

  const handleReset = () => {
    const defaults = resetPresentationConfig();
    clearSlideCache();
    setDraft(defaults);
    onApply(defaults);
  };

  return (
    <div className="options-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="options-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="options-panel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="options-panel__header">
          <h2 id="options-panel-title">슬라이드 옵션</h2>
          <button type="button" onClick={onClose} aria-label="옵션 닫기">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <div className="options-panel__body">
          <section className="options-section">
            <h3>HTML 파일 추가</h3>
            <p className="options-section__hint">여러 HTML을 선택하면 목록 맨 아래에 순서대로 추가됩니다. 제목은 HTML &lt;title&gt;에서 자동 추출됩니다.</p>
            <label className="options-upload">
              <i className="fa-solid fa-file-arrow-up" aria-hidden="true" />
              HTML 파일 선택
              <input
                type="file"
                accept=".html,text/html"
                multiple
                hidden
                onChange={(event) => void handleFiles(event.target.files)}
              />
            </label>
          </section>

          <section className="options-section">
            <h3>슬라이드 순서 ({draft.slides.length}개)</h3>
            <ol className="options-slide-list">
              {draft.slides.map((slide, index) => (
                <li key={slide.key} className="options-slide-list__item">
                  <span className="options-slide-list__order">{index + 1}</span>
                  <div className="options-slide-list__content">
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(event) => updateTitle(index, event.target.value)}
                      aria-label={`슬라이드 ${index + 1} 제목`}
                    />
                    <span className="options-slide-list__meta">
                      {slide.type === "builtin" ? slide.fileName : "업로드 HTML"}
                    </span>
                  </div>
                  <div className="options-slide-list__actions">
                    <button type="button" onClick={() => moveUp(index)} disabled={index === 0} aria-label="위로">
                      <i className="fa-solid fa-chevron-up" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(index)}
                      disabled={index === draft.slides.length - 1}
                      aria-label="아래로"
                    >
                      <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => removeSlide(index)} aria-label="삭제">
                      <i className="fa-solid fa-trash" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="options-panel__footer">
          <button type="button" className="options-btn options-btn--ghost" onClick={handleReset}>
            기본값 복원
          </button>
          <button type="button" className="options-btn options-btn--primary" onClick={handleApply} disabled={!draft.slides.length}>
            적용
          </button>
        </div>
      </aside>
    </div>
  );
}
