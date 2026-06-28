"use client";

import { motion, useReducedMotion } from "framer-motion";

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
}: DockerContainerProps) {
  return (
    <g transform={`translate(${x}, ${y})`} className={lit ? "s04-lit" : undefined}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={3}
        fill="#f8fafc"
        stroke={lit ? "#0078d4" : "#94a3b8"}
        strokeWidth={lit ? 2 : 1.2}
      />
      <rect x={0} y={0} width={width} height={7} rx={3} fill="#0078d4" />
      <rect x={0} y={5} width={width} height={2} fill="#005a9e" />
      <circle cx={8} cy={3.5} r={2.2} fill="#fff" opacity={0.9} />
      <circle cx={13} cy={3.5} r={2.2} fill="#fff" opacity={0.65} />
      <rect x={6} y={12} width={width - 12} height={10} rx={1.5} fill={color} opacity={0.85} />
      {label ? (
        <text x={width / 2} y={height - 4} textAnchor="middle" fontSize={8} fontWeight={700} fill="#334155">
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
        <ShippingContainer color={CONTAINER_COLORS[0]} x={8} y={18} width={30} height={22} label="A" />
        <ShippingContainer color={CONTAINER_COLORS[1]} x={42} y={18} width={30} height={22} label="B" />
        <ShippingContainer color={CONTAINER_COLORS[2]} x={76} y={18} width={30} height={22} label="C" />
        <text x={60} y={12} textAnchor="middle" fontSize={8} fill="#64748b">
          동일 규격 ISO
        </text>
      </svg>
    );
  }

  if (variant === "port") {
    return (
      <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
        <path d="M4 42 Q30 38 60 42 T116 42 L116 48 L4 48 Z" fill="#bfdbfe" opacity={0.5} />
        <path d="M18 40 L60 28 L102 40 L96 44 L24 44 Z" fill="#64748b" />
        <ShippingContainer color={CONTAINER_COLORS[0]} x={28} y={14} width={24} height={18} />
        <ShippingContainer color={CONTAINER_COLORS[1]} x={54} y={14} width={24} height={18} />
        <path d="M104 36 L112 32 L112 40 Z" fill="#0078d4" />
        <text x={60} y={10} textAnchor="middle" fontSize={8} fill="#64748b">
          항구 → 배적
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
      <ShippingContainer color="#8b5cf6" x={10} y={20} width={34} height={24} label="의류" />
      <ShippingContainer color="#06b6d4" x={68} y={20} width={34} height={24} label="액체" />
      <line x1={52} y1={14} x2={52} y2={48} stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="3 2" />
      <text x={60} y={12} textAnchor="middle" fontSize={8} fill="#64748b">
        독립 적재
      </text>
    </svg>
  );
}

export function MiniDockerScene({ variant }: { variant: "standard" | "port" | "isolated" }) {
  if (variant === "standard") {
    return (
      <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
        <DockerContainer color={CONTAINER_COLORS[0]} x={8} y={18} width={30} height={24} label="App-A" />
        <DockerContainer color={CONTAINER_COLORS[1]} x={42} y={18} width={30} height={24} label="App-B" />
        <DockerContainer color={CONTAINER_COLORS[2]} x={76} y={18} width={30} height={24} label="App-C" />
        <text x={60} y={12} textAnchor="middle" fontSize={8} fill="#0078d4">
          동일 Docker 규격
        </text>
      </svg>
    );
  }

  if (variant === "port") {
    return (
      <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
        <rect x={6} y={30} width={28} height={18} rx={3} fill="#e2e8f0" stroke="#94a3b8" />
        <text x={20} y={42} textAnchor="middle" fontSize={7} fill="#64748b">
          Dev PC
        </text>
        <path d="M38 38 H48" stroke="#0078d4" strokeWidth={1.5} markerEnd="url(#s04-arrow)" />
        <rect x={50} y={30} width={28} height={18} rx={3} fill="#dbeafe" stroke="#0078d4" />
        <text x={64} y={42} textAnchor="middle" fontSize={7} fill="#0078d4">
          Cloud
        </text>
        <DockerContainer color={CONTAINER_COLORS[0]} x={84} y={16} width={28} height={22} />
        <defs>
          <marker id="s04-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0078d4" />
          </marker>
        </defs>
        <text x={60} y={10} textAnchor="middle" fontSize={8} fill="#0078d4">
          그대로 이식
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 56" className="s04-mini-scene" aria-hidden="true">
      <DockerContainer color="#8b5cf6" x={10} y={18} width={34} height={26} label="Service-A" />
      <DockerContainer color="#06b6d4" x={68} y={18} width={34} height={26} label="Service-B" />
      <line x1={52} y1={12} x2={52} y2={48} stroke="#0078d4" strokeWidth={1.5} strokeDasharray="3 2" opacity={0.5} />
      <text x={60} y={10} textAnchor="middle" fontSize={8} fill="#0078d4">
        격리 실행
      </text>
    </svg>
  );
}

export function Slide04ShipHero() {
  const reduceMotion = useReducedMotion();
  const labels = ["FaSS-WEB", "FaSS-API", "FaSS-DB"];

  return (
    <div className="docker-ship-hero">
      <div className="docker-ship-hero__scene docker-ship-hero__scene--logistics">
        <div className="docker-ship-hero__caption">
          <i className="fas fa-ship" /> 물류 · 컨테이너선
        </div>
        <svg viewBox="0 0 220 96" className="docker-ship-hero__svg" aria-hidden="true">
          <motion.path
            d="M0 72 Q55 66 110 72 T220 72 L220 96 L0 96 Z"
            fill="#93c5fd"
            opacity={0.35}
            animate={reduceMotion ? undefined : { d: ["M0 72 Q55 66 110 72 T220 72 L220 96 L0 96 Z", "M0 72 Q55 78 110 72 T220 72 L220 96 L0 96 Z", "M0 72 Q55 66 110 72 T220 72 L220 96 L0 96 Z"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M28 68 L110 44 L192 68 L184 74 L36 74 Z" fill="#475569" />
          <path d="M36 74 L184 74 L178 78 L42 78 Z" fill="#334155" />
          <rect x={168} y={36} width={6} height={32} fill="#64748b" />
          <rect x={160} y={32} width={22} height={4} fill="#94a3b8" />
          <ShippingContainer color={CONTAINER_COLORS[0]} x={52} y={38} width={44} height={26} label="A" />
          <ShippingContainer color={CONTAINER_COLORS[1]} x={98} y={38} width={44} height={26} label="B" />
          <ShippingContainer color={CONTAINER_COLORS[2]} x={144} y={38} width={44} height={26} label="C" />
          <text x={14} y={62} fontSize={9} fill="#64748b">
            부산항
          </text>
        </svg>
      </div>

      <div className="docker-ship-hero__bridge">
        <div className="docker-ship-hero__bridge-tag">1:1 비유</div>
        <motion.div
          className="docker-ship-hero__bridge-arrows"
          animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <i className="fas fa-arrows-left-right" />
        </motion.div>
        <p>철제 컨테이너 = 도커 컨테이너</p>
      </div>

      <div className="docker-ship-hero__scene docker-ship-hero__scene--it">
        <div className="docker-ship-hero__caption docker-ship-hero__caption--it">
          <i className="fab fa-docker" /> IT · 도커 호스트
        </div>
        <svg viewBox="0 0 220 96" className="docker-ship-hero__svg" aria-hidden="true">
          <rect x={24} y={58} width={172} height={22} rx={4} fill="#e2e8f0" stroke="#94a3b8" strokeWidth={1.2} />
          <rect x={32} y={64} width={8} height={10} rx={1} fill="#22c55e" />
          <rect x={44} y={64} width={8} height={10} rx={1} fill="#22c55e" />
          <text x={110} y={72} textAnchor="middle" fontSize={9} fill="#64748b">
            서버 / 클라우드 VM
          </text>
          <DockerContainer color={CONTAINER_COLORS[0]} x={52} y={26} width={44} height={28} label={labels[0]} />
          <DockerContainer color={CONTAINER_COLORS[1]} x={98} y={26} width={44} height={28} label={labels[1]} />
          <DockerContainer color={CONTAINER_COLORS[2]} x={144} y={26} width={44} height={28} label={labels[2]} />
          <motion.g
            animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <path
              d="M186 18 C196 10 206 10 214 18"
              fill="none"
              stroke="#0078d4"
              strokeWidth={1.2}
              opacity={0.6}
            />
            <text x={200} y={14} textAnchor="middle" fontSize={8} fill="#0078d4">
              Cloud
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
