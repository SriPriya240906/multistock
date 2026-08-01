import { Link } from "@tanstack/react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box = size === "lg" ? "h-11 w-11" : size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  const iconSize = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <Link to="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-95">
      <div
        className={`${box} bg-gradient-brand relative grid shrink-0 place-items-center rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${iconSize} text-primary-foreground`}
        >
          {/* Multi-Expert AI Decision Core Icon */}
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      </div>
      <span className={`${text} font-display font-bold tracking-tight text-foreground`}>
        Stock<span className="text-gradient font-extrabold">Sphere</span>
        <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/20">
          AI
        </span>
      </span>
    </Link>
  );
}
