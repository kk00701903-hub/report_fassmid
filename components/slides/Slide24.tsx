"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide24.css";

const SLIDE_HTML = `<div class="migration-slide-root" style="overflow: hidden;">
<!-- Title Region -->
<div class="title-region-wrapper">
<div class="title-main-header">
<div class="title-accent-bar"></div>
<h1 class="title-text-content">아키텍처 원칙 2: 무중단 데이터 동기화 (Zero-downtime migration)</h1>
</div>
<div class="title-underline-gradient"></div>
<p class="title-subtitle-text">
        실시간 스트리밍 기술을 도입하여 업무 중단 없는 매끄러운 시스템 전환 및 100% 안전망 확보
      </p>
</div>
<!-- Main Content -->
<div class="migration-content-wrapper">
<!-- Pipeline Visualization -->
<div class="migration-pipeline-container">
<!-- Legacy -->
<div class="migration-left-legacy-column">
<div class="migration-node-box">
<i class="fa-solid fa-database migration-node-icon"></i>
<div class="migration-node-title">Legacy DB</div>
<div class="migration-node-desc">Oracle (On-Premise)</div>
<div style="margin-top: 10px; font-size: 13px; color: var(--ppt-text-3);">기본 비즈니스 트랜잭션 데이터</div>
</div>
</div>
<!-- Engine -->
<div class="migration-center-engine-column">
<div class="migration-engine-box">
<div class="migration-engine-label">Streaming Hub</div>
<div class="migration-flow-indicator">
<i class="fa-solid fa-circle-chevron-left" style="opacity: 0.3;"></i>
<i class="fa-solid fa-bolt"></i>
<i class="fa-solid fa-circle-chevron-right"></i>
</div>
<div class="migration-engine-main-info">
<div class="migration-engine-tech-name">Debezium + Kafka</div>
<div class="migration-engine-spec">실시간 CDC (0.1초 단위 동기화)</div>
</div>
<div style="border-top: 1px solid var(--ppt-border); width: 100%; padding-top: 15px; text-align: center;">
<span style="font-size: 14px; color: var(--ppt-text-2);">변경 데이터 캡처 및 즉시 파이프라인 송출</span>
</div>
</div>
</div>
<!-- Next-Gen -->
<div class="migration-right-nextgen-column">
<div class="migration-node-box" style="border-color: var(--ppt-good);">
<i class="fa-solid fa-database migration-node-icon active"></i>
<div class="migration-node-title">Next-Gen DB</div>
<div class="migration-node-desc">PostgreSQL (Cloud-Ready)</div>
<div class="migration-badge-safety">Target System</div>
</div>
</div>
</div>
<!-- Business Impact Cards -->
<div class="migration-impact-row">
<div class="migration-impact-card">
<div class="migration-impact-icon-wrapper">
<i class="fa-solid fa-clock-rotate-left"></i>
</div>
<div class="migration-impact-text-group">
<div class="migration-impact-headline">영업 중단 제로화</div>
<div class="migration-impact-detail">
              과거의 철야 이관 방식 탈피, 현장 업무 중단 없는 실시간 DB 전환 프로세스 구축
            </div>
</div>
</div>
<div class="migration-impact-card">
<div class="migration-impact-icon-wrapper">
<i class="fa-solid fa-shield-halved"></i>
</div>
<div class="migration-impact-text-group">
<div class="migration-impact-headline">100% 무결점 안전망</div>
<div class="migration-impact-detail">
              양방향 동기화 유지를 통해 오픈 당일 이슈 발생 시 즉각적인 레거시 롤백 가능
            </div>
</div>
</div>
<div class="migration-impact-card">
<div class="migration-impact-icon-wrapper">
<i class="fa-solid fa-chart-line"></i>
</div>
<div class="migration-impact-text-group">
<div class="migration-impact-headline">데이터 가시성 확보</div>
<div class="migration-impact-detail">
              0.1초 단위의 동기화로 신/구 시스템 간 데이터 정합성을 실시간으로 상시 모니터링
            </div>
</div>
</div>
</div>
<p class="migration-glossary">
<strong>Debezium</strong> — DB 트랜잭션 로그(WAL/Binlog)를 실시간 읽어 INSERT·UPDATE·DELETE 변경 이벤트를 캡처하는 오픈소스 CDC 플랫폼<br/>
<strong>Kafka</strong> — Debezium이 캡처한 변경 데이터를 Topic으로 발행·전달하는 분산 이벤트 스트리밍 플랫폼 (순서 보장·대용량 처리)
</p>
</div>`;

export default function Slide24() {
  return (
    <SlideCanvas slideId={24} motion="architecture" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
