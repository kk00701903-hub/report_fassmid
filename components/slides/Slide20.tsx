"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide20.css";

const SLIDE_HTML = `<div class="poc-slide-root" style="overflow: hidden;">
<!-- Title Region -->
<div class="title-region-wrapper">
<div class="title-region-header">
<div class="title-region-bar"></div>
<h1 class="title-region-text">최적화 방안 3. 사전 POC 운영</h1>
</div>
<div class="title-region-line"></div>
</div>
<!-- Main Content -->
<div class="poc-content-main-layout">
<div class="poc-top-grid-wrapper">
<!-- PoC Target Details -->
<div class="poc-left-target-card">
<div class="poc-target-header">
<div class="poc-target-icon">
<i class="fas fa-flask"></i>
</div>
<span class="poc-target-label">Phase 1: Proof of Concept</span>
</div>
<h2 class="poc-target-title">
            AI 아이디어 스파크<br/>포인트 관리 시스템
          </h2>
<p class="poc-target-description">
            가장 치명적인 리스크 요소인 '데이터 마이그레이션' 기술을 선제적으로 검증하기 위해 선정된 핵심 PoC 과제입니다.
          </p>
<ul class="poc-feature-list">
<li class="poc-feature-item">이기종 DB(Oracle → PostgreSQL) 간 데이터 무결성 검증</li>
<li class="poc-feature-item">실시간 트랜잭션 복제 성능 및 부하 테스트 완료</li>
<li class="poc-feature-item">차세대 데이터 모델 아키텍처 적합성 확인</li>
</ul>
</div>
<!-- Technical Achievement -->
<div class="poc-right-tech-card">
<div class="poc-tech-section-title">
<i class="fas fa-microchip"></i>
            기술적 성취: 실시간 CDC 파이프라인 구축
          </div>
<p class="poc-cdc-definition">
<strong>CDC</strong>(Change Data Capture, 변경 데이터 캡처) — DB에 발생한 INSERT·UPDATE·DELETE 변경분을 트랜잭션 로그에서 실시간으로 감지·추출하여 타 시스템에 전송하는 데이터 동기화 방식
          </p>
<div class="poc-migration-flow-container">
<div class="poc-flow-item">
<div class="poc-flow-icon"><i class="fas fa-database"></i></div>
<div class="poc-flow-text-group">
<div class="poc-flow-main-text">Legacy Source Data (Oracle)</div>
<div class="poc-flow-sub-text">기존 그룹웨어 및 포인트 데이터 트랜잭션 감지</div>
</div>
</div>
<div class="poc-flow-item">
<div class="poc-flow-icon"><i class="fas fa-bolt"></i></div>
<div class="poc-flow-text-group">
<div class="poc-flow-main-text">Debezium &amp; Kafka Streaming</div>
<div class="poc-flow-sub-text">CDC 기반 변경 이벤트 캡처 및 실시간 메시지 브로커링</div>
</div>
</div>
<div class="poc-flow-item" style="border-left-color: var(--ppt-good);">
<div class="poc-flow-icon"><i class="fas fa-server"></i></div>
<div class="poc-flow-text-group">
<div class="poc-flow-main-text">Target Next-Gen DB (PostgreSQL)</div>
<div class="poc-flow-sub-text">0.1초 내 실시간 동기화 및 데이터 적재 완료</div>
</div>
</div>
</div>
<div style="margin-top: 5px;padding: 10px 16px;background: rgba(0, 240, 255, 0.05);border-radius: var(--ppt-radius-md);border: 1px dashed var(--ppt-accent);">
<div style="font-size: 15px;color: var(--ppt-text-1);font-weight: 600;margin-bottom: 2px;">기술적 의의</div>
<div style="font-size: 14px;color: var(--ppt-text-2);line-height: 1.5;">
              이기종 DB 간의 제약을 극복하고 실시간 스트리밍 아키텍처를 완벽히 구현함으로써, 향후 대규모 시스템 이관 시 발생할 수 있는 데이터 정합성 이슈를 원천 차단했습니다.
            </div>
</div>
</div>
</div>
<!-- Business Impact Banner -->
<div class="poc-risk-impact-banner">
<div class="poc-impact-label-group">
<div class="poc-impact-main-msg">무결점 비즈니스 전환을 위한 안전망 확보</div>
<div class="poc-impact-sub-msg">PoC 성공을 통해 오픈 당일 시스템 중단 및 데이터 유실 리스크를 혁신적으로 제거</div>
</div>
<div class="poc-metrics-container">
<div class="poc-metric-item">
<div class="poc-metric-value">0<span class="poc-metric-unit">%</span></div>
<div class="poc-metric-label">Downtime Risk</div>
</div>
<div class="poc-metric-item">
<div class="poc-metric-value">100<span class="poc-metric-unit">%</span></div>
<div class="poc-metric-label">Data Consistency</div>
</div>
<div class="poc-metric-item">
<div class="poc-metric-value">0.1<span class="poc-metric-unit">s</span></div>
<div class="poc-metric-label">Sync Latency</div>
</div>
</div>
</div>
</div>
</div>`;

export default function Slide20() {
  return (
    <SlideCanvas slideId={20} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
