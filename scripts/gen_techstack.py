import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
with open(ROOT / "temp_techstack.json", encoding="utf-8") as f:
    data = json.load(f)

LAYER_MAP = {
    "네이밍 룰": "security",
    "Docker": "infra",
    "Docker Compose": "infra",
    "Kubernetes (K8s)": "infra",
    "GitLab CI": "infra",
    "Nexus Repository": "infra",
    "SonarQube": "infra",
    "ArgoCD": "infra",
    "Spring Cloud Config": "infra",
    "Redis": "data",
    "Spring Boot": "backend",
    "Keycloak": "security",
    "LDAP": "security",
    "OIDC": "security",
    "JWT": "backend",
    "Spring Security 6.x": "backend",
    "RBAC/ABAC": "backend",
    "Axios / React Query": "frontend",
    "Atomic Design": "frontend",
    "RealGrid": "frontend",
    "Modal": "frontend",
    "DTO / MapStruct": "backend",
    "Spring Batch": "backend",
    "Multi-tenancy": "data",
    "API Gateway": "backend",
    "REST / gRPC": "backend",
    "API 마스킹 / DB 암호화": "security",
    "Next.js (SSR/RSC)": "frontend",
    "Debezium": "data",
    "Kafka": "data",
    "ClipReport": "infra",
    "API Management": "infra",
    "LLM / LangChain (예상)": "ai",
    "Spring Cloud": "backend",
    "Golden Set": "backend",
    "Nexus IQ": "security",
    "Apache Superset": "infra",
    "Grafana": "infra",
}

LAYER_META = {
    "frontend": ("Frontend", "fa-solid fa-window-maximize", "#00f0ff"),
    "backend": ("Backend", "fa-solid fa-server", "#3b82f6"),
    "security": ("Security & IAM", "fa-solid fa-shield-halved", "#a78bfa"),
    "data": ("Data & Messaging", "fa-solid fa-database", "#22c55e"),
    "infra": ("Platform & DevOps", "fa-solid fa-cloud", "#facc15"),
    "ai": ("AI & Agent", "fa-solid fa-robot", "#fb923c"),
}

current_sprint = None
items_by_layer = {k: [] for k in LAYER_META}

for row in data["rows"]:
    if row["스프린트"]:
        current_sprint = row["스프린트"]
    tech = row["기술 스택"]
    role = row.get("역할 설명") or row.get("역할", "")
    layer = LAYER_MAP[tech]
    item: dict = {"name": tech, "detail": role, "sprintId": current_sprint}
    if row["메인담당"]:
        item["assignee"] = row["메인담당"]
    items_by_layer[layer].append(item)


def fmt_item(item: dict) -> str:
    parts = [f'      {{ name: "{item["name"]}", detail: "{item["detail"]}"']
    if item.get("sprintId"):
        parts.append(f', sprintId: "{item["sprintId"]}"')
    if item.get("assignee"):
        parts.append(f', assignee: "{item["assignee"]}"')
    parts.append(" },")
    return "".join(parts)


layer_blocks: list[str] = []
for lid in ["frontend", "backend", "security", "data", "infra", "ai"]:
    label, icon, accent = LAYER_META[lid]
    block = [
        "  {",
        f'    id: "{lid}",',
        f'    label: "{label}",',
        f'    icon: "{icon}",',
        f'    accent: "{accent}",',
        "    items: [",
        *[fmt_item(item) for item in items_by_layer[lid]],
        "    ],",
        "  },",
    ]
    layer_blocks.append("\n".join(block))

content = f"""/** FaSS Platform v3.0 — sprint-backlog 기준 기술 스택 레이어 (260622 담당자 반영) */

export type TechStackItem = {{
  name: string;
  detail: string;
  sprintId?: string;
  assignee?: string;
}};

export type TechStackLayer = {{
  id: string;
  label: string;
  icon: string;
  accent: string;
  items: TechStackItem[];
}};

export const FASS_BACKLOG_URL = "https://kk00701903-hub.github.io/sprint-backlog/";
export const FASS_DAILY_SCRUM_URL = "https://kk00701903-hub.github.io/fass-dailyscrum/#/analytics";

export const FASS_TECH_LAYERS: TechStackLayer[] = [
{chr(10).join(layer_blocks)}
];

export const FASS_SPRINT_PHASES = [
  {{ phase: "1단계", label: "인프라·표준 규격", sprints: ["S01", "S02", "S03", "S04"] }},
  {{ phase: "2단계", label: "보안·공통 모듈", sprints: ["S05", "S06", "S07", "S08"] }},
  {{ phase: "3단계", label: "생산성·UI 표준", sprints: ["S09", "S10", "S11"] }},
  {{ phase: "4단계", label: "외부 연동·데이터", sprints: ["S12", "S14"] }},
  {{ phase: "5단계", label: "데이터 보안·최적화", sprints: ["S15", "S16", "S17", "S23"] }},
  {{ phase: "추가", label: "차세대 로드맵", sprints: ["S13", "S18", "S19", "S20", "S21", "S22"] }},
];
"""

(ROOT / "lib" / "fassTechStack.ts").write_text(content, encoding="utf-8")
print("Written lib/fassTechStack.ts")
