"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide06.css";

const SLIDE_HTML = `<div class="slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">GLOSSARY</span>
      <h1>핵심 용어집 ③ — DevOps · CI/CD · CDC · AI · 품질·비용</h1>
      <span class="part-num">3 / 3</span>
    </div>
    <p class="sub">개발·운영 자동화, 데이터 이전, AI 협업, 품질·비용 관리 용어입니다.</p>
    <div class="line"></div>
  </div>
  <div class="grid">
    <div class="term" style="--tc:var(--ppt-accent)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-gears"></i></div><div class="term-name">DevOps</div></div>
      <p class="term-def"><strong>개발(Dev)</strong>과 <strong>운영(Ops)</strong>을 하나의 자동화된 흐름으로 통합하는 문화·방법론입니다.</p>
      <p class="term-tip">배포 속도↑ · 장애↓ · 책임 공유</p>
    </div>
    <div class="term" style="--tc:#FC6D26">
      <div class="term-head"><div class="term-icon"><i class="fas fa-rotate"></i></div><div class="term-name">CI/CD</div></div>
      <p class="term-def">코드 변경 시 <strong>자동 빌드·테스트(CI)</strong> 후 <strong>자동 배포(CD)</strong>하는 파이프라인입니다.</p>
      <p class="term-tip">GitLab CI가 FaSS 표준</p>
    </div>
    <div class="term" style="--tc:var(--ppt-good)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-arrows-rotate"></i></div><div class="term-name">CDC</div></div>
      <p class="term-def"><strong>변경 데이터 캡처</strong> — DB 변경분을 실시간으로 감지·복제해, 업무 중단 없이 시스템을 전환합니다.</p>
      <p class="term-tip">레거시→신규 DB 무중단 이관</p>
    </div>
    <div class="term" style="--tc:var(--ppt-purple)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-robot"></i></div><div class="term-name">AI 디지털 워커</div></div>
      <p class="term-def">코드·문서·테스트 등 반복 업무를 <strong>24/7 지원</strong>하는 AI 보조 인력. Human-in-the-loop로 품질 통제합니다.</p>
      <p class="term-tip">인간 7 + AI 8 = 15명급 추진력</p>
    </div>
    <div class="term" style="--tc:var(--ppt-accent-2)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-shield-halved"></i></div><div class="term-name">Quality Gate</div></div>
      <p class="term-def">배포 전 <strong>품질 검사 통과 기준</strong>(SonarQube 등). 미통과 시 배포가 자동 차단됩니다.</p>
      <p class="term-tip">Zero-Defect 품질 통제</p>
    </div>
    <div class="term" style="--tc:#38BDF8">
      <div class="term-head"><div class="term-icon"><i class="fas fa-coins"></i></div><div class="term-name">FinOps</div></div>
      <p class="term-def">클라우드·IT 비용을 <strong>경영 관점에서 최적화</strong>하는 운영 방식. 유휴 자원 절감·수익성 관리입니다.</p>
      <p class="term-tip">ASP 공급 시 수익성 극대화</p>
    </div>
    <div class="term" style="--tc:var(--ppt-good)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-code-branch"></i></div><div class="term-name">GitOps</div></div>
      <p class="term-def">배포 설정을 Git에 저장하고, 변경 시 <strong>자동으로 운영 환경에 동기화</strong>하는 방식입니다.</p>
      <p class="term-tip">ArgoCD 등 — 선언적 배포</p>
    </div>
    <div class="term" style="--tc:var(--ppt-accent)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-user-lock"></i></div><div class="term-name">SSO · RBAC</div></div>
      <p class="term-def"><strong>SSO</strong>: 한 번 로그인으로 여러 시스템 접속. <strong>RBAC</strong>: 역할(직무)별 접근 권한 제어.</p>
      <p class="term-tip">보안·거버넌스 기본</p>
    </div>
    <div class="term" style="--tc:var(--ppt-purple)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-flask"></i></div><div class="term-name">PoC</div></div>
      <p class="term-def"><strong>개념 검증</strong> — 본격 개발 전 소규모로 기술·아이디어의 실현 가능성을 빠르게 검증합니다.</p>
      <p class="term-tip">리스크 선제 제거</p>
    </div>
  </div>
  <div class="footer"><strong>용어집 마무리:</strong> 이후 장표에서 위 용어가 반복 등장합니다. 모르는 용어가 나오면 이 3장(①②③)을 참고하시면 됩니다.</div>
</div>`;

export default function Slide06() {
  return (
    <SlideCanvas slideId={6} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
