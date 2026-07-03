"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide18CollaborationFlow from "@/components/slides/Slide18CollaborationFlow";
import Slide18WorkLanes from "@/components/slides/Slide18WorkLanes";
import "./styles/Slide19.css";

/** 담당자명 기본(검정) 표시 — 그 외 인원은 파란색 강조 */
const DEFAULT_NAME_COLOR = new Set(["오준열", "한성민"]);

function isBlueName(name: string): boolean {
  const normalized = name.replace(/\s+/g, "");
  if (normalized === "시스템사업부장") return false;
  return !DEFAULT_NAME_COLOR.has(name);
}

const ORG_ROWS = [
  {
    role: "최고 의사결정",
    name: "시스템\n사업부장",
    tasks: ["비즈니스 방향성·투자 우선순위 총괄"],
  },
  {
    role: "TFT 팀장",
    name: "서선범",
    tasks: ["프로젝트 총괄 관리 및 리스크 차단", "유관 부서 간 업무 프로세스 조율"],
  },
  {
    role: "프로젝트 리더",
    name: "기충영",
    tasks: ["FaSS V3.0 공통 프레임워크 표준 설계", "전체 아키텍처 통제 및 품질 관리"],
  },
  {
    role: "BE 엔지니어",
    names: ["김희찬", "송민준"],
    tasks: ["백엔드 코어 모듈 구현", "Kafka 기반 데이터 동기화 파이프라인"],
  },
  {
    role: "FE 엔지니어",
    names: ["심지훈", "오준열", "한성민", "이지상"],
    tasks: ["프론트엔드 및 UX 표준 구현", "AI 연동 RAG 환경 및 인터페이스 구축"],
  },
] as const;

export default function Slide19() {
  return (
    <SlideCanvas slideId={19} motion="innovation" motionTier="medium">
      <div className="slide fluent-slide s19-root">
        <header className="title-region">
          <div className="title-header">
            <div className="title-bar" />
            <h1 className="title-main">최적화 방안 1. AI 디지털 워커 활용</h1>
          </div>
          <p className="title-sub">인간 7 + AI 8 = 15명 TFT급 추진력</p>
          <div className="title-line" />
        </header>

        <div className="body">
          <section className="left-col" aria-label="AI 디지털 워커 협업">
            <div className="strat-panel">
              <div className="panel-head">
                <i className="fas fa-robot" aria-hidden="true" /> AI 디지털 워커 — TFT 보조
              </div>
              <div className="strat-row">
                <div className="strat-box">
                  <div className="strat-ico">
                    <i className="fas fa-robot" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="strat-t">24/7 디지털 워커</div>
                    <p className="strat-d">코드·문서·테스트 등 반복 업무 AI 상시 지원</p>
                  </div>
                </div>
                <div className="strat-box">
                  <div className="strat-ico">
                    <i className="fas fa-user-check" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="strat-t">Human-in-the-loop</div>
                    <p className="strat-d">설계·품질·의사결정은 TFT가 최종 통제</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="anim-panel">
              <Slide18CollaborationFlow />
              <Slide18WorkLanes allActive />
            </div>

            <div className="wf-strip">
              <span>
                인간 <strong>7</strong>
              </span>
              <div className="wf-mini">
                <span className="wf-dot h">
                  <i className="fas fa-user" aria-hidden="true" />
                </span>
                <span className="wf-dot h">
                  <i className="fas fa-user" aria-hidden="true" />
                </span>
                <span className="wf-dot h">
                  <i className="fas fa-user" aria-hidden="true" />
                </span>
                <span className="wf-ellipsis">···</span>
              </div>
              <span>+</span>
              <span>
                AI <strong>8</strong>
              </span>
              <div className="wf-mini">
                <span className="wf-dot a">
                  <i className="fas fa-robot" aria-hidden="true" />
                </span>
                <span className="wf-dot a">
                  <i className="fas fa-robot" aria-hidden="true" />
                </span>
                <span className="wf-dot a">
                  <i className="fas fa-robot" aria-hidden="true" />
                </span>
                <span className="wf-ellipsis">···</span>
              </div>
              <span>=</span>
              <span className="wf-eq">15</span>
              <span className="wf-caption">
                TFT급 추진력 · <strong>지시→AI실행→Human검토</strong> 루프
              </span>
            </div>
          </section>

          <aside className="org-panel">
            <div className="org-head">
              <i className="fas fa-sitemap" aria-hidden="true" /> 차세대 FaSS TFT — 핵심 조직
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "22%" }}>역할</th>
                    <th style={{ width: "16%" }}>담당자</th>
                    <th style={{ width: "62%" }}>주요 업무</th>
                  </tr>
                </thead>
                <tbody>
                  {ORG_ROWS.map((row) => (
                    <tr key={row.role}>
                      <td>
                        <span className="role">{row.role}</span>
                      </td>
                      <td>
                        {"names" in row ? (
                          <div className="names">
                            {row.names.map((n) => (
                              <span key={n} className={`name${isBlueName(n) ? " name--blue" : ""}`}>
                                {n}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span
                            className={`name${isBlueName(row.name) ? " name--blue" : ""}`}
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {row.name}
                          </span>
                        )}
                      </td>
                      <td>
                        <ul className="task">
                          {row.tasks.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </div>
    </SlideCanvas>
  );
}
