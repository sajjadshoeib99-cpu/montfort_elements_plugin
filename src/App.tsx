import { ArrowLeft, KeyRound } from "lucide-react";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Properties from "@/components/Properties";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/components/useScrollReveal";
import { CONTACT, FINAL_CTA, STATS } from "@/lib/content";
import { EMAIL } from "@/lib/site";

export default function App() {
  useScrollReveal();

  return (
    <div id="top">
      <Hero />

      <main>
        <About />

        <Properties />

        <section className="stats-band">
          <div className="content-width stats-grid">
            {STATS.map((stat, index) => (
              <div
                className="stat"
                key={stat.label}
                data-reveal
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section content-width" data-reveal>
          <div className="key-icon">
            <KeyRound size={24} />
          </div>
          <div className="contact-copy">
            <p className="eyebrow">{CONTACT.eyebrow}</p>
            <h2>{CONTACT.title}</h2>
            <p>{CONTACT.text}</p>
          </div>
          <a className="primary-action contact-action" href={`mailto:${EMAIL}`}>
            {CONTACT.cta}
          </a>
        </section>

        <WhyUs />

        <Services />

        <Process />

        <Testimonials />

        <Faq />

        <div className="content-width">
          <section className="final-cta" data-reveal>
            <p className="eyebrow">{FINAL_CTA.eyebrow}</p>
            <h2>{FINAL_CTA.title}</h2>
            <p>{FINAL_CTA.text}</p>
            <a className="light-action" href={`mailto:${EMAIL}`}>
              {FINAL_CTA.cta}
              <ArrowLeft size={15} />
            </a>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
