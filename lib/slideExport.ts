import { getSlideHtmlUrl } from "@/lib/basePath";
import type { SlideManifestItem } from "@/lib/presentationConfig";
import { isSlideVisible } from "@/lib/presentationConfig";

const SLIDE_W = 960;
const SLIDE_H = 720;
const DEBUG_ENDPOINT = "http://127.0.0.1:7262/ingest/8e2285e8-3b4d-4b7a-8ab7-af48cc00745f";
const DEBUG_SESSION = "a32f70";

function debugLog(
  location: string,
  message: string,
  data: Record<string, unknown>,
  hypothesisId: string,
) {
  // #region agent log
  fetch(DEBUG_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": DEBUG_SESSION },
    body: JSON.stringify({
      sessionId: DEBUG_SESSION,
      location,
      message,
      data,
      hypothesisId,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

function getSlideSource(item: SlideManifestItem): { src?: string; srcDoc?: string } {
  if (item.type === "builtin") {
    return { src: getSlideHtmlUrl(item.fileName) };
  }
  return { srcDoc: item.html };
}

const SLIDE_ROOT_SELECTORS = [
  "body > div.fass-report-slide-root",
  "body > div.section-slide-root",
  "body > div.slide-root",
  "body > div[class*='slide-root']",
  "body > div:not([hidden])",
  "body > div",
] as const;

function findSlideRoot(doc: Document): HTMLElement | null {
  for (const selector of SLIDE_ROOT_SELECTORS) {
    const candidate = doc.querySelector(selector);
    if (!candidate || candidate.nodeType !== Node.ELEMENT_NODE) continue;
    const el = candidate as HTMLElement;
    if (el.hasAttribute("hidden") && !el.className.includes("slide")) continue;
    return el;
  }
  return null;
}

async function waitForSlideDocument(
  iframe: HTMLIFrameElement,
  slideLabel: string,
): Promise<Document> {
  const deadline = Date.now() + 30000;

  while (Date.now() < deadline) {
    const doc = iframe.contentDocument;
    if (doc?.body) {
      if (findSlideRoot(doc)) return doc;

      const bodyText = doc.body.textContent?.trim() ?? "";
      if (bodyText.includes("not found") || bodyText.startsWith("404")) {
        throw new Error(`슬라이드 파일을 찾을 수 없습니다 (${slideLabel})`);
      }
    }
    await new Promise((r) => window.setTimeout(r, 50));
  }

  throw new Error(`슬라이드 로드 시간 초과 (${slideLabel})`);
}

async function waitForSlideRender(doc: Document): Promise<void> {
  const fontsReady = doc.fonts?.ready ?? Promise.resolve();
  const images = Array.from(doc.querySelectorAll("img"));

  await Promise.race([
    Promise.all([
      fontsReady,
      ...images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
              return;
            }
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
      ),
    ]),
    new Promise<void>((resolve) => window.setTimeout(resolve, 3000)),
  ]);
}

function getSlideRoot(doc: Document, slideLabel: string): HTMLElement {
  const root = findSlideRoot(doc);
  if (!root) {
    throw new Error(`슬라이드 루트를 찾을 수 없습니다 (${slideLabel})`);
  }
  return root;
}

function normalizeSlideLayout(doc: Document, root: HTMLElement): void {
  doc.documentElement.style.overflow = "hidden";
  doc.body.style.cssText = `margin:0;padding:0;width:${SLIDE_W}px;height:${SLIDE_H}px;overflow:hidden;background:#0a0e1a`;
  root.style.position = "relative";
  root.style.left = "0";
  root.style.top = "0";
  root.style.transform = "none";
  root.style.transformOrigin = "top left";
  root.style.width = `${SLIDE_W}px`;
  root.style.height = `${SLIDE_H}px`;
  root.style.margin = "0";
}

function auditImages(doc: Document, pageOrigin: string) {
  return Array.from(doc.querySelectorAll("img")).map((img) => {
    let origin = "unknown";
    try {
      origin = new URL(img.currentSrc || img.src, pageOrigin).origin;
    } catch {
      origin = "invalid";
    }
    return {
      src: img.currentSrc || img.src,
      origin,
      complete: img.complete,
      w: img.naturalWidth,
      h: img.naturalHeight,
      crossOrigin: origin !== pageOrigin,
      broken: !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0,
    };
  });
}

/** html2canvas createPattern 실패 방지 — 깨진·교차 출처 이미지 제거 */
function sanitizeImagesInClone(clonedDoc: Document, pageOrigin: string): number {
  let removed = 0;
  clonedDoc.querySelectorAll("img").forEach((img) => {
    let crossOrigin = false;
    try {
      crossOrigin = new URL(img.currentSrc || img.src, pageOrigin).origin !== pageOrigin;
    } catch {
      crossOrigin = true;
    }
    const broken = !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0;
    if (broken || crossOrigin) {
      img.remove();
      removed += 1;
    }
  });
  return removed;
}

async function captureSlideAsDataUrl(item: SlideManifestItem): Promise<string> {
  const { src, srcDoc } = getSlideSource(item);
  const slideLabel = item.type === "builtin" ? item.fileName : item.title;

  const iframe = document.createElement("iframe");
  iframe.style.cssText = `position:fixed;left:-9999px;top:0;width:${SLIDE_W}px;height:${SLIDE_H}px;border:none;visibility:hidden`;
  if (src) iframe.src = src;
  else if (srcDoc) iframe.srcdoc = srcDoc;

  document.body.appendChild(iframe);

  try {
    const doc = await waitForSlideDocument(iframe, slideLabel);
    await waitForSlideRender(doc);
    const pageOrigin = iframe.contentWindow?.location.origin ?? window.location.origin;
    const root = getSlideRoot(doc, slideLabel);
    normalizeSlideLayout(doc, root);

    const imageAudit = auditImages(doc, pageOrigin);
    // #region agent log
    debugLog(
      "slideExport.ts:capture:before",
      "capture start",
      {
        slide: slideLabel,
        rootW: root.offsetWidth,
        rootH: root.offsetHeight,
        bodyW: doc.body.offsetWidth,
        bodyH: doc.body.offsetHeight,
        images: imageAudit,
        brokenCount: imageAudit.filter((i) => i.broken).length,
        crossOriginCount: imageAudit.filter((i) => i.crossOrigin).length,
      },
      "H1-H3",
    );
    // #endregion

    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(root, {
      width: SLIDE_W,
      height: SLIDE_H,
      windowWidth: SLIDE_W,
      windowHeight: SLIDE_H,
      scale: 1,
      useCORS: false,
      allowTaint: true,
      foreignObjectRendering: false,
      logging: false,
      backgroundColor: "#0a0e1a",
      onclone: (clonedDoc) => {
        const clonedRoot = findSlideRoot(clonedDoc);
        if (clonedRoot) {
          normalizeSlideLayout(clonedDoc, clonedRoot);
        }
        const removed = sanitizeImagesInClone(clonedDoc, pageOrigin);
        // #region agent log
        debugLog(
          "slideExport.ts:capture:onclone",
          "clone sanitized",
          { slide: slideLabel, removedImages: removed },
          "H1-H2",
        );
        // #endregion
      },
    });

    // #region agent log
    debugLog(
      "slideExport.ts:capture:success",
      "capture ok",
      { slide: slideLabel, canvasW: canvas.width, canvasH: canvas.height },
      "H4",
    );
    // #endregion

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error(`캡처 결과가 비어 있습니다 (${slideLabel})`);
    }

    return canvas.toDataURL("image/png");
  } catch (error) {
    // #region agent log
    debugLog(
      "slideExport.ts:capture:error",
      "capture failed",
      {
        slide: slideLabel,
        error: error instanceof Error ? error.message : String(error),
      },
      "H4",
    );
    // #endregion
    throw error;
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

async function waitForPrintImages(doc: Document): Promise<void> {
  const images = Array.from(doc.images);
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );
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

  const triggerPrint = async () => {
    await waitForPrintImages(printWindow.document);
    printWindow.focus();
    printWindow.print();
    // #region agent log
    debugLog(
      "slideExport.ts:print",
      "print triggered",
      { pageCount: images.length },
      "H5",
    );
    // #endregion
  };

  if (printWindow.document.readyState === "complete") {
    await triggerPrint();
  } else {
    printWindow.addEventListener("load", () => void triggerPrint(), { once: true });
  }
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
