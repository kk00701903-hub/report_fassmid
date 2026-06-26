"use client";

import { useState } from "react";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide09.css";

type Agent = {
  id: string;
  name: string;
  role: string;
  services: string;
  triggers: string;
  tools: string[];
};

const AGENTS: Agent[] = [
  {
    id: "backend-engineer",
    name: "backend-engineer",
    role: "Spring Boot · 도메인 API",
    services: "ideaspark-backend\n아이디어/포인트 · 고객관리 · 유통/3PL 물류",
    triggers: "Spring Boot 기능·디버깅·리뷰, JPA/QueryDSL/MyBatis, REST·도메인/DTO",
    tools: ["Read", "Edit", "Write", "Bash", "Glob", "Grep"],
  },
  {
    id: "frontend-engineer",
    name: "frontend-engineer",
    role: "Next.js 어드민 SPA",
    services: "ideaspark-frontend\n어드민 SPA · 디자인 시스템 · API 연동",
    triggers: "Next.js 페이지·컴포넌트, React Query, 표준 UI 패턴, 화면 E2E 연동",
    tools: ["Read", "Edit", "Write", "Glob", "Grep"],
  },
  {
    id: "platform-engineer",
    name: "platform-engineer",
    role: "Gateway · Auth · SSO",
    services: "platform-gateway\nAPI Gateway · 인증/인가 · SSO · 공통 보안",
    triggers: "Spring Cloud Gateway, JWT·RBAC, SSO 연동, 라우팅·레이트리밋",
    tools: ["Read", "Edit", "Write", "Bash", "Glob"],
  },
  {
    id: "infra-deployer",
    name: "infra-deployer",
    role: "Nginx · Redis · Docker",
    services: "deploy-stack\nNginx · Redis · Docker Compose · 운영 환경",
    triggers: "컨테이너 빌드·배포, Nginx 설정, Redis 캐시, 환경 변수·헬스체크",
    tools: ["Read", "Edit", "Write", "Bash"],
  },
  {
    id: "python-tooling",
    name: "python-tooling",
    role: "FastAPI · RAG · uv",
    services: "ai-tooling-service\nRAG 파이프라인 · FastAPI · 벡터 검색",
    triggers: "FastAPI 엔드포인트, RAG 인덱싱·검색, uv 패키지 관리, LLM 연동",
    tools: ["Read", "Edit", "Write", "Bash", "Glob", "Grep"],
  },
  {
    id: "migration-specialist",
    name: "migration-specialist",
    role: "C# → Spring 포팅",
    services: "legacy-migration\n레거시 C# 분석 · Spring 포팅 · API 호환",
    triggers: "C# 코드 분석, Spring 변환, 도메인 매핑, 회귀 테스트·검증",
    tools: ["Read", "Edit", "Write", "Glob", "Grep"],
  },
  {
    id: "wiki-maintainer",
    name: "wiki-maintainer",
    role: "위키 유지관리 전담",
    services: "project-wiki\n기술 문서 · Runbook · 온보딩 가이드",
    triggers: "위키 구조 정리, 문서 동기화, 릴리즈 노트·변경 이력 반영",
    tools: ["Read", "Edit", "Write", "Glob"],
  },
  {
    id: "product-planner",
    name: "product-planner",
    role: "신규·대형 기능 기획 전담",
    services: "product-planning\n요구사항 · 사용자 스토리 · 마일스톤",
    triggers: "기능 명세 작성, 우선순위·범위 정의, 이해관계자 정렬·로드맵",
    tools: ["Read", "Edit", "Write"],
  },
];

export default function Slide09() {
  const [selectedId, setSelectedId] = useState(AGENTS[0].id);
  const selected = AGENTS.find((a) => a.id === selectedId) ?? AGENTS[0];

  return (
    <SlideCanvas slideId={9} motion="cards" motionTier="medium">
      <div className="agent-slide fluent-slide">
        <div className="title-r">
          <div className="title-row">
            <div className="bar" />
            <span className="badge">AI WORKFORCE</span>
            <h1>팀 에이전트 구성 — AI 8인 역할</h1>
          </div>
          <p className="sub">카드를 클릭해 담당 서비스 · 위임 트리거 · 도구를 확인하세요.</p>
          <div className="line" />
        </div>

        <div className="agent-root-bar">
          <div className="agent-root-left">
            <span className="agent-root-tag">ROOT · ORCHESTRATION</span>
            <span className="agent-root-title">루트 Claude · 지휘 본부</span>
          </div>
          <span className="agent-root-right">위임 · 조율 · 종합</span>
        </div>

        <div className="agent-body">
          <div className="agent-grid">
            {AGENTS.map((agent) => (
              <button
                key={agent.id}
                type="button"
                className={`agent-card${selectedId === agent.id ? " is-active" : ""}`}
                onClick={() => setSelectedId(agent.id)}
              >
                <div className="agent-card-name">{agent.name}</div>
                <div className="agent-card-role">{agent.role}</div>
              </button>
            ))}
          </div>

          <aside className="agent-detail">
            <div className="agent-detail-label">AGENT DETAIL</div>
            <div className="agent-detail-name">{selected.name}</div>

            <div className="agent-detail-block">
              <div className="agent-detail-heading">담당 서비스</div>
              <p className="agent-detail-text">{selected.services}</p>
            </div>

            <div className="agent-detail-block">
              <div className="agent-detail-heading">위임 트리거</div>
              <p className="agent-detail-text">{selected.triggers}</p>
            </div>

            <div className="agent-detail-tools">
              {selected.tools.map((tool) => (
                <span key={tool} className="agent-tool-tag">
                  {tool}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <footer className="agent-workflow">
          <span className="agent-workflow-label">WORKFLOW</span>
          <p className="agent-workflow-text">
            모든 엔지니어 에이전트는 항상 <strong>계획 → 개발 → 리뷰 → 문서화</strong> 워크플로우를 실행
          </p>
          <span className="agent-workflow-effect">기대효과 · 개발 성능/속도 향상 · 토큰 최적화</span>
        </footer>
      </div>
    </SlideCanvas>
  );
}
