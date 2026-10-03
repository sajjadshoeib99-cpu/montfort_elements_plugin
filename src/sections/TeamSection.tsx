import { Mail, Phone } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { SmartImage } from "@/components/SmartImage";
import { AGENTS } from "@/data/agents";

export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Team"
          title="The people you will work with"
          subtitle="Four specialists, one point of contact, and a direct phone number from the first conversation onwards."
          align="center"
        />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {AGENTS.map((agent, index) => (
            <li
              key={agent.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              className="group"
            >
              <div className="zoom-frame relative overflow-hidden rounded-card bg-shell">
                <div className="aspect-[4/5] w-full">
                  <SmartImage
                    image={agent.photo}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
                    className="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-2.5 bg-gradient-to-t from-navy-deep/90 to-transparent p-5 pt-14 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {agent.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={`${agent.name} on ${social.label}`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy-deep"
                    >
                      {social.label === "Email" ? (
                        <Mail size={14} aria-hidden="true" />
                      ) : (
                        <span className="text-[0.62rem] font-bold">
                          {social.label.slice(0, 2)}
                        </span>
                      )}
                    </a>
                  ))}
                  <a
                    href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
                    aria-label={`Call ${agent.name}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy-deep"
                  >
                    <Phone size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <h3 className="mt-5 text-[1.02rem] text-ink">{agent.name}</h3>
              <p className="mt-1 text-[0.78rem] uppercase tracking-[0.14em] text-gold">
                {agent.role}
              </p>
              <p className="mt-3 text-[0.83rem] leading-[1.8] text-body">{agent.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
