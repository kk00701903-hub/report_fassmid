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
      <div className="slide fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">C-LEVEL PRIMER</span>
            <h1>MSA(마이크로서비스) 구조란?</h1>
          </div>
          <p className="sub">
            물류센터 작업자 배치를 <strong>사람 모양 그림 + 실시간 작업 애니메이션</strong>으로 비교하면 MSA
            개념이 직관적으로 이해됩니다.
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <div className="compare-panels">
            <div className="panel panel--legacy">
              <div className="panel-badge panel-badge--warn">기존 레거시 · Monolithic</div>
              <h2 className="panel-title">
                기존 시스템
                <br />
                <span>(크로스 펑셔널 1인 집중 구조)</span>
              </h2>

              <Slide05MonoScene />

              <p className="panel-analogy">
                <RichText text="한 명의 작업자가 **입고 · 분류 · 포장 · 출고** 모든 업무를 도맡아 하는 형태입니다." />
              </p>

              <div className="panel-callout panel-callout--danger">
                <div className="callout-icon">
                  <i className="fas fa-triangle-exclamation" />
                </div>
                <div className="callout-body">
                  <div className="callout-label">치명적 약점</div>
                  <p>
                    <RichText text="해당 작업자가 다치거나 문제가 생기면 물류 라인 **'전체'**가 즉시 마비됩니다. 작은 기능 하나를 수정하려 해도 **시스템 전체를 멈추고 재배포**해야 하는 과거의 구조입니다." />
                  </p>
                </div>
              </div>
            </div>

            <div className="panel-divider" aria-hidden="true">
              <div className="divider-line" />
              <div className="divider-badge">VS</div>
              <div className="divider-line" />
            </div>

            <div className="panel panel--msa">
              <div className="panel-badge panel-badge--pos">차세대 · MSA</div>
              <h2 className="panel-title">
                차세대 MSA
                <br />
                <span>(직능형 전문 분업 구조)</span>
              </h2>

              <Slide05MsaScene />

              <p className="panel-analogy">
                <RichText text="**입고 · 분류 · 포장 · 출고** 라인이 각각 독립적인 전담 인력(모듈)으로 명확히 분리된 형태입니다." />
              </p>

              <div className="panel-callout panel-callout--success">
                <div className="callout-icon">
                  <i className="fas fa-circle-check" />
                </div>
                <div className="callout-body">
                  <div className="callout-label">핵심 강점</div>
                  <p>
                    <RichText text="포장 담당자에게 문제가 생겨도 해당 인력만 **1:1로 즉각 교체(업데이트)**하면 끝납니다. 교체 대기·**전체 가동 중단 없이** 나머지 물류 라인은 **100% 정상 가동**됩니다." />
                    <em> (장애 격리 및 무중단 배포)</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapup-box">
            <div className="wrapup-head">
              <i className="fas fa-chart-line" />
              <h3>MSA 도입이 가져오는 2가지 핵심 비즈니스 임팩트</h3>
            </div>
            <div className="wrapup-items">
              <div className="wrapup-item">
                <span className="wrapup-num">1</span>
                <div className="wrapup-content">
                  <strong className="wrapup-tag">완벽한 장애 차단</strong>
                  <p>
                    <RichText text="하나의 서비스(포장) 장애가 전체 시스템(물류센터) 장애로 번지지 않는 **강력한 생존력**." />
                  </p>
                </div>
              </div>
              <div className="wrapup-item">
                <span className="wrapup-num">2</span>
                <div className="wrapup-content">
                  <strong className="wrapup-tag">기민한 유지보수</strong>
                  <p>
                    <RichText text="시스템 전체를 멈출 필요 없이, 업데이트가 필요한 기능(인력)만 **블록 갈아끼우듯 즉각 교체** 가능." />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
