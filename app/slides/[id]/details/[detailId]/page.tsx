import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailContent from "@/components/DetailContent";
import { getDetailTopic, getSlideDetails, getAllDetailParams } from "@/lib/slideDetails";
import { getSlideById, isValidSlideId } from "@/lib/slides";

type DetailPageProps = {
  params: Promise<{
    id: string;
    detailId: string;
  }>;
};

export function generateStaticParams() {
  return getAllDetailParams();
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { id, detailId } = await params;
  const slideId = Number(id);
  const topic = getDetailTopic(slideId, detailId);

  if (!topic) {
    return { title: "상세 자료를 찾을 수 없습니다" };
  }

  return {
    title: `${topic.title} (슬라이드 ${slideId})`,
  };
}

export default async function SlideDetailPage({ params }: DetailPageProps) {
  const { id, detailId } = await params;
  const slideId = Number(id);

  if (!isValidSlideId(slideId)) {
    notFound();
  }

  const topic = getDetailTopic(slideId, detailId);
  const slide = getSlideById(slideId);
  const allTopics = getSlideDetails(slideId)?.topics ?? [];

  if (!topic) {
    notFound();
  }

  return (
    <div className="detail-page">
      <header className="detail-page__header">
        <div>
          <p className="detail-page__breadcrumb">
            <Link href={`/slides/${slideId}/`}>슬라이드 {slideId}</Link>
            <span aria-hidden="true"> / </span>
            <span>{slide?.title}</span>
          </p>
          <h1>개발자 상세 자료</h1>
        </div>
        <Link href={`/slides/${slideId}/`} className="detail-page__back">
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
