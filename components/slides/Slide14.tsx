"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import Slide14SprintKanban from "@/components/slides/Slide14SprintKanban";
import "./styles/Slide14.css";

export default function Slide14() {
  return (
    <SlideCanvas slideId={14} motion="timeline" motionTier="medium">
      <Slide14SprintKanban />
    </SlideCanvas>
  );
}
