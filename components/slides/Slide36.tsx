"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import PartDividerSlide from "@/components/slides/PartDividerSlide";
import { getPartTopicTitles } from "@/lib/deckManifest";
import "./styles/Slide36.css";

export default function Slide35() {
  return (
    <SlideCanvas slideId={36} motion="part" motionTier="medium">
      <PartDividerSlide
        variant="part"
        partNumber={5}
        titleKo="로드맵 및 미래 비전"
        titleEn="Roadmap & Future Vision"
        topics={getPartTopicTitles(5)}
      />
    </SlideCanvas>
  );
}
