"use client";

import { motion, useReducedMotion } from "framer-motion";

type Milestone = {
  id: string;
  date: string;
  lines: [string, string];
  live?: boolean;
  tone: "live" | "analyze" | "transition" | "integrate";
};

const MILESTONES: Milestone[] = [
  {
    id: "p1",
    date: "2027.03",
    lines: ["주유소 관리", "프로토타입 Live"],
    live: true,
    tone: "live",
  },
  {
    id: "p2",
    date: "2027.07~08",
    lines: ["3PL·유통물류", "분석·요구사항"],
    tone: "analyze",
  },
  {
    id: "p3",
    date: "2027.09~",
    lines: ["3PL", "단계적 전환"],
    tone: "transition",
  },
  {
    id: "p4",
    date: "~2028.12",
    lines: ["유통물류 전환", "· 시스템 통합"],
    tone: "integrate",
  },
];

export default function Slide37RoadmapTrack() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="s37-roadmap-track">
      <div className="s37-roadmap-track__rail" aria-hidden="true">
        <div className="s37-roadmap-track__rail-base" />
        <motion.div
          className="s37-roadmap-track__rail-progress"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {!reduceMotion ? (
          <motion.span
            className="s37-roadmap-track__pulse"
            animate={{ left: ["6%", "94%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
          />
        ) : null}
      </div>

      <div className="s37-roadmap-track__nodes">
        {MILESTONES.map((m, index) => (
          <motion.div
            key={m.id}
            className={`s37-milestone s37-milestone--${m.tone}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : index * 0.12, duration: 0.35 }}
          >
            <div className="s37-milestone__marker-wrap">
              <div className="s37-milestone__marker">
                <span className="s37-milestone__marker-core" />
              </div>
              {m.live ? (
                <span className="s37-milestone__live">
                  <span className="s37-milestone__live-dot" aria-hidden="true" />
                  Live
                </span>
              ) : null}
            </div>
            <time className="s37-milestone__date" dateTime={m.date.replace("~", "")}>
              {m.date}
            </time>
            <div className="s37-milestone__card">
              <span>{m.lines[0]}</span>
              <span>{m.lines[1]}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
