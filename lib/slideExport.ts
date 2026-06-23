import { getSlideHtmlUrl, getSlidesDirectoryUrl } from "@/lib/basePath";
import type { SlideManifestItem } from "@/lib/presentationConfig";
import { isSlideVisible } from "@/lib/presentationConfig";

const SLIDE_W = 960;
const SLIDE_H = 720;

const SLIDE_ROOT_SELECTORS = [
  "body > div.fass-report-slide-root",
  "body > div.section-slide-root",
  "body > div.slide-root",
  "body > div[class*='slide-root']",
  "body > div:not([hidden])",
  "body > div",
] as const;

function injectBaseTag(html: string, baseHref: string): string {
  if (/<base\s/i.test(html)) return html;
  return html.replace(/<head([^>]*)>/i, `<head$1><base href="${baseHref}">`);
}

function rewriteSharedAssetUrls(html: string, slidesBaseUrl: string): string {
  return html.replace(/(\b(?:href|src)=["'])shared\//g, `$1${slidesBaseUrl}shared/`);
}

async function prepareSlideSrcDoc(item: SlideManifestItem): Promise<string> {
  const slidesBaseUrl = getSlidesDirectoryUrl();

  if (item.type === "custom") {
    const html = rewriteSharedAssetUrls(item.html, slidesBaseUrl);
    return injectBaseTag(html, slidesBaseUrl);
  }

  const url = getSlideHtmlUrl(item.fileName);
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`슬라이드 파일을 찾을 수 없습니다 (${item.fileName})`);
  }

  let html = await response.text();
  html = rewriteSharedAssetUrls(html, slidesBaseUrl);
  return injectBaseTag(html, slidesBaseUrl);
}

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

async function waitForStylesheets(doc: Document): Promise<void> {
  const links = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));

  await Promise.race([
    Promise.all(
      links.map(
        (link) =>
          new Promise<void>((resolve) => {
            const sheet = (link as HTMLLinkElement).sheet;
            if (sheet) {
              resolve();
              return;
            }
            link.addEventListener("load", () => resolve(), { once: true });
            link.addEventListener("error", () => resolve(), { once: true });
          }),
      ),
    ),
    new Promise<void>((resolve) => window.setTimeout(resolve, 5000)),
  ]);
}

async function waitForSlideRender(doc: Document): Promise<void> {
  const fontsReady = doc.fonts?.ready ?? Promise.resolve();
  const images = Array.from(doc.querySelectorAll("img"));

  await Promise.race([
    Promise.all([
      fontsReady,
      waitForStylesheets(doc),
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
    new Promise<void>((resolve) => window.setTimeout(resolve, 4000)),
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

function isCrossOriginImage(img: HTMLImageElement, pageOrigin: string): boolean {
  try {
    return new URL(img.currentSrc || img.src, pageOrigin).origin !== pageOrigin;
  } catch {
    return true;
  }
}

function isBrokenImage(img: HTMLImageElement): boolean {
  return !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0;
}

/** html2canvas createPattern 실패 방지 — 깨진·교차 출처 이미지 제거 */
function sanitizeImagesInDocument(doc: Document, pageOrigin: string): number {
  let removed = 0;
  doc.querySelectorAll("img").forEach((img) => {
    if (isBrokenImage(img) || isCrossOriginImage(img, pageOrigin)) {
      img.remove();
      removed += 1;
    }
  });
  return removed;
}

function sanitizeCanvasElements(doc: Document): void {
  doc.querySelectorAll("canvas").forEach((canvas) => {
    if (canvas.width === 0 || canvas.height === 0) {
      canvas.remove();
    }
  });
}

function stripAnimations(doc: Document): void {
  if (doc.querySelector("style[data-export-capture]")) return;

  const style = doc.createElement("style");
  style.setAttribute("data-export-capture", "true");
  style.textContent =
    "*, *::before, *::after { animation: none !important; transition: none !important; }";
  doc.head?.appendChild(style);
}

function sanitizeDocumentForCapture(doc: Document, pageOrigin: string): void {
  sanitizeImagesInDocument(doc, pageOrigin);
  sanitizeCanvasElements(doc);
  stripAnimations(doc);
  doc.querySelectorAll("iframe, video").forEach((el) => el.remove());
}

function shouldIgnoreElement(element: Element): boolean {
  if (element instanceof HTMLCanvasElement) {
    return element.width === 0 || element.height === 0;
  }
  return element instanceof HTMLIFrameElement || element instanceof HTMLVideoElement;
}

async function captureSlideAsDataUrl(item: SlideManifestItem): Promise<string> {
  const slideLabel = item.type === "builtin" ? item.fileName : item.title;
  const srcDoc = await prepareSlideSrcDoc(item);

  const iframe = document.createElement("iframe");
  iframe.style.cssText = `position:fixed;left:-10000px;top:0;width:${SLIDE_W}px;height:${SLIDE_H}px;border:none;opacity:0;pointer-events:none;z-index:-1`;
  iframe.srcdoc = srcDoc;

  document.body.appendChild(iframe);

  try {
    const doc = await waitForSlideDocument(iframe, slideLabel);
    await waitForSlideRender(doc);
    const pageOrigin = iframe.contentWindow?.location.origin ?? window.location.origin;
    const root = getSlideRoot(doc, slideLabel);
    normalizeSlideLayout(doc, root);
    sanitizeDocumentForCapture(doc, pageOrigin);

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
      ignoreElements: shouldIgnoreElement,
      onclone: (clonedDoc) => {
        const clonedRoot = findSlideRoot(clonedDoc);
        if (clonedRoot) {
          normalizeSlideLayout(clonedDoc, clonedRoot);
        }
        sanitizeDocumentForCapture(clonedDoc, pageOrigin);
      },
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error(`캡처 결과가 비어 있습니다 (${slideLabel})`);
    }

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
