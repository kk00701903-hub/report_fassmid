"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide26.css";

const SLIDE_HTML = `<div class="slide fluent-slide">
  <div class="title-region-wrapper">
    <div class="title-region-header">
      <div class="title-region-bar"></div>
      <h1 class="title-region-text">아키텍처 원칙 3: CI/CD 자동화 (DevOps · GitOps)</h1>
    </div>
    <div class="title-region-line"></div>
  </div>

  <div class="body">
    <div class="pipeline">
      <!-- Phase 1: Source -->
      <div class="phase" style="--ph:var(--ppt-accent-2)">
        <div class="phase-head">
          <div class="phase-num">1</div>
          <div>
            <div class="phase-title">Source & Trigger</div>
            <div class="phase-desc">소스 변경 감지 · MR 기반 협업</div>
          </div>
        </div>
        <div class="phase-body">
          <div class="node" style="--nc:var(--ppt-accent-2)">
            <div class="node-icon"><i class="fas fa-code-branch"></i></div>
            <div class="node-text">
              <div class="node-name">Developer</div>
              <div class="node-sub">Git Push · Merge Request</div>
            </div>
          </div>
          <div class="node-flow"><i class="fas fa-arrow-down"></i> push / webhook</div>
          <div class="node" style="--nc:var(--c-gitlab)">
            <div class="node-icon"><i class="fab fa-gitlab"></i></div>
            <div class="node-text">
              <div class="node-name">GitLab</div>
              <div class="node-sub">소스 저장소 · 파이프라인 트리거</div>
            </div>
          </div>
        </div>
      </div>

      <div class="connector">
        <div class="connector-line"></div>
        <i class="fas fa-chevron-right"></i>
        <span>CI<br>시작</span>
        <div class="connector-line"></div>
      </div>

      <!-- Phase 2: CI -->
      <div class="phase phase-dense" style="--ph:var(--c-gitlab)">
        <div class="phase-head">
          <div class="phase-num">2</div>
          <div>
            <div class="phase-title">Build & Quality</div>
          </div>
        </div>
        <div class="phase-body">
          <div class="node" style="--nc:var(--c-gitlab)">
            <div class="node-icon"><i class="fas fa-gears"></i></div>
            <div class="node-text">
              <div class="node-name">GitLab CI</div>
            </div>
          </div>
          <div class="node" style="--nc:var(--c-sonar)">
            <div class="node-icon"><i class="fas fa-magnifying-glass-chart"></i></div>
            <div class="node-text">
              <div class="node-name">SonarQube</div>
              <div class="node-sub">Gate</div>
            </div>
          </div>
          <div class="node aux" style="--nc:var(--c-jenkins)">
            <div class="node-icon"><i class="fab fa-jenkins"></i></div>
            <div class="node-text">
              <div class="node-name">Jenkins</div>
              <div class="node-sub">보조</div>
            </div>
          </div>
          <div class="node-flow"><i class="fas fa-arrow-down"></i> push</div>
          <div class="node" style="--nc:var(--c-docker)">
            <div class="node-icon"><i class="fab fa-docker"></i></div>
            <div class="node-text">
              <div class="node-name">Docker</div>
            </div>
          </div>
          <div class="node" style="--nc:var(--c-nexus)">
            <div class="node-icon"><i class="fas fa-warehouse"></i></div>
            <div class="node-text">
              <div class="node-name">Nexus</div>
            </div>
          </div>
        </div>
      </div>

      <div class="connector">
        <div class="connector-line"></div>
        <i class="fas fa-chevron-right"></i>
        <span>CD<br>배포</span>
        <div class="connector-line"></div>
      </div>

      <!-- Phase 3: CD -->
      <div class="phase" style="--ph:var(--c-argo)">
        <div class="phase-head">
          <div class="phase-num">3</div>
          <div>
            <div class="phase-title">Deploy · GitOps</div>
            <div class="phase-desc">선언적 배포 · 환경 동기화</div>
          </div>
        </div>
        <div class="phase-body">
          <div class="node" style="--nc:var(--c-argo)">
            <div class="node-icon"><i class="fas fa-ship"></i></div>
            <div class="node-text">
              <div class="node-name">Argo CD</div>
              <div class="node-sub">GitOps Sync · 자동 배포</div>
            </div>
          </div>
          <div class="node-flow"><i class="fas fa-arrow-down"></i> rolling deploy</div>
          <div class="node" style="--nc:var(--ppt-good)">
            <div class="node-icon"><i class="fas fa-server"></i></div>
            <div class="node-text">
              <div class="node-name">FaSS Runtime</div>
              <div class="node-sub">On-Prem · Docker 환경 운영</div>
            </div>
          </div>
          <div class="node" style="--nc:var(--ppt-accent)">
            <div class="node-icon"><i class="fas fa-rotate"></i></div>
            <div class="node-text">
              <div class="node-name">무중단 롤아웃</div>
              <div class="node-sub">Blue-Green · Canary 전략</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="gitops-strip">
      <div class="gitops-icon"><i class="fas fa-arrows-rotate"></i></div>
      <div class="gitops-text">
        <strong>GitOps 배포 흐름</strong>
        <p>GitLab 파이프라인이 검증된 이미지를 Nexus에 등록하면, Argo CD가 선언적 매니페스트를 감시하여 FaSS 운영 환경에 자동 동기화합니다.</p>
      </div>
      <div class="gitops-flow">
        <span class="gf-item">Nexus Image</span>
        <i class="fas fa-arrow-right gf-arrow"></i>
        <span class="gf-item">Argo CD</span>
        <i class="fas fa-arrow-right gf-arrow"></i>
        <span class="gf-item">FaSS Runtime</span>
      </div>
    </div>
  </div>

  <div class="footer">
    <strong>핵심 원칙</strong> GitLab CI 단일 파이프라인 + Jenkins 보조 연동 — Quality Gate 통과 후에만 배포, 전 구간 Webhook·감사 로그 추적
  </div>
</div>`;

export default function Slide25() {
  return (
    <SlideCanvas slideId={26} motion="pipeline" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
