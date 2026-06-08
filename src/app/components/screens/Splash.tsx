import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { AuroraOrb } from "../AuroraOrb";
import { Wordmark } from "../brand/Wordmark";
import { AuroraParticleField } from "../brand/AuroraParticleField";

/**
 * Premium intro — 3.5 sek koreografi:
 * 0.0–0.6s  svart + grain, en lyspartikkel materialiserer i sentrum
 * 0.6–1.4s  partikkel → AuroraOrb med ekte sveip
 * 1.4–2.2s  bakgrunn puster ut + holografisk dybde
 * 2.2–3.0s  wordmark "kjapp" tegner seg bokstav-for-bokstav (Instrument Serif)
 * 3.0–3.5s  tagline + partikkel-stjernestøv
 * Tap → skip til SignIn.
 */
export function Splash({ onContinue }: { onContinue: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3000),
      setTimeout(onContinue, 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onContinue]);

  const letters = ["k", "j", "a", "p", "p"];

  return (
    <button
      onClick={onContinue}
      className="relative w-full h-full overflow-hidden bg-black block text-left"
      aria-label="Hopp over intro"
      style={{ cursor: "pointer" }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Initial spark — phase 0 */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: phase === 0 ? [0, 1, 0.9] : 0,
          opacity: phase === 0 ? 1 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#ffffff",
            boxShadow:
              "0 0 12px rgba(255,255,255,0.95), 0 0 24px rgba(94,240,255,0.7), 0 0 48px rgba(160,107,255,0.6)",
          }}
        />
      </motion.div>

      {/* Aurora bloom — fra phase 2 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: phase >= 2 ? 1 : 0,
          scale: phase >= 2 ? 1.15 : 0.6,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(94,240,255,0.32) 0%, rgba(160,107,255,0.22) 35%, rgba(255,94,209,0.10) 55%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* Particle field — fra phase 4 (stjernestøv) */}
      {phase >= 4 && <AuroraParticleField density={40} emitFrom="top" />}

      <div className="relative h-full flex flex-col items-center justify-center px-8 text-center">
        {/* Orb — fra phase 1 */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotateY: -60 }}
          animate={{
            scale: phase >= 1 ? 1 : 0,
            opacity: phase >= 1 ? 1 : 0,
            rotateY: phase >= 1 ? 0 : -60,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
          style={{ top: "28%", perspective: 800 }}
        >
          <AuroraOrb size={120} />
        </motion.div>

        {/* Wordmark — bokstav-for-bokstav fra phase 3 */}
        <div
          className="relative flex items-baseline"
          style={{ marginTop: "8%", lineHeight: 0.9 }}
        >
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{
                opacity: phase >= 3 ? 1 : 0,
                y: phase >= 3 ? 0 : 14,
                filter: phase >= 3 ? "blur(0px)" : "blur(8px)",
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: phase >= 3 ? i * 0.08 : 0,
              }}
              style={{
                fontFamily: "'Instrument Serif', 'Times New Roman', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 96,
                color: "#ffffff",
                display: "inline-block",
                letterSpacing: "-0.02em",
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono uppercase mt-4"
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 9.5,
            letterSpacing: "0.34em",
          }}
        >
          en smartere måte å reise på
        </motion.p>
      </div>

      {/* Letterbox-bars — film-følelse */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: phase >= 2 ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        className="absolute top-0 left-0 right-0 h-6 bg-black z-20"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: phase >= 2 ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        className="absolute bottom-0 left-0 right-0 h-6 bg-black z-20"
      />
    </button>
  );
}
