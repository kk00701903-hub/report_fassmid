"""Fix broken data-motion attributes inserted into class names."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "public" / "slides"
CONFIG = json.loads((ROOT / "scripts" / "slide_motion_config.json").read_text(encoding="utf-8"))

BROKEN = re.compile(
    r'<div class="([^"]*?)\s+data-motion="([^"]+)""(\s[^>]*)?>',
)


def fix_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    template = CONFIG.get(path.stem, {}).get("template", "cards")

    def repl(m: re.Match[str]) -> str:
        cls = m.group(1).strip()
        rest = m.group(3) or ""
        return f'<div class="{cls}" data-motion="{m.group(2)}"{rest}>'

    updated = BROKEN.sub(repl, text)

    if 'data-motion=' not in updated:
        updated = re.sub(
            r'(<body>\s*<div class="([^"]+)")>',
            rf'\1 data-motion="{template}">',
            updated,
            count=1,
        )

    if updated != text:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> None:
    n = sum(1 for p in SLIDES_DIR.glob("*.html") if fix_file(p))
    print(f"fixed: {n} files")


if __name__ == "__main__":
    main()
