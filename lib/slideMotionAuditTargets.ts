/**
 * Per-slide motion audit targets for scripts/audit-slide-motion.mjs (Tier B).
 *
 * Only slides with a genuinely looping/continuous dynamic element need an
 * entry here — static entrance-only slides (PART dividers, glossary, most
 * text/card slides) are covered by the Tier A entrance check alone.
 *
 * kind:
 *  - "text"      textContent changes between two samples (interval polling)
 *  - "svg-d"     SVG path `d` attribute changes between two samples
 *  - "style"     one or more computed style properties change across 3 samples
 *  - "attr"      a raw DOM attribute (e.g. SVG `r`, `cx`) changes across 3 samples
 *  - "count"     selector simply must match at least one element (weak check
 *                for SMIL/offset-path driven motion that's hard to sample)
 */
export type MotionAuditKind = "text" | "svg-d" | "style" | "attr" | "count";

export type MotionAuditTarget = {
  slideId: number;
  kind: MotionAuditKind;
  selector: string;
  label: string;
  /** kind: "style" only — defaults to ["transform", "opacity"] */
  properties?: string[];
  /** kind: "attr" only — required */
  attribute?: string;
};

export const SLIDE_MOTION_AUDIT_TARGETS: MotionAuditTarget[] = [
  { slideId: 3, kind: "text", selector: ".arch-flow-caption", label: "3-Tier flow caption cycle" },
  { slideId: 4, kind: "svg-d", selector: ".s04-tier-hero--logistics path", label: "Docker logistics wave" },
  {
    slideId: 5,
    kind: "style",
    selector: ".s05-package--motion",
    label: "MSA conveyor package travel",
    properties: ["transform", "opacity"],
  },
  {
    slideId: 6,
    kind: "style",
    selector: ".s06-scene__legend-dot--day",
    label: "CDC legend pulse dot",
    properties: ["opacity"],
  },
  {
    slideId: 7,
    kind: "attr",
    selector: ".s07-hub__pulse-ring",
    label: "Scope hub center pulse ring radius",
    attribute: "r",
  },
  {
    slideId: 14,
    kind: "style",
    selector: ".s14-kanban__card--active",
    label: "Sprint kanban active card bob",
    properties: ["transform"],
  },
  {
    slideId: 16,
    kind: "style",
    selector: ".s16-flow-col--active",
    label: "AI workflow active column glow",
    properties: ["borderColor", "boxShadow"],
  },
  {
    slideId: 18,
    kind: "style",
    selector: ".current-ring",
    label: "Milestone current-phase ring pulse",
    properties: ["opacity", "transform"],
  },
  {
    slideId: 19,
    kind: "style",
    selector: ".s18-live-badge",
    label: "Human-to-digital-worker collaboration LIVE badge blink",
    properties: ["opacity"],
  },
  { slideId: 21, kind: "count", selector: ".poc-pipeline-svg circle", label: "CDC pipeline data packets" },
  { slideId: 23, kind: "style", selector: ".s23-spot-visual", label: "Tech spotlight icon motion" },
  { slideId: 26, kind: "count", selector: ".circuit-pipeline__wires circle", label: "CI/CD pipeline wires" },
  {
    slideId: 37,
    kind: "style",
    selector: ".s37-roadmap-track__pulse",
    label: "Roadmap track pulse travel",
    properties: ["left"],
  },
];
