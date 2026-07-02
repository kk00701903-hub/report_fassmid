"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import PartDividerSlide from "@/components/slides/PartDividerSlide";
import { getGlossaryTopicTitles } from "@/lib/deckManifest";
import "./styles/Slide41.css";

export default function Slide41() {
  return (
    <SlideCanvas slideId={41} motion="part" motionTier="medium">
      <PartDividerSlide
        variant="glossary"
        titleKo="Digital Insight Glossary"
        titleEn="CEO · C-Level Primer — 핵심 용어 풀이"
        topics={getGlossaryTopicTitles()}
      />
    </SlideCanvas>
  );
}
