import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const detailsPath = path.join(__dirname, "..", "lib", "slideDetails.ts");

let s = fs.readFileSync(detailsPath, "utf8");

for (let id = 38; id >= 16; id--) {
  s = s.replace(new RegExp(`slideId: ${id}(?![0-9])`, "g"), `slideId: ${id + 1}`);
}

const insert = `  {
    slideId: 16,
    topics: [
      {
        id: "e2e-flow-primer",
        title: "End-to-End 개발 흐름 — 5단계 한눈에 (보조 설명)",
        category: "process",
        summary:
          "AI-Augmented 워크플로우(15p)의 5단계를 경영진 관점에서 풀어쓴 보조 장표입니다. 기획→설계→AI 개발→통합·배포→검증이 매 스프린트마다 반복되는 End-to-End 흐름입니다.",
        process: [
          { step: 1, title: "기획·관리", description: "Jira 백로그·스프린트 — 무엇을 언제까지 할지 확정" },
          { step: 2, title: "설계·UI/UX", description: "Figma·API 스펙 — 화면·데이터 구조 설계도 확정" },
          { step: 3, title: "AI 개발", description: "Claude Code·DGX — 코드·테스트·문서 생성, 사람 검수" },
          { step: 4, title: "통합·배포", description: "GitLab CI/CD — 빌드·테스트·스테이징·운영 반영" },
          { step: 5, title: "검증·완료", description: "QA·회귀 테스트·Human-in-the-loop 후 Done 처리" },
        ],
      },
    ],
  },
`;

if (!s.includes("e2e-flow-primer")) {
  s = s.replace("    slideId: 17,", `${insert}\n    slideId: 17,`);
}

fs.writeFileSync(detailsPath, s, "utf8");
console.log("slideDetails updated");
