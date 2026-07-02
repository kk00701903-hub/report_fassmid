"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import { Slide12SummaryBoard, type SummaryColumnData } from "@/components/slides/Slide12SummaryVisuals";
import "./styles/Slide12.css";

const COLUMNS: SummaryColumnData[] = [
  {
    id: "progress",
    step: "STEP 1",
    icon: "fas fa-chart-line",
    title: "진척 현황",
    highlight: "기술 내재화를 통한 SI 비용 80억 방어",
    items: [
      {
        tag: "6월 현재",
        tagVariant: "completed",
        text: "기반 프레임워크 표준 확립",
        subtext: "Java 21, React, Next.js 표준 아키텍처 구축",
      },
      {
        tag: "인프라",
        tagVariant: "completed",
        text: "LangGraph 기반 AI 코드 마이그레이션 환경 완료",
        subtext: "DGX Spark 기반 RAG 및 코드 자동화 환경 완료",
      },
      {
        tag: "진행 중",
        tagVariant: "ongoing",
        text: "UI/UX 및 기술스택 정립 단계 진입",
        subtext: "디자인 시스템·기술스택 표준화 및 핵심 화면 개발 착수",
      },
    ],
  },
  {
    id: "roadmap",
    step: "STEP 2",
    icon: "fa-solid fa-map",
    title: "전략 로드맵",
    highlight: "빅뱅 방식 지양을 통한 무중단 비즈니스 보장",
    items: [
      {
        tag: "검증 완료",
        tagVariant: "completed",
        text: "PoC 및 프로토타입 격리 검증",
        subtext: "AI 아이디어 스파크 PoC 데이터 무결성 검증 완료",
      },
      {
        tag: "26년 10월",
        tagVariant: "planned",
        text: "주유소(JTGS) 프로토타입 개발 착수",
        subtext: "2026.10 차세대 서버에서 개발 Start — 완성형 기술스택 최초 적용 (2027.03 완성 목표)",
      },
      {
        tag: "최종 단계",
        tagVariant: "planned",
        text: "유통물류 시스템 완전 전환",
        subtext: "리스크 제로 기반의 Phased Roll-out 전략",
      },
    ],
  },
  {
    id: "infra",
    step: "STEP 3",
    icon: "fas fa-cloud",
    title: "인프라 방향성",
    highlight: "IT를 '비용 부서'에서 '수익 파이프라인'으로 격상",
    items: [
      {
        tag: "설계 원칙",
        tagVariant: "ongoing",
        text: "100% Cloud-Ready 아키텍처",
        subtext: "컨테이너 기반 설계로 즉각적인 클라우드 배포",
      },
      {
        tag: "비용 최적화",
        tagVariant: "ongoing",
        text: "온프레미스 기반 리스크 관리",
        subtext: "무리한 초기 전환 유보 및 인프라 비용 낭비 방지",
      },
      {
        tag: "수익화 모델",
        tagVariant: "planned",
        text: "솔루션 패키지화 (ASP) 공급",
        subtext: "외부 확장이 용이한 멀티 테넌시 구조 확보",
      },
    ],
  },
];

export default function Slide12() {
  return (
    <SlideCanvas slideId={12} motion="cards" motionTier="medium">
      <div className="fass-summary-slide-root fluent-slide" style={{ overflow: "hidden" }}>
        <div className="title-region-container">
          <div className="title-region-header">
            <div className="title-region-bar" />
            <h1 className="title-region-text">Executive Summary - FaSS 플랫폼 구축</h1>
          </div>
          <div className="title-region-line" />
        </div>

        <div className="summary-content-wrapper">
          <Slide12SummaryBoard columns={COLUMNS} />
        </div>
      </div>
    </SlideCanvas>
  );
}
