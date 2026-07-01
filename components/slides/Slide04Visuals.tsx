"use client";

import { motion } from "framer-motion";

import { useSlideDiagramMotion } from "@/components/slides/motion/SlideMotionReadyContext";

const CONTAINER_COLORS = ["#e74c3c", "#2563eb", "#f59e0b"] as const;

type ShippingContainerProps = {
  color: string;
  label?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  lit?: boolean;
};

export function ShippingContainer({
  color,
  label,
  x = 0,
  y = 0,
  width = 52,
  height = 28,
  lit = false,
}: ShippingContainerProps) {
  return (
    <g transform={`translate(${x}, ${y})`} className={lit ? "s04-lit" : undefined}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={2}
        fill={color}
        stroke="#1e293b"
        strokeWidth={1.2}
        opacity={lit ? 1 : 0.92}
      />
      <rect x={4} y={4} width={width - 8} height={6} rx={1} fill="rgba(255,255,255,0.22)" />
      {[0.25, 0.5, 0.75].map((pos) => (
        <line
          key={pos}
          x1={width * pos}
          y1={12}
          x2={width * pos}
          y2={height - 2}
          stroke="rgba(0,0,0,0.18)"
          strokeWidth={0.8}
        />
      ))}
      <rect x={2} y={2} width={6} height={6} fill="#64748b" stroke="#334155" strokeWidth={0.6} />
      <rect x={width - 8} y={2} width={6} height={6} fill="#64748b" stroke="#334155" strokeWidth={0.6} />
      {label ? (
        <text x={width / 2} y={height / 2 + 4} textAnchor="middle" fontSize={9} fontWeight={700} fill="#fff">
          {label}
        </text>
      ) : null}
    </g>
  );
}

type DockerContainerProps = ShippingContainerProps;

export function DockerContainer({
  color,
  label,
  x = 0,
  y = 0,
  width = 52,
  height = 28,
  lit = false,
  labelSize = 8,
}: DockerContainerProps & { labelSize?: number }) {
  const barY = Math.round(height * 0.38);
  const barH = Math.max(10, Math.round(height * 0.34));
  const labelY = barY + barH / 2 + labelSize * 0.38;

  return (
    <g transform={`translate(${x}, ${y})`} className={lit ? "s04-lit" : undefined}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={4}
        fill="#f8fafc"
        stroke={lit ? "#0078d4" : "#64748b"}
        strokeWidth={lit ? 2 : 1.4}
      />
      <rect x={0} y={0} width={width} height={Math.round(height * 0.26)} rx={4} fill="#0078d4" />
      <rect x={0} y={Math.round(height * 0.2)} width={width} height={3} fill="#005a9e" />
      <circle cx={10} cy={Math.round(height * 0.13)} r={2.8} fill="#fff" opacity={0.92} />
      <circle cx={16} cy={Math.round(height * 0.13)} r={2.8} fill="#fff" opacity={0.68} />
      <rect x={8} y={barY} width={width - 16} height={barH} rx={2} fill={color} opacity={0.9} />
      {label ? (
        <text
          x={width / 2}
          y={labelY}
          textAnchor="middle"
          fontSize={labelSize}
          fontWeight={700}
          fill="#1e293b"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

export function MiniShipScene({ variant }: { variant: "standard" | "port" | "isolated" }) {
  if (variant === "standard") {
    return (
      <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
        <ShippingContainer color={CONTAINER_COLORS[0]} x={8} y={18} width={30} height={22} label="쌀" />
        <ShippingContainer color={CONTAINER_COLORS[1]} x={42} y={18} width={30} height={22} label="TV" />
        <ShippingContainer color={CONTAINER_COLORS[2]} x={76} y={18} width={30} height={22} label="부품" />
        <text x={60} y={12} textAnchor="middle" fontSize={8} fill="#64748b">
          같은 크기 · 같은 규격
        </text>
      </svg>
    );
  }

  if (variant === "port") {
    return (
      <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
        <text x={14} y={10} fontSize={7} fill="#64748b">
          부산항
        </text>
        <path d="M4 42 Q30 38 60 42 T116 42 L116 48 L4 48 Z" fill="#bfdbfe" opacity={0.5} />
        <path d="M18 40 L60 28 L102 40 L96 44 L24 44 Z" fill="#64748b" />
        <ShippingContainer color={CONTAINER_COLORS[0]} x={28} y={14} width={24} height={18} />
        <path d="M104 36 L112 32 L112 40 Z" fill="#0078d4" />
        <rect x={106} y={38} width={10} height={8} rx={1} fill="#475569" />
        <text x={111} y={10} fontSize={7} fill="#64748b">
          트럭
        </text>
        <text x={60} y={52} textAnchor="middle" fontSize={7} fill="#334155">
          재적재 없이 그대로 연결
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
      <ShippingContainer color="#8b5cf6" x={10} y={20} width={34} height={24} label="냉동" />
      <ShippingContainer color="#06b6d4" x={68} y={20} width={34} height={24} label="일반" />
      <line x1={52} y1={14} x2={52} y2={48} stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="3 2" />
      <text x={60} y={12} textAnchor="middle" fontSize={8} fill="#64748b">
        컨테이너 분리
      </text>
    </svg>
  );
}

export function MiniDockerScene({ variant }: { variant: "standard" | "port" | "isolated" }) {
  if (variant === "standard") {
    return (
      <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
        <DockerContainer color={CONTAINER_COLORS[0]} x={8} y={18} width={32} height={26} label="FaSS-WEB" labelSize={9} />
        <DockerContainer color={CONTAINER_COLORS[1]} x={42} y={18} width={32} height={26} label="FaSS-API" labelSize={9} />
        <DockerContainer color={CONTAINER_COLORS[2]} x={76} y={18} width={32} height={26} label="FaSS-DB" labelSize={9} />
        <text x={60} y={12} textAnchor="middle" fontSize={9} fill="#0078d4">
          같은 Docker 규격
        </text>
      </svg>
    );
  }

  if (variant === "port") {
    return (
      <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
        <rect x={6} y={30} width={28} height={18} rx={3} fill="#e2e8f0" stroke="#94a3b8" />
        <text x={20} y={42} textAnchor="middle" fontSize={7} fill="#64748b">
          개발실
        </text>
        <path d="M38 38 H48" stroke="#0078d4" strokeWidth={1.5} markerEnd="url(#s04-arrow)" />
        <rect x={50} y={30} width={28} height={18} rx={3} fill="#dbeafe" stroke="#0078d4" />
        <text x={64} y={42} textAnchor="middle" fontSize={7} fill="#0078d4">
          운영 서버
        </text>
        <DockerContainer color={CONTAINER_COLORS[0]} x={84} y={16} width={28} height={22} label="동일" />
        <defs>
          <marker id="s04-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0078d4" />
          </marker>
        </defs>
        <text x={60} y={10} textAnchor="middle" fontSize={8} fill="#0078d4">
          테스트 그대로 이전
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
      <DockerContainer color="#8b5cf6" x={10} y={18} width={34} height={26} label="주문" />
      <DockerContainer color="#06b6d4" x={68} y={18} width={34} height={26} label="재고" />
      <line x1={52} y1={12} x2={52} y2={48} stroke="#0078d4" strokeWidth={1.5} strokeDasharray="3 2" opacity={0.5} />
      <text x={60} y={10} textAnchor="middle" fontSize={8} fill="#0078d4">
        서로 영향 없음
      </text>
    </svg>
  );
}

/** 상단 — 실제 배·컨테이너 물류 현장 */
export function Slide04LogisticsHero() {
  const { animating } = useSlideDiagramMotion();

  return (
    <div className="s04-tier-hero s04-tier-hero--logistics">
      <svg viewBox="0 0 640 88" className="s04-tier-hero__svg" aria-hidden="true">
        <rect x={0} y={0} width={640} height={88} rx={6} fill="#f1f5f9" />
        <motion.path
          d="M0 68 Q160 62 320 68 T640 68 L640 88 L0 88 Z"
          fill="#93c5fd"
          opacity={0.45}
          animate={
            animating
              ? {
                  d: [
                    "M0 68 Q160 62 320 68 T640 68 L640 88 L0 88 Z",
                    "M0 68 Q160 74 320 68 T640 68 L640 88 L0 88 Z",
                    "M0 68 Q160 62 320 68 T640 68 L640 88 L0 88 Z",
                  ],
                }
              : undefined
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x={0} y={52} width={640} height={10} fill="#cbd5e1" opacity={0.5} />
        <text x={36} y={48} fontSize={10} fontWeight={700} fill="#475569">
          부산항
        </text>
        <rect x={24} y={54} width={48} height={6} rx={1} fill="#94a3b8" />
        <path d="M120 58 L320 34 L520 58 L508 64 L132 64 Z" fill="#475569" />
        <path d="M132 64 L508 64 L498 68 L142 68 Z" fill="#334155" />
        <rect x={488} y={26} width={8} height={36} fill="#64748b" />
        <rect x={478} y={22} width={28} height={5} rx={1} fill="#94a3b8" />
        <ShippingContainer color={CONTAINER_COLORS[0]} x={168} y={36} width={48} height={28} label="쌀" />
        <ShippingContainer color={CONTAINER_COLORS[1]} x={228} y={36} width={48} height={28} label="냉동" />
        <ShippingContainer color={CONTAINER_COLORS[2]} x={288} y={36} width={48} height={28} label="부품" />
        <ShippingContainer color="#10b981" x={348} y={36} width={48} height={28} label="TV" />
        <text x={420} y={48} fontSize={9} fill="#64748b">
          컨테이너선
        </text>
        <rect x={540} y={54} width={36} height={14} rx={2} fill="#475569" />
        <rect x={578} y={58} width={28} height={10} rx={1} fill="#64748b" />
        <text x={556} y={48} fontSize={9} fill="#64748b">
          야적장
        </text>
        <text x={320} y={14} textAnchor="middle" fontSize={10} fontWeight={700} fill="#334155">
          내용물은 달라도 · 컨테이너 규격은 동일 · 배·트럭·기차에 그대로 실어 운송
        </text>
      </svg>
    </div>
  );
}

/** 하단 — FaSS 시스템(서버·Docker) */
export function Slide04SystemHero() {
  const { animating } = useSlideDiagramMotion();
  const labels = ["FaSS-WEB", "FaSS-API", "FaSS-DB"] as const;
  const containerW = 62;
  const containerH = 42;
  const containerY = 30;
  const containerXs = [118, 196, 274, 352] as const;

  return (
    <div className="s04-tier-hero s04-tier-hero--system">
      <svg viewBox="0 0 640 112" className="s04-tier-hero__svg" aria-hidden="true">
        <rect x={0} y={0} width={640} height={112} rx={8} fill="#f0f9ff" />

        <text x={320} y={20} textAnchor="middle" fontSize={12} fontWeight={700} fill="#0078d4">
          프로그램별 Docker 컨테이너 · 동일 규격 실행·배포
        </text>

        {containerXs.map((x, i) => (
          <DockerContainer
            key={labels[i] ?? "batch"}
            color={i < 3 ? CONTAINER_COLORS[i] : "#10b981"}
            x={x}
            y={containerY}
            width={containerW}
            height={containerH}
            label={i < 3 ? labels[i] : "FaSS-Batch"}
            labelSize={10}
          />
        ))}

        <motion.g
          animate={animating ? { opacity: [0.55, 1, 0.55] } : undefined}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <rect x={488} y={26} width={112} height={50} rx={6} fill="#dbeafe" stroke="#0078d4" strokeWidth={1.5} />
          <text x={544} y={46} textAnchor="middle" fontSize={11} fontWeight={800} fill="#0078d4">
            Kubernetes
          </text>
          <text x={544} y={62} textAnchor="middle" fontSize={10} fontWeight={600} fill="#334155">
            자동 배치·복제
          </text>
        </motion.g>

        <rect x={72} y={82} width={496} height={26} rx={6} fill="#e2e8f0" stroke="#64748b" strokeWidth={1.4} />
        <rect x={86} y={90} width={12} height={12} rx={2} fill="#22c55e" />
        <rect x={102} y={90} width={12} height={12} rx={2} fill="#22c55e" />
        <rect x={118} y={90} width={12} height={12} rx={2} fill="#22c55e" />
        <text x={340} y={99} textAnchor="middle" fontSize={11} fontWeight={700} fill="#334155">
          FaSS 운영 서버 / 클라우드
        </text>
      </svg>
    </div>
  );
}
