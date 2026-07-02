"use client";

import { getBasePath } from "@/lib/basePath";

const SCOPE_HUB_IMAGE_SRC = `${getBasePath()}/assets/slides/s07-scope-hub.png`;

export default function Slide07ScopeHub() {
  return (
    <div className="s07-hub">
      <div className="s07-hub__figure">
        <img
          className="s07-hub__image"
          src={SCOPE_HUB_IMAGE_SRC}
          alt="AI 생산성 혁신을 중심으로 프론트엔드, 백엔드, 데이터베이스, 보안·거버넌스, 인프라·DevOps가 연결된 통합 플랫폼 다이어그램"
        />
      </div>
    </div>
  );
}
