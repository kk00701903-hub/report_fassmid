export type Slide = {
  id: number;
  title: string;
};

export const SLIDE_COUNT = 35;

export const SLIDES: Slide[] = [
  { id: 1, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고" },
  { id: 2, title: "PART 1 - 전략적 비전 및 목표" },
  { id: 3, title: "디지털 전환 4대 트렌드 — MSA · Cloud · Open Source · AI" },
  { id: 4, title: "FaSS 플랫폼 아이덴티티" },
  { id: 5, title: "Executive Summary - FaSS 플랫폼 구축" },
  { id: 6, title: "PART 2 - 프로젝트 진행 경과 및 성과" },
  { id: 7, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고" },
  { id: 8, title: "워룸 구축 · FASS 데일리 스크럼" },
  { id: 9, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고" },
  { id: 10, title: "AI 기반 디자이너·외주 개발 인력 대체" },
  { id: 11, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고 - Slide 6" },
  { id: 12, title: "PART 3 - 기술 스택 및 아키텍처" },
  { id: 13, title: "FaSS 차세대 플랫폼 중간 보고 - 슬라이드 13" },
  { id: 14, title: "FaSS 차세대 플랫폼 아키텍처 원칙 1" },
  { id: 15, title: "FaSS 최종 목표: MSA 전환 전략" },
  { id: 16, title: "중장기 아키텍처 원칙 2: Cloud-Ready - FaSS 플랫폼 구축" },
  { id: 17, title: "중장기 아키텍처 원칙 3: Kubernetes 아키텍처" },
  { id: 18, title: "CI/CD 자동화 아키텍처 (GitLab · Nexus · Argo CD)" },
  { id: 19, title: "무중단 데이터 동기화 - FaSS 플랫폼" },
  { id: 20, title: "PART 4 - 혁신 및 검증" },
  { id: 21, title: "(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고 - 슬라이드 19" },
  { id: 22, title: "AI 기반 스마트 물류 최적화" },
  { id: 23, title: "FaSS 차세대 플랫폼 중간 보고 - 대용량 데이터 처리" },
  { id: 24, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고 - Slide 15" },
  { id: 25, title: "통합 프로토타입 개발 스타트 — 주유소(JTGS)" },
  { id: 26, title: "FinOps 관점의 철저한 클라우드 예산 절감 훈련" },
  { id: 27, title: "타사 프로젝트 규모 비교 참고" },
  { id: 28, title: "AI 개발 혁신 — 도구 투자 · 오케스트레이션 · 인재육성" },
  { id: 29, title: "차세대 웹프레임워크 × 빌더형 인재 육성" },
  { id: 30, title: "AI 디지털 워커 (AI Digital Worker)" },
  { id: 31, title: "AI 시대의 IT 인재상 — 빌더형 인재 육성" },
  { id: 32, title: "PART 5 - 로드맵 및 미래 비전" },
  { id: 33, title: "FaSS 차세대 플랫폼 6월 중간 보고 - 슬라이드 8" },
  { id: 34, title: "(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고 - 맺음말" },
  { id: 35, title: "(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고 - 맺음말" },
];

export function getSlideById(id: number): Slide | undefined {
  return SLIDES.find((slide) => slide.id === id);
}

export function isValidSlideId(id: number): boolean {
  return id >= 1 && id <= SLIDE_COUNT;
}
