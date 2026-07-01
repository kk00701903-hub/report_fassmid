"use client";

import type { CSSProperties } from "react";
import SlideCanvas from "@/components/slides/SlideCanvas";
import { SpotlightRibbon } from "@/components/slides/Slide23TechSpotlights";
import "./styles/Slide23.css";

const INFRA_CHIPS = [
  { icon: "fab fa-docker", label: "Docker", muted: true },
  { icon: "fas fa-ship", label: "K8s" },
  { icon: "fab fa-gitlab", label: "GitLab CI", muted: true },
  { icon: "fas fa-rotate", label: "ArgoCD" },
  { icon: "fas fa-magnifying-glass-chart", label: "SonarQube" },
  { icon: "fas fa-cube", label: "Nexus" },
  { icon: "fas fa-leaf", label: "Spring Cloud Config" },
  { icon: "fas fa-bolt", label: "Redis" },
];

const FW_CHIPS = [
  { icon: "fas fa-n", label: "Next.js", muted: true },
  { icon: "fab fa-react", label: "React 19" },
  { icon: "fas fa-wind", label: "Tailwind CSS" },
  { icon: "fas fa-table", label: "RealGrid" },
  { icon: "fas fa-atom", label: "Atomic Design" },
  { icon: "fas fa-leaf", label: "Spring Batch" },
];

const SEC_CHIPS = [
  { icon: "fas fa-key", label: "Keycloak" },
  { icon: "fas fa-id-card", label: "JWT" },
  { icon: "fas fa-lock", label: "Spring Security" },
  { icon: "fas fa-shield-halved", label: "API Gateway", muted: true },
  { icon: "fas fa-plug", label: "REST / gRPC" },
  { icon: "fas fa-users-rectangle", label: "Multi-tenancy" },
];

const DATA_CHIPS = [
  { icon: "fas fa-database", label: "Debezium", spot: "data" as const },
  { icon: "fas fa-stream", label: "Kafka" },
  { icon: "fas fa-print", label: "ClipReport" },
  { icon: "fas fa-chart-bar", label: "Superset" },
  { icon: "fas fa-chart-line", label: "Grafana" },
  { icon: "fas fa-robot", label: "LangChain" },
];

function Chip({
  icon,
  label,
  muted,
  spot,
}: {
  icon: string;
  label: string;
  muted?: boolean;
  spot?: "data";
}) {
  const cls = ["chip", muted && "chip-muted", spot && `spot spot-${spot}`].filter(Boolean).join(" ");
  return (
    <span className={cls}>
      <i className={icon} aria-hidden="true" />
      {label}
    </span>
  );
}

export default function Slide23() {
  return (
    <SlideCanvas slideId={23} motion="cards" motionTier="medium">
      <div className="slide fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">Tech Stack</span>
            <h1>핵심 기술 스택</h1>
          </div>
          <p className="sub">차세대 FaSS 플랫폼 — 4개 영역 · 선정 기술 스택</p>
          <div className="std-pills">
            <span className="std-pill">
              <i className="fab fa-java" aria-hidden="true" /> Java 21
            </span>
            <span className="std-pill std-pill--hero">
              <i className="fab fa-react" aria-hidden="true" /> Next.js · React 19
            </span>
            <span className="std-pill">
              <i className="fas fa-database" aria-hidden="true" /> PostgreSQL
            </span>
            <span className="std-pill std-pill--hero">
              <i className="fab fa-docker" aria-hidden="true" /> Docker · K8s Ready
            </span>
          </div>
          <div className="line" />
        </div>

        <div className="body">
          <div className="flow-strip">
            <div className="flow-node n1 flow-node--hero">
              <i className="fas fa-server" aria-hidden="true" /> DevOps · 인프라
            </div>
            <span className="flow-arrow">
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </span>
            <div className="flow-node n2 flow-node--hero-next">
              <i className="fas fa-layer-group" aria-hidden="true" /> 프레임워크 · UI
            </div>
            <span className="flow-arrow">
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </span>
            <div className="flow-node n3 flow-node--hero-sec">
              <i className="fas fa-shield-halved" aria-hidden="true" /> 보안 · 연동
            </div>
            <span className="flow-arrow">
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </span>
            <div className="flow-node n4">
              <i className="fas fa-chart-line" aria-hidden="true" /> 데이터 · BI · AI
            </div>
          </div>

          <SpotlightRibbon />

          <div className="grid">
            <div className="cat-card" style={{ "--cat-color": "var(--c-infra)" } as CSSProperties}>
              <div className="cat-head">
                <div className="cat-icon">
                  <i className="fas fa-server" aria-hidden="true" />
                </div>
                <span className="cat-title">DevOps · 인프라</span>
                <span className="cat-count">8종</span>
              </div>
              <div className="cat-body">
                <div className="chips">
                  {INFRA_CHIPS.map((c) => (
                    <Chip key={c.label} {...c} />
                  ))}
                </div>
              </div>
            </div>

            <div className="cat-card core" style={{ "--cat-color": "var(--c-fw)" } as CSSProperties}>
              <div className="cat-head">
                <div className="cat-icon">
                  <i className="fas fa-layer-group" aria-hidden="true" />
                </div>
                <span className="cat-title">프레임워크 · UI</span>
                <span className="cat-core-tag">핵심 축</span>
              </div>
              <div className="core-visual core-visual--next">
                <div className="layer-box l1 layer-box--hero">Presentation<br />Next.js · React</div>
                <span className="layer-arrow">▶</span>
                <div className="layer-box l2">Component<br />RealGrid · Tailwind</div>
                <span className="layer-arrow">▶</span>
                <div className="layer-box l3">Batch<br />Spring Batch</div>
              </div>
              <div className="cat-body">
                <div className="chips">
                  {FW_CHIPS.map((c) => (
                    <Chip key={c.label} {...c} />
                  ))}
                </div>
              </div>
            </div>

            <div className="cat-card" style={{ "--cat-color": "var(--c-sec)" } as CSSProperties}>
              <div className="cat-head">
                <div className="cat-icon">
                  <i className="fas fa-shield-halved" aria-hidden="true" />
                </div>
                <span className="cat-title">보안 · 연동</span>
                <span className="cat-count">6종</span>
              </div>
              <div className="cat-body">
                <div className="chips">
                  {SEC_CHIPS.map((c) => (
                    <Chip key={c.label} {...c} />
                  ))}
                </div>
              </div>
            </div>

            <div className="cat-card" style={{ "--cat-color": "var(--c-data)" } as CSSProperties}>
              <div className="cat-head">
                <div className="cat-icon">
                  <i className="fas fa-chart-pie" aria-hidden="true" />
                </div>
                <span className="cat-title">데이터 · BI · AI</span>
                <span className="cat-count">6종</span>
              </div>
              <div className="cat-body">
                <div className="chips">
                  {DATA_CHIPS.map((c) => (
                    <Chip key={c.label} {...c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-note">
            <strong>핵심 축</strong> Next.js · React 19 프레임워크 중심 — DevOps 안정화 → UI 표준화 → 연동·보안 → BI·AI
            순 단계 구축
          </div>
          <div className="footer-stats">
            <div className="stat-box">
              <div className="stat-val">4</div>
              <div className="stat-lbl">영역</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">26</div>
              <div className="stat-lbl">기술</div>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
