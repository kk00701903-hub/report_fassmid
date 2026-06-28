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
  "② 브라우저가 웹서버에 화면(HTML·UI) 요청",
  "③ WAS가 물류·주문 업무 로직 처리",
  "④ DB에서 재고·배송 데이터 조회",
  "⑤ 처리 결과가 브라우저 화면으로 표시",
];

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
  return (
    <motion.div
      className={`arch-node ${lit ? "is-lit" : ""}`}
      animate={lit ? { scale: [1, 1.03, 1] } : { scale: 1 }}
      transition={{ duration: 1.4, repeat: lit ? Infinity : 0 }}
    >
      <div className="arch-node__box">
        <div className="arch-node__title">{node.title}</div>
        <div className="arch-node__icon">
          <i className={`fas ${node.icon}`} />
        </div>
        <div className="arch-node__example">{node.example}</div>
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
    const id = window.setInterval(() => setActiveHop((v) => (v + 1) % (NODES.length - 1)), 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="arch-stack">
      <div className="jette-example-band">
        <div className="jette-example-band__label">
          <i className="fas fa-truck-fast" /> 실제 예시 —{" "}
          <a href="https://www.jette.co.kr/" target="_blank" rel="noopener noreferrer">
            www.jette.co.kr
          </a>
        </div>
        <div className="jette-browser-mock">
          <div className="jette-browser-mock__chrome">
            <span className="jette-browser-mock__dot" />
            <span className="jette-browser-mock__dot" />
            <span className="jette-browser-mock__dot" />
            <span className="jette-browser-mock__url">https://www.jette.co.kr/</span>
          </div>
          <div className="jette-browser-mock__body">
            <strong>JETTE</strong>
            <span>제때가 만드는 모두가 행복한 미래</span>
            <em>물류대행 · 유통물류 · 물류정보시스템(FaSS)</em>
          </div>
        </div>
      </div>

      <div className="arch-diagram-classic">
        <div className="arch-zone-row">
          <div className="arch-zone-banner arch-zone-banner--fe">Front-End</div>
          <div className="arch-zone-banner arch-zone-banner--be">Back-End</div>
        </div>

        <div className="arch-pipeline">
          {NODES.map((node, i) => (
            <div key={node.id} className="arch-pipeline__segment">
              <ArchNode node={node} lit={activeHop === i || activeHop === i - 1} />
              {i < NODES.length - 1 ? <BidirectionalArrows active={activeHop === i} /> : null}
            </div>
          ))}
        </div>

        <div className="arch-zone-captions">
          <span className="arch-zone-caption arch-zone-caption--fe">프론트엔드 — 사용자·브라우저</span>
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
