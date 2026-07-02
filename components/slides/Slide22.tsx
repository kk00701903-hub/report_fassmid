"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import PartDividerSlide from "@/components/slides/PartDividerSlide";
import { getPartTopicTitles } from "@/lib/deckManifest";
import "./styles/Slide22.css";

export default function Slide22() {
  return (
    <SlideCanvas slideId={22} motion="part" motionTier="medium">
      <PartDividerSlide
        variant="part"
        partNumber={3}
        titleKo="기술 스택 및 아키텍처"
        titleEn="Tech Stack & Architecture"
        topics={getPartTopicTitles(3)}
      />
    </SlideCanvas>
  );
}
