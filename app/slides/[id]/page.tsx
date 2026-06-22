import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacySlideRedirect from "@/components/LegacySlideRedirect";
import PresentationPlayer from "@/components/PresentationPlayer";
import {
  getLegacySlideIds,
  isLegacySlideId,
  resolveSlideId,
} from "@/lib/slideRedirects";
import { getSlideById, isValidSlideId, SLIDES } from "@/lib/slides";

type SlidePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return [
    ...SLIDES.map((slide) => ({ id: String(slide.id) })),
    ...getLegacySlideIds().map((id) => ({ id: String(id) })),
  ];
}

export async function generateMetadata({ params }: SlidePageProps): Promise<Metadata> {
  const { id } = await params;
  const slideId = Number(id);
  const resolvedId = resolveSlideId(slideId);

  if (!isValidSlideId(resolvedId) && !isLegacySlideId(slideId)) {
    return { title: "슬라이드를 찾을 수 없습니다" };
  }

  const slide = getSlideById(resolvedId);
  return {
    title: slide?.title ?? `슬라이드 ${resolvedId}`,
  };
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { id } = await params;
  const slideId = Number(id);

  if (isLegacySlideId(slideId)) {
    return <LegacySlideRedirect targetSlideId={resolveSlideId(slideId)} />;
  }

  if (!isValidSlideId(slideId)) {
    notFound();
  }

  return <PresentationPlayer initialSlideId={slideId} />;
}
