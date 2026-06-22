"""Reorder slides 15-30 per 기존→변경 mapping table (Jun 2026)."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"
TEMP = ROOT / "scripts" / "_reorder_jun22_tmp"

# new position -> original slide id (1-14 and 31-32 unchanged)
NEW_ORDER: list[int] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    18, 17, 19, 21, 22, 23, 24, 25, 27, 28, 29, 30, 26, 20, 15, 16,
    31, 32,
]

# original slide id -> new position
OLD_TO_NEW: dict[int, int] = {old: new for new, old in enumerate(NEW_ORDER, start=1)}


def parse_titles() -> list[str]:
    text = (ROOT / "lib" / "slides.ts").read_text(encoding="utf-8")
    return re.findall(r'\{ id: \d+, title: "([^"]*)" \}', text)


def write_slides_ts(titles: list[str]) -> None:
    lines = [
        "export type Slide = {",
        "  id: number;",
        "  title: string;",
        "};",
        "",
        f"export const SLIDE_COUNT = {len(titles)};",
        "",
        "export const SLIDES: Slide[] = [",
    ]
    for i, title in enumerate(titles, start=1):
        lines.append(f'  {{ id: {i}, title: "{title}" }},')
    lines.extend(
        [
            "];",
            "",
            "export function getSlideById(id: number): Slide | undefined {",
            "  return SLIDES.find((slide) => slide.id === id);",
            "}",
            "",
            "export function isValidSlideId(id: number): boolean {",
            "  return id >= 1 && id <= SLIDE_COUNT;",
            "}",
            "",
        ]
    )
    (ROOT / "lib" / "slides.ts").write_text("\n".join(lines), encoding="utf-8")


def reorder_html() -> None:
    if TEMP.exists():
        shutil.rmtree(TEMP)
    TEMP.mkdir()

    for old in SLIDES_DIR.glob("*.html"):
        shutil.copy2(old, TEMP / old.name)

    for f in SLIDES_DIR.glob("*.html"):
        f.unlink()

    for new_id, old_id in enumerate(NEW_ORDER, start=1):
        shutil.copy2(TEMP / f"{old_id}.html", SLIDES_DIR / f"{new_id}.html")

    shutil.rmtree(TEMP)


def parse_detail_blocks(text: str) -> list[tuple[int, str]]:
    blocks: list[tuple[int, str]] = []
    marker = "  {\n    slideId:"
    end_marker = "\n    ],\n  },"
    i = 0
    while True:
        start = text.find(marker, i)
        if start == -1:
            break
        end = text.find(end_marker, start)
        if end == -1:
            raise SystemExit("slideDetails block end not found")
        end += len(end_marker)
        if end < len(text) and text[end] == "\n":
            end += 1
        block = text[start:end]
        m = re.search(r"slideId: (\d+),", block)
        if not m:
            raise SystemExit("slideId missing in slideDetails block")
        blocks.append((int(m.group(1)), block))
        i = end
    return blocks


def remap_slide_details() -> None:
    path = ROOT / "lib" / "slideDetails.ts"
    text = path.read_text(encoding="utf-8")

    entries: list[tuple[int, str]] = []
    for old_id, block in parse_detail_blocks(text):
        new_id = OLD_TO_NEW.get(old_id)
        if new_id is None:
            continue
        block = re.sub(r"slideId: \d+,", f"slideId: {new_id},", block, count=1)
        entries.append((new_id, block))

    entries.sort(key=lambda x: x[0])
    array_start = text.find("export const SLIDE_DETAILS")
    bracket = text.find("= [", array_start)
    if bracket == -1:
        raise SystemExit("SLIDE_DETAILS array start not found")
    header = text[: bracket + 3]
    end = text.find("];\n\nexport function getSlideDetails")
    if end == -1:
        raise SystemExit("SLIDE_DETAILS footer not found")
    footer = text[end:]
    path.write_text(header + "\n" + "".join(b for _, b in entries) + footer, encoding="utf-8")


def write_slide_parts() -> None:
    content = """/** 슬라이드 ID(내장 HTML 번호) 기준 PART 구간 정의 */

export type SlidePart = {
  partNumber: number;
  title: string;
};

export const SLIDE_PARTS: Array<SlidePart & { startSlideId: number; endSlideId: number }> = [
  {
    partNumber: 1,
    title: "전략적 비전 및 목표",
    startSlideId: 2,
    endSlideId: 6,
  },
  {
    partNumber: 2,
    title: "프로젝트 진행 경과 및 방향성",
    startSlideId: 7,
    endSlideId: 11,
  },
  {
    partNumber: 3,
    title: "기술 스택 및 아키텍처",
    startSlideId: 12,
    endSlideId: 16,
  },
  {
    partNumber: 4,
    title: "혁신 및 검증",
    startSlideId: 17,
    endSlideId: 25,
  },
  {
    partNumber: 5,
    title: "로드맵 및 미래 비전",
    startSlideId: 26,
    endSlideId: 32,
  },
];

/** PART 간지 슬라이드(목차 하이라이트용) */
export function isPartDividerTitle(title: string): boolean {
  return /^PART\\s+\\d+/i.test(title.trim());
}

/** 표지(1p) 등 PART 미표시 슬라이드 */
export function getSlidePart(builtinSlideId: number | null): SlidePart | null {
  if (builtinSlideId === null || builtinSlideId <= 1) return null;

  const part = SLIDE_PARTS.find(
    (p) => builtinSlideId >= p.startSlideId && builtinSlideId <= p.endSlideId,
  );

  if (!part) return null;

  return { partNumber: part.partNumber, title: part.title };
}

export function getBuiltinSlideIdFromFileName(fileName: string): number | null {
  const match = fileName.match(/^(\\d+)\\.html$/i);
  return match ? Number(match[1]) : null;
}
"""
    (ROOT / "lib" / "slideParts.ts").write_text(content, encoding="utf-8")


def update_legacy_redirects() -> None:
    path = ROOT / "lib" / "slideRedirects.ts"
    text = path.read_text(encoding="utf-8")
    # 이전 배포: PART5=30, 로드맵=31, 맺음말=32 → 재배치 후 PART5=26
    extra = """  19: 17, // PART 4 간지 (구 19p)
  30: 26, // PART 5 간지 (구 30p)
"""
    if "19: 17" not in text:
        text = text.replace(
            "export const LEGACY_SLIDE_REDIRECTS: Record<number, number> = {\n",
            "export const LEGACY_SLIDE_REDIRECTS: Record<number, number> = {\n" + extra,
        )
        path.write_text(text, encoding="utf-8")


def main() -> None:
    old_titles = parse_titles()
    new_titles = [old_titles[old_id - 1] for old_id in NEW_ORDER]
    reorder_html()
    write_slides_ts(new_titles)
    remap_slide_details()
    write_slide_parts()
    update_legacy_redirects()
    print("Reordered 32 slides.")
    for new_id in range(15, 31):
        print(f"  {new_id:2d} <- was {NEW_ORDER[new_id - 1]}")


if __name__ == "__main__":
    main()
