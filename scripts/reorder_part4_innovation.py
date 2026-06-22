"""Reorder Part 4 so 비즈니스 혁신 1–8 appear in sequence after the PART 4 divider."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"
TEMP = ROOT / "scripts" / "_reorder_part4_tmp"

# 1–16 unchanged; Part 3 ends at 16; Part 4 divider + 혁신1–8 + extras
NEW_ORDER: list[int] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    18,   # PART 4 divider → 17
    32,   # 혁신1 → 18
    19,   # 혁신2 → 19
    25,   # 혁신3 → 20
    17,   # 혁신4 → 21
    20,   # 혁신5 → 22
    21,   # 혁신6 → 23
    22,   # 혁신7 → 24
    23,   # 혁신8 → 25
    24,   # 타사 비교 → 26
    26,   # 중장기2 → 27
    27,   # 중장기1 → 28
    28,   # PART 5 → 29
    29, 30, 31,
]

OLD_TO_NEW: dict[int, int] = {old: new for new, old in enumerate(NEW_ORDER, start=1)}


def parse_titles() -> dict[int, str]:
    text = (ROOT / "lib" / "slides.ts").read_text(encoding="utf-8")
    return {int(m.group(1)): m.group(2) for m in re.finditer(r'\{ id: (\d+), title: "([^"]*)" \}', text)}


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
            raise SystemExit("slideId missing")
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
    header = text[: bracket + 3]
    end = text.find("];\n\nexport function getSlideDetails")
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
    endSlideId: 28,
  },
  {
    partNumber: 5,
    title: "로드맵 및 미래 비전",
    startSlideId: 29,
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


def bump_title_version() -> None:
    path = ROOT / "lib" / "presentationConfig.ts"
    text = path.read_text(encoding="utf-8")
    text = re.sub(
        r"const CONFIG_TITLE_VERSION = \d+;",
        "const CONFIG_TITLE_VERSION = 6;",
        text,
    )
    path.write_text(text, encoding="utf-8")


def update_part4_divider_topics(new_titles: list[str]) -> None:
    """Update PART 4 divider topic list to match 혁신 1–8 order."""
    path = SLIDES_DIR / "17.html"
    text = path.read_text(encoding="utf-8")
    items = "\n".join(
        f'    <div class="section-topic-item"><div class="topic-dot"></div>'
        f'<span class="topic-text" style="font-size:15px;">{t}</span></div>'
        for t in new_titles[17:25]  # slides 18–25: 혁신1–8
    )
    extra_items = "\n".join(
        f'    <div class="section-topic-item"><div class="topic-dot"></div>'
        f'<span class="topic-text" style="font-size:15px;">{t}</span></div>'
        for t in new_titles[25:28]  # slides 26–28
    )
    new_list = f'  <div class="section-topics-list" style="gap:10px;">\n{items}\n{extra_items}\n  </div>'
    text = re.sub(
        r'  <div class="section-topics-list" style="gap:10px;">.*?</div>\n</div>',
        new_list + "\n</div>",
        text,
        count=1,
        flags=re.DOTALL,
    )
    path.write_text(text, encoding="utf-8")


def main() -> None:
    old_titles = parse_titles()
    new_titles = [old_titles[i] for i in NEW_ORDER]
    reorder_html()
    write_slides_ts(new_titles)
    remap_slide_details()
    write_slide_parts()
    bump_title_version()
    update_part4_divider_topics(new_titles)
    print("Part 4 reordered. 혁신 1–8 at slides 18–25.")
    for n in range(18, 26):
        print(f"  {n}: {new_titles[n - 1]}")


if __name__ == "__main__":
    main()
