import { motion } from "motion/react";
import { Heart, Coffee, Activity, AlertCircle } from "lucide-react";

/* Yrkestransportloven: 4,5t sammenhengende kjøring → pålagt 45 min pause.
   Mocket data: 3t 12 min kjørt, puls litt forhøyet, Aurora gir varsel. */
const rhythm = {
  drivenMin: 192,        // 3t 12m
  limitMin: 270,         // 4,5t
  heartRate: 84,
  hrBaseline: 68,
  sittingMin: 124,       // sammenhengende stilltid
  lastBreak: "13:42",
  nextSuggested: "Kaffebrenneriet · Grünerløkka · 3 min unna",
};

export function DriverRhythm() {
  const pct = Math.min(100, (rhythm.drivenMin / rhythm.limitMin) * 100);
  const remaining = rhythm.limitMin - rhythm.drivenMin;
  const hrSurge = rhythm.heartRate - rhythm.hrBaseline;
  const warn = pct > 70;

  return (
    <div className="glass-panel rounded-2xl p-3.5 relative overflow-hidden"
         style={{ boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.25)" }}>
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: warn ? "rgba(255,77,109,0.3)" : "rgba(255,181,71,0.25)" }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
               style={{ background: "rgba(255,181,71,0.18)" }}>
            <Activity className="w-3.5 h-3.5 text-[#ffb547]" />
          </div>
          <span className="text-white text-[11px] font-display tracking-[0.22em]">RYTME & PAUSEPLIKT</span>
        </div>
        <span className="text-white/55 text-[9px] font-mono">HEALTHKIT</span>
      </div>

      {/* Kjøretid progress */}
      <div className="relative mb-3">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-white font-display" style={{ fontSize: "20px", letterSpacing: "-0.01em" }}>
            {fmt(rhythm.drivenMin)}
          </span>
          <span className="text-white/55 text-[10px] font-mono">av {fmt(rhythm.limitMin)} lovlig</span>
        </div>
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{
              background: warn
                ? "linear-gradient(90deg, #ffb547 0%, #ff4d6d 100%)"
                : "linear-gradient(90deg, #ffd089 0%, #ffb547 100%)",
            }}
          />
        </div>
        <div className="text-white/60 text-[10px] mt-1.5 flex items-center gap-1">
          <span className="text-white">{fmt(remaining)}</span> til pålagt 45 min pause
        </div>
      </div>

      {/* Vitals row */}
      <div className="relative grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-xl p-2.5"
             style={{ background: "rgba(255,77,109,0.10)", boxShadow: "inset 0 0 0 1px rgba(255,77,109,0.25)" }}>
          <div className="flex items-center gap-1.5 text-[#ff8a9b] text-[9px] font-mono tracking-wider">
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 60 / rhythm.heartRate, repeat: Infinity, ease: "easeInOut" }}>
              <Heart className="w-2.5 h-2.5 fill-current" />
            </motion.span>
            PULS
          </div>
          <div className="text-white text-[14px] font-display mt-0.5">{rhythm.heartRate} bpm</div>
          <div className="text-white/55 text-[9px] font-mono">+{hrSurge} fra baseline</div>
        </div>
        <div className="rounded-xl p-2.5"
             style={{ background: "rgba(255,181,71,0.10)", boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.28)" }}>
          <div className="text-[#ffb547] text-[9px] font-mono tracking-wider">STILLESITTING</div>
          <div className="text-white text-[14px] font-display mt-0.5">{fmt(rhythm.sittingMin)}</div>
          <div className="text-white/55 text-[9px] font-mono">sist pause {rhythm.lastBreak}</div>
        </div>
      </div>

      {/* Aurora tip */}
      <div className="relative rounded-xl p-3"
           style={{ background: "rgba(255,181,71,0.10)", boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.3)" }}>
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
               style={{ background: "var(--kjapp-amber-gradient)" }}>
            <Coffee className="w-3.5 h-3.5 text-[#1a1206]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[#ffb547] text-[9px] font-mono tracking-wider mb-0.5">AURORA · KROPP</div>
            <p className="text-white text-[11.5px] leading-snug">
              Pulsen din er litt over normalen og du har sittet i 2 timer. Strekk på beina nå —
              jeg holder turene unna i 20 min.
            </p>
            <button className="mt-2 inline-flex items-center gap-1.5 text-white text-[10px] font-display tracking-[0.18em] px-3 py-1.5 rounded-full"
                    style={{ background: "var(--kjapp-amber-gradient)", color: "#1a1206" }}>
              TA PAUSE · {rhythm.nextSuggested.split("·")[0].trim().toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      {warn && (
        <div className="relative mt-2.5 flex items-center gap-1.5 text-[#ff8a9b] text-[10px] font-mono">
          <AlertCircle className="w-3 h-3" />
          Nærmer deg lovbestemt grense — Aurora påminner deg ved 4 t.
        </div>
      )}
    </div>
  );
}

function fmt(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}t ${m}m` : `${m}m`;
}
