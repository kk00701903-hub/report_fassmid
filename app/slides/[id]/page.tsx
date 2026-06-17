import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PresentationPlayer from "@/components/PresentationPlayer";
import { getSlideById, isValidSlideId, SLIDES } from "@/lib/slides";

type SlidePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return SLIDES.map((slide) => ({
    id: String(slide.id),
  }));
}

export async function generateMetadata({ params }: SlidePageProps): Promise<Metadata> {
  const { id } = await params;
  const slideId = Number(id);

  if (!isValidSlideId(slideId)) {
    return { title: "슬라이드를 찾을 수 없습니다" };
  }

  const slide = getSlideById(slideId);
  return {
    title: slide?.title ?? `슬라이드 ${slideId}`,
  };
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { id } = await params;
  const slideId = Number(id);

  if (!isValidSlideId(slideId)) {
    notFound();
  }

  return <PresentationPlayer initialSlideId={slideId} />;
}
