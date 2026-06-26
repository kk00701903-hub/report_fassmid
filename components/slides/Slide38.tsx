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
        <div class="k8s-summary-title">Docker 컨테이너를<br/>K8s가 자동으로 배치·운영</div>
        <p class="k8s-summary-desc">
          Cloud-Ready(원칙 2)로 패키징된 FaSS 모듈을 <b>Kubernetes</b> 클러스터에 올려
          배포·확장·복구를 플랫폼이 대신 수행합니다.
        </p>
      </div>
      <div class="k8s-feature-list">
        <div class="k8s-feature-item">
          <div class="k8s-feature-icon"><i class="fas fa-sitemap"></i></div>
          <div class="k8s-feature-text">
            <strong>오케스트레이션</strong>
            <span>Control Plane이 Pod(컨테이너 묶음)를 노드에 최적 배치</span>
          </div>
        </div>
        <div class="k8s-feature-item">
          <div class="k8s-feature-icon"><i class="fas fa-expand"></i></div>
          <div class="k8s-feature-text">
            <strong>자동 확장 (HPA)</strong>
            <span>부하 증가 시 Pod·노드를 Scale-out</span>
          </div>
        </div>
        <div class="k8s-feature-item">
          <div class="k8s-feature-icon"><i class="fas fa-heart-pulse"></i></div>
          <div class="k8s-feature-text">
            <strong>자기 치유</strong>
            <span>장애 Pod 자동 재시작·무중단 Rolling Update</span>
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
            <div class="k8s-cp-cell">API Server<em>배포 요청 수신</em></div>
            <div class="k8s-cp-cell">Scheduler<em>Pod → Node 배치</em></div>
            <div class="k8s-cp-cell">Controller<em>상태 유지·복구</em></div>
          </div>

          <div class="k8s-orchestrate-band">
            <span class="k8s-orchestrate-line"></span>
            <i class="fas fa-arrows-spin"></i> Container Orchestration
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
    <strong>Kubernetes(K8s)</strong> — 컨테이너화된 애플리케이션의 배포·스케일링·네트워킹·가용성을 자동화하는 컨테이너 오케스트레이션 플랫폼. FaSS 모듈(Docker)을 Pod 단위로 클러스터에 올려 트래픽·장애에 탄력적으로 대응합니다.
  </p>
</div>`;

export default function Slide37() {
  return (
    <SlideCanvas slideId={38} motion="architecture" motionTier="medium">
      <div dangerouslySetInnerHTML={{ __html: SLIDE_HTML }} />
    </SlideCanvas>
  );
}
