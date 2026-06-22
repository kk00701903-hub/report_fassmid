export type Slide = {
  id: number;
  title: string;
};

export const SLIDE_COUNT = 35;

export const SLIDES: Slide[] = [
  { id: 1, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고" },
  { id: 2, title: "PART 1 - 전략적 비전 및 목표" },
  { id: 3, title: "디지털 트렌드" },
  { id: 4, title: "디지털 트렌드" },
  { id: 5, title: "제때의 전략 방향" },
  { id: 6, title: "FaSS 플랫폼 아이덴티티" },
  { id: 7, title: "Executive Summary - FaSS 플랫폼 구축" },
  { id: 8, title: "PART 2 - 프로젝트 진행 경과 및 방향성" },
  { id: 9, title: "최적화 방안 1. 워룸 운영" },
  { id: 10, title: "최적화 방안 2. AI 디지털 워커 활용" },
  { id: 11, title: "최적화 방안 3. 사전 POC 운영" },
  { id: 12, title: "최적의 안전성 검증: PoC 타겟 선정 및 완료" },
  { id: 13, title: "PART 3 - 기술 스택 및 아키텍처" },
  { id: 14, title: "기술 스택 상세 — Frontend · Backend · Security" },
  { id: 15, title: "기술 스택 상세 — Data · DevOps · AI" },
  { id: 16, title: "아키텍처 원칙 1: 모듈러 모놀리스 (안정성 극대화)" },
  { id: 17, title: "FaSS 최종 목표: MSA 전환 전략" },
  { id: 18, title: "중장기 아키텍처 원칙 2: Cloud-Ready - FaSS 플랫폼 구축" },
  { id: 19, title: "중장기 아키텍처 원칙 3: Kubernetes (컨테이너 오케스트레이션)" },
  { id: 20, title: "CI/CD 자동화 아키텍처 - FaSS 플랫폼" },
  { id: 21, title: "무중단 데이터 동기화 - FaSS 플랫폼" },
  { id: 22, title: "PART 4 - 혁신 및 검증" },
  { id: 23, title: "100억 원의 자산 창출과 ASP 비즈니스 대전환" },
  { id: 24, title: "통합 프로토타입 개발 착수 — 주유소(JTGS) 관리 시스템" },
  { id: 25, title: "AI 기반 스마트 물류 최적화" },
  { id: 26, title: "FaSS 차세대 플랫폼 — 대용량 데이터 처리" },
  { id: 27, title: "무결점(Zero-Defect) 코드 품질 통제 체계" },
  { id: 28, title: "FinOps 관점의 철저한 클라우드 예산 절감 훈련" },
  { id: 29, title: "타사 프로젝트 규모 비교 참고" },
  { id: 30, title: "지능형 코드 변환 아키텍처 (RAG)" },
  { id: 31, title: "AI 개발 혁신 — 도구 투자 · 오케스트레이션 · 인재육성" },
  { id: 32, title: "차세대 웹프레임워크 × 빌더형 인재 육성" },
  { id: 33, title: "PART 5 - 로드맵 및 미래 비전" },
  { id: 34, title: "무결점 비즈니스 전환을 위한 단계적 롤아웃 로드맵" },
  { id: 35, title: "(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고 - 맺음말" },
];

export function getSlideById(id: number): Slide | undefined {
  return SLIDES.find((slide) => slide.id === id);
}

export function isValidSlideId(id: number): boolean {
  return id >= 1 && id <= SLIDE_COUNT;
}
