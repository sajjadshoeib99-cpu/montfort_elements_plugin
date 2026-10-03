import { ArrowLeft } from "lucide-react";
import { ABOUT } from "@/lib/content";

import aboutImg from "@/assets/about.jpg";
import heroImg from "@/assets/hero.jpg";

export default function About() {
  return (
    <section id="about" className="about-section content-width">
      <div className="about-copy" data-reveal>
        <p className="eyebrow">{ABOUT.eyebrow}</p>
        <h2>{ABOUT.title}</h2>
        <p className="body-copy">{ABOUT.body}</p>
        <a className="primary-action" href="#properties">
          {ABOUT.cta}
          <ArrowLeft size={15} />
        </a>
      </div>

      <div className="about-gallery" data-reveal>
        <img className="about-main" src={aboutImg} alt={ABOUT.imageAlt} />
        <div className="about-preview">
          <img src={heroImg} alt="" aria-hidden="true" />
        </div>
        <button className="round-control about-next" type="button" aria-label="تصویر بعدی">
          <ArrowLeft size={18} />
        </button>
      </div>
    </section>
  );
}
