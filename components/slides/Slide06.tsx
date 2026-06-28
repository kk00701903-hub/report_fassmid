"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import { Slide06BatchScene, Slide06CdcScene } from "@/components/slides/Slide06WarehouseVisuals";
import "./styles/Slide06.css";

function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

export default function Slide06() {
  return (
    <SlideCanvas slideId={6} motion="compare" motionTier="medium">
      <div className="slide fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">C-LEVEL PRIMER</span>
            <h1>CDC(Change Data Capture) — 데이터 동기화 전환</h1>
          </div>
          <p className="sub">
            현행 <strong>Batch(야간 전수 복제)</strong>와 <strong>CDC(변경분 실시간 전송)</strong>를 운영 부하·
            데이터 신선도 관점에서 비교·검토합니다.
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <div className="compare-panels">
            <div className="panel panel--legacy">
              <div className="panel-badge panel-badge--warn">현행 · Batch 복제</div>
              <h2 className="panel-title">
                &apos;야간 재고 전수조사&apos;
                <span> — 매일 야간 전체 데이터 재복제</span>
              </h2>

              <Slide06BatchScene />

              <p className="panel-analogy">
                <RichText text="매일 야간에 **전 재고·전 거래 데이터를 처음부터 재집계**하여 본사 분석 DB로 일괄 전송하는 방식입니다." />
              </p>

              <div className="panel-callout panel-callout--danger">
                <div className="callout-icon">
                  <i className="fas fa-triangle-exclamation" />
                </div>
                <div className="callout-body">
                  <div className="callout-label">현행 과제</div>
                  <p>
                    <RichText text="대용량 전수 처리로 **운영 DB 부하**가 발생하며, 본사는 **전일 자정 기준 과거 데이터**에 의존하게 됩니다." />
                  </p>
                </div>
              </div>
            </div>

            <div className="panel-divider" aria-hidden="true">
              <div className="divider-line" />
              <div className="divider-badge">VS</div>
              <div className="divider-line" />
            </div>

            <div className="panel panel--cdc">
              <div className="panel-badge panel-badge--pos">차세대 · CDC</div>
              <h2 className="panel-title">
                &apos;실시간 입출고 센서 보고&apos;
                <span> — 변동분만 즉시 동기화</span>
              </h2>

              <Slide06CdcScene />

              <p className="panel-analogy">
                <RichText text="기존 재고는 유지한 채 **입·출고 변동분만** 실시간으로 분석 DB에 동기화하는 방식입니다." />
              </p>

              <div className="panel-callout panel-callout--success">
                <div className="callout-icon">
                  <i className="fas fa-circle-check" />
                </div>
                <div className="callout-body">
                  <div className="callout-label">기대 효과</div>
                  <p>
                    <RichText text="운영 DB에 **실질적 부하 없이** 신·구 시스템을 연동하며, **준실시간 데이터** 기반 의사결정을 지원합니다." />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapup-box">
            <div className="wrapup-head">
              <i className="fas fa-arrows-rotate" />
              <h3>FaSS 차세대 적용 방안</h3>
            </div>
            <p className="wrapup-text">
              <RichText text="**Debezium + Kafka** 기반 CDC 파이프라인으로 레거시 Oracle → PostgreSQL **무중단 데이터 이관**을 추진합니다. 업무 중단 없이 신·구 시스템을 실시간 동기화합니다." />
            </p>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
