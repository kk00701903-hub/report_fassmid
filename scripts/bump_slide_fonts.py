"""Bump undersized font-size values across slide HTML for readability."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"

SIZE_BUMP: dict[int, int] = {
    6: 8,
    7: 9,
    8: 10,
    9: 11,
    10: 12,
    11: 12,
}

SECOND_BUMP: dict[int, int] = {
    8: 10,
    9: 12,
    10: 12,
    11: 12,
}

BODY_BUMP: dict[int, int] = {12: 13}

TITLE_BUMP: dict[int, int] = {
    20: 26,
    21: 26,
    22: 26,
    24: 28,
}

TITLE_PATTERNS = [
    re.compile(r"(h1(?:\.[\w-]+)?\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-main(?:-text)?\s*\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-region-text\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-text-content\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-text\s*\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-main-text\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
]


def _map_sizes(text: str, mapping: dict[int, int]) -> str:
    def repl(m: re.Match[str]) -> str:
        n = int(m.group(1))
        if n in mapping:
            return f"font-size:{mapping[n]}px"
        return m.group(0)

    return re.sub(r"font-size:\s*(\d+)px", repl, text)


def bump_title_rules(text: str) -> str:
    for pat in TITLE_PATTERNS:
        def repl(m: re.Match[str]) -> str:
            prefix, n_s = m.group(1), int(m.group(2))
            n = TITLE_BUMP.get(n_s, n_s)
            return f"{prefix}font-size:{n}px"

        text = pat.sub(repl, text)
    return text


def process_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    updated = _map_sizes(original, SIZE_BUMP)
    updated = _map_sizes(updated, SECOND_BUMP)
    updated = _map_sizes(updated, BODY_BUMP)
    updated = bump_title_rules(updated)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = 0
    for path in sorted(SLIDES_DIR.glob("*.html")):
        if process_file(path):
            changed += 1
            print(f"updated: {path.name}")
    print(f"done: {changed} files")


if __name__ == "__main__":
    main()
