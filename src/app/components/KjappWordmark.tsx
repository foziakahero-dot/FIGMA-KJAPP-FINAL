import { motion } from "motion/react";

/**
 * Custom Kjapp-wordmark. Skreddersydd SVG med aurora-fyll og signatur
 * "presse-frem" på 'p'-ene — en visuell forkortelse for "kjapt".
 */
export function KjappWordmark({ size = 48 }: { size?: number }) {
  const w = size * 4.2;
  return (
    <motion.svg
      width={w}
      height={size}
      viewBox="0 0 420 100"
      aria-label="Kjapp"
      role="img"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <defs>
        <linearGradient id="kjg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5ef0ff" />
          <stop offset="50%" stopColor="#a06bff" />
          <stop offset="100%" stopColor="#ff5ed1" />
        </linearGradient>
        <linearGradient id="kjg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a06bff" />
          <stop offset="100%" stopColor="#ff5ed1" />
        </linearGradient>
        <filter id="kjglow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#kjglow)" fontFamily="Space Grotesk, Inter, sans-serif" fontWeight="700">
        {/* k */}
        <text x="0" y="78" fontSize="92" fill="url(#kjg)" letterSpacing="-4">k</text>
        {/* j med forlenget descender (signatur) */}
        <text x="58" y="78" fontSize="92" fill="url(#kjg)" letterSpacing="-4">j</text>
        <path d="M 76 92 Q 76 110 60 110" stroke="url(#kjg2)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85"/>
        {/* a */}
        <text x="104" y="78" fontSize="92" fill="url(#kjg)" letterSpacing="-4">a</text>
        {/* pp — italic-skråstilt for "kjapt"-bevegelse */}
        <g transform="translate(170 0) skewX(-8)">
          <text x="0" y="78" fontSize="92" fill="url(#kjg)" letterSpacing="-4">p</text>
          <text x="56" y="78" fontSize="92" fill="url(#kjg)" letterSpacing="-4">p</text>
        </g>
        {/* speed-streker som signaliserer "kjapt" */}
        <g stroke="url(#kjg2)" strokeLinecap="round" strokeWidth="3" opacity="0.7">
          <line x1="340" y1="36" x2="395" y2="36" />
          <line x1="352" y1="50" x2="410" y2="50" />
          <line x1="346" y1="64" x2="400" y2="64" />
        </g>
      </g>
    </motion.svg>
  );
}
