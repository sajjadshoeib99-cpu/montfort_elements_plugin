import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import PropertiesPage from "@/pages/PropertiesPage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
import { useScrollReveal } from "@/lib/useScrollReveal";

/** Keeps scroll position sensible: honours #anchors, otherwise returns to top. */
function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const scrollToTarget = () => {
        const target = document.getElementById(id);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top, behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const raf = window.requestAnimationFrame(() => {
          scrollToTarget();
        });
        return () => window.cancelAnimationFrame(raf);
      }
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  useScrollReveal(`${location.pathname}${location.hash}`);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-[8px] focus:bg-navy focus:px-4 focus:py-2 focus:text-[0.8rem] focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <SiteHeader />
      <RouteEffects />

      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}
