"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide18.css";

const SLIDE_HTML = `<div class="slide">
  <div class="title-region">
    <div class="title-header">
      <div class="title-bar"></div>
      <h1 class="title-main">최적화 방안 1. AI 디지털 워커 활용</h1>
    </div>
    <div class="title-sub">인간 7 + AI 8 = 15명 TFT급 추진력</div>
    <div class="title-line"></div>
  </div>

  <div class="body">
    <div class="left-col">
      <div class="strat-panel">
        <div class="panel-head"><i class="fas fa-robot"></i> AI 디지털 워커 — TFT 보조</div>
        <div class="strat-row">
          <div class="strat-box">
            <div class="strat-ico"><i class="fas fa-robot"></i></div>
            <div>
              <div class="strat-t">24/7 디지털 워커</div>
              <p class="strat-d">코드·문서·테스트 등 반복 업무 AI 상시 지원</p>
            </div>
          </div>
          <div class="strat-box">
            <div class="strat-ico"><i class="fas fa-user-check"></i></div>
            <div>
              <div class="strat-t">Human-in-the-loop</div>
              <p class="strat-d">설계·품질·의사결정은 TFT가 최종 통제</p>
            </div>
          </div>
        </div>
      </div>

      <div class="anim-panel">
        <div class="anim-head">
          <span><i class="fas fa-play-circle"></i> Human → Digital Worker 협업 시나리오</span>
          <span class="anim-status">● LIVE</span>
        </div>

        <div class="flow-row">
          <div class="human-node">
            <div class="human-avatar"><i class="fas fa-user-tie"></i></div>
            <span class="human-label">TFT<br/>담당자</span>
          </div>
          <div class="speech-bubble">
            <span class="speech-text">「 API 스펙 설계 완료 — 백엔드 모듈 구현해줘 」</span>
            <span class="speech-text">「 UI 와이어프레임 승인 — Figma 컴포넌트 정리해줘 」</span>
            <span class="speech-text">「 회의록·README·OpenAPI 문서 작성 부탁해 」</span>
          </div>
          <div class="flow-arrows">
            <div class="arrow-line"></div>
            <i class="fas fa-caret-right arrow-tip"></i>
          </div>
          <div class="ai-hub">
            <div class="ai-avatar"><i class="fas fa-robot"></i></div>
            <span class="ai-label">디지털<br/>워커</span>
          </div>
        </div>

        <div class="lanes">
          <div class="lane code">
            <div class="lane-head"><i class="fas fa-code"></i> 코딩 지원</div>
            <div class="lane-screen code-screen">
              <div class="code-viewport">
                <div class="code-scroll">
                  <div class="code-row r1"><span class="ln">1</span><span class="code-chunk"><span class="ann">@RestController</span></span></div>
                  <div class="code-row r2"><span class="ln">2</span><span class="code-chunk"><span class="kw">public class</span> <span class="cls">OrderApi</span> {</span></div>
                  <div class="code-row r3"><span class="ln">3</span><span class="code-chunk">  <span class="ann">@PostMapping</span>(<span class="str">"/api/order"</span>)</span></div>
                  <div class="code-row r4"><span class="ln">4</span><span class="code-chunk">  <span class="kw">public</span> <span class="cls">OrderDto</span> <span class="fn">create</span>(...) {</span></div>
                  <div class="code-row r5"><span class="ln">5</span><span class="code-chunk">    <span class="kw">return</span> svc.<span class="fn">save</span>(dto);</span></div>
                  <div class="code-row r6"><span class="ln">6</span><span class="code-chunk">  <span class="cm">// AI-generated test ✓</span></span></div>
                </div>
              </div>
              <span class="code-caret"></span>
            </div>
            <div class="lane-foot">Claude Code · Cursor<br/>보일러플레이트·단위테스트 자동 생성</div>
          </div>

          <div class="lane design">
            <div class="lane-head"><i class="fas fa-palette"></i> 디자인 지원</div>
            <div class="lane-screen">
              <div class="comp-canvas">
                <div class="comp comp-btn"></div>
                <div class="comp comp-input"></div>
                <div class="comp comp-card">
                  <div class="comp-card-h"></div>
                  <div class="comp-card-b"></div>
                </div>
                <div class="comp-handle h1"></div>
                <div class="comp-handle h2"></div>
                <div class="comp-handle h3"></div>
                <div class="comp-cursor"></div>
              </div>
            </div>
            <div class="lane-foot">Figma · Adobe<br/>컴포넌트·스토리북·가이드 정리</div>
          </div>

          <div class="lane doc">
            <div class="lane-head"><i class="fas fa-file-lines"></i> 문서 작업</div>
            <div class="lane-screen doc-screen">
              <div class="md-preview">
                <div class="md-line m1"><span class="sym"># </span><span class="txt">Order API Guide</span></div>
                <div class="md-line m2"><span class="sym">## </span><span class="txt">Overview</span></div>
                <div class="md-line m3"><span class="sym">- </span><span class="txt">POST /api/order endpoint</span></div>
                <div class="md-line m4"><span class="sym">- </span><span class="txt">Request: OrderDto schema</span></div>
                <div class="md-line m5"><span class="sym">- </span><span class="txt">Response: 201 Created</span></div>
                <div class="md-line m6"><span class="sym md-fence">\`\`\`</span><span class="txt">yaml</span></div>
                <div class="md-line m7"><span class="sym">  </span><span class="txt">paths: /api/order</span></div>
              </div>
              <span class="md-caret">✓ .md 초안</span>
            </div>
            <div class="lane-foot">README · Wiki · API Doc<br/>회의록·RAG 컨텍스트 자동 작성</div>
          </div>
        </div>
      </div>

      <div class="wf-strip">
        <span>인간 <strong>7</strong></span>
        <div class="wf-mini">
          <span class="wf-dot h"><i class="fas fa-user"></i></span>
          <span class="wf-dot h"><i class="fas fa-user"></i></span>
          <span class="wf-dot h"><i class="fas fa-user"></i></span>
          <span style="color:var(--ppt-text-3);font-size:13px">···</span>
        </div>
        <span>+</span>
        <span>AI <strong>8</strong></span>
        <div class="wf-mini">
          <span class="wf-dot a"><i class="fas fa-robot"></i></span>
          <span class="wf-dot a"><i class="fas fa-robot"></i></span>
          <span class="wf-dot a"><i class="fas fa-robot"></i></span>
          <span style="color:var(--ppt-text-3);font-size:13px">···</span>
        </div>
        <span>=</span>
        <span class="wf-eq-num">15</span>
        <span>TFT급 추진력 · <strong>지시→AI실행→Human검토</strong> 루프</span>
      </div>
    </div>

    <div class="org-panel">
      <div class="org-head"><i class="fas fa-sitemap"></i> 차세대 FaSS TFT — 핵심 조직</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:23%">역할</th>
              <th style="width:17%">담당자</th>
              <th style="width:60%">주요 업무</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="role">최고 의사결정</span></td>
              <td><span class="name">시스템<br/>사업부장</span></td>
              <td><ul class="task"><li>비즈니스 방향성·투자 우선순위 총괄</li></ul></td>
            </tr>
            <tr>
              <td><span class="role">TFT 팀장</span></td>
              <td><span class="name">서선범</span></td>
              <td><ul class="task"><li>프로젝트 총괄 관리 및 리스크 차단</li><li>유관 부서 간 업무 프로세스 조율</li></ul></td>
            </tr>
            <tr>
              <td><span class="role">프로젝트 리더</span></td>
              <td><span class="name">기충영</span></td>
              <td><ul class="task"><li>FaSS V3.0 공통 프레임워크 표준 설계</li><li>전체 아키텍처 통제 및 품질 관리</li></ul></td>
            </tr>
            <tr>
              <td><span class="role">BE 엔지니어</span></td>
              <td><div class="names"><span class="name">김희찬</span><span class="name">송민준</span></div></td>
              <td><ul class="task"><li>백엔드 코어 모듈 구현</li><li>Kafka 기반 데이터 동기화 파이프라인</li></ul></td>
            </tr>
            <tr>
              <td><span class="role">FE 엔지니어</span></td>
              <td><div class="names"><span class="name">심지훈</span><span class="name">오준열</span><span class="name">이지상</span></div></td>
              <td><ul class="task"><li>프론트엔드 및 UX 표준 구현</li><li>AI 연동 RAG 환경 및 인터페이스 구축</li></ul></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>`;

export default function Slide18() {
  return (
    <SlideCanvas slideId={18} motion="innovation" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
