"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide22.css";

const SLIDE_HTML = `<div class="slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">Tech Stack</span>
      <h1>핵심 기술 스택</h1>
    </div>
    <p class="sub">차세대 FaSS 플랫폼 — 4개 영역 · 선정 기술 스택</p>
    <div class="std-pills">
      <span class="std-pill"><i class="fab fa-java"></i> Java 21</span>
      <span class="std-pill"><i class="fab fa-react"></i> Next.js · React 19</span>
      <span class="std-pill"><i class="fas fa-database"></i> PostgreSQL</span>
      <span class="std-pill"><i class="fab fa-docker"></i> Docker · K8s Ready</span>
    </div>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="flow-strip">
      <div class="flow-node n1"><i class="fas fa-server"></i> DevOps · 인프라</div>
      <span class="flow-arrow"><i class="fas fa-chevron-right"></i></span>
      <div class="flow-node n2"><i class="fas fa-layer-group"></i> 프레임워크 · UI</div>
      <span class="flow-arrow"><i class="fas fa-chevron-right"></i></span>
      <div class="flow-node n3"><i class="fas fa-shield-halved"></i> 보안 · 연동</div>
      <span class="flow-arrow"><i class="fas fa-chevron-right"></i></span>
      <div class="flow-node n4"><i class="fas fa-chart-line"></i> 데이터 · BI · AI</div>
    </div>

    <div class="grid">
      <div class="cat-card" style="--cat-color:var(--c-infra)">
        <div class="cat-head">
          <div class="cat-icon"><i class="fas fa-server"></i></div>
          <span class="cat-title">DevOps · 인프라</span>
          <span class="cat-count">8종</span>
        </div>
        <div class="cat-body">
          <div class="chips">
            <span class="chip spot spot-infra"><i class="fab fa-docker"></i>Docker</span>
            <span class="chip"><i class="fas fa-ship"></i>K8s</span>
            <span class="chip spot spot-infra" style="animation-delay:.8s"><i class="fab fa-gitlab"></i>GitLab CI</span>
            <span class="chip"><i class="fas fa-rotate"></i>ArgoCD</span>
            <span class="chip"><i class="fas fa-magnifying-glass-chart"></i>SonarQube</span>
            <span class="chip"><i class="fas fa-cube"></i>Nexus</span>
            <span class="chip"><i class="fas fa-leaf"></i>Spring Cloud Config</span>
            <span class="chip"><i class="fas fa-bolt"></i>Redis</span>
          </div>
        </div>
      </div>

      <div class="cat-card core" style="--cat-color:var(--c-fw)">
        <div class="cat-head">
          <div class="cat-icon"><i class="fas fa-layer-group"></i></div>
          <span class="cat-title">프레임워크 · UI</span>
          <span class="cat-core-tag">핵심 축</span>
        </div>
        <div class="core-visual">
          <div class="layer-box l1">Presentation<br>Next.js · React</div>
          <span class="layer-arrow">▶</span>
          <div class="layer-box l2">Component<br>RealGrid · Tailwind</div>
          <span class="layer-arrow">▶</span>
          <div class="layer-box l3">Batch<br>Spring Batch</div>
        </div>
        <div class="cat-body">
          <div class="chips">
            <span class="chip"><i class="fas fa-n"></i>Next.js</span>
            <span class="chip"><i class="fab fa-react"></i>React 19</span>
            <span class="chip"><i class="fas fa-wind"></i>Tailwind CSS</span>
            <span class="chip"><i class="fas fa-table"></i>RealGrid</span>
            <span class="chip"><i class="fas fa-atom"></i>Atomic Design</span>
            <span class="chip"><i class="fas fa-leaf"></i>Spring Batch</span>
          </div>
        </div>
      </div>

      <div class="cat-card" style="--cat-color:var(--c-sec)">
        <div class="cat-head">
          <div class="cat-icon"><i class="fas fa-shield-halved"></i></div>
          <span class="cat-title">보안 · 연동</span>
          <span class="cat-count">6종</span>
        </div>
        <div class="cat-body">
          <div class="chips">
            <span class="chip"><i class="fas fa-key"></i>Keycloak</span>
            <span class="chip"><i class="fas fa-id-card"></i>JWT</span>
            <span class="chip"><i class="fas fa-lock"></i>Spring Security</span>
            <span class="chip spot spot-sec" style="animation-delay:.4s"><i class="fas fa-shield-halved"></i>API Gateway</span>
            <span class="chip"><i class="fas fa-plug"></i>REST / gRPC</span>
            <span class="chip"><i class="fas fa-users-rectangle"></i>Multi-tenancy</span>
          </div>
        </div>
      </div>

      <div class="cat-card" style="--cat-color:var(--c-data)">
        <div class="cat-head">
          <div class="cat-icon"><i class="fas fa-chart-pie"></i></div>
          <span class="cat-title">데이터 · BI · AI</span>
          <span class="cat-count">6종</span>
        </div>
        <div class="cat-body">
          <div class="chips">
            <span class="chip spot spot-data" style="animation-delay:1.2s"><i class="fas fa-database"></i>Debezium</span>
            <span class="chip"><i class="fas fa-stream"></i>Kafka</span>
            <span class="chip"><i class="fas fa-print"></i>ClipReport</span>
            <span class="chip"><i class="fas fa-chart-bar"></i>Superset</span>
            <span class="chip"><i class="fas fa-chart-line"></i>Grafana</span>
            <span class="chip"><i class="fas fa-robot"></i>LangChain</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-note"><strong>핵심 축</strong> Next.js · React 19 프레임워크 중심 — DevOps 안정화 → UI 표준화 → 연동·보안 → BI·AI 순 단계 구축</div>
    <div class="footer-stats">
      <div class="stat-box"><div class="stat-val">4</div><div class="stat-lbl">영역</div></div>
      <div class="stat-box"><div class="stat-val">26</div><div class="stat-lbl">기술</div></div>
    </div>
  </div>
</div>`;

export default function Slide22() {
  return (
    <SlideCanvas slideId={22} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
