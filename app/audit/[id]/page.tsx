import { notFound } from "next/navigation";

import AuditSlideView from "@/components/AuditSlideView";
import { isValidSlideId, SLIDES } from "@/lib/slides";

type AuditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return SLIDES.map((slide) => ({ id: String(slide.id) }));
}

export default async function AuditSlidePage({ params }: AuditPageProps) {
  const { id } = await params;
  const slideId = Number(id);

  if (!isValidSlideId(slideId)) {
    notFound();
  }

  return <AuditSlideView slideId={slideId} />;
}
