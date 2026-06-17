export function getBasePath(): string {
  if (typeof window !== "undefined") {
    const match = window.location.pathname.match(/^(\/[^/]+)\/slides(?:\/|$)/);
    if (match) return match[1];
  }

  return process.env.NEXT_PUBLIC_BASE_PATH ?? "/report_fassmid";
}

export function getSlideHtmlUrl(fileName: string): string {
  const basePath = getBasePath();
  return `${basePath}/slides/${fileName}`;
}
