import { motion } from "motion/react";
import { ReactNode, useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export function DeviceFrame({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div
        className="relative w-full bg-black overflow-hidden"
        style={{ minHeight: "100dvh", height: "100dvh" }}
      >
        <div
          className="absolute inset-0"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingLeft: "env(safe-area-inset-left)",
            paddingRight: "env(safe-area-inset-right)",
          }}
        >
          <div className="relative w-full h-full">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#03040a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(94,240,255,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,94,209,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(160,107,255,0.22) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ width: 390, height: 844 }}
      >
        <div
          className="absolute -inset-2 rounded-[3.5rem] blur-2xl opacity-70"
          style={{ background: "var(--aurora-gradient)" }}
        />
        <div className="relative w-full h-full rounded-[3rem] overflow-hidden bg-black border border-white/10 shadow-[0_50px_120px_-20px_rgba(94,240,255,0.35)]">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 w-32 h-7 bg-black rounded-full" />
          <div className="absolute top-0 left-0 right-0 z-40 px-8 pt-4 flex items-center justify-between text-[11px] text-white font-display tracking-wider">
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
              <span>5G</span>
              <span>•</span>
              <span>100%</span>
            </span>
          </div>
          <div className="absolute inset-0 pt-12">{children}</div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-display tracking-[0.3em]">
        KJAPP · OSLO
      </div>
    </div>
  );
}
