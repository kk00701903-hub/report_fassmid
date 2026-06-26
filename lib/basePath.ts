export function getBasePath(): string {
  if (typeof window !== "undefined") {
    const match = window.location.pathname.match(/^(\/[^/]+)\/slides(?:\/|$)/);
    if (match) return match[1];
  }

  return process.env.NEXT_PUBLIC_BASE_PATH ?? "/report_fassmid";
}

/** 커스텀 HTML 업로드 슬라이드의 shared 에셋 기준 URL (끝에 / 포함) */
export function getSlidesDirectoryUrl(): string {
  const basePath = getBasePath();
  const path = `${basePath}/slides/`;
  if (typeof window !== "undefined") {
    return new URL(path, window.location.origin).href;
  }
  return path;
}
