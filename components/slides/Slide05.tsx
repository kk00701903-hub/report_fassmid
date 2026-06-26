"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide05.css";

const SLIDE_HTML = `<div class="slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">GLOSSARY</span>
      <h1>핵심 용어집 ② — MSA · 모듈러 모놀리스 · Docker · Kubernetes</h1>
      <span class="part-num">2 / 3</span>
    </div>
    <p class="sub">시스템을 어떻게 나누고, 어디서 실행하는지에 관한 아키텍처 용어입니다.</p>
    <div class="line"></div>
  </div>
  <div class="grid">
    <div class="term" style="--tc:var(--ppt-accent)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-cubes"></i></div><div><div class="term-name">MSA</div><div class="term-en">Microservices Architecture</div></div></div>
      <p class="term-def">수주·발주·정산처럼 <strong>업무 단위별로 시스템을 분리</strong>해 각각 독립 배포·확장하는 구조입니다.</p>
      <p class="term-tip"><strong>효과:</strong> 변경 영향 최소화, 팀별 병렬 개발, 장애 격리</p>
    </div>
    <div class="term" style="--tc:var(--ppt-orange)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-box"></i></div><div><div class="term-name">모듈러 모놀리스</div><div class="term-en">Modular Monolith</div></div></div>
      <p class="term-def">하나의 애플리케이션이지만 <strong>내부를 도메인 모듈로 분리</strong>한 구조입니다. MSA로 가기 전 안정적인 중간 단계입니다.</p>
      <p class="term-tip"><strong>FaSS 전략:</strong> 먼저 모듈러 모놀리스 → 점진적 MSA 전환</p>
    </div>
    <div class="term" style="--tc:#2496ED">
      <div class="term-head"><div class="term-icon"><i class="fab fa-docker"></i></div><div><div class="term-name">Docker</div><div class="term-en">컨테이너</div></div></div>
      <p class="term-def">애플리케이션을 <strong>표준 상자(컨테이너)</strong>에 담아, 개발·테스트·운영 환경에서 동일하게 실행하는 기술입니다.</p>
      <p class="term-tip"><strong>비유:</strong> 이사할 때 '표준 컨테이너'에 실어 어디서나 같은 방식으로 내리기</p>
    </div>
    <div class="term" style="--tc:var(--ppt-good)">
      <div class="term-head"><div class="term-icon"><i class="fas fa-dharmachakra"></i></div><div><div class="term-name">Kubernetes (K8s)</div><div class="term-en">컨테이너 오케스트레이션</div></div></div>
      <p class="term-def">Docker 컨테이너 <strong>수십~수백 개를 자동 배치·확장·복구</strong>하는 운영 플랫폼입니다. 트래픽 증가 시 자동으로 서버를 늘립니다.</p>
      <p class="term-tip"><strong>중장기 목표:</strong> FaSS 차세대 플랫폼의 확장·ASP 운영 기반</p>
    </div>
    <div class="compare">
      <div class="compare-box" style="border-top:3px solid var(--ppt-orange)">
        <div class="compare-label">현재 단계</div>
        <div class="compare-title">모듈러 모놀리스 + Docker</div>
        <div class="compare-desc">안정적 기반 위에서 도메인 모듈 분리, 컨테이너로 배포 표준화</div>
      </div>
      <div class="arrow-mid"><i class="fas fa-arrow-right"></i></div>
      <div class="compare-box" style="border-top:3px solid var(--ppt-good)">
        <div class="compare-label">중장기 목표</div>
        <div class="compare-title">MSA + Kubernetes</div>
        <div class="compare-desc">업무별 독립 서비스, K8s로 자동 확장·무중단 운영</div>
      </div>
    </div>
  </div>
  <div class="footer">다음 장표(③)에서는 <strong>자동화·데이터 동기화·AI·품질·비용</strong> 관련 용어를 정리합니다.</div>
</div>`;

export default function Slide05() {
  return (
    <SlideCanvas motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
