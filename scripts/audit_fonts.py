"""Audit slide HTML for non-standard font-family declarations."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"

ALLOWED = {
    "Noto Sans KR",
    "Font Awesome 7 Free",
    "Font Awesome 6 Free",
    "Font Awesome 7 Brands",
    "Font Awesome 6 Brands",
    "Consolas",
    "Courier New",
    "monospace",
    "inherit",
    "var(--ppt-font)",
    "var(--ppt-font-body)",
    "var(--ppt-font-display)",
}

FONT_RE = re.compile(r"font-family\s*:\s*([^;}{]+)", re.I)


def extract_families(value: str) -> list[str]:
    parts: list[str] = []
    for chunk in value.split(","):
        chunk = chunk.strip().strip('"').strip("'")
        if chunk:
            parts.append(chunk)
    return parts


def main() -> None:
    issues: list[str] = []
    title_sizes: dict[int, list[int]] = {}

    for path in sorted(SLIDES_DIR.glob("*.html")):
        slide_id = int(path.stem)
        text = path.read_text(encoding="utf-8")

        for m in FONT_RE.finditer(text):
            raw = m.group(1).strip()
            for fam in extract_families(raw):
                if fam not in ALLOWED and not fam.startswith("var("):
                    issues.append(f"{slide_id}: unexpected font-family -> {fam!r} ({raw})")

        sizes = [int(n) for n in re.findall(r"font-size\s*:\s*(\d+)px", text)]
        title_sizes[slide_id] = sizes

    print("=== Font family issues ===")
    if issues:
        for line in issues:
            print(line)
    else:
        print("none")

    print("\n=== Title-size outliers (>=28px in file) ===")
    for sid in sorted(title_sizes):
        big = [s for s in title_sizes[sid] if s >= 28]
        if big:
            print(f"  slide {sid}: {sorted(set(big))}")


if __name__ == "__main__":
    main()
