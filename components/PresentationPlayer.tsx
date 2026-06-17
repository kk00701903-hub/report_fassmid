"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import SlideDetailButtons from "@/components/SlideDetailButtons";
import SlideOptionsPanel from "@/components/SlideOptionsPanel";
import { usePresentationConfigState } from "@/hooks/usePresentationConfig";
import SlideStage, { SLIDE_ASPECT, SLIDE_HEIGHT, SLIDE_WIDTH } from "@/components/SlideStage";
import { getBasePath, getSlideHtmlUrl } from "@/lib/basePath";
import type { PresentationConfig, SlideManifestItem } from "@/lib/presentationConfig";
import { prefetchSlides } from "@/lib/slideCache";

type PresentationPlayerProps = {
  initialSlideId: number;
};

type TransitionDirection = "forward" | "back" | "none";

function getSlideSource(item: SlideManifestItem | undefined): { src?: string; srcDoc?: string } {
  if (!item) return {};
  if (item.type === "builtin") {
    return { src: getSlideHtmlUrl(item.fileName) };
  }
  return { srcDoc: item.html };
}

export default function PresentationPlayer({ initialSlideId }: PresentationPlayerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  const { config, applyConfig, isReady } = usePresentationConfigState();

  const [currentIndex, setCurrentIndex] = useState(Math.max(0, initialSlideId - 1));
  const [direction, setDirection] = useState<TransitionDirection>("none");
  const [iframeLoading, setIframeLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const slideCount = config?.slides.length ?? 0;
  const currentItem = config?.slides[currentIndex];
  const currentNumber = currentIndex + 1;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < slideCount - 1;
  const slideSource = getSlideSource(currentItem);
  const hasSlideSource = Boolean(slideSource.src || slideSource.srcDoc);

  const clampIndex = useCallback(
    (index: number) => Math.max(0, Math.min(index, Math.max(0, slideCount - 1))),
    [slideCount],
  );

  const syncRoute = useCallback((index: number) => {
    const slideId = index + 1;
    const basePath = getBasePath();
    window.history.replaceState({ slideId }, "", `${basePath}/slides/${slideId}/`);
  }, []);

  const readIndexFromUrl = useCallback((): number | null => {
    const match = window.location.pathname.match(/\/slides\/(\d+)\/?$/);
    if (!match) return null;
    return Number(match[1]) - 1;
  }, []);

  const goToIndex = useCallback(
    (nextIndex: number, navDirection: TransitionDirection) => {
      if (!config || slideCount === 0) return;
      const clamped = clampIndex(nextIndex);
      if (clamped === currentIndex) return;

      setDirection(navDirection);
      setCurrentIndex(clamped);
      syncRoute(clamped);
    },
    [clampIndex, config, currentIndex, slideCount, syncRoute],
  );

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    goToIndex(currentIndex + 1, "forward");
  }, [canGoNext, currentIndex, goToIndex]);

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    goToIndex(currentIndex - 1, "back");
  }, [canGoPrev, currentIndex, goToIndex]);

  const toggleFullscreen = useCallback(async () => {
    const shell = document.getElementById("presentation-shell");
    if (!shell) return;

    if (!document.fullscreenElement) {
      await shell.requestFullscreen();
      return;
    }

    await document.exitFullscreen();
  }, []);

  const handleConfigApply = useCallback(
    (nextConfig: PresentationConfig) => {
      applyConfig(nextConfig);
      const nextIndex = clampIndex(currentIndex);
      setCurrentIndex(nextIndex);
      syncRoute(nextIndex);
    },
    [applyConfig, clampIndex, currentIndex, syncRoute],
  );

  const updateScale = useCallback(() => {
    if (!viewportRef.current) return;

    const { clientWidth, clientHeight } = viewportRef.current;
    if (clientWidth <= 0 || clientHeight <= 0) return;

    const widthScale = clientWidth / SLIDE_WIDTH;
    const heightScale = clientHeight / SLIDE_HEIGHT;
    setScale(Math.min(widthScale, heightScale));
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIframeLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (!isReady || !config || hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    setCurrentIndex(clampIndex(initialSlideId - 1));
  }, [clampIndex, config, initialSlideId, isReady]);

  useEffect(() => {
    function handlePopState() {
      const index = readIndexFromUrl();
      if (index === null) return;
      setCurrentIndex(clampIndex(index));
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [clampIndex, readIndexFromUrl]);

  useEffect(() => {
    if (!config) return;

    if (!currentItem) {
      setError("표시할 슬라이드가 없습니다. 옵션에서 HTML을 추가해 주세요.");
      setIframeLoading(false);
      return;
    }

    setError(null);
    setIframeLoading(true);
    prefetchSlides(config.slides, currentIndex);
  }, [config, currentIndex, currentItem]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncScale = () => updateScale();

    syncScale();
    const rafId = requestAnimationFrame(syncScale);

    const observer = new ResizeObserver(() => syncScale());
    observer.observe(viewport);

    window.addEventListener("resize", syncScale);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", syncScale);
    };
  }, [updateScale, iframeLoading, sidebarOpen, currentIndex]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (document.querySelector(".detail-panel-backdrop, .options-backdrop")) return;

      if (showOptions && event.key === "Escape") {
        event.preventDefault();
        setShowOptions(false);
        return;
      }

      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goPrev();
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToIndex(0, "back");
      }

      if (event.key === "End") {
        event.preventDefault();
        goToIndex(slideCount - 1, "forward");
      }

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        void toggleFullscreen();
      }

      if (event.key.toLowerCase() === "b") {
        event.preventDefault();
        setSidebarOpen((open) => !open);
      }

      if (event.key.toLowerCase() === "o") {
        event.preventDefault();
        setShowOptions(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, goToIndex, showOptions, slideCount, toggleFullscreen]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let touchStartX = 0;
    let touchStartY = 0;

    function handleTouchStart(event: TouchEvent) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }

    function handleTouchEnd(event: TouchEvent) {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const deltaY = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      if (deltaX < 0) goNext();
      else goPrev();
    }

    viewport.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewport.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      viewport.removeEventListener("touchstart", handleTouchStart);
      viewport.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  if (!isReady || !config) {
    return (
      <div className="presentation-shell">
        <div className="slide-viewer slide-viewer--loading">
          <p>설정을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="presentation-shell"
      className={`presentation-shell presentation-shell--projector ${sidebarOpen ? "presentation-shell--sidebar-open" : ""}`}
    >
      <button
        type="button"
        className="slide-sidebar__toggle"
        onClick={() => setSidebarOpen((open) => !open)}
        title={sidebarOpen ? "목차 숨기기 (B)" : "목차 보기 (B)"}
        aria-expanded={sidebarOpen}
        aria-label={sidebarOpen ? "목차 숨기기" : "목차 보기"}
      >
        <i className={`fa-solid ${sidebarOpen ? "fa-chevron-left" : "fa-chevron-right"}`} aria-hidden="true" />
        <span className="slide-sidebar__toggle-label">목차</span>
      </button>

      <aside className={`slide-sidebar ${sidebarOpen ? "is-open" : ""}`} aria-label="슬라이드 목차">
        <div className="slide-sidebar__header">
          <h2>슬라이드 목차</h2>
          <span className="slide-sidebar__count">{slideCount}페이지</span>
        </div>
        <ol className="slide-sidebar__list">
          {config.slides.map((item, index) => (
            <li key={item.key}>
              <button
                type="button"
                className={index === currentIndex ? "is-active" : undefined}
                onClick={() => goToIndex(index, index > currentIndex ? "forward" : "back")}
              >
                <span className="slide-sidebar__number">{index + 1}</span>
                <span className="slide-sidebar__title">{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="slide-sidebar__footer">
          <button type="button" className="slide-sidebar__footer-btn" onClick={() => setShowOptions(true)} title="옵션 (O)">
            <i className="fa-solid fa-gear" aria-hidden="true" />
          </button>
          <button type="button" className="slide-sidebar__footer-btn" onClick={() => void toggleFullscreen()} title="전체화면 (F)">
            <i className="fa-solid fa-expand" aria-hidden="true" />
          </button>
        </div>
      </aside>

      <div className="projector-layout">
        <div className="projector-stage">
          <div ref={viewportRef} className="projector-viewport" style={{ aspectRatio: `${SLIDE_ASPECT}` }}>
            {error ? (
              <div className="slide-viewer slide-viewer--error">
                <p>{error}</p>
              </div>
            ) : hasSlideSource ? (
              <>
                <SlideStage
                  key={currentItem?.key ?? currentIndex}
                  src={slideSource.src}
                  srcDoc={slideSource.srcDoc}
                  scale={scale}
                  direction={direction}
                  title={currentItem?.title}
                  onLoad={handleIframeLoad}
                />
                {iframeLoading ? (
                  <div className="slide-viewer slide-viewer--loading slide-viewer--overlay">
                    <p>슬라이드를 불러오는 중...</p>
                  </div>
                ) : null}
              </>
            ) : null}

            <button
              type="button"
              className="projector-nav projector-nav--prev"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="이전 슬라이드"
              title="이전 (←)"
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="projector-nav projector-nav--next"
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="다음 슬라이드"
              title="다음 (→)"
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </button>
          </div>
        </div>

        <footer className="projector-footer">
          <button type="button" className="projector-footer__btn" onClick={goPrev} disabled={!canGoPrev}>
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            <span>이전</span>
          </button>

          <div className="projector-footer__info">
            <span className="projector-footer__counter">
              {currentNumber} / {slideCount}
            </span>
            <span className="projector-footer__title" title={currentItem?.title}>
              {currentItem?.title}
            </span>
          </div>

          <button type="button" className="projector-footer__btn" onClick={goNext} disabled={!canGoNext}>
            <span>다음</span>
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </footer>
      </div>

      <SlideDetailButtons slideIndex={currentIndex} manifestItem={currentItem} />

      {showOptions ? (
        <SlideOptionsPanel config={config} onClose={() => setShowOptions(false)} onApply={handleConfigApply} />
      ) : null}
    </div>
  );
}
