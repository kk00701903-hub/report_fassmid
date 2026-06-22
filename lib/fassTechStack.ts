/** FaSS Platform v3.0 — sprint-backlog 기준 기술 스택 레이어 (260622 담당자 반영) */

export type TechStackItem = {
  name: string;
  detail: string;
  sprintId?: string;
  assignee?: string;
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
      { name: "Axios / React Query", detail: "프론트엔드 상태관리 및 클라이언트-서버 간 데이터 통신 최적화", sprintId: "S08", assignee: "송민준" },
      { name: "Atomic Design", detail: "UI/UX 컴포넌트의 체계적인 자산화 및 재사용성 극대화를 위한 원자-분자-유기체 설계 방법론", sprintId: "S09", assignee: "심지훈" },
      { name: "RealGrid", detail: "대용량 비즈니스 데이터 처리에 특화된 웹 엔터프라이즈 그리드", sprintId: "S09", assignee: "심지훈" },
      { name: "Modal", detail: "화면 이동 없는 팝업형 다이얼로그 UI 제공 컴포넌트", sprintId: "S09", assignee: "심지훈" },
      { name: "Next.js (SSR/RSC)", detail: "서버 사이드 렌더링을 통한 초기 로딩 속도 최적화 및 SEO 개선", sprintId: "S16", assignee: "심지훈" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "fa-solid fa-server",
    accent: "#3b82f6",
    items: [
      { name: "Spring Boot", detail: "전사 비즈니스 로직 개발의 뼈대가 되는 기본 구조체 및 백엔드 코어", sprintId: "S04", assignee: "심지훈" },
      { name: "JWT", detail: "무상태(Stateless) 기반의 빠르고 안전한 사용자 인증 토큰 처리", sprintId: "S06", assignee: "기충영" },
      { name: "Spring Security 6.x", detail: "엔터프라이즈 애플리케이션의 인증/인가를 통제하는 강력한 보안 필터", sprintId: "S06", assignee: "기충영" },
      { name: "RBAC/ABAC", detail: "역할 및 속성(조건) 기반의 세밀한 사용자 메뉴/데이터 접근 통제", sprintId: "S07", assignee: "기충영" },
      { name: "DTO / MapStruct", detail: "계층 간 데이터 교환 객체 정의 및 변환(매핑) 코드 자동 생성", sprintId: "S10", assignee: "기충영" },
      { name: "Spring Batch", detail: "정해진 시간에 대용량 데이터를 안전하게 일괄 처리하는 스케줄링", sprintId: "S10", assignee: "기충영" },
      { name: "API Gateway", detail: "외부 API 요청을 단일 진입점에서 받아 라우팅, 인증, 트래픽 제어 수행", sprintId: "S12", assignee: "기충영" },
      { name: "REST / gRPC", detail: "물류/유통 AI 모델과 백엔드 시스템 간의 빠르고 표준화된 통신 규격", sprintId: "S14", assignee: "송민준" },
      { name: "Spring Cloud", detail: "거대한 모놀리식 시스템을 독립적인 마이크로서비스로 분리하여 유연성 확보", sprintId: "S19", assignee: "기충영" },
      { name: "Golden Set", detail: "보안 및 성능 검증이 완료되어 전사 표준으로 사용할 라이브러리/의존성 모음 배포", sprintId: "S20", assignee: "심지훈" },
    ],
  },
  {
    id: "security",
    label: "Security & IAM",
    icon: "fa-solid fa-shield-halved",
    accent: "#a78bfa",
    items: [
      { name: "네이밍 룰", detail: "전체 개발 파트 간 코드 일관성 유지 및 유지보수성 향상", sprintId: "S01", assignee: "기충영" },
      { name: "Keycloak", detail: "통합 계정 및 접근 관리(IAM)를 위한 오픈소스 솔루션", sprintId: "S05", assignee: "기충영" },
      { name: "LDAP", detail: "사내 디렉토리 서비스(조직/사용자 정보) 연계 인증", sprintId: "S05", assignee: "기충영" },
      { name: "OIDC", detail: "OAuth 2.0 기반의 안전한 분산 환경 사용자 인증 프로토콜", sprintId: "S05", assignee: "기충영" },
      { name: "API 마스킹 / DB 암호화", detail: "화면 및 DB 상의 개인정보 등 민감 데이터 노출 원천 차단", sprintId: "S15", assignee: "기충영" },
      { name: "Nexus IQ", detail: "프로젝트에 포함된 오픈소스의 보안 취약점 및 라이선스 위반 리스크 자동 점검", sprintId: "S21", assignee: "기충영" },
    ],
  },
  {
    id: "data",
    label: "Data & Messaging",
    icon: "fa-solid fa-database",
    accent: "#22c55e",
    items: [
      { name: "Redis", detail: "인메모리 기반 고속 데이터 캐싱 및 분산 세션 상태 공유", sprintId: "S03", assignee: "기충영" },
      { name: "Multi-tenancy", detail: "단일 시스템으로 여러 고객사(테넌트)의 데이터를 DB/스키마 레벨에서 안전하게 격리", sprintId: "S11", assignee: "기충영" },
      { name: "Debezium", detail: "데이터베이스의 트랜잭션 로그(CDC)를 실시간으로 감지 및 캡처", sprintId: "S17", assignee: "송민준" },
      { name: "Kafka", detail: "캡처된 대규모 데이터 이벤트를 병목 없이 타 시스템으로 분산 전송", sprintId: "S17", assignee: "송민준" },
    ],
  },
  {
    id: "infra",
    label: "Platform & DevOps",
    icon: "fa-solid fa-cloud",
    accent: "#facc15",
    items: [
      { name: "Docker", detail: "애플리케이션의 실행 환경을 컨테이너화하여 환경 일관성 확보", sprintId: "S02", assignee: "송민준" },
      { name: "Docker Compose", detail: "단일 호스트에서 멀티 컨테이너 애플리케이션 환경을 정의하고 로컬 실행 제어", sprintId: "S02", assignee: "송민준" },
      { name: "Kubernetes (K8s)", detail: "컨테이너화된 애플리케이션의 자동 배포, 확장(Scaling) 및 고가용성 운영 관리(오케스트레이션)", sprintId: "S02", assignee: "송민준" },
      { name: "GitLab CI", detail: "소스 코드 버전 관리 및 지속적 통합(CI) 파이프라인 자동화 구축", sprintId: "S02", assignee: "송민준" },
      { name: "Nexus Repository", detail: "사내 표준 라이브러리, 패키지 및 빌드 아티팩트 중앙 저장소 관리", sprintId: "S02", assignee: "송민준" },
      { name: "SonarQube", detail: "소스 코드 품질 정적 분석 및 보안 취약점 사전 탐지", sprintId: "S02", assignee: "송민준" },
      { name: "ArgoCD", detail: "GitOps 기반의 지속적 배포(CD) 자동화 및 인프라 상태 동기화", sprintId: "S02", assignee: "송민준" },
      { name: "Spring Cloud Config", detail: "분산 환경의 설정 정보를 중앙 집중식으로 관리", sprintId: "S03", assignee: "기충영" },
      { name: "ClipReport", detail: "엔터프라이즈급 리포팅 솔루션을 활용한 전문 업무 서식(명세서, 대장 등) 설계 및 리포트 출력", sprintId: "S23", assignee: "김희찬" },
      { name: "API Management", detail: "전사 API의 생성, 게시, 모니터링, 과금 등 전체 생명주기 통합 관리", sprintId: "S13", assignee: "김희찬" },
      { name: "Apache Superset", detail: "다양한 소스의 비즈니스 데이터를 직접 탐색하고 시각화하는 플랫폼", sprintId: "S22", assignee: "심지훈" },
      { name: "Grafana", detail: "시스템 인프라 및 애플리케이션의 시계열 매트릭(성능/상태) 모니터링 시각화", sprintId: "S22", assignee: "심지훈" },
    ],
  },
  {
    id: "ai",
    label: "AI & Agent",
    icon: "fa-solid fa-robot",
    accent: "#fb923c",
    items: [
      { name: "LLM / LangChain (예상)", detail: "도입될 AI 에이전트의 프롬프트 프로파일링, 업무 권한, 역할 범위 통제", sprintId: "S18", assignee: "기충영" },
    ],
  },
];

export const FASS_SPRINT_PHASES = [
  { phase: "1단계", label: "인프라·표준 규격", sprints: ["S01", "S02", "S03", "S04"] },
  { phase: "2단계", label: "보안·공통 모듈", sprints: ["S05", "S06", "S07", "S08"] },
  { phase: "3단계", label: "생산성·UI 표준", sprints: ["S09", "S10", "S11"] },
  { phase: "4단계", label: "외부 연동·데이터", sprints: ["S12", "S14"] },
  { phase: "5단계", label: "데이터 보안·최적화", sprints: ["S15", "S16", "S17", "S23"] },
  { phase: "추가", label: "차세대 로드맵", sprints: ["S13", "S18", "S19", "S20", "S21", "S22"] },
];
