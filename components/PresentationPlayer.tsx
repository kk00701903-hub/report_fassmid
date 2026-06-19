"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import SlideDetailButtons from "@/components/SlideDetailButtons";
import SlidePartIndicator from "@/components/SlidePartIndicator";
import SlideOptionsPanel from "@/components/SlideOptionsPanel";
import { usePresentationConfigState } from "@/hooks/usePresentationConfig";
import SlideStage, { SLIDE_ASPECT, SLIDE_HEIGHT, SLIDE_WIDTH } from "@/components/SlideStage";
import { getBasePath, getSlideHtmlUrl } from "@/lib/basePath";
import { isSlideVisible, type PresentationConfig, type SlideManifestItem } from "@/lib/presentationConfig";
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

function findAdjacentVisibleIndex(slides: SlideManifestItem[], from: number, delta: 1 | -1): number {
  let index = from + delta;
  while (index >= 0 && index < slides.length) {
    if (isSlideVisible(slides[index])) return index;
    index += delta;
  }
  return from;
}

function findFirstVisibleIndex(slides: SlideManifestItem[]): number {
  const index = slides.findIndex(isSlideVisible);
  return index >= 0 ? index : 0;
}

function findLastVisibleIndex(slides: SlideManifestItem[]): number {
  for (let i = slides.length - 1; i >= 0; i--) {
    if (isSlideVisible(slides[i])) return i;
  }
  return Math.max(0, slides.length - 1);
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slideCount = config?.slides.length ?? 0;
  const currentItem = config?.slides[currentIndex];
  const currentNumber = currentIndex + 1;
  const slideSource = getSlideSource(currentItem);
  const hasSlideSource = Boolean(slideSource.src || slideSource.srcDoc);

  const visibleCount = useMemo(
    () => (config ? config.slides.filter(isSlideVisible).length : 0),
    [config],
  );

  const visiblePosition = useMemo(() => {
    if (!config) return 0;
    return config.slides.slice(0, currentIndex + 1).filter(isSlideVisible).length;
  }, [config, currentIndex]);

  const canGoPrev = useMemo(() => {
    if (!config) return false;
    return findAdjacentVisibleIndex(config.slides, currentIndex, -1) !== currentIndex;
  }, [config, currentIndex]);

  const canGoNext = useMemo(() => {
    if (!config) return false;
    return findAdjacentVisibleIndex(config.slides, currentIndex, 1) !== currentIndex;
  }, [config, currentIndex]);

  const currentIsHidden = currentItem ? !isSlideVisible(currentItem) : false;

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
    if (!config || !canGoNext) return;
    const nextIndex = findAdjacentVisibleIndex(config.slides, currentIndex, 1);
    goToIndex(nextIndex, "forward");
  }, [canGoNext, config, currentIndex, goToIndex]);

  const goPrev = useCallback(() => {
    if (!config || !canGoPrev) return;
    const prevIndex = findAdjacentVisibleIndex(config.slides, currentIndex, -1);
    goToIndex(prevIndex, "back");
  }, [canGoPrev, config, currentIndex, goToIndex]);

  const toggleFullscreen = useCallback(async () => {
    const shell = document.getElementById("presentation-shell");
    if (!shell) return;

    try {
      if (!document.fullscreenElement) {
        await shell.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* fullscreen blocked */
    }
  }, []);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement?.id === "presentation-shell");
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleConfigApply = useCallback(
    (nextConfig: PresentationConfig) => {
      applyConfig(nextConfig);
      let nextIndex = clampIndex(currentIndex);
      const slide = nextConfig.slides[nextIndex];
      if (!slide || !isSlideVisible(slide)) {
        nextIndex = findFirstVisibleIndex(nextConfig.slides);
      }
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
    const initial = clampIndex(initialSlideId - 1);
    const slide = config.slides[initial];
    setCurrentIndex(slide && isSlideVisible(slide) ? initial : findFirstVisibleIndex(config.slides));
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
      setError("표시할 슬라이드가 없습니다. 설정에서 슬라이드를 추가해 주세요.");
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
  }, [updateScale, iframeLoading, sidebarOpen, currentIndex, isFullscreen]);

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
        if (config) goToIndex(findFirstVisibleIndex(config.slides), "back");
      }

      if (event.key === "End") {
        event.preventDefault();
        if (config) goToIndex(findLastVisibleIndex(config.slides), "forward");
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
  }, [config, goNext, goPrev, goToIndex, showOptions, toggleFullscreen]);

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
      className={`presentation-shell presentation-shell--projector ${sidebarOpen ? "presentation-shell--sidebar-open" : ""} ${isFullscreen ? "presentation-shell--fullscreen" : ""}`}
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
          <span className="slide-sidebar__count">
            {visibleCount}/{slideCount} 표시
          </span>
        </div>
        <ol className="slide-sidebar__list">
          {config.slides.map((item, index) => (
            <li key={item.key}>
              <button
                type="button"
                className={`${index === currentIndex ? "is-active" : ""}${!isSlideVisible(item) ? " is-hidden-slide" : ""}`}
                onClick={() => goToIndex(index, index > currentIndex ? "forward" : "back")}
              >
                <span className="slide-sidebar__number">{index + 1}</span>
                <span className="slide-sidebar__title">
                  {!isSlideVisible(item) ? (
                    <i className="fa-solid fa-eye-slash slide-sidebar__hidden-icon" aria-hidden="true" />
                  ) : null}
                  {item.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="slide-sidebar__footer">
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

                {!iframeLoading && !error ? (
                  <div className="projector-click-layer" aria-hidden="true">
                    <button
                      type="button"
                      className="projector-click-zone projector-click-zone--prev"
                      onClick={goPrev}
                      disabled={!canGoPrev}
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      className="projector-click-zone projector-click-zone--next"
                      onClick={goNext}
                      disabled={!canGoNext}
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </div>
                ) : null}
              </>
            ) : null}

            <SlidePartIndicator manifestItem={currentItem} />
          </div>
        </div>

        <footer className="projector-footer">
          <button
            type="button"
            className="projector-footer__btn projector-footer__btn--settings"
            onClick={() => setShowOptions(true)}
            title="발표 설정 (O)"
            aria-label="발표 설정"
          >
            <i className="fa-solid fa-gear" aria-hidden="true" />
            <span>설정</span>
          </button>

          <button type="button" className="projector-footer__btn" onClick={goPrev} disabled={!canGoPrev}>
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            <span>이전</span>
          </button>

          <div className="projector-footer__info">
            <span className="projector-footer__counter">
              {currentIsHidden ? (
                <>
                  {currentNumber} / {slideCount}
                  <span className="projector-footer__hidden-badge">숨김</span>
                </>
              ) : (
                <>
                  {visiblePosition} / {visibleCount}
                </>
              )}
            </span>
            <span className="projector-footer__title" title={currentItem?.title}>
              {currentItem?.title}
            </span>
          </div>

          <button
            type="button"
            className="projector-footer__btn projector-footer__btn--fullscreen"
            onClick={() => void toggleFullscreen()}
            title={isFullscreen ? "전체화면 종료 (F)" : "전체화면 (F)"}
            aria-label={isFullscreen ? "전체화면 종료" : "전체화면"}
          >
            <i className={`fa-solid ${isFullscreen ? "fa-compress" : "fa-expand"}`} aria-hidden="true" />
            <span>{isFullscreen ? "종료" : "전체화면"}</span>
          </button>

          <button type="button" className="projector-footer__btn" onClick={goNext} disabled={!canGoNext}>
            <span>다음</span>
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </footer>
      </div>

      <SlideDetailButtons slideIndex={currentIndex} manifestItem={currentItem} />

      {isFullscreen ? (
        <button
          type="button"
          className="projector-fullscreen-exit"
          onClick={() => void toggleFullscreen()}
          title="전체화면 종료 (F)"
          aria-label="전체화면 종료"
        >
          <i className="fa-solid fa-compress" aria-hidden="true" />
          <span>전체화면 종료</span>
        </button>
      ) : null}

      {showOptions ? (
        <SlideOptionsPanel config={config} onClose={() => setShowOptions(false)} onApply={handleConfigApply} />
      ) : null}
    </div>
  );
}
