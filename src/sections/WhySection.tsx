import { Check } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { REASONS, STATS } from "@/data/content";

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-24 bg-navy py-20 text-white lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why Horizon"
            title="Why Choose Horizon"
            subtitle="A small team working on a limited number of properties at a time — so each client gets undivided attention and honest numbers."
            tone="dark"
          />

          <ul className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {REASONS.map((reason, index) => (
              <li
                key={reason.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/45 text-gold">
                  <Check size={15} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[1.02rem] text-white">{reason.title}</h3>
                <p className="mt-2.5 text-[0.85rem] leading-[1.85] text-white/60">{reason.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <dl
          className="mt-16 grid grid-cols-2 gap-y-9 border-t border-white/12 pt-10 lg:grid-cols-4"
          data-reveal
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-[clamp(1.6rem,2.6vw,2.15rem)] font-extrabold text-white">
                  {stat.value}
                </span>
                <span className="mt-1.5 block text-[0.74rem] uppercase tracking-[0.16em] text-white/45">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
