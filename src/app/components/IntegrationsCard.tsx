import { useState } from "react";
import { motion } from "motion/react";
import { Check, Music2, Train, Calendar, Wallet, FileText, Instagram, Share2 } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

type Integration = {
  id: string;
  label: string;
  sub: string;
  brandColor: string;
  glyph: React.ReactNode;
  connected: boolean;
};

const customerInits: Integration[] = [
  { id: "vipps",    label: "Vipps",         sub: "Primær betaling · •• 8421",  brandColor: "#ff5b24", glyph: <Wallet className="w-4 h-4" strokeWidth={1.75} />,  connected: true  },
  { id: "ruter",    label: "Ruter",         sub: "Kombiner med T-bane/buss",   brandColor: "#e6007e", glyph: <Train className="w-4 h-4" strokeWidth={1.75} />,   connected: true  },
  { id: "spotify",  label: "Spotify",       sub: "Din playlist i bilen",       brandColor: "#1ed760", glyph: <Music2 className="w-4 h-4" strokeWidth={1.75} />,  connected: false },
  { id: "calendar", label: "Kalender",      sub: "Aurora foreslår reiser",     brandColor: "#5ef0ff", glyph: <Calendar className="w-4 h-4" strokeWidth={1.75} />, connected: true  },
  { id: "instagram", label: "Instagram",    sub: "Del Aurora-minner som story", brandColor: "#e1306c", glyph: <Instagram className="w-4 h-4" strokeWidth={1.75} />, connected: false },
  { id: "meta",     label: "Facebook & Messenger", sub: "Del live-tur med venner", brandColor: "#1877f2", glyph: <Share2 className="w-4 h-4" strokeWidth={1.75} />,  connected: false },
];

const driverInits: Integration[] = [
  { id: "vipps-biz", label: "Vipps Bedrift", sub: "Direkte utbetaling daglig",   brandColor: "#ff5b24", glyph: <Wallet className="w-4 h-4" strokeWidth={1.75} />,  connected: true  },
  { id: "skatt",     label: "Skatteetaten",  sub: "Eksporter MVA-grunnlag",     brandColor: "#5ef0ff", glyph: <FileText className="w-4 h-4" strokeWidth={1.75} />, connected: true  },
  { id: "ruter-drv", label: "Ruter Drosje",  sub: "Drosjeholdeplass-køsystem",  brandColor: "#e6007e", glyph: <Train className="w-4 h-4" strokeWidth={1.75} />,   connected: false },
  { id: "spotify-d", label: "Spotify",       sub: "Bilens lydsystem",           brandColor: "#1ed760", glyph: <Music2 className="w-4 h-4" strokeWidth={1.75} />,  connected: false },
  { id: "instagram-d", label: "Instagram",   sub: "Del skift-statistikk",       brandColor: "#e1306c", glyph: <Instagram className="w-4 h-4" strokeWidth={1.75} />, connected: false },
];

export function IntegrationsCard({ role }: { role: "customer" | "driver" }) {
  const [items, setItems] = useState<Integration[]>(role === "driver" ? driverInits : customerInits);
  const toggle = (id: string) =>
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, connected: !x.connected } : x)));

  return (
    <GlassPanel className="p-3"
                style={role === "driver" ? { boxShadow: "inset 0 0 0 1px rgba(255,181,71,0.22)" } : undefined}>
      <div className="space-y-2">
        {items.map((it) => (
          <motion.button
            key={it.id}
            whileTap={{ scale: 0.99 }}
            onClick={() => toggle(it.id)}
            className="w-full flex items-center gap-3 p-2 rounded-xl text-left"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `${it.brandColor}1f`,
                boxShadow: `inset 0 0 0 1px ${it.brandColor}55`,
                color: it.brandColor,
              }}
            >
              {it.glyph}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[12.5px]">{it.label}</div>
              <div className="text-white/60 text-[10.5px] truncate">{it.sub}</div>
            </div>
            <div
              className={`text-[9.5px] font-display tracking-[0.18em] px-2 py-1 rounded-full ${it.connected ? "" : "text-white/55"}`}
              style={it.connected
                ? { background: `${it.brandColor}26`, color: it.brandColor, boxShadow: `inset 0 0 0 1px ${it.brandColor}66` }
                : { boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }}
            >
              {it.connected ? <span className="inline-flex items-center gap-1"><Check className="w-2.5 h-2.5" strokeWidth={2.5} />KOBLET</span> : "KOBLE TIL"}
            </div>
          </motion.button>
        ))}
      </div>
    </GlassPanel>
  );
}
