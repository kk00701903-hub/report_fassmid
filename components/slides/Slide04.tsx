"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import { MiniShipScene, Slide04LogisticsHero, Slide04SystemHero } from "@/components/slides/Slide04Visuals";
import "./styles/Slide04.css";

const CONCEPTS = [
  {
    num: "01",
    title: "표준화",
    en: "Standardization",
    variant: "standard" as const,
  },
  {
    num: "02",
    title: "이식성",
    en: "Portability",
    variant: "port" as const,
  },
  {
    num: "03",
    title: "격리",
    en: "Isolation",
    variant: "isolated" as const,
  },
] as const;

function TierConceptCard({ item }: { item: (typeof CONCEPTS)[number] }) {
  return (
    <div className="s04-concept-card s04-concept-card--logistics">
      <div className="s04-concept-card__head">
        <span className="s04-concept-card__num">{item.num}</span>
        <div>
          <h3 className="s04-concept-card__title">{item.title}</h3>
          <span className="s04-concept-card__en">{item.en}</span>
        </div>
      </div>
      <div className="s04-concept-card__visual s04-concept-card__visual--logistics">
        <MiniShipScene variant={item.variant} />
      </div>
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
            <h1>추진 방향성 설명 ② — 도커 (Docker) / 컨테이너 (Container)</h1>
          </div>
          <p className="sub">
            Docker 컨테이너는 물류 선박·컨테이너처럼 프로그램을 표준 규격으로 묶어 어디서든 같은 방식으로 배포 (업그레이드)·실행
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <section className="s04-tier s04-tier--logistics">
            <header className="s04-tier__header">
              <span className="s04-tier__badge">① 물류 현장</span>
              <h2 className="s04-tier__title">컨테이너 사용 이유</h2>
            </header>
            <Slide04LogisticsHero />
            <div className="s04-tier__cards">
              {CONCEPTS.map((item) => (
                <TierConceptCard key={`logistics-${item.num}`} item={item} />
              ))}
            </div>
          </section>

          <section className="s04-tier s04-tier--system">
            <header className="s04-tier__header">
              <span className="s04-tier__badge s04-tier__badge--system">② IT 시스템</span>
              <h2 className="s04-tier__title">FaSS Docker 컨테이너 — 위와 같은 원리를 IT에 적용</h2>
            </header>
            <Slide04SystemHero />
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
