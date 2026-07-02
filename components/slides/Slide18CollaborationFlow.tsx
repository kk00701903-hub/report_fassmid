"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PROMPTS = [
  "「 API 스펙 설계 완료 — 백엔드 모듈 구현해줘 」",
  "「 UI 와이어프레임 승인 — Figma 컴포넌트 정리해줘 」",
  "「 회의록·README·OpenAPI 문서 작성 부탁해 」",
];

export default function Slide18CollaborationFlow() {
  const reduceMotion = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setIdx((v) => (v + 1) % PROMPTS.length), 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="s18-flow">
      <div className="s18-flow-top">
        <span>
          <i className="fas fa-play-circle" /> Human → Digital Worker 협업
        </span>
        <motion.span
          className="s18-live-badge"
          animate={reduceMotion ? undefined : { opacity: [1, 0.55, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          ● LIVE
        </motion.span>
      </div>

      <div className="s18-flow-row">
        <motion.div
          className="s18-human"
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="s18-human-avatar">
            <i className="fas fa-user-tie" />
          </div>
          <span className="s18-human-label">
            TFT
            <br />
            담당자
          </span>
        </motion.div>

        <div className="s18-speech-wrap">
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              className="s18-speech"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {PROMPTS[idx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          className="s18-ai"
          animate={
            reduceMotion
              ? undefined
              : { boxShadow: ["0 0 8px rgba(250,204,21,0.2)", "0 0 20px rgba(250,204,21,0.45)", "0 0 8px rgba(250,204,21,0.2)"] }
          }
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="s18-ai-avatar">
            <i className="fas fa-robot" />
          </div>
          <span className="s18-ai-label">
            디지털
            <br />
            워커
          </span>
        </motion.div>
      </div>
    </div>
  );
}
