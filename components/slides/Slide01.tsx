"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import { getPartDividerEntries } from "@/lib/deckManifest";
import "./styles/Slide01.css";

const COVER_BG =
  "https://agents-download.skywork.ai/image/ppt/7467390590712455169/03c74e0b26cc32ff7c809ac5088e2e3b.png";

export default function Slide01() {
  const partEntries = getPartDividerEntries();

  return (
    <SlideCanvas slideId={1} motion="cover" motionTier="medium" style={{ background: "#0a0e1a" }}>
      <div className="fass-report-slide-root">
        <div className="fass-background-image-container">
          <img
            alt="FaSS Platform Background"
            className="fass-background-image-element"
            src={COVER_BG}
          />
        </div>
        <div className="fass-content-overlay-layer">
          <div className="fass-cover-main">
            <div className="fass-cover-top">
              <div className="fass-top-header-section">
                <div className="fass-company-brand-label">
                  <div className="fass-brand-accent-bar" />
                  (주)제때
                </div>
              </div>
              <h1 className="fass-title-main-heading">
                차세대 <span>FaSS 플랫폼</span> 구축
                <br />
                중간 보고
              </h1>
            </div>
            <div className="fass-cover-middle">
              <p className="fass-subtitle-description-text">
                &quot;AI와 결합된 디지털 물류의 표준, IT를 넘어 회사의 새로운 수익을 창출하다&quot;
              </p>
              <div className="fass-vision-statement-container">
                <div className="fass-vision-slogan-label">Vision Slogan</div>
                <div className="fass-vision-content-text">
                  상용 솔루션의 종속을 끊고, AI와 글로벌 웹 표준으로 무장한 독자적 비즈니스 엔진의
                  성공적 안착
                </div>
              </div>
            </div>
            <div className="fass-cover-bottom">
              <div className="fass-footer-info-group">
                <div className="fass-info-item-box">
                  <div className="fass-info-label-text">Department</div>
                  <div className="fass-info-value-text">차세대웹프레임워크 TFT</div>
                </div>
                <div className="fass-info-item-box">
                  <div className="fass-info-label-text">Date</div>
                  <div className="fass-info-value-text">2026. 7.7</div>
                </div>
              </div>
            </div>
          </div>

          <aside className="fass-cover-toc" aria-label="슬라이드 목차">
            <div className="fass-cover-toc__label">CONTENTS</div>
            <ol className="fass-cover-toc__list">
              {partEntries.map((entry) => (
                <li key={entry.slideId} className="fass-cover-toc__item cover-keyword-item">
                  <span className="fass-cover-toc__part">
                    PART {String(entry.partNumber).padStart(2, "0")}
                  </span>
                  <span className="fass-cover-toc__title">{entry.partTitleKo}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </SlideCanvas>
  );
}
