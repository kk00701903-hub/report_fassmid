"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide31.css";

const SLIDE_HTML = `<div class="slide fluent-slide fluent-slide-dense">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">BUSINESS INNOVATION</span>
      <h1 class="title-main">비즈니스 혁신4: 프로토타입 엔진을 통한 아키텍처 내재화</h1>
    </div>
    <p class="sub"><strong>JTGS 통합 프로토타입</strong> — 제한된 환경에서 차세대 스택을 검증하고, 당사 기술 업그레이드와 시행착오를 최소화하는 내재화 과정</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="col">
      <div class="col-head"><i class="fas fa-bullseye"></i> 전략적 선정 배경</div>
      <div class="card">
        <div class="item">
          <div class="item-ico"><i class="fas fa-shield-halved"></i></div>
          <div>
            <div class="item-t">비즈니스 리스크 격리</div>
            <p class="item-d">주유소(JTGS) 제한 환경 — 장애 시에도 전사 핵심 물류·유통망에 파급 최소</p>
          </div>
        </div>
        <div class="item">
          <div class="item-ico"><i class="fas fa-gears"></i></div>
          <div>
            <div class="item-t">차세대 스택 검증 대상</div>
            <p class="item-d">정산·재고·외부 연동 등 FaSS V3.0 핵심 기능을 실전 프로토타입으로 검증</p>
          </div>
        </div>
      </div>
    </div>

    <div class="visual">
      <div class="diagram-frame">
        <div class="diag-label">ARCHITECTURE INTERNALIZATION FLOW</div>

        <div class="diag-sandbox">
          <div class="sandbox-tag"><i class="fas fa-shield-halved"></i> JTGS 격리 샌드박스 — 비즈니스 리스크 최소화</div>
          <div class="diag-stack">
            <div class="diag-box">
              <i class="fab fa-react"></i>
              <div class="diag-box-t">Next.js UI</div>
              <div class="diag-box-s">RSC · RealGrid</div>
            </div>
            <span class="diag-arrow"><i class="fas fa-chevron-right"></i></span>
            <div class="diag-box highlight">
              <i class="fas fa-layer-group"></i>
              <div class="diag-box-t">SiteFramework</div>
              <div class="diag-box-s">공통 모듈</div>
            </div>
            <span class="diag-arrow"><i class="fas fa-chevron-right"></i></span>
            <div class="diag-box">
              <i class="fas fa-server"></i>
              <div class="diag-box-t">API · 정산</div>
              <div class="diag-box-s">재고 · 연동</div>
            </div>
          </div>
          <div class="diag-mid">
            <div class="diag-box" style="grid-column:1">
              <i class="fas fa-shuffle"></i>
              <div class="diag-box-t">API Gateway</div>
            </div>
            <span class="diag-arrow"><i class="fas fa-arrows-left-right"></i></span>
            <div class="diag-box" style="grid-column:3">
              <i class="fas fa-database"></i>
              <div class="diag-box-t">PostgreSQL</div>
            </div>
          </div>
        </div>

        <div class="diag-pipeline">
          <div class="pipe-node">프로토타입 PoC</div>
          <span class="pipe-arrow"><i class="fas fa-chevron-right"></i></span>
          <div class="pipe-node accent">기술 검증·학습</div>
          <span class="pipe-arrow"><i class="fas fa-chevron-right"></i></span>
          <div class="pipe-node gold">아키텍처 내재화</div>
          <span class="pipe-arrow"><i class="fas fa-chevron-right"></i></span>
          <div class="pipe-node good">본 사업 확산</div>
        </div>

        <div class="diag-expand">
          <div class="expand-from">
            <i class="fas fa-flask"></i>
            <div class="expand-t">제한 환경 실험</div>
            <div class="expand-s">JTGS 프로토타입</div>
          </div>
          <div class="expand-mid">
            <i class="fas fa-angles-down"></i>
            <span>검증·표준화</span>
          </div>
          <div class="expand-to">
            <i class="fas fa-building"></i>
            <div class="expand-t">전사 표준 적용</div>
            <div class="expand-s">물류·유통 확산</div>
          </div>
        </div>

        <p class="visual-caption">통합 프로토타입으로 <strong>차세대 스택을 안전하게 검증</strong>하고,<br>조직에 <strong>아키텍처·운영 노하우를 내재화</strong>한 뒤 본 사업으로 확산</p>
      </div>
      <div class="value-cards">
        <div class="value-card accent"><i class="fas fa-arrow-trend-up"></i><span>기술<br>업그레이드</span></div>
        <div class="value-card gold"><i class="fas fa-shield-halved"></i><span>시행착오<br>최소화</span></div>
        <div class="value-card good"><i class="fas fa-sitemap"></i><span>아키텍처<br>내재화</span></div>
      </div>
    </div>

    <div class="col">
      <div class="col-head"><i class="fas fa-vial"></i> 핵심 목표 및 의의</div>
      <div class="card">
        <div class="item">
          <div class="item-ico"><i class="fas fa-gauge-high"></i></div>
          <div>
            <div class="item-t">프로토타입 개발 로드맵</div>
            <p class="item-d">2026.10 착수 → 2027.03 완성 → 2027.06 안정화. 완성형 스택 최초 적용의 시작점</p>
          </div>
        </div>
        <div class="item">
          <div class="item-ico"><i class="fas fa-display"></i></div>
          <div>
            <div class="item-t">설계 표준 · 스토리보드 확정</div>
            <p class="item-d">UI·기능 스토리보드 표본 확정 → 향후 전사 시스템 개발의 공통 설계 기준</p>
          </div>
        </div>
        <div class="item">
          <div class="item-ico"><i class="fas fa-flask"></i></div>
          <div>
            <div class="item-t">Learn before Scale</div>
            <p class="item-d">본격 확산 전 아키텍처·프레임워크·운영 노하우를 조직에 내재화하여 리스크 선제 제거</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="bottom-date"><i class="fas fa-calendar-check"></i> 2026. 10.</div>
      <p class="bottom-text">
        2026년 10월 차세대 서버에서 <span>FaSS V1.0 통합 프로토타입 개발 착수</span> (런칭·시연 아닌 개발 Start).
        프로토타입 단계에서 검증·학습을 마친 뒤 본 사업으로 확산함으로써, <span>기술 업그레이드 속도는 높이고 시행착오 비용은 줄입니다.</span>
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
