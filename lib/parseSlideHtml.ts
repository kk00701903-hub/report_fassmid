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

  scoped = scoped.replace(contentRulePattern, (block) =>
    block
      .replace(/background-color\s*:\s*#000\s*;?/gi, "")
      .replace(/background\s*:\s*#000\s*;?/gi, ""),
  );

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
