"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide05.css";

const SLIDE_HTML = `<div class="slide fluent-slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">C-LEVEL PRIMER</span>
      <h1>MSA(마이크로서비스) 구조란?</h1>
    </div>
    <p class="sub">기존 레거시(모놀리식)와 차세대 MSA를 물류 센터 운영 방식으로 1:1 비교합니다.</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="compare-panels">
      <!-- 좌: Monolithic -->
      <div class="panel panel--legacy">
        <div class="panel-badge panel-badge--warn">기존 레거시 · Monolithic</div>
        <h2 class="panel-title">기존 시스템<br/><span>(크로스 펑셔널 1인 집중 구조)</span></h2>

        <div class="panel-visual" aria-hidden="true">
          <svg class="visual-svg visual-svg--mono" viewBox="0 0 200 120" fill="none">
            <circle cx="100" cy="38" r="14" stroke="currentColor" stroke-width="1.5"/>
            <path d="M88 54 L88 72 M112 54 L112 72" stroke="currentColor" stroke-width="1.5"/>
            <path d="M78 72 L122 72" stroke="currentColor" stroke-width="1.5"/>
            <rect x="72" y="76" width="22" height="16" rx="2" stroke="currentColor" stroke-width="1.3" fill="rgba(185,28,28,0.08)"/>
            <rect x="89" y="80" width="22" height="16" rx="2" stroke="currentColor" stroke-width="1.3" fill="rgba(185,28,28,0.12)"/>
            <rect x="106" y="84" width="22" height="16" rx="2" stroke="currentColor" stroke-width="1.3" fill="rgba(185,28,28,0.16)"/>
            <text x="83" y="87" font-size="7" fill="currentColor" opacity="0.7">입고</text>
            <text x="100" y="91" font-size="7" fill="currentColor" opacity="0.7">분류</text>
            <text x="117" y="95" font-size="7" fill="currentColor" opacity="0.7">포장</text>
            <rect x="80" y="98" width="40" height="14" rx="2" stroke="currentColor" stroke-width="1.3" fill="rgba(185,28,28,0.2)"/>
            <text x="88" y="108" font-size="7" fill="currentColor" opacity="0.8">출고</text>
            <path d="M60 110 L140 110" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" opacity="0.4"/>
            <text x="68" y="118" font-size="8" fill="currentColor" opacity="0.55">한 명이 전 공정 담당</text>
          </svg>
        </div>

        <p class="panel-analogy">한 명의 작업자가 <strong>입고 · 분류 · 포장 · 출고</strong> 모든 업무를 도맡아 하는 형태입니다.</p>

        <div class="panel-callout panel-callout--danger">
          <div class="callout-icon"><i class="fas fa-triangle-exclamation"></i></div>
          <div class="callout-body">
            <div class="callout-label">치명적 약점</div>
            <p>해당 작업자가 다치거나 문제가 생기면 물류 라인 <strong>'전체'</strong>가 즉시 마비됩니다. 작은 기능 하나를 수정하려 해도 <strong>시스템 전체를 멈추고 재배포</strong>해야 하는 과거의 구조입니다.</p>
          </div>
        </div>
      </div>

      <div class="panel-divider" aria-hidden="true">
        <div class="divider-line"></div>
        <div class="divider-badge">VS</div>
        <div class="divider-line"></div>
      </div>

      <!-- 우: MSA -->
      <div class="panel panel--msa">
        <div class="panel-badge panel-badge--pos">차세대 · MSA</div>
        <h2 class="panel-title">차세대 MSA<br/><span>(직능형 전문 분업 구조)</span></h2>

        <div class="panel-visual" aria-hidden="true">
          <svg class="visual-svg visual-svg--msa" viewBox="0 0 200 120" fill="none">
            <g class="worker-block">
              <circle cx="40" cy="36" r="10" stroke="currentColor" stroke-width="1.3"/>
              <path d="M32 48 L32 62 M48 48 L48 62 M30 62 L50 62" stroke="currentColor" stroke-width="1.3"/>
              <rect x="30" y="66" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.3" fill="rgba(0,120,212,0.1)"/>
              <text x="34" y="76" font-size="7" fill="currentColor">입고</text>
            </g>
            <g class="worker-block">
              <circle cx="80" cy="36" r="10" stroke="currentColor" stroke-width="1.3"/>
              <path d="M72 48 L72 62 M88 48 L88 62 M70 62 L90 62" stroke="currentColor" stroke-width="1.3"/>
              <rect x="70" y="66" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.3" fill="rgba(0,120,212,0.12)"/>
              <text x="74" y="76" font-size="7" fill="currentColor">분류</text>
            </g>
            <g class="worker-block">
              <circle cx="120" cy="36" r="10" stroke="currentColor" stroke-width="1.3"/>
              <path d="M112 48 L112 62 M128 48 L128 62 M110 62 L130 62" stroke="currentColor" stroke-width="1.3"/>
              <rect x="110" y="66" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.3" fill="rgba(16,185,129,0.15)"/>
              <text x="112" y="76" font-size="7" fill="currentColor">포장</text>
            </g>
            <g class="worker-block">
              <circle cx="160" cy="36" r="10" stroke="currentColor" stroke-width="1.3"/>
              <path d="M152 48 L152 62 M168 48 L168 62 M150 62 L170 62" stroke="currentColor" stroke-width="1.3"/>
              <rect x="150" y="66" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.3" fill="rgba(0,120,212,0.1)"/>
              <text x="152" y="76" font-size="7" fill="currentColor">출고</text>
            </g>
            <path d="M30 92 L170 92" stroke="currentColor" stroke-width="1" opacity="0.35"/>
            <path d="M40 80 L40 92 M80 80 L80 92 M120 80 L120 92 M160 80 L160 92" stroke="currentColor" stroke-width="1" opacity="0.25"/>
            <text x="52" y="108" font-size="8" fill="currentColor" opacity="0.6">각 전담 인력(모듈) 독립 가동</text>
            <path d="M118 50 L132 50 L132 44 L148 48" stroke="#10b981" stroke-width="1.2" stroke-dasharray="2 1.5"/>
            <text x="134" y="42" font-size="7" fill="#10b981">1:1 교체</text>
          </svg>
        </div>

        <p class="panel-analogy"><strong>입고 · 분류 · 포장 · 출고</strong> 라인이 각각 독립적인 전담 인력(모듈)으로 명확히 분리된 형태입니다.</p>

        <div class="panel-callout panel-callout--success">
          <div class="callout-icon"><i class="fas fa-circle-check"></i></div>
          <div class="callout-body">
            <div class="callout-label">핵심 강점</div>
            <p>포장 담당자에게 문제가 생겨도 해당 인력만 <strong>1:1로 즉각 교체(업데이트)</strong>하면 끝납니다. 교체 대기·<strong>전체 가동 중단 없이</strong> 나머지 물류 라인은 <strong>100% 정상 가동</strong>됩니다. <em>(장애 격리 및 무중단 배포)</em></p>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapup-box">
      <div class="wrapup-head">
        <i class="fas fa-chart-line"></i>
        <h3>MSA 도입이 가져오는 2가지 핵심 비즈니스 임팩트</h3>
      </div>
      <div class="wrapup-items">
        <div class="wrapup-item">
          <span class="wrapup-num">1</span>
          <div class="wrapup-content">
            <strong class="wrapup-tag">완벽한 장애 차단</strong>
            <p>하나의 서비스(포장) 장애가 전체 시스템(물류센터) 장애로 번지지 않는 <strong>강력한 생존력</strong>.</p>
          </div>
        </div>
        <div class="wrapup-item">
          <span class="wrapup-num">2</span>
          <div class="wrapup-content">
            <strong class="wrapup-tag">기민한 유지보수</strong>
            <p>시스템 전체를 멈출 필요 없이, 업데이트가 필요한 기능(인력)만 <strong>블록 갈아끼우듯 즉각 교체</strong> 가능.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

export default function Slide05() {
  return (
    <SlideCanvas slideId={5} motion="compare" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
