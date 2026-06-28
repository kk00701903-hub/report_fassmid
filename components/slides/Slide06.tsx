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
            <h1>CDC(Change Data Capture)란?</h1>
          </div>
          <p className="sub">
            <strong>변경 데이터 캡처</strong> — DB 변경분만 실시간 전송. 아래{" "}
            <strong>물류창고 야간 전수조사 vs 실시간 센서</strong> 그림으로 Batch와 CDC를 비교합니다.
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <div className="compare-panels">
            <div className="panel panel--legacy">
              <div className="panel-badge panel-badge--warn">기존 방식 · Batch 기반 데이터 복사</div>
              <h2 className="panel-title">
                &apos;야간 재고 전수조사&apos;
                <span> — 매일 밤 전체를 다시 세는 방식</span>
              </h2>

              <Slide06BatchScene />

              <p className="panel-analogy">
                <RichText text="매일 밤 자정에 물류센터 문을 닫고, 센터 안의 **모든 물건을 처음부터 끝까지** 다시 세어 본사에 보고하는 방식입니다." />
              </p>

              <div className="panel-callout panel-callout--danger">
                <div className="callout-icon">
                  <i className="fas fa-triangle-exclamation" />
                </div>
                <div className="callout-body">
                  <div className="callout-label">단점</div>
                  <p>
                    <RichText text="시간이 오래 걸리고 물류센터(**운영 DB**)에 엄청난 피로와 부하를 줍니다. 본사는 **어제 자정 기준의 과거 데이터**만 볼 수 있습니다." />
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
              <div className="panel-badge panel-badge--pos">차세대 방식 · CDC 도입</div>
              <h2 className="panel-title">
                &apos;실시간 입출고 센서 보고&apos;
                <span> — 변동분만 즉시 전송</span>
              </h2>

              <Slide06CdcScene />

              <p className="panel-analogy">
                <RichText text="출입구에 스마트 센서를 달아, 기존 재고는 건드리지 않고 방금 **'들어온 물건'**과 **'나간 물건(변동분)'**만 실시간으로 본사에 전송합니다." />
              </p>

              <div className="panel-callout panel-callout--success">
                <div className="callout-icon">
                  <i className="fas fa-circle-check" />
                </div>
                <div className="callout-body">
                  <div className="callout-label">장점</div>
                  <p>
                    <RichText text="물류센터 업무에 전혀 지장을 주지 않으면서(**운영 DB 부하 제로**), 본사는 **1초 전의 100% 실시간 데이터**로 즉각적인 비즈니스 의사결정을 내릴 수 있습니다." />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapup-box">
            <div className="wrapup-head">
              <i className="fas fa-arrows-rotate" />
              <h3>FaSS 차세대 적용</h3>
            </div>
            <p className="wrapup-text">
              <RichText text="**Debezium + Kafka** 기반 CDC 파이프라인으로 레거시 Oracle → PostgreSQL **무중단 데이터 이관** — 업무 중단 없이 신·구 시스템을 실시간 동기화합니다." />
            </p>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}
