import { getSlidesDirectoryUrl } from "@/lib/basePath";
import { getBuiltinSlideId, type SlideManifestItem } from "@/lib/presentationConfig";
import { isSlideVisible } from "@/lib/presentationConfig";
import { SLIDE_CANVAS_CLASS } from "@/lib/slideConstants";

const SLIDE_W = 960;
const SLIDE_H = 720;

export type CaptureColorMode = "default" | "light";

const CAPTURE_BACKGROUNDS: Record<CaptureColorMode, string> = {
  default: "#0a0e1a",
  light: "#ffffff",
};

const SLIDE_ROOT_SELECTORS = [
  `.${SLIDE_CANVAS_CLASS}`,
  ".fass-report-slide-root",
  ".section-slide-root",
  ".slide-root",
  ".slide",
  "div[class*='slide-root']",
] as const;

function injectBaseTag(html: string, baseHref: string): string {
  if (/<base\s/i.test(html)) return html;
  return html.replace(/<head([^>]*)>/i, `<head$1><base href="${baseHref}">`);
}

function rewriteSharedAssetUrls(html: string, slidesBaseUrl: string): string {
  return html.replace(/(\b(?:href|src)=["'])shared\//g, `$1${slidesBaseUrl}shared/`);
}

async function prepareCustomSlideSrcDoc(item: SlideManifestItem): Promise<string> {
  if (item.type !== "custom") {
    throw new Error("커스텀 슬라이드만 srcDoc을 생성할 수 있습니다.");
  }

  const slidesBaseUrl = getSlidesDirectoryUrl();
  const html = rewriteSharedAssetUrls(item.html, slidesBaseUrl);
  return injectBaseTag(html, slidesBaseUrl);
}

function findSlideRoot(container: ParentNode): HTMLElement | null {
  for (const selector of SLIDE_ROOT_SELECTORS) {
    const candidate = container.querySelector(selector);
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

async function waitForElementRender(root: HTMLElement): Promise<void> {
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  const images = Array.from(root.querySelectorAll("img"));

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
    new Promise<void>((resolve) => window.setTimeout(resolve, 4000)),
  ]);
}

/** slideMotionProfiles의 COUNTS 와 동일 — CountUp 숫자 애니메이션 대상 */
const COUNT_ANIM_SELECTOR =
  ".hstat-val, .stat-val, .ai-innovation-hero-stat-number, .closing-anchor-stat-value, .roadmap-strategy-desc strong";

/**
 * 등장 애니메이션(framer opacity, GSAP stagger, CountUp 숫자)이 최종 상태로
 * 정착할 때까지 대기한다. `revealAnimatedElements`가 opacity는 강제로 복원하지만,
 * CountUp 숫자는 최종값을 알 수 없어 복원할 수 없으므로 실제로 정착될 시간을 준다.
 */
async function waitForEntranceSettle(root: HTMLElement): Promise<void> {
  const view = root.ownerDocument?.defaultView ?? window;
  const sleep = (ms: number) => new Promise<void>((r) => view.setTimeout(r, ms));

  const hasCounts = Boolean(root.querySelector(COUNT_ANIM_SELECTOR));
  const minWait = hasCounts ? 2200 : 0;
  const start = Date.now();
  const deadline = start + 2800;

  while (Date.now() < deadline) {
    const mc = root.querySelector<HTMLElement>(".slide-motion-content");
    const opacity = mc ? parseFloat(view.getComputedStyle(mc).opacity || "1") : 1;
    const gsapSettled = !mc || mc.classList.contains("slide-gsap-complete");
    if (opacity >= 0.99 && gsapSettled && Date.now() - start >= minWait) break;
    await sleep(100);
  }

  await sleep(150);
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

function getSlideRoot(container: ParentNode, slideLabel: string): HTMLElement {
  const root = findSlideRoot(container);
  if (!root) {
    throw new Error(`슬라이드 루트를 찾을 수 없습니다 (${slideLabel})`);
  }
  return root;
}

function normalizeSlideLayout(root: HTMLElement, background: string): void {
  root.style.position = "relative";
  root.style.left = "0";
  root.style.top = "0";
  root.style.transform = "none";
  root.style.transformOrigin = "top left";
  root.style.width = `${SLIDE_W}px`;
  root.style.height = `${SLIDE_H}px`;
  root.style.margin = "0";
  root.style.filter = "none";
  root.style.overflow = "hidden";
  root.style.background = background;
}

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

function sanitizeImagesInRoot(root: HTMLElement, pageOrigin: string): void {
  root.querySelectorAll("img").forEach((img) => {
    if (isBrokenImage(img) || isCrossOriginImage(img, pageOrigin)) {
      img.remove();
    }
  });
}

function sanitizeCanvasElements(root: HTMLElement): void {
  root.querySelectorAll("canvas").forEach((canvas) => {
    if (canvas.width === 0 || canvas.height === 0) {
      canvas.remove();
    }
  });
}

/**
 * 장식용 다이나믹 레이어 제거.
 *
 * `.slide-dynamic-scanlines`는 `repeating-linear-gradient` 배경을 쓰는데,
 * html2canvas가 이를 타일링하려고 `createPattern()`을 호출하다가 특정 배율에서
 * 0 크기 캔버스를 만들어 예외("width or height of 0")를 던진다. 이 레이어들은
 * 모두 pointer-events:none·저투명도 장식이라 캡처 결과에 영향이 거의 없으므로
 * 캡처 직전 제거한다.
 */
const DECORATIVE_CAPTURE_SELECTOR =
  ".slide-dynamic-particles, .slide-dynamic-aurora, .slide-dynamic-scanlines";

function removeDecorativeLayers(root: HTMLElement): void {
  root.querySelectorAll(DECORATIVE_CAPTURE_SELECTOR).forEach((el) => el.remove());
  root
    .querySelectorAll(".slide-dynamic-sweep-active")
    .forEach((el) => el.classList.remove("slide-dynamic-sweep-active"));
}

/**
 * 크기가 0인 요소의 background-image를 제거한다. html2canvas는 배경 그라디언트를
 * createPattern으로 타일링하는데, 요소 박스가 0 크기면 0 크기 패턴 캔버스가 되어
 * 예외가 발생한다. 남아있는 반복 그라디언트/배경에 대한 보강 방어.
 */
function neutralizeZeroSizeBackgrounds(root: HTMLElement): void {
  const view = root.ownerDocument?.defaultView;
  if (!view) return;
  const els = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];
  for (const el of els) {
    const cs = view.getComputedStyle(el);
    if (cs.backgroundImage === "none") continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      el.style.backgroundImage = "none";
    }
  }
}

/**
 * 등장 애니메이션 초기 상태를 최종(보이는) 상태로 강제한다.
 *
 * 슬라이드는 오프스크린에서 새로 렌더링된 직후 캡처되는데, 그 시점에는
 * framer-motion(`.slide-motion-content`: opacity 0→1, scale, blur)과 GSAP
 * 등장 애니메이션(`gsap.from(..., { opacity: 0, y, scale })`)이 초기 상태라
 * 콘텐츠가 투명(opacity 0)하게 잡혀 결과물이 백지가 된다. 애니메이션 라이브러리는
 * 인라인 스타일로 opacity/transform을 세팅하므로, 캡처 클론에서 이를 최종 상태로
 * 되돌린다. 클론은 라이브 DOM과 분리돼 있어 rAF 루프가 다시 덮어쓰지 않는다.
 */
function revealAnimatedElements(root: HTMLElement): void {
  const motionContents = root.querySelectorAll<HTMLElement>(".slide-motion-content");
  motionContents.forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.filter = "none";
    el.style.removeProperty("will-change");
  });

  // GSAP `from` 등으로 opacity가 1 미만인 인라인 요소를 최종 상태로 복원.
  // (정적 배치용 transform은 보통 opacity가 1이므로 건드리지 않는다.)
  const all = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];
  for (const el of all) {
    const inlineOpacity = el.style.opacity;
    if (inlineOpacity === "" || inlineOpacity === "1") continue;
    const numeric = Number(inlineOpacity);
    if (Number.isNaN(numeric) || numeric >= 1) continue;
    el.style.opacity = "1";
    el.style.removeProperty("transform");
    el.style.removeProperty("filter");
    el.style.removeProperty("will-change");
  }
}

function stripAnimations(root: HTMLElement): void {
  if (root.querySelector("style[data-export-capture]")) return;

  const style = document.createElement("style");
  style.setAttribute("data-export-capture", "true");
  style.textContent =
    "*, *::before, *::after { animation: none !important; transition: none !important; }";
  root.prepend(style);
}

function sanitizeRootForCapture(root: HTMLElement, pageOrigin: string): void {
  removeDecorativeLayers(root);
  revealAnimatedElements(root);
  sanitizeImagesInRoot(root, pageOrigin);
  sanitizeCanvasElements(root);
  neutralizeZeroSizeBackgrounds(root);
  stripAnimations(root);
  root.querySelectorAll("iframe, video").forEach((el) => el.remove());
}

/**
 * 최신 브라우저는 `color-mix(in srgb, ...)` 등을 계산값에서 `color(srgb r g b / a)`
 * 형태로 직렬화한다. html2canvas 는 이 `color()` 함수를 파싱하지 못하고
 * "Attempting to parse an unsupported color function 'color'" 예외를 던지므로,
 * 캡처 직전 클론 트리에서 해당 값을 rgb(a)로 치환한다.
 */
function convertModernColor(value: string): string {
  if (!value || !value.includes("color(")) return value;
  return value.replace(
    /color\(\s*[a-z0-9-]+\s+([^)]+)\)/gi,
    (match, body: string) => {
      const [componentsRaw, alphaRaw] = body.split("/");
      const nums = componentsRaw.trim().split(/\s+/).map((n) => parseFloat(n));
      if (nums.length < 3 || nums.some((n) => Number.isNaN(n))) return match;
      const alpha = alphaRaw !== undefined ? parseFloat(alphaRaw) : 1;
      const to255 = (n: number) => Math.round(Math.min(1, Math.max(0, n)) * 255);
      const [r, g, b] = [to255(nums[0]), to255(nums[1]), to255(nums[2])];
      return alpha >= 1 || Number.isNaN(alpha)
        ? `rgb(${r}, ${g}, ${b})`
        : `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
  );
}

const PSEUDO_ELEMENTS = ["::before", "::after"] as const;

/**
 * Collects every longhand property whose computed value still contains an
 * unsupported `color()` / `color-mix()` serialization. Scanning the full
 * declaration list (instead of a fixed whitelist) guarantees we also catch
 * shorthands like `filter`, `mask`, `background`, gradients, etc.
 */
function collectModernColorDecls(computed: CSSStyleDeclaration): Array<[string, string]> {
  const decls: Array<[string, string]> = [];
  for (let i = 0; i < computed.length; i++) {
    const prop = computed.item(i);
    if (!prop) continue;
    const val = computed.getPropertyValue(prop);
    if (val && val.includes("color(")) {
      decls.push([prop, convertModernColor(val)]);
    }
  }
  return decls;
}

function neutralizeModernColors(root: HTMLElement): void {
  const doc = root.ownerDocument;
  const view = doc?.defaultView;
  if (!view || !doc) return;

  const elements: HTMLElement[] = [
    root,
    ...Array.from(root.querySelectorAll<HTMLElement>("*")),
  ];

  const pseudoRules: string[] = [];
  let pseudoSeq = 0;

  for (const el of elements) {
    if (!el.style) continue;

    const computed = view.getComputedStyle(el);
    for (const [prop, converted] of collectModernColorDecls(computed)) {
      el.style.setProperty(prop, converted);
    }

    // Pseudo-elements cannot receive inline styles, so collect targeted overrides
    // into an injected stylesheet keyed by a unique data attribute.
    for (const pseudo of PSEUDO_ELEMENTS) {
      const pseudoComputed = view.getComputedStyle(el, pseudo);
      const content = pseudoComputed.getPropertyValue("content");
      if (!content || content === "none" || content === "normal") continue;

      const decls = collectModernColorDecls(pseudoComputed);
      if (decls.length > 0) {
        const marker = `data-export-neu-${pseudoSeq++}`;
        el.setAttribute(marker, "");
        const body = decls.map(([prop, converted]) => `${prop}: ${converted} !important;`).join("");
        pseudoRules.push(`[${marker}]${pseudo}{${body}}`);
      }
    }
  }

  if (pseudoRules.length > 0) {
    const style = doc.createElement("style");
    style.setAttribute("data-export-neu-pseudo", "true");
    style.textContent = pseudoRules.join("\n");
    (doc.head ?? root).prepend(style);
  }
}

function shouldIgnoreElement(element: Element): boolean {
  if (element instanceof HTMLCanvasElement) {
    return element.width === 0 || element.height === 0;
  }
  return element instanceof HTMLIFrameElement || element instanceof HTMLVideoElement;
}

function getCaptureBackground(root: HTMLElement): string {
  if (
    root.matches(".section-slide-root, .fass-report-slide-root") ||
    root.querySelector(".section-slide-root, .fass-report-slide-root")
  ) {
    return CAPTURE_BACKGROUNDS.default;
  }
  return "#ffffff";
}

function prepareRootForCapture(root: HTMLElement, pageOrigin: string, background?: string): void {
  const bg = background ?? getCaptureBackground(root);
  normalizeSlideLayout(root, bg);
  sanitizeRootForCapture(root, pageOrigin);
}

/**
 * 캡처 동안 `CanvasRenderingContext2D.prototype.createPattern`을 임시 래핑한다.
 *
 * html2canvas의 URL 배경 렌더 경로는 `createPattern(resizeImage(image, w, h), 'repeat')`
 * 를 가드 없이 호출한다. `resizeImage`는 목표 크기가 원본과 같으면 원본을 그대로
 * 반환하므로, `url()` 배경 이미지의 고유 크기가 0(예: Chrome이 SVG data URI 배경을
 * 0-크기로 로드하는 알려진 이슈)이면 0-크기 canvas가 넘어가
 * "The image argument is a canvas element with a width or height of 0" 예외가 난다.
 * 0-크기 소스가 오면 1x1 투명 패턴으로 대체해 예외를 원천 차단한다(아티팩트 없음).
 *
 * html2canvas의 렌더 canvas는 메인 `document`에서 생성되므로 메인 윈도우 프로토타입
 * 한 곳만 패치하면 builtin/iframe 경로 모두 커버된다. 끝나면 반드시 원복한다.
 */
async function withCreatePatternGuard<T>(fn: () => Promise<T>): Promise<T> {
  const proto = CanvasRenderingContext2D.prototype;
  const original = proto.createPattern;
  proto.createPattern = function (
    this: CanvasRenderingContext2D,
    image: CanvasImageSource,
    repetition: string | null,
  ): CanvasPattern | null {
    const w = (image as CanvasImageSource & { width?: number }).width;
    const h = (image as CanvasImageSource & { height?: number }).height;
    if (!w || !h) {
      const safe = document.createElement("canvas");
      safe.width = 1;
      safe.height = 1;
      return original.call(this, safe, repetition);
    }
    return original.call(this, image, repetition);
  } as typeof proto.createPattern;

  try {
    return await fn();
  } finally {
    proto.createPattern = original;
  }
}

async function captureElementAsDataUrl(
  root: HTMLElement,
  slideLabel: string,
  colorMode: CaptureColorMode,
): Promise<string> {
  const pageOrigin = window.location.origin;
  const captureBg = getCaptureBackground(root);
  prepareRootForCapture(root, pageOrigin, captureBg);

  const { default: html2canvas } = await import("html2canvas");
  const canvas = await withCreatePatternGuard(() =>
    html2canvas(root, {
      width: SLIDE_W,
      height: SLIDE_H,
      windowWidth: SLIDE_W,
      windowHeight: SLIDE_H,
      scale: 1,
      useCORS: false,
      allowTaint: true,
      foreignObjectRendering: false,
      logging: false,
      backgroundColor: captureBg,
      ignoreElements: shouldIgnoreElement,
      onclone: (clonedDoc) => {
        const clonedRoot = findSlideRoot(clonedDoc);
        if (clonedRoot) {
          prepareRootForCapture(clonedRoot, pageOrigin, getCaptureBackground(clonedRoot));
          neutralizeModernColors(clonedRoot);
        }
      },
    }),
  );

  if (canvas.width === 0 || canvas.height === 0) {
    throw new Error(`캡처 결과가 비어 있습니다 (${slideLabel})`);
  }

  const outputCanvas = colorMode === "light" ? applyLightGrayscaleToCanvas(canvas) : canvas;
  return outputCanvas.toDataURL("image/png");
}

async function captureBuiltinSlideReact(
  slideId: number,
  slideLabel: string,
  colorMode: CaptureColorMode,
): Promise<string> {
  const { createRoot } = await import("react-dom/client");
  const { createElement, Suspense } = await import("react");
  const { getSlideLoader } = await import("@/lib/slideRegistry");

  const loader = getSlideLoader(slideId);
  if (!loader) {
    throw new Error(`슬라이드 컴포넌트를 찾을 수 없습니다 (${slideLabel})`);
  }

  const { default: SlideComponent } = await loader();

  const container = document.createElement("div");
  container.style.cssText = `position:fixed;left:-10000px;top:0;width:${SLIDE_W}px;height:${SLIDE_H}px;overflow:hidden;opacity:0;pointer-events:none;z-index:-1`;
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(createElement(Suspense, { fallback: null }, createElement(SlideComponent)));

  try {
    await new Promise((r) => window.setTimeout(r, 100));
    const slideRoot = getSlideRoot(container, slideLabel);
    await waitForElementRender(slideRoot);
    await waitForEntranceSettle(slideRoot);
    return await captureElementAsDataUrl(slideRoot, slideLabel, colorMode);
  } finally {
    root.unmount();
    container.remove();
  }
}

async function captureCustomSlideIframe(
  item: SlideManifestItem,
  slideLabel: string,
  colorMode: CaptureColorMode,
): Promise<string> {
  const srcDoc = await prepareCustomSlideSrcDoc(item);

  const iframe = document.createElement("iframe");
  iframe.style.cssText = `position:fixed;left:-10000px;top:0;width:${SLIDE_W}px;height:${SLIDE_H}px;border:none;opacity:0;pointer-events:none;z-index:-1`;
  iframe.srcdoc = srcDoc;

  document.body.appendChild(iframe);

  try {
    const doc = await waitForSlideDocument(iframe, slideLabel);
    await waitForSlideRender(doc);
    const pageOrigin = iframe.contentWindow?.location.origin ?? window.location.origin;
    const root = getSlideRoot(doc, slideLabel);

    const captureBg = getCaptureBackground(root);

    doc.documentElement.style.overflow = "hidden";
    doc.body.style.cssText = `margin:0;padding:0;width:${SLIDE_W}px;height:${SLIDE_H}px;overflow:hidden;background:${captureBg}`;
    prepareRootForCapture(root, pageOrigin, captureBg);

    const { default: html2canvas } = await import("html2canvas");
    const canvas = await withCreatePatternGuard(() =>
      html2canvas(root, {
        width: SLIDE_W,
        height: SLIDE_H,
        windowWidth: SLIDE_W,
        windowHeight: SLIDE_H,
        scale: 1,
        useCORS: false,
        allowTaint: true,
        foreignObjectRendering: false,
        logging: false,
        backgroundColor: captureBg,
        ignoreElements: shouldIgnoreElement,
        onclone: (clonedDoc) => {
          const clonedRoot = findSlideRoot(clonedDoc);
          if (clonedRoot) {
            prepareRootForCapture(clonedRoot, pageOrigin, getCaptureBackground(clonedRoot));
            neutralizeModernColors(clonedRoot);
          }
        },
      }),
    );

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error(`캡처 결과가 비어 있습니다 (${slideLabel})`);
    }

    const outputCanvas = colorMode === "light" ? applyLightGrayscaleToCanvas(canvas) : canvas;
    return outputCanvas.toDataURL("image/png");
  } finally {
    iframe.remove();
  }
}

async function captureSlideAsDataUrl(
  item: SlideManifestItem,
  colorMode: CaptureColorMode = "default",
): Promise<string> {
  const slideLabel = item.title;
  const slideId = getBuiltinSlideId(item);

  if (slideId !== null) {
    return captureBuiltinSlideReact(slideId, slideLabel, colorMode);
  }

  return captureCustomSlideIframe(item, slideLabel, colorMode);
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
