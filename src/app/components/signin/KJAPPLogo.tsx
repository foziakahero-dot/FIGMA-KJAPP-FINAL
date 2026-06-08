import { motion } from "motion/react";

/**
 * Premium KJAPP-logo — ren, lesbar wordmark med subtilt holografisk fyll.
 * Erstatter den lekne kj-app-grafikken med en seriøs Nordic-tech-treatment.
 */
export function KJAPPLogo({ size = 34 }: { size?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <svg
        width={size * 4.6}
        height={size}
        viewBox="0 0 460 100"
        role="img"
        aria-label="KJAPP"
      >
        <defs>
          <linearGradient id="kjapp-fill" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#dff7ff" />
            <stop offset="100%" stopColor="var(--primary-cyan, #5ef0ff)" />
          </linearGradient>
          <filter id="kjapp-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        <text
          x="50%"
          y="74"
          textAnchor="middle"
          fontFamily="Space Grotesk, Inter, sans-serif"
          fontWeight={700}
          fontSize={92}
          letterSpacing="0.04em"
          fill="url(#kjapp-fill)"
        >
          KJAPP
        </text>
      </svg>
      <p
        className="font-mono uppercase mt-2"
        style={{
          color: "var(--text-secondary)",
          fontSize: 10,
          letterSpacing: "0.42em",
        }}
      >
        En smartere måte å reise på
      </p>
    </motion.div>
  );
}
