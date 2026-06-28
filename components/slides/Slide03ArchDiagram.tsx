"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type FlowStep = "search" | "request" | "process" | "response" | "result";

const STEPS: { key: FlowStep; badge: string; label: string }[] = [
  { key: "search", badge: "① 검색", label: "사용자가 검색어 입력" },
  { key: "request", badge: "② 요청", label: "브라우저 → 서버로 요청 전송" },
  { key: "process", badge: "처리", label: "프론트엔드 · WAS · DB 순서 처리" },
  { key: "response", badge: "③ 응답", label: "처리 결과를 화면으로 반환" },
  { key: "result", badge: "④ 결과확인", label: "사용자가 결과 확인" },
];

const BACKEND_LAYERS = [
  { id: "fe", name: "프론트엔드", desc: "화면 · UI · 정적 자원", icon: "fe" as const },
  { id: "was", name: "WAS", desc: "업무 로직 · API", icon: "was" as const },
  { id: "db", name: "DB", desc: "데이터 저장소", icon: "db" as const },
];

function ServerIcon({ type }: { type: "fe" | "was" | "db" }) {
  if (type === "db") {
    return (
      <div className="server-icon server-icon--db">
        <div className="db-cylinder">
          <div className="db-top" />
          <div className="db-body" />
        </div>
      </div>
    );
  }

  const tone = type === "fe" ? "server-icon--fe" : "server-icon--was";
  return (
    <div className={`server-icon ${tone}`}>
      <div className="server-blade" />
      <div className="server-blade" />
      <div className="server-blade" />
    </div>
  );
}

export default function Slide03ArchDiagram() {
  const reduceMotion = useReducedMotion();
  const [stepIdx, setStepIdx] = useState(0);
  const [processIdx, setProcessIdx] = useState(0);
  const step = STEPS[stepIdx];
  const isSearch = step.key === "search";
  const isRequest = step.key === "request";
  const isProcess = step.key === "process";
  const isResponse = step.key === "response";
  const isResult = step.key === "result";

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setStepIdx((v) => (v + 1) % STEPS.length), 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || step.key !== "process") {
      setProcessIdx(0);
      return;
    }
    const id = window.setInterval(() => setProcessIdx((v) => (v + 1) % BACKEND_LAYERS.length), 700);
    return () => window.clearInterval(id);
  }, [reduceMotion, step.key]);

  const activeLayer =
    isProcess ? BACKEND_LAYERS[processIdx]?.id : isRequest ? "fe" : isResponse ? "db" : null;

  return (
    <div className="arch-diagram">
      <div className={`arch-zone arch-zone--client ${isSearch || isRequest || isResult ? "is-active" : ""}`}>
        <div className="arch-zone-label">
          <span className="arch-zone-line" />
          <span>사용자 화면 (Browser)</span>
          <span className="arch-zone-line" />
        </div>

        <div className="arch-fe-stack">
          <motion.div
            className={`browser-mock ${isSearch || isRequest ? "is-lit" : ""}`}
            animate={reduceMotion || !isSearch ? undefined : { scale: [1, 1.02, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <div className="browser-chrome">
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span className="browser-dot" />
            </div>
            <div className="browser-body browser-body--search">
              <span className="browser-input">
                컴퓨터
                {(isSearch || isRequest) && (
                  <motion.span
                    className="browser-cursor"
                    animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </span>
              <motion.span
                className="browser-btn"
                animate={reduceMotion || !isSearch ? undefined : { scale: [1, 1.06, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                검색
              </motion.span>
            </div>
            <div className={`arch-step-badge ${isSearch || isRequest ? "is-on" : ""}`}>① 검색</div>
          </motion.div>

          <motion.div
            className={`browser-mock ${isResult || isResponse ? "is-lit" : ""}`}
            animate={reduceMotion || !isResult ? undefined : { scale: [1, 1.02, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <div className="browser-chrome">
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span className="browser-dot" />
            </div>
            <div className="browser-body browser-body--result">
              <AnimatePresence mode="wait">
                {isResult || isResponse ? (
                  <motion.span
                    key="result"
                    className="browser-result"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Computer
                  </motion.span>
                ) : (
                  <motion.span key="placeholder" className="browser-result browser-result--dim">
                    ···
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className={`arch-step-badge ${isResult ? "is-on" : ""}`}>④ 결과확인</div>
          </motion.div>
        </div>
      </div>

      <div className="arch-mid-flow">
        <div className={`arch-flow-row arch-flow-row--req ${isRequest ? "is-active" : ""}`}>
          <span className="arch-flow-label">② 요청</span>
          <span className="arch-flow-arrow">
            <i className="fas fa-arrow-right" />
          </span>
          {!reduceMotion && isRequest && (
            <motion.span
              className="arch-flow-packet"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 24, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        <div className={`arch-flow-row arch-flow-row--res ${isResponse ? "is-active" : ""}`}>
          <span className="arch-flow-arrow">
            <i className="fas fa-arrow-left" />
          </span>
          <span className="arch-flow-label">③ 응답</span>
          {!reduceMotion && isResponse && (
            <motion.span
              className="arch-flow-packet arch-flow-packet--back"
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: -24, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        <div className="arch-flow-status">
          <motion.span
            key={step.key}
            className="arch-flow-status-text"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step.label}
          </motion.span>
          {!reduceMotion && (
            <motion.span
              className="arch-live-dot"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              ●
            </motion.span>
          )}
        </div>
      </div>

      <div className={`arch-zone arch-zone--be arch-zone--scope ${isProcess || isRequest || isResponse ? "is-active" : ""}`}>
        <div className="scope-ribbon">
          <i className="fas fa-bullseye" /> 본 프로젝트 구축 영역 — 프론트엔드 · WAS · DB
        </div>
        <div className="arch-zone-label arch-zone-label--be">
          <span className="arch-zone-line" />
          <span>백엔드 (Back-End)</span>
          <span className="arch-zone-line" />
        </div>
        <div className="arch-be-row">
          {BACKEND_LAYERS.map((layer, i) => {
            const lit = isProcess
              ? i <= processIdx
              : isRequest
                ? layer.id === "fe"
                : isResponse
                  ? layer.id === "db"
                  : activeLayer === layer.id;

            return (
              <div key={layer.id} className="arch-be-unit">
                <motion.div
                  className={`arch-server arch-server--${layer.id} ${lit ? "is-lit" : ""}`}
                  animate={
                    reduceMotion || !lit
                      ? undefined
                      : { boxShadow: ["0 0 0 rgba(0,120,212,0)", "0 0 16px rgba(0,120,212,0.35)", "0 0 0 rgba(0,120,212,0)"] }
                  }
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <ServerIcon type={layer.icon} />
                  <div className="server-name">{layer.name}</div>
                  <div className="server-desc">{layer.desc}</div>
                </motion.div>
                {i < BACKEND_LAYERS.length - 1 && (
                  <div className={`arch-connector ${lit ? "is-lit" : ""}`}>
                    <motion.i
                      className="fas fa-exchange-alt"
                      animate={reduceMotion || !isProcess ? undefined : { rotate: [0, 180, 360] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
