import { motion } from "motion/react";

type AvailableCar = { id: string; x: number; y: number; eta: number; tier?: string; plate?: string };
type HotZone = { id: string; x: number; y: number; intensity: string; demand: number; label: string };

function CarMarker({ x, y, eta, delay }: { x: number; y: number; eta: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Outer glow pulse */}
      <circle r="18" fill="rgba(94,240,255,0.08)">
        <animate attributeName="r" values="14;22;14" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.08;0.4" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>

      {/* Car body — top-down silhouette */}
      <g transform="translate(-8 -6)">
        {/* Main body */}
        <rect x="2" y="3" width="12" height="8" rx="2.5" fill="#0b1520" stroke="#5ef0ff" strokeWidth="1.1" />
        {/* Cabin */}
        <rect x="4" y="1" width="8" height="5" rx="1.5" fill="#5ef0ff" opacity="0.25" />
        {/* Wheels */}
        <circle cx="4" cy="11.5" r="1.6" fill="#5ef0ff" opacity="0.7" />
        <circle cx="12" cy="11.5" r="1.6" fill="#5ef0ff" opacity="0.7" />
        <circle cx="4" cy="3.5" r="1.6" fill="#5ef0ff" opacity="0.7" />
        <circle cx="12" cy="3.5" r="1.6" fill="#5ef0ff" opacity="0.7" />
        {/* Headlights */}
        <rect x="13" y="5" width="2" height="1.5" rx="0.5" fill="#5ef0ff" opacity="0.9" />
        <rect x="13" y="7.5" width="2" height="1.5" rx="0.5" fill="#5ef0ff" opacity="0.9" />
      </g>

      {/* ETA chip */}
      <g transform="translate(10 -18)">
        <rect x="0" y="0" width="36" height="15" rx="7.5" fill="rgba(5,6,15,0.90)" stroke="rgba(94,240,255,0.55)" strokeWidth="0.8" />
        <text x="18" y="10.5" textAnchor="middle" fill="#5ef0ff" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          {eta} min
        </text>
      </g>
    </g>
  );
}

export function HoloMap({
  showRoute = false,
  showCar = false,
  availableCars = [],
  hotZones = [],
  selfPosition,
}: {
  showRoute?: boolean;
  showCar?: boolean;
  availableCars?: AvailableCar[];
  hotZones?: HotZone[];
  selfPosition?: { x: number; y: number };
}) {
  return (
    <svg viewBox="0 0 390 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="roadGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#5ef0ff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#a06bff" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="route" x1="0" x2="1">
          <stop offset="0%" stopColor="#5ef0ff" />
          <stop offset="50%" stopColor="#a06bff" />
          <stop offset="100%" stopColor="#ff5ed1" />
        </linearGradient>
        <radialGradient id="pulse" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#5ef0ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5ef0ff" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Dark navy base */}
      <rect width="390" height="500" fill="#060b18" />
      <rect width="390" height="500" fill="url(#grid)" />

      {/* Fjord / water — very subtle */}
      <path
        d="M 0 380 Q 100 350 200 390 T 390 370 L 390 500 L 0 500 Z"
        fill="rgba(94,240,255,0.04)"
        stroke="rgba(94,240,255,0.12)"
        strokeWidth="0.5"
      />

      {/* District area fills — very faint */}
      <g opacity="0.18">
        <circle cx="120" cy="180" r="60" fill="rgba(160,107,255,0.06)" />
        <circle cx="270" cy="220" r="70" fill="rgba(94,240,255,0.06)" />
        <circle cx="180" cy="320" r="55" fill="rgba(255,94,209,0.05)" />
      </g>

      {/* Road network — very subtle */}
      <g stroke="url(#roadGrad)" strokeWidth="1.0" fill="none" opacity="0.5">
        <path d="M -20 120 Q 100 100 200 150 T 410 180" vectorEffect="non-scaling-stroke" />
        <path d="M 50 -10 Q 70 150 130 280 T 200 510" vectorEffect="non-scaling-stroke" />
        <path d="M -10 250 Q 150 230 250 270 T 410 290" vectorEffect="non-scaling-stroke" />
        <path d="M 280 -10 Q 260 150 300 280 T 280 510" vectorEffect="non-scaling-stroke" />
        <path d="M -10 60 Q 120 70 200 50 T 410 80" vectorEffect="non-scaling-stroke" />
      </g>

      {/* Minor streets — barely visible */}
      <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" fill="none">
        <path d="M 60 160 Q 100 170 140 155 T 220 170" vectorEffect="non-scaling-stroke" />
        <path d="M 160 60 Q 170 120 155 200 T 170 280" vectorEffect="non-scaling-stroke" />
        <path d="M 240 180 Q 260 230 250 280" vectorEffect="non-scaling-stroke" />
        <path d="M 100 280 Q 130 310 160 300" vectorEffect="non-scaling-stroke" />
      </g>

      {/* District labels — very faint, only visible in map area */}
      <g fill="rgba(255,255,255,0.14)" fontSize="8.5" fontFamily="Space Grotesk, sans-serif" letterSpacing="0.12em">
        <text x="90" y="175">GRÜNERLØKKA</text>
        <text x="242" y="212">SENTRUM</text>
        <text x="148" y="318">SØRENGA</text>
        <text x="278" y="98">TØYEN</text>
        <text x="36" y="415">FJORD</text>
      </g>

      {/* Route line */}
      {showRoute && (
        <motion.path
          d="M 90 340 Q 150 270 200 230 T 310 140"
          fill="none"
          stroke="url(#route)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="600"
          initial={{ strokeDashoffset: 600 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 8px rgba(160,107,255,0.7))" }}
        />
      )}

      {/* Hot zones */}
      {hotZones.map((z, i) => {
        const color = z.intensity === "Høy" ? "#ff5933" : z.intensity === "Middels" ? "#ffb547" : "#ffd089";
        const r = z.intensity === "Høy" ? 48 : z.intensity === "Middels" ? 36 : 26;
        return (
          <g key={z.id} transform={`translate(${z.x} ${z.y})`}>
            <circle r={r} fill={color} opacity="0.12">
              <animate attributeName="r" values={`${r - 4};${r + 6};${r - 4}`} dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.18;0.06;0.18" dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle r={r * 0.55} fill={color} opacity="0.14" />
            <g transform="translate(-26 -8)">
              <rect width="52" height="16" rx="8" fill="rgba(20,12,6,0.85)" stroke={color} strokeWidth="0.6" />
              <text x="26" y="11" textAnchor="middle" fill={color} fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                {z.demand} forespørsler
              </text>
            </g>
          </g>
        );
      })}

      {/* Available car markers — premium top-down car icons */}
      {availableCars.map((c, i) => (
        <CarMarker key={c.id} x={c.x} y={c.y} eta={c.eta} delay={i * 0.4} />
      ))}

      {/* Self/pickup position */}
      <g transform="translate(90 340)">
        <circle r="22" fill="url(#pulse)">
          <animate attributeName="r" values="14;26;14" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r="6" fill="#5ef0ff" stroke="white" strokeWidth="1.5" />
      </g>

      {/* Destination pin */}
      {showRoute && (
        <g transform="translate(310 140)">
          <circle r="20" fill="rgba(255,94,209,0.2)">
            <animate attributeName="r" values="12;22;12" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle r="6" fill="#ff5ed1" stroke="white" strokeWidth="1.5" />
        </g>
      )}

      {/* Driver self position */}
      {selfPosition && (
        <g transform={`translate(${selfPosition.x} ${selfPosition.y})`}>
          <circle r="22" fill="rgba(255,181,71,0.15)">
            <animate attributeName="r" values="16;28;16" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.08;0.3" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle r="9" fill="rgba(255,181,71,0.25)" />
          <circle r="5.5" fill="#ffb547" stroke="white" strokeWidth="1.5" />
          <g transform="translate(8 -16)">
            <rect width="32" height="14" rx="7" fill="rgba(20,12,6,0.88)" stroke="rgba(255,181,71,0.5)" strokeWidth="0.6" />
            <text x="16" y="10" textAnchor="middle" fill="#ffb547" fontSize="8.5" fontFamily="JetBrains Mono, monospace">DEG</text>
          </g>
        </g>
      )}

      {/* Moving driver car on route */}
      {showCar && (
        <motion.g
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: "path('M 90 340 Q 150 270 200 230 T 310 140')" }}
        >
          <circle r="8" fill="#5ef0ff" stroke="white" strokeWidth="2" />
          <circle r="14" fill="rgba(94,240,255,0.25)" />
        </motion.g>
      )}
    </svg>
  );
}
