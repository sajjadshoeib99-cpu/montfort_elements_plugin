import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "gold";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[10px] font-semibold transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out will-change-transform disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-[0_14px_30px_-18px_rgba(13,37,63,0.75)] hover:bg-navy-soft hover:-translate-y-0.5",
  outline: "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
  light: "bg-white text-navy hover:bg-ivory hover:-translate-y-0.5",
  gold: "border border-gold/70 text-white hover:bg-gold hover:text-navy-deep hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.78rem]",
  md: "h-11 px-6 text-[0.82rem]",
  lg: "h-[52px] px-7 text-[0.86rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  variant,
  size,
  className,
  children,
  ...rest
}: Props & { to: string } & Omit<React.ComponentProps<typeof Link>, "to" | "className" | "children">) {
  return (
    <Link to={to} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: Props & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </a>
  );
}
