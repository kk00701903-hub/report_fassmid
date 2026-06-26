"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide11.css";

const SLIDE_HTML = `<div class="fass-summary-slide-root" style="overflow: hidden;">
<!-- Title Region -->
<div class="title-region-container">
<div class="title-region-header">
<div class="title-region-bar"></div>
<h1 class="title-region-text">Executive Summary - FaSS 플랫폼 구축</h1>
</div>
<div class="title-region-line"></div>
</div>
<!-- Content Area -->
<div class="summary-content-wrapper">
<div class="summary-grid-container">
<!-- Column 1: Progress Status -->
<div class="summary-column-item">
<div class="summary-column-header">
<div class="summary-column-icon"><i class="fas fa-chart-line"></i></div>
<div class="summary-column-title">진척 현황</div>
</div>
<div class="summary-list-container">
<div class="summary-list-item">
<span class="summary-item-tag tag-completed">6월 현재</span>
<div class="summary-item-text">기반 프레임워크 표준 확립</div>
<div class="summary-item-subtext">Java 21, React, Next.js 표준 아키텍처 구축</div>
</div>
<div class="summary-list-item">
<span class="summary-item-tag tag-completed">인프라</span>
<div class="summary-item-text">LangGraph 기반 AI 코드 마이그레이션 환경 완료</div>
<div class="summary-item-subtext">DGX Spark 기반 RAG 및 코드 자동화 환경 완료</div>
</div>
<div class="summary-list-item">
<span class="summary-item-tag tag-ongoing">진행 중</span>
<div class="summary-item-text">UI/UX 및 기술스택 정립 단계 진입</div>
<div class="summary-item-subtext">디자인 시스템·기술스택 표준화 및 핵심 화면 개발 착수</div>
</div>
</div>
<div class="summary-highlight-box">
<div class="summary-highlight-text">기술 내재화를 통한 SI 비용 80억 방어</div>
</div>
</div>
<!-- Column 2: Roadmap -->
<div class="summary-column-item">
<div class="summary-column-header">
<div class="summary-column-icon"><i class="fa-solid fa-map"></i></div>
<div class="summary-column-title">전략 로드맵</div>
</div>
<div class="summary-list-container">
<div class="summary-list-item">
<span class="summary-item-tag tag-completed">검증 완료</span>
<div class="summary-item-text">PoC 및 프로토타입 격리 검증</div>
<div class="summary-item-subtext">AI 아이디어 스파크 PoC 데이터 무결성 검증 완료</div>
</div>
<div class="summary-list-item">
<span class="summary-item-tag tag-planned">26년 10월</span>
<div class="summary-item-text">주유소(JTGS) 프로토타입 개발 착수</div>
<div class="summary-item-subtext">2026.10 차세대 서버에서 개발 Start — 완성형 기술스택 최초 적용 (2027.03 완성 목표)</div>
</div>
<div class="summary-list-item">
<span class="summary-item-tag tag-planned">최종 단계</span>
<div class="summary-item-text">유통물류 시스템 완전 전환</div>
<div class="summary-item-subtext">리스크 제로 기반의 Phased Roll-out 전략</div>
</div>
</div>
<div class="summary-highlight-box">
<div class="summary-highlight-text">빅뱅 방식 지양을 통한 무중단 비즈니스 보장</div>
</div>
</div>
<!-- Column 3: Infrastructure -->
<div class="summary-column-item">
<div class="summary-column-header">
<div class="summary-column-icon"><i class="fas fa-cloud"></i></div>
<div class="summary-column-title">인프라 방향성</div>
</div>
<div class="summary-list-container">
<div class="summary-list-item">
<span class="summary-item-tag tag-ongoing">설계 원칙</span>
<div class="summary-item-text">100% Cloud-Ready 아키텍처</div>
<div class="summary-item-subtext">컨테이너 기반 설계로 즉각적인 클라우드 배포</div>
</div>
<div class="summary-list-item">
<span class="summary-item-tag tag-ongoing">비용 최적화</span>
<div class="summary-item-text">온프레미스 기반 리스크 관리</div>
<div class="summary-item-subtext">무리한 초기 전환 유보 및 인프라 비용 낭비 방지</div>
</div>
<div class="summary-list-item">
<span class="summary-item-tag tag-planned">수익화 모델</span>
<div class="summary-item-text">솔루션 패키지화 (ASP) 공급</div>
<div class="summary-item-subtext">외부 확장이 용이한 멀티 테넌시 구조 확보</div>
</div>
</div>
<div class="summary-highlight-box">
<div class="summary-highlight-text">IT를 '비용 부서'에서 '수익 파이프라인'으로 격상</div>
</div>
</div>
</div>
</div>
</div>`;

export default function Slide11() {
  return (
    <SlideCanvas motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
