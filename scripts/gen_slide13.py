"""Generate public/slides/13.html from temp_techstack.json"""
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

CATS = [
    ("DevOps · 인프라", "fa-server", "#38BDF8", ["Docker", "K8s", "GitLab CI", "ArgoCD", "SonarQube", "Nexus", "Spring Cloud Config", "Redis"]),
    ("프레임워크 · UI", "fa-layer-group", "#FACC15", ["Next.js", "React 19", "Tailwind CSS", "RealGrid", "Atomic Design", "Spring Batch"]),
    ("보안 · 연동", "fa-shield-halved", "#A78BFA", ["Keycloak", "JWT", "Spring Security", "API Gateway", "REST/gRPC", "Multi-tenancy"]),
    ("데이터 · BI · AI", "fa-chart-pie", "#34D399", ["Debezium", "Kafka", "ClipReport", "Superset", "Grafana", "LangChain"]),
]


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def mapping_rows() -> str:
    tasks = data["tasks"]
    rows = []
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
            chips = "".join(f'<span class="tech-chip">{esc(x["name"])}</span>' for x in t["techs"])
            person = t["assignee"] or "—"
            phase_td = ""
            if k == i:
                phase_td = f'<td class="td-phase" rowspan="{span}" style="--ph:{color}">{esc(phase_short)}</td>'
            rows.append(
                f"<tr>{phase_td}"
                f'<td class="td-sprint">{esc(t["sprint"])}</td>'
                f'<td class="td-task">{esc(t["task"])}</td>'
                f'<td class="td-person">{esc(person)}</td>'
                f'<td class="td-tech"><div class="tech-chips">{chips}</div></td></tr>'
            )
        i = j
    return "\n".join(rows)


def left_cards() -> str:
    cards = []
    for title, icon, color, chips in CATS:
        chip_html = "".join(f'<span class="lchip">{esc(c)}</span>' for c in chips)
        cards.append(
            f"""<div class="lcard" style="--cc:{color}">
  <div class="lcard-head"><i class="fas {icon}"></i><span>{esc(title)}</span></div>
  <div class="lchips">{chip_html}</div>
</div>"""
        )
    return "\n".join(cards)


total_tech = len(data["rows"])
total_tasks = len(data["tasks"])
assignees = sorted({t["assignee"] for t in data["tasks"] if t["assignee"]})

html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8"/>
<title>핵심 기술 스택 — 주요 과제별 매핑</title>
<script src="https://picture-search.skywork.ai/aippt/static/tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/css/all.min.css">
<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@300;400;600;700&display=swap");
:root {{
  --ppt-bg:#0A0E1A; --ppt-bg-soft:#141B2D; --ppt-surface:#1E2638; --ppt-border:#334155;
  --ppt-text-1:#FFF; --ppt-text-2:#94A3B8; --ppt-text-3:#64748B;
  --ppt-accent:#00F0FF; --ppt-accent-2:#FACC15;
  --ppt-font:"IBM Plex Sans KR",sans-serif;
}}
*{{box-sizing:border-box;margin:0;padding:0}}
body{{width:100vw;height:100vh;overflow:hidden;background:var(--ppt-bg);display:flex;justify-content:center;align-items:center;font-family:var(--ppt-font)}}
.slide{{width:960px;height:720px;background:var(--ppt-bg);color:var(--ppt-text-1);display:flex;flex-direction:column;overflow:hidden}}
.title-r{{flex-shrink:0;padding:18px 32px 6px}}
.title-row{{display:flex;align-items:center;gap:10px;flex-wrap:wrap}}
.bar{{width:4px;height:26px;background:var(--ppt-accent);border-radius:2px}}
.badge{{font-size:10px;font-weight:700;padding:3px 9px;border-radius:12px;background:rgba(0,240,255,.1);border:1px solid rgba(0,240,255,.3);color:var(--ppt-accent)}}
h1{{font-size:22px;font-weight:700;line-height:1.3}}
.sub{{font-size:11px;color:var(--ppt-text-2);margin-top:3px;padding-left:14px}}
.line{{height:1px;margin-top:5px;background:linear-gradient(90deg,var(--ppt-accent),transparent);opacity:.35}}
.body{{flex:1;min-height:0;padding:4px 28px 8px;display:grid;grid-template-columns:0.38fr 0.62fr;gap:10px}}
.left-col{{display:flex;flex-direction:column;gap:7px;min-height:0}}
.left-head{{font-size:11px;font-weight:700;color:var(--ppt-accent);padding:5px 8px;border-radius:8px;background:rgba(0,240,255,.08);border:1px solid rgba(0,240,255,.25);display:flex;align-items:center;gap:6px}}
.lcard{{background:var(--ppt-bg-soft);border:1px solid var(--ppt-border);border-radius:10px;padding:8px 10px;border-left:3px solid var(--cc);flex:1;min-height:0;display:flex;flex-direction:column;gap:5px}}
.lcard-head{{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:var(--cc)}}
.lcard-head i{{font-size:12px;opacity:.9}}
.lchips{{display:flex;flex-wrap:wrap;gap:3px}}
.lchip{{font-size:8px;font-weight:600;padding:2px 6px;border-radius:6px;background:var(--ppt-surface);border:1px solid var(--ppt-border);color:var(--ppt-text-2);line-height:1.25}}
.left-foot{{font-size:9px;color:var(--ppt-text-3);padding:6px 8px;border-left:2px solid var(--ppt-accent-2);background:rgba(250,204,21,.05);border-radius:0 6px 6px 0;line-height:1.4}}
.left-foot strong{{color:var(--ppt-accent-2)}}
.right-col{{display:flex;flex-direction:column;min-height:0;background:var(--ppt-bg-soft);border:1px solid var(--ppt-border);border-radius:10px;overflow:hidden}}
.right-head{{flex-shrink:0;padding:6px 10px;font-size:11px;font-weight:700;color:var(--ppt-accent-2);background:rgba(250,204,21,.08);border-bottom:1px solid var(--ppt-border);display:flex;align-items:center;justify-content:space-between}}
.right-head span{{font-size:9px;font-weight:600;color:var(--ppt-text-3)}}
.map-wrap{{flex:1;min-height:0;overflow:hidden;padding:2px 4px 4px}}
.map-table{{width:100%;border-collapse:collapse;table-layout:fixed}}
.map-table thead th{{font-size:8px;font-weight:700;color:var(--ppt-text-3);padding:4px 3px;text-align:left;border-bottom:1px solid var(--ppt-border);background:rgba(10,14,26,.6);position:sticky;top:0}}
.map-table tbody td{{font-size:7.5px;padding:2px 3px;vertical-align:top;border-bottom:1px solid rgba(51,65,85,.45);line-height:1.25}}
.td-phase{{width:28px;font-size:7px;font-weight:800;color:var(--ph);text-align:center;vertical-align:middle;background:rgba(255,255,255,.02);border-right:1px solid var(--ppt-border)}}
.td-sprint{{width:26px;font-size:7px;font-weight:700;color:var(--ppt-accent);white-space:nowrap}}
.td-task{{width:88px;font-size:7.5px;font-weight:600;color:var(--ppt-text-1)}}
.td-person{{width:34px;font-size:7px;color:var(--ppt-accent-2);white-space:nowrap}}
.td-tech{{width:auto}}
.tech-chips{{display:flex;flex-wrap:wrap;gap:2px}}
.tech-chip{{font-size:6.5px;font-weight:600;padding:1px 4px;border-radius:4px;background:var(--ppt-surface);border:1px solid var(--ppt-border);color:var(--ppt-text-2);line-height:1.2}}
.footer{{flex-shrink:0;margin:0 28px 8px;padding:6px 10px;font-size:10px;color:var(--ppt-text-2);border-left:3px solid var(--ppt-accent);background:rgba(0,240,255,.05);border-radius:0 6px 6px 0;display:flex;justify-content:space-between;gap:12px}}
.footer strong{{color:var(--ppt-accent)}}
.footer-stats{{display:flex;gap:8px;flex-shrink:0}}
.fstat{{text-align:center;padding:3px 10px;border-radius:6px;background:var(--ppt-surface);border:1px solid var(--ppt-border)}}
.fstat b{{display:block;font-size:14px;color:var(--ppt-accent);line-height:1}}
.fstat span{{font-size:8px;color:var(--ppt-text-3)}}
html{{overflow:hidden;margin:0;padding:0}}
</style>
</head>
<body>
<div class="slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">Tech Stack</span>
      <h1>핵심 기술 스택 — 주요 과제별 매핑</h1>
    </div>
    <p class="sub">260622 sprint-backlog 기준 · S01–S23 · {total_tech}개 기술 · 메인담당: {' · '.join(assignees)}</p>
    <div class="line"></div>
  </div>

  <div class="body">
    <div class="left-col">
      <div class="left-head"><i class="fas fa-cubes"></i> 4개 영역 핵심 기술 스택</div>
      {left_cards()}
      <div class="left-foot"><strong>핵심 축</strong> Next.js · React 19 — DevOps 안정화 → UI 표준화 → 연동·보안 → BI·AI 순 구축</div>
    </div>

    <div class="right-col">
      <div class="right-head">
        <span><i class="fas fa-list-check"></i> 주요 과제별 매핑</span>
        <span>{total_tasks}개 과제 · 48종 기술</span>
      </div>
      <div class="map-wrap">
        <table class="map-table">
          <thead>
            <tr>
              <th>단계</th><th>ID</th><th>주요 과제명</th><th>담당</th><th>기술 스택</th>
            </tr>
          </thead>
          <tbody>
{mapping_rows()}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="footer">
    <span><strong>출처</strong> 260622_FaSS_TechStack_With_Assignees — sprint-backlog 연동</span>
    <div class="footer-stats">
      <div class="fstat"><b>6</b><span>단계</span></div>
      <div class="fstat"><b>{total_tasks}</b><span>과제</span></div>
      <div class="fstat"><b>{total_tech}</b><span>기술</span></div>
    </div>
  </div>
</div>
<script>
(function(){{
  function applyScale(){{
    var el=document.querySelector('body>div');if(!el)return;
    var sw=window.innerWidth,sh=window.innerHeight;
    var scale=Math.min(sw/960,sh/720);
    el.style.transform='scale('+scale+')';el.style.transformOrigin='top left';
    el.style.position='absolute';
    el.style.left=Math.round((sw-960*scale)/2)+'px';
    el.style.top=Math.round((sh-720*scale)/2)+'px';
  }}
  applyScale();window.addEventListener('resize',applyScale);
}})();
</script>
</body>
</html>
"""

(ROOT / "public" / "slides" / "13.html").write_text(html, encoding="utf-8")
print("Wrote public/slides/13.html")
