"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide37RoadmapTrack from "@/components/slides/Slide37RoadmapTrack";
import "./styles/Slide37.css";

const TABLE_ROWS = [
  {
    phase: "Phase 1",
    phaseClass: "",
    title: "주유소 관리시스템 프로토타입 Live",
    schedule: "2027년 3월",
    items: [
      { text: "2027년 3월 주유소(JTGS) 관리시스템 프로토타입 Live — 차세대 스택 실전 가동", highlight: true },
      { text: "SiteFramework 등 프레임워크 템플릿·AI 파이프라인 실전 검증 및 안정화" },
      { text: "프로토타입 Live 이후 고도화·표준 템플릿 확정 — 본격 이관의 기술·조직 기반 마련" },
    ],
  },
  {
    phase: "Phase 2",
    phaseClass: "",
    title: "분석 · 요구사항 수렴",
    schedule: "2027.07 ~ 2027.08",
    items: [
      { text: "3PL 시스템·유통물류 시스템 현행 분석 및 Gap·개선 방향 도출", highlight: true },
      { text: "현업·IT 요구사항 수렴 — 전환 범위·우선순위·통합 아키텍처 합의" },
      { text: "단계적 롤아웃 상세 계획·Quality Gate 기준 확정" },
    ],
  },
  {
    phase: "Phase 3",
    phaseClass: "",
    title: "3PL 차세대 전환",
    schedule: "2027.09 ~",
    items: [
      { text: "3PL 시스템부터 단계적 차세대 FaSS 플랫폼 전환 착수", highlight: true },
      { text: "검증된 프레임워크·AI 패턴을 3PL 업무 모듈에 순차 적용" },
      { text: "모듈별 Quality Gate 통과 후 다음 범위 확대 — 상시 롤백 가능" },
    ],
  },
  {
    phase: "Phase 4",
    phaseClass: "final",
    title: "유통물류 전환 · 통합",
    schedule: "~2028.12",
    items: [
      { text: "유통물류 시스템 차세대 전환 병행·후속 추진" },
      { text: "3PL·유통물류 양 시스템 통합 — 단일 FaSS 플랫폼으로 업무·데이터 일원화", highlight: true },
      { text: "2028년 12월까지 단계적 롤아웃 완료 — 레거시 단계적 폐기 및 전사 표준 가동" },
    ],
  },
] as const;

export default function Slide37() {
  return (
    <SlideCanvas slideId={37} motion="roadmap" motionTier="medium">
      <div className="roadmap-slide-root fluent-slide">
        <div className="title-region-wrapper">
          <div className="title-region-main">
            <div className="title-region-bar" />
            <h1 className="title-region-text">단계적 롤아웃 로드맵</h1>
          </div>
          <div className="title-region-line" />
        </div>

        <div className="roadmap-content-container">
          <div className="roadmap-strategy-summary-wrapper">
            <div className="roadmap-strategy-card">
              <div className="roadmap-strategy-icon">
                <i className="fas fa-route" aria-hidden="true" />
              </div>
              <div className="roadmap-strategy-text-group">
                <span className="roadmap-strategy-label">목표 기간</span>
                <span className="roadmap-strategy-desc">
                  2027.03 주유소 관리시스템 프로토타입 Live → 7~8월 분석 → 3PL 선행 전환 → 2028.12 통합
                  완료
                </span>
              </div>
            </div>
            <div className="roadmap-track-slot">
              <Slide37RoadmapTrack />
            </div>
          </div>

          <div className="roadmap-table-section-wrapper">
            <div className="roadmap-table-container">
              <table className="roadmap-data-table">
                <colgroup>
                  <col style={{ width: "22%" }} />
                  <col style={{ width: "22%" }} />
                  <col style={{ width: "56%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>이관 단계</th>
                    <th>목표 일정</th>
                    <th>주요 추진 내용 및 기대 효과</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row) => (
                    <tr key={row.phase}>
                      <td>
                        <span className={`roadmap-phase-badge ${row.phaseClass}`.trim()}>{row.phase}</span>
                        <div className="roadmap-phase-title">{row.title}</div>
                      </td>
                      <td>
                        <span className="roadmap-schedule-text">{row.schedule}</span>
                      </td>
                      <td>
                        <div className="roadmap-content-list">
                          {row.items.map((item) => (
                            <span
                              key={item.text}
                              className={`roadmap-content-item${"highlight" in item && item.highlight ? " highlight" : ""}`}
                            >
                              {item.text}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="roadmap-footnote">
              <i className="fas fa-circle-info" aria-hidden="true" />
              <span>
                3PL 선행 전환 → 유통물류 전환 → 양 시스템 통합. 각 단계 Quality Gate 통과 시에만 다음 단계
                진행, 상시 롤백 가능 파이프라인 유지
              </span>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
