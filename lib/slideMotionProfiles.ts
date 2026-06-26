import type { SlideMotionType } from "@/components/slides/SlideCanvas";

export type ParticleTheme = "spark" | "flow" | "grid" | "none";

export type SlideMotionProfile = {
  particles: ParticleTheme;
  titleSelectors: string;
  staggerSelectors: string;
  countSelectors: string;
  accentSweep: boolean;
};

const TITLE =
  "h1, .title-text, .title-main, .title-main-text, .title-region-text, .section-title-ko, .fass-main-title-text";

const COUNTS =
  ".hstat-val, .stat-val, .stat-box .stat-val, .ai-innovation-hero-stat-number, .closing-anchor-stat-value, .roadmap-strategy-desc strong";

export const SLIDE_MOTION_PROFILES: Record<SlideMotionType, SlideMotionProfile> = {
  cover: {
    particles: "spark",
    titleSelectors: `${TITLE}, .fass-subtitle-text`,
    staggerSelectors: ".fass-info-item-box, .fass-vision-statement-container, .fass-top-header-section > *",
    countSelectors: COUNTS,
    accentSweep: true,
  },
  part: {
    particles: "grid",
    titleSelectors: `${TITLE}, .section-title-en`,
    staggerSelectors: ".section-topic-item, .section-part-label, .section-divider-line",
    countSelectors: COUNTS,
    accentSweep: true,
  },
  cards: {
    particles: "flow",
    titleSelectors: TITLE,
    staggerSelectors:
      ".trend-card, .tool-card, .layer, .term, .scope-card, .flow-col, .cat-card, .summary-column-item, .flow-step, .phase, .scenario-step, .glossary-card, .war-room-feature-card, .poc-flow-item, .chip, .stat-box, .std-pill, .layer-box, .fass-identity-value-item-row",
    countSelectors: COUNTS,
    accentSweep: false,
  },
  timeline: {
    particles: "flow",
    titleSelectors: TITLE,
    staggerSelectors: ".milestone-card, .phase-col, .sprint, .hero, .phase-head",
    countSelectors: COUNTS,
    accentSweep: false,
  },
  pipeline: {
    particles: "flow",
    titleSelectors: TITLE,
    staggerSelectors: ".phase-step, .flow-col, .pipe-node, .cicd-step, .node, .pill, .arrow-row",
    countSelectors: COUNTS,
    accentSweep: true,
  },
  compare: {
    particles: "grid",
    titleSelectors: TITLE,
    staggerSelectors: ".compare-card, .compare-table tbody tr, .metric-item, .ref-badge",
    countSelectors: COUNTS,
    accentSweep: false,
  },
  innovation: {
    particles: "spark",
    titleSelectors: TITLE,
    staggerSelectors:
      ".strat-box, .strat, .concept-box, .role-card, .engine-panel, .roi-asset-evidence-card, .finops-content-card-box, .finops-column-item-wrapper, .ai-innovation-stat-label-top, .agent-demo-panel, .etag",
    countSelectors: COUNTS,
    accentSweep: true,
  },
  architecture: {
    particles: "grid",
    titleSelectors: TITLE,
    staggerSelectors:
      ".flow-node, .architecture-module-unit-box, .architecture-visual-card-item, .k8s-feature-item, .diagram-card, .stage-row, .migration-node-box, .lane, .org-panel",
    countSelectors: COUNTS,
    accentSweep: false,
  },
  roadmap: {
    particles: "flow",
    titleSelectors: TITLE,
    staggerSelectors: ".roadmap-step-node, .roadmap-strategy-card, .roadmap-data-table tbody tr, .roadmap-content-item",
    countSelectors: COUNTS,
    accentSweep: true,
  },
  closing: {
    particles: "spark",
    titleSelectors: `${TITLE}, .closing-anchor-main-keyword`,
    staggerSelectors: ".vision-pillar-card, .closing-commitment-bar, .commit-pill, .closing-anchor-stat-group",
    countSelectors: COUNTS,
    accentSweep: true,
  },
};

export function getMotionProfile(motion?: SlideMotionType): SlideMotionProfile {
  return SLIDE_MOTION_PROFILES[motion ?? "cards"];
}
