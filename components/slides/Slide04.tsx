"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import { MiniDockerScene, MiniShipScene, Slide04ShipHero } from "@/components/slides/Slide04Visuals";
import "./styles/Slide04.css";

const CONCEPTS = [
  {
    num: "01",
    title: "규격의 표준화",
    en: "Standardization",
    variant: "standard" as const,
    logistics:
      "쌀·TV·부품 등 내용물이 달라도 **동일 규격의 철제 컨테이너**에 실어 하역·선적 효율을 극대화합니다.",
    it: "언어·설정이 다른 프로그램도 **동일 규격의 도커 컨테이너**에 담아 빠르고 일관된 배포가 가능합니다.",
  },
  {
    num: "02",
    title: "완벽한 이식성",
    en: "Portability",
    variant: "port" as const,
    logistics:
      "부산항에서 실은 컨테이너를 미국 도착 후에도 **배·기차·트럭에 그대로** 옮겨 실어 운송합니다.",
    it: "개발 PC에서 검증한 컨테이너가 **Live 서버·클라우드**에서도 동일하게 에러 없이 실행됩니다.",
  },
  {
    num: "03",
    title: "화물의 독립성",
    en: "Isolation",
    variant: "isolated" as const,
    logistics:
      "의류와 액체류를 **각기 다른 컨테이너**에 분리 적재해 냄새 섞임·오염을 차단합니다.",
    it: "한 서버에 여러 컨테이너를 띄워도 철저히 분리 — 한 서비스 장애가 **다른 서비스에 영향 없음**.",
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

export default function Slide04() {
  return (
    <SlideCanvas slideId={4} motion="compare" motionTier="medium">
      <div className="slide fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">C-LEVEL PRIMER</span>
            <h1>도커(Docker) 컨테이너란?</h1>
          </div>
          <p className="sub">
            물류의 <strong>배 + 철제 컨테이너</strong>를 그림으로 이해하면, IT의 도커 컨테이너 개념이 한눈에
            들어옵니다.
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <Slide04ShipHero />

          <div className="compare-cards">
            {CONCEPTS.map((item) => (
              <div key={item.num} className="compare-card">
                <div className="card-head">
                  <span className="card-num">{item.num}</span>
                  <div className="card-title-wrap">
                    <h2 className="card-title">{item.title}</h2>
                    <span className="card-en">{item.en}</span>
                  </div>
                </div>
                <div className="card-split">
                  <div className="card-side card-side--logistics">
                    <div className="card-visual card-visual--logistics">
                      <MiniShipScene variant={item.variant} />
                    </div>
                    <span className="side-label">물류 · 배 &amp; 컨테이너</span>
                    <p>
                      <RichText text={item.logistics} />
                    </p>
                  </div>
                  <div className="card-bridge" aria-hidden="true">
                    <i className="fas fa-arrows-left-right" />
                  </div>
                  <div className="card-side card-side--it">
                    <div className="card-visual card-visual--it">
                      <MiniDockerScene variant={item.variant} />
                    </div>
                    <span className="side-label">IT · 도커</span>
                    <p>
                      <RichText text={item.it} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="k8s-banner">
            <div className="k8s-icon">
              <i className="fas fa-tower-broadcast" />
            </div>
            <div className="k8s-body">
              <div className="k8s-title">
                <span className="k8s-tag">운영 자동화</span>
                쿠버네티스(K8s) = 무인 자동화 항만 관제탑
              </div>
              <p className="k8s-desc">
                쏟아지는 수백 개의 컨테이너(앱)를 사람이 일일이 관리할 수 없습니다. 쿠버네티스는{" "}
                <strong>빈 트럭(서버 자원)</strong>을 찾아 컨테이너를 자동 배치하고, 트래픽 폭주 시{" "}
                <strong>동일 컨테이너를 자동 복제(투입)</strong>하는 완벽한 무인 관제탑 역할을 수행합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
