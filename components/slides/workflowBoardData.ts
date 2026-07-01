export type WorkflowTool = {
  id: string;
  name: string;
  use: string;
  iconClass?: string;
  iconText?: string;
  theme: "jira" | "figma" | "adobe" | "claude" | "cursor" | "idea" | "gitlab" | "done" | "dgx";
};

export type WorkflowPhase = {
  id: string;
  phaseKey: "plan" | "design" | "dev" | "git" | "done";
  phaseNum: number;
  phaseLabel: string;
  colLabel: string;
  accent: string;
  tools: WorkflowTool[];
  caption?: string;
  captionAgile?: boolean;
};

export const WORKFLOW_PHASE_STEPS = [
  "① Jira Epic → Story 등록 · 스프린트 할당",
  "② Figma·Adobe 설계 + Claude Code UI 코드 초안",
  "③ DGX Spark RAG 컨텍스트 + Cursor·IntelliJ AI 코딩",
  "④ GitLab Push/MR · Code Review · CI/CD 배포",
  "⑤ Jira Done · 스프린트 리뷰 · 다음 Sprint 피드백",
] as const;

export const WORKFLOW_PHASES: WorkflowPhase[] = [
  {
    id: "plan",
    phaseKey: "plan",
    phaseNum: 1,
    phaseLabel: "기획·관리",
    colLabel: "PLAN",
    accent: "#0052cc",
    tools: [
      {
        id: "jira",
        name: "Jira",
        use: "프로젝트·업무 관리\n스프린트·백로그·이슈 추적",
        iconClass: "fab fa-jira",
        theme: "jira",
      },
    ],
    caption: "Epic → Story → Task\n애자일 보드 운영",
  },
  {
    id: "design",
    phaseKey: "design",
    phaseNum: 2,
    phaseLabel: "설계·UI/UX",
    colLabel: "DESIGN",
    accent: "#9747ff",
    tools: [
      {
        id: "figma",
        name: "Figma",
        use: "화면설계·스토리북 편집\nUI 컴포넌트·프로토타입",
        iconClass: "fab fa-figma",
        theme: "figma",
      },
      {
        id: "adobe",
        name: "Adobe",
        use: "디자인·영상·문서 편집\n브랜드·가이드·산출물",
        iconClass: "fab fa-adobe",
        theme: "adobe",
      },
      {
        id: "claude-design",
        name: "Claude Code",
        use: "Figma 스펙 → UI 코드 생성\n컴포넌트·스토리북 초안",
        iconClass: "fas fa-robot",
        theme: "claude",
      },
    ],
  },
  {
    id: "dev",
    phaseKey: "dev",
    phaseNum: 3,
    phaseLabel: "AI 개발",
    colLabel: "AI DEVELOP",
    accent: "#5a8f00",
    tools: [
      {
        id: "dgx",
        name: "DGX Spark",
        use: "RAG·GPU 추론\n레거시·문서 컨텍스트",
        iconClass: "fas fa-microchip",
        theme: "dgx",
      },
      {
        id: "cursor",
        name: "Cursor",
        use: "개발 전용 AI IDE",
        iconClass: "fas fa-code",
        theme: "cursor",
      },
      {
        id: "idea",
        name: "IntelliJ",
        use: "웹 개발 전용 IDE",
        iconText: "IJ",
        theme: "idea",
      },
      {
        id: "claude-dev",
        name: "Claude Code",
        use: "코드 생성·리팩터링\nRAG 기반 개발",
        iconClass: "fas fa-robot",
        theme: "claude",
      },
    ],
  },
  {
    id: "git",
    phaseKey: "git",
    phaseNum: 4,
    phaseLabel: "통합·배포",
    colLabel: "INTEGRATE",
    accent: "#e24329",
    tools: [
      {
        id: "gitlab",
        name: "GitLab",
        use: "소스코드 버전 관리\nMR·Code Review·CI/CD",
        iconClass: "fab fa-gitlab",
        theme: "gitlab",
      },
    ],
    caption: "Feature Branch → MR\nQuality Gate → Merge",
  },
  {
    id: "done",
    phaseKey: "done",
    phaseNum: 5,
    phaseLabel: "검증·완료",
    colLabel: "DONE",
    accent: "#107c10",
    tools: [
      {
        id: "jira-done",
        name: "Jira 완료 처리",
        use: "스프린트 리뷰·회고\n다음 스프린트 피드백",
        iconClass: "fas fa-check-double",
        theme: "done",
      },
    ],
    caption: "애자일 순환",
    captionAgile: true,
  },
];

export const WORKFLOW_PIPELINE = [
  { id: "p1", title: "Jira 이슈 등록", sub: "요구사항·스프린트 할당" },
  { id: "p2", title: "Figma·Adobe\n+ Claude Code", sub: "UI/UX 설계·코드 초안" },
  { id: "p3", title: "DGX Spark", sub: "RAG·GPU 추론", variant: "ai" as const },
  { id: "p4", title: "Cursor · IntelliJ\n+ Claude Code", sub: "AI 협업 코딩", variant: "highlight" as const },
  { id: "p5", title: "GitLab Push/MR", sub: "리뷰·CI/CD·배포" },
  { id: "p6", title: "Jira Done", sub: "검증·회고·다음 Sprint" },
];
