"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide06.css";

const SLIDE_HTML = `<div class="slide fluent-slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">C-LEVEL PRIMER</span>
      <h1>CDC(Change Data Capture)란?</h1>
    </div>
    <p class="sub"><strong>변경 데이터 캡처</strong> — DB에 발생한 INSERT·UPDATE·DELETE <strong>변경분만</strong> 실시간으로 감지·전송하는 차세대 데이터 동기화 방식</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="compare-panels">
      <div class="panel panel--legacy">
        <div class="panel-badge panel-badge--warn">기존 방식 · Batch 기반 데이터 복사</div>
        <h2 class="panel-title">'야간 재고 전수조사'<span> — 매일 밤 전체를 다시 세는 방식</span></h2>

        <div class="panel-visual" aria-hidden="true">
          <svg class="visual-svg visual-svg--batch" viewBox="0 0 220 118" fill="none">
            <rect x="0" y="0" width="220" height="52" fill="#1e293b" opacity="0.12" rx="4"/>
            <circle cx="192" cy="16" r="9" fill="#fbbf24" opacity="0.55"/>
            <text x="178" y="20" font-size="11" fill="#78716c" font-family="Segoe UI, sans-serif">자정</text>
            <text x="8" y="14" font-size="11" fill="#991b1b" font-family="Segoe UI, sans-serif" font-weight="600">야간 Batch</text>

            <rect x="14" y="28" width="78" height="58" rx="4" stroke="#991b1b" stroke-width="1.4" fill="rgba(185,28,28,0.07)"/>
            <path d="M14 42 L92 42" stroke="#991b1b" stroke-width="1" opacity="0.35"/>
            <text x="24" y="38" font-size="11" fill="#7f1d1d" font-family="Segoe UI, sans-serif" font-weight="600">물류센터 (운영 DB)</text>
            <text x="22" y="52" font-size="11" fill="#991b1b" font-family="Segoe UI, sans-serif">문 닫고 전수조사</text>
            <rect x="22" y="58" width="14" height="11" rx="1" stroke="#991b1b" stroke-width="1"/>
            <rect x="38" y="58" width="14" height="11" rx="1" stroke="#991b1b" stroke-width="1"/>
            <rect x="54" y="58" width="14" height="11" rx="1" stroke="#991b1b" stroke-width="1"/>
            <rect x="70" y="58" width="14" height="11" rx="1" stroke="#991b1b" stroke-width="1"/>
            <rect x="30" y="71" width="14" height="11" rx="1" stroke="#991b1b" stroke-width="1"/>
            <rect x="46" y="71" width="14" height="11" rx="1" stroke="#991b1b" stroke-width="1"/>
            <rect x="62" y="71" width="14" height="11" rx="1" stroke="#991b1b" stroke-width="1"/>
            <circle cx="40" cy="78" r="4" stroke="#991b1b" stroke-width="1"/>
            <path d="M40 82 L40 86 M36 84 L44 84" stroke="#991b1b" stroke-width="1"/>
            <circle cx="58" cy="80" r="4" stroke="#991b1b" stroke-width="1"/>
            <path d="M58 84 L58 88 M54 86 L62 86" stroke="#991b1b" stroke-width="1"/>
            <text x="20" y="98" font-size="10" fill="#991b1b" font-family="Segoe UI, sans-serif">전체 재고 다시 계산 → 부하↑</text>

            <path d="M98 58 L128 58" stroke="#991b1b" stroke-width="1.5" marker-end="url(#arrow-red)"/>
            <rect x="134" y="36" width="72" height="52" rx="4" stroke="#64748b" stroke-width="1.3" fill="rgba(100,116,139,0.06)"/>
            <text x="154" y="52" font-size="11" fill="#475569" font-family="Segoe UI, sans-serif" font-weight="600">본사 (분석 DB)</text>
            <text x="142" y="66" font-size="11" fill="#991b1b" font-family="Segoe UI, sans-serif">어제 자정 기준</text>
            <text x="142" y="76" font-size="11" fill="#991b1b" font-family="Segoe UI, sans-serif">과거 데이터만 확인</text>
            <rect x="142" y="80" width="56" height="6" rx="2" fill="#991b1b" opacity="0.2"/>

            <defs>
              <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#991b1b"/>
              </marker>
            </defs>
          </svg>
        </div>

        <p class="panel-analogy">매일 밤 자정에 물류센터 문을 닫고, 센터 안의 <strong>모든 물건을 처음부터 끝까지</strong> 다시 세어 본사에 보고하는 방식입니다.</p>

        <div class="panel-callout panel-callout--danger">
          <div class="callout-icon"><i class="fas fa-triangle-exclamation"></i></div>
          <div class="callout-body">
            <div class="callout-label">단점</div>
            <p>시간이 오래 걸리고 물류센터(<strong>운영 DB</strong>)에 엄청난 피로와 부하를 줍니다. 본사는 <strong>어제 자정 기준의 과거 데이터</strong>만 볼 수 있습니다.</p>
          </div>
        </div>
      </div>

      <div class="panel-divider" aria-hidden="true">
        <div class="divider-line"></div>
        <div class="divider-badge">VS</div>
        <div class="divider-line"></div>
      </div>

      <div class="panel panel--cdc">
        <div class="panel-badge panel-badge--pos">차세대 방식 · CDC 도입</div>
        <h2 class="panel-title">'실시간 입출고 센서 보고'<span> — 변동분만 즉시 전송</span></h2>

        <div class="panel-visual" aria-hidden="true">
          <svg class="visual-svg visual-svg--cdc" viewBox="0 0 220 118" fill="none">
            <rect x="0" y="0" width="220" height="52" fill="#e0f2fe" opacity="0.35" rx="4"/>
            <text x="8" y="14" font-size="11" fill="#0078d4" font-family="Segoe UI, sans-serif" font-weight="600">실시간 CDC</text>

            <rect x="14" y="28" width="78" height="58" rx="4" stroke="#0078d4" stroke-width="1.4" fill="rgba(0,120,212,0.06)"/>
            <path d="M14 42 L92 42" stroke="#0078d4" stroke-width="1" opacity="0.3"/>
            <text x="24" y="38" font-size="11" fill="#0c4a6e" font-family="Segoe UI, sans-serif" font-weight="600">물류센터 (운영 DB)</text>
            <text x="22" y="52" font-size="11" fill="#0078d4" font-family="Segoe UI, sans-serif">정상 운영 · 재고 그대로</text>
            <rect x="22" y="58" width="14" height="11" rx="1" stroke="#0078d4" stroke-width="1" opacity="0.5"/>
            <rect x="38" y="58" width="14" height="11" rx="1" stroke="#0078d4" stroke-width="1" opacity="0.5"/>
            <rect x="54" y="58" width="14" height="11" rx="1" stroke="#0078d4" stroke-width="1" opacity="0.5"/>
            <rect x="70" y="58" width="14" height="11" rx="1" stroke="#0078d4" stroke-width="1" opacity="0.5"/>
            <rect x="30" y="71" width="14" height="11" rx="1" stroke="#0078d4" stroke-width="1" opacity="0.5"/>
            <rect x="46" y="71" width="14" height="11" rx="1" stroke="#0078d4" stroke-width="1" opacity="0.5"/>

            <rect x="84" y="52" width="10" height="16" rx="2" fill="#10b981" opacity="0.85"/>
            <circle cx="89" cy="48" r="6" fill="#10b981" opacity="0.75"/>
            <path d="M86 48 L89 45 L92 48" stroke="#fff" stroke-width="1" fill="none"/>
            <text x="76" y="78" font-size="10" fill="#059669" font-family="Segoe UI, sans-serif">스마트 센서</text>

            <rect x="104" y="46" width="16" height="10" rx="2" fill="#10b981" opacity="0.75"/>
            <text x="106" y="44" font-size="10" fill="#059669" font-family="Segoe UI, sans-serif">+입고</text>
            <rect x="104" y="62" width="16" height="10" rx="2" fill="#f59e0b" opacity="0.75"/>
            <text x="106" y="60" font-size="10" fill="#b45309" font-family="Segoe UI, sans-serif">-출고</text>
            <text x="20" y="98" font-size="10" fill="#0078d4" font-family="Segoe UI, sans-serif">변동분만 캡처 → 부하 제로</text>

            <path d="M124 56 L152 56" stroke="#10b981" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#arrow-green)"/>
            <circle cx="138" cy="56" r="3" fill="#10b981"/>

            <rect x="158" y="34" width="52" height="56" rx="4" stroke="#0078d4" stroke-width="1.3" fill="rgba(0,120,212,0.06)"/>
            <text x="170" y="50" font-size="11" fill="#0c4a6e" font-family="Segoe UI, sans-serif" font-weight="600">본사 (분석 DB)</text>
            <text x="164" y="64" font-size="11" fill="#059669" font-family="Segoe UI, sans-serif" font-weight="600">실시간 동기화</text>
            <text x="164" y="74" font-size="11" fill="#059669" font-family="Segoe UI, sans-serif">1초 전 100% 데이터</text>
            <circle cx="184" cy="84" r="4" fill="#10b981" opacity="0.8"/>
            <circle cx="184" cy="84" r="7" stroke="#10b981" stroke-width="1" opacity="0.4"/>

            <defs>
              <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#10b981"/>
              </marker>
            </defs>
          </svg>
        </div>

        <p class="panel-analogy">출입구에 스마트 센서를 달아, 기존 재고는 건드리지 않고 방금 <strong>'들어온 물건'</strong>과 <strong>'나간 물건(변동분)'</strong>만 실시간으로 본사에 전송합니다.</p>

        <div class="panel-callout panel-callout--success">
          <div class="callout-icon"><i class="fas fa-circle-check"></i></div>
          <div class="callout-body">
            <div class="callout-label">장점</div>
            <p>물류센터 업무에 전혀 지장을 주지 않으면서(<strong>운영 DB 부하 제로</strong>), 본사는 <strong>1초 전의 100% 실시간 데이터</strong>로 즉각적인 비즈니스 의사결정을 내릴 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapup-box">
      <div class="wrapup-head">
        <i class="fas fa-arrows-rotate"></i>
        <h3>FaSS 차세대 적용</h3>
      </div>
      <p class="wrapup-text"><strong>Debezium + Kafka</strong> 기반 CDC 파이프라인으로 레거시 Oracle → PostgreSQL <strong>무중단 데이터 이관</strong> — 업무 중단 없이 신·구 시스템을 실시간 동기화합니다.</p>
    </div>
  </div>
</div>`;

export default function Slide06() {
  return (
    <SlideCanvas slideId={6} motion="compare" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
