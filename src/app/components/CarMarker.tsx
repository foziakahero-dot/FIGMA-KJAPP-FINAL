import type { DriverStatus } from "../data/types";

export type CarMarkerOptions = {
  headingDeg: number;
  status: DriverStatus;
  etaMin?: number;
  showEta?: boolean;
  tier?: "Eco" | "Standard" | "Premium" | "XL";
  onSelect?: () => void;
};

const STATUS_COLOR: Record<DriverStatus, string> = {
  available: "#5ef0ff",
  busy: "#ffb547",
  offline: "rgba(255,255,255,0.45)",
};

const TIER_TINT: Record<NonNullable<CarMarkerOptions["tier"]>, { base: string; top: string }> = {
  Eco: { base: "#0d2a26", top: "#1f6b5a" },
  Standard: { base: "#0c1426", top: "#1f3a66" },
  Premium: { base: "#1a1a22", top: "#7d8696" },
  XL: { base: "#161922", top: "#3a4356" },
};

let UID = 0;

export function createCarMarkerElement(opts: CarMarkerOptions): HTMLDivElement {
  const uid = ++UID;
  const wrap = document.createElement("div");
  wrap.className = "kjapp-car-marker";
  wrap.style.position = "relative";
  wrap.style.width = "0";
  wrap.style.height = "0";
  wrap.style.cursor = opts.onSelect ? "pointer" : "default";
  wrap.style.pointerEvents = "auto";

  const color = STATUS_COLOR[opts.status];
  const tint = TIER_TINT[opts.tier ?? "Standard"];
  const dim = opts.status === "offline" ? 0.55 : 1;

  wrap.innerHTML = `
    <div class="kjapp-car-rot" style="
      position:absolute; left:-22px; top:-22px; width:44px; height:44px;
      transform: rotate(${opts.headingDeg}deg);
      transition: transform 700ms cubic-bezier(.4,0,.2,1);
      opacity:${dim};
      will-change: transform;
    ">
      <svg viewBox="0 0 44 44" width="44" height="44" style="display:block; overflow:visible;">
        <defs>
          <radialGradient id="cbody-${uid}" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="${tint.top}" />
            <stop offset="55%" stop-color="${tint.base}" />
            <stop offset="100%" stop-color="#04060c" />
          </radialGradient>
          <linearGradient id="cglass-${uid}" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0.18"/>
          </linearGradient>
          <radialGradient id="chead-${uid}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
            <stop offset="60%" stop-color="${color}" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
          </radialGradient>
          <filter id="crim-${uid}" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="cshadow-${uid}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" flood-color="#000" flood-opacity="0.55"/>
          </filter>
        </defs>

        <!-- Live pulse ring -->
        ${
          opts.status !== "offline"
            ? `<circle cx="22" cy="22" r="14" fill="${color}" opacity="0.10">
                 <animate attributeName="r" values="14;20;14" dur="3s" repeatCount="indefinite"/>
                 <animate attributeName="opacity" values="0.18;0.04;0.18" dur="3s" repeatCount="indefinite"/>
               </circle>`
            : ""
        }

        <!-- Headlight cone (in heading direction = up) -->
        ${
          opts.status !== "offline"
            ? `<ellipse cx="22" cy="6" rx="10" ry="8" fill="url(#chead-${uid})" opacity="0.55"/>`
            : ""
        }

        <g filter="url(#cshadow-${uid})">
          <!-- Wheels (under body) -->
          <rect x="9.5" y="11" width="3" height="5" rx="1" fill="#0a0d14"/>
          <rect x="31.5" y="11" width="3" height="5" rx="1" fill="#0a0d14"/>
          <rect x="9.5" y="28" width="3" height="5" rx="1" fill="#0a0d14"/>
          <rect x="31.5" y="28" width="3" height="5" rx="1" fill="#0a0d14"/>

          <!-- Side mirrors -->
          <rect x="10" y="17" width="2.5" height="2" rx="0.6" fill="${tint.base}" stroke="${color}" stroke-width="0.4" stroke-opacity="0.6"/>
          <rect x="31.5" y="17" width="2.5" height="2" rx="0.6" fill="${tint.base}" stroke="${color}" stroke-width="0.4" stroke-opacity="0.6"/>

          <!-- Body silhouette (with status rim glow) -->
          <g filter="url(#crim-${uid})">
            <path d="M 14 8
                     Q 14 5 22 5
                     Q 30 5 30 8
                     L 31 22
                     L 31 33
                     Q 31 38 22 38
                     Q 13 38 13 33
                     L 13 22 Z"
                  fill="url(#cbody-${uid})"
                  stroke="${color}"
                  stroke-width="0.9"
                  stroke-opacity="0.85"/>
          </g>

          <!-- Front windshield -->
          <path d="M 16 10 L 28 10 L 29 17 L 15 17 Z"
                fill="url(#cglass-${uid})"
                opacity="0.85"/>

          <!-- Rear windshield -->
          <path d="M 15 25 L 29 25 L 28 32 L 16 32 Z"
                fill="url(#cglass-${uid})"
                opacity="0.6"/>

          <!-- Roof highlight -->
          <rect x="15.5" y="18" width="13" height="6.5" rx="1.5"
                fill="${tint.top}" opacity="0.55"/>
          <line x1="15.5" y1="21.2" x2="28.5" y2="21.2" stroke="${color}" stroke-width="0.3" stroke-opacity="0.4"/>

          <!-- Headlights -->
          <ellipse cx="17" cy="7.5" rx="1.6" ry="1" fill="#fff" opacity="0.95"/>
          <ellipse cx="27" cy="7.5" rx="1.6" ry="1" fill="#fff" opacity="0.95"/>

          <!-- Taillights -->
          <rect x="15.5" y="35.5" width="3" height="1.4" rx="0.5" fill="#ff4a4a" opacity="0.9"/>
          <rect x="25.5" y="35.5" width="3" height="1.4" rx="0.5" fill="#ff4a4a" opacity="0.9"/>
        </g>
      </svg>
    </div>
    ${
      opts.showEta && opts.etaMin != null && opts.status !== "offline"
        ? `<div style="
            position:absolute; left:24px; top:-30px;
            padding:3px 7px; border-radius:9999px;
            background: rgba(5,6,15,0.94);
            border:1px solid ${color}aa;
            box-shadow: 0 0 12px ${color}55, 0 2px 6px rgba(0,0,0,0.5);
            color:${color};
            font: 600 10px/1 'JetBrains Mono', monospace;
            letter-spacing: 0.04em;
            white-space: nowrap;
          ">${opts.etaMin} MIN</div>`
        : ""
    }
  `;

  if (opts.onSelect) {
    wrap.addEventListener("click", (e) => {
      e.stopPropagation();
      opts.onSelect!();
    });
  }

  return wrap;
}

export function updateCarMarkerElement(el: HTMLDivElement, opts: Partial<CarMarkerOptions>) {
  if (opts.headingDeg != null) {
    const rot = el.querySelector<HTMLDivElement>(".kjapp-car-rot");
    if (rot) rot.style.transform = `rotate(${opts.headingDeg}deg)`;
  }
}
