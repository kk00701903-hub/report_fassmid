"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import PartDividerSlide from "@/components/slides/PartDividerSlide";
import { getAppendixTopicTitles } from "@/lib/deckManifest";
import "./styles/Slide44.css";

export default function Slide44() {
  return (
    <SlideCanvas slideId={44} motion="part" motionTier="medium">
      <PartDividerSlide
        variant="appendix"
        titleKo="별첨"
        titleEn="Appendix — Supplementary Reference Materials"
        topics={getAppendixTopicTitles()}
      />
    </SlideCanvas>
  );
}
