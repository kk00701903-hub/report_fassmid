"use client";

import { useReducedMotion } from "framer-motion";

const STATIONS = ["입고", "분류", "포장", "출고"] as const;

function PackageBox({ className = "" }: { className?: string }) {
  return (
    <div className={`s05-package ${className}`.trim()}>
      <div className="s05-package__strap" />
      <div className="s05-package__seam" />
    </div>
  );
}

function FlowingPackage({ delay }: { delay: number }) {
  return <PackageBox className={`s05-package--flow s05-package--delay-${delay}`} />;
}

function StationPill({
  label,
  tone = "muted",
}: {
  label: string;
  tone?: "muted" | "active" | "swap";
}) {
  return (
    <div className={`s05-station-pill s05-station-pill--${tone}`}>
      <span className="s05-station-pill__dot" aria-hidden="true" />
      {label}
    </div>
  );
}

function ConveyorBelt({ variant }: { variant: "stalled" | "flowing" }) {
  const flowing = variant === "flowing";
  const packages = flowing ? [0, 1, 2, 3] : [0, 1, 2];

  return (
    <div className={`s05-belt s05-belt--${variant}`}>
      <div className="s05-belt__roller s05-belt__roller--top" aria-hidden="true">
        <span className="s05-belt__roller-core" />
      </div>
      <div className="s05-belt__track">
        <div className="s05-belt__slats" aria-hidden="true" />
        <div className="s05-belt__chevrons" aria-hidden="true" />
        {packages.map((delay) => (
          <FlowingPackage key={delay} delay={delay} />
        ))}
        {!flowing && <div className="s05-belt__stall-overlay" />}
      </div>
      <div className="s05-belt__roller s05-belt__roller--bottom" aria-hidden="true">
        <span className="s05-belt__roller-core" />
      </div>
    </div>
  );
}

export function Slide05MonoScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`s05-scene s05-scene--legacy${reduceMotion ? " s05-scene--static" : ""}`}>
      <div className="s05-scene__corner-tag s05-scene__corner-tag--danger">단일 담당</div>
      <div className="s05-scene__stage">
        <ConveyorBelt variant="stalled" />

        <div className="s05-bracket s05-bracket--legacy">
          <div className="s05-bracket__lines" aria-hidden="true">
            {STATIONS.map((s) => (
              <span key={s} />
            ))}
          </div>
          <div className="s05-bracket__spine" aria-hidden="true" />
          <div className="s05-worker s05-worker--injured">
            <div className="s05-worker__avatar">
              <i className="fas fa-user" aria-hidden="true" />
              <span className="s05-worker__badge">
                <i className="fas fa-xmark" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>

        <div className="s05-station-col s05-station-col--dim">
          {STATIONS.map((label) => (
            <StationPill key={label} label={label} tone="muted" />
          ))}
        </div>
      </div>
      <div className="s05-scene__footer s05-scene__footer--danger">
        <i className="fas fa-triangle-exclamation" aria-hidden="true" />
        전체 라인 마비 · 단일 장애 → 전 공정 중단
      </div>
    </div>
  );
}

export function Slide05MsaScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`s05-scene s05-scene--msa${reduceMotion ? " s05-scene--static" : ""}`}>
      <div className="s05-scene__corner-tag s05-scene__corner-tag--swap">
        <i className="fas fa-rotate" aria-hidden="true" /> 1:1 교체
      </div>
      <div className="s05-scene__stage">
        <ConveyorBelt variant="flowing" />

        <div className="s05-station-col s05-station-col--msa">
          <div className="s05-worker-row">
            <div className="s05-worker s05-worker--active">
              <div className="s05-worker__avatar">
                <i className="fas fa-user" aria-hidden="true" />
              </div>
            </div>
            <StationPill label="입고" tone="active" />
          </div>
          <div className="s05-worker-row">
            <div className="s05-worker s05-worker--idle">
              <div className="s05-worker__avatar">
                <i className="fas fa-user" aria-hidden="true" />
              </div>
            </div>
            <StationPill label="분류" tone="muted" />
          </div>
          <div className="s05-worker-row">
            <div className="s05-worker s05-worker--swap">
              <div className="s05-worker__avatar">
                <i className="fas fa-user-gear" aria-hidden="true" />
              </div>
            </div>
            <StationPill label="포장" tone="swap" />
          </div>
          <div className="s05-worker-row">
            <div className="s05-worker s05-worker--idle">
              <div className="s05-worker__avatar">
                <i className="fas fa-user" aria-hidden="true" />
              </div>
            </div>
            <StationPill label="출고" tone="muted" />
          </div>
        </div>
      </div>
      <div className="s05-scene__footer s05-scene__footer--success">
        <i className="fas fa-circle-check" aria-hidden="true" />
        포장 모듈만 교체 · 나머지 라인 무중단
      </div>
    </div>
  );
}
