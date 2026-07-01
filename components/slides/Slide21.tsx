"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide21CdcPipelineVisual from "@/components/slides/Slide21CdcPipelineVisual";
import "./styles/Slide21.css";

export default function Slide21() {
  return (
    <SlideCanvas slideId={21} motion="pipeline" motionTier="medium">
      <div className="poc-slide-root fluent-slide">
        <div className="title-region-wrapper">
          <div className="title-region-header">
            <div className="title-region-bar" />
            <h1 className="title-region-text">최적화 방안 3. 사전 POC 운영</h1>
          </div>
          <div className="title-region-line" />
        </div>

        <div className="poc-content-main-layout">
          <div className="poc-top-grid-wrapper">
            <div className="poc-left-target-card">
              <div className="poc-target-header">
                <div className="poc-target-icon">
                  <i className="fas fa-flask" />
                </div>
                <span className="poc-target-label">Phase 1: Proof of Concept</span>
              </div>
              <h2 className="poc-target-title">
                AI 아이디어 스파크
                <br />
                포인트 관리 시스템
              </h2>
              <p className="poc-target-description">
                가장 치명적인 리스크 요소인 &apos;데이터 마이그레이션&apos; 기술을 선제적으로 검증하기 위해 선정된 핵심 PoC
                과제입니다.
              </p>
              <ul className="poc-feature-list">
                <li className="poc-feature-item">이기종 DB(Oracle → PostgreSQL) 간 데이터 무결성 검증</li>
                <li className="poc-feature-item">실시간 트랜잭션 복제 성능 및 부하 테스트 완료</li>
                <li className="poc-feature-item">차세대 데이터 모델 아키텍처 적합성 확인</li>
              </ul>
            </div>

            <div className="poc-right-tech-card">
              <div className="poc-tech-section-title">
                <i className="fas fa-microchip" />
                기술적 성취: 실시간 CDC 파이프라인 구축
              </div>
              <p className="poc-cdc-definition">
                <strong>CDC</strong>(Change Data Capture, 변경 데이터 캡처) — DB에 발생한 INSERT·UPDATE·DELETE 변경분을
                트랜잭션 로그에서 실시간으로 감지·추출하여 타 시스템에 전송하는 데이터 동기화 방식
              </p>

              <Slide21CdcPipelineVisual />

              <div className="poc-tech-significance">
                <div className="poc-tech-significance__title">기술적 의의</div>
                <div className="poc-tech-significance__body">
                  이기종 DB 간의 제약을 극복하고 실시간 스트리밍 아키텍처를 완벽히 구현함으로써, 향후 대규모 시스템 이관 시
                  발생할 수 있는 데이터 정합성 이슈를 원천 차단했습니다.
                </div>
              </div>
            </div>
          </div>

          <div className="poc-risk-impact-banner">
            <div className="poc-impact-label-group">
              <div className="poc-impact-main-msg">무결점 비즈니스 전환을 위한 안전망 확보</div>
              <div className="poc-impact-sub-msg">
                PoC 성공을 통해 오픈 당일 시스템 중단 및 데이터 유실 리스크를 혁신적으로 제거
              </div>
            </div>
            <div className="poc-metrics-container">
              <div className="poc-metric-item">
                <div className="poc-metric-value">
                  0<span className="poc-metric-unit">%</span>
                </div>
                <div className="poc-metric-label">Downtime Risk</div>
              </div>
              <div className="poc-metric-item">
                <div className="poc-metric-value">
                  100<span className="poc-metric-unit">%</span>
                </div>
                <div className="poc-metric-label">Data Consistency</div>
              </div>
              <div className="poc-metric-item">
                <div className="poc-metric-value">
                  0.1<span className="poc-metric-unit">s</span>
                </div>
                <div className="poc-metric-label">Sync Latency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
