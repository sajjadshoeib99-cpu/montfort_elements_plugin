import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";

import { Brand } from "@/components/Brand";
import { ButtonAnchor } from "@/components/Button";
import { NAV_LINKS, SITE, type NavLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // The home hero is pinned to the top of the viewport for several screens while its
      // clip scrubs, so the header stays transparent (light) until it actually leaves.
      const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
      setOverHero(stage ? stage.getBoundingClientRect().bottom > 96 : false);
      setScrolled(window.scrollY > 28);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isActive = (link: NavLink) => {
    const [path = "/", hash] = link.to.split("#");
    if (hash) return location.pathname === path && location.hash === `#${hash}`;
    if (path === "/properties") return location.pathname.startsWith("/properties");
    if (path === "/") return location.pathname === "/" && !location.hash;
    return location.pathname === path;
  };

  const solid = scrolled && !overHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
          solid
            ? "border-b border-line/70 bg-white/88 shadow-[0_10px_30px_-24px_rgba(13,37,63,0.45)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-[74px] items-center justify-between gap-6 lg:h-[86px]">
          <Link to="/" aria-label={`${SITE.name} — home`} className="shrink-0">
            <Brand tone={solid ? "dark" : "light"} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    data-active={isActive(link)}
                    aria-current={isActive(link) ? "page" : undefined}
                    className={cn(
                      "nav-link block text-[0.8rem] font-semibold tracking-[0.01em] transition-colors duration-300",
                      solid ? "text-navy/75 hover:text-navy" : "text-white/85 hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonAnchor
              href={SITE.phoneHref}
              variant={solid ? "outline" : "gold"}
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Phone size={14} aria-hidden="true" />
              {SITE.phone}
            </ButtonAnchor>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-[10px] border transition-colors duration-300 lg:hidden",
                solid ? "border-navy/15 text-navy" : "border-white/35 text-white",
              )}
            >
              <Menu size={19} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
          "transition-opacity duration-300 ease-out",
        )}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-navy-deep/55 backdrop-blur-sm"
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 bg-navy px-6 pb-9 pt-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
            menuOpen ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Brand tone="light" />
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="grid h-10 w-10 place-items-center rounded-[10px] border border-white/25 text-white"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8">
            <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
              {NAV_LINKS.map((link, index) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex items-baseline gap-4 py-4 text-[1.05rem] font-semibold text-white/90 transition-colors duration-300 hover:text-gold"
                  >
                    <span className="text-[0.62rem] font-bold tracking-[0.2em] text-gold/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex flex-col gap-3">
            <ButtonAnchor href={SITE.phoneHref} variant="light" size="md" tabIndex={menuOpen ? 0 : -1}>
              <Phone size={15} aria-hidden="true" />
              {SITE.phone}
            </ButtonAnchor>
            <a
              href={`mailto:${SITE.email}`}
              tabIndex={menuOpen ? 0 : -1}
              className="text-center text-[0.8rem] text-white/60 transition-colors hover:text-gold"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
