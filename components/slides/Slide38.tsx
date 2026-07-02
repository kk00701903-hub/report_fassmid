"use client";

import SlideCanvas from "@/components/slides/SlideCanvas";
import "./styles/Slide38.css";

const SLIDE_HTML = `<div class="fass-slide-root fluent-slide">
  <div class="title-region">
    <div class="title-header">
      <div class="title-bar"></div>
      <span class="title-badge">ULTIMATE GOAL</span>
      <h1 class="title-text">중장기 목표 1: Kubernetes 운영</h1>
    </div>
    <div class="title-line"></div>
  </div>

  <div class="k8s-main-wrapper">
    <div class="k8s-left-column">
      <div class="k8s-summary-card">
        <span class="k8s-analogy-tag"><i class="fas fa-tower-broadcast"></i> 물류 비유</span>
        <div class="k8s-summary-title">표준 컨테이너 화물을<br/>중앙 관제소가 자동 배치·운영</div>
        <p class="k8s-summary-desc">
          FaSS 업무 모듈을 <b>Docker 컨테이너</b>(표준 규격 화물)로 포장하면,
          <b>Kubernetes(K8s)</b>는 전국 물류망의 <b>중앙 관제소</b>와 같습니다.
          어느 터미널(서버)에 적재할지, 물량(트래픽)이 늘면 차량을 추가할지,
          문제 화물은 교체할지 — <b class="k8s-emphasis-red">사람이 일일이 지시하지 않아도</b> 관제소가 24시간 자동 통제합니다.
        </p>
      </div>
      <div class="k8s-feature-list">
        <div class="k8s-feature-item">
          <div class="k8s-feature-icon"><i class="fas fa-tower-broadcast"></i></div>
          <div class="k8s-feature-text">
            <strong>중앙 배치 — 관제소 지시</strong>
            <span>빈 터미널·최적 경로를 찾아 컨테이너 화물을 자동 적재 (Scheduler)</span>
          </div>
        </div>
        <div class="k8s-feature-item">
          <div class="k8s-feature-icon"><i class="fas fa-truck-ramp-box"></i></div>
          <div class="k8s-feature-text">
            <strong>수요 대응 — 물량 확장</strong>
            <span>주문·접속 급증 시 동일 화물을 추가 투입해 병목 해소 (HPA)</span>
          </div>
        </div>
        <div class="k8s-feature-item">
          <div class="k8s-feature-icon"><i class="fas fa-rotate"></i></div>
          <div class="k8s-feature-text">
            <strong>이상 대응 — 자동 복구</strong>
            <span>손상·지연 화물 감지 시 즉시 재배치·교체, 서비스 중단 최소화</span>
          </div>
        </div>
      </div>
    </div>

    <div class="k8s-diagram-column">
      <div class="k8s-diagram-panel">
        <div class="k8s-registry-row">
          <div class="k8s-registry-box"><i class="fab fa-gitlab"></i> GitLab CI → Container Registry (Docker Image)</div>
          <div class="k8s-arrow-down"></div>
        </div>

        <div class="k8s-cluster-frame">
          <div class="k8s-cluster-label"><i class="fab fa-docker"></i> Kubernetes Cluster (K8s)</div>

          <div class="k8s-control-plane">
            <div class="k8s-cp-cell">관제 접수<em>배송·배치 요청 수신</em></div>
            <div class="k8s-cp-cell">배치 지시<em>터미널·경로 자동 배정</em></div>
            <div class="k8s-cp-cell">상태 감시<em>이상 화물 재배치·복구</em></div>
          </div>

          <div class="k8s-orchestrate-band">
            <span class="k8s-orchestrate-line"></span>
            <i class="fas fa-tower-broadcast"></i> 중앙 관제소 — Container Orchestration
            <span class="k8s-orchestrate-line"></span>
          </div>

          <div class="k8s-worker-row">
            <div class="k8s-worker-node">
              <div class="k8s-node-label"><i class="fas fa-circle"></i> Worker Node 1</div>
              <div class="k8s-node-role">진입·프레젠테이션 계층</div>
              <div class="k8s-pods-row">
                <div class="k8s-pod"><div class="k8s-pod-icon"><i class="fas fa-box"></i></div><span class="k8s-pod-name">API<br/>Pod</span></div>
                <div class="k8s-pod"><div class="k8s-pod-icon"><i class="fas fa-box"></i></div><span class="k8s-pod-name">Web<br/>Pod</span></div>
                <div class="k8s-pod"><div class="k8s-pod-icon"><i class="fas fa-box"></i></div><span class="k8s-pod-name">Gateway<br/>Pod</span></div>
              </div>
              <div class="k8s-node-desc">외부 트래픽 수신·JWT 인증·API Gateway(S12) 라우팅. Next.js SSR Web과 REST API가 사용자 진입점을 담당합니다.</div>
            </div>
            <div class="k8s-worker-node">
              <div class="k8s-node-label"><i class="fas fa-circle"></i> Worker Node 2</div>
              <div class="k8s-node-role">도메인·데이터 계층</div>
              <div class="k8s-pods-row">
                <div class="k8s-pod"><div class="k8s-pod-icon"><i class="fas fa-box"></i></div><span class="k8s-pod-name">Order<br/>Pod</span></div>
                <div class="k8s-pod"><div class="k8s-pod-icon"><i class="fas fa-box"></i></div><span class="k8s-pod-name">Batch<br/>Pod</span></div>
                <div class="k8s-pod"><div class="k8s-pod-icon"><i class="fas fa-box"></i></div><span class="k8s-pod-name">CDC<br/>Pod</span></div>
              </div>
              <div class="k8s-node-desc">수주·발주 도메인 로직, Spring Batch 대용량 처리, Debezium·Kafka 기반 레거시 DB 무중단 동기화(S17)를 수행합니다.</div>
            </div>
          </div>

          <div class="k8s-container-note">
            <i class="fas fa-layer-group"></i> 1 Pod = 1개 이상 Docker Container · Kubelet이 노드에서 컨테이너 실행
          </div>
        </div>
      </div>
    </div>
  </div>

  <p class="k8s-bottom-caption">
    <strong>한 줄 요약</strong> — 프로그램을 표준 컨테이너 화물로 포장(Docker)하고, K8s 중앙 관제소가 적재·증차·교체를 자동 통제해 FaSS 전체 물류(IT) 운영을 안정적으로 유지합니다.
  </p>
</div>`;

export default function Slide38() {
  return (
    <SlideCanvas slideId={38} motion="architecture" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
