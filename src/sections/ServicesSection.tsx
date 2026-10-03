import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { SmartImage } from "@/components/SmartImage";
import { SERVICES } from "@/data/content";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((service) => service.id === activeId) ?? SERVICES[0];

  return (
    <section id="services" className="scroll-mt-24 bg-ivory py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start" data-reveal>
            <p className="eyebrow">Services</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.7rem)]">
              Everything a move
              <br />
              actually requires
            </h2>
            <p className="mt-6 max-w-[38ch] text-[0.95rem] leading-[1.9] text-body">
              Whether you are selling an architect-designed home or building a portfolio, the work is
              handled by one team from valuation to keys.
            </p>

            <div className="relative mt-9 hidden aspect-[4/3] overflow-hidden rounded-card bg-shell lg:block">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-out",
                    service.id === active.id ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden={service.id !== active.id}
                >
                  <SmartImage image={service.image} sizes="40vw" />
                </div>
              ))}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/85 to-transparent p-5 pt-14 text-[0.8rem] font-semibold text-white">
                {active.title}
              </span>
            </div>
          </div>

          <ul className="border-t border-line/90" data-reveal>
            {SERVICES.map((service, index) => {
              const isActive = service.id === activeId;
              return (
                <li key={service.id} className="border-b border-line/90">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(service.id)}
                    onFocus={() => setActiveId(service.id)}
                    onClick={() => setActiveId(service.id)}
                    aria-pressed={isActive}
                    className="group flex w-full items-start gap-5 py-7 text-left transition-colors duration-300 sm:gap-8"
                  >
                    <span className="pt-1 text-[0.68rem] font-bold tracking-[0.2em] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1">
                      <span
                        className={cn(
                          "block text-[1.15rem] font-bold transition-colors duration-300 sm:text-[1.3rem]",
                          isActive ? "text-navy" : "text-ink/85 group-hover:text-navy",
                        )}
                      >
                        {service.title}
                      </span>
                      <span className="mt-2 block max-w-[52ch] text-[0.85rem] leading-[1.85] text-body">
                        {service.text}
                      </span>

                      <span className="mt-4 block overflow-hidden rounded-tile lg:hidden">
                        <span className="block h-[132px] w-full">
                          <SmartImage image={service.image} sizes="100vw" />
                        </span>
                      </span>
                    </span>

                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        isActive
                          ? "border-navy bg-navy text-white"
                          : "border-navy/15 text-navy/60 group-hover:border-navy/40",
                      )}
                    >
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
