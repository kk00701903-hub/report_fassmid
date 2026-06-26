"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide08.css";

const SLIDE_HTML = `<div class="slide-root">
  <div class="title-region">
    <div class="title-header">
      <div class="title-bar"></div>
      <span class="title-badge">FUTURE VISION</span>
      <h1 class="title-main">디지털 트렌드 — MSA · Cloud · Open Source · AI</h1>
    </div>
    <div class="title-sub">MSA · Cloud · Open Source · AI — 글로벌 선도 기업이 동시에 채택하는 산업 표준입니다.</div>
    <div class="title-line"></div>
  </div>

  <div class="trend-grid">
    <div class="trend-card cyan">
      <div class="card-head">
        <div class="card-icon cyan"><i class="fas fa-cubes"></i></div>
        <div>
          <div class="card-title">MSA · 모듈러 아키텍처</div>
          <div class="card-en">Microservices &amp; Modular Monolith</div>
        </div>
      </div>
      <div class="card-divider"></div>
      <div class="card-points">
        <div class="point">
          <div class="point-dot cyan"></div>
          <p><strong>차세대 정부 비딩 RFP</strong> — 도메인 분리·독립 배포가 핵심 평가 항목</p>
        </div>
        <div class="point">
          <div class="point-dot cyan"></div>
          <p><strong>Modular Monolith → MSA</strong> 점진 전환, 토스·카카오뱅크 등 핀테크 표준</p>
        </div>
      </div>
      <div class="card-tags">
        <span class="ctag">DDD</span><span class="ctag">Bounded Context</span><span class="ctag">API-First</span><span class="ctag">Modular Monolith</span>
      </div>
    </div>

    <div class="trend-card green">
      <div class="card-head">
        <div class="card-icon green"><i class="fas fa-cloud"></i></div>
        <div>
          <div class="card-title">Cloud Native · Kubernetes</div>
          <div class="card-en">Cloud-Ready &amp; Hybrid Ops</div>
        </div>
      </div>
      <div class="card-divider"></div>
      <div class="card-points">
        <div class="point">
          <div class="point-dot green"></div>
          <p><strong>Kubernetes</strong> — 컨테이너 오케스트레이션 de facto 표준</p>
        </div>
        <div class="point">
          <div class="point-dot green"></div>
          <p><strong>GitOps · FinOps</strong>로 배포·비용 코드화, 금융·공공 K8s 전환 가속</p>
        </div>
      </div>
      <div class="card-tags">
        <span class="ctag">K8s</span><span class="ctag">GitOps</span><span class="ctag">FinOps</span><span class="ctag">Cloud-Ready</span>
      </div>
    </div>

    <div class="trend-card purple">
      <div class="card-head">
        <div class="card-icon purple"><i class="fab fa-github"></i></div>
        <div>
          <div class="card-title">Open Source · CNCF 표준</div>
          <div class="card-en">Vendor-Neutral Infrastructure</div>
        </div>
      </div>
      <div class="card-divider"></div>
      <div class="card-points">
        <div class="point">
          <div class="point-dot purple"></div>
          <p><strong>PostgreSQL · Kafka · Prometheus</strong> — 엔터프라이즈 인프라 표준</p>
        </div>
        <div class="point">
          <div class="point-dot purple"></div>
          <p><strong>벤더 Lock-in 탈피</strong>, 국내 금융권 Oracle → PostgreSQL 전환 확산</p>
        </div>
      </div>
      <div class="card-tags">
        <span class="ctag">CNCF</span><span class="ctag">Kafka</span><span class="ctag">PostgreSQL</span><span class="ctag">Debezium</span>
      </div>
    </div>

    <div class="trend-card gold">
      <div class="card-head">
        <div class="card-icon gold"><i class="fas fa-robot"></i></div>
        <div>
          <div class="card-title">AI Native · Agentic Development</div>
          <div class="card-en">LLM · RAG · Digital Worker</div>
        </div>
      </div>
      <div class="card-divider"></div>
      <div class="card-points">
        <div class="point">
          <div class="point-dot gold"></div>
          <p><strong>AI Agent</strong> — 코드·테스트·MR까지 CI/CD 파이프라인 통합</p>
        </div>
        <div class="point">
          <div class="point-dot gold"></div>
          <p><strong>LangGraph · RAG · Digital Worker</strong> — 24/7 자동화 + Human-in-the-loop</p>
        </div>
      </div>
      <div class="card-tags">
        <span class="ctag">LLM</span><span class="ctag">LangGraph</span><span class="ctag">Copilot</span><span class="ctag">AI Agent</span>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <i class="fas fa-bullseye"></i>
    <p>
      <strong>시사점:</strong> 네 축은 글로벌 선도 기업이 검증한 <em>동시 투자 패러다임</em> — 물류·유통에서도 적용이 가속화되고 있습니다.
    </p>
  </div>
</div>`;

export default function Slide08() {
  return (
    <SlideCanvas motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
