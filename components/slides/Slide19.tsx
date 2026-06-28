"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide19DigitalWorkerPanel from "@/components/slides/Slide19DigitalWorkerPanel";
import "./styles/Slide19.css";

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
    names: ["심지훈", "오준열", "이지상"],
    tasks: ["프론트엔드 및 UX 표준 구현", "AI 연동 RAG 환경 및 인터페이스 구축"],
  },
] as const;

export default function Slide18() {
  return (
    <SlideCanvas slideId={19} motion="innovation" motionTier="medium">
      <div className="slide fluent-slide">
        <header className="title-region">
          <div className="title-header">
            <div className="title-bar" />
            <h1 className="title-main">최적화 방안 1. AI 디지털 워커 활용</h1>
          </div>
          <p className="title-sub">인간 7 + AI 8 = 15명 TFT급 추진력</p>
          <div className="title-line" />
        </header>

        <div className="body">
          <section className="worker-col" aria-label="AI 디지털 워커 생성 데모">
            <Slide19DigitalWorkerPanel />
          </section>

          <aside className="org-panel">
            <div className="org-head">
              <i className="fas fa-sitemap" /> 차세대 FaSS TFT — 핵심 조직
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "24%" }}>역할</th>
                    <th style={{ width: "18%" }}>담당자</th>
                    <th style={{ width: "58%" }}>주요 업무</th>
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
                              <span key={n} className="name">
                                {n}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="name" style={{ whiteSpace: "pre-line" }}>
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
