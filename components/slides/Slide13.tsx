"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import PartDividerSlide from "@/components/slides/PartDividerSlide";
import { getPartTopicTitles } from "@/lib/deckManifest";
import "./styles/Slide13.css";

export default function Slide12() {
  return (
    <SlideCanvas slideId={13} motion="part" motionTier="medium">
      <PartDividerSlide
        variant="part"
        partNumber={2}
        titleKo="프로젝트 진행 경과 및 방향성"
        titleEn="Project Progress & Direction"
        topics={getPartTopicTitles(2)}
      />
    </SlideCanvas>
  );
}
