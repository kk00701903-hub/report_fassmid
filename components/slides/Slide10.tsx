"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import { getBasePath } from "@/lib/basePath";
import "./styles/Slide10.css";

const VALUES = [
  {
    letter: "F",
    title: "Faster",
    subtitle: "신속성",
    description: (
      <>
        신속한 개발 및 배포 환경을 구축하고, <strong>Next.js SSR</strong> 도입을 통해 고객이 체감하는 응답
        속도를 극대화합니다.
      </>
    ),
  },
  {
    letter: "a",
    title: "Agile",
    subtitle: "민첩성",
    description: (
      <>
        비즈니스 변화에 유연하게 대응하는 <strong>컨테이너 기반의 블록 조립형(모듈러)</strong> 아키텍처를
        지향합니다.
      </>
    ),
  },
  {
    letter: "S",
    title: "Smarter",
    subtitle: "지능화",
    description: (
      <>
        <strong>AI 기반의 지능형 운영</strong>, 수요 예측 및 AI 코딩 에이전트를 통해 플랫폼 스스로 진화하는
        시스템을 구축합니다.
      </>
    ),
  },
  {
    letter: "S",
    title: "Stronger",
    subtitle: "강건함",
    description: (
      <>
        강력한 보안 체계(<strong>Stateless JWT</strong>) 및 무중단 데이터 동기화를 통해 비즈니스 리스크를
        제로화합니다.
      </>
    ),
  },
] as const;

export default function Slide10() {
  return (
    <SlideCanvas slideId={10} motion="cards" motionTier="medium">
      <div className="fass-identity-slide-root fluent-slide">
        <div className="title-region-wrapper">
          <div className="title-region-main">
            <div className="title-region-bar" />
            <h1 className="title-region-text">FaSS 플랫폼 아이덴티티</h1>
          </div>
          <div className="title-region-line" />
        </div>

        <div className="fass-identity-main-container">
          <div className="fass-identity-left-flow-section">
            <div className="fass-identity-rail-vertical-line" aria-hidden="true" />
            {VALUES.map((item) => (
              <div key={item.title} className="fass-identity-value-item-row">
                <div className="fass-identity-value-marker">
                  <span className="fass-identity-value-marker-letter">{item.letter}</span>
                </div>
                <div className="fass-identity-value-text-block">
                  <div className="fass-identity-value-heading-group">
                    <span className="fass-identity-value-title">{item.title}</span>
                    <span className="fass-identity-value-subtitle">{item.subtitle}</span>
                  </div>
                  <p className="fass-identity-value-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="fass-identity-right-vision-section">
            <div className="fass-identity-logo-info-card">
              <div className="fass-identity-logo-visual-wrap">
                <img
                  alt="FASS 로고"
                  className="fass-identity-logo-image"
                  src={`${getBasePath()}/assets/slides/fass-logo.png`}
                />
              </div>
              <h2 className="fass-identity-logo-title">FaSS 로고 디자인 의미</h2>
              <div className="fass-identity-logo-body-text">
                클라우드와 무한 궤도(Infinity), 상승 화살표가 결합된 형상으로{" "}
                <strong>지속적 성장</strong>과 <strong>클라우드 확장성</strong>을 상징합니다.
                <br />
                <br />
                (주)제때의 <strong>물류 비즈니스 연속성</strong>과 한계 없는 <strong>외부 확장성</strong>을
                시각적으로 표현합니다.
              </div>
              <div className="fass-identity-logo-keyword-tag">
                <i className="fas fa-link" aria-hidden="true" />
                비즈니스 무한 확장
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
