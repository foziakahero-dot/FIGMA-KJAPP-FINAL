import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "./ui/utils";

type Props = HTMLMotionProps<"div"> & {
  glow?: boolean;
  holo?: boolean;
};

export function GlassPanel({ className, glow, holo, children, ...rest }: Props) {
  return (
    <motion.div
      {...rest}
      className={cn(
        "glass-panel rounded-3xl text-white/90",
        holo && "holo-border",
        glow && "shadow-[0_8px_40px_-12px_rgba(160,107,255,0.45)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
