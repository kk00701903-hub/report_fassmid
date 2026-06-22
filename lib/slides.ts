export type Slide = {
  id: number;
  title: string;
};

export const SLIDE_COUNT = 32;

export const SLIDES: Slide[] = [
  { id: 1, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고" },
  { id: 2, title: "PART 1 - 전략적 비전 및 목표" },
  { id: 3, title: "디지털 트렌드 — MSA · Cloud · Open Source · AI" },
  { id: 4, title: "디지털 트렌드 — AI 디지털 워커 (AI Digital Worker)" },
  { id: 5, title: "FaSS 플랫폼 아이덴티티" },
  { id: 6, title: "Executive Summary - FaSS 플랫폼 구축" },
  { id: 7, title: "PART 2 - 프로젝트 진행 경과 및 방향성" },
  { id: 8, title: "프로젝트 진행경과 마일스톤" },
  { id: 9, title: "최적화 방안 1. AI 디지털 워커 활용" },
  { id: 10, title: "최적화 방안 2. 애자일 워룸 운영" },
  { id: 11, title: "최적화 방안 3. 사전 POC 운영" },
  { id: 12, title: "PART 3 - 기술 스택 및 아키텍처" },
  { id: 13, title: "핵심 기술 스택" },
  { id: 14, title: "아키텍처 원칙 1: 모듈러 모놀리스 (안정성 극대화)" },
  { id: 15, title: "아키텍처 원칙2: 무중단 데이터 동기화 (Zero-downtime migration)" },
  { id: 16, title: "아키텍처 원칙3: CI/CD 자동화 아키텍처" },
  { id: 17, title: "PART 4 - 혁신 및 검증" },
  { id: 18, title: "비즈니스 혁신1: 차세대 영업 핵심 IT 엔진 보유" },
  { id: 19, title: "비즈니스 혁신 2. AI 지능형 물류 플랫폼으로의 전환" },
  { id: 20, title: "비즈니스 혁신 3. 전략적 수익화 IT 플랫폼 확보" },
  { id: 21, title: "비즈니스 혁신 4. 프로토타입 엔진을 통한 아키텍처 내재화" },
  { id: 22, title: "비즈니스 혁신 5. Zero-Defect 코드 품질 통제 체계" },
  { id: 23, title: "비즈니스 혁신 6. FinOps 관점에서의 클라우드 전환 대비" },
  { id: 24, title: "비즈니스 혁신 7. 독자 개발 RAG 기반 AI 솔루션 확보" },
  { id: 25, title: "비즈니스 혁신 8. 빌더형 인재 육성을 위한 전환" },
  { id: 26, title: "타사 프로젝트 비교" },
  { id: 27, title: "중장기 목표 2: MSA 전환" },
  { id: 28, title: "중장기 목표 1: Kubernetes 운영" },
  { id: 29, title: "PART 5 - 로드맵 및 미래 비전" },
  { id: 30, title: "단계적 롤아웃 로드맵" },
  { id: 31, title: "맺음말" },
  { id: 32, title: "스프린트 운영현황" },
];

export function getSlideById(id: number): Slide | undefined {
  return SLIDES.find((slide) => slide.id === id);
}

export function isValidSlideId(id: number): boolean {
  return id >= 1 && id <= SLIDE_COUNT;
}
