export type SprintStatus = "closed" | "future" | "active";

export type SprintItem = {
  id: string;
  title: string;
  status: SprintStatus;
  tag?: "대규모";
};

export type SprintPhase = {
  id: string;
  phaseKey: "p0" | "p1" | "p2" | "p3" | "px";
  phaseNum: string;
  phaseName: string;
  sprints: SprintItem[];
};

export const SPRINT_BOARD_STATS = {
  total: 19,
  active: 9,
  closed: 2,
  future: 8,
} as const;

export const SPRINT_PHASES: SprintPhase[] = [
  {
    id: "phase-0",
    phaseKey: "p0",
    phaseNum: "Phase 0",
    phaseName: "기반 · 표준",
    sprints: [
      { id: "S01", title: "개발 명명 규칙 표준화 작업", status: "closed" },
      { id: "S02", title: "개발 환경 및 인프라 기반 구축", status: "future" },
      { id: "S03", title: "공통 플랫폼 인프라", status: "active" },
    ],
  },
  {
    id: "phase-1",
    phaseKey: "p1",
    phaseNum: "Phase 1",
    phaseName: "인증/보안/권한",
    sprints: [
      { id: "S05", title: "SSO 연동 구축", status: "future" },
      { id: "S07", title: "권한 관리", status: "active" },
      { id: "S08", title: "상태관리 및 API 통신 공통 모듈 개발", status: "closed" },
      { id: "S15", title: "데이터 보안", status: "future" },
    ],
  },
  {
    id: "phase-2",
    phaseKey: "p2",
    phaseNum: "Phase 2",
    phaseName: "아키텍처/공통",
    sprints: [
      { id: "S04", title: "공통 프레임워크 아키텍처", status: "active" },
      { id: "S09", title: "공통 UI 컴포넌트 라이브러리 개발", status: "future" },
      { id: "S10", title: "비즈니스 컴포넌트 개발 가이드", status: "active" },
      { id: "S11", title: "멀티 컴퍼니 지원", status: "future" },
      { id: "S16", title: "SSR-RSC 최적화 및 Web Vitals", status: "future" },
    ],
  },
  {
    id: "phase-3",
    phaseKey: "p3",
    phaseNum: "Phase 3",
    phaseName: "데이터/통합/AI",
    sprints: [
      { id: "S12", title: "외부 인터페이스", status: "future" },
      { id: "S14", title: "AI 연동 모듈 개발", status: "active" },
      { id: "S17", title: "CDC 데이터 동기화 파이프라인 구축", status: "future" },
    ],
  },
  {
    id: "phase-x",
    phaseKey: "px",
    phaseNum: "추가 과제",
    phaseName: "전략·품질·Tool",
    sprints: [
      { id: "S18", title: "MSA 전환 로드맵 실행 (Phase 1→2→3)", status: "active", tag: "대규모" },
      { id: "S19", title: "표준 라이브러리 골든셋 (Golden Set)", status: "active", tag: "대규모" },
      { id: "S20", title: "SCA 도입 (Nexus IQ — OSS 공급망 보안)", status: "active", tag: "대규모" },
      { id: "S23", title: "리포트 Tool 도입", status: "active" },
    ],
  },
];
