"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide15.css";

const SLIDE_HTML = `<div class="slide fluent-slide">
  <div class="title-r">
    <div class="title-row">
      <div class="bar"></div>
      <span class="badge">BENCHMARK</span>
      <h1>타사 프로젝트 비교</h1>
    </div>
    <p class="sub">동일 시기·유사 범위 엔터프라이즈 플랫폼 구축 사례를 벤치마크로 참고합니다. (내부 전략 수립용)</p>
    <div class="line"></div>
  </div>

  <div class="main-body">
    <div class="ref-badge">
      <i class="fa-solid fa-bookmark"></i>
      벤치마크 참고 자료 — 기술 스택·AI 오케스트레이션과는 별도로 검토
    </div>

    <div class="compare-grid">
      <div class="compare-side compare-side--peer">
        <div class="compare-side__header">
          <div class="compare-label">타사 사례 (참고)</div>
          <div class="compare-company peer">삼성E&amp;A (삼성엔지니어링)</div>
          <p class="compare-scope">70명 규모 인력이 2년간 진행한 대규모 엔지니어링·플랫폼 프로젝트</p>
        </div>
        <ul class="metric-list">
          <li class="metric-item"><span>총 투입 인력</span><strong>70명</strong></li>
          <li class="metric-item"><span>진행 기간</span><strong>2년</strong></li>
          <li class="metric-item"><span>총 투입 규모</span><strong>1,680 M/M</strong></li>
          <li class="metric-item"><span>조직 형태</span><strong>대형 전담 조직</strong></li>
        </ul>
      </div>

      <div class="vs-col"><div class="vs-badge">VS</div></div>

      <div class="compare-side compare-side--ours">
        <div class="compare-side__header">
          <div class="compare-label compare-label--ours"><span class="fass-mark">FaSS</span> 당사 차세대</div>
          <div class="compare-company ours">소규모 TFT (AI도구 협업)</div>
          <p class="compare-scope">차세대 웹프레임워크 TFT 중심 · AI 도구로 생산성 보완</p>
        </div>
        <ul class="metric-list">
          <li class="metric-item"><span>총 투입 인력</span><strong>핵심 7명 (+ AI 8)</strong></li>
          <li class="metric-item"><span>진행 기간</span><strong>1.5년</strong></li>
          <li class="metric-item"><span>총 투입 규모</span><strong>108 M/M</strong></li>
          <li class="metric-item"><span>조직 형태</span><strong>소규모 TFT (AI도구 협업)</strong></li>
        </ul>
      </div>
    </div>

    <div class="table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th>비교 항목</th>
            <th>삼성E&amp;A (참고)</th>
            <th>당사 FaSS TFT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>조직 형태</strong></td>
            <td>대형 전담 조직</td>
            <td>소규모 TFT (AI도구 협업)</td>
          </tr>
          <tr>
            <td><strong>시사점</strong></td>
            <td>유사 범위 프로젝트의 규모 감각 확보</td>
            <td>동일 산출물 대비 M/M·일정 효율 극대화</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footnote">
      <i class="fa-solid fa-circle-info"></i>
      <span>본 슬라이드는 규모 벤치마크 참고용입니다. AI 오케스트레이션·기술 스택 상세는 다음 슬라이드에서 별도로 다룹니다.</span>
    </div>
  </div>
</div>`;

export default function Slide14() {
  return (
    <SlideCanvas slideId={15} motion="compare" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
