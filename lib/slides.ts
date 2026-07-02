export type Slide = {
  id: number;
  title: string;
};

/** 본편 발표 흐름에서 제외하고 별첨으로만 제공하는 슬라이드 ID */
export const APPENDIX_SLIDE_IDS = [8, 9] as const;

/** Digital Insight Glossary 간지 및 용어 풀이 슬라이드 */
export const GLOSSARY_DIVIDER_SLIDE_ID = 41;
export const GLOSSARY_CONTENT_SLIDE_IDS = [3, 4, 5, 6] as const;

export const SLIDE_COUNT = 43;

export function isAppendixSlideId(id: number): boolean {
  return (APPENDIX_SLIDE_IDS as readonly number[]).includes(id);
}

export function isGlossarySlideId(id: number): boolean {
  return id === GLOSSARY_DIVIDER_SLIDE_ID || (GLOSSARY_CONTENT_SLIDE_IDS as readonly number[]).includes(id);
}

export const SLIDES: Slide[] = [
  { id: 1, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고" },
  { id: 41, title: "Digital Insight Glossary" },
  { id: 3, title: "핵심용어집 ① — 3Tier 구조 (Web-WAS-DB)" },
  { id: 4, title: "핵심용어집 ② — 도커 (Docker) / 컨테이너 (Container)" },
  { id: 5, title: "핵심용어집 ③ — MSA 구조" },
  { id: 6, title: "핵심용어집 ④ — CDC 방식" },
  { id: 2, title: "PART 1 - 전략적 비전 및 목표" },
  { id: 7, title: "차세대 FaSS 구축 프로젝트 범위" },
  { id: 10, title: "FaSS 플랫폼 아이덴티티" },
  { id: 11, title: "디지털 트렌드 — AI 디지털 워커 (AI Digital Worker)" },
  { id: 12, title: "Executive Summary - FaSS 플랫폼 구축" },
  { id: 13, title: "PART 2 - 프로젝트 진행 경과 및 방향성" },
  { id: 14, title: "스프린트 운영현황" },
  { id: 15, title: "타사 프로젝트 비교" },
  { id: 16, title: "AI-Augmented 개발 워크플로우" },
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
  { id: 33, title: "비즈니스 혁신6: FinOps·클라우드 비용 최적화" },
  { id: 34, title: "비즈니스 혁신7: DGX·Claude Code 오케스트레이션 및 프로세스 지침" },
  { id: 35, title: "비즈니스 혁신8: 빌더형 인재 육성" },
  { id: 36, title: "PART 5 - 로드맵 및 미래 비전" },
  { id: 37, title: "단계적 롤아웃 로드맵" },
  { id: 38, title: "중장기 목표 1: Kubernetes 운영" },
  { id: 39, title: "중장기 목표 2: MSA 전환" },
  { id: 40, title: "맺음말" },
  { id: 8, title: "[별첨] 디지털 트렌드 — MSA · Cloud · Open Source · AI" },
  { id: 9, title: "[별첨] 팀 에이전트 구성 — AI 8인 역할" },
  { id: 42, title: "사내 AX 가속기: Agent Studio" },
  { id: 43, title: "AX 플랫폼 사업화 로드맵" },
];

export function getSlideById(id: number): Slide | undefined {
  return SLIDES.find((slide) => slide.id === id);
}

export function isValidSlideId(id: number): boolean {
  return id >= 1 && id <= SLIDE_COUNT;
}
