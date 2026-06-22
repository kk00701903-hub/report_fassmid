"""Verify TOC matches HTML title and h1."""
from __future__ import annotations
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
toc = {int(m.group(1)): m.group(2) for m in re.finditer(
    r'\{ id: (\d+), title: "([^"]*)" \}', (ROOT / "lib/slides.ts").read_text(encoding="utf-8")
)}

def first_h1(c: str) -> str:
    m = re.search(r"<h1[^>]*>([\s\S]*?)</h1>", c, re.I)
    if not m:
        return ""
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m.group(1))).strip()

lines = []
for i in sorted(toc):
    p = ROOT / f"public/slides/{i}.html"
    if not p.exists():
        lines.append(f"{i}: MISSING HTML")
        continue
    c = p.read_text(encoding="utf-8")
    ht = re.search(r"<title[^>]*>([^<]+)</title>", c, re.I)
    ht = ht.group(1).strip() if ht else ""
    h1 = first_h1(c)
    tt = toc[i]
    ok = ht == tt and (not h1 or h1 == tt or i == 1)
    flag = "OK" if ok else "MISMATCH"
    lines.append(f"{i:2d} {flag} | TOC={tt}")
    if not ok:
        if ht != tt:
            lines.append(f"     title={ht}")
        if h1 and h1 != tt and i != 1:
            lines.append(f"     h1={h1}")

(ROOT / "scripts" / "_title_check.txt").write_text("\n".join(lines), encoding="utf-8")
mismatches = sum(1 for l in lines if "MISMATCH" in l)
print(f"mismatches: {mismatches}")
