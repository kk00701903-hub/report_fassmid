"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NODES = [
  {
    id: "client",
    title: "Client",
    titleKo: "사용자",
    example: "제때 임직원 · CEO",
    tech: "Browser",
    zone: "fe" as const,
    icon: "fa-user-tie",
  },
  {
    id: "browser",
    title: "Web browser",
    titleKo: "웹 브라우저",
    example: "www.jette.co.kr",
    tech: "Browser",
    zone: "fe" as const,
    icon: "fa-globe",
  },
  {
    id: "web",
    title: "Web Server",
    titleKo: "프론트엔드",
    example: "홈페이지 · UI 화면",
    tech: "Nginx · Next.js",
    zone: "be" as const,
    icon: "fa-window-maximize",
  },
  {
    id: "was",
    title: "WAS",
    titleKo: "업무 서버",
    example: "수주 · 물류 · 정산 API",
    tech: "Java · Spring",
    zone: "be" as const,
    icon: "fa-gears",
  },
  {
    id: "db",
    title: "Database",
    titleKo: "데이터베이스",
    example: "거래 · 재고 · 배송 데이터",
    tech: "PostgreSQL",
    zone: "be" as const,
    icon: "fa-database",
  },
] as const;

const FLOW_STEPS = [
  "① 사용자가 jette.co.kr 접속 URL 입력",
  "② 브라우저에 jette.co.kr 홈페이지 UI가 렌더링됨",
  "③ Web Server(프론트엔드)가 jette UI 화면을 전달",
  "④ WAS가 물류·주문 업무 로직 처리",
  "⑤ DB에서 재고·배송 데이터 조회 후 화면에 반영",
];

function JetteSiteMock({
  variant = "browser",
  lit = false,
}: {
  variant?: "browser" | "server";
  lit?: boolean;
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
      {variant === "server" ? (
        <div className="jette-site-mock__serve-tag">UI · HTML 전달</div>
      ) : null}
    </div>
  );

  if (variant === "browser") {
    return (
      <div className={`jette-site-mock jette-site-mock--browser ${lit ? "is-lit" : ""}`}>
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

  return <div className={`jette-site-mock jette-site-mock--server ${lit ? "is-lit" : ""}`}>{site}</div>;
}

function BidirectionalArrows({ active }: { active: boolean }) {
  return (
    <div className={`arch-pipe ${active ? "is-active" : ""}`}>
      <div className="arch-pipe__track">
        <motion.span
          className="arch-pipe__arrow arch-pipe__arrow--fwd"
          animate={active ? { opacity: [0.35, 1, 0.35], x: [0, 3, 0] } : undefined}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          →
        </motion.span>
        <motion.span
          className="arch-pipe__arrow arch-pipe__arrow--back"
          animate={active ? { opacity: [0.35, 1, 0.35], x: [0, -3, 0] } : undefined}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.15 }}
        >
          ←
        </motion.span>
      </div>
    </div>
  );
}

function ArchNode({
  node,
  lit,
}: {
  node: (typeof NODES)[number];
  lit: boolean;
}) {
  const isBrowser = node.id === "browser";
  const isWebServer = node.id === "web";

  return (
    <motion.div
      className={`arch-node arch-node--${node.id} ${lit ? "is-lit" : ""}`}
      animate={lit && !isBrowser && !isWebServer ? { scale: [1, 1.03, 1] } : { scale: 1 }}
      transition={{ duration: 1.4, repeat: lit && !isBrowser && !isWebServer ? Infinity : 0 }}
    >
      <div className="arch-node__box">
        <div className="arch-node__title">{node.title}</div>

        {isBrowser ? (
          <JetteSiteMock variant="browser" lit={lit} />
        ) : isWebServer ? (
          <JetteSiteMock variant="server" lit={lit} />
        ) : (
          <>
            <div className="arch-node__icon">
              <i className={`fas ${node.icon}`} />
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
  const [activeHop, setActiveHop] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setActiveHop((v) => (v + 1) % FLOW_STEPS.length), 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="arch-stack">
      <div className="arch-diagram-classic">
        <div className="arch-zone-row">
          <div className="arch-zone-banner arch-zone-banner--fe">Front-End</div>
          <div className="arch-zone-banner arch-zone-banner--be">Back-End</div>
        </div>

        <div className="arch-pipeline">
          {NODES.map((node, i) => (
            <div key={node.id} className={`arch-pipeline__segment arch-pipeline__segment--${node.id}`}>
              <ArchNode node={node} lit={activeHop === i || activeHop === i - 1} />
              {i < NODES.length - 1 ? <BidirectionalArrows active={activeHop === i} /> : null}
            </div>
          ))}
        </div>

        <div className="arch-zone-captions">
          <span className="arch-zone-caption arch-zone-caption--fe">
            프론트엔드 — jette.co.kr 화면 (사용자 · 브라우저)
          </span>
          <span className="arch-zone-caption arch-zone-caption--be">백엔드 — Web Server · WAS · DB</span>
        </div>
      </div>

      <motion.div
        key={activeHop}
        className="arch-flow-caption"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {FLOW_STEPS[activeHop] ?? FLOW_STEPS[0]}
      </motion.div>
    </div>
  );
}
