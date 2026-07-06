"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useSlideDiagramMotion } from "@/components/slides/motion/SlideMotionReadyContext";
import { hexToRgbTriplet, mixHex } from "@/lib/cssColor";

/** color-mix 없이 캡처 안전한 accent 파생 변수 묶음 */
function nodeAccentVars(accent: string): CSSProperties {
  return {
    "--node-accent": accent,
    "--node-accent-rgb": hexToRgbTriplet(accent),
    "--node-accent-pending": mixHex(accent, "#323130", 0.55),
    "--node-accent-icon-bg": mixHex(accent, "#ffffff", 0.1),
    "--node-accent-icon-border": mixHex(accent, "#cbd5e1", 0.35),
  } as CSSProperties;
}

const NODES = [
  {
    id: "client",
    title: "Client",
    example: "당사 임직원",
    tech: "Browser",
    accent: "#6366f1",
    icon: "fa-user-tie",
  },
  {
    id: "browser",
    title: "Web browser",
    example: "www.jette.co.kr",
    tech: "Browser",
    accent: "#2563eb",
    icon: "fa-globe",
  },
  {
    id: "web",
    title: "Web Server",
    example: "홈페이지 · UI 화면",
    tech: "Nginx · Next.js",
    accent: "#0078d4",
    icon: "fa-window-maximize",
  },
  {
    id: "was",
    title: "WAS",
    example: "수주 · 물류 · 정산 API",
    tech: "Java · Spring",
    accent: "#0891b2",
    icon: "fa-gears",
  },
  {
    id: "db",
    title: "Database",
    example: "거래 · 재고 · 배송 데이터",
    tech: "PostgreSQL",
    accent: "#107c10",
    icon: "fa-database",
  },
] as const;

const FLOW_STEPS = [
  "① 사용자가 jette.co.kr 접속 URL 입력",
  "② 브라우저에 jette.co.kr 홈페이지 UI가 렌더링됨",
  "③ Web Server(프론트엔드)가 jette UI 화면을 전달",
  "④ WAS가 물류·주문 업무 로직 처리",
  "⑤ DB에서 재고·배송 데이터 조회 후 화면에 반영",
] as const;

type NodeState = "pending" | "active" | "visited";

function getNodeState(index: number, activeStep: number): NodeState {
  if (index === activeStep) return "active";
  if (index < activeStep) return "visited";
  return "pending";
}

function JetteSiteMock({
  variant = "browser",
  state = "pending",
  accent,
}: {
  variant?: "browser" | "server";
  state?: NodeState;
  accent: string;
}) {
  const site = (
    <div className={`jette-site-mock__page ${variant === "server" ? "jette-site-mock__page--server" : ""}`}>
      <div className="jette-site-mock__header">
        <span className="jette-site-mock__logo">JETTE</span>
        <div className="jette-site-mock__nav">
          <span>회사소개</span>
          <span>사업영역</span>
          <span>물류인프라</span>
        </div>
      </div>
      <div className="jette-site-mock__hero">
        <p>
          제때가 만드는
          <br />
          <strong>모두가 행복한 미래</strong>
        </p>
        <span className="jette-site-mock__scroll">SCROLL</span>
      </div>
      <div className="jette-site-mock__biz">
        <span>물류대행</span>
        <span>유통물류</span>
        <span>수송·배송</span>
      </div>
      {variant === "server" ? <div className="jette-site-mock__serve-tag">UI · HTML 전달</div> : null}
    </div>
  );

  const cls = `jette-site-mock jette-site-mock--${variant} jette-site-mock--${state}`;

  if (variant === "browser") {
    return (
      <div className={cls} style={nodeAccentVars(accent)}>
        <div className="jette-site-mock__chrome">
          <span className="jette-site-mock__dot" />
          <span className="jette-site-mock__dot" />
          <span className="jette-site-mock__dot" />
          <span className="jette-site-mock__url">https://www.jette.co.kr/</span>
        </div>
        {site}
      </div>
    );
  }

  return (
    <div className={cls} style={nodeAccentVars(accent)}>
      {site}
    </div>
  );
}

function FlowPipe({
  active,
  visited,
  reduceMotion,
}: {
  active: boolean;
  visited: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <div className={`arch-pipe ${active ? "is-active" : ""} ${visited ? "is-visited" : ""}`}>
      <div className="arch-pipe__line" aria-hidden="true" />
      {!reduceMotion && active ? (
        <motion.span
          className="arch-pipe__packet"
          animate={{ left: ["8%", "88%"] }}
          transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      ) : null}
      <div className="arch-pipe__arrows">
        <motion.span
          className="arch-pipe__arrow arch-pipe__arrow--fwd"
          animate={active && !reduceMotion ? { opacity: [0.4, 1, 0.4], x: [0, 4, 0] } : { opacity: visited ? 0.85 : 0.45 }}
          transition={{ duration: 1.1, repeat: active ? Infinity : 0 }}
        >
          →
        </motion.span>
        <motion.span
          className="arch-pipe__arrow arch-pipe__arrow--back"
          animate={active && !reduceMotion ? { opacity: [0.4, 1, 0.4], x: [0, -4, 0] } : { opacity: visited ? 0.85 : 0.45 }}
          transition={{ duration: 1.1, repeat: active ? Infinity : 0, delay: 0.12 }}
        >
          ←
        </motion.span>
      </div>
    </div>
  );
}

function ArchNode({
  node,
  state,
  reduceMotion,
}: {
  node: (typeof NODES)[number];
  state: NodeState;
  reduceMotion: boolean | null;
}) {
  const isBrowser = node.id === "browser";
  const isWebServer = node.id === "web";
  const isMock = isBrowser || isWebServer;

  return (
    <motion.div
      className={`arch-node arch-node--${node.id} arch-node--${state}`}
      style={nodeAccentVars(node.accent)}
      animate={
        state === "active" && !reduceMotion && !isMock
          ? { scale: [1, 1.04, 1] }
          : state === "active" && !reduceMotion
            ? { scale: [1, 1.02, 1] }
            : { scale: 1 }
      }
      transition={{ duration: 1.25, repeat: state === "active" ? Infinity : 0, ease: "easeInOut" }}
    >
      <div className="arch-node__box">
        <div className="arch-node__title">{node.title}</div>

        {isBrowser ? (
          <JetteSiteMock variant="browser" state={state} accent={node.accent} />
        ) : isWebServer ? (
          <JetteSiteMock variant="server" state={state} accent={node.accent} />
        ) : (
          <>
            <div className="arch-node__icon">
              <i className={`fas ${node.icon}`} aria-hidden="true" />
            </div>
            <div className="arch-node__example">{node.example}</div>
          </>
        )}
      </div>
      <div className="arch-node__tech">{node.tech}</div>
    </motion.div>
  );
}

export default function Slide03ArchDiagram() {
  const reduceMotion = useReducedMotion();
  const { ready } = useSlideDiagramMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduceMotion || !ready) return;
    const id = window.setInterval(
      () => setActiveStep((v) => (v + 1) % FLOW_STEPS.length),
      2400,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, ready]);

  return (
    <div className="arch-stack">
      <div className="arch-diagram-classic">
        <div className="arch-zone-row">
          <div className="arch-zone-banner arch-zone-banner--fe">Front-End</div>
          <div className="arch-zone-banner arch-zone-banner--be">Back-End</div>
        </div>

        <div className="arch-pipeline-wrap">
          <div className="arch-zone-bg arch-zone-bg--fe" aria-hidden="true" />
          <div className="arch-zone-bg arch-zone-bg--be" aria-hidden="true" />

          <div className="arch-pipeline">
            {NODES.map((node, i) => {
              const state = getNodeState(i, activeStep);
              const pipeActive = activeStep === i;
              const pipeVisited = activeStep > i;

              return (
                <div key={node.id} className={`arch-pipeline__segment arch-pipeline__segment--${node.id}`}>
                  <ArchNode node={node} state={state} reduceMotion={reduceMotion} />
                  {i < NODES.length - 1 ? (
                    <FlowPipe active={pipeActive} visited={pipeVisited} reduceMotion={reduceMotion} />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="arch-zone-captions">
          <span className="arch-zone-caption arch-zone-caption--fe">
            프론트엔드 — jette.co.kr 화면 (사용자 · 브라우저)
          </span>
          <span className="arch-zone-caption arch-zone-caption--be">백엔드 — Web Server · WAS · DB</span>
        </div>
      </div>

      <motion.div
        key={activeStep}
        className="arch-flow-caption"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {FLOW_STEPS[activeStep]}
      </motion.div>
    </div>
  );
}
