"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide20.css";

const ANALYTICS_URL = "https://kk00701903-hub.github.io/fass-dailyscrum/#/analytics";

export default function Slide20() {
  return (
    <SlideCanvas slideId={20} motion="cards" motionTier="medium">
      <div className="s20-root">
        <header className="s20-head">
          <div className="s20-head__row">
            <div className="s20-head__bar" />
            <h1 className="s20-head__title">최적화 방안 2. 애자일 (Agile) 방식 개발 추진</h1>
          </div>
          <div className="s20-head__line" />
        </header>

        <div className="s20-body">
          <div className="s20-col">
            <article className="s20-card">
              <header className="s20-card__head">
                <span className="s20-card__icon" aria-hidden="true">
                  <i className="fas fa-users-rectangle" />
                </span>
                <h2 className="s20-card__title">일체형 조직 운영 (All-in-One)</h2>
              </header>
              <div className="s20-card__body">
                <span className="s20-location">
                  <i className="fas fa-location-dot" aria-hidden="true" /> 남양주 1공장 2층 프로젝트 룸 (애자일 워룸 운영)
                </span>
                <div className="s20-bullet">
                  <i className="fas fa-check" aria-hidden="true" />
                  <span>단독 프로젝트 룸 운영을 통한 커뮤니케이션 사일로(silo) 제거</span>
                </div>
                <div className="s20-bullet">
                  <i className="fas fa-check" aria-hidden="true" />
                  <span>
                    이슈 발생 시 그 자리에서 즉시 토론하고 의사결정하여 &apos;결재 및 대기 시간&apos;을
                    완벽하게 삭제
                  </span>
                </div>
              </div>
              <footer className="s20-card__badges">
                <span className="s20-badge s20-badge--blue">물리적 통합 완료</span>
                <span className="s20-badge s20-badge--blue">Agile 스프린트 최적화</span>
              </footer>
            </article>

            <article className="s20-card">
              <header className="s20-card__head">
                <span className="s20-card__icon" aria-hidden="true">
                  <i className="fas fa-bolt" />
                </span>
                <h2 className="s20-card__title">의사결정 리드타임 제로화</h2>
              </header>
              <div className="s20-card__body">
                <div className="s20-bullet">
                  <i className="fas fa-circle-arrow-right" aria-hidden="true" />
                  <span>
                    <strong>시스템사업부장 중심의 Lightning-fast 의사결정</strong> — 현장 즉결 승인으로
                    결재·대기 병목 제거
                  </span>
                </div>
                <div className="s20-bullet">
                  <i className="fas fa-circle-arrow-right" aria-hidden="true" />
                  <span>현장 즉결 처리 체계 도입으로 프로젝트 지연 요소 선제적 차단</span>
                </div>
                <div className="s20-bullet">
                  <i className="fas fa-circle-arrow-right" aria-hidden="true" />
                  <span>부서 간 업무 이관 단계 축소를 통한 개발 생산성 극대화</span>
                </div>
              </div>
              <footer className="s20-card__metrics">
                <div className="s20-metric">
                  <span className="s20-metric__label">Wait Time</span>
                  <span className="s20-metric__value">0s</span>
                </div>
                <div className="s20-metric">
                  <span className="s20-metric__label">Decision Speed</span>
                  <span className="s20-metric__value">Real-time</span>
                </div>
              </footer>
            </article>
          </div>

          <div className="s20-col">
            <article className="s20-card">
              <header className="s20-card__head">
                <span className="s20-card__icon" aria-hidden="true">
                  <i className="fas fa-desktop" />
                </span>
                <h2 className="s20-card__title">실시간 가시성 대시보드</h2>
              </header>
              <div className="s20-card__body">
                <div className="s20-bullet">
                  <i className="fas fa-chart-line" aria-hidden="true" />
                  <span>
                    <a href={ANALYTICS_URL} target="_blank" rel="noopener noreferrer" className="s20-link">
                      FASS 데일리 스크럼 Analytics
                    </a>
                    으로 일단위 업무·스프린트 진척도를 점검하고 워룸에서 공유
                  </span>
                </div>
                <div className="s20-bullet">
                  <i className="fas fa-bug" aria-hidden="true" />
                  <span>태스크 완료율·블로커·버그 지표 시각화로 품질 리스크 상시 모니터링</span>
                </div>
              </div>
              <footer className="s20-card__metrics">
                <a
                  className="s20-metric s20-metric--link"
                  href={ANALYTICS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="s20-metric__label">Daily Scrum</span>
                  <span className="s20-metric__value">Analytics</span>
                </a>
                <div className="s20-metric s20-metric--good">
                  <span className="s20-metric__label">Sprint</span>
                  <span className="s20-metric__value">Progress</span>
                </div>
              </footer>
            </article>

            <article className="s20-card">
              <header className="s20-card__head">
                <span className="s20-card__icon" aria-hidden="true">
                  <i className="fas fa-gauge-high" />
                </span>
                <h2 className="s20-card__title">프로젝트 성공 속도 가속화</h2>
              </header>
              <div className="s20-card__body">
                <div className="s20-bullet">
                  <i className="fas fa-shield-halved" aria-hidden="true" />
                  <span>이슈 감지부터 해결까지의 MTTR(평균 복구 시간) 70% 이상 단축</span>
                </div>
                <div className="s20-bullet">
                  <i className="fas fa-shield-halved" aria-hidden="true" />
                  <span>전 팀원이 동일한 목표 지표를 실시간으로 인지하여 성과 중심 조직으로 변모</span>
                </div>
              </div>
              <footer className="s20-card__badges">
                <span className="s20-badge s20-badge--warn">핵심 성과 지표(KPI) 연동</span>
                <span className="s20-badge s20-badge--good">무결점 배포 보장</span>
              </footer>
            </article>
          </div>
        </div>

        <footer className="s20-banner">
          <span className="s20-banner__icon" aria-hidden="true">
            <i className="fas fa-clipboard-list" />
          </span>
          <div className="s20-banner__copy">
            <strong>FASS 데일리 스크럼 — TFT 애자일 운영 허브</strong>
            <p>
              일일 스크럼·태스크·스프린트 데이터를 기록하고 Analytics로 진척·블로커·완료율을 워룸 대형
              화면에 공유합니다.
            </p>
          </div>
          <a className="s20-banner__cta" href={ANALYTICS_URL} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-chart-line" aria-hidden="true" /> Analytics
          </a>
        </footer>
      </div>
    </SlideCanvas>
  );
}
