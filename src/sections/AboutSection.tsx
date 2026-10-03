import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { SmartImage } from "@/components/SmartImage";
import { ABOUT_COPY } from "@/data/content";
import { ABOUT_IMAGE } from "@/data/properties";
import { unsplash } from "@/lib/images";

const GALLERY = [
  ABOUT_IMAGE,
  unsplash("1600607687939-ce8a6c25118c", "Open plan living room with garden views"),
  unsplash("1615529182904-14819c35db37", "Serene bedroom in a neutral palette"),
];

const PREVIEW = unsplash("1600585154340-be6161a56a0c", "Contemporary home beside the water");

export function AboutSection() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
        <div data-reveal>
          <p className="eyebrow">{ABOUT_COPY.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.7rem)]">{ABOUT_COPY.title}</h2>
          <p className="mt-6 max-w-[46ch] text-[0.95rem] leading-[1.9] text-body">
            {ABOUT_COPY.body}
          </p>

          <div
            className={cnExpanded(expanded)}
            aria-hidden={!expanded}
            id="about-more"
          >
            <p className="max-w-[46ch] overflow-hidden pb-1 text-[0.95rem] leading-[1.9] text-body">
              {ABOUT_COPY.secondary}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              aria-controls="about-more"
            >
              {expanded ? "Show Less" : ABOUT_COPY.cta}
              <ArrowRight
                size={15}
                aria-hidden="true"
                className={expanded ? "rotate-90 transition-transform duration-300" : "transition-transform duration-300"}
              />
            </Button>
            <span className="text-[0.78rem] text-body">18 years · 1,240 transactions</span>
          </div>
        </div>

        <div className="relative" data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
          <div className="grid grid-cols-[1fr_104px] gap-4 sm:grid-cols-[1fr_150px]">
            <div className="zoom-frame relative aspect-[4/3] overflow-hidden rounded-card bg-shell">
              {GALLERY.map((image, imageIndex) => (
                <div
                  key={image.url}
                  className="absolute inset-0 transition-opacity duration-700 ease-out"
                  style={{ opacity: imageIndex === index ? 1 : 0 }}
                  aria-hidden={imageIndex !== index}
                >
                  <SmartImage image={image} sizes="(min-width: 1024px) 45vw, 70vw" />
                </div>
              ))}
            </div>

            <div className="zoom-frame relative overflow-hidden rounded-card bg-shell">
              <SmartImage image={PREVIEW} sizes="180px" className="h-full w-full" />
              <span className="pointer-events-none absolute inset-0 bg-navy/25" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIndex((current) => (current + 1) % GALLERY.length)}
            aria-label="Show the next image"
            className="absolute -right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-float transition-all duration-300 hover:scale-105 hover:bg-navy hover:text-white sm:right-[122px] sm:translate-x-1/2"
          >
            <Plus size={18} aria-hidden="true" />
          </button>

          <p className="mt-4 text-[0.72rem] uppercase tracking-[0.2em] text-body/70">
            {String(index + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")} — Selected work
          </p>
        </div>
      </div>
    </section>
  );
}

function cnExpanded(expanded: boolean) {
  return [
    "grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out",
    expanded ? "mt-5 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
  ].join(" ");
}
