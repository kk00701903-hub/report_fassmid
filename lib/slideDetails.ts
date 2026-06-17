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

export type DetailTopic = {
  id: string;
  title: string;
  category: "code" | "process" | "architecture";
  summary: string;
  process?: ProcessStep[];
  code?: CodeSample[];
  links?: DetailLink[];
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
    slideId: 4,
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
    slideId: 5,
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
    slideId: 6,
    topics: [
      {
        id: "market-context",
        title: "시장 환경 분석 프레임",
        category: "process",
        summary: "물류 IT 시장 변화를 프로젝트 의사결정에 반영하는 방법입니다.",
        process: [
          { step: 1, title: "트렌드 수집", description: "AI·클라우드·SaaS 물류 솔루션 벤치마킹" },
          { step: 2, title: "갭 분석", description: "기존 FaSS 대비 차별화 포인트 도출" },
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
          { step: 3, title: "10월", description: "JTGS 프로토타입 통합 시연" },
        ],
      },
    ],
  },
  {
    slideId: 10,
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
    slideId: 11,
    topics: [
      {
        id: "tech-stack-overview",
        title: "기술 스택 구성도",
        category: "architecture",
        summary: "PART 3에서 다루는 프론트·백엔드·인프라·AI 스택 개요입니다.",
        process: [
          { step: 1, title: "Frontend", description: "Next.js 기반 웹 UI" },
          { step: 2, title: "Backend", description: "Java 21 + API-First 서비스" },
          { step: 3, title: "Infra", description: "Docker, GitLab CI/CD, 온프레미스→클라우드" },
          { step: 4, title: "AI", description: "LangGraph, Claude Code, RAG" },
        ],
      },
    ],
  },
  {
    slideId: 12,
    topics: [
      {
        id: "api-first",
        title: "API-First 모듈 통신 예시",
        category: "code",
        summary: "모듈 간 직접 참조 없이 API로만 통신하는 구조 예시입니다.",
        code: [
          {
            language: "typescript",
            filename: "order-client.ts",
            content: `// 발주 모듈 → 수주 모듈 API 호출 (직접 DB 접근 금지)
export async function fetchOrderSummary(orderId: string) {
  const res = await fetch(\`/api/orders/\${orderId}/summary\`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Order API failed");
  return res.json();
}`,
          },
        ],
      },
    ],
  },
  {
    slideId: 13,
    topics: [
      {
        id: "modular-monolith-db",
        title: "도메인별 DB 스키마 격리",
        category: "code",
        summary: "모듈러 모놀리스에서 도메인별 스키마를 분리하는 SQL 예시입니다.",
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
        title: "강제 API 통신 구조",
        category: "architecture",
        summary: "모듈 간 직접 import/DB 접근을 차단하는 아키텍처 규칙입니다.",
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
    slideId: 14,
    topics: [
      {
        id: "msa-migration",
        title: "MSA 전환 로드맵",
        category: "process",
        summary: "모듈러 모놀리스에서 MSA로 단계 전환하는 프로세스입니다.",
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
    slideId: 15,
    topics: [
      {
        id: "docker-cloud-ready",
        title: "Cloud-Ready Docker 구성",
        category: "code",
        summary: "온프레미스·클라우드 동일하게 배포 가능한 컨테이너 설정 예시입니다.",
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
    slideId: 16,
    topics: [
      {
        id: "cdc-sync",
        title: "무중단 데이터 동기화 (CDC)",
        category: "process",
        summary: "레거시와 신규 시스템 간 무중단 데이터 동기화 프로세스입니다.",
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
    slideId: 17,
    topics: [
      {
        id: "innovation-validation",
        title: "혁신 과제 검증 프로세스",
        category: "process",
        summary: "PART 4 혁신 항목의 PoC → 파일럿 → 운영 반영 흐름입니다.",
        process: [
          { step: 1, title: "PoC", description: "2주 내 기술 타당성 검증" },
          { step: 2, title: "파일럿", description: "제한된 업무 범위 실환경 테스트" },
          { step: 3, title: "운영 반영", description: "Quality Gate + 경영 승인 후 배포" },
        ],
      },
    ],
  },
  {
    slideId: 18,
    topics: [
      {
        id: "prototype-demo",
        title: "프로토타입 시연 체크리스트",
        category: "process",
        summary: "경영진 시연 전 기술·업무 검증 체크리스트입니다.",
        process: [
          { step: 1, title: "시나리오", description: "수주→발주→정산 E2E 시나리오 확정" },
          { step: 2, title: "데이터", description: "데모용 익명 샘플 데이터 준비" },
          { step: 3, title: "장애 대비", description: "오프라인 백업 시연 경로 준비" },
        ],
      },
    ],
  },
  {
    slideId: 19,
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
    slideId: 20,
    topics: [
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
    slideId: 21,
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
    slideId: 22,
    topics: [
      {
        id: "prototype-sprint",
        title: "프로토타입 스프린트 프로세스",
        category: "process",
        summary: "2주 단위 프로토타입 검증 스프린트 운영 방식입니다.",
        process: [
          { step: 1, title: "Sprint Planning", description: "검증할 가설·데모 범위 정의" },
          { step: 2, title: "개발", description: "AI 보조 코딩 + 일일 통합" },
          { step: 3, title: "Review", description: "이해관계자 데모 및 피드백" },
          { step: 4, title: "Retro", description: "다음 스프린트 개선 항목 도출" },
        ],
      },
    ],
  },
  {
    slideId: 23,
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
    slideId: 24,
    topics: [
      {
        id: "cost-reduction",
        title: "버그 수정 비용 절감 모델",
        category: "process",
        summary: "조기 품질 검증으로 후반 버그 수정 비용을 줄이는 프로세스입니다.",
        process: [
          { step: 1, title: "Shift-Left", description: "개발 단계에서 정적 분석·단위 테스트" },
          { step: 2, title: "MR 게이트", description: "병합 전 품질·보안 자동 검사" },
          { step: 3, title: "효과 측정", description: "운영 결함 건수·MTTR 월간 추적" },
        ],
      },
    ],
  },
  {
    slideId: 25,
    topics: [
      {
        id: "langgraph-workflow",
        title: "LangGraph AI 워크플로우",
        category: "code",
        summary: "코드 생성·리뷰·테스트를 순환하는 LangGraph 에이전트 예시입니다.",
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
        title: "GitLab + AI CI/CD 연동",
        category: "code",
        summary: "AI 에이전트와 GitLab CI/CD를 연동하는 파이프라인 예시입니다.",
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
    ],
  },
  {
    slideId: 26,
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
    slideId: 27,
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
    slideId: 28,
    topics: [
      {
        id: "roadmap-vision",
        title: "로드맵 및 미래 비전",
        category: "process",
        summary: "PART 5 로드맵의 단계별 목표와 의존 관계입니다.",
        process: [
          { step: 1, title: "2026 H2", description: "핵심 모듈 완성·프로토타입 시연" },
          { step: 2, title: "2027", description: "ASP 파일럿·선택적 MSA 분리" },
          { step: 3, title: "2028+", description: "SaaS 확장·AI 물류 고도화" },
        ],
      },
    ],
  },
  {
    slideId: 29,
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
    slideId: 30,
    topics: [
      {
        id: "closing-milestones",
        title: "향후 마일스톤 상세",
        category: "process",
        summary: "맺음말 슬라이드의 후속 마일스톤 실행 계획입니다.",
        process: [
          { step: 1, title: "7월", description: "UI/UX 스토리보드 대표이사 확인" },
          { step: 2, title: "8~9월", description: "핵심 모듈 집중 개발" },
          { step: 3, title: "10월", description: "JTGS 프로토타입 통합 가동" },
        ],
      },
    ],
  },
  {
    slideId: 31,
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
