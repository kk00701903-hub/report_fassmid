"use client";

import Link from "next/link";
import DetailContent from "@/components/DetailContent";
import type { DetailTopic } from "@/lib/slideDetails";

type SlideDetailPanelProps = {
  slideId: number;
  topic: DetailTopic;
  onClose: () => void;
};

export default function SlideDetailPanel({ slideId, topic, onClose }: SlideDetailPanelProps) {
  return (
    <div className="detail-panel-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-panel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="detail-panel__toolbar">
          <div className="detail-panel__toolbar-left">
            <span className="detail-panel__slide-label">슬라이드 {slideId}</span>
            <Link
              href={`/slides/${slideId}/details/${topic.id}/`}
              className="detail-panel__open-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
              새 탭에서 열기
            </Link>
          </div>
          <button type="button" className="detail-panel__close" onClick={onClose} aria-label="상세 닫기">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <div className="detail-panel__body">
          <DetailContent topic={topic} />
        </div>
      </aside>
    </div>
  );
}
