"use client";

import { getBasePath } from "@/lib/basePath";

const IMAGE_SRC = `${getBasePath()}/slides/assets/scope-hub-ai-platform.png`;

export default function Slide07ScopeHub() {
  return (
    <div
      className="s07-hub"
      role="img"
      aria-label="AI 생산성 혁신을 중심으로 프론트엔드, 백엔드, 데이터베이스, 보안·거버넌스, 인프라·DevOps가 연결된 통합 플랫폼 다이어그램"
    >
      <div className="s07-hub__image-wrap">
        <img
          className="s07-hub__image"
          src={IMAGE_SRC}
          alt="AI 생산성 혁신을 중심으로 프론트엔드, 백엔드, 데이터베이스, 보안·거버넌스, 인프라·DevOps가 연결된 통합 플랫폼 다이어그램"
          draggable={false}
        />
      </div>
      <div className="s07-hub__caption">
        AI를 허브로 <strong>5대 기술 영역</strong>이 유기적으로 연결되는 통합 플랫폼
      </div>
    </div>
  );
}
