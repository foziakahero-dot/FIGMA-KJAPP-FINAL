import { motion } from "motion/react";

function activeGreeting() {
  const h = new Date().getHours();
  if (h < 5)  return "God natt, Oslo";
  if (h < 10) return "God morgen, Oslo";
  if (h < 17) return "God dag, Oslo";
  if (h < 22) return "God kveld, Oslo";
  return "Reis smartere i kveld";
}

export function GreetingHeader() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.6 }}
      className="font-mono uppercase text-center"
      style={{
        marginTop: "clamp(6px, 1.2vh, 10px)",
        color: "var(--text-secondary)",
        fontSize: 10,
        letterSpacing: "0.38em",
      }}
    >
      {activeGreeting()}
    </motion.p>
  );
}
