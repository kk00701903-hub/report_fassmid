export type Slide = {
  id: number;
  title: string;
};

export const SLIDE_COUNT = 31;

export const SLIDES: Slide[] = [
  { id: 1, title: "(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고" },
  { id: 2, title: "PART 1 - 전략적 비전 및 목표" },
  { id: 3, title: "FaSS 플랫폼 아이덴티티" },
  { id: 4, title: "Executive Summary - FaSS 플랫폼 구축" },
  { id: 5, title: "PART 2 - 프로젝트 진행 경과 및 성과" },
  { id: 6, title: "지금 세상은 바뀌고 있다 — 환기 페이지" },
  { id: 7, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고" },
  { id: 8, title: "(주)제때 FaSS 플랫폼 구축 중간 보고 - 슬라이드 16" },
  { id: 9, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고" },
  { id: 10, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고 - Slide 6" },
  { id: 11, title: "PART 3 - 기술 스택 및 아키텍처" },
  { id: 12, title: "FaSS 차세대 플랫폼 중간 보고 - 슬라이드 13" },
  { id: 13, title: "FaSS 차세대 플랫폼 아키텍처 원칙 1" },
  { id: 14, title: "FaSS 최종 목표: MSA 전환 전략" },
  { id: 15, title: "중장기 아키텍처 원칙 2: Cloud-Ready - FaSS 플랫폼 구축" },
  { id: 16, title: "무중단 데이터 동기화 - FaSS 플랫폼" },
  { id: 17, title: "PART 4 - 혁신 및 검증" },
  { id: 18, title: "(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고 - 슬라이드 19" },
  { id: 19, title: "AI 기반 스마트 물류 최적화" },
  { id: 20, title: "FaSS 차세대 플랫폼 중간 보고 - 대용량 데이터 처리" },
  { id: 21, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고 - Slide 15" },
  { id: 22, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고 - Slide 7" },
  { id: 23, title: "FinOps 관점의 철저한 클라우드 예산 절감 훈련" },
  { id: 24, title: "FaSS 플랫폼 구축 보고 - Slide 18" },
  { id: 25, title: "AI 오케스트레이션 기반 개발 혁신 — LangGraph · Claude Code · GitLab" },
  { id: 26, title: "AI 디지털 워커: 미래 IT 조직의 새로운 패러다임" },
  { id: 27, title: "AI 시대의 IT 인재상 — 빌더형 인재 육성" },
  { id: 28, title: "PART 5 - 로드맵 및 미래 비전" },
  { id: 29, title: "FaSS 차세대 플랫폼 6월 중간 보고 - 슬라이드 8" },
  { id: 30, title: "(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고 - 맺음말" },
  { id: 31, title: "(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고 - 맺음말" },
];

export function getSlideById(id: number): Slide | undefined {
  return SLIDES.find((slide) => slide.id === id);
}

export function isValidSlideId(id: number): boolean {
  return id >= 1 && id <= SLIDE_COUNT;
}
