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
            <h1>핵심용어집 ③ — MSA 구조</h1>
          </div>
          <p className="sub">
            MSA는 물류센터처럼 입고·분류·포장·출고를 나눠 맡기고, 한 구간 장애가 전체 공정을 멈추지 않게 하는 구조
          </p>
          <div className="line" />
        </div>

        <div className="body">
          <div className="compare-panels">
            <div className="panel panel--legacy">
              <div className="panel-badge panel-badge--warn">현행 · Monolithic</div>
              <h2 className="panel-title">
                현행 FaSS <span>(단일 모듈 집중)</span>
              </h2>

              <Slide05MonoScene />

              <p className="panel-analogy">
                <RichText text="입고 · 분류 · 포장 · 출고 **전 공정을 단일 모듈**이 일괄 처리하는 구조입니다." />
              </p>

              <div className="panel-callout panel-callout--danger">
                <div className="callout-icon">
                  <i className="fas fa-triangle-exclamation" />
                </div>
                <div className="callout-body">
                  <div className="callout-label">운영 리스크</div>
                  <p>
                    <RichText text="핵심 모듈 장애 시 **물류 라인 전체 중단** 가능 — 배포 시 **전면 중단** 수반." />
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
                차세대 MSA <span>(업무 단위 분리)</span>
              </h2>

              <Slide05MsaScene />

              <p className="panel-analogy">
                <RichText text="입고 · 분류 · 포장 · 출고를 **독립 서비스(모듈)로 분리**하여 각각 전담 운영하는 구조입니다." />
              </p>

              <div className="panel-callout panel-callout--success">
                <div className="callout-icon">
                  <i className="fas fa-circle-check" />
                </div>
                <div className="callout-body">
                  <div className="callout-label">기대 효과</div>
                  <p>
                    <RichText text="특정 서비스 장애 시 **해당 모듈만 교체·배포** — **나머지 라인 무중단** 가동." />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapup-box">
            <div className="wrapup-head">
              <i className="fas fa-chart-line" />
              <h3>MSA 전환 시 핵심 기대 효과</h3>
            </div>
            <div className="wrapup-items">
              <div className="wrapup-item">
                <span className="wrapup-num">1</span>
                <div className="wrapup-content">
                  <strong className="wrapup-tag">장애 전파 차단</strong>
                  <p>
                    <RichText text="단일 서비스 장애가 **물류센터 전체 가동 중단**으로 이어지지 않는 **운영 안정성** 확보." />
                  </p>
                </div>
              </div>
              <div className="wrapup-item">
                <span className="wrapup-num">2</span>
                <div className="wrapup-content">
                  <strong className="wrapup-tag">선별적 배포 · 유지보수</strong>
                  <p>
                    <RichText text="전체 시스템 중단 없이 **변경 대상 모듈만** 교체·배포 가능 — **서비스 연속성** 유지." />
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
