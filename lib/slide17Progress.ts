/** Slide 17 — schedule progress (basis: cover report date 2026-07-07) */

export const PROGRESS_START = new Date(2026, 0, 14); // 2026-01-14 본격 착수
export const PROGRESS_AS_OF = new Date(2026, 6, 7); // 2026-07-07 기준일
export const PROGRESS_PROTOTYPE = new Date(2026, 8, 1); // 2026-09-01 프로토타입 예정
export const PROGRESS_LIVE = new Date(2027, 2, 2); // 2027-03-02 라이브
export const PROGRESS_END = PROGRESS_LIVE;

function daysBetween(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((end.getTime() - start.getTime()) / msPerDay);
}

const elapsedDays = daysBetween(PROGRESS_START, PROGRESS_AS_OF);
const prototypeDays = daysBetween(PROGRESS_START, PROGRESS_PROTOTYPE);
const totalDays = daysBetween(PROGRESS_START, PROGRESS_END);

export const SLIDE17_PROGRESS = {
  startLabel: "2026.01.14",
  asOfLabel: "2026.07.07",
  prototypeLabel: "2026.09.01",
  liveLabel: "2027.03.02",
  endLabel: "2027.03.02",
  elapsedDays,
  prototypeDays,
  totalDays,
  /** 전체 로드맵 대비 시간 진척률 (2026.07.07 기준) */
  percent: Math.round((elapsedDays / totalDays) * 100),
  /** 프로토타입 목표일이 전체 일정에서 차지하는 비율 */
  prototypePercent: Math.round((prototypeDays / totalDays) * 1000) / 10,
  /** 프로토타입까지 남은 일수 (기준일 기준) */
  daysToPrototype: daysBetween(PROGRESS_AS_OF, PROGRESS_PROTOTYPE),
  /** 라이브까지 남은 일수 (기준일 기준) */
  daysToLive: daysBetween(PROGRESS_AS_OF, PROGRESS_LIVE),
};
