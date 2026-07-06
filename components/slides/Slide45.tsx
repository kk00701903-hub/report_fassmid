"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import { getBasePath } from "@/lib/basePath";
import "./styles/Slide45.css";

const SEATS = [
  { role: "대표이사님", desc: "상석 · 최고 의사결정", accent: "head" },
  { role: "관리담당 전무님", desc: "관리 총괄", accent: "left" },
  { role: "시스템 사업부장", desc: "사업 부문 총괄", accent: "left" },
  { role: "기충영 프로", desc: "프로젝트 리더", accent: "left" },
  { role: "김희찬 프로", desc: "BE 엔지니어", accent: "left" },
  { role: "송민준 프로", desc: "BE 엔지니어", accent: "left" },
  { role: "운영담당", desc: "운영 지원", accent: "right" },
  { role: "경영기획팀장", desc: "경영 기획", accent: "right" },
  { role: "영업지원팀장", desc: "영업 지원", accent: "right" },
  { role: "발표자 (정보전략팀장)", desc: "중간보고 발표", accent: "speaker" },
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
              alt="자세대 정기전략 TF 중간보고 회의 좌석 배치도"
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
                  <span className="s45-legend-desc">{seat.desc}</span>
                </li>
              ))}
            </ul>
            <div className="s45-legend-foot">
              <i className="fas fa-desktop" aria-hidden="true" /> 정면 스크린 · 상석 기준 좌우 배치
            </div>
          </aside>
        </div>
      </div>
    </SlideCanvas>
  );
}
