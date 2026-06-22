/** FaSS 프로젝트 일정 — 2026.01 ~ 2027.12 (7단계 마일스톤) */

export type MilestoneStatus = "completed" | "in-progress" | "planned";

export type MilestoneTask = {
  name: string;
  category: string;
  /** YYYY-MM (월 단위) */
  start: string;
  end: string;
};

export type MilestonePhase = {
  id: string;
  phase: string;
  label: string;
  period: string;
  accent: string;
  status: MilestoneStatus;
  tasks: MilestoneTask[];
};

/** 간트 차트 기준일 (중간보고 시점) */
export const FASS_SCHEDULE_TODAY = "2026-06";

export const FASS_MILESTONE_PHASES: MilestonePhase[] = [
  {
    id: "phase-1",
    phase: "1단계",
    label: "AS-IS 현황 파악",
    period: "2026.01 – 02",
    accent: "#3b82f6",
    status: "completed",
    tasks: [
      { name: "시스템 아키텍처", category: "AS-IS 현황 파악", start: "2026-01", end: "2026-02" },
      { name: "비즈니스 프레임워크 분석", category: "AS-IS 현황 파악", start: "2026-01", end: "2026-02" },
      { name: "AI 모델 설계", category: "AI 에이전트 구축", start: "2026-01", end: "2026-01" },
      { name: "서브에이전트 구축", category: "AI 에이전트 구축", start: "2026-01", end: "2026-01" },
    ],
  },
  {
    id: "phase-2",
    phase: "2단계",
    label: "TO-BE 모델 정립",
    period: "2026.03 – 05",
    accent: "#22c55e",
    status: "completed",
    tasks: [
      { name: "요구사항 정의", category: "TO-BE 모델 정립", start: "2026-03", end: "2026-04" },
      { name: "표준 프레임워크", category: "TO-BE 모델 정립", start: "2026-04", end: "2026-05" },
    ],
  },
  {
    id: "phase-3",
    phase: "3단계",
    label: "프레임워크 & PoC",
    period: "2026.05 – 09",
    accent: "#f97316",
    status: "in-progress",
    tasks: [
      { name: "공통 아키텍처 설계", category: "프레임워크 & PoC", start: "2026-05", end: "2026-08" },
      { name: "프레임워크 PoC", category: "프레임워크 & PoC", start: "2026-05", end: "2026-07" },
    ],
  },
  {
    id: "phase-4",
    phase: "4단계",
    label: "프로토타입",
    period: "2026.10 – 2027.03",
    accent: "#a78bfa",
    status: "planned",
    tasks: [
      { name: "주요소관리시스템", category: "프로토타입", start: "2026-10", end: "2027-03" },
      { name: "템플릿 및 스토리보드", category: "프로토타입", start: "2026-10", end: "2027-03" },
    ],
  },
  {
    id: "phase-5",
    phase: "5단계",
    label: "안정화",
    period: "2027.04 – 06",
    accent: "#14b8a6",
    status: "planned",
    tasks: [
      { name: "시스템 안정화", category: "안정화", start: "2027-04", end: "2027-06" },
    ],
  },
  {
    id: "phase-6",
    phase: "6단계",
    label: "전환 준비",
    period: "2027.07 – 08",
    accent: "#ec4899",
    status: "planned",
    tasks: [
      { name: "3PL/유통물류 준비", category: "전환 준비", start: "2027-07", end: "2027-08" },
      { name: "현업 요구 반영", category: "전환 준비", start: "2027-07", end: "2027-08" },
    ],
  },
  {
    id: "phase-7",
    phase: "7단계",
    label: "본 전환 개발",
    period: "2027.09 –",
    accent: "#fb923c",
    status: "planned",
    tasks: [
      { name: "3PL 전환", category: "본 전환 개발", start: "2027-09", end: "2027-12" },
      { name: "유통물류 전환", category: "본 전환 개발", start: "2027-09", end: "2027-12" },
    ],
  },
];

/** 간트 차트 타임라인 범위 */
export const FASS_SCHEDULE_START = "2026-01";
export const FASS_SCHEDULE_END = "2027-12";

export function monthToIndex(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return (y - 2026) * 12 + (m - 1);
}

export function monthSpan(start: string, end: string): { left: number; width: number } {
  const total = monthToIndex(FASS_SCHEDULE_END) - monthToIndex(FASS_SCHEDULE_START) + 1;
  const startIdx = monthToIndex(start);
  const endIdx = monthToIndex(end);
  return {
    left: (startIdx / total) * 100,
    width: ((endIdx - startIdx + 1) / total) * 100,
  };
}

export const FASS_SCHEDULE_MONTHS = [
  "2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06",
  "2026-07", "2026-08", "2026-09", "2026-10", "2026-11", "2026-12",
  "2027-01", "2027-02", "2027-03", "2027-04", "2027-05", "2027-06",
  "2027-07", "2027-08", "2027-09", "2027-10", "2027-11", "2027-12",
] as const;
