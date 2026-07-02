"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import PartDividerSlide from "@/components/slides/PartDividerSlide";
import { getPartTopicTitles } from "@/lib/deckManifest";
import "./styles/Slide02.css";

export default function Slide02() {
  return (
    <SlideCanvas slideId={2} motion="part" motionTier="medium">
      <PartDividerSlide
        variant="part"
        partNumber={1}
        titleKo="전략적 비전 및 목표"
        titleEn="Strategic Vision & Objectives"
        topics={getPartTopicTitles(1)}
      />
    </SlideCanvas>
  );
}
