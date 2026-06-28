export type Slide = {
  id: number;
  title: string;
};

/** 본편 발표 흐름에서 제외하고 별첨으로만 제공하는 슬라이드 ID */
export const APPENDIX_SLIDE_IDS = [8] as const;

export const SLIDE_COUNT = 40;

export function isAppendixSlideId(id: number): boolean {
  return (APPENDIX_SLIDE_IDS as readonly number[]).includes(id);
}

export const SLIDES: Slide[] = [
  { id: 1, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고" },
  { id: 2, title: "PART 1 - 전략적 비전 및 목표" },
  { id: 3, title: "IT 시스템 이해하기 — 웹 · 프론트엔드 · WAS · DB" },
  { id: 4, title: "핵심 용어집 ① — 클라우드 · 오픈소스 · API" },
  { id: 5, title: "핵심 용어집 ② — MSA · 모듈러 모놀리스 · Docker · Kubernetes" },
  { id: 6, title: "CDC(Change Data Capture) — 데이터 동기화 전환" },
  { id: 7, title: "차세대 FaSS 구축 프로젝트 범위" },
  { id: 8, title: "[별첨] 디지털 트렌드 — MSA · Cloud · Open Source · AI" },
  { id: 9, title: "팀 에이전트 구성 — AI 8인 역할" },
  { id: 10, title: "디지털 트렌드 — AI 디지털 워커 (AI Digital Worker)" },
  { id: 11, title: "FaSS 플랫폼 아이덴티티" },
  { id: 12, title: "Executive Summary - FaSS 플랫폼 구축" },
  { id: 13, title: "PART 2 - 프로젝트 진행 경과 및 방향성" },
  { id: 14, title: "스프린트 운영현황" },
  { id: 15, title: "타사 프로젝트 비교" },
  { id: 16, title: "AI-Augmented 개발 워크플로우" },
  { id: 17, title: "End-to-End 개발 흐름 — 5단계 한눈에 (보조 설명)" },
  { id: 18, title: "프로젝트 진행경과 마일스톤" },
  { id: 19, title: "최적화 방안 1. AI 디지털 워커 활용" },
  { id: 20, title: "최적화 방안 2. 애자일 워룸 운영" },
  { id: 21, title: "최적화 방안 3. 사전 POC 운영" },
  { id: 22, title: "PART 3 - 기술 스택 및 아키텍처" },
  { id: 23, title: "핵심 기술 스택" },
  { id: 24, title: "아키텍처 원칙 1: 모듈러 모놀리스 (안정성 극대화)" },
  { id: 25, title: "아키텍처 원칙 2: 무중단 데이터 동기화 (Zero-downtime migration)" },
  { id: 26, title: "아키텍처 원칙 3: CI/CD 자동화 (DevOps · GitOps)" },
  { id: 27, title: "PART 4 - 혁신 및 검증" },
  { id: 28, title: "비즈니스 혁신1: 차세대 영업 핵심 IT 엔진 보유" },
  { id: 29, title: "비즈니스 혁신2: AI 지능형 물류 플랫폼으로의 전환" },
  { id: 30, title: "비즈니스 혁신3: 전략적 수익화 IT 플랫폼 확보" },
  { id: 31, title: "비즈니스 혁신4: 프로토타입 엔진을 통한 아키텍처 내재화" },
  { id: 32, title: "비즈니스 혁신5: Zero-Defect 코드 품질 통제 체계" },
  { id: 33, title: "비즈니스 혁신6: FinOps 관점에서의 클라우드 전환 대비" },
  { id: 34, title: "비즈니스 혁신7: DGX·Claude Code 오케스트레이션 및 프로세스 지침" },
  { id: 35, title: "비즈니스 혁신8: 빌더형 인재 육성을 위한 전환" },
  { id: 36, title: "PART 5 - 로드맵 및 미래 비전" },
  { id: 37, title: "단계적 롤아웃 로드맵" },
  { id: 38, title: "중장기 목표 1: Kubernetes 운영" },
  { id: 39, title: "중장기 목표 2: MSA 전환" },
  { id: 40, title: "맺음말" },
];

export function getSlideById(id: number): Slide | undefined {
  return SLIDES.find((slide) => slide.id === id);
}

export function isValidSlideId(id: number): boolean {
  return id >= 1 && id <= SLIDE_COUNT;
}
