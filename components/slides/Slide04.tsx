"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide04.css";

const SLIDE_HTML = `<div class="slide fluent-slide">
  <div class="fluent-deco fluent-deco--port" aria-hidden="true">
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2">
      <path d="M8 52 L40 28 L72 52 L72 68 L8 68 Z"/>
      <path d="M20 52 L20 40 M32 52 L32 36 M44 52 L44 40 M56 52 L56 36"/>
      <path d="M4 68 L76 68"/>
      <circle cx="62" cy="20" r="6"/>
      <path d="M56 26 L68 26"/>
    </svg>
  </div>
  <div class="fluent-deco fluent-deco--cloud" aria-hidden="true">
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2">
      <rect x="24" y="20" width="32" height="44" rx="2"/>
      <path d="M30 28 L50 28 M30 36 L50 36 M30 44 L44 44"/>
      <path d="M16 64 L64 64"/>
      <path d="M40 8 L40 16 M32 12 L48 12"/>
      <ellipse cx="40" cy="58" rx="20" ry="4"/>
    </svg>
  </div>

  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">C-LEVEL PRIMER</span>
      <h1>도커(Docker) 컨테이너란?</h1>
    </div>
    <p class="sub">물류의 '철제 컨테이너'와 1:1로 대응하는 IT 실행 환경 — 핵심 개념 3가지로 이해합니다.</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="compare-cards">
      <div class="compare-card">
        <div class="card-head">
          <span class="card-num">01</span>
          <div class="card-title-wrap">
            <h2 class="card-title">규격의 표준화</h2>
            <span class="card-en">Standardization</span>
          </div>
        </div>
        <div class="card-split">
          <div class="card-side card-side--logistics">
            <div class="side-icon"><i class="fas fa-box"></i></div>
            <span class="side-label">물류</span>
            <p>내용물(쌀, TV 등)에 상관없이 규격화된 <strong>'철제 컨테이너'</strong>로 포장하여 하역 효율성 극대화.</p>
          </div>
          <div class="card-bridge" aria-hidden="true"><i class="fas fa-arrows-left-right"></i></div>
          <div class="card-side card-side--it">
            <div class="side-icon side-icon--docker"><i class="fab fa-docker"></i></div>
            <span class="side-label">IT · 도커</span>
            <p>언어·설정이 제각각인 프로그램을 <strong>'도커'</strong>라는 동일 규격의 박스로 포장, 빠르고 일관된 배포.</p>
          </div>
        </div>
      </div>

      <div class="compare-card">
        <div class="card-head">
          <span class="card-num">02</span>
          <div class="card-title-wrap">
            <h2 class="card-title">완벽한 이식성</h2>
            <span class="card-en">Portability</span>
          </div>
        </div>
        <div class="card-split">
          <div class="card-side card-side--logistics">
            <div class="side-icon"><i class="fas fa-ship"></i></div>
            <span class="side-label">물류</span>
            <p>부산항에서 실은 컨테이너를 미국 도착 후에도 <strong>기차·트럭에 그대로</strong> 옮겨 실음.</p>
          </div>
          <div class="card-bridge" aria-hidden="true"><i class="fas fa-arrows-left-right"></i></div>
          <div class="card-side card-side--it">
            <div class="side-icon side-icon--docker"><i class="fab fa-docker"></i></div>
            <span class="side-label">IT · 도커</span>
            <p>개발 PC에서 잘 돌던 프로그램이 <strong>Live 서버·클라우드</strong>에서도 100% 동일하게 에러 없이 작동.</p>
          </div>
        </div>
      </div>

      <div class="compare-card">
        <div class="card-head">
          <span class="card-num">03</span>
          <div class="card-title-wrap">
            <h2 class="card-title">화물의 독립성</h2>
            <span class="card-en">Isolation</span>
          </div>
        </div>
        <div class="card-split">
          <div class="card-side card-side--logistics">
            <div class="side-icon"><i class="fas fa-layer-group"></i></div>
            <span class="side-label">물류</span>
            <p>의류와 액체류를 <strong>각기 다른 컨테이너</strong>에 실어 냄새 섞임·오염을 완벽 차단.</p>
          </div>
          <div class="card-bridge" aria-hidden="true"><i class="fas fa-arrows-left-right"></i></div>
          <div class="card-side card-side--it">
            <div class="side-icon side-icon--docker"><i class="fab fa-docker"></i></div>
            <span class="side-label">IT · 도커</span>
            <p>한 서버에 여러 컨테이너를 띄워도 철저히 분리. 한 서비스 다운·해킹이 <strong>다른 서비스에 영향 없음</strong>.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="k8s-banner">
      <div class="k8s-icon"><i class="fas fa-tower-broadcast"></i></div>
      <div class="k8s-body">
        <div class="k8s-title">
          <span class="k8s-tag">운영 자동화</span>
          쿠버네티스(K8s) = 무인 자동화 항만 관제탑
        </div>
        <p class="k8s-desc">쏟아지는 수백 개의 컨테이너(앱)를 사람이 일일이 관리할 수 없습니다. 쿠버네티스는 <strong>빈 트럭(서버 자원)</strong>을 찾아 컨테이너를 자동 배치하고, 트래픽 폭주 시 <strong>동일 컨테이너를 자동 복제(투입)</strong>하는 완벽한 무인 관제탑 역할을 수행합니다.</p>
      </div>
    </div>
  </div>
</div>`;

export default function Slide04() {
  return (
    <SlideCanvas slideId={4} motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
