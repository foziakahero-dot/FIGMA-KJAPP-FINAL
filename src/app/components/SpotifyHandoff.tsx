import { motion } from "motion/react";
import { useState } from "react";
import { Music, Pause, Play, SkipForward } from "lucide-react";

const track = {
  title: "Solsystemet",
  artist: "AURORA",
  album: "The Gods We Can Touch",
  durationSec: 207,
};

export function SpotifyHandoff({ compact = false }: { compact?: boolean }) {
  const [playing, setPlaying] = useState(true);
  const [pos] = useState(82);
  const pct = (pos / track.durationSec) * 100;

  if (compact) {
    return (
      <div className="glass-panel holo-border rounded-2xl p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
             style={{ background: "linear-gradient(135deg, #1db954 0%, #0d7a39 100%)" }}>
          <Music className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[9px] font-mono tracking-wider text-[var(--aurora-mint)]">SPOTIFY · OVERLEVERT TIL BILEN</div>
          <div className="text-white text-[12px] truncate">{track.title} · <span className="text-white/65">{track.artist}</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel holo-border rounded-2xl p-3.5 relative overflow-hidden">
      <motion.div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{ background: "#1db954", opacity: 0.18 }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-5 h-5 rounded-full flex items-center justify-center"
             style={{ background: "linear-gradient(135deg, #1db954 0%, #0d7a39 100%)" }}>
          <Music className="w-2.5 h-2.5 text-white" />
        </div>
        <span className="text-white text-[10px] font-mono tracking-[0.22em]">SPOTIFY · I BILEN</span>
        <span className="ml-auto text-[var(--aurora-mint)] text-[9px] font-mono">● LIVE</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
             style={{ background: "linear-gradient(135deg, rgba(29,185,84,0.3), rgba(13,122,57,0.2))",
                      boxShadow: "inset 0 0 0 1px rgba(29,185,84,0.35)" }}>
          <Music className="w-5 h-5 text-[#1db954]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-[13px] truncate">{track.title}</div>
          <div className="text-white/65 text-[11px] truncate">{track.artist} · {track.album}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-white/60">
        <span>{fmt(pos)}</span>
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#1db954" }} />
        </div>
        <span>{fmt(track.durationSec)}</span>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-6">
        <motion.button whileTap={{ scale: 0.9 }}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Spill"}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1db954 0%, #0d7a39 100%)" }}>
          {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
        </motion.button>
        <button aria-label="Neste spor" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center">
          <SkipForward className="w-4 h-4 text-white/80" />
        </button>
      </div>
    </div>
  );
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${r}`;
}
