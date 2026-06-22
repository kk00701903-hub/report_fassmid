"""Sync public/slides/*.html <title> and h1 from lib/slides.ts."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"

H1_CLASS_PATTERN = re.compile(
    r'(<h1[^>]*class="[^"]*(?:title-main|title-text|title-text-content|title-text-main|title-main-text)[^"]*"[^>]*>)([\s\S]*?)(</h1>)',
    re.I,
)


def parse_toc() -> dict[int, str]:
    text = (ROOT / "lib" / "slides.ts").read_text(encoding="utf-8")
    return {int(m.group(1)): m.group(2) for m in re.finditer(r'\{ id: (\d+), title: "([^"]*)" \}', text)}


def escape_html(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def sync_slide(slide_id: int, title: str) -> bool:
    path = SLIDES_DIR / f"{slide_id}.html"
    if not path.exists():
        return False
    content = path.read_text(encoding="utf-8")
    original = content

    content = re.sub(
        r"<title[^>]*>[^<]*</title>",
        f"<title>{escape_html(title)}</title>",
        content,
        count=1,
        flags=re.I,
    )

    if slide_id == 1:
        # Cover: keep visual layout, ensure title tag only (h1 is stylized)
        pass
    elif slide_id == 33:
        content = re.sub(
            r"(<h1[^>]*>)([\s\S]*?)(</h1>)",
            rf"\1{escape_html(title)}\3",
            content,
            count=1,
            flags=re.I,
        )
    elif H1_CLASS_PATTERN.search(content):
        content = H1_CLASS_PATTERN.sub(
            lambda m: f"{m.group(1)}{escape_html(title)}{m.group(3)}",
            content,
            count=1,
        )

    if content != original:
        path.write_text(content, encoding="utf-8")
        return True
    return False


def main() -> None:
    toc = parse_toc()
    changed = 0
    for slide_id, title in sorted(toc.items()):
        if sync_slide(slide_id, title):
            changed += 1
            print(f"updated {slide_id}: {title[:50]}")
    print(f"done: {changed} files updated")


if __name__ == "__main__":
    main()
