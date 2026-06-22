"use client";

import { useState } from "react";
import {
  FASS_MILESTONE_PHASES,
  FASS_SCHEDULE_MONTHS,
  FASS_SCHEDULE_TODAY,
  monthSpan,
  monthToIndex,
  type MilestonePhase,
} from "@/lib/fassMilestones";

type MilestoneVisualizerProps = {
  phases?: MilestonePhase[] | "fass-full";
};

const STATUS_LABEL: Record<MilestonePhase["status"], string> = {
  completed: "완료",
  "in-progress": "진행 중",
  planned: "예정",
};

function formatMonth(ym: string): string {
  const [, m] = ym.split("-");
  return `${Number(m)}월`;
}

export default function MilestoneVisualizer({ phases = "fass-full" }: MilestoneVisualizerProps) {
  const data = phases === "fass-full" ? FASS_MILESTONE_PHASES : phases;
  const [activeId, setActiveId] = useState(data[0]?.id ?? "");

  const active = data.find((p) => p.id === activeId) ?? data[0];
  const todayLeft =
    ((monthToIndex(FASS_SCHEDULE_TODAY) + 0.5) / FASS_SCHEDULE_MONTHS.length) * 100;

  return (
    <section className="detail-milestones">
      <h3 className="detail-section__title">
        <i className="fa-solid fa-calendar-days" aria-hidden="true" />
        프로젝트 일정
        <span className="detail-milestones__today-badge">현재 {FASS_SCHEDULE_TODAY.replace("-", ".")}</span>
      </h3>

      <div className="detail-milestones__gantt">
        <div className="detail-milestones__axis">
          <div className="detail-milestones__axis-spacer" />
          <div className="detail-milestones__axis-track">
            {FASS_SCHEDULE_MONTHS.map((ym, i) => (
              <span
                key={ym}
                className={`detail-milestones__axis-label${i % 3 === 0 ? " is-major" : ""}`}
              >
                {i % 3 === 0 ? (
                  <>
                    <strong>{ym.slice(0, 4)}</strong>
                    <em>{formatMonth(ym)}</em>
                  </>
                ) : (
                  <em>{formatMonth(ym)}</em>
                )}
              </span>
            ))}
            <div
              className="detail-milestones__today-line"
              style={{ left: `${todayLeft}%` }}
              title={`현재 시점 (${FASS_SCHEDULE_TODAY})`}
            />
          </div>
        </div>

        <div className="detail-milestones__rows">
          {data.map((phase) => (
            <div
              key={phase.id}
              className="detail-milestones__row"
              style={{ minHeight: `${Math.max(44, phase.tasks.length * 24 + 12)}px` }}
            >
              <button
                type="button"
                className={`detail-milestones__phase-label${phase.id === activeId ? " is-active" : ""}`}
                style={{ "--phase-accent": phase.accent } as React.CSSProperties}
                onClick={() => setActiveId(phase.id)}
              >
                <span className="detail-milestones__phase-num">{phase.phase}</span>
                <span className="detail-milestones__phase-name">{phase.label}</span>
                <span className={`detail-milestones__status detail-milestones__status--${phase.status}`}>
                  {STATUS_LABEL[phase.status]}
                </span>
              </button>
              <div className="detail-milestones__bars">
                {phase.tasks.map((task, taskIdx) => {
                  const { left, width } = monthSpan(task.start, task.end);
                  const barHeight = phase.tasks.length === 1 ? 22 : 18;
                  const topPx = 8 + taskIdx * (barHeight + 4);
                  return (
                    <div
                      key={task.name}
                      className="detail-milestones__bar"
                      style={
                        {
                          "--phase-accent": phase.accent,
                          left: `${left}%`,
                          width: `${width}%`,
                          top: `${topPx}px`,
                          height: `${barHeight}px`,
                          transform: "none",
                        } as React.CSSProperties
                      }
                      title={`${task.name} (${task.start} ~ ${task.end})`}
                    >
                      <span>{task.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {active ? (
        <div
          key={active.id}
          className="detail-milestones__panel detail-milestones__panel--animate"
          style={{ "--phase-accent": active.accent } as React.CSSProperties}
        >
          <div className="detail-milestones__panel-header">
            <span className="detail-milestones__panel-phase">{active.phase}</span>
            <strong>{active.label}</strong>
            <span className="detail-milestones__panel-period">{active.period}</span>
          </div>
          <ul className="detail-milestones__task-list">
            {active.tasks.map((task) => (
              <li key={task.name} className="detail-milestones__task-item">
                <div className="detail-milestones__task-head">
                  <strong>{task.name}</strong>
                  <span className="detail-milestones__task-period">
                    {task.start.replace("-", ".")} – {task.end.replace("-", ".")}
                  </span>
                </div>
                <p>{task.category}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
