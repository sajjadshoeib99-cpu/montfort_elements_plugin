import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 38 44"
      className={cn("h-10 w-[34px]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5.5 35.5c0-9.6 6-16.5 13.5-16.5s13.5 6.9 13.5 16.5" />
      <path d="M11.5 35.5v-8M19 35.5V24.2M26.5 35.5v-8" />
      <path d="M2.5 40h33" />
    </svg>
  );
}

export function Brand({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark className={cn("text-gold", "h-9 w-[30px] shrink-0")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[15px] font-extrabold tracking-[0.16em]",
            tone === "light" ? "text-white" : "text-navy",
          )}
        >
          HORIZON
        </span>
        <span
          className={cn(
            "mt-[5px] text-[8px] font-semibold tracking-[0.42em]",
            tone === "light" ? "text-white/70" : "text-navy/55",
          )}
        >
          PROPERTIES
        </span>
      </span>
    </span>
  );
}
