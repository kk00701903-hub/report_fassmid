"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import { Slide05MonoScene, Slide05MsaScene } from "@/components/slides/Slide05WorkerVisuals";
import "./styles/Slide05.css";

function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

export default function Slide05() {
  return (
    <SlideCanvas slideId={5} motion="compare" motionTier="medium">
      <div className="slide fluent-slide s05-root">
        <header className="s05-head">
          <div className="s05-head__row">
            <div className="s05-head__bar" />
            <span className="s05-head__badge">C-LEVEL PRIMER</span>
            <h1 className="s05-head__title">
              추진 방향성 설명 ③ <span className="s05-head__dash">—</span> MSA 구조 (물류작업 예시)
            </h1>
          </div>
          <p className="s05-head__sub">
            MSA는 물류센터처럼 <strong>입고·분류·포장·출고</strong>를 나눠 맡기고, 한 구간 장애가 전체
            공정을 멈추지 않게 하는 구조
          </p>
          <div className="s05-head__line" />
        </header>

        <div className="s05-body">
          <div className="s05-compare">
            <article className="s05-panel s05-panel--legacy">
              <header className="s05-panel__head">
                <span className="s05-panel__badge s05-panel__badge--warn">현행 · Monolithic</span>
                <h2 className="s05-panel__title">현행 시스템 아키텍처</h2>
                <p className="s05-panel__sub">
                  입고·분류·포장·출고 전 공정을 <strong>단일 모듈</strong>이 일괄 처리
                </p>
              </header>

              <Slide05MonoScene />

              <footer className="s05-callout s05-callout--danger">
                <i className="fas fa-triangle-exclamation" aria-hidden="true" />
                <div>
                  <div className="s05-callout__label">운영 리스크</div>
                  <p>
                    <RichText text="핵심 모듈 장애 시 **물류 라인 전체 중단** 가능 — 배포 시 **전면 중단** 수반." />
                  </p>
                </div>
              </footer>
            </article>

            <div className="s05-vs" aria-hidden="true">
              <span className="s05-vs__line" />
              <span className="s05-vs__badge">VS</span>
              <span className="s05-vs__line" />
            </div>

            <article className="s05-panel s05-panel--msa">
              <header className="s05-panel__head">
                <span className="s05-panel__badge s05-panel__badge--pos">차세대 · MSA</span>
                <h2 className="s05-panel__title">차세대 시스템 아키텍처</h2>
                <p className="s05-panel__sub">
                  입고·분류·포장·출고를 <strong>독립 서비스(모듈)</strong>로 분리 운영
                </p>
              </header>

              <Slide05MsaScene />

              <footer className="s05-callout s05-callout--success">
                <i className="fas fa-circle-check" aria-hidden="true" />
                <div>
                  <div className="s05-callout__label">기대 효과</div>
                  <p>
                    <RichText text="특정 서비스 장애 시 **해당 모듈만 교체·배포** — **나머지 라인 무중단** 가동." />
                  </p>
                </div>
              </footer>
            </article>
          </div>

          <section className="s05-wrapup">
            <div className="s05-wrapup__head">
              <i className="fas fa-chart-line" aria-hidden="true" />
              <h3>MSA 전환 시 핵심 기대 효과</h3>
            </div>
            <div className="s05-wrapup__grid">
              <div className="s05-wrapup__item">
                <span className="s05-wrapup__num">1</span>
                <div>
                  <strong className="s05-wrapup__tag">장애 전파 차단</strong>
                  <p>
                    <RichText text="단일 서비스 장애가 **물류센터 전체 가동 중단**으로 이어지지 않는 **운영 안정성** 확보." />
                  </p>
                </div>
              </div>
              <div className="s05-wrapup__item">
                <span className="s05-wrapup__num">2</span>
                <div>
                  <strong className="s05-wrapup__tag">선별적 배포 · 유지보수</strong>
                  <p>
                    <RichText text="전체 시스템 중단 없이 **변경 대상 모듈만** 교체·배포 가능 — **서비스 연속성** 유지." />
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SlideCanvas>
  );
}
