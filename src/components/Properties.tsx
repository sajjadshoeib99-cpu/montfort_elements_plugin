import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { PROPERTIES } from "@/lib/content";
import { useTilt } from "./useTilt";

import lakesideImg from "@/assets/property-lakeside.jpg";
import triptychImg from "@/assets/property-triptych.jpg";

type Property = (typeof PROPERTIES.items)[number];

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt(6);

  return (
    <article
      className="property-card tilt"
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-reveal
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="property-media">
        <img
          className={property.crop || undefined}
          src={property.crop ? triptychImg : lakesideImg}
          alt={property.title}
        />
      </div>

      <div className="property-details">
        <div className="property-head">
          <h3>{property.title}</h3>
          <p>
            <MapPin size={13} />
            {property.place}
          </p>
          <ul className="property-specs">
            {property.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </div>

        <div className="property-price">
          <strong>{property.price}</strong>
          <a className="property-link" href="#contact">
            {PROPERTIES.cardCta}
            <ArrowLeft size={13} />
          </a>
        </div>
      </div>

      <span className="tilt-glow" aria-hidden="true" />
    </article>
  );
}

export default function Properties() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const items = PROPERTIES.items;

  const go = (delta: number) => {
    const next = (index + delta + items.length) % items.length;
    setIndex(next);
    const card = trackRef.current?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section id="properties" className="properties-section content-width">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">{PROPERTIES.eyebrow}</p>
        <h2>{PROPERTIES.title}</h2>
        <p className="section-subtitle">{PROPERTIES.subtitle}</p>
      </div>

      <div className="carousel-wrap">
        <div className="property-track" ref={trackRef}>
          {items.map((property, i) => (
            <PropertyCard property={property} index={i} key={property.title} />
          ))}
        </div>

        <button
          className="round-control carousel-prev"
          type="button"
          aria-label="املاک قبلی"
          onClick={() => go(-1)}
        >
          <ArrowRight size={18} />
        </button>
        <button
          className="round-control carousel-next"
          type="button"
          aria-label="املاک بعدی"
          onClick={() => go(1)}
        >
          <ArrowLeft size={18} />
        </button>
      </div>
    </section>
  );
}
