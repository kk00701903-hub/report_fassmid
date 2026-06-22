"""Generate slide 13 right-panel mapping HTML from temp_techstack.json"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

with open(ROOT / "temp_techstack.json", encoding="utf-8") as f:
    data = json.load(f)

PHASE_SHORT = {
    "1단계 (인프라·표준)": "1단계",
    "2단계 (보안·공통)": "2단계",
    "3단계 (생산성·UI 표준)": "3단계",
    "4단계 (외부 연동·데이터)": "4단계",
    "5단계 (데이터 보안·최적화)": "5단계",
    "추가 과제 (차세대 로드맵)": "추가",
}

PHASE_COLORS = {
    "1단계": "#38BDF8",
    "2단계": "#A78BFA",
    "3단계": "#FACC15",
    "4단계": "#34D399",
    "5단계": "#F87171",
    "추가": "#FB923C",
}


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


rows_html = []
current_phase_short = None
for task in data["tasks"]:
    phase_short = PHASE_SHORT.get(task["phase"], task["phase"][:3] if task["phase"] else "")
    phase_cell = ""
    if phase_short != current_phase_short:
        current_phase_short = phase_short
        color = PHASE_COLORS.get(phase_short, "#94A3B8")
        phase_cell = f'<td class="td-phase" rowspan="1" style="--ph:{color}">{esc(phase_short)}</td>'

    tech_chips = "".join(
        f'<span class="tech-chip">{esc(t["name"])}</span>' for t in task["techs"]
    )
    assignee = task["assignee"] or "—"
    rows_html.append(
        f"""<tr>
  {phase_cell.replace('rowspan="1"', '') if not phase_cell else phase_cell}
  <td class="td-sprint">{esc(task["sprint"])}</td>
  <td class="td-task">{esc(task["task"])}</td>
  <td class="td-person">{esc(assignee)}</td>
  <td class="td-tech"><div class="tech-chips">{tech_chips}</div></td>
</tr>"""
    )

# Fix phase rowspan - group consecutive same phase
tasks = data["tasks"]
fixed_rows = []
i = 0
while i < len(tasks):
    phase_short = PHASE_SHORT.get(tasks[i]["phase"], "")
    j = i
    while j < len(tasks) and PHASE_SHORT.get(tasks[j]["phase"], "") == phase_short:
        j += 1
    span = j - i
    color = PHASE_COLORS.get(phase_short, "#94A3B8")
    for k in range(i, j):
        t = tasks[k]
        tech_chips = "".join(f'<span class="tech-chip">{esc(x["name"])}</span>' for x in t["techs"])
        assignee = t["assignee"] or "—"
        phase_td = ""
        if k == i:
            phase_td = f'<td class="td-phase" rowspan="{span}" style="--ph:{color}">{esc(phase_short)}</td>'
        fixed_rows.append(
            f"""<tr>
  {phase_td}
  <td class="td-sprint">{esc(t["sprint"])}</td>
  <td class="td-task">{esc(t["task"])}</td>
  <td class="td-person">{esc(assignee)}</td>
  <td class="td-tech"><div class="tech-chips">{tech_chips}</div></td>
</tr>"""
        )
    i = j

mapping_table = "\n".join(fixed_rows)
(ROOT / "scripts" / "_slide13_mapping_fragment.html").write_text(mapping_table, encoding="utf-8")
print(f"Wrote mapping table with {len(tasks)} task rows")
