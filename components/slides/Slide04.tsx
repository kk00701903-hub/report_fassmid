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
      "품목·규격이 달라도 **동일 규격 컨테이너**로 적재·하역을 표준화하여 선적 효율을 극대화합니다.",
    it: "언어·환경이 다른 서비스도 **Docker 컨테이너** 단위로 패키징하여 배포·운영의 일관성을 확보합니다.",
  },
  {
    num: "02",
    title: "이식성",
    en: "Portability",
    variant: "port" as const,
    logistics:
      "부산항 적재 컨테이너를 미국 도착 후에도 **선박·열차·트럭에 그대로** 연결하여 운송합니다.",
    it: "개발·검증 환경과 **Live·클라우드**에서 동일 이미지를 실행하여 환경 차이로 인한 장애 리스크를 줄입니다.",
  },
  {
    num: "03",
    title: "서비스 격리",
    en: "Isolation",
    variant: "isolated" as const,
    logistics:
      "의류와 액체류를 **각기 다른 컨테이너**에 분리 적재하여 교차 오염·품질 리스크를 차단합니다.",
    it: "동일 서버 내 컨테이너를 철저히 분리하여, 단일 서비스 장애가 **타 서비스로 확산되지 않습니다**.",
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
            <h1>Docker 컨테이너 — 배포 표준화 개념</h1>
          </div>
          <p className="sub">
            물류 현장의 <strong>컨테이너선·철제 컨테이너</strong> 운영 원칙을 FaSS 배포 체계에 적용할 때의{" "}
            <strong>표준화 · 이식 · 격리</strong> 3대 효과를 보고드립니다.
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
                쿠버네티스(K8s) — 컨테이너 무인 관제 체계
              </div>
              <p className="k8s-desc">
                FaSS 차세대에서는 다수 컨테이너의 <strong>자동 배치·스케일링</strong>이 필수입니다. Kubernetes는
                유휴 서버 자원을 탐색해 컨테이너를 배치하고, 트래픽 급증 시{" "}
                <strong>동일 컨테이너를 자동 복제·투입</strong>하여 가용성을 유지하는 무인 관제 체계입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
