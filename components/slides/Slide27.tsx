"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import PartDividerSlide from "@/components/slides/PartDividerSlide";
import { getPartTopicTitles } from "@/lib/deckManifest";
import "./styles/Slide27.css";

export default function Slide26() {
  return (
    <SlideCanvas slideId={27} motion="part" motionTier="medium">
      <PartDividerSlide
        variant="part"
        partNumber={4}
        titleKo="혁신 및 검증"
        titleEn="Innovation & Validation"
        topics={getPartTopicTitles(4)}
      />
    </SlideCanvas>
  );
}
