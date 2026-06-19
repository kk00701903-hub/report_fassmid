import { getSlideHtmlUrl } from "@/lib/basePath";
import type { SlideManifestItem } from "@/lib/presentationConfig";
import { isSlideVisible } from "@/lib/presentationConfig";

const SLIDE_W = 960;
const SLIDE_H = 720;

function getSlideSource(item: SlideManifestItem): { src?: string; srcDoc?: string } {
  if (item.type === "builtin") {
    return { src: getSlideHtmlUrl(item.fileName) };
  }
  return { srcDoc: item.html };
}

function waitForIframeLoad(iframe: HTMLIFrameElement): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("슬라이드 로드 시간 초과")), 30000);
    iframe.addEventListener(
      "load",
      () => {
        window.clearTimeout(timeout);
        window.setTimeout(() => resolve(), 400);
      },
      { once: true },
    );
  });
}

async function captureSlideAsDataUrl(item: SlideManifestItem): Promise<string> {
  const { src, srcDoc } = getSlideSource(item);
  const iframe = document.createElement("iframe");
  iframe.style.cssText = `position:fixed;left:-9999px;top:0;width:${SLIDE_W}px;height:${SLIDE_H}px;border:none`;
  iframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
  if (src) iframe.src = src;
  else if (srcDoc) iframe.srcdoc = srcDoc;

  document.body.appendChild(iframe);

  try {
    await waitForIframeLoad(iframe);
    const doc = iframe.contentDocument;
    if (!doc?.body) throw new Error("슬라이드 문서를 읽을 수 없습니다");

    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(doc.body, {
      width: SLIDE_W,
      height: SLIDE_H,
      windowWidth: SLIDE_W,
      windowHeight: SLIDE_H,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#0a0e1a",
    });
    return canvas.toDataURL("image/png");
  } finally {
    iframe.remove();
  }
}

export type ExportProgress = {
  current: number;
  total: number;
  label: string;
};

export function getExportableSlides(slides: SlideManifestItem[]): SlideManifestItem[] {
  return slides.filter(isSlideVisible);
}

export async function captureSlidesAsImages(
  slides: SlideManifestItem[],
  onProgress?: (progress: ExportProgress) => void,
): Promise<string[]> {
  const targets = getExportableSlides(slides);
  const images: string[] = [];

  for (let i = 0; i < targets.length; i++) {
    onProgress?.({
      current: i + 1,
      total: targets.length,
      label: targets[i].title,
    });
    images.push(await captureSlideAsDataUrl(targets[i]));
  }

  return images;
}

export async function exportSlidesToPrint(
  slides: SlideManifestItem[],
  onProgress?: (progress: ExportProgress) => void,
): Promise<void> {
  const images = await captureSlidesAsImages(slides, onProgress);
  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1024,height=768");
  if (!printWindow) throw new Error("팝업이 차단되었습니다. 인쇄 창을 허용해 주세요.");

  const pages = images
    .map(
      (src) =>
        `<section class="print-slide"><img src="${src}" alt="slide" width="${SLIDE_W}" height="${SLIDE_H}" /></section>`,
    )
    .join("");

  printWindow.document.write(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<title>FaSS 슬라이드 인쇄</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #111; }
  .print-slide {
    width: ${SLIDE_W}px;
    height: ${SLIDE_H}px;
    margin: 0 auto;
    page-break-after: always;
    break-after: page;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0e1a;
  }
  .print-slide img { display: block; width: 100%; height: 100%; object-fit: contain; }
  @page { size: 254mm 190.5mm; margin: 0; }
  @media print {
    body { background: #fff; }
    .print-slide { margin: 0; }
  }
</style>
</head>
<body>${pages}</body>
</html>`);
  printWindow.document.close();

  printWindow.onload = () => {
    window.setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };
}

export async function exportSlidesToPptx(
  slides: SlideManifestItem[],
  fileName = "FaSS-발표자료.pptx",
  onProgress?: (progress: ExportProgress) => void,
): Promise<void> {
  const images = await captureSlidesAsImages(slides, onProgress);
  const PptxGenJS = await loadPptxGenFromCdn();
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_4x3";
  pptx.author = "FaSS Report";
  pptx.title = "FaSS 차세대 플랫폼 중간 보고";

  for (const dataUrl of images) {
    const slide = pptx.addSlide();
    slide.addImage({
      data: dataUrl,
      x: 0,
      y: 0,
      w: 10,
      h: 7.5,
    });
  }

  await pptx.writeFile({ fileName });
}

type PptxConstructor = new () => {
  layout: string;
  author: string;
  title: string;
  addSlide: () => { addImage: (opts: { data: string; x: number; y: number; w: number; h: number }) => void };
  writeFile: (opts: { fileName: string }) => Promise<void>;
};

declare global {
  interface Window {
    PptxGenJS?: PptxConstructor;
  }
}

function loadPptxGenFromCdn(): Promise<PptxConstructor> {
  if (window.PptxGenJS) return Promise.resolve(window.PptxGenJS);

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js";
    script.async = true;
    script.onload = () => {
      if (window.PptxGenJS) resolve(window.PptxGenJS);
      else reject(new Error("PowerPoint 라이브러리를 불러오지 못했습니다."));
    };
    script.onerror = () => reject(new Error("PowerPoint 라이브러리 로드에 실패했습니다."));
    document.head.appendChild(script);
  });
}
