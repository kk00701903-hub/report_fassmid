/**
 * CSS 색상 유틸리티.
 *
 * html2canvas 등 캡처 라이브러리는 최신 `color()` / `color-mix()` 직렬화를
 * 파싱하지 못한다. 동적 accent 색상을 CSS `color-mix()` 없이 표현하기 위해
 * 색상을 rgb 트리플릿("r, g, b")으로 넘겨 `rgba()` 알파를 적용하거나,
 * 불투명 혼합값은 여기서 미리 계산해 표준 HEX로 넘긴다.
 */

function parseHex(hex: string): [number, number, number] | null {
  const m = hex.trim().replace(/^#/, "");
  if (m.length === 3) {
    const r = parseInt(m[0] + m[0], 16);
    const g = parseInt(m[1] + m[1], 16);
    const b = parseInt(m[2] + m[2], 16);
    return [r, g, b];
  }
  if (m.length === 6) {
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    if ([r, g, b].some(Number.isNaN)) return null;
    return [r, g, b];
  }
  return null;
}

/** "#0078d4" → "0, 120, 212" (rgba(var(--x-rgb), a) 형태로 사용) */
export function hexToRgbTriplet(hex: string): string {
  const rgb = parseHex(hex);
  if (!rgb) return "0, 120, 212";
  return rgb.join(", ");
}

const toHex2 = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");

/**
 * `color-mix(in srgb, a weightA%, b)` 와 동일한 sRGB 선형 혼합을 미리 계산한다.
 * (두 색이 모두 불투명한 경우에만 사용 — 투명 혼합은 rgba 알파로 대체)
 * @param weightA 0~1 (a 색상의 비율)
 */
export function mixHex(a: string, b: string, weightA: number): string {
  const ca = parseHex(a);
  const cb = parseHex(b);
  if (!ca || !cb) return a;
  const w = Math.min(1, Math.max(0, weightA));
  const r = ca[0] * w + cb[0] * (1 - w);
  const g = ca[1] * w + cb[1] * (1 - w);
  const bch = ca[2] * w + cb[2] * (1 - w);
  return `#${toHex2(r)}${toHex2(g)}${toHex2(bch)}`;
}
