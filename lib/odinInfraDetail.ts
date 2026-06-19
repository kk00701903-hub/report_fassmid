import type { DetailTopic } from "@/lib/slideDetails";

const ODIN_PWA_URL = "https://kk00701903-hub.github.io/private-odin/";
const ODIN_REPO_URL = "https://github.com/kk00701903-hub/private-odin";

export const ODIN_INFRA_TOPIC: DetailTopic = {
  id: "odin-infra-ops",
  title: "Odin 앱 인프라 · 운영 한 장 요약",
  category: "architecture",
  summary:
    "Odin PWA(프론트)와 프레이야 AI(내부 페르소나)의 프로덕션 인프라·배포·모니터링·AI 연동을 한 장으로 정리합니다. Hermes = Odin 백엔드 Linux App Server, Engine X = Nginx 역프록시·정적 서빙.",
  meta: [
    { label: "앱", value: "Odin PWA + 프레이야 AI" },
    { label: "프로덕션 PWA", value: "kk00701903-hub.github.io/private-odin", href: ODIN_PWA_URL },
    { label: "저장소", value: "github.com/kk00701903-hub/private-odin", href: ODIN_REPO_URL },
    { label: "타임존", value: "Asia/Seoul" },
    { label: "LAN", value: "10.179.93.0/24 (홈랩)" },
  ],
  techLayers: [
    {
      id: "edge",
      label: "Edge",
      icon: "fa-solid fa-cloud",
      accent: "#f59e0b",
      items: [
        { name: "Cloudflare", detail: "DNS · Tunnel · SSL — HTTPS 종단, mixed-content 회피" },
        { name: "GitHub Pages", detail: "Odin PWA 정적 배포 (npm run build 산출물)" },
      ],
    },
    {
      id: "hermes",
      label: "Hermes · App Server",
      icon: "fa-solid fa-server",
      accent: "#00f0ff",
      items: [
        { name: "Nginx (odin-pwa)", detail: "dist/ 정적 서빙" },
        { name: "freya-api · odin-api.mjs", detail: ":8790 — 백엔드·DB·Claude 브릿지" },
        { name: "PostgreSQL 16", detail: "Docker freya-postgres (JSON fallback)" },
        { name: "Claude Code CLI", detail: "호스트 실행 · CLAUDE_BRIDGE_ENABLED" },
      ],
    },
    {
      id: "hub",
      label: "Hub · LXC 101",
      icon: "fa-solid fa-network-wired",
      accent: "#8b5cf6",
      items: [
        { name: "Nginx 역프록시", detail: "freya-api · n8n · Prometheus 게이트웨이" },
        { name: "n8n", detail: "워크플로 자동화 · PWA webhook 대안 경로" },
        { name: "Prometheus :9090", detail: "VM 메트릭 · /prometheus 프록시 upstream" },
      ],
    },
    {
      id: "ai",
      label: "AI Core · VM 102",
      icon: "fa-solid fa-brain",
      accent: "#22c55e",
      items: [
        { name: "LangGraph", detail: "6인 팀장 오케스트레이션 허브" },
        { name: "Gemma Flow", detail: "디자인·팀장 에이전트 실행" },
      ],
    },
    {
      id: "storage",
      label: "Storage · VM 100",
      icon: "fa-solid fa-hard-drive",
      accent: "#94a3b8",
      items: [
        { name: "home-nas", detail: "NAS / Immich · WOL 원격 기동 대상" },
        { name: "VM 103 linux-mint", detail: "보조 — Claude CLI · 개발 데스크톱" },
      ],
    },
  ],
  preview: {
    type: "agent-flow",
    title: "전체 접속·API 흐름",
    caption:
      "PWA → Cloudflare → GitHub Pages(정적) / LXC101 Nginx → freya-api(Hermes) → PostgreSQL·Claude. n8n·LangGraph·Prometheus는 점선 연동.",
  },
  flowNodes: [
    { id: "user", label: "주인님 PWA", sub: "모바일", icon: "fa-solid fa-mobile-screen" },
    { id: "cf", label: "Cloudflare", sub: "HTTPS", icon: "fa-solid fa-cloud" },
    { id: "hub", label: "Nginx Hub", sub: "LXC 101", icon: "fa-solid fa-network-wired" },
    { id: "api", label: "freya-api", sub: ":8790 Hermes", icon: "fa-solid fa-server" },
    { id: "pg", label: "PostgreSQL", sub: "Docker", icon: "fa-solid fa-database" },
    { id: "claude", label: "Claude CLI", sub: "/ai/chat", icon: "fa-solid fa-robot" },
  ],
  sections: [
    {
      title: "계층별 역할 요약",
      icon: "fa-solid fa-table-columns",
      table: {
        headers: ["계층", "구성요소", "역할"],
        rows: [
          ["Edge", "Cloudflare", "HTTPS 종단, DNS, Tunnel, mixed-content 회피"],
          ["프론트", "GitHub Pages", "Odin PWA 빌드 산출물 호스팅"],
          ["Hermes", "Linux VM + Nginx + freya-api", "백엔드·DB·Claude 브릿지·로컬 dist"],
          ["Hub", "LXC 101", "n8n 워크플로, Prometheus, API/AI 게이트웨이"],
          ["AI Core", "VM 102 LangGraph", "6인 팀장 오케스트레이션"],
          ["스토리지", "VM 100 home-nas", "NAS / Immich · WOL 대상"],
        ],
      },
    },
    {
      title: "Proxmox VM / LXC 현황",
      icon: "fa-solid fa-server",
      table: {
        headers: ["ID", "이름", "타입", "역할", "Odin 연관"],
        rows: [
          ["100", "home-nas", "qemu", "NAS / Immich", "WOL 원격 기동 대상"],
          ["101", "nginx-n8n-hub", "lxc", "Prometheus · n8n · Nginx", "API HTTPS 진입 · /prometheus upstream"],
          ["102", "gemma-flow", "qemu", "Gemma Flow / LangGraph", "디자인·팀장 에이전트 실행"],
          ["103", "linux-mint", "qemu", "Linux Mint Desktop", "보조 Claude CLI · 개발"],
        ],
      },
      note: "모니터링: Odin MON 탭 → VM101 Prometheus · pve-exporter (vmMonitoring.ts)",
    },
    {
      title: "Hermes (Linux App Server)",
      icon: "fa-solid fa-terminal",
      table: {
        headers: ["항목", "값"],
        rows: [
          ["코드 경로", "/srv/app-workspace/private-odin"],
          ["systemd", "freya-api · odin-pwa"],
          ["API", "server/odin-api.mjs → :8790"],
          ["DB", "PostgreSQL 16 (Docker freya-postgres) 또는 JSON fallback"],
          ["프론트 산출물", "npm run build → dist/ (odin-pwa Nginx 서빙)"],
          ["Claude", "호스트 claude CLI (CLAUDE_BRIDGE_ENABLED=true)"],
          ["데이터", "ODIN_DATA_DIR · 채팅/tasks/settings · reports/server-check/"],
        ],
      },
    },
    {
      title: "주요 API (odin-api.mjs)",
      icon: "fa-solid fa-plug",
      table: {
        headers: ["Path", "용도"],
        rows: [
          ["/health", "헬스·Claude 브릿지 상태"],
          ["/chat/* · /tasks · /settings", "PWA 동기화"],
          ["/agents · /agents/duties", "팀장 6인 · 금일 업무"],
          ["/agents/design/*", "디자인 팀장 (LangGraph 연동)"],
          ["/reports/server-check", "매일 09:00 서버 점검 레포트"],
          ["/ai/chat", "Claude Code AI (채팅 기본 경로)"],
          ["/prometheus/*", "Prometheus CORS 프록시"],
          ["/wake", "Wake-on-LAN"],
        ],
      },
    },
    {
      title: "스택별 운영 역할",
      icon: "fa-solid fa-gears",
      bullets: [
        "Cloudflare: GitHub Pages·내부 API HTTPS 연결. freya-api.* / n8n / Prometheus 서브도메인 → LXC101 또는 Hermes. GitHub Actions Secret: VITE_ODIN_API_URL",
        "Nginx (Engine X): LXC101 허브 역프록시(n8n, Prometheus, freya-api) · Hermes odin-pwa(dist/) · freya-api.conf → 127.0.0.1:8790",
        "n8n: LXC101 워크플로. PWA 채팅 대안 VITE_N8N_WEBHOOK_URL → POST /webhook/odin. 미설정 시 {VITE_ODIN_API_URL}/ai/chat",
        "LangGraph (VM102): 6인 팀장 오케스트레이션. 프롬프트 docs/agents/ · deploy/linux/agents/",
      ],
    },
    {
      title: "LangGraph 팀장 6인",
      icon: "fa-solid fa-users-gear",
      table: {
        headers: ["팀장", "id", "실행 백엔드"],
        rows: [
          ["인프라팀장", "infra", "LangGraph → Claude Code"],
          ["IT설계팀장", "planning", "LangGraph → Claude Code"],
          ["개발팀장", "development", "LangGraph → Claude Code"],
          ["운영팀장", "ops", "LangGraph → Claude Code · 09:00 점검·배포"],
          ["비서실장", "secretary", "LangGraph → Qwen 2.5 3B"],
          ["디자인팀장", "design", "LangGraph → Obsidian · 보고서"],
        ],
      },
    },
    {
      title: "환경 변수 Quick Reference",
      icon: "fa-solid fa-sliders",
      table: {
        headers: ["구분", "변수", "설명"],
        rows: [
          ["PWA 빌드", "VITE_ODIN_API_URL", "통합 API HTTPS URL"],
          ["PWA 빌드", "VITE_N8N_WEBHOOK_URL", "n8n 채팅 (선택)"],
          ["Hermes", "DATABASE_URL", "PostgreSQL"],
          ["Hermes", "CLAUDE_BRIDGE_ENABLED", "/ai/chat 활성"],
          ["Hermes", "ALLOWED_ORIGINS", "GitHub Pages CORS"],
          ["Hermes", "PROMETHEUS_URL", "http://10.179.93.101:9090 등"],
          ["Hermes", "SERVER_CHECK_REPORTS_DIR", "09:00 점검 레포트 저장"],
        ],
      },
      note: "템플릿: .env.example · deploy/linux/.env.example",
    },
  ],
  process: [
    {
      step: 1,
      title: "A. 프론트 배포 (GitHub Pages — 자동)",
      description:
        "Cursor(Windows) → git push main → GitHub Actions → kk00701903-hub.github.io/private-odin. Secrets: VITE_ODIN_API_URL, VITE_N8N_WEBHOOK_URL, VITE_PROMETHEUS_URL",
    },
    {
      step: 2,
      title: "B. Hermes 백엔드 배포 (수동)",
      description:
        "cd /srv/app-workspace/private-odin && git pull → server npm install → systemctl restart freya-api → npm run build (dist/ 반영)",
    },
    {
      step: 3,
      title: "C. 배포 확인",
      description:
        "systemctl status freya-api odin-pwa · curl http://127.0.0.1:8790/health · curl /agents",
    },
    {
      step: 4,
      title: "D. AI · 자동화 흐름",
      description:
        "PWA 채팅 → Cloudflare → freya-api/ai/chat → Claude. n8n webhook(101) 대안. 팀장 업무 → LangGraph(102). 운영팀장 09:00 → server-check 레포트",
    },
    {
      step: 5,
      title: "E. 모니터링 · 알림",
      description:
        "MON 탭: Prometheus VM CPU·메모리. ALERT: VM start/stop. QUEUE: 팀장 금일 업무·디자인 팀장·점검 레포트",
    },
  ],
  code: [
    {
      language: "bash",
      filename: "hermes-deploy.sh",
      content: `cd /srv/app-workspace/private-odin && git pull origin main
cd server && npm install --omit=dev && systemctl restart freya-api
cd /srv/app-workspace/private-odin && npm install && npm run build`,
    },
    {
      language: "bash",
      filename: "health-check.sh",
      content: `systemctl status freya-api odin-pwa --no-pager
curl -s http://127.0.0.1:8790/health
curl -s http://127.0.0.1:8790/agents | python3 -m json.tool`,
    },
  ],
  links: [
    { label: "Odin PWA (Production)", href: ODIN_PWA_URL },
    { label: "private-odin 저장소", href: ODIN_REPO_URL },
    { label: "README.md", href: `${ODIN_REPO_URL}/blob/main/README.md` },
    { label: "LINUX_CLAUDE_DEPLOYMENT.md", href: `${ODIN_REPO_URL}/blob/main/docs/LINUX_CLAUDE_DEPLOYMENT.md` },
    { label: "DESIGN_AGENT_API.md", href: `${ODIN_REPO_URL}/blob/main/docs/DESIGN_AGENT_API.md` },
    { label: "NAS_DEPLOYMENT.md", href: `${ODIN_REPO_URL}/blob/main/docs/NAS_DEPLOYMENT.md` },
  ],
};
