import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  life: number;
  max: number;
};

const HUES = [186, 268, 320]; // cyan, violet, magenta

export function AuroraParticleField({
  density = 60,
  emitFrom = "center",
}: {
  density?: number;
  emitFrom?: "center" | "top" | "scatter";
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = c;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const particles: Particle[] = [];
    const spawn = () => {
      const w = c.clientWidth;
      const h = c.clientHeight;
      let x = w / 2;
      let y = h / 2;
      if (emitFrom === "top") {
        x = Math.random() * w;
        y = h * 0.25;
      } else if (emitFrom === "scatter") {
        x = Math.random() * w;
        y = Math.random() * h;
      }
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 1.2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.2,
        r: 0.6 + Math.random() * 1.6,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        life: 0,
        max: 80 + Math.random() * 60,
      });
    };

    for (let i = 0; i < density; i++) spawn();

    let raf = 0;
    const tick = () => {
      const w = c.clientWidth;
      const h = c.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const a = Math.max(0, 1 - p.life / p.max) * 0.7;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${a})`);
        grd.addColorStop(1, `hsla(${p.hue}, 100%, 70%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
        if (p.life >= p.max) {
          particles.splice(i, 1);
          if (particles.length < density) spawn();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, emitFrom]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
