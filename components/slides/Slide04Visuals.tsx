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
        <text x={width / 2} y={height / 2 + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="#fff">
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
        fill="#f1f5f9"
        stroke={lit ? "#005a9e" : "#334155"}
        strokeWidth={lit ? 2.4 : 2}
      />
      <rect x={0} y={0} width={width} height={Math.round(height * 0.26)} rx={4} fill="#0078d4" />
      <rect x={0} y={Math.round(height * 0.2)} width={width} height={3} fill="#004578" />
      <circle cx={10} cy={Math.round(height * 0.13)} r={2.8} fill="#fff" opacity={1} />
      <circle cx={16} cy={Math.round(height * 0.13)} r={2.8} fill="#fff" opacity={0.85} />
      <rect x={8} y={barY} width={width - 16} height={barH} rx={2} fill={color} />
      {label ? (
        <text
          x={width / 2}
          y={labelY}
          textAnchor="middle"
          fontSize={labelSize}
          fontWeight={800}
          fill="#fff"
          stroke="#0f172a"
          strokeWidth={0.35}
          paintOrder="stroke"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

export function MiniShipScene({ variant }: { variant: "standard" | "port" | "isolated" }) {
  const { animating } = useSlideDiagramMotion();

  if (variant === "standard") {
    // 표준화 — 세 컨테이너가 같은 규격으로 순서대로 내려앉음
    return (
      <svg viewBox="0 0 120 70" className="s04-mini-scene" aria-hidden="true">
        {[6, 42, 78].map((x, i) => (
          <motion.g
            key={x}
            initial={false}
            animate={animating ? { y: [-14, 0], opacity: [0, 1] } : { y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: animating ? i * 0.45 : 0,
              repeat: animating ? Infinity : 0,
              repeatDelay: 1.6,
              ease: "easeOut",
            }}
          >
            <ShippingContainer
              color={CONTAINER_COLORS[i]}
              x={x}
              y={22}
              width={34}
              height={26}
              label={["쌀", "TV", "부품"][i]}
            />
          </motion.g>
        ))}
        <text x={60} y={14} textAnchor="middle" fontSize={10} fontWeight={700} fill="#64748b">
          같은 크기 · 같은 규격
        </text>
      </svg>
    );
  }

  if (variant === "port") {
    // 이식성 — 컨테이너가 배에서 트럭으로 그대로 이동
    return (
      <svg viewBox="0 0 120 70" className="s04-mini-scene" aria-hidden="true">
        <text x={14} y={12} fontSize={9} fontWeight={700} fill="#64748b">
          부산항
        </text>
        <path d="M4 50 Q30 46 60 50 T116 50 L116 58 L4 58 Z" fill="#bfdbfe" opacity={0.5} />
        <path d="M18 48 L60 34 L102 48 L96 52 L24 52 Z" fill="#64748b" />
        <path d="M104 44 L112 40 L112 48 Z" fill="#0078d4" />
        <rect x={106} y={46} width={12} height={10} rx={1} fill="#475569" />
        <text x={111} y={12} fontSize={9} fontWeight={700} fill="#64748b">
          트럭
        </text>
        <motion.g
          initial={false}
          animate={animating ? { x: [0, 74], y: [0, 22], opacity: [1, 1, 0] } : { x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 1.8,
            times: [0, 0.8, 1],
            repeat: animating ? Infinity : 0,
            repeatDelay: 0.6,
            ease: "easeInOut",
          }}
        >
          <ShippingContainer color={CONTAINER_COLORS[0]} x={26} y={18} width={28} height={22} />
        </motion.g>
        <text x={60} y={66} textAnchor="middle" fontSize={9} fontWeight={700} fill="#334155">
          재적재 없이 그대로 연결
        </text>
      </svg>
    );
  }

  // 격리 — 한쪽 장애(흔들림)가 반대편으로 전파되지 않음
  return (
    <svg viewBox="0 0 120 70" className="s04-mini-scene" aria-hidden="true">
      <motion.g
        initial={false}
        animate={animating ? { x: [0, -1.5, 1.5, -1.5, 0], rotate: [0, -1.5, 1.5, -1.5, 0] } : {}}
        transition={{
          duration: 0.6,
          repeat: animating ? Infinity : 0,
          repeatDelay: 1.4,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "27px 38px" }}
      >
        <ShippingContainer color="#8b5cf6" x={8} y={24} width={38} height={28} label="냉동" />
      </motion.g>
      <ShippingContainer color="#06b6d4" x={68} y={24} width={38} height={28} label="일반" />
      <motion.line
        x1={52}
        y1={16}
        x2={52}
        y2={58}
        stroke="#cbd5e1"
        strokeWidth={2}
        strokeDasharray="3 2"
        animate={animating ? { stroke: ["#cbd5e1", "#22c55e", "#cbd5e1"] } : undefined}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={60} y={14} textAnchor="middle" fontSize={10} fontWeight={700} fill="#64748b">
        컨테이너 분리
      </text>
    </svg>
  );
}

export function MiniDockerScene({ variant }: { variant: "standard" | "port" | "isolated" }) {
  if (variant === "standard") {
    return (
      <svg viewBox="0 0 120 56" className="s04-mini-scene s04-mini-scene--docker" aria-hidden="true">
        <DockerContainer color={CONTAINER_COLORS[0]} x={4} y={14} width={36} height={30} />
        <DockerContainer color={CONTAINER_COLORS[1]} x={42} y={14} width={36} height={30} />
        <DockerContainer color={CONTAINER_COLORS[2]} x={80} y={14} width={36} height={30} />
        <text x={60} y={10} textAnchor="middle" fontSize={10} fontWeight={800} fill="#004578">
          같은 Docker 규격
        </text>
      </svg>
    );
  }

  if (variant === "port") {
    return (
      <svg viewBox="0 0 120 56" className="s04-mini-scene s04-mini-scene--docker" aria-hidden="true">
        <rect x={2} y={28} width={32} height={22} rx={3} fill="#e2e8f0" stroke="#334155" strokeWidth={1.8} />
        <text x={18} y={42} textAnchor="middle" fontSize={9} fontWeight={700} fill="#1e293b">
          개발실
        </text>
        <path d="M36 38 H46" stroke="#005a9e" strokeWidth={2.6} markerEnd="url(#s04-arrow)" />
        <rect x={48} y={28} width={32} height={22} rx={3} fill="#bfdbfe" stroke="#005a9e" strokeWidth={2} />
        <text x={64} y={42} textAnchor="middle" fontSize={9} fontWeight={800} fill="#004578">
          운영 서버
        </text>
        <DockerContainer color={CONTAINER_COLORS[0]} x={84} y={12} width={32} height={26} label="동일" labelSize={10} />
        <defs>
          <marker id="s04-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#005a9e" />
          </marker>
        </defs>
        <text x={60} y={10} textAnchor="middle" fontSize={9} fontWeight={800} fill="#004578">
          테스트 그대로 이전
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 56" className="s04-mini-scene s04-mini-scene--docker" aria-hidden="true">
      <DockerContainer color="#7c3aed" x={6} y={14} width={40} height={30} label="주문" labelSize={10} />
      <DockerContainer color="#0891b2" x={70} y={14} width={40} height={30} label="재고" labelSize={10} />
      <line x1={52} y1={10} x2={52} y2={48} stroke="#005a9e" strokeWidth={2.4} strokeDasharray="4 3" />
      <text x={60} y={8} textAnchor="middle" fontSize={9} fontWeight={800} fill="#004578">
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
  const containerW = 68;
  const containerH = 48;
  const containerY = 42;
  const containerXs = [108, 188, 268, 348] as const;

  return (
    <div className="s04-tier-hero s04-tier-hero--system">
      <svg viewBox="0 0 640 148" className="s04-tier-hero__svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <rect x={0} y={0} width={640} height={148} rx={8} fill="#dbeafe" />

        <text x={320} y={24} textAnchor="middle" fontSize={14} fontWeight={800} fill="#004578">
          프로그램별 Docker 컨테이너 · 동일 규격 실행·배포
        </text>

        {containerXs.map((x, i) => (
          <motion.g
            key={x}
            initial={false}
            animate={animating ? { y: [0, -3, 0] } : undefined}
            transition={{
              duration: 1.6,
              delay: i * 0.2,
              repeat: animating ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <DockerContainer
              color={i < 3 ? CONTAINER_COLORS[i] : "#10b981"}
              x={x}
              y={containerY}
              width={containerW}
              height={containerH}
              labelSize={10}
            />
          </motion.g>
        ))}

        <motion.g
          animate={animating ? { opacity: [0.55, 1, 0.55] } : undefined}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <rect x={468} y={34} width={128} height={58} rx={8} fill="#bfdbfe" stroke="#005a9e" strokeWidth={2.4} />
          <text x={532} y={58} textAnchor="middle" fontSize={13} fontWeight={800} fill="#004578">
            Kubernetes
          </text>
          <text x={532} y={76} textAnchor="middle" fontSize={11} fontWeight={700} fill="#1e293b">
            자동 배치·복제
          </text>
        </motion.g>

        {/* K8s가 컨테이너를 운영 서버로 자동 배치하는 흐름 */}
        <line x1={320} y1={92} x2={320} y2={104} stroke="#005a9e" strokeWidth={2} strokeDasharray="4 3" opacity={0.5} />
        {animating ? (
          <motion.circle
            cx={320}
            cy={92}
            r={4.5}
            fill="#0078d4"
            animate={{ cy: [92, 104], opacity: [0, 1, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeIn" }}
          />
        ) : null}

        <rect x={56} y={104} width={528} height={34} rx={8} fill="#cbd5e1" stroke="#334155" strokeWidth={2} />
        <rect x={72} y={114} width={14} height={14} rx={2} fill="#22c55e" />
        <rect x={90} y={114} width={14} height={14} rx={2} fill="#22c55e" />
        <rect x={108} y={114} width={14} height={14} rx={2} fill="#22c55e" />
        <text x={340} y={125} textAnchor="middle" fontSize={13} fontWeight={700} fill="#334155">
          FaSS 운영 서버 / 클라우드
        </text>
      </svg>
    </div>
  );
}
