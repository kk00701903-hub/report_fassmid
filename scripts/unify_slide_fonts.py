"""Unify Noto Sans KR typography across all slide HTML files."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"
FONT_LINK = '<link rel="stylesheet" href="shared/slide-fonts.css">'
NOTO = '"Noto Sans KR", sans-serif'
IBM_PLEX = '"IBM Plex Sans KR", sans-serif'

FONT_IMPORT_RE = re.compile(
    r'@import\s+url\(["\']?https://fonts\.googleapis\.com/css2\?'
    r'family=IBM\+Plex\+Sans\+KR[^"\']*["\']?\)\s*;?\s*',
    re.I,
)
NOTO_IMPORT_RE = re.compile(
    r'@import\s+url\(["\']?https://fonts\.googleapis\.com/css2\?'
    r'family=Noto\+Sans\+KR[^"\']*["\']?\)\s*;?\s*',
    re.I,
)

TITLE_PATTERNS = [
    re.compile(r"(h1(?:\.[\w-]+)?\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-main(?:-text)?\s*\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-region-text\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-text-content\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-text\s*\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.title-main-text\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.fass-title-main[^}]*\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
    re.compile(r"(\.section-title-ko\s*\{[^}]*?)font-size:\s*(\d+)px", re.DOTALL),
]

INLINE_BODY_FIX = re.compile(
    r'style="([^"]*?)font-size:\s*16px([^"]*?)"',
    re.I,
)


def ensure_font_link(text: str) -> str:
    if "shared/slide-fonts.css" in text:
        return text
    marker = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/css/all.min.css">'
    if marker in text:
        return text.replace(marker, marker + "\n" + FONT_LINK, 1)
    return text.replace("</head>", f"  {FONT_LINK}\n</head>", 1)


def remove_font_imports(text: str) -> str:
    text = FONT_IMPORT_RE.sub("", text)
    text = NOTO_IMPORT_RE.sub("", text)
    return text


def unify_root_vars(text: str) -> str:
    if ":root" not in text:
        return text

    def patch_block(m: re.Match[str]) -> str:
        block = m.group(0)
        additions: list[str] = []
        if "--ppt-font:" not in block and "--ppt-font " not in block:
            additions.append(f"  --ppt-font: {NOTO};")
        if "--ppt-font-body:" not in block:
            additions.append(f"  --ppt-font-body: {NOTO};")
        if "--ppt-font-display:" not in block:
            additions.append(f"  --ppt-font-display: {NOTO};")
        if not additions:
            return block
        return block.replace("{", "{\n" + "\n".join(additions) + "\n", 1)

    return re.sub(r":root\s*\{[^}]*\}", patch_block, text, count=1)


def normalize_var_values(text: str) -> str:
    text = text.replace(IBM_PLEX, NOTO)
    text = re.sub(
        r'--ppt-font\s*:\s*"Noto Sans KR",sans-serif',
        f"--ppt-font: {NOTO}",
        text,
    )
    text = re.sub(
        r'--ppt-font-body\s*:\s*"Noto Sans KR",sans-serif',
        f"--ppt-font-body: {NOTO}",
        text,
    )
    text = re.sub(
        r'--ppt-font-display\s*:\s*"Noto Sans KR",sans-serif',
        f"--ppt-font-display: {NOTO}",
        text,
    )
    return text


def standardize_titles(text: str) -> str:
    for pat in TITLE_PATTERNS:
        def repl(m: re.Match[str]) -> str:
            prefix, size = m.group(1), int(m.group(2))
            if size > 26:
                size = 26
            return f"{prefix}font-size:{size}px"

        text = pat.sub(repl, text)
    return text


def fix_inline_16px(text: str) -> str:
    return INLINE_BODY_FIX.sub(r'style="\1font-size:13px\2"', text)


def ensure_body_font(text: str) -> str:
    if re.search(r"body\s*\{[^}]*font-family", text, re.DOTALL):
        return text

    def add_font(m: re.Match[str]) -> str:
        inner = m.group(1).rstrip(";")
        return f"body{{{inner};font-family:var(--ppt-font-body,var(--ppt-font))}}"

    return re.sub(r"body\s*\{([^}]*)\}", add_font, text, count=1)


def process_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    updated = original
    updated = ensure_font_link(updated)
    updated = remove_font_imports(updated)
    updated = unify_root_vars(updated)
    updated = normalize_var_values(updated)
    updated = standardize_titles(updated)
    updated = fix_inline_16px(updated)
    updated = ensure_body_font(updated)
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
    print(f"done: {changed} files updated")


if __name__ == "__main__":
    main()
