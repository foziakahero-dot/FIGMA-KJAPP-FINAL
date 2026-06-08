import { ArrowLeft, X } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  variant?: "back" | "close";
  /** Set to false to hide the back button entirely. Default: true. */
  showBack?: boolean;
};

export function TopBar({ onBack, title, subtitle, right, variant = "back", showBack = true }: Props) {
  const navigate = useNavigate();
  const Icon = variant === "close" ? X : ArrowLeft;
  const handleBack = onBack ?? (() => navigate(-1));
  return (
    <div className="flex items-center gap-3">
      {showBack ? (
        <button
          onClick={handleBack}
          aria-label="Tilbake"
          className="w-11 h-11 rounded-full glass-panel flex items-center justify-center active:scale-95 transition"
        >
          <Icon className="w-[18px] h-[18px] text-white" />
        </button>
      ) : (
        <div className="w-11" />
      )}
      <div className="flex-1 text-center min-w-0">
        {title && <div className="text-white text-[12px] font-display tracking-wider truncate">{title}</div>}
        {subtitle && <div className="text-white/50 text-[10px] font-mono truncate">{subtitle}</div>}
      </div>
      <div className="min-w-[2.75rem] flex justify-end">{right}</div>
    </div>
  );
}
