/** FaSS Platform v3.0 — sprint-backlog 기준 기술 스택 레이어 */

export type TechStackItem = {
  name: string;
  detail: string;
  sprintId?: string;
};

export type TechStackLayer = {
  id: string;
  label: string;
  icon: string;
  accent: string;
  items: TechStackItem[];
};

export const FASS_BACKLOG_URL = "https://kk00701903-hub.github.io/sprint-backlog/";
export const FASS_DAILY_SCRUM_URL = "https://kk00701903-hub.github.io/fass-dailyscrum/#/analytics";

export const FASS_TECH_LAYERS: TechStackLayer[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "fa-solid fa-window-maximize",
    accent: "#00f0ff",
    items: [
      { name: "Next.js 15", detail: "App Router · SSR · RSC · Streaming", sprintId: "S16" },
      { name: "React 19 + TypeScript", detail: "Server/Client Component 분리", sprintId: "S09" },
      { name: "RealGrid 2.0", detail: "엔터프라이즈 그리드 · 가상 스크롤", sprintId: "S09" },
      { name: "Zustand / React Query", detail: "상태관리 · API 캐시 공통 모듈", sprintId: "S08" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "fa-solid fa-server",
    accent: "#3b82f6",
    items: [
      { name: "Java 21 + Spring Boot 3", detail: "SiteFramework 공통 아키텍처", sprintId: "S04" },
      { name: "Spring Security 6.x", detail: "Stateless JWT · Resource Server", sprintId: "S06" },
      { name: "MapStruct + DTO", detail: "Entity 노출 금지 · Batch 패턴", sprintId: "S10" },
      { name: "OpenAPI 3.1", detail: "API-First · 모듈 간 계약 고정", sprintId: "S12" },
    ],
  },
  {
    id: "security",
    label: "Security & IAM",
    icon: "fa-solid fa-shield-halved",
    accent: "#a78bfa",
    items: [
      { name: "Keycloak + OIDC", detail: "SSO · LDAP 연동", sprintId: "S05" },
      { name: "RBAC + ABAC", detail: "AOP 기반 권한 인터셉터", sprintId: "S07" },
      { name: "API 마스킹", detail: "PII 필드 마스킹 · DB 암호화", sprintId: "S15" },
      { name: "Nexus IQ SCA", detail: "오픈소스 공급망 보안", sprintId: "S21" },
    ],
  },
  {
    id: "data",
    label: "Data & Messaging",
    icon: "fa-solid fa-database",
    accent: "#22c55e",
    items: [
      { name: "PostgreSQL", detail: "도메인별 스키마 격리", sprintId: "S04" },
      { name: "Redis", detail: "세션 · 캐시 · Pub/Sub", sprintId: "S03" },
      { name: "Debezium + Kafka", detail: "CDC 무중단 동기화 파이프라인", sprintId: "S17" },
      { name: "Multi-tenancy", detail: "컴퍼니별 데이터 격리", sprintId: "S11" },
    ],
  },
  {
    id: "infra",
    label: "Platform & DevOps",
    icon: "fa-solid fa-cloud",
    accent: "#facc15",
    items: [
      { name: "Config · Vault · Discovery", detail: "Spring Cloud 공통 인프라", sprintId: "S03" },
      { name: "API Gateway", detail: "외부 연동 · 알림 · 그룹웨어", sprintId: "S12" },
      { name: "Docker + GitLab CI/CD", detail: "컨테이너 빌드 · Quality Gate", sprintId: "S02" },
      { name: "Grafana + Superset", detail: "운영 모니터링 · BI 대시보드", sprintId: "S22" },
    ],
  },
  {
    id: "ai",
    label: "AI & Agent",
    icon: "fa-solid fa-robot",
    accent: "#fb923c",
    items: [
      { name: "LangGraph", detail: "멀티에이전트 오케스트레이션", sprintId: "S18" },
      { name: "Claude Code + DGX Spark", detail: "RAG · 코드 생성 · 리뷰", sprintId: "S14" },
      { name: "AI 연동 모듈", detail: "물류·유통 AI 서비스 표준 API", sprintId: "S14" },
      { name: "Agent Profile Mgmt", detail: "역할·프로파일 관리", sprintId: "S18" },
    ],
  },
];

export const FASS_SPRINT_PHASES = [
  { phase: "1단계", label: "인프라·표준 규격", sprints: ["S01", "S02", "S03", "S04"] },
  { phase: "2단계", label: "보안·공통 모듈", sprints: ["S05", "S06", "S07", "S08"] },
  { phase: "3단계", label: "생산성·UI 표준", sprints: ["S09", "S10", "S11"] },
  { phase: "4단계", label: "외부 연동·데이터", sprints: ["S12", "S14"] },
  { phase: "5단계", label: "보안·최적화", sprints: ["S15", "S16", "S17", "S23"] },
];
