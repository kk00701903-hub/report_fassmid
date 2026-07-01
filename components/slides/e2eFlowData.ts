export type E2EPhase = {
  id: string;
  num: number;
  name: string;
  en: string;
  desc: string;
  tools: string[];
  accent: string;
};

export type E2EScenarioStep = {
  num: number;
  label: string;
  tagVariant?: "deploy";
  text: string;
  highlight: string;
};

export type E2EAnalogyRow = {
  phase: string;
  text: string;
};

export const E2E_PHASES: E2EPhase[] = [
  {
    id: "plan",
    num: 1,
    name: "기획 · 관리",
    en: "Plan — 무엇을, 언제까지",
    desc: "Epic·Story·Task로 업무를 쪼개고 스프린트 목표와 우선순위를 정합니다. 일정·범위·담당이 확정됩니다.",
    tools: ["Jira", "백로그", "스프린트"],
    accent: "#ca8a04",
  },
  {
    id: "design",
    num: 2,
    name: "설계 · UI/UX",
    en: "Design — 화면과 데이터 구조",
    desc: "화면·API·데이터 구조를 설계하고 프로토타입을 확정해 rework를 줄입니다.",
    tools: ["Figma", "Adobe", "UI 스펙"],
    accent: "#7c3aed",
  },
  {
    id: "develop",
    num: 3,
    name: "AI 개발",
    en: "Develop — 코드·테스트·문서",
    desc: "Claude Code·DGX Spark가 RAG 컨텍스트로 코드·테스트·문서 초안을 생성하고 사람이 검수합니다.",
    tools: ["Claude Code", "DGX Spark", "Cursor"],
    accent: "#0078d4",
  },
  {
    id: "deploy",
    num: 4,
    name: "통합 · 배포",
    en: "Integrate & Deploy — 서버 반영",
    desc: "GitLab CI/CD가 빌드·테스트·배포를 자동 실행합니다. 스테이징 → 운영 순으로 반영합니다.",
    tools: ["GitLab", "Jenkins", "CI/CD"],
    accent: "#005a9e",
  },
  {
    id: "verify",
    num: 5,
    name: "검증 · 완료",
    en: "Verify — 품질 확인 후 Done",
    desc: "자동·회귀 테스트와 Human-in-the-loop 검수 후 Jira Done 처리, 다음 스프린트로 이어집니다.",
    tools: ["QA", "회귀 테스트", "품질 Gate"],
    accent: "#107c10",
  },
];

export const E2E_SCENARIO_STEPS: E2EScenarioStep[] = [
  {
    num: 1,
    label: "기획",
    text: ' 등록 — "납기일 필드 추가", 스프린트 배정',
    highlight: "Jira Story",
  },
  {
    num: 2,
    label: "설계",
    text: " 화면 수정 · API 스펙 정의",
    highlight: "Figma",
  },
  {
    num: 3,
    label: "개발",
    text: " UI·API·테스트 코드 생성 → 개발자 검수",
    highlight: "Claude Code",
  },
  {
    num: 4,
    label: "배포",
    tagVariant: "deploy",
    text: " 빌드·테스트 통과 → 스테이징·운영 반영",
    highlight: "GitLab CI",
  },
  {
    num: 5,
    label: "검증",
    text: "QA·현업 확인 후 Done — 다음 기능으로",
    highlight: "",
  },
];

export const E2E_ANALOGY_ROWS: E2EAnalogyRow[] = [
  { phase: "기획", text: "출시 계획 · 일정 · 우선순위" },
  { phase: "설계", text: "제품 설계도 · 포장 · UX" },
  { phase: "개발", text: "공장 생산 (AI + 사람 협업)" },
  { phase: "배포", text: "물류 · 매장 진열 (서버 반영)" },
  { phase: "검증", text: "품질 검사 · 고객 피드백" },
];
