"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide33.css";

const SLIDE_HTML = `<div class="slide fluent-slide" style="overflow: hidden;">
<!-- Title Region -->
<div class="title-r">
<div class="title-row">
<div class="bar"></div>
<h1 class="title-main">비즈니스 혁신6: 클라우드 전환을 위한 교두보</h1>
</div>
<p class="sub">제때의 독자적인 ASP 사업 환경 구축과 클라우드 네이티브 전환을 위한 전략적 교두보가 될 것입니다.</p>
<div class="line"></div>
</div>
<!-- Main Content -->
<div class="finops-main-content-layout">
<!-- Column 1: Foundation -->
<div class="finops-column-item-wrapper">
<div class="finops-content-card-box">
<div class="finops-card-header-group">
<div class="finops-card-icon-circle">
<i class="fas fa-cloud-arrow-up"></i>
</div>
<h2 class="finops-card-title-text">Cloud-Ready 기반 마련</h2>
<div class="finops-card-divider-line"></div>
</div>
<p class="finops-card-body-text">
            개발 단계부터 Docker·K8s·GitOps 등 클라우드 네이티브 표준을 내재화하여, 향후 풀 클라우드 전환 시 재설계 없이 이전할 수 있는 구조를 선제 구축합니다.
          </p>
<ul class="finops-list-container-group">
<li class="finops-list-item-row">컨테이너·모듈형 아키텍처 표준화</li>
<li class="finops-list-item-row">온프레미스·클라우드 이식 가능 설계</li>
<li class="finops-list-item-row">API-First · Cloud-Native 원칙 선적용</li>
</ul>
<div class="finops-highlight-badge-tag">클라우드 전환 기반 완성</div>
</div>
</div>
<!-- Column 2: Path -->
<div class="finops-column-item-wrapper">
<div class="finops-content-card-box">
<div class="finops-card-header-group">
<div class="finops-card-icon-circle">
<i class="fas fa-route"></i>
</div>
<h2 class="finops-card-title-text">단계적 전환 경로</h2>
<div class="finops-card-divider-line"></div>
</div>
<div class="finops-policy-visual-item">
<span class="finops-policy-time-label">1단계</span>
<span class="finops-policy-desc-text">온프레미스·하이브리드 환경에서 차세대 플랫폼 안착 및 운영 역량 축적</span>
</div>
<div class="finops-policy-visual-item">
<span class="finops-policy-time-label">2단계</span>
<span class="finops-policy-desc-text">CI/CD·컨테이너 표준으로 워크로드 단위 점진적 클라우드 이전</span>
</div>
<ul class="finops-list-container-group">
<li class="finops-list-item-row">Big-Bang 전환 리스크 회피</li>
<li class="finops-list-item-row">검증된 아키텍처를 그대로 클라우드로 확장</li>
</ul>
<div class="finops-highlight-badge-tag">점진적 마이그레이션</div>
</div>
</div>
<!-- Column 3: Impact -->
<div class="finops-column-item-wrapper">
<div class="finops-content-card-box">
<div class="finops-card-header-group">
<div class="finops-card-icon-circle">
<i class="fas fa-forward"></i>
</div>
<h2 class="finops-card-title-text">전략적 기대 효과</h2>
<div class="finops-card-divider-line"></div>
</div>
<p class="finops-card-body-text">
            차세대 FaSS 플랫폼은 단기 비용 절감 수단이 아니라, 중장기 클라우드 전환과 ASP/SaaS 확장을 가능하게 하는 전략적 교두보입니다.
          </p>
<ul class="finops-list-container-group">
<li class="finops-list-item-row">향후 클라우드 전환 시간·비용 대폭 단축</li>
<li class="finops-list-item-row">고객사·3PL에 클라우드 네이티브 솔루션 공급 기반</li>
<li class="finops-list-item-row">플랫폼 표준 선점으로 전환 주도권 확보</li>
</ul>
<div class="finops-highlight-badge-tag">클라우드 전환 교두보</div>
</div>
</div>
</div>
</div>`;

export default function Slide32() {
  return (
    <SlideCanvas slideId={33} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
