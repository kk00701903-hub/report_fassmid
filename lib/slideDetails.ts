import { FASS_BACKLOG_URL, type TechStackLayer } from "@/lib/fassTechStack";
import type { MilestonePhase } from "@/lib/fassMilestones";
import { ODIN_INFRA_TOPIC } from "@/lib/odinInfraDetail";

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type CodeSample = {
  language: string;
  filename: string;
  content: string;
};

export type DetailLink = {
  label: string;
  href: string;
};

export type DetailPreviewType =
  | "sprint-backlog"
  | "api-flow"
  | "auth-flow"
  | "terminal"
  | "realgrid"
  | "agent-flow";

export type DetailPreview = {
  type: DetailPreviewType;
  title?: string;
  caption?: string;
};

export type FlowNode = {
  id: string;
  label: string;
  sub?: string;
  icon?: string;
};

export type DetailMetaItem = {
  label: string;
  value: string;
  href?: string;
};

export type DetailTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type DetailSection = {
  title: string;
  icon?: string;
  summary?: string;
  bullets?: string[];
  table?: DetailTable;
  note?: string;
};

export type DetailTopic = {
  id: string;
  title: string;
  category: "code" | "process" | "architecture";
  summary: string;
  /** 앱·URL·환경 등 핵심 메타 (한 줄 요약 아래) */
  meta?: DetailMetaItem[];
  process?: ProcessStep[];
  code?: CodeSample[];
  links?: DetailLink[];
  /** 구조화된 본문 섹션 (표·불릿) */
  sections?: DetailSection[];
  /** FaSS sprint-backlog 전체 스택 또는 커스텀 레이어 */
  techLayers?: TechStackLayer[] | "fass-full";
  /** 동적 UI 미리보기 (화면 예시) */
  preview?: DetailPreview;
  /** 아키텍처 데이터 흐름 다이어그램 노드 */
  flowNodes?: FlowNode[];
  /** 7단계 마일스톤 간트 (fass-full = 전체 일정) */
  milestones?: MilestonePhase[] | "fass-full";
};

export type SlideDetailSet = {
  slideId: number;
  topics: DetailTopic[];
};

export const SLIDE_DETAILS: SlideDetailSet[] = [
  {
    slideId: 1,
    topics: [
      {
        id: "project-overview",
        title: "프로젝트 개요 및 보고 범위",
        category: "process",
        summary: "FaSS 차세대 플랫폼 중간보고의 목적, 대상, 산출물 범위를 정리합니다.",
        process: [
          { step: 1, title: "보고 목적", description: "6월 기준 전략·아키텍처·개발 진척·혁신 과제를 경영진에 공유" },
          { step: 2, title: "핵심 메시지", description: "상용 솔루션 종속 탈피, AI+웹 표준 기반 독자 엔진 구축" },
          { step: 3, title: "대상 청중", description: "대표이사, 경영진, 차세대 FaSS TFT" },
        ],
      },
    ],
  },
  {
    slideId: 2,
    topics: [
      {
        id: "vision-roadmap",
        title: "전략적 비전 로드맵",
        category: "process",
        summary: "PART 1에서 다루는 전략 목표와 단계별 추진 흐름입니다.",
        process: [
          { step: 1, title: "Vision", description: "AI와 결합된 디지털 물류 표준 확립" },
          { step: 2, title: "Phase 1", description: "모듈러 모놀리스로 안정적 기반 구축" },
          { step: 3, title: "Phase 2", description: "Cloud-Ready 설계로 ASP/SaaS 확장 준비" },
        ],
      },
    ],
  },
  {
    slideId: 3,
    topics: [
      {
        id: "market-context",
        title: "디지털 전환 4대 트렌드",
        category: "process",
        summary:
          "MSA·Cloud Native·Open Source·AI Native 네 축이 동시에 차세대 플랫폼 표준을 재정의하고 있습니다. FaSS는 이 교차점에서 물류 디지털 전환의 방향을 설정합니다.",
        process: [
          { step: 1, title: "MSA", description: "Modular Monolith → MSA 점진 전환, DDD·API-First" },
          { step: 2, title: "Cloud", description: "Kubernetes·GitOps·FinOps 기반 Cloud-Ready 운영" },
          { step: 3, title: "Open Source", description: "PostgreSQL·Kafka·Debezium 등 CNCF/OSS 표준 스택" },
          { step: 4, title: "AI", description: "LangGraph Agent·RAG·Digital Worker 기반 AI Native 개발" },
        ],
      },
    ],
  },
  {
    slideId: 4,
    topics: [
      {
        id: "fass-identity",
        title: "FaSS 플랫폼 아이덴티티 가이드",
        category: "architecture",
        summary: "브랜드·기술 아이덴티티를 코드와 문서에 일관 적용하기 위한 기준입니다.",
        code: [
          {
            language: "css",
            filename: "design-tokens.css",
            content: `:root {
  --fass-bg: #0A0E1A;
  --fass-accent: #00F0FF;
  --fass-accent-2: #FACC15;
  --fass-font: "IBM Plex Sans KR", sans-serif;
}`,
          },
        ],
        process: [
          { step: 1, title: "UI 토큰", description: "색상·타이포·간격을 디자인 토큰으로 고정" },
          { step: 2, title: "문서 표준", description: "마크다운 기반 산출물에 동일 네이밍 적용" },
        ],
      },
    ],
  },
  {
    slideId: 5,
    topics: [
      {
        id: "executive-kpi",
        title: "Executive Summary KPI 추적",
        category: "process",
        summary: "경영진 보고용 핵심 지표와 점검 주기입니다.",
        process: [
          { step: 1, title: "일정", description: "마일스톤 대비 진척률 주간 점검" },
          { step: 2, title: "품질", description: "SonarQube Quality Gate 통과율" },
          { step: 3, title: "비용", description: "FinOps 기준 인프라 비용 대비 예산" },
        ],
      },
    ],
  },
  {
    slideId: 6,
    topics: [
      {
        id: "progress-tracking",
        title: "프로젝트 진행 관리 프로세스",
        category: "process",
        summary: "PART 2 진행 경과 추적을 위한 운영 프로세스입니다.",
        process: [
          { step: 1, title: "주간 스탠드업", description: "TFT 주간 진척·리스크 공유" },
          { step: 2, title: "GitLab 이슈", description: "Epic → Story → Task 계층으로 추적" },
          { step: 3, title: "중간 보고", description: "월간 경영 보고 및 의사결정 요청" },
        ],
      },
    ],
  },
  {
    slideId: 7,
    topics: [
      {
        id: "war-room",
        title: "워룸 운영 프로세스",
        category: "process",
        summary: "집중 개발 기간 워룸 운영 방식과 일일 루틴입니다.",
        process: [
          { step: 1, title: "데일리 체크인", description: "전일 완료·당일 목표·블로커 공유" },
          { step: 2, title: "실시간 대시보드", description: "CI/CD·품질 지표 화면 상시 노출" },
          { step: 3, title: "의사결정 SLA", description: "블로커 4시간 내 에스컬레이션" },
        ],
      },
    ],
  },
  {
    slideId: 8,
    topics: [
      {
        id: "fass-daily-scrum",
        title: "FASS 데일리 스크럼 소개",
        category: "process",
        summary:
          "차세대 FaSS TFT 애자일 운영 허브. 일일 스크럼·태스크 기록과 Analytics 대시보드로 워룸에서 진척·블로커·완료율을 실시간 공유합니다.",
        preview: {
          type: "sprint-backlog",
          title: "Analytics 대시보드",
          caption: "fass-dailyscrum — 스프린트·태스크·완료율·블로커 시각화",
        },
        process: [
          { step: 1, title: "Daily Scrum", description: "일일 스크럼 기록·태스크 상태 업데이트" },
          { step: 2, title: "Analytics", description: "진척도·블로커·완료율 대시보드로 워룸 공유" },
          { step: 3, title: "War-Room 연동", description: "전 팀 동일 KPI 인지 → 의사결정 리드타임 제로화" },
        ],
        links: [
          {
            label: "FASS Daily Scrum Analytics (Live)",
            href: "https://kk00701903-hub.github.io/fass-dailyscrum/#/analytics",
          },
        ],
      },
      {
        id: "productivity-metrics",
        title: "생산성 지표 수집 예시",
        category: "code",
        summary: "개발 생산성을 측정하기 위한 파이프라인 메트릭 수집 예시입니다.",
        code: [
          {
            language: "yaml",
            filename: ".gitlab-ci.yml (metrics job)",
            content: `collect_metrics:
  stage: report
  script:
    - echo "merge_requests=\${CI_MERGE_REQUESTS}" >> metrics.env
    - echo "pipeline_duration=\${CI_PIPELINE_DURATION}" >> metrics.env
  artifacts:
    reports:
      dotenv: metrics.env`,
          },
        ],
      },
    ],
  },
  {
    slideId: 9,
    topics: [
      {
        id: "milestone-plan",
        title: "마일스톤 계획 프로세스",
        category: "process",
        summary: "6월~10월 핵심 마일스톤 달성을 위한 단계별 점검 흐름입니다.",
        process: [
          { step: 1, title: "7월", description: "UI/UX 스토리보드 확정" },
          { step: 2, title: "8~9월", description: "수주·발주·정산 핵심 모듈 개발" },
          { step: 3, title: "10월", description: "JTGS 통합 프로토타입 개발 착수 (차세대 서버·완성형 스택 Start)" },
        ],
      },
    ],
  },
  {
    slideId: 10,
    topics: [
      {
        id: "ai-workforce-replacement",
        title: "AI 인력 대체 및 LangGraph 오케스트레이션",
        category: "architecture",
        summary:
          "LangGraph(S18)가 DGX Spark·Claude Code(S14) 에이전트에 태스크를 분배하고, SiteFramework 산출물에 README·위키 문서를 자동 생성합니다.",
        techLayers: [
          {
            id: "ai",
            label: "AI & Agent",
            icon: "fa-solid fa-robot",
            accent: "#fb923c",
            items: [
              { name: "LangGraph", detail: "StateGraph 기반 멀티에이전트 라우팅", sprintId: "S18" },
              { name: "DGX Spark", detail: "RAG · 레거시 코드베이스 임베딩", sprintId: "S14" },
              { name: "Claude Code", detail: "SiteFramework 보일러플레이트·MR 생성", sprintId: "S14" },
              { name: "Docs Agent", detail: "OpenAPI·README·Confluence 위키 동기화", sprintId: "S18" },
            ],
          },
        ],
        preview: {
          type: "agent-flow",
          title: "에이전트 오케스트레이션 흐름",
          caption: "기획 태스크 입력 → LangGraph가 역할별 에이전트에 분배 → GitLab MR·문서 산출",
        },
        flowNodes: [
          { id: "spec", label: "요구사항·API Spec", sub: "Jira / OpenAPI", icon: "fa-solid fa-file-lines" },
          { id: "langgraph", label: "LangGraph", sub: "S18 Router", icon: "fa-solid fa-diagram-project" },
          { id: "dgx", label: "DGX Spark", sub: "RAG Context", icon: "fa-solid fa-microchip" },
          { id: "claude", label: "Claude Code", sub: "Codegen + Review", icon: "fa-solid fa-code" },
          { id: "docs", label: "Docs Agent", sub: "README Wiki", icon: "fa-solid fa-book" },
        ],
        process: [
          { step: 1, title: "LangGraph", description: "기획·설계·코딩·QA·문서 태스크를 StateGraph 노드로 동적 할당" },
          { step: 2, title: "DGX Spark", description: "레거시 FaSS·도메인 문서 RAG로 컨텍스트 주입" },
          { step: 3, title: "Claude Code", description: "Java/TS 보일러플레이트 생성·ArchUnit 규칙 준수 리뷰" },
          { step: 4, title: "문서 Agent", description: "모듈별 README·API 위키를 sprint-backlog 형식으로 자동 갱신" },
          { step: 5, title: "디자인 최소화", description: "Figma Design Token·Storybook만 유지, UI 구현은 RealGrid 템플릿" },
        ],
        links: [{ label: "FaSS Sprint Backlog", href: FASS_BACKLOG_URL }],
      },
    ],
  },
  {
    slideId: 11,
    topics: [
      {
        id: "module-delivery",
        title: "핵심 모듈 납품 프로세스",
        category: "process",
        summary: "수주·발주·정산 모듈의 개발-검증-배포 흐름입니다.",
        process: [
          { step: 1, title: "요구사항", description: "도메인별 API 스펙 확정" },
          { step: 2, title: "구현", description: "모듈 경계 내 개발, API 통신만 허용" },
          { step: 3, title: "검증", description: "통합 테스트 + Quality Gate" },
          { step: 4, title: "배포", description: "스테이징 → 운영 단계적 반영" },
        ],
      },
    ],
  },
  {
    slideId: 12,
    topics: [
      {
        id: "tech-stack-overview",
        title: "FaSS Platform v3.0 기술 스택",
        category: "architecture",
        summary:
          "sprint-backlog 23개 스프린트(S01–S23)로 정의된 6계층 스택. Next.js 15·SiteFramework·Keycloak·Debezium CDC·LangGraph를 단일 플랫폼으로 통합합니다.",
        techLayers: "fass-full",
        preview: {
          type: "sprint-backlog",
          title: "Sprint Backlog 대시보드",
          caption: "kk00701903-hub.github.io/sprint-backlog — 스프린트별 DoD·태스크·진행률 추적",
        },
        process: [
          { step: 1, title: "1단계 인프라", description: "S01–S04: 네이밍·Docker CI·Config/Vault·SiteFramework" },
          { step: 2, title: "2단계 보안", description: "S05–S08: Keycloak OIDC·JWT·RBAC/ABAC·API 상태관리" },
          { step: 3, title: "3단계 UI·도메인", description: "S09–S11: RealGrid·MapStruct DTO·Multi-tenancy" },
          { step: 4, title: "4–5단계 확장", description: "S12–S23: Gateway·AI·CDC·SSR·Print/PDF" },
        ],
        links: [
          { label: "FaSS Sprint Backlog (Live)", href: FASS_BACKLOG_URL },
          { label: "SiteFramework Repo", href: "https://gitlab.com" },
        ],
      },
      ODIN_INFRA_TOPIC,
    ],
  },
  {
    slideId: 13,
    topics: [
      {
        id: "api-first",
        title: "API-First 모듈 통신 (S12 Gateway)",
        category: "code",
        summary:
          "SiteFramework 모듈 간 직접 import·DB 접근 금지. OpenAPI 3.1 계약(S12)으로 Gateway 경유 REST 통신만 허용합니다.",
        techLayers: [
          {
            id: "backend",
            label: "API Layer",
            icon: "fa-solid fa-plug",
            accent: "#3b82f6",
            items: [
              { name: "OpenAPI 3.1", detail: "모듈 간 계약·버전 고정", sprintId: "S12" },
              { name: "API Gateway", detail: "외부·모듈 간 라우팅·인증 위임", sprintId: "S12" },
              { name: "MapStruct DTO", detail: "Entity 노출 금지", sprintId: "S10" },
            ],
          },
        ],
        preview: {
          type: "api-flow",
          title: "모듈 간 API 호출 흐름",
          caption: "procurement → Gateway → order-mgmt. FK 대신 API 검증 후 UUID 참조만 저장",
        },
        flowNodes: [
          { id: "proc", label: "procurement", sub: "발주 모듈", icon: "fa-solid fa-box" },
          { id: "gw", label: "API Gateway", sub: "S12 · JWT", icon: "fa-solid fa-shield" },
          { id: "order", label: "order-mgmt", sub: "수주 모듈", icon: "fa-solid fa-clipboard-list" },
          { id: "dto", label: "OrderSummaryDto", sub: "MapStruct", icon: "fa-solid fa-file-code" },
        ],
        code: [
          {
            language: "typescript",
            filename: "order-client.ts",
            content: `// 발주 모듈 → Gateway → 수주 모듈 (직접 DB 접근 금지)
const GATEWAY = process.env.NEXT_PUBLIC_API_GATEWAY!;

export async function fetchOrderSummary(orderId: string, token: string) {
  const res = await fetch(\`\${GATEWAY}/api/v1/orders/\${orderId}/summary\`, {
    headers: {
      Accept: "application/json",
      Authorization: \`Bearer \${token}\`,
    },
    next: { tags: [\`order-\${orderId}\`] }, // RSC cache tag
  });
  if (!res.ok) throw new OrderApiError(res.status);
  return OrderSummarySchema.parse(await res.json());
}`,
          },
          {
            language: "yaml",
            filename: "order-summary.openapi.yaml",
            content: `openapi: 3.1.0
paths:
  /api/v1/orders/{id}/summary:
    get:
      operationId: getOrderSummary
      security: [{ bearerAuth: [] }]
      responses:
        "200":
          content:
            application/json:
              schema: { $ref: "#/components/schemas/OrderSummaryDto" }`,
          },
        ],
      },
    ],
  },
  {
    slideId: 14,
    topics: [
      {
        id: "modular-monolith-db",
        title: "도메인별 DB 스키마 격리 (S04/S11)",
        category: "code",
        summary:
          "PostgreSQL schema-per-module + S11 Multi-tenancy. company_id 컬럼·Row Level Security로 테넌트 격리, 모듈 간 FK 금지.",
        preview: {
          type: "terminal",
          title: "Flyway 마이그레이션 CLI",
          caption: "order_mgmt·procurement 스키마를 독립 버전 관리",
        },
        code: [
          {
            language: "sql",
            filename: "schema-isolation.sql",
            content: `-- 수주 도메인
CREATE SCHEMA order_mgmt;
CREATE TABLE order_mgmt.orders (
  id UUID PRIMARY KEY,
  customer_id UUID NOT NULL,
  status VARCHAR(32) NOT NULL
);

-- 발주 도메인 (order_mgmt 직접 참조 금지)
CREATE SCHEMA procurement;
CREATE TABLE procurement.purchase_orders (
  id UUID PRIMARY KEY,
  source_order_ref UUID NOT NULL  -- API로 검증된 참조만 저장
);`,
          },
        ],
        process: [
          { step: 1, title: "스키마 분리", description: "도메인별 독립 스키마 생성" },
          { step: 2, title: "참조 규칙", description: "FK 대신 API 검증 후 ID만 저장" },
          { step: 3, title: "마이그레이션", description: "Flyway/Liquibase로 스키마 버전 관리" },
        ],
      },
      {
        id: "modular-monolith-api",
        title: "강제 API 통신 + ArchUnit 경계",
        category: "architecture",
        summary:
          "SiteFramework(S04) 패키지 경계와 ArchUnit 테스트로 cross-module 위반을 CI에서 차단합니다.",
        preview: {
          type: "api-flow",
          title: "모듈 경계 검증 흐름",
          caption: "빌드 시 ArchUnit → 위반 시 Quality Gate 실패",
        },
        flowNodes: [
          { id: "pkg", label: "Package Boundary", sub: "order · procurement", icon: "fa-solid fa-cubes" },
          { id: "arch", label: "ArchUnit Test", sub: "CI Stage", icon: "fa-solid fa-gavel" },
          { id: "api", label: "OpenAPI Contract", sub: "S12", icon: "fa-solid fa-file-contract" },
        ],
        process: [
          { step: 1, title: "경계 정의", description: "수주·발주·정산 패키지 분리" },
          { step: 2, title: "ArchUnit 검사", description: "빌드 시 cross-module 위반 자동 탐지" },
          { step: 3, title: "API 계약", description: "OpenAPI 스펙으로 인터페이스 고정" },
        ],
        code: [
          {
            language: "java",
            filename: "OrderFacade.java",
            content: `@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService orderService;
  // 다른 도메인 DB/Repository 직접 주입 금지
  @GetMapping("/{id}")
  public OrderDto get(@PathVariable UUID id) {
    return orderService.findById(id);
  }
}`,
          },
        ],
      },
    ],
  },
  {
    slideId: 15,
    topics: [
      {
        id: "msa-migration",
        title: "Strangler Fig MSA 전환 (S12 Gateway)",
        category: "architecture",
        summary:
          "모듈러 모놀리스에서 API Gateway(S12)로 트래픽을 점진 분리. Debezium CDC(S17)로 데이터 이중 쓰기 없이 동기화.",
        techLayers: [
          {
            id: "infra",
            label: "Migration Path",
            icon: "fa-solid fa-route",
            accent: "#facc15",
            items: [
              { name: "API Gateway", detail: "기존 URL 유지·백엔드 라우팅 전환", sprintId: "S12" },
              { name: "Debezium CDC", detail: "분리 DB 실시간 동기화", sprintId: "S17" },
              { name: "Config Server", detail: "분리 서비스 설정 중앙화", sprintId: "S03" },
            ],
          },
        ],
        preview: {
          type: "api-flow",
          title: "Strangler Fig 라우팅",
          caption: "Gateway가 트래픽 비율에 따라 monolith ↔ microservice 전환",
        },
        flowNodes: [
          { id: "client", label: "Next.js Client", sub: "S16", icon: "fa-solid fa-window-maximize" },
          { id: "gw", label: "API Gateway", sub: "Traffic Split", icon: "fa-solid fa-shuffle" },
          { id: "mono", label: "Modular Monolith", sub: "Legacy Path", icon: "fa-solid fa-server" },
          { id: "ms", label: "Extracted Service", sub: "New Path", icon: "fa-solid fa-cube" },
        ],
        process: [
          { step: 1, title: "Strangler Fig", description: "트래픽이 적은 모듈부터 분리" },
          { step: 2, title: "API Gateway", description: "기존 API 경로 유지하며 라우팅 전환" },
          { step: 3, title: "데이터 분리", description: "스키마 → 독립 DB로 점진 이전" },
          { step: 4, title: "관측성", description: "분리 모듈별 로그·메트릭·트레이싱" },
        ],
      },
    ],
  },
  {
    slideId: 16,
    topics: [
      {
        id: "docker-cloud-ready",
        title: "Cloud-Ready Docker · GitLab CI (S02)",
        category: "code",
        summary:
          "S02 인프라 스프린트 기준: Temurin 21 JRE, Actuator 헬스체크, GitLab CI Quality Gate 연동.",
        techLayers: [
          {
            id: "infra",
            label: "DevOps",
            icon: "fa-solid fa-cloud",
            accent: "#facc15",
            items: [
              { name: "Docker", detail: "멀티스테이지 빌드· distroless 옵션", sprintId: "S02" },
              { name: "GitLab CI/CD", detail: "build → test → sonar → deploy", sprintId: "S02" },
              { name: "Spring Actuator", detail: "/actuator/health · readiness", sprintId: "S04" },
            ],
          },
        ],
        preview: {
          type: "terminal",
          title: "fass-cli 개발 환경",
          caption: "로컬 Docker Compose로 API(8080)·Web(3000) 동시 기동",
        },
        code: [
          {
            language: "dockerfile",
            filename: "Dockerfile",
            content: `FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY build/libs/fass-service.jar app.jar
ENV JAVA_OPTS="-XX:+UseContainerSupport"
EXPOSE 8080
HEALTHCHECK CMD wget -qO- http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]`,
          },
          {
            language: "yaml",
            filename: "docker-compose.yml",
            content: `services:
  fass-api:
    build: .
    ports: ["8080:8080"]
    environment:
      SPRING_PROFILES_ACTIVE: onprem
  fass-web:
    image: fass-web:latest
    ports: ["3000:3000"]`,
          },
        ],
        process: [
          { step: 1, title: "컨테이너화", description: "모든 서비스 Docker 이미지화" },
          { step: 2, title: "환경 분리", description: "profile/env로 onprem·cloud 설정 분기" },
          { step: 3, title: "IaC", description: "Terraform/K8s manifest로 클라우드 배포" },
        ],
      },
    ],
  },
  {
    slideId: 17,
    topics: [
      {
        id: "cdc-sync",
        title: "Debezium CDC 무중단 동기화 (S17)",
        category: "architecture",
        summary:
          "레거시 Oracle/PostgreSQL WAL → Debezium Connector → Kafka → 신규 FaSS 스키마. 초기 스냅샷 후 이벤트 스트리밍.",
        techLayers: [
          {
            id: "data",
            label: "CDC Pipeline",
            icon: "fa-solid fa-database",
            accent: "#22c55e",
            items: [
              { name: "Debezium", detail: "WAL 기반 Change Data Capture", sprintId: "S17" },
              { name: "Apache Kafka", detail: "파티션·순서 보장", sprintId: "S17" },
              { name: "Schema Registry", detail: "Avro/JSON 스키마 버전 관리", sprintId: "S17" },
            ],
          },
        ],
        preview: {
          type: "api-flow",
          title: "CDC 이벤트 파이프라인",
          caption: "legacy.orders UPDATE → Kafka topic → FaSS order_mgmt consumer",
        },
        flowNodes: [
          { id: "legacy", label: "Legacy DB", sub: "WAL / Redo Log", icon: "fa-solid fa-database" },
          { id: "debezium", label: "Debezium", sub: "S17 Connector", icon: "fa-solid fa-plug" },
          { id: "kafka", label: "Kafka", sub: "orders.cdc", icon: "fa-solid fa-stream" },
          { id: "consumer", label: "FaSS Consumer", sub: "order_mgmt", icon: "fa-solid fa-inbox" },
        ],
        process: [
          { step: 1, title: "초기 적재", description: "배치로 기존 데이터 스냅샷 이관" },
          { step: 2, title: "CDC 연결", description: "Debezium 등으로 변경 이벤트 캡처" },
          { step: 3, title: "이벤트 처리", description: "Kafka/큐로 순서 보장하며 반영" },
          { step: 4, title: "검증", description: "체크섬·카운트 비교로 정합성 확인" },
        ],
        code: [
          {
            language: "json",
            filename: "cdc-event.example.json",
            content: `{
  "op": "u",
  "source": { "table": "orders", "schema": "legacy" },
  "before": { "id": "ORD-1001", "status": "PENDING" },
  "after":  { "id": "ORD-1001", "status": "CONFIRMED" },
  "ts_ms": 1718000000000
}`,
          },
        ],
      },
    ],
  },
  {
    slideId: 18,
    topics: [
      {
        id: "innovation-validation",
        title: "혁신 과제 검증 프로세스",
        category: "process",
        summary: "PART 4 혁신 항목의 PoC → 프로토타입 개발 → 운영 반영 흐름입니다. JTGS는 2026.10 개발 착수(런칭 아님)입니다.",
        process: [
          { step: 1, title: "PoC", description: "2주 내 기술 타당성 검증 (예: AI 스파크 데이터 무결성)" },
          { step: 2, title: "프로토타입 개발", description: "2026.10 JTGS 착수 — 차세대 서버·완성형 스택으로 본격 개발" },
          { step: 3, title: "완성·안정화", description: "2027.03 프로토타입 완성, 6월까지 고도화 후 본격 이관 준비" },
        ],
      },
    ],
  },
  {
    slideId: 19,
    topics: [
      {
        id: "prototype-dev-kickoff",
        title: "JTGS 프로토타입 개발 착수 체크리스트",
        category: "process",
        summary: "2026.10 주유소(JTGS) 프로토타입 개발 착수 전·후 점검 항목입니다. 런칭·경영 시연이 아닌 개발 Start 기준입니다.",
        process: [
          { step: 1, title: "개발 환경", description: "차세대 서버·SiteFramework·AI 파이프라인 스택 배포 확인" },
          { step: 2, title: "범위 확정", description: "JTGS 정산·재고·외부 연동 등 프로토타입 개발 스코프·마일스톤 합의" },
          { step: 3, title: "품질 게이트", description: "일일 통합·Quality Gate — 2027.03 완성·6월 안정화 목표 연계" },
        ],
      },
    ],
  },
  {
    slideId: 20,
    topics: [
      {
        id: "ai-logistics",
        title: "AI 물류 최적화 예시",
        category: "code",
        summary: "배차·경로 최적화 API 호출 및 결과 처리 예시입니다.",
        code: [
          {
            language: "typescript",
            filename: "route-optimizer.ts",
            content: `type RouteRequest = {
  depotId: string;
  stops: { id: string; lat: number; lng: number; demand: number }[];
};

export async function optimizeRoute(req: RouteRequest) {
  const res = await fetch("/api/ai/routing/optimize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  return res.json() as Promise<{ routeId: string; sequence: string[]; etaMin: number }>;
}`,
          },
        ],
        process: [
          { step: 1, title: "데이터 수집", description: "주문·차량·도로 제약 조건 입력" },
          { step: 2, title: "최적화", description: "AI 엔진으로 경로·배차 계산" },
          { step: 3, title: "적용", description: "WMS/TMS에 결과 반영 및 모니터링" },
        ],
      },
    ],
  },
  {
    slideId: 21,
    topics: [
      {
        id: "realgrid-ui",
        title: "RealGrid 2.0 엔터프라이즈 UI (S09)",
        category: "architecture",
        summary:
          "S09 스프린트: 가상 스크롤·인라인 편집·컨텍스트 메뉴를 SiteFramework 공통 그리드 컴포넌트로 표준화.",
        techLayers: [
          {
            id: "frontend",
            label: "UI Standard",
            icon: "fa-solid fa-table",
            accent: "#00f0ff",
            items: [
              { name: "RealGrid 2.0", detail: "100만 행 가상 스크롤·그룹핑", sprintId: "S09" },
              { name: "Next.js RSC", detail: "Server Component + Client Grid 하이브리드", sprintId: "S16" },
              { name: "React Query", detail: "페이지네이션·캐시 무효화", sprintId: "S08" },
            ],
          },
        ],
        preview: {
          type: "realgrid",
          title: "수주 관리 그리드 화면",
          caption: "order-mgmt 모듈 — RealGrid 2.0 + SiteFramework 공통 컬럼·필터 템플릿",
        },
        process: [
          { step: 1, title: "공통 Grid Shell", description: "SiteFramework RealGridWrapper — 컬럼 정의·권한 마스킹" },
          { step: 2, title: "가상 스크롤", description: "대용량 수주 데이터 클라이언트 페이징 없이 렌더" },
          { step: 3, title: "인라인 편집", description: "RBAC(S07) 기반 셀 편집 권한 제어" },
        ],
        links: [{ label: "FaSS Sprint S09", href: FASS_BACKLOG_URL }],
      },
      {
        id: "bulk-data",
        title: "대용량 데이터 처리 패턴",
        category: "code",
        summary: "대량 데이터를 청크 단위로 처리하는 배치 예시입니다.",
        code: [
          {
            language: "java",
            filename: "BulkImportJob.java",
            content: `@Scheduled(cron = "0 2 * * *")
public void importDailyShipments() {
  int page = 0;
  Page<ShipmentRow> chunk;
  do {
    chunk = repository.findPending(PageRequest.of(page++, 500));
    chunk.forEach(processor::process);
  } while (chunk.hasNext());
}`,
          },
        ],
        process: [
          { step: 1, title: "청크 분할", description: "500~1000건 단위 페이징 처리" },
          { step: 2, title: "병렬화", description: "파티션별 워커 분산 (선택)" },
          { step: 3, title: "재시도", description: "실패 건 DLQ 적재 후 재처리" },
        ],
      },
    ],
  },
  {
    slideId: 22,
    topics: [
      {
        id: "sonarqube-gate",
        title: "SonarQube Quality Gate 설정",
        category: "code",
        summary: "CI 파이프라인에서 코드 품질 게이트를 강제하는 GitLab CI 예시입니다.",
        code: [
          {
            language: "yaml",
            filename: ".gitlab-ci.yml",
            content: `stages: [test, quality, deploy]

sonarqube:
  stage: quality
  script:
    - mvn verify sonar:sonar
      -Dsonar.qualitygate.wait=true
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

deploy_prod:
  stage: deploy
  needs: [sonarqube]
  when: manual`,
          },
        ],
        process: [
          { step: 1, title: "정적 분석", description: "MR마다 SonarQube 자동 스캔" },
          { step: 2, title: "게이트", description: "Critical Bug 0, Coverage 80% 미만 차단" },
          { step: 3, title: "배포", description: "게이트 통과 시에만 운영 배포 허용" },
        ],
      },
    ],
  },
  {
    slideId: 25,
    topics: [
      {
        id: "jtgs-prototype-start",
        title: "JTGS 통합 프로토타입 개발 착수",
        category: "process",
        summary:
          "2026.10 차세대 서버에서 프로토타입 개발을 시작합니다. 런칭이 아닌 완성형 기술스택 최초 적용의 Start이며, 2027.03 완성·2027.06 안정화까지 진행합니다.",
        process: [
          { step: 1, title: "2026.10 Start", description: "주유소(JTGS) 기반 프로토타입 개발 착수 — 차세대 서버·완성형 스택 적용" },
          { step: 2, title: "2027.03 완성", description: "FaSS V1.0 아키텍처·AI 파이프라인 1차 완성" },
          { step: 3, title: "~2027.06", description: "안정화·고도화, UI/UX 스토리보드 표본 확정" },
          { step: 4, title: "이후", description: "3PL·유통물류 대규모 이관 준비 단계로 연결" },
        ],
      },
    ],
  },
  {
    slideId: 26,
    topics: [
      {
        id: "finops",
        title: "FinOps 비용 절감 프로세스",
        category: "process",
        summary: "클라우드·온프레미스 리소스 비용을 관리하는 FinOps 절차입니다.",
        process: [
          { step: 1, title: "태깅", description: "프로젝트·환경·도메인별 비용 태그" },
          { step: 2, title: "모니터링", description: "주간 비용 대시보드 리뷰" },
          { step: 3, title: "최적화", description: "미사용 리소스·Rightsizing 조치" },
          { step: 4, title: "예산 알림", description: "임계치 초과 시 자동 알림" },
        ],
        code: [
          {
            language: "yaml",
            filename: "cost-alert.yaml",
            content: `budget:
  monthly_limit_krw: 5000000
  alerts:
    - threshold_percent: 80
      notify: [tft-lead@company.com]
    - threshold_percent: 100
      action: block_non_prod_deploy`,
          },
        ],
      },
    ],
  },
  {
    slideId: 27,
    topics: [
      {
        id: "peer-benchmark",
        title: "타사 프로젝트 규모 벤치마크",
        category: "process",
        summary:
          "삼성E&A 등 유사 범위 사례(70명·2년, 1,680 M/M)의 인력 규모를 참고 지표로만 활용합니다.",
        process: [
          { step: 1, title: "참고 범위", description: "70명이 2년간 진행한 유사 산출물 범위의 엔터프라이즈 플랫폼 구축 사례" },
          { step: 2, title: "비교 항목", description: "총 투입 인력(70명), 기간(2년), M/M(1,680) 감각" },
          { step: 3, title: "활용 방식", description: "일정·비용 리스크 산정용 벤치마크 (기술 내용과 분리)" },
        ],
      },
    ],
  },
  {
    slideId: 28,
    topics: [
      {
        id: "mm-tool-investment",
        title: "개발자 툴 투자 M/M 절감 모델",
        category: "process",
        summary:
          "IntelliJ·Claude Code·고성능 워크스테이션 투자로 리드타임 단축 및 일정 지연 비용을 방어하는 경영 모델입니다.",
        process: [
          { step: 1, title: "도구 투자", description: "IDE·AI Pair·개발 환경 — 연간 수천만 원 수준" },
          { step: 2, title: "생산성 효과", description: "로직 검증 리드타임 30% 단축, Idle Time 제거" },
          { step: 3, title: "ROI", description: "2~3개월 일정 단축 → 수억 원 규모 M/M 손실 방어" },
        ],
      },
      {
        id: "langgraph-workflow",
        title: "LangGraph Dev Agent (S18)",
        category: "code",
        summary:
          "StateGraph로 codegen → review → test 순환. 통과 시 GitLab MR 자동 생성, 실패 시 human-in-the-loop.",
        techLayers: "fass-full",
        preview: {
          type: "agent-flow",
          title: "Dev Agent StateGraph",
          caption: "review 실패 시 codegen으로 루프백, test 통과 시 MR 오픈",
        },
        flowNodes: [
          { id: "spec", label: "API Spec Input", sub: "OpenAPI", icon: "fa-solid fa-file-code" },
          { id: "codegen", label: "codegen", sub: "Claude Code", icon: "fa-solid fa-wand-magic-sparkles" },
          { id: "review", label: "review", sub: "ArchUnit + Lint", icon: "fa-solid fa-magnifying-glass" },
          { id: "test", label: "test", sub: "JUnit + Vitest", icon: "fa-solid fa-vial" },
          { id: "mr", label: "GitLab MR", sub: "CI Trigger", icon: "fa-solid fa-code-merge" },
        ],
        code: [
          {
            language: "python",
            filename: "dev_agent_graph.py",
            content: `from langgraph.graph import StateGraph

def codegen(state): return {**state, "code": generate(state["spec"])}
def review(state): return {**state, "review": lint_and_review(state["code"])}
def test(state): return {**state, "tests": run_tests(state["code"])}

graph = StateGraph(dict)
graph.add_node("codegen", codegen)
graph.add_node("review", review)
graph.add_node("test", test)
graph.set_entry_point("codegen")
graph.add_edge("codegen", "review")
graph.add_edge("review", "test")`,
          },
        ],
        process: [
          { step: 1, title: "스펙 입력", description: "요구사항·API 계약을 에이전트에 전달" },
          { step: 2, title: "자동 순환", description: "생성→리뷰→테스트 반복" },
          { step: 3, title: "MR 생성", description: "통과 시 GitLab MR 자동 오픈" },
        ],
      },
      {
        id: "gitlab-ai-cicd",
        title: "GitLab + AI Quality Gate (S02/S21)",
        category: "code",
        summary:
          "MR 이벤트 시 AI 리뷰 스크립트 실행 → SonarQube Quality Gate → Nexus IQ SCA(S21) 순차 검증.",
        preview: {
          type: "terminal",
          title: "CI 파이프라인 로그",
          caption: "merge_request_event 트리거 시 ai_review → quality_gate stages",
        },
        code: [
          {
            language: "yaml",
            filename: ".gitlab-ci.yml",
            content: `ai_review:
  stage: test
  script:
    - python scripts/ai_review.py --mr $CI_MERGE_REQUEST_IID
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

quality_gate:
  stage: quality
  needs: [ai_review]
  script:
    - sonar-scanner -Dsonar.qualitygate.wait=true`,
          },
        ],
      },
      {
        id: "ai-talent-ecosystem",
        title: "사내 AI 인재육성 생태계",
        category: "process",
        summary:
          "찾아가는 AI 워크숍·AI 아이디어 스파트·AI 경진대회가 웹프레임워크 실전 구현과 맞물려 빌더형 인재 파이프라인을 완성합니다.",
        preview: {
          type: "agent-flow",
          title: "빌더형 인재 완성 파이프라인",
          caption: "워크숍(인식) → 게시판(아이디어) → 경진대회(검증) → 웹프레임워크(구현) → 빌더형 인재",
        },
        flowNodes: [
          { id: "workshop", label: "AI 워크숍", sub: "인식·기초", icon: "fa-solid fa-chalkboard-user" },
          { id: "board", label: "아이디어 스파트", sub: "과제 수집", icon: "fa-solid fa-comments" },
          { id: "contest", label: "AI 경진대회", sub: "PoC 검증", icon: "fa-solid fa-trophy" },
          { id: "fw", label: "웹프레임워크", sub: "실전 구현", icon: "fa-solid fa-cubes" },
          { id: "builder", label: "빌더형 인재", sub: "Monitor+Build", icon: "fa-solid fa-user-gear" },
        ],
        process: [
          { step: 1, title: "찾아가는 AI 워크숍", description: "현업 방문 교육 — AI 리터러시·프롬프트·업무 적용 사례 확산" },
          { step: 2, title: "AI 아이디어 스파트", description: "전사 아이디어 수집·피드백 — TFT 백로그 과제화" },
          { step: 3, title: "AI 경진대회", description: "우수 아이디어 프로토타입 검증 — SiteFramework PoC 연계" },
          { step: 4, title: "완성", description: "검증 과제를 웹프레임워크에서 구현하며 빌더형 인재로 성장" },
        ],
      },
    ],
  },
  {
    slideId: 29,
    topics: [
      {
        id: "framework-builder-role",
        title: "차세대 웹프레임워크 × 빌더형 인재",
        category: "architecture",
        summary:
          "SiteFramework(FaSS Platform)는 빌더형 인재가 Monitor·Build 역량을 실전에서 연마하는 살아있는 표준 플랫폼입니다.",
        techLayers: [
          {
            id: "platform",
            label: "SiteFramework",
            icon: "fa-solid fa-cubes",
            accent: "#22c55e",
            items: [
              { name: "표준 아키텍처 학습장", detail: "API-First·모듈 경계·온보딩", sprintId: "S04" },
              { name: "Monitor 실습", detail: "CI/CD·Quality Gate·AI 에이전트 관제", sprintId: "S02" },
              { name: "Build 실습", detail: "모듈 PoC 설계→MR→배포 풀사이클", sprintId: "S09" },
              { name: "AI-Ready 문서", detail: "README·위키·OpenAPI 마크다운 기여", sprintId: "S18" },
            ],
          },
        ],
        preview: {
          type: "api-flow",
          title: "웹프레임워크 육성 흐름",
          caption: "학습 → Monitor 관제 → Build 구현 → 문서 기여가 빌더형 인재 역량으로 축적",
        },
        flowNodes: [
          { id: "learn", label: "표준 학습", sub: "SiteFramework", icon: "fa-solid fa-graduation-cap" },
          { id: "monitor", label: "Monitor", sub: "CI · AI 관제", icon: "fa-solid fa-satellite-dish" },
          { id: "build", label: "Build", sub: "모듈 PoC", icon: "fa-solid fa-hammer" },
          { id: "docs", label: "AI Docs", sub: "RAG Context", icon: "fa-solid fa-book" },
        ],
        process: [
          { step: 1, title: "학습장", description: "공통 아키텍처·코딩 표준을 실제 레포에서 체득" },
          { step: 2, title: "관제 실습", description: "파이프라인·에이전트 이상 징후 대응 훈련" },
          { step: 3, title: "구축 실습", description: "도메인 모듈을 직접 설계·구현·배포" },
        ],
      },
    ],
  },
  {
    slideId: 30,
    topics: [
      {
        id: "digital-worker",
        title: "AI 디지털 워커 운영 모델",
        category: "process",
        summary: "24/7 자동화 작업과 인간 검토의 역할 분담 프로세스입니다.",
        process: [
          { step: 1, title: "자동 구간", description: "반복 코드 생성·테스트·문서화" },
          { step: 2, title: "휴먼 구간", description: "아키텍처·보안·비즈니스 판단" },
          { step: 3, title: "에스컬레이션", description: "AI 실패 시 빌더형 인재에게 핸드오프" },
        ],
      },
    ],
  },
  {
    slideId: 31,
    topics: [
      {
        id: "builder-talent",
        title: "빌더형 인재 역량 체크리스트",
        category: "process",
        summary: "모니터링·빌딩 역할을 수행하는 빌더형 인재의 역량 기준입니다.",
        process: [
          { step: 1, title: "Monitor", description: "AI 출력·품질 지표·파이프라인 감시" },
          { step: 2, title: "Builder", description: "프레임워크·자동화·아키처 직접 구축" },
          { step: 3, title: "성장", description: "분기별 역량 리뷰 및 학습 계획" },
        ],
      },
    ],
  },
  {
    slideId: 32,
    topics: [
      {
        id: "roadmap-vision",
        title: "로드맵 및 미래 비전",
        category: "process",
        summary: "PART 5 로드맵의 단계별 목표와 의존 관계입니다.",
        process: [
          { step: 1, title: "2026.10 Start", description: "차세대 서버 프로토타입 개발 착수 — 완성형 기술스택 최초 적용의 시작점 (데모 아님)" },
          { step: 2, title: "2027.03 완성", description: "주유소(JTGS) 기반 프로토타입 완성, 6월까지 안정화·고도화" },
          { step: 3, title: "2027.06~ 이관 준비", description: "3PL·유통물류 대규모 이관 준비 — 개선·웹프레임워크·AI 본격 적용" },
        ],
      },
    ],
  },
  {
    slideId: 33,
    topics: [
      {
        id: "risk-management",
        title: "리스크 관리 프로세스",
        category: "process",
        summary: "기술·일정·비용 리스크 식별 및 대응 절차입니다.",
        process: [
          { step: 1, title: "식별", description: "주간 리스크 레지스터 업데이트" },
          { step: 2, title: "평가", description: "영향도×발생확률 매트릭스" },
          { step: 3, title: "대응", description: "회피·완화·수용·전가 전략 선택" },
        ],
      },
    ],
  },
  {
    slideId: 34,
    topics: [
      {
        id: "closing-milestones",
        title: "향후 마일스톤 상세",
        category: "process",
        summary: "맺음말 슬라이드의 후속 마일스톤 실행 계획입니다.",
        process: [
          { step: 1, title: "7월", description: "UI/UX 스토리보드 대표이사 확인" },
          { step: 2, title: "8~9월", description: "핵심 모듈 집중 개발" },
          { step: 3, title: "10월~", description: "차세대 서버 프로토타입 개발 착수 — 기술스택 최초 적용 Start" },
          { step: 4, title: "2027.06~", description: "3PL·유통물류 이관 준비 — 개선·프레임워크·AI 본격 적용" },
        ],
      },
    ],
  },
  {
    slideId: 35,
    topics: [
      {
        id: "commitment",
        title: "TFT 실행 약속 및 KPI",
        category: "process",
        summary: "맺음말의 핵심 실행 약속과 측정 지표입니다.",
        process: [
          { step: 1, title: "일정 준수", description: "마일스톤 대비 ±1주 이내" },
          { step: 2, title: "품질", description: "Quality Gate 100% 통과" },
          { step: 3, title: "수익", description: "ASP 전개 가능 아키텍처 완성" },
        ],
      },
    ],
  },
];

export function getSlideDetails(slideId: number): SlideDetailSet | undefined {
  return SLIDE_DETAILS.find((set) => set.slideId === slideId);
}

export function getDetailTopic(slideId: number, detailId: string): DetailTopic | undefined {
  return getSlideDetails(slideId)?.topics.find((topic) => topic.id === detailId);
}

export function getAllDetailParams(): { id: string; detailId: string }[] {
  return SLIDE_DETAILS.flatMap((set) =>
    set.topics.map((topic) => ({
      id: String(set.slideId),
      detailId: topic.id,
    })),
  );
}
