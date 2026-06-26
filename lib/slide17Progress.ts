/** Slide 17 — schedule progress (basis: cover report date 2026-07-07) */

export const PROGRESS_START = new Date(2026, 0, 1); // 2026-01-01
export const PROGRESS_PROTOTYPE = new Date(2026, 2, 1); // 2026-03-01
export const PROGRESS_AS_OF = new Date(2026, 6, 7); // 2026-07-07
export const PROGRESS_END = new Date(2027, 11, 31); // 2027-12-31

function daysBetween(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((end.getTime() - start.getTime()) / msPerDay);
}

const elapsedDays = daysBetween(PROGRESS_START, PROGRESS_AS_OF);
const prototypeDays = daysBetween(PROGRESS_START, PROGRESS_PROTOTYPE);
const totalDays = daysBetween(PROGRESS_START, PROGRESS_END);

export const SLIDE17_PROGRESS = {
  startLabel: "2026.01.01",
  prototypeLabel: "2026.03.01",
  asOfLabel: "2026.07.07",
  endLabel: "2027.12.31",
  elapsedDays,
  prototypeDays,
  totalDays,
  /** 전체 로드맵 대비 시간 진척률 (2026.07.07 기준) */
  percent: Math.round((elapsedDays / totalDays) * 100),
  /** 프로토타입 목표일이 전체 일정에서 차지하는 비율 */
  prototypePercent: Math.round((prototypeDays / totalDays) * 1000) / 10,
  /** 프로토타입(3/1) 구간 — 기준일 기준 100% 경과 */
  prototypeComplete: PROGRESS_AS_OF >= PROGRESS_PROTOTYPE,
};
