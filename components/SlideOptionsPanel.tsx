"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createCustomSlideFromFile,
  normalizePresentationConfig,
  resetPresentationConfig,
  savePresentationConfig,
  type PresentationConfig,
  type SlideManifestItem,
} from "@/lib/presentationConfig";
import { clearSlideCache } from "@/lib/slideCache";
import {
  exportSlidesToPdf,
  exportSlidesToPptx,
  type ExportProgress,
} from "@/lib/slideExport";

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
  const [draft, setDraft] = useState<PresentationConfig>(() => normalizePresentationConfig(config));
  const [exporting, setExporting] = useState<"pdf" | "pptx" | null>(null);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    setDraft(normalizePresentationConfig(config));
  }, [config]);

  const updateTitle = (index: number, title: string) => {
    setDraft((prev) => ({
      slides: prev.slides.map((slide, i) => (i === index ? { ...slide, title } : slide)),
    }));
  };

  const toggleVisible = (index: number) => {
    setDraft((prev) => ({
      slides: prev.slides.map((slide, i) =>
        i === index ? { ...slide, visible: slide.visible === false } : slide,
      ),
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
      items.push({ ...createCustomSlideFromFile(file.name, html), visible: true });
    }

    setDraft((prev) => ({ slides: [...prev.slides, ...items] }));
  }, []);

  const handleApply = () => {
    if (!draft.slides.length) return;
    const normalized = normalizePresentationConfig(draft);
    savePresentationConfig(normalized);
    clearSlideCache();
    onApply(normalized);
    onClose();
  };

  const handleReset = () => {
    const defaults = resetPresentationConfig();
    clearSlideCache();
    setDraft(defaults);
    onApply(defaults);
  };

  const runExport = async (mode: "pdf" | "pptx") => {
    setExportError(null);
    setExporting(mode);
    setExportProgress({ current: 0, total: draft.slides.filter((s) => s.visible !== false).length, label: "" });

    try {
      const onProgress = (progress: ExportProgress) => setExportProgress(progress);
      if (mode === "pdf") {
        await exportSlidesToPdf(draft.slides, "FaSS-발표자료.pdf", onProgress);
      } else {
        await exportSlidesToPptx(draft.slides, "FaSS-발표자료.pptx", onProgress);
      }
    } catch (error) {
      setExportError(error instanceof Error ? error.message : "보내기에 실패했습니다.");
    } finally {
      setExporting(null);
      setExportProgress(null);
    }
  };

  const visibleCount = draft.slides.filter((s) => s.visible !== false).length;

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
          <h2 id="options-panel-title">발표 설정</h2>
          <button type="button" onClick={onClose} aria-label="설정 닫기">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <div className="options-panel__body">
          <section className="options-section">
            <h3>보내기</h3>
            <p className="options-section__hint">
              발표에 포함(체크)된 슬라이드만 PDF·PowerPoint 파일로 저장합니다. ({visibleCount}페이지)
            </p>
            <div className="options-export-actions">
              <button
                type="button"
                className="options-btn options-btn--ghost"
                disabled={!!exporting || visibleCount === 0}
                onClick={() => void runExport("pdf")}
              >
                <i className="fa-solid fa-file-pdf" aria-hidden="true" />
                PDF 만들기
              </button>
              <button
                type="button"
                className="options-btn options-btn--ghost"
                disabled={!!exporting || visibleCount === 0}
                onClick={() => void runExport("pptx")}
              >
                <i className="fa-solid fa-file-powerpoint" aria-hidden="true" />
                PowerPoint
              </button>
            </div>
            {exporting ? (
              <p className="options-export-status" role="status">
                <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
                {exporting === "pdf" ? "PDF 생성 중" : "PPTX 생성 중"}
                {exportProgress
                  ? ` (${exportProgress.current}/${exportProgress.total}) ${exportProgress.label}`
                  : ""}
              </p>
            ) : null}
            {exportError ? <p className="options-export-error">{exportError}</p> : null}
          </section>

          <section className="options-section">
            <h3>HTML 파일 추가</h3>
            <p className="options-section__hint">
              여러 HTML을 선택하면 목록 맨 아래에 순서대로 추가됩니다. 제목은 HTML &lt;title&gt;에서 자동 추출됩니다.
            </p>
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
            <h3>슬라이드 순서 · 발표 표시 ({draft.slides.length}개)</h3>
            <p className="options-section__hint">
              체크된 슬라이드만 발표 시 이전/다음 탐색에 포함됩니다. 순서는 위·아래 버튼으로 변경합니다.
            </p>
            <ol className="options-slide-list">
              {draft.slides.map((slide, index) => (
                <li
                  key={slide.key}
                  className={`options-slide-list__item${slide.visible === false ? " is-hidden" : ""}`}
                >
                  <label className="options-slide-list__visible" title="발표 시 표시">
                    <input
                      type="checkbox"
                      checked={slide.visible !== false}
                      onChange={() => toggleVisible(index)}
                      aria-label={`슬라이드 ${index + 1} 발표 표시`}
                    />
                  </label>
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
                      {slide.visible === false ? " · 발표 숨김" : ""}
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
          <button
            type="button"
            className="options-btn options-btn--primary"
            onClick={handleApply}
            disabled={!draft.slides.length || visibleCount === 0}
          >
            적용
          </button>
        </div>
      </aside>
    </div>
  );
}
