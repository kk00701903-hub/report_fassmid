"use client";

import { useEffect } from "react";
import { getBasePath } from "@/lib/basePath";
import { getPageForSlideId } from "@/lib/slides";

type LegacySlideRedirectProps = {
  targetSlideId: number;
};

export default function LegacySlideRedirect({ targetSlideId }: LegacySlideRedirectProps) {
  useEffect(() => {
    const basePath = getBasePath();
    const page = getPageForSlideId(targetSlideId);
    const destination = page > 0 ? page : targetSlideId;
    window.location.replace(`${basePath}/slides/${destination}/`);
  }, [targetSlideId]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0E1A",
        color: "#94A3B8",
        fontFamily: '"Noto Sans KR", sans-serif',
      }}
    >
      슬라이드 {targetSlideId}로 이동 중…
    </div>
  );
}
