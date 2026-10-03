import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";

import { Brand } from "@/components/Brand";
import { NAV_LINKS, SITE, SOCIALS } from "@/lib/site";
import { SERVICES } from "@/data/content";

const socialIcons = {
  Instagram,
  LinkedIn: Linkedin,
  Pinterest: Facebook,
} as const;

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setState("error");
      return;
    }
    try {
      const key = "horizon:newsletter";
      const list = JSON.parse(window.localStorage.getItem(key) ?? "[]");
      window.localStorage.setItem(key, JSON.stringify([...list, email.trim()]));
    } catch {
      /* storage unavailable — the confirmation still shows */
    }
    setState("done");
    setEmail("");
  };

  return (
    <footer className="bg-navy text-white">
      <div className="shell">
        <div className="flex flex-col gap-8 border-b border-white/12 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-14">
          <div className="max-w-[420px]">
            <p className="eyebrow">The Horizon List</p>
            <h2 className="mt-3 text-[1.6rem] text-white">
              New listings, before they are public.
            </h2>
          </div>

          <form onSubmit={subscribe} className="w-full max-w-[440px]" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex items-center gap-2 rounded-[10px] border border-white/20 bg-white/8 p-1.5 focus-within:border-gold/70">
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (state !== "idle") setState("idle");
                }}
                placeholder="you@email.com"
                className="h-10 flex-1 bg-transparent px-3 text-[0.85rem] text-white placeholder:text-white/45 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-gold px-4 text-[0.78rem] font-bold text-navy-deep transition-colors duration-300 hover:bg-gold-soft"
              >
                Join
                <Send size={14} aria-hidden="true" />
              </button>
            </div>
            <p
              aria-live="polite"
              className="mt-2.5 min-h-[18px] text-[0.75rem] text-white/60"
            >
              {state === "done"
                ? "Thank you — you are on the list."
                : state === "error"
                  ? "Please enter a valid email address."
                  : "One considered email a month. Unsubscribe any time."}
            </p>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4 lg:py-16">
          <div className="col-span-2 md:col-span-1">
            <Brand tone="light" />
            <p className="mt-5 max-w-[34ch] text-[0.82rem] leading-[1.85] text-white/60">
              {SITE.description}
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons] ?? Facebook;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/18 text-white/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                    >
                      <Icon size={15} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[0.82rem] text-white/65 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Our services">
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/#services"
                    className="text-[0.82rem] text-white/65 transition-colors duration-300 hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-[0.82rem] text-white/65">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-start gap-2.5 transition-colors duration-300 hover:text-white"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2.5 transition-colors duration-300 hover:text-white"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 transition-colors duration-300 hover:text-white"
                >
                  <MapPin size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  {SITE.address}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-[0.75rem] text-white/40">{SITE.hours}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/12 py-6 text-[0.74rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Licensed real estate brokerage · Texas &amp; California</p>
        </div>
      </div>
    </footer>
  );
}
