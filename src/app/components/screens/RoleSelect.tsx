import { motion } from "motion/react";
import { User, Car, ChevronRight } from "lucide-react";
import { HolographicBackground } from "../HolographicBackground";
import { Wordmark } from "../brand/Wordmark";
import type { Screen } from "../../App";

export function RoleSelect({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <HolographicBackground intensity={0.85} />
      <div className="relative h-full flex flex-col px-6 pt-12 items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Wordmark size="md" showTagline={false} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-white/70 text-[12px] mt-4 max-w-[280px] font-mono tracking-wider uppercase"
        >
          Velg din opplevelse
        </motion.p>

        <div className="mt-8 w-full space-y-3">
          {/* Kunde-app — aurora-identitet */}
          <RoleCard
            delay={0.5}
            onClick={() => go("home")}
            icon={<User className="w-5 h-5 text-[#05060f]" strokeWidth={2.4} />}
            title="Kunde"
            sub="Bestill bil. Aurora planlegger dagen."
            badge="KJAPP"
            badgeColor="aurora"
            primary
          />
          {/* Sjåfør-app — cockpit-identitet (amber/graphite) */}
          <RoleCard
            delay={0.62}
            onClick={() => go("driver")}
            icon={<Car className="w-5 h-5 text-[#ffb547]" strokeWidth={2.4} />}
            title="Sjåfør"
            sub="Dagsmål, ordre, Aurora coach."
            badge="KJAPP PRO"
            badgeColor="amber"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-6 text-white/55 text-[11px]"
        >
          Du kan bytte rolle senere
        </motion.div>

        <div className="flex-1" />
        <div className="text-white/45 text-[10px] font-mono tracking-wider mb-4">
          © 2026 KJAPP AS
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  icon, title, sub, primary, onClick, delay, badge, badgeColor,
}: {
  icon: React.ReactNode; title: string; sub: string; primary?: boolean;
  onClick: () => void; delay: number; badge: string; badgeColor: "aurora" | "amber";
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-label={`Fortsett som ${title}`}
      className={`w-full rounded-2xl p-4 flex items-center gap-3 text-left relative overflow-hidden ${primary ? "holo-border" : "glass-panel"}`}
      style={!primary ? { boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.3)" } : undefined}
    >
      {primary ? (
        <div className="absolute inset-0" style={{ background: "var(--aurora-gradient-soft)" }} />
      ) : (
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "linear-gradient(135deg, rgba(255,181,71,0.10) 0%, rgba(20,18,32,0) 60%)" }} />
      )}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center"
        style={primary
          ? { background: "var(--aurora-gradient)" }
          : { background: "rgba(255,181,71,0.14)", boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.35)" }}
      >
        {icon}
      </div>
      <div className="relative flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="text-white text-[15px] font-display">{title}</div>
          <span
            className="text-[8.5px] font-display tracking-[0.2em] px-1.5 py-0.5 rounded"
            style={badgeColor === "aurora"
              ? { background: "rgba(94,240,255,0.18)", color: "#5ef0ff" }
              : { background: "rgba(255,181,71,0.18)", color: "#ffb547" }}
          >
            {badge}
          </span>
        </div>
        <div className="text-white/70 text-[11px] mt-0.5">{sub}</div>
      </div>
      <ChevronRight className="relative w-4 h-4 text-white/65" />
    </motion.button>
  );
}
