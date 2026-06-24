import { getSlideHtmlUrl, getSlidesDirectoryUrl } from "@/lib/basePath";
import type { SlideManifestItem } from "@/lib/presentationConfig";
import { isSlideVisible } from "@/lib/presentationConfig";

const SLIDE_W = 960;
const SLIDE_H = 720;

export type CaptureColorMode = "default" | "light";

const CAPTURE_BACKGROUNDS: Record<CaptureColorMode, string> = {
  default: "#0a0e1a",
  light: "#ffffff",
};

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
  doc.body.style.cssText = `margin:0;padding:0;width:${SLIDE_W}px;height:${SLIDE_H}px;overflow:hidden;background:${CAPTURE_BACKGROUNDS.default}`;
  root.style.position = "relative";
  root.style.left = "0";
  root.style.top = "0";
  root.style.transform = "none";
  root.style.transformOrigin = "top left";
  root.style.width = `${SLIDE_W}px`;
  root.style.height = `${SLIDE_H}px`;
  root.style.margin = "0";
  root.style.filter = "none";
}

/** 캡처 완료 후 회색조·밝은 배경 반전 (html2canvas 전 filter 적용 시 createPattern 오류 방지) */
function applyLightGrayscaleToCanvas(source: HTMLCanvasElement): HTMLCanvasElement {
  const output = document.createElement("canvas");
  output.width = source.width;
  output.height = source.height;

  const ctx = output.getContext("2d");
  if (!ctx) {
    throw new Error("회색조 변환에 실패했습니다.");
  }

  ctx.filter = "invert(1) grayscale(1)";
  ctx.drawImage(source, 0, 0);
  return output;
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

function prepareDocumentForCapture(doc: Document, root: HTMLElement, pageOrigin: string): void {
  normalizeSlideLayout(doc, root);
  sanitizeDocumentForCapture(doc, pageOrigin);
}

async function captureSlideAsDataUrl(
  item: SlideManifestItem,
  colorMode: CaptureColorMode = "default",
): Promise<string> {
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
    prepareDocumentForCapture(doc, root, pageOrigin);

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
      backgroundColor: CAPTURE_BACKGROUNDS.default,
      ignoreElements: shouldIgnoreElement,
      onclone: (clonedDoc) => {
        const clonedRoot = findSlideRoot(clonedDoc);
        if (clonedRoot) {
          prepareDocumentForCapture(clonedDoc, clonedRoot, pageOrigin);
        }
      },
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error(`캡처 결과가 비어 있습니다 (${slideLabel})`);
    }

    const outputCanvas = colorMode === "light" ? applyLightGrayscaleToCanvas(canvas) : canvas;

    return outputCanvas.toDataURL("image/png");
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
  colorMode: CaptureColorMode = "default",
): Promise<string[]> {
  const targets = getExportableSlides(slides);
  const images: string[] = [];

  for (let i = 0; i < targets.length; i++) {
    onProgress?.({
      current: i + 1,
      total: targets.length,
      label: targets[i].title,
    });
    images.push(await captureSlideAsDataUrl(targets[i], colorMode));
  }

  return images;
}

/** 4:3 슬라이드 (960×720px @96dpi ≈ 254×190.5mm) */
const PDF_PAGE_W_MM = 254;
const PDF_PAGE_H_MM = 190.5;

export type PdfExportOptions = {
  colorMode?: CaptureColorMode;
};

export async function exportSlidesToPdf(
  slides: SlideManifestItem[],
  fileName?: string,
  onProgress?: (progress: ExportProgress) => void,
  options?: PdfExportOptions,
): Promise<void> {
  const colorMode = options?.colorMode ?? "default";
  const resolvedFileName =
    fileName ?? (colorMode === "light" ? "FaSS-발표자료-회색조.pdf" : "FaSS-발표자료.pdf");
  const images = await captureSlidesAsImages(slides, onProgress, colorMode);
  const { jsPDF } = await import("jspdf");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [PDF_PAGE_W_MM, PDF_PAGE_H_MM],
    compress: true,
  });

  images.forEach((dataUrl, index) => {
    if (index > 0) {
      pdf.addPage([PDF_PAGE_W_MM, PDF_PAGE_H_MM], "landscape");
    }
    pdf.addImage(dataUrl, "PNG", 0, 0, PDF_PAGE_W_MM, PDF_PAGE_H_MM, undefined, "FAST");
  });

  pdf.save(resolvedFileName);
}
