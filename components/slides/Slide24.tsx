"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide24.css";

const SLIDE_HTML = `<div class="fass-slide-root fluent-slide" style="overflow: hidden;">
<!-- Non-Cover-Page Title Region -->
<div class="title-region-wrapper">
<div class="title-region-header">
<div class="title-region-bar"></div>
<h1 class="title-region-text">아키텍처 원칙 1: 모듈러 모놀리스 (안정성 극대화)</h1>
</div>
<div class="title-region-line"></div>
</div>
<div class="fass-architecture-main-container">
<div class="fass-architecture-columns-wrapper">
<!-- Left Visual Column -->
<div class="architecture-left-visual-column">
<div class="architecture-visual-card-item">
<div class="architecture-visual-label-group">
<span class="architecture-visual-badge-cyan">FaSS V3.0 Phase 1 Architecture</span>
<div style="font-size: 14px;color: var(--ppt-text-3);">
<i class="fas fa-microchip"></i> On-Premise Optimized
              </div>
</div>
<div class="architecture-diagram-container">
<div style="margin-bottom: 8px;font-size:13px;font-weight: 600;color: var(--ppt-text-2);">
                [ 논리적 MSA 구현 ]
              </div>
<div class="architecture-physical-server-box">
<div class="architecture-server-title-text">Single Physical Server (On-Premise)<br/><span style="font-size:13px;color:var(--ppt-accent);font-weight:600;">유통물류 시스템</span></div>
<div class="architecture-module-grid-wrapper">
<div class="architecture-module-unit-box">
<i class="fa-solid fa-file-invoice architecture-module-icon-element"></i>
<span class="architecture-module-name-text">수주</span>
</div>
<div class="architecture-module-unit-box">
<i class="fa-solid fa-cart-shopping architecture-module-icon-element"></i>
<span class="architecture-module-name-text">발주</span>
</div>
<div class="architecture-module-unit-box">
<i class="fa-solid fa-calculator architecture-module-icon-element"></i>
<span class="architecture-module-name-text">정산</span>
</div>
</div>
<div style="height: 1px;background: var(--ppt-accent);opacity: 0.3;"></div>
<div style="text-align: center;font-size:13px;color: var(--ppt-accent);">API-First Communication Only</div>
</div>
<div class="architecture-db-isolation-row">
<div class="architecture-db-icon-item">
<i class="fas fa-database"></i>
<span class="architecture-db-label-caption">Schema A</span>
</div>
<div class="architecture-db-icon-item" style="color: var(--ppt-accent);">
<i class="fa-solid fa-shield"></i>
<span class="architecture-db-label-caption">격리벽</span>
</div>
<div class="architecture-db-icon-item">
<i class="fas fa-database"></i>
<span class="architecture-db-label-caption">Schema B</span>
</div>
<div class="architecture-db-icon-item" style="color: var(--ppt-accent);">
<i class="fa-solid fa-shield-cat"></i>
<span class="architecture-db-label-caption">격리벽</span>
</div>
<div class="architecture-db-icon-item">
<i class="fas fa-database"></i>
<span class="architecture-db-label-caption">Schema C</span>
</div>
</div>
</div>
<div style="font-size:13px;color: var(--ppt-text-3);text-align: center;">
              * 물리적 통합 운영 + 논리적 격리로 안정성·비용 동시 확보
            </div>
<div class="architecture-mini-strategy">
<div class="architecture-mini-strategy-item"><i class="fas fa-server"></i><span>물리적 서버 단일화 — 인프라 비용·운영 포인트 일원화</span></div>
<div class="architecture-mini-strategy-item"><i class="fas fa-layer-group"></i><span>도메인별 DB 스키마 격리 — 수주·발주·정산 데이터 간섭 차단</span></div>
<div class="architecture-mini-strategy-item"><i class="fa-solid fa-diagram-project"></i><span>API-First 통신 — MSA 전환·AI 에이전트 연동 기반</span></div>
</div>
</div>
</div>
<!-- Right: Architecture Comparison -->
<div class="architecture-right-content-column">
<div class="arch-compare-panel-title"><i class="fas fa-scale-balanced"></i> 아키텍처 패턴 비교 — FaSS는 모듈러 모놀리스를 선택</div>
<div class="arch-compare-list">
<div class="arch-compare-card">
<div class="arch-compare-header">
<span class="arch-compare-num">1</span>
<div class="arch-compare-title">모놀리스 <em>Monolithic</em></div>
</div>
<p class="arch-compare-tagline"><strong>전체를 하나의 덩어리</strong>로 개발·배포하는 방식</p>
<div class="arch-compare-body">
<div class="arch-compare-field arch-compare-field--full"><span class="arch-compare-field-label">구조</span>단일 코드베이스·단일 프로세스·모든 기능 통합 실행</div>
<div class="arch-compare-field arch-compare-pros"><span class="arch-compare-field-label">장점</span>초기 개발·테스트·배포 단순, 단일 DB 트랜잭션으로 데이터 일관성 용이</div>
<div class="arch-compare-field arch-compare-cons"><span class="arch-compare-field-label">단점</span>규모 확대 시 빅 볼 오브 머드, 소규모 수정에도 전체 재배포, 부하 전파</div>
</div>
</div>
<div class="arch-compare-card arch-compare-card--highlight">
<div class="arch-compare-header">
<span class="arch-compare-num">2</span>
<div class="arch-compare-title">모듈러 모놀리스 <em>Modular Monolith</em></div>
<span class="arch-compare-fass-badge">FaSS V3.0</span>
</div>
<p class="arch-compare-tagline"><strong>물리적으로는 모놀리스</strong>, 내부는 모듈 단위로 철저히 격리</p>
<div class="arch-compare-body">
<div class="arch-compare-field arch-compare-field--full"><span class="arch-compare-field-label">구조</span>단일 프로세스 내 주문·결제·재고 등 독립 모듈, 정해진 인터페이스(API)로만 통신</div>
<div class="arch-compare-field arch-compare-pros"><span class="arch-compare-field-label">장점</span>모놀리스 단순함 + 낮은 결합도, 유지보수성 높음, MSA 전환 최적 중간 단계</div>
<div class="arch-compare-field arch-compare-cons"><span class="arch-compare-field-label">단점</span>모듈 경계·인터페이스 준수를 위한 강한 개발 규율 필요</div>
</div>
</div>
<div class="arch-compare-card arch-compare-card--msa">
<div class="arch-compare-header">
<span class="arch-compare-num">3</span>
<div class="arch-compare-title">MSA <em>Microservices</em></div>
</div>
<p class="arch-compare-tagline"><strong>기능별 완전 분리 서비스</strong>를 네트워크로 연결하는 방식</p>
<div class="arch-compare-body">
<div class="arch-compare-field arch-compare-field--full"><span class="arch-compare-field-label">구조</span>서비스별 독립 프로세스·고유 DB, REST·gRPC·MQ로 통신</div>
<div class="arch-compare-field arch-compare-pros"><span class="arch-compare-field-label">장점</span>독립 배포·확장, 기술 스택 자유, 장애 격리</div>
<div class="arch-compare-field arch-compare-cons"><span class="arch-compare-field-label">단점</span>분산 복잡성, 분산 트랜잭션 어려움, K8s·모니터링 등 인프라 비용 막대</div>
</div>
</div>
</div>
</div>
</div>
<!-- Business Impact Footer -->
<div class="architecture-impact-highlight-box">
<div class="architecture-impact-content-row" style="display:flex;align-items:center;gap:10px;">
<div class="architecture-impact-label-text">경영 임팩트</div>
<div class="architecture-impact-desc-text">
            성급한 MSA 대신 <span style="color: var(--ppt-accent);font-weight: 700;">모듈러 모놀리스</span>로 논리적 MSA 효과를 온프레미스에서 실현 — 안정성·비용·전환 용이성을 동시에 확보합니다.
          </div>
</div>
</div>
</div>
</div>`;

export default function Slide23() {
  return (
    <SlideCanvas slideId={24} motion="architecture" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
