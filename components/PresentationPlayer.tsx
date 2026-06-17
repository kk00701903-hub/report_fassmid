"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SlideDetailButtons from "@/components/SlideDetailButtons";
import SlideOptionsPanel from "@/components/SlideOptionsPanel";
import { usePresentationConfigState } from "@/hooks/usePresentationConfig";
import SlideStage, { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/components/SlideStage";
import { getBasePath } from "@/lib/basePath";
import type { ParsedSlide } from "@/lib/parseSlideHtml";
import type { PresentationConfig } from "@/lib/presentationConfig";
import { getSlideContent, prefetchSlides } from "@/lib/slideCache";

type PresentationPlayerProps = {
  initialSlideId: number;
};

type TransitionDirection = "forward" | "back" | "none";

export default function PresentationPlayer({ initialSlideId }: PresentationPlayerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadVersionRef = useRef(0);
  const hasInitializedRef = useRef(false);

  const { config, applyConfig, isReady } = usePresentationConfigState();

  const [currentIndex, setCurrentIndex] = useState(Math.max(0, initialSlideId - 1));
  const [direction, setDirection] = useState<TransitionDirection>("none");
  const [slide, setSlide] = useState<ParsedSlide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [presentationMode, setPresentationMode] = useState(false);
  const [showChrome, setShowChrome] = useState(true);
  const [showToc, setShowToc] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const slideCount = config?.slides.length ?? 0;
  const currentItem = config?.slides[currentIndex];
  const currentNumber = currentIndex + 1;

  const clampIndex = useCallback(
    (index: number) => Math.max(0, Math.min(index, Math.max(0, slideCount - 1))),
    [slideCount],
  );

  const syncRoute = useCallback((index: number) => {
    const slideId = index + 1;
    const basePath = getBasePath();
    const url = `${basePath}/slides/${slideId}/`;
    window.history.replaceState({ slideId }, "", url);
  }, []);

  const readIndexFromUrl = useCallback((): number | null => {
    const match = window.location.pathname.match(/\/slides\/(\d+)\/?$/);
    if (!match) return null;
    return Number(match[1]) - 1;
  }, []);

  const loadSlideAt = useCallback(
    async (index: number, activeConfig: PresentationConfig) => {
      const item = activeConfig.slides[index];
      const version = ++loadVersionRef.current;

      if (!item) {
        setError("표시할 슬라이드가 없습니다. 옵션에서 HTML을 추가해 주세요.");
        setSlide(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const parsed = await getSlideContent(item);
        if (version !== loadVersionRef.current) return;
        setSlide(parsed);
        prefetchSlides(activeConfig.slides, index);
      } catch (loadError) {
        if (version !== loadVersionRef.current) return;
        const message = loadError instanceof Error ? loadError.message : "알 수 없는 오류";
        setError(`슬라이드를 불러오지 못했습니다. (${message})`);
        setSlide(null);
      } finally {
        if (version === loadVersionRef.current) {
          setLoading(false);
        }
      }
    },
    [],
  );

  const goToIndex = useCallback(
    (nextIndex: number, navDirection: TransitionDirection) => {
      if (!config || slideCount === 0) return;
      const clamped = clampIndex(nextIndex);
      if (clamped === currentIndex) return;

      setDirection(navDirection);
      setCurrentIndex(clamped);
      setShowToc(false);
      syncRoute(clamped);
    },
    [clampIndex, config, currentIndex, slideCount, syncRoute],
  );

  const goNext = useCallback(() => goToIndex(currentIndex + 1, "forward"), [currentIndex, goToIndex]);
  const goPrev = useCallback(() => goToIndex(currentIndex - 1, "back"), [currentIndex, goToIndex]);

  const resetChromeTimer = useCallback(() => {
    if (!presentationMode) {
      setShowChrome(true);
      return;
    }

    setShowChrome(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowChrome(false), 3000);
  }, [presentationMode]);

  const togglePresentationMode = useCallback(async () => {
    const shell = document.getElementById("presentation-shell");
    if (!shell) return;

    if (!presentationMode) {
      setPresentationMode(true);
      setShowChrome(true);
      if (!document.fullscreenElement) {
        await shell.requestFullscreen().catch(() => undefined);
      }
      return;
    }

    setPresentationMode(false);
    setShowChrome(true);
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
    }
  }, [presentationMode]);

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
    if (!isReady || !config) return;
    void loadSlideAt(currentIndex, config);
  }, [config, currentIndex, isReady, loadSlideAt]);

  const updateScale = useCallback(() => {
    if (!viewerRef.current) return;

    const { clientWidth, clientHeight } = viewerRef.current;
    const chromeHeight = presentationMode && !showChrome ? 0 : 56;
    const availableHeight = clientHeight - chromeHeight;
    const widthScale = clientWidth / SLIDE_WIDTH;
    const heightScale = availableHeight / SLIDE_HEIGHT;
    const fitScale = Math.min(widthScale, heightScale);
    setScale(presentationMode ? fitScale : Math.min(fitScale, 1));
  }, [presentationMode, showChrome]);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale, loading]);

  useEffect(() => {
    resetChromeTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [currentIndex, presentationMode, resetChromeTimer]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (document.querySelector(".detail-panel-backdrop, .options-backdrop")) return;

      if ((showToc || showOptions) && event.key === "Escape") {
        event.preventDefault();
        setShowToc(false);
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

      if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        void togglePresentationMode();
      }

      if (event.key.toLowerCase() === "o") {
        event.preventDefault();
        setShowOptions(true);
      }

      resetChromeTimer();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    goNext,
    goPrev,
    goToIndex,
    resetChromeTimer,
    showOptions,
    showToc,
    slideCount,
    toggleFullscreen,
    togglePresentationMode,
  ]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    let touchStartX = 0;
    let touchStartY = 0;

    function handleTouchStart(event: TouchEvent) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      resetChromeTimer();
    }

    function handleTouchEnd(event: TouchEvent) {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const deltaY = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      if (deltaX < 0) goNext();
      else goPrev();
    }

    viewer.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewer.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      viewer.removeEventListener("touchstart", handleTouchStart);
      viewer.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev, resetChromeTimer]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !presentationMode) return;

    function handleClick(event: MouseEvent) {
      const zone = (event.target as HTMLElement).closest("[data-nav]") as HTMLElement | null;
      if (!zone) return;
      if (zone.dataset.nav === "prev") goPrev();
      if (zone.dataset.nav === "next") goNext();
      resetChromeTimer();
    }

    viewer.addEventListener("click", handleClick);
    return () => viewer.removeEventListener("click", handleClick);
  }, [goNext, goPrev, presentationMode, resetChromeTimer]);

  useEffect(() => {
    function handleFullscreenChange() {
      if (!document.fullscreenElement) {
        setPresentationMode(false);
        setShowChrome(true);
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const progress = slideCount > 0 ? (currentNumber / slideCount) * 100 : 0;

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
      className={`presentation-shell ${presentationMode ? "presentation-shell--present" : ""} ${showChrome ? "presentation-shell--chrome-visible" : "presentation-shell--chrome-hidden"}`}
      onMouseMove={resetChromeTimer}
    >
      <header className="presentation-header presentation-header--compact">
        <div className="presentation-header__left">
          <span className="presentation-header__badge" title={currentItem?.title}>
            {currentNumber}
          </span>
          <SlideDetailButtons slideIndex={currentIndex} manifestItem={currentItem} />
        </div>

        <div className="presentation-toolbar">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => setShowOptions(true)}
            title="슬라이드 옵션 (O)"
            aria-label="슬라이드 옵션"
          >
            <i className="fa-solid fa-gear" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => setShowToc((open) => !open)}
            title="목차"
            aria-expanded={showToc}
            aria-label="목차"
          >
            <i className="fa-solid fa-list" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`toolbar-btn ${presentationMode ? "is-active" : ""}`}
            onClick={() => void togglePresentationMode()}
            title="발표 모드 (P)"
            aria-label="발표 모드"
          >
            <i className="fa-solid fa-person-chalkboard" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => void toggleFullscreen()}
            title="전체화면 (F)"
            aria-label="전체화면"
          >
            <i className="fa-solid fa-expand" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => goToIndex(0, "back")}
            title="처음으로"
            aria-label="처음 슬라이드"
          >
            <i className="fa-solid fa-house" aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className="presentation-main presentation-main--compact">
        <div ref={viewerRef} className="presentation-viewer-area">
          {loading && !slide ? (
            <div className="slide-viewer slide-viewer--loading">
              <p>슬라이드를 불러오는 중...</p>
            </div>
          ) : error && !slide ? (
            <div className="slide-viewer slide-viewer--error">
              <p>{error}</p>
              <button type="button" className="toolbar-btn" onClick={() => setShowOptions(true)}>
                <i className="fa-solid fa-gear" aria-hidden="true" /> 옵션 열기
              </button>
            </div>
          ) : slide ? (
            <SlideStage
              key={`${currentItem?.key ?? currentIndex}-${currentIndex}`}
              slide={slide}
              scale={scale}
              direction={direction}
              presentationMode={presentationMode}
            />
          ) : null}
        </div>

        <div className="presentation-progress" aria-hidden="true">
          <div className="presentation-progress__bar" style={{ width: `${progress}%` }} />
        </div>

        <nav className="slide-nav slide-nav--compact" aria-label="슬라이드 네비게이션">
          <button
            type="button"
            className="toolbar-btn"
            onClick={goPrev}
            disabled={currentIndex <= 0}
            title="이전"
            aria-label="이전 슬라이드"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>

          <span className="slide-nav__counter" title={currentItem?.title}>
            {currentNumber}/{slideCount}
          </span>

          <button
            type="button"
            className="toolbar-btn"
            onClick={goNext}
            disabled={currentIndex >= slideCount - 1}
            title="다음"
            aria-label="다음 슬라이드"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </nav>
      </main>

      {showToc ? (
        <aside className="slide-controls__toc" aria-label="슬라이드 목차">
          <div className="slide-controls__toc-header">
            <h2>목차</h2>
            <button type="button" onClick={() => setShowToc(false)} aria-label="목차 닫기">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>
          <ol>
            {config.slides.map((item, index) => (
              <li key={item.key}>
                <button
                  type="button"
                  className={index === currentIndex ? "is-active" : undefined}
                  onClick={() => goToIndex(index, index > currentIndex ? "forward" : "back")}
                >
                  <span className="slide-controls__toc-number">{index + 1}</span>
                  <span className="slide-controls__toc-title">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>
      ) : null}

      {showOptions && config ? (
        <SlideOptionsPanel config={config} onClose={() => setShowOptions(false)} onApply={handleConfigApply} />
      ) : null}
    </div>
  );
}
