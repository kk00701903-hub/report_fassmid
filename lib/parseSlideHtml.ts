export type ParsedSlide = {
  styles: string;
  bodyHtml: string;
};

const SLIDE_CONTENT_SELECTOR = ".slide-stage__content";

function scopeSlideStyles(styles: string): string {
  let scoped = styles.replace(/(^|\n)(\s*)body(\s*\{)/g, `$1$2${SLIDE_CONTENT_SELECTOR}$3`);

  const contentRulePattern = new RegExp(
    `${SLIDE_CONTENT_SELECTOR.replace(/\./g, "\\.")}\\s*\\{[\\s\\S]*?\\}`,
    "g",
  );

  scoped = scoped.replace(
    contentRulePattern,
    () => `${SLIDE_CONTENT_SELECTOR} {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background-color: var(--ppt-bg, #0a0e1a);
}`,
  );

  scoped = scoped
    .replace(/background-color\s*:\s*#000000\s*;?/gi, "background-color: var(--ppt-bg);")
    .replace(/background-color\s*:\s*#000\s*;?/gi, "background-color: var(--ppt-bg);")
    .replace(/background\s*:\s*#000000\s*;?/gi, "background: var(--ppt-bg);")
    .replace(/background\s*:\s*#000\s*;?/gi, "background: var(--ppt-bg);");

  return scoped;
}

export function parseSlideHtml(html: string): ParsedSlide {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const rawStyles = styleMatch?.[1]?.trim() ?? "";

  return {
    styles: rawStyles ? scopeSlideStyles(rawStyles) : "",
    bodyHtml: bodyMatch?.[1]?.trim() ?? "",
  };
}
