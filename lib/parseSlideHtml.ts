export type ParsedSlide = {
  styles: string;
  bodyHtml: string;
};

export function parseSlideHtml(html: string): ParsedSlide {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  return {
    styles: styleMatch?.[1]?.trim() ?? "",
    bodyHtml: bodyMatch?.[1]?.trim() ?? "",
  };
}
