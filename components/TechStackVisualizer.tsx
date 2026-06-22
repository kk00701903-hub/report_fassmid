"use client";

import { useState } from "react";
import { FASS_BACKLOG_URL, FASS_TECH_LAYERS, type TechStackLayer } from "@/lib/fassTechStack";

type TechStackVisualizerProps = {
  layers?: TechStackLayer[] | "fass-full";
};

export default function TechStackVisualizer({ layers = "fass-full" }: TechStackVisualizerProps) {
  const stack = layers === "fass-full" ? FASS_TECH_LAYERS : layers;
  const [activeId, setActiveId] = useState(stack[0]?.id ?? "");

  const active = stack.find((l) => l.id === activeId) ?? stack[0];

  return (
    <section className="detail-tech-stack">
      <h3 className="detail-section__title">
        <i className="fa-solid fa-layer-group" aria-hidden="true" />
        FaSS Platform 기술 스택
        <a
          href={FASS_BACKLOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="detail-tech-stack__backlog-link"
        >
          sprint-backlog
          <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
        </a>
      </h3>

      <div className="detail-tech-stack__tabs" role="tablist">
        {stack.map((layer) => (
          <button
            key={layer.id}
            type="button"
            role="tab"
            aria-selected={layer.id === activeId}
            className={`detail-tech-stack__tab${layer.id === activeId ? " is-active" : ""}`}
            style={{ "--layer-accent": layer.accent } as React.CSSProperties}
            onClick={() => setActiveId(layer.id)}
          >
            <i className={layer.icon} aria-hidden="true" />
            {layer.label}
          </button>
        ))}
      </div>

      {active ? (
        <div
          key={active.id}
          className="detail-tech-stack__panel detail-tech-stack__panel--animate"
          style={{ "--layer-accent": active.accent } as React.CSSProperties}
        >
          <div className="detail-tech-stack__panel-header">
            <i className={active.icon} aria-hidden="true" />
            <span>{active.label}</span>
          </div>
          <ul className="detail-tech-stack__items">
            {active.items.map((item) => (
              <li key={item.name} className="detail-tech-stack__item">
                <div className="detail-tech-stack__item-head">
                  <strong>{item.name}</strong>
                  <div className="detail-tech-stack__badges">
                    {item.assignee ? (
                      <span className="detail-tech-stack__assignee">{item.assignee}</span>
                    ) : null}
                    {item.sprintId ? (
                      <span className="detail-tech-stack__sprint">{item.sprintId}</span>
                    ) : null}
                  </div>
                </div>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
