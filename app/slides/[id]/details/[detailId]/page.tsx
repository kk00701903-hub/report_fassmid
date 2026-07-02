import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailContent from "@/components/DetailContent";
import LegacyDetailRedirect from "@/components/LegacyDetailRedirect";
import { getDetailTopic, getSlideDetails, getAllDetailParams } from "@/lib/slideDetails";
import { isLegacySlideId, getLegacyDetailParams, resolveSlideId } from "@/lib/slideRedirects";
import { getPageForSlideId, getSlideById, isValidSlideId } from "@/lib/slides";

type DetailPageProps = {
  params: Promise<{
    id: string;
    detailId: string;
  }>;
};

export function generateStaticParams() {
  const current = getAllDetailParams();
  return [...current, ...getLegacyDetailParams(current)];
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { id, detailId } = await params;
  const slideId = Number(id);
  // Current slide IDs always take priority — the legacy table predates slides
  // being added beyond the old 1–36 deck and its range now overlaps valid IDs.
  const resolvedId = isValidSlideId(slideId) ? slideId : resolveSlideId(slideId);
  const topic = getDetailTopic(resolvedId, detailId);

  if (!topic) {
    return { title: "상세 자료를 찾을 수 없습니다" };
  }

  return {
    title: `${topic.title} (슬라이드 ${resolvedId})`,
  };
}

export default async function SlideDetailPage({ params }: DetailPageProps) {
  const { id, detailId } = await params;
  const slideId = Number(id);

  // Current slide IDs always take priority — the legacy table predates slides
  // being added beyond the old 1–36 deck and its range now overlaps valid IDs.
  if (!isValidSlideId(slideId)) {
    if (isLegacySlideId(slideId)) {
      return <LegacyDetailRedirect targetSlideId={resolveSlideId(slideId)} detailId={detailId} />;
    }
    notFound();
  }

  const topic = getDetailTopic(slideId, detailId);
  const slide = getSlideById(slideId);
  const allTopics = getSlideDetails(slideId)?.topics ?? [];
  const slidePage = getPageForSlideId(slideId);
  const slideHref = slidePage > 0 ? `/slides/${slidePage}/` : `/slides/${slideId}/`;

  if (!topic) {
    notFound();
  }

  return (
    <div className="detail-page">
      <header className="detail-page__header">
        <div>
          <p className="detail-page__breadcrumb">
            <Link href={slideHref}>슬라이드 {slidePage > 0 ? slidePage : slideId}</Link>
            <span aria-hidden="true"> / </span>
            <span>{slide?.title}</span>
          </p>
          <h1>개발자 상세 자료</h1>
        </div>
        <Link href={slideHref} className="detail-page__back">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          슬라이드로 돌아가기
        </Link>
      </header>

      <main className="detail-page__main">
        <DetailContent topic={topic} />

        {allTopics.length > 1 ? (
          <aside className="detail-page__sidebar">
            <h2>이 슬라이드의 다른 자료</h2>
            <ul>
              {allTopics
                .filter((item) => item.id !== detailId)
                .map((item) => (
                  <li key={item.id}>
                    <Link href={`/slides/${slideId}/details/${item.id}/`}>{item.title}</Link>
                  </li>
                ))}
            </ul>
          </aside>
        ) : null}
      </main>
    </div>
  );
}
