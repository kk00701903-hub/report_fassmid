"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide17E2EFlow from "@/components/slides/Slide17E2EFlow";
import "./styles/Slide17.css";

export default function Slide17() {
  return (
    <SlideCanvas slideId={17} motion="cards" motionTier="subtle">
      <Slide17E2EFlow />
    </SlideCanvas>
  );
}
