import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacySlideRedirect from "@/components/LegacySlideRedirect";
import PresentationPlayer from "@/components/PresentationPlayer";
import {
  getLegacySlideIds,
  isLegacySlideId,
  resolveSlideId,
} from "@/lib/slideRedirects";
import {
  getDeckEntryAtPage,
  getDeckEntryBySlideId,
  getDeckLength,
  isValidPageNumber,
} from "@/lib/slides";

type SlidePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  const pages = Array.from({ length: getDeckLength() }, (_, index) => ({
    id: String(index + 1),
  }));

  return [...pages, ...getLegacySlideIds().map((id) => ({ id: String(id) }))];
}

export async function generateMetadata({ params }: SlidePageProps): Promise<Metadata> {
  const { id } = await params;
  const pageNumber = Number(id);

  if (isLegacySlideId(pageNumber)) {
    const targetId = resolveSlideId(pageNumber);
    const entry = getDeckEntryBySlideId(targetId);
    return {
      title: entry?.title ?? `슬라이드 ${targetId}`,
    };
  }

  if (!isValidPageNumber(pageNumber)) {
    return { title: "슬라이드를 찾을 수 없습니다" };
  }

  const entry = getDeckEntryAtPage(pageNumber);
  return {
    title: entry?.title ?? `슬라이드 ${pageNumber}`,
  };
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { id } = await params;
  const pageNumber = Number(id);

  if (isLegacySlideId(pageNumber)) {
    return <LegacySlideRedirect targetSlideId={resolveSlideId(pageNumber)} />;
  }

  if (!isValidPageNumber(pageNumber)) {
    notFound();
  }

  return <PresentationPlayer initialSlideId={pageNumber} />;
}
