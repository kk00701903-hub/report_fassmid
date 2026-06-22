"""Move slide 6 to position 4 and update PART 1 metadata."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"

TITLE_3 = "디지털 트렌드 — MSA · Cloud · Open Source · AI"
TITLE_4 = "디지털 트렌드 — AI 디지털 워커 (AI Digital Worker)"


def reorder_html_files(from_id: int, to_id: int) -> None:
    count = max(int(p.stem) for p in SLIDES_DIR.glob("*.html"))
    slides = {i: (SLIDES_DIR / f"{i}.html").read_bytes() for i in range(1, count + 1)}
    content = slides.pop(from_id)
    if from_id > to_id:
        for i in range(from_id, to_id, -1):
            slides[i] = slides[i - 1]
    else:
        for i in range(from_id, to_id):
            slides[i] = slides[i + 1]
    slides[to_id] = content
    for i in range(1, count + 1):
        (SLIDES_DIR / f"{i}.html").write_bytes(slides[i])


def reorder_titles(titles: list[str], from_idx: int, to_idx: int) -> list[str]:
    item = titles.pop(from_idx)
    titles.insert(to_idx, item)
    return titles


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


def parse_slide_detail_blocks(text: str) -> dict[int, str]:
    pat = re.compile(r"  \{\n    slideId: (\d+),\n    topics: \[[\s\S]*?\n    \],\n  \},?\n")
    return {int(m.group(1)): m.group(0) for m in pat.finditer(text)}


def reorder_slide_details(from_id: int, to_id: int) -> None:
    path = ROOT / "lib" / "slideDetails.ts"
    text = path.read_text(encoding="utf-8")
    blocks = parse_slide_detail_blocks(text)

    if from_id not in blocks or to_id not in blocks:
        raise SystemExit(f"Missing detail blocks for {from_id} or {to_id}")

    content = blocks.pop(from_id)
    if from_id > to_id:
        for i in range(from_id, to_id, -1):
            blocks[i] = blocks[i - 1]
    else:
        for i in range(from_id, to_id):
            blocks[i] = blocks[i + 1]
    blocks[to_id] = content

    ordered = []
    for slide_id in sorted(blocks):
        block = blocks[slide_id]
        block = re.sub(r"slideId: \d+,", f"slideId: {slide_id},", block, count=1)
        ordered.append(block)

    array_start = text.find("export const SLIDE_DETAILS")
    bracket = text.find("= [", array_start)
    if bracket == -1:
        raise SystemExit("SLIDE_DETAILS array start not found")
    header = text[: bracket + 3]
    end = text.find("];\n\nexport function getSlideDetails")
    if end == -1:
        raise SystemExit("SLIDE_DETAILS footer not found")
    footer = text[end:]
    path.write_text(header + "\n" + "".join(ordered) + footer, encoding="utf-8")


def patch_html_titles() -> None:
    slide3 = SLIDES_DIR / "3.html"
    text3 = slide3.read_text(encoding="utf-8")
    text3 = text3.replace(
        "디지털 전환 4대 트렌드 — MSA · Cloud · Open Source · AI",
        TITLE_3,
    )
    slide3.write_text(text3, encoding="utf-8")

    slide4 = SLIDES_DIR / "4.html"
    text4 = slide4.read_text(encoding="utf-8")
    text4 = text4.replace(
        "<title>AI 디지털 워커 (AI Digital Worker)</title>",
        f"<title>{TITLE_4}</title>",
    )
    text4 = text4.replace(
        "<h1 class=\"title-text\">AI 디지털 워커 (AI Digital Worker)</h1>",
        f"<h1 class=\"title-text\">{TITLE_4}</h1>",
    )
    slide4.write_text(text4, encoding="utf-8")

    slide2 = SLIDES_DIR / "2.html"
    text2 = slide2.read_text(encoding="utf-8")
    old_topics = """    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">디지털 전환 4대 트렌드 — MSA · Cloud · Open Source · AI</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">FaSS 플랫폼 아이덴티티 — Faster · Agile · Smarter · Stronger 비전 및 로고</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">Executive Summary — 프로젝트 종합 요약 및 중장기 전략 로드맵 (2026.06 ~ 2027.H2)</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">AI 디지털 워커 (AI Digital Worker) — 24/7 자동화 + Human-in-the-loop IT 조직 모델</span>
    </div>"""
    new_topics = f"""    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">{TITLE_3}</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">{TITLE_4} — 24/7 자동화 + Human-in-the-loop IT 조직 모델</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">FaSS 플랫폼 아이덴티티 — Faster · Agile · Smarter · Stronger 비전 및 로고</span>
    </div>
    <div class="section-topic-item">
      <div class="topic-dot"></div>
      <span class="topic-text">Executive Summary — 프로젝트 종합 요약 및 중장기 전략 로드맵 (2026.06 ~ 2027.H2)</span>
    </div>"""
    text2 = text2.replace(old_topics, new_topics)
    slide2.write_text(text2, encoding="utf-8")


def patch_slide_details_titles() -> None:
    path = ROOT / "lib" / "slideDetails.ts"
    text = path.read_text(encoding="utf-8")
    text = text.replace('title: "디지털 전환 4대 트렌드"', 'title: "디지털 트렌드"')
    path.write_text(text, encoding="utf-8")


def main() -> None:
    reorder_html_files(6, 4)

    text = (ROOT / "lib" / "slides.ts").read_text(encoding="utf-8")
    titles = re.findall(r'\{ id: \d+, title: "([^"]*)" \}', text)
    titles = reorder_titles(titles, from_idx=5, to_idx=3)
    titles[2] = TITLE_3
    titles[3] = TITLE_4
    write_slides_ts(titles)

    reorder_slide_details(6, 4)
    patch_html_titles()
    patch_slide_details_titles()
    print("Done. New PART1 order: 3=trends, 4=digital worker, 5=identity, 6=exec summary")


if __name__ == "__main__":
    main()
