import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md";
}

export const Logo = ({ size = "md" }: LogoProps) => {
  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const text = size === "sm" ? "text-base" : "text-lg";
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 group">
      <div className={`${dim} relative rounded-lg bg-gradient-primary shadow-glow grid place-items-center overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground relative" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" />
          <path d="m4 7 8 5 8-5" />
          <path d="M12 22V12" />
        </svg>
      </div>
      <div className={`${text} font-display font-semibold tracking-tight`}>
        Blostem <span className="text-muted-foreground font-normal">Forge</span>
      </div>
    </Link>
  );
};
