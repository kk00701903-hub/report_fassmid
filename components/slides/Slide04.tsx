"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide04.css";

const SLIDE_HTML = `<div class="slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">GLOSSARY</span>
      <h1>핵심 용어집 ① — 클라우드 · 오픈소스 · API</h1>
      <span class="part-num">1 / 3</span>
    </div>
    <p class="sub">앞으로 등장할 인프라·연동 용어를 경영 관점에서 쉽게 정리합니다.</p>
    <div class="line"></div>
  </div>
  <div class="grid">
    <div class="term" style="--tc:var(--ppt-accent)">
      <div class="term-head">
        <div class="term-icon"><i class="fas fa-cloud"></i></div>
        <div><div class="term-name">클라우드 (Cloud)</div><div class="term-en">인터넷 기반 IT 자원</div></div>
      </div>
      <p class="term-def">서버·저장소·네트워크를 <strong>직접 구매·설치하지 않고</strong>, 인터넷으로 필요한 만큼 빌려 쓰는 방식입니다. AWS·Azure·사내 Private Cloud 등이 대표적입니다.</p>
      <p class="term-tip"><strong>왜 중요?</strong> 초기 투자를 줄이고, 트래픽 증가 시 빠르게 확장할 수 있습니다.</p>
    </div>
    <div class="term" style="--tc:var(--ppt-good)">
      <div class="term-head">
        <div class="term-icon"><i class="fas fa-code-branch"></i></div>
        <div><div class="term-name">오픈소스 (Open Source)</div><div class="term-en">공개 소스 기반 SW</div></div>
      </div>
      <p class="term-def">소스코드가 공개되어 누구나 사용·검증할 수 있는 소프트웨어입니다. PostgreSQL, Kafka, Linux 등이 대표적이며, 특정 벤더에 종속되지 않습니다.</p>
      <p class="term-tip"><strong>왜 중요?</strong> 라이선스 비용 절감 + 기술 종속(Lock-in) 리스크를 줄입니다.</p>
    </div>
    <div class="term" style="--tc:var(--ppt-accent-2)">
      <div class="term-head">
        <div class="term-icon"><i class="fas fa-plug"></i></div>
        <div><div class="term-name">API</div><div class="term-en">Application Programming Interface</div></div>
      </div>
      <p class="term-def">시스템·모듈·외부 서비스가 서로 데이터를 주고받기 위한 <strong>약속된 연결 창구</strong>입니다. '메뉴판'처럼 정해진 방식으로만 요청·응답합니다.</p>
      <p class="term-tip"><strong>왜 중요?</strong> 모듈 분리·외부 연동·MSA 전환의 핵심 연결고리입니다.</p>
    </div>
    <div class="term" style="--tc:var(--ppt-purple)">
      <div class="term-head">
        <div class="term-icon"><i class="fas fa-store"></i></div>
        <div><div class="term-name">SaaS / ASP</div><div class="term-en">서비스형 소프트웨어</div></div>
      </div>
      <p class="term-def">소프트웨어를 설치형이 아니라 <strong>구독·서비스 형태</strong>로 제공하는 모델입니다. FaSS를 외부 고객에게 ASP로 공급하는 전략과 직결됩니다.</p>
      <p class="term-tip"><strong>왜 중요?</strong> 차세대 플랫폼의 수익화·확장 비즈니스 모델입니다.</p>
    </div>
  </div>
  <div class="footer">다음 장표(②)에서는 <strong>시스템을 쪼개는 방식(MSA)</strong>과 <strong>실행 환경(Docker·K8s)</strong> 용어를 다룹니다.</div>
</div>`;

export default function Slide04() {
  return (
    <SlideCanvas motion="cards" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
