/**
 * Deck Manifest — 발표 슬라이드 순서의 단일 소스
 *
 * 순서 변경: 이 배열에서 항목을 위/아래로 이동
 * slideId는 컴포넌트 파일명(Slide{NN}.tsx)과 연결되므로 순서 변경 시 ID는 건드리지 않음
 * 새 슬라이드 추가: Slide{NN}.tsx 생성 + 아래 배열에 항목 1줄 추가
 *
 * URL /slides/{N}/ 의 N은 페이지 번호(1-based 배열 인덱스)입니다.
 * 순서를 바꾸면 북마크된 URL이 다른 슬라이드를 가리킬 수 있습니다.
 */

export type DeckSlideRole =
  | "cover"
  | "glossary-divider"
  | "glossary"
  | "part-divider"
  | "appendix-divider"
  | "content"
  | "appendix"
  | "closing";

export type DeckSlideEntry = {
  /** 안정 ID — components/slides/Slide{NN}.tsx 및 CSS slide-s{NN} 과 1:1 */
  slideId: number;
  title: string;
  role: DeckSlideRole;
  /** part-divider 전용 */
  partNumber?: number;
  partTitleKo?: string;
  partTitleEn?: string;
  /** false이면 발표 기본값에서 숨김 (별첨 등) */
  defaultVisible?: boolean;
};

export const DECK_MANIFEST: DeckSlideEntry[] = [
  { slideId: 1, title: "(주)제때 차세대 FaSS 플랫폼 구축 중간 보고", role: "cover" },
  { slideId: 10, title: "FaSS 플랫폼 아이덴티티", role: "content" },
  { slideId: 11, title: "디지털 트렌드 — AI 디지털 워커 (AI Digital Worker)", role: "content" },
  {
    slideId: 2,
    title: "PART 1 - 전략적 비전 및 목표",
    role: "part-divider",
    partNumber: 1,
    partTitleKo: "전략적 비전 및 목표",
    partTitleEn: "Strategic Vision & Objectives",
  },
  { slideId: 7, title: "차세대 FaSS 구축 프로젝트 범위", role: "content" },
  { slideId: 14, title: "단계별 실행주기 (Sprint) 운영현황", role: "content" },
  { slideId: 15, title: "타사 프로젝트 비교", role: "content" },
  { slideId: 16, title: "AI 협력 개발 워크플로우 (AI-Augmented)", role: "content" },
  {
    slideId: 13,
    title: "PART 2 - 프로젝트 진행 경과 및 방향성",
    role: "part-divider",
    partNumber: 2,
    partTitleKo: "프로젝트 진행 경과 및 방향성",
    partTitleEn: "Project Progress & Direction",
  },
  { slideId: 18, title: "프로젝트 진행경과 마일스톤", role: "content" },
  { slideId: 19, title: "최적화 방안 1. AI 디지털 워커 활용", role: "content" },
  { slideId: 42, title: "#. Agent Studio", role: "content" },
  { slideId: 43, title: "#. AX 플랫폼", role: "content" },
  { slideId: 20, title: "최적화 방안 2. 애자일 (Agile) 방식 개발 추진", role: "content" },
  { slideId: 21, title: "최적화 방안 3. 사전 기술검증 시스템 운영 (POC)", role: "content" },
  {
    slideId: 22,
    title: "PART 3 - 기술 스택 및 아키텍처",
    role: "part-divider",
    partNumber: 3,
    partTitleKo: "기술 스택 및 아키텍처",
    partTitleEn: "Tech Stack & Architecture",
  },
  { slideId: 23, title: "핵심 기술 스택", role: "content" },
  { slideId: 3, title: "기술 방향성 설명 ① — 3Tier 구조 (Web-WAS-DB)", role: "glossary" },
  { slideId: 4, title: "기술 방향성 설명 ② — 도커 (Docker) (물류 컨테이너 예시)", role: "glossary" },
  { slideId: 5, title: "기술 방향성 설명 ③ — MSA 구조 (물류작업 예시)", role: "glossary" },
  { slideId: 6, title: "기술 방향성 설명 ④ — CDC 방식 (물류 재고조사 예시)", role: "glossary" },
  {
    slideId: 27,
    title: "PART 4 - 혁신 및 검증",
    role: "part-divider",
    partNumber: 4,
    partTitleKo: "혁신 및 검증",
    partTitleEn: "Innovation & Validation",
  },
  { slideId: 28, title: "비즈니스 혁신1: 차세대 영업 핵심 IT 엔진 보유", role: "content" },
  { slideId: 29, title: "비즈니스 혁신2: AI 지능형 물류 플랫폼으로의 전환", role: "content" },
  { slideId: 30, title: "비즈니스 혁신3: 전략적 수익화 IT 플랫폼 확보", role: "content" },
  { slideId: 31, title: "비즈니스 혁신4: 프로토타입 엔진을 통한 아키텍처 내재화", role: "content" },
  { slideId: 32, title: "비즈니스 혁신5: Zero-Defect 코드 품질 통제 체계", role: "content" },
  { slideId: 33, title: "비즈니스 혁신6: 클라우드 전환을 위한 교두보", role: "content" },
  { slideId: 34, title: "비즈니스 혁신7: AI 오케스트레이션", role: "content" },
  { slideId: 35, title: "비즈니스 혁신8: 빌더형 인재 육성", role: "content" },
  {
    slideId: 36,
    title: "PART 5 - 로드맵 및 미래 비전",
    role: "part-divider",
    partNumber: 5,
    partTitleKo: "로드맵 및 미래 비전",
    partTitleEn: "Roadmap & Future Vision",
  },
  { slideId: 37, title: "단계적 롤아웃 로드맵", role: "content" },
  { slideId: 40, title: "맺음말", role: "closing" },
  {
    slideId: 44,
    title: "별첨",
    role: "appendix-divider",
    partTitleKo: "별첨",
    partTitleEn: "Appendix — Supplementary Reference Materials",
  },
  { slideId: 12, title: "#. 별첨 Executive Summary - FaSS 플랫폼 구축", role: "appendix", defaultVisible: true },
  {
    slideId: 9,
    title: "#. 별첨 팀 에이전트 구성 — AI 8인 역할",
    role: "appendix",
    defaultVisible: false,
  },
  { slideId: 24, title: "#. 별첨 아키텍처 원칙 1: 모듈러 모놀리스 (안정성 극대화)", role: "appendix", defaultVisible: true },
  { slideId: 25, title: "#. 별첨 아키텍처 원칙 2: 무중단 데이터 동기화 (Zero-downtime migration)", role: "appendix", defaultVisible: true },
  { slideId: 26, title: "#. 별첨 아키텍처 원칙 3: CI/CD 자동화 (DevOps · GitOps)", role: "appendix", defaultVisible: true },
  { slideId: 38, title: "#. 별첨 중장기 목표 1: Kubernetes 운영", role: "appendix", defaultVisible: true },
  { slideId: 39, title: "#. 별첨 중장기 목표 2: MSA 전환", role: "appendix", defaultVisible: true },
];

const TOPIC_ROLES: ReadonlySet<DeckSlideRole> = new Set(["content", "closing"]);

export function getDeckLength(): number {
  return DECK_MANIFEST.length;
}

export function getDeckEntryBySlideId(slideId: number): DeckSlideEntry | undefined {
  return DECK_MANIFEST.find((entry) => entry.slideId === slideId);
}

export function getDeckIndexBySlideId(slideId: number): number {
  return DECK_MANIFEST.findIndex((entry) => entry.slideId === slideId);
}

/** 1-based 페이지 번호 */
export function getDeckEntryAtPage(page: number): DeckSlideEntry | undefined {
  if (!Number.isFinite(page) || page < 1 || page > DECK_MANIFEST.length) return undefined;
  return DECK_MANIFEST[page - 1];
}

/** 1-based 페이지 번호; 없으면 -1 */
export function getPageForSlideId(slideId: number): number {
  const index = getDeckIndexBySlideId(slideId);
  return index >= 0 ? index + 1 : -1;
}

export function isAppendixRole(role: DeckSlideRole): boolean {
  return role === "appendix";
}

export function getPartDividerEntry(partNumber: number): DeckSlideEntry | undefined {
  return DECK_MANIFEST.find(
    (entry) => entry.role === "part-divider" && entry.partNumber === partNumber,
  );
}

/** PART 간지 목차 — 해당 PART의 content·closing 슬라이드 제목 (manifest 순서) */
export function getPartTopicTitles(partNumber: number): string[] {
  const dividerIndex = DECK_MANIFEST.findIndex(
    (entry) => entry.role === "part-divider" && entry.partNumber === partNumber,
  );
  if (dividerIndex < 0) return [];

  const titles: string[] = [];
  for (let i = dividerIndex + 1; i < DECK_MANIFEST.length; i++) {
    const entry = DECK_MANIFEST[i];
    if (
      entry.role === "part-divider" ||
      entry.role === "glossary-divider" ||
      entry.role === "appendix-divider" ||
      entry.role === "appendix"
    ) {
      break;
    }
    if (TOPIC_ROLES.has(entry.role)) {
      titles.push(entry.title);
    }
  }
  return titles;
}

/** Glossary 간지 목차 */
export function getGlossaryTopicTitles(): string[] {
  return DECK_MANIFEST.filter((entry) => entry.role === "glossary").map((entry) => entry.title);
}

/** 별첨 간지 목차 */
export function getAppendixTopicTitles(): string[] {
  return DECK_MANIFEST.filter((entry) => entry.role === "appendix").map((entry) => entry.title);
}

/** 표지 목차 — PART 간지 항목 (manifest 순서) */
export function getPartDividerEntries(): DeckSlideEntry[] {
  return DECK_MANIFEST.filter(
    (entry): entry is DeckSlideEntry & { partNumber: number } =>
      entry.role === "part-divider" && typeof entry.partNumber === "number",
  );
}
