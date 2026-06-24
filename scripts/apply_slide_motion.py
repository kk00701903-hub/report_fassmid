"""Apply shared motion CSS and data-motion attributes to slide HTML."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"
CONFIG_PATH = ROOT / "scripts" / "slide_motion_config.json"
MOTION_LINK = '<link rel="stylesheet" href="/report_fassmid/slides/shared/slide-motion.css">'

ROOT_SELECTORS = [
    r'(<body>\s*<div class=")([^"]+)(")',
    r'(<body>\s*<div class=")(slide-root)(")',
    r'(<body>\s*<div class=")(section-slide-root)(")',
    r'(<body>\s*<div class=")(fass-report-slide-root)(")',
    r'(<body>\s*<div class=")(fass-slide-root)(")',
    r'(<body>\s*<div class=")(fass-summary-slide-root)(")',
    r'(<body>\s*<div class=")(fass-identity-slide-root)(")',
    r'(<body>\s*<div class=")(fass-closing-slide-root)(")',
    r'(<body>\s*<div class=")(fass-slide-root-container)(")',
    r'(<body>\s*<div class=")(war-room-slide-root)(")',
    r'(<body>\s*<div class=")(roadmap-slide-root)(")',
    r'(<body>\s*<div class=")(migration-slide-root)(")',
    r'(<body>\s*<div class=")(poc-slide-root)(")',
    r'(<body>\s*<div class=")(roi-asset-slide-root)(")',
    r'(<body>\s*<div class=")(slide-root-container)(")',
    r'(<body>\s*<div class=")(slide)(")',
]


def load_config() -> dict[str, dict[str, str]]:
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def ensure_motion_link(text: str) -> str:
    if "shared/slide-motion.css" in text:
        return text
    font_marker = '<link rel="stylesheet" href="shared/slide-fonts.css">'
    if font_marker in text:
        return text.replace(font_marker, font_marker + "\n" + MOTION_LINK, 1)
    fa = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/css/all.min.css">'
    if fa in text:
        return text.replace(fa, fa + "\n" + MOTION_LINK, 1)
    return text.replace("</head>", f"  {MOTION_LINK}\n</head>", 1)


def apply_data_motion(text: str, template: str, tier: str) -> str:
    attr = f'data-motion="{template}" data-motion-tier="{tier}"'
    if "data-motion=" in text:
        text = re.sub(r'data-motion="[^"]*"(?:\s+data-motion-tier="[^"]*")?', attr, text, count=1)
        return text

    for pat in ROOT_SELECTORS:
        m = re.search(pat, text)
        if m:
            replacement = f'{m.group(1)}{m.group(2)}{m.group(3)} {attr}'
            return text[: m.start()] + replacement + text[m.end() :]

    return text


def harmonize_duration(text: str) -> str:
    """Reserved for future duration harmonization — do not rewrite animation-delay values."""
    return text


def process_file(path: Path, cfg: dict[str, dict[str, str]]) -> bool:
    slide_id = path.stem
    if slide_id not in cfg:
        return False
    original = path.read_text(encoding="utf-8")
    updated = original
    updated = ensure_motion_link(updated)
    updated = apply_data_motion(updated, cfg[slide_id]["template"], cfg[slide_id]["tier"])
    if cfg[slide_id]["tier"] == "medium":
        updated = harmonize_duration(updated)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> None:
    cfg = load_config()
    changed = 0
    for path in sorted(SLIDES_DIR.glob("*.html")):
        if process_file(path, cfg):
            changed += 1
            print(f"motion: {path.name} -> {cfg[path.stem]['template']}")
    print(f"done: {changed} files updated")


if __name__ == "__main__":
    main()
