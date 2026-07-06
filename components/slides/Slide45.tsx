"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import { getBasePath } from "@/lib/basePath";
import "./styles/Slide45.css";

const SEATS = [
  { role: "대표이사님", accent: "head" },
  { role: "관리담당 전무님", accent: "left" },
  { role: "운영담당", accent: "right" },
  { role: "시스템 사업부장", accent: "left" },
  { role: "경영기획팀장", accent: "right" },
  { role: "영업지원팀장", accent: "right" },
  { role: "기충영 프로", accent: "left" },
  { role: "김희찬 프로", accent: "left" },
  { role: "송민준 프로", accent: "left" },
  { role: "발표자 (정보전략팀장)", accent: "speaker" },
] as const;

export default function Slide45() {
  return (
    <SlideCanvas slideId={45} motion="cards" motionTier="subtle">
      <div className="slide fluent-slide s45-root">
        <header className="title-region">
          <div className="title-header">
            <div className="title-bar" />
            <span className="s45-badge">APPENDIX</span>
            <h1 className="title-main">#. 별첨 회의 좌석 배치도</h1>
          </div>
          <div className="title-line" />
        </header>

        <div className="s45-body">
          <figure className="s45-figure">
            <img
              className="s45-image"
              src={`${getBasePath()}/assets/slides/seat-map.png`}
              alt="회의 좌석 배치도"
            />
          </figure>

          <aside className="s45-legend" aria-label="좌석 배치 요약">
            <div className="s45-legend-head">
              <i className="fas fa-users" aria-hidden="true" /> 좌석 배치 요약
            </div>
            <ul className="s45-legend-list">
              {SEATS.map((seat) => (
                <li key={seat.role} className={`s45-legend-item s45-legend-item--${seat.accent}`}>
                  <span className="s45-legend-dot" aria-hidden="true" />
                  <span className="s45-legend-role">{seat.role}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </SlideCanvas>
  );
}
