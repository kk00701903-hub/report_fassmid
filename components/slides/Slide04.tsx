"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import {
  MiniDockerScene,
  MiniShipScene,
  Slide04LogisticsHero,
  Slide04SystemHero,
} from "@/components/slides/Slide04Visuals";
import "./styles/Slide04.css";

const CONCEPTS = [
  {
    num: "01",
    title: "표준화",
    en: "Standardization",
    variant: "standard" as const,
    logistics: "쌀·TV·부품 등 **내용물이 달라도** 같은 크기 **철제 컨테이너**에 싣습니다. 어디서든 같은 방식으로 옮깁니다.",
    system: "FaSS-WEB·API·DB 등 **프로그램마다** 같은 **Docker 컨테이너 규격**으로 묶어 배포합니다.",
  },
  {
    num: "02",
    title: "이식성",
    en: "Portability",
    variant: "port" as const,
    logistics: "부산항에 실은 컨테이너를 **다시 포장하지 않고** 배·열차·트럭에 **그대로** 연결해 운송합니다.",
    system: "개발실에서 검증한 그대로 **운영 서버·클라우드**에 옮겨 실행합니다. 환경 차이로 인한 오류를 줄입니다.",
  },
  {
    num: "03",
    title: "격리",
    en: "Isolation",
    variant: "isolated" as const,
    logistics: "냉동 식품과 일반 화물을 **컨테이너를 나눠** 섞이거나 오염되지 않게 운반합니다.",
    system: "주문·재고 등 **프로그램을 분리** 실행합니다. 하나에 문제가 생겨도 **다른 프로그램은 정상** 동작합니다.",
  },
] as const;

function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

function TierConceptCard({
  item,
  tier,
}: {
  item: (typeof CONCEPTS)[number];
  tier: "logistics" | "system";
}) {
  const isLogistics = tier === "logistics";

  return (
    <div className={`s04-concept-card s04-concept-card--${tier}`}>
      <div className="s04-concept-card__head">
        <span className="s04-concept-card__num">{item.num}</span>
        <div>
          <h3 className="s04-concept-card__title">{item.title}</h3>
          <span className="s04-concept-card__en">{item.en}</span>
        </div>
      </div>
      <div className={`s04-concept-card__visual s04-concept-card__visual--${tier}`}>
        {isLogistics ? <MiniShipScene variant={item.variant} /> : <MiniDockerScene variant={item.variant} />}
      </div>
      <p className="s04-concept-card__text">
        <RichText text={isLogistics ? item.logistics : item.system} />
      </p>
    </div>
  );
}

export default function Slide04() {
  return (
    <SlideCanvas slideId={4} motion="compare" motionTier="medium">
      <div className="slide fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">C-LEVEL PRIMER</span>
            <h1>Docker 컨테이너 — 배와 컨테이너로 이해하기</h1>
          </div>
          <p className="sub">
            위쪽은 <strong>제때 물류 현장(배·컨테이너)</strong>, 아래쪽은 <strong>FaSS IT 시스템</strong>입니다.{" "}
            <strong>표준화 · 이식 · 격리</strong>라는 같은 원리가 IT에도 적용됩니다.
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <section className="s04-tier s04-tier--logistics">
            <header className="s04-tier__header">
              <span className="s04-tier__badge">① 물류 현장</span>
              <h2 className="s04-tier__title">배와 철제 컨테이너 — 제때가 매일 쓰는 방식</h2>
            </header>
            <Slide04LogisticsHero />
            <div className="s04-tier__cards">
              {CONCEPTS.map((item) => (
                <TierConceptCard key={`logistics-${item.num}`} item={item} tier="logistics" />
              ))}
            </div>
          </section>

          <div className="s04-tier-bridge" aria-hidden="true">
            <div className="s04-tier-bridge__line" />
            <div className="s04-tier-bridge__pill">
              <i className="fas fa-arrow-down" />
              <span>같은 3가지 원리</span>
              <strong>표준화 · 이식 · 격리</strong>
              <i className="fas fa-arrow-down" />
            </div>
            <div className="s04-tier-bridge__line" />
          </div>

          <section className="s04-tier s04-tier--system">
            <header className="s04-tier__header">
              <span className="s04-tier__badge s04-tier__badge--system">② IT 시스템</span>
              <h2 className="s04-tier__title">FaSS Docker 컨테이너 — 위와 같은 원리를 IT에 적용</h2>
            </header>
            <Slide04SystemHero />
            <div className="s04-tier__cards">
              {CONCEPTS.map((item) => (
                <TierConceptCard key={`system-${item.num}`} item={item} tier="system" />
              ))}
            </div>
          </section>

          <div className="k8s-banner">
            <div className="k8s-icon">
              <i className="fas fa-tower-broadcast" />
            </div>
            <div className="k8s-body">
              <div className="k8s-title">
                <span className="k8s-tag">운영 자동화</span>
                Kubernetes(K8s) — 컨테이너가 많아질 때의 &apos;무인 관제탑&apos;
              </div>
              <p className="k8s-desc">
                컨테이너가 수십·수백 개가 되면 사람이 일일이 관리하기 어렵습니다. Kubernetes는 항만 관제탑처럼{" "}
                <strong>빈 서버를 찾아 자동 배치</strong>하고, 업무가 몰리면{" "}
                <strong>같은 컨테이너를 자동으로 복제</strong>합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
