"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide31.css";

const SLIDE_HTML = `<div class="slide fluent-slide proto-slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">BUSINESS INNOVATION</span>
      <h1 class="title-main">비즈니스 혁신4: 프로토타입 엔진을 통한 아키텍처 내재화</h1>
    </div>
    <p class="sub"><strong>JTGS 통합 프로토타입</strong> — 제한된 환경에서 차세대 스택을 검증하고, 당사 기술 업그레이드와 시행착오를 최소화하는 내재화 과정</p>
    <div class="line"></div>
  </div>

  <div class="proto-body">
    <div class="proto-side-col">
      <div class="col-head"><i class="fas fa-bullseye"></i> 전략적 선정 배경</div>
      <div class="proto-card">
        <div class="proto-item">
          <div class="proto-item-ico"><i class="fas fa-shield-halved"></i></div>
          <div>
            <div class="proto-item-t">비즈니스 리스크 격리</div>
            <p class="proto-item-d">주유소(JTGS) 제한 환경 — 장애 시에도 전사 핵심 물류·유통망에 파급 최소</p>
          </div>
        </div>
        <div class="proto-item">
          <div class="proto-item-ico"><i class="fas fa-gears"></i></div>
          <div>
            <div class="proto-item-t">차세대 스택 검증 대상</div>
            <p class="proto-item-d">정산·재고·외부 연동 등 FaSS V3.0 핵심 기능을 실전 프로토타입으로 검증</p>
          </div>
        </div>
      </div>
    </div>

    <div class="proto-main">
      <div class="proto-sandbox">
        <div class="proto-sandbox-tag"><i class="fas fa-shield-halved"></i> JTGS 격리 샌드박스 — 비즈니스 리스크 최소화</div>
        <div class="proto-arch-row">
          <div class="proto-arch-box"><i class="fab fa-react"></i><span class="proto-arch-t">Next.js UI</span><span class="proto-arch-s">RSC · RealGrid</span></div>
          <span class="proto-arch-arrow"><i class="fas fa-chevron-right"></i></span>
          <div class="proto-arch-box proto-arch-box--hi"><i class="fas fa-layer-group"></i><span class="proto-arch-t">SiteFramework</span><span class="proto-arch-s">공통 모듈</span></div>
          <span class="proto-arch-arrow"><i class="fas fa-chevron-right"></i></span>
          <div class="proto-arch-box"><i class="fas fa-server"></i><span class="proto-arch-t">API · 정산</span><span class="proto-arch-s">재고 · 연동</span></div>
        </div>
        <div class="proto-arch-row proto-arch-row--infra">
          <div class="proto-arch-box"><i class="fas fa-shuffle"></i><span class="proto-arch-t">API Gateway</span></div>
          <span class="proto-arch-arrow"><i class="fas fa-arrows-left-right"></i></span>
          <div class="proto-arch-box"><i class="fas fa-database"></i><span class="proto-arch-t">PostgreSQL</span></div>
        </div>
      </div>

      <div class="proto-pipeline">
        <span class="proto-pipe-node">프로토타입 PoC</span>
        <i class="fas fa-chevron-right proto-pipe-arrow"></i>
        <span class="proto-pipe-node proto-pipe-node--accent">기술 검증·학습</span>
        <i class="fas fa-chevron-right proto-pipe-arrow"></i>
        <span class="proto-pipe-node proto-pipe-node--gold">아키텍처 내재화</span>
        <i class="fas fa-chevron-right proto-pipe-arrow"></i>
        <span class="proto-pipe-node proto-pipe-node--good">본 사업 확산</span>
      </div>

      <div class="proto-expand-row">
        <div class="proto-expand-box">
          <i class="fas fa-flask"></i>
          <span class="proto-expand-t">제한 환경 실험</span>
          <span class="proto-expand-s">JTGS 프로토타입</span>
        </div>
        <div class="proto-expand-mid"><i class="fas fa-angles-down"></i><span>검증·표준화</span></div>
        <div class="proto-expand-box proto-expand-box--to">
          <i class="fas fa-building"></i>
          <span class="proto-expand-t">전사 표준 적용</span>
          <span class="proto-expand-s">물류·유통 확산</span>
        </div>
      </div>
    </div>

    <div class="proto-side-col">
      <div class="col-head"><i class="fas fa-vial"></i> 핵심 목표 및 의의</div>
      <div class="proto-card">
        <div class="proto-item">
          <div class="proto-item-ico"><i class="fas fa-gauge-high"></i></div>
          <div>
            <div class="proto-item-t">프로토타입 개발 로드맵</div>
            <p class="proto-item-d">2026.10 착수 → 2027.03 완성 → 2027.06 안정화</p>
          </div>
        </div>
        <div class="proto-item">
          <div class="proto-item-ico"><i class="fas fa-display"></i></div>
          <div>
            <div class="proto-item-t">설계 표준 · 스토리보드 확정</div>
            <p class="proto-item-d">UI·기능 스토리보드 표본 → 전사 공통 설계 기준</p>
          </div>
        </div>
        <div class="proto-item">
          <div class="proto-item-ico"><i class="fas fa-flask"></i></div>
          <div>
            <div class="proto-item-t">Learn before Scale</div>
            <p class="proto-item-d">본격 확산 전 아키텍처·운영 노하우 내재화로 리스크 선제 제거</p>
          </div>
        </div>
      </div>
      <div class="proto-value-row">
        <div class="proto-value-chip"><i class="fas fa-arrow-trend-up"></i>기술 업그레이드</div>
        <div class="proto-value-chip"><i class="fas fa-shield-halved"></i>시행착오 최소화</div>
        <div class="proto-value-chip"><i class="fas fa-sitemap"></i>아키텍처 내재화</div>
      </div>
    </div>

    <div class="proto-bottom">
      <div class="proto-bottom-date"><i class="fas fa-calendar-check"></i> 2026. 10.</div>
      <p class="proto-bottom-text">
        차세대 서버에서 <strong>FaSS V1.0 통합 프로토타입 개발 착수</strong> — 프로토타입 단계에서 검증·학습 후 본 사업으로 확산,
        <strong>기술 업그레이드 속도는 높이고 시행착오 비용은 줄입니다.</strong>
      </p>
    </div>
  </div>
</div>`;

export default function Slide30() {
  return (
    <SlideCanvas slideId={31} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
