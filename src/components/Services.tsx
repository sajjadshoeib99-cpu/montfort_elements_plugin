import { ArrowLeft } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { useTilt } from "./useTilt";

type Service = (typeof SERVICES)[number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt(8);

  return (
    <article
      className="service-card tilt"
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-reveal
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <span className="service-icon">
        <service.icon size={24} />
      </span>
      <h3>{service.title}</h3>
      <p>{service.text}</p>
      <a href="#contact" aria-label={`اطلاعات بیشتر دربارهٔ ${service.title}`}>
        <ArrowLeft size={16} />
      </a>
      <span className="tilt-glow" aria-hidden="true" />
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="services-section content-width">
      <div className="services-heading" data-reveal>
        <p className="eyebrow">خدمات ما</p>
        <h2>همه‌چیز زیر یک سقف</h2>
        <p className="body-copy">
          از اولین جست‌وجو تا تحویل کلید، همهٔ کارها را یک تیم واحد برای شما انجام می‌دهد.
        </p>
      </div>

      <div className="service-grid">
        {SERVICES.map((service, i) => (
          <ServiceCard service={service} index={i} key={service.title} />
        ))}
      </div>
    </section>
  );
}
