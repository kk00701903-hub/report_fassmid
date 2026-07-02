/**
 * Reflow trick — restart CSS keyframe animations after viewport scale / fullscreen changes.
 */
export function restartSlideAnimations(root: ParentNode = document) {
  if (typeof window === "undefined") return;

  const candidates = root.querySelectorAll<HTMLElement>(
    [
      "[data-motion] *",
      ".slide-motion-entered *",
      ".s16-flow-spine__fill.is-animated",
      ".s16-flow-spine__runner.is-animated",
      ".s16-flow-connector__packet.is-animated",
      ".s05-package--flow",
      ".s05-package--motion",
      ".s05-belt__slats",
      ".poc-pipeline-svg animate",
    ].join(", "),
  );

  candidates.forEach((el) => {
    const { animationName, animationDuration } = window.getComputedStyle(el);
    if (!animationName || animationName === "none") return;
    if (animationDuration === "0s" || animationDuration === "0ms") return;

    const prior = el.style.animation;
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = prior || "";
  });
}
