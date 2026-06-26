"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide07.css";

const SLIDE_HTML = `<div class="slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">PROJECT SCOPE</span>
      <h1>차세대 FaSS 구축 프로젝트 범위</h1>
    </div>
    <p class="sub">프론트엔드(웹)부터 백엔드(WAS)·DB, 보안·인프라·AI까지 — 전사 물류·유통 운영을 지탱하는 <strong style="color:var(--ppt-text-1)">대형 엔터프라이즈 플랫폼</strong> 전면 재구축입니다.</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="scope-banner">
      <i class="fas fa-layer-group"></i>
      <p><strong>단순 화면 개편이 아닙니다.</strong> 수주·발주·정산·물류·유통 전 영역의 업무 시스템을 차세대 웹 표준·AI 협업 체제로 <strong>일괄 전환</strong>하는 전략 프로젝트입니다.</p>
    </div>

    <div class="grid">
      <div class="scope-card" style="--cc:var(--ppt-accent)">
        <div class="card-head">
          <div class="card-icon"><i class="fas fa-desktop"></i></div>
          <div class="card-title">프론트엔드 (웹)</div>
        </div>
        <p class="card-desc">사용자 화면·업무 UX 전면 재설계</p>
        <ul class="card-items">
          <li>Next.js · React 19 기반 웹 UI</li>
          <li>RealGrid · 공통 컴포넌트 라이브러리</li>
          <li>UI/UX 스토리보드 · 접근성 표준</li>
        </ul>
      </div>
      <div class="scope-card" style="--cc:var(--ppt-accent-2)">
        <div class="card-head">
          <div class="card-icon"><i class="fas fa-cogs"></i></div>
          <div class="card-title">백엔드 (WAS)</div>
        </div>
        <p class="card-desc">업무 로직·API·도메인 모듈 구축</p>
        <ul class="card-items">
          <li>수주·발주·정산 핵심 모듈</li>
          <li>API-First · 모듈러 모놀리스</li>
          <li>외부 연동·멀티 컴퍼니 지원</li>
        </ul>
      </div>
      <div class="scope-card" style="--cc:var(--ppt-good)">
        <div class="card-head">
          <div class="card-icon"><i class="fas fa-database"></i></div>
          <div class="card-title">데이터베이스 (DB)</div>
        </div>
        <p class="card-desc">데이터 모델·마이그레이션·동기화</p>
        <ul class="card-items">
          <li>Oracle → PostgreSQL 전환</li>
          <li>CDC 무중단 데이터 동기화</li>
          <li>BI·리포팅 데이터 파이프라인</li>
        </ul>
      </div>
      <div class="scope-card" style="--cc:var(--ppt-purple)">
        <div class="card-head">
          <div class="card-icon"><i class="fas fa-shield-halved"></i></div>
          <div class="card-title">보안 · 거버넌스</div>
        </div>
        <p class="card-desc">인증·권한·품질·컴플라이언스</p>
        <ul class="card-items">
          <li>SSO · RBAC 권한 체계</li>
          <li>데이터 보안 · SCA(OSS 보안)</li>
          <li>Zero-Defect Quality Gate</li>
        </ul>
      </div>
      <div class="scope-card" style="--cc:var(--ppt-orange)">
        <div class="card-head">
          <div class="card-icon"><i class="fas fa-cloud"></i></div>
          <div class="card-title">인프라 · DevOps</div>
        </div>
        <p class="card-desc">배포·운영·확장 기반 마련</p>
        <ul class="card-items">
          <li>Docker · GitLab CI/CD · GitOps</li>
          <li>Cloud-Ready · FinOps 대비</li>
          <li>Kubernetes · MSA 중장기 로드맵</li>
        </ul>
      </div>
      <div class="scope-card" style="--cc:#38BDF8">
        <div class="card-head">
          <div class="card-icon"><i class="fas fa-robot"></i></div>
          <div class="card-title">AI · 생산성 혁신</div>
        </div>
        <p class="card-desc">디지털 워커·자동화로 TFT 추진력 확대</p>
        <ul class="card-items">
          <li>AI 디지털 워커 · Claude Code</li>
          <li>애자일 워룸 · 스프린트 운영</li>
          <li>사전 PoC · 프로토타입 검증</li>
        </ul>
      </div>
    </div>

    <div class="pill-row">
      <span class="pill"><i class="fas fa-check"></i>19개 Mega-Sprint</span>
      <span class="pill"><i class="fas fa-check"></i>1.5년 · 핵심 7명 + AI 8</span>
      <span class="pill"><i class="fas fa-check"></i>3PL·유통물류 전사 전환</span>
      <span class="pill"><i class="fas fa-check"></i>ASP/SaaS 확장 가능 아키텍처</span>
    </div>
  </div>

  <div class="footer">
    <strong>프로젝트 성격:</strong> 프론트엔드~백엔드 핵심에 더해 보안·인프라·AI·운영 체계까지 포함한 <strong>대형 통합 플랫폼 구축</strong> — 이후 PART에서 각 영역을 상세히 다룹니다.
  </div>
</div>`;

export default function Slide07() {
  return (
    <SlideCanvas slideId={7} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
