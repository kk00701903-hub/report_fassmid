"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CodeLane, DesignLane, DocLane } from "@/components/slides/Slide18WorkLanes";

const MODES = [
  {
    id: "code",
    label: "코드",
    file: "OrderApi.java",
    icon: "fa-code",
    desc: "Spring REST · 단위테스트 · API 스텁",
  },
  {
    id: "image",
    label: "이미지",
    file: "dashboard-ui.png",
    icon: "fa-image",
    desc: "Figma 스펙 → UI 목업 · 컴포넌트 프리뷰",
  },
  {
    id: "md",
    label: "MD",
    file: "API-Guide.md",
    icon: "fa-file-lines",
    desc: "README · Wiki · OpenAPI 문서 초안",
  },
] as const;

const CYCLE_MS = 3600;

export default function Slide19DigitalWorkerPanel() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const mode = MODES[active] ?? MODES[0];
  const animating = !reduceMotion;

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % MODES.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="s19-worker-panel">
      <header className="s19-worker-head">
        <motion.div
          className="s19-worker-avatar"
          animate={animating ? { boxShadow: ["0 0 0 rgba(250,204,21,0.2)", "0 0 16px rgba(250,204,21,0.45)", "0 0 0 rgba(250,204,21,0.2)"] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <i className="fas fa-robot" />
        </motion.div>
        <div className="s19-worker-head-text">
          <strong>AI 디지털 워커</strong>
          <span>코드 · 이미지 · MD 파일을 순차 생성</span>
        </div>
        <motion.span
          className="s19-worker-live"
          animate={animating ? { opacity: [1, 0.45, 1] } : undefined}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          ● 생성 중
        </motion.span>
      </header>

      <div className="s19-worker-tabs" role="tablist" aria-label="생성 유형">
        {MODES.map((m, i) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`s19-worker-tab s19-worker-tab--${m.id}${active === i ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <i className={`fas ${m.icon}`} />
            <span>{m.label}</span>
            <em>{m.file}</em>
          </button>
        ))}
      </div>

      <div className={`s19-worker-stage s19-worker-stage--${mode.id}`}>
        <div className="s19-stage-file-bar">
          <i className={`fas ${mode.icon}`} />
          <span>{mode.file}</span>
          {animating ? (
            <motion.span
              className="s19-stage-typing"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            >
              작성 중…
            </motion.span>
          ) : null}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode.id}
            className="s19-stage-screen"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {mode.id === "code" ? (
              <CodeLane reduceMotion={!animating} active />
            ) : mode.id === "image" ? (
              <ImageLane reduceMotion={!animating} active />
            ) : (
              <DocLane reduceMotion={!animating} active />
            )}
          </motion.div>
        </AnimatePresence>

        <p className="s19-stage-desc">{mode.desc}</p>
      </div>

      <footer className="s19-worker-foot">
        <span>
          Human <strong>7</strong>
        </span>
        <span className="s19-foot-plus">+</span>
        <span>
          AI <strong>8</strong>
        </span>
        <span className="s19-foot-eq">=</span>
        <span className="s19-foot-total">15</span>
        <span className="s19-foot-caption">TFT급 추진력 · 지시 → AI 생성 → Human 검수</span>
      </footer>
    </div>
  );
}

function ImageLane({ reduceMotion, active }: { reduceMotion: boolean; active: boolean }) {
  return (
    <div className="s19-image-lane">
      <DesignLane reduceMotion={reduceMotion} active={active} />
      <motion.div
        className="s19-png-badge"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={active && !reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        PNG · 1280×720
      </motion.div>
      {active && !reduceMotion ? (
        <motion.div
          className="s19-scan-line"
          animate={{ top: ["8%", "88%", "8%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </div>
  );
}
