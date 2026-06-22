"""Full title audit: TOC vs HTML <title> and visible h1."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"


def parse_toc() -> dict[int, str]:
    text = (ROOT / "lib" / "slides.ts").read_text(encoding="utf-8")
    return {int(m.group(1)): m.group(2) for m in re.finditer(r'\{ id: (\d+), title: "([^"]*)" \}', text)}


def get_html_title(content: str) -> str:
    m = re.search(r"<title[^>]*>([^<]+)</title>", content, re.I)
    return m.group(1).strip() if m else ""


def get_h1(content: str) -> str:
    patterns = [
        r'<h1[^>]*class="[^"]*title-main[^"]*"[^>]*>([\s\S]*?)</h1>',
        r'<h1[^>]*class="[^"]*title-text[^"]*"[^>]*>([\s\S]*?)</h1>',
        r'<h1[^>]*class="[^"]*fass-title-main[^"]*"[^>]*>([\s\S]*?)</h1>',
        r'<h1[^>]*class="[^"]*section-title-ko[^"]*"[^>]*>([\s\S]*?)</h1>',
        r"<h1[^>]*>([\s\S]*?)</h1>",
    ]
    for pat in patterns:
        m = re.search(pat, content, re.I)
        if m:
            text = re.sub(r"<[^>]+>", "", m.group(1))
            return re.sub(r"\s+", " ", text).strip()
    return ""


def main() -> None:
    toc = parse_toc()
    lines: list[str] = []
    for i in sorted(toc):
        path = SLIDES_DIR / f"{i}.html"
        content = path.read_text(encoding="utf-8")
        ht = get_html_title(content)
        h1 = get_h1(content)
        tt = toc[i]
        issues = []
        if ht != tt:
            issues.append("title-tag")
        if h1 and h1 != tt:
            issues.append("h1")
        lines.append(f"{i:2d} | {','.join(issues) or 'OK'} | TOC={tt[:50]}")
        if issues:
            lines.append(f"     title={ht[:60]}")
            lines.append(f"     h1={h1[:60]}")
    (ROOT / "scripts" / "_title_audit.txt").write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    main()
