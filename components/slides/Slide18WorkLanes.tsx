"use client";

import { type ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const CODE_LINES = [
  { ln: 1, parts: [{ t: "@RestController", c: "ann" }] },
  { ln: 2, parts: [{ t: "public class ", c: "kw" }, { t: "OrderApi", c: "cls" }, { t: " {", c: "" }] },
  { ln: 3, parts: [{ t: '  @PostMapping("/api/order")', c: "ann" }] },
  { ln: 4, parts: [{ t: "  public OrderDto create(...) {", c: "kw" }] },
  { ln: 5, parts: [{ t: "    return svc.save(dto);", c: "" }] },
  { ln: 6, parts: [{ t: "  // AI-generated test ✓", c: "cm" }] },
];

const DOC_LINES = [
  { sym: "# ", text: "Order API Guide" },
  { sym: "## ", text: "Overview" },
  { sym: "- ", text: "POST /api/order" },
  { sym: "- ", text: "Request: OrderDto" },
  { sym: "- ", text: "Response: 201 Created" },
];

const cycleMs = 4200;

type Slide18WorkLanesProps = {
  /** true면 3개 레인을 동시에 강조 (Slide19 백업 레이아웃) */
  allActive?: boolean;
};

export default function Slide18WorkLanes({ allActive = false }: Slide18WorkLanesProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (allActive || reduceMotion) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % 3), cycleMs);
    return () => window.clearInterval(id);
  }, [reduceMotion, allActive]);

  const isActive = (index: number) => (allActive ? true : active === index);

  return (
    <div className="s18-lanes">
      <LaneCard
        id="code"
        active={isActive(0)}
        icon="fa-code"
        title="코딩 지원"
        foot="Claude Code · Cursor — 보일러플레이트·단위테스트 자동 생성"
        color="var(--s18-code)"
      >
        <CodeLane reduceMotion={!!reduceMotion} active={isActive(0)} />
      </LaneCard>

      <LaneCard
        id="design"
        active={isActive(1)}
        icon="fa-palette"
        title="디자인 지원"
        foot="Figma · Adobe — 컴포넌트·스토리북·가이드 정리"
        color="var(--s18-design)"
      >
        <DesignLane reduceMotion={!!reduceMotion} active={isActive(1)} />
      </LaneCard>

      <LaneCard
        id="doc"
        active={isActive(2)}
        icon="fa-file-lines"
        title="문서 작업"
        foot="README · Wiki · API Doc — 회의록·RAG 컨텍스트 자동 작성"
        color="var(--s18-doc)"
      >
        <DocLane reduceMotion={!!reduceMotion} active={isActive(2)} />
      </LaneCard>
    </div>
  );
}

function LaneCard({
  id,
  active,
  icon,
  title,
  foot,
  color,
  children,
}: {
  id: string;
  active: boolean;
  icon: string;
  title: string;
  foot: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <motion.article
      className={`s18-lane s18-lane--${id}`}
      style={{ "--lane-color": color } as React.CSSProperties}
      animate={
        active
          ? {
              scale: 1.01,
              boxShadow: "0 0 0 1px rgba(0,120,212,0.28), 0 4px 14px rgba(0,120,212,0.1)",
            }
          : { scale: 1, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="s18-lane-head">
        <i className={`fas ${icon}`} />
        <span>{title}</span>
        <AnimatePresence>
          {active ? (
            <motion.span
              className="s18-lane-live"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
            >
              작업 중
            </motion.span>
          ) : null}
        </AnimatePresence>
      </header>
      <div className="s18-lane-screen">{children}</div>
      <footer className="s18-lane-foot">{foot}</footer>
    </motion.article>
  );
}

export function CodeLane({ reduceMotion, active }: { reduceMotion: boolean; active: boolean }) {
  return (
    <div className="s18-code-view">
      <motion.div
        className="s18-code-scroll"
        animate={reduceMotion || !active ? { y: 0 } : { y: [0, -18, -36, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {CODE_LINES.map((row, i) => (
          <motion.div
            key={row.ln}
            className="s18-code-line"
            initial={{ opacity: 0.3, x: -6 }}
            animate={
              active && !reduceMotion
                ? { opacity: 1, x: 0 }
                : { opacity: 0.55, x: 0 }
            }
            transition={{ delay: i * 0.22, duration: 0.35 }}
          >
            <span className="s18-code-ln">{row.ln}</span>
            <span className="s18-code-txt">
              {row.parts.map((p, j) => (
                <span key={j} className={p.c ? `tok-${p.c}` : undefined}>
                  {p.t}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <motion.span
        className="s18-code-caret"
        animate={active && !reduceMotion ? { opacity: [1, 0, 1] } : { opacity: 0.4 }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
}

export function DesignLane({ reduceMotion, active }: { reduceMotion: boolean; active: boolean }) {
  const dur = reduceMotion ? 0 : 5.5;
  return (
    <div className="s18-design-canvas">
      <motion.div
        className="s18-ui-btn"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.45, scale: 0.95 }}
        transition={{ duration: 0.4, repeat: active && !reduceMotion ? Infinity : 0, repeatDelay: dur }}
      >
        Button
      </motion.div>
      <motion.div
        className="s18-ui-input"
        initial={{ opacity: 0, width: "20%" }}
        animate={active ? { opacity: 1, width: "88%" } : { opacity: 0.4, width: "70%" }}
        transition={{ delay: 0.35, duration: 0.5, repeat: active && !reduceMotion ? Infinity : 0, repeatDelay: dur }}
      />
      <motion.div
        className="s18-ui-card"
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 4 }}
        transition={{ delay: 0.7, duration: 0.45, repeat: active && !reduceMotion ? Infinity : 0, repeatDelay: dur }}
      >
        <div className="s18-ui-card-h" />
        <motion.div
          className="s18-ui-card-b"
          animate={active && !reduceMotion ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      {active && !reduceMotion ? (
        <motion.div
          className="s18-design-cursor"
          animate={{
            x: [8, 52, 72, 40, 8],
            y: [14, 14, 48, 48, 14],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </div>
  );
}

export function DocLane({ reduceMotion, active }: { reduceMotion: boolean; active: boolean }) {
  return (
    <div className="s18-doc-view">
      {DOC_LINES.map((line, i) => (
        <motion.div
          key={line.text}
          className="s18-md-line"
          initial={{ opacity: 0, x: -8, width: 0 }}
          animate={
            active && !reduceMotion
              ? { opacity: 1, x: 0, width: "100%" }
              : { opacity: 0.45, x: 0, width: "100%" }
          }
          transition={{ delay: i * 0.18, duration: 0.35, repeat: active && !reduceMotion ? Infinity : 0, repeatDelay: 3.2 }}
        >
          <span className="s18-md-sym">{line.sym}</span>
          <motion.span
            className="s18-md-txt"
            animate={
              active && !reduceMotion
                ? { clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)"] }
                : { clipPath: "inset(0 0 0 0)" }
            }
            transition={{ delay: i * 0.18 + 0.1, duration: 0.5, repeat: active && !reduceMotion ? Infinity : 0, repeatDelay: 3.2 }}
          >
            {line.text}
          </motion.span>
        </motion.div>
      ))}
      <AnimatePresence>
        {active ? (
          <motion.span
            className="s18-doc-done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            ✓ .md 초안
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
