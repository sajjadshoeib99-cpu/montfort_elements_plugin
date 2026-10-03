import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  Mail,
  MapPin,
  Phone,
  Ruler,
} from "lucide-react";

import { Button } from "@/components/Button";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LeadModal, type LeadMode } from "@/components/LeadModal";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyGallery } from "@/components/PropertyGallery";
import { getAgent } from "@/data/agents";
import { getPropertyBySlug, getSimilarProperties } from "@/data/properties";
import { formatPriceFull, formatPriceShort, formatSqft } from "@/lib/format";
import { IMAGE_SIZES } from "@/lib/images";
import NotFoundPage from "@/pages/NotFoundPage";

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const property = slug ? getPropertyBySlug(slug) : undefined;
  const [modal, setModal] = useState<LeadMode | null>(null);

  if (!property) return <NotFoundPage />;

  const agent = getAgent(property.agentId);
  const similar = getSimilarProperties(property, 3);
  const place = `${property.city}, ${property.region}, ${property.country}`;

  const quickStats = [
    { icon: Building2, label: "Type", value: property.type },
    { icon: BedDouble, label: "Bedrooms", value: `${property.beds}` },
    { icon: Bath, label: "Bathrooms", value: `${property.baths}` },
    { icon: Ruler, label: "Interior", value: formatSqft(property.sqft) },
    { icon: CalendarDays, label: "Built", value: `${property.year}` },
  ];

  return (
    <>
      <section className="bg-navy pb-12 pt-[136px] text-white lg:pt-[164px]">
        <div className="shell">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.72rem] text-white/50">
              <li>
                <Link to="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/properties" className="transition-colors hover:text-gold">
                  Properties
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80">{property.name}</li>
            </ol>
          </nav>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-8">
            <div className="animate-rise">
              <p className="flex items-center gap-2 text-[0.78rem] text-white/65">
                <MapPin size={13} className="text-gold" aria-hidden="true" />
                {place}
              </p>
              <h1 className="mt-3 max-w-[20ch] text-[clamp(1.9rem,4vw,2.9rem)]">
                {property.name}
              </h1>
              <p className="mt-4 text-[0.92rem] text-white/60">{property.summary}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[1.5rem] font-extrabold leading-none text-white">
                  {formatPriceShort(property.price)}
                </p>
                <p className="mt-1.5 text-[0.72rem] text-white/50">
                  {formatPriceFull(property.price)}
                </p>
              </div>
              <FavoriteButton propertyId={property.id} className="h-11 w-11" />
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-y-6 border-t border-white/12 pt-8 sm:grid-cols-3 lg:grid-cols-5">
            {quickStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-gold">
                  <stat.icon size={16} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-white/45">
                    {stat.label}
                  </dt>
                  <dd className="text-[0.88rem] font-semibold text-white">{stat.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="shell">
          <PropertyGallery property={property} />
        </div>
      </section>

      <section className="bg-white pb-16 lg:pb-24">
        <div className="shell grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div className="space-y-12">
            <div data-reveal>
              <h2 className="text-[1.35rem] text-ink">About this property</h2>
              <p className="mt-5 text-[0.92rem] leading-[1.95] text-body">{property.description}</p>
            </div>

            <div data-reveal>
              <h2 className="text-[1.35rem] text-ink">Key features</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[0.88rem] text-body">
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/25 text-navy">
                      <Check size={10} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal>
              <h2 className="text-[1.35rem] text-ink">Amenities</h2>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {property.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="rounded-full border border-line bg-ivory px-4 py-2 text-[0.78rem] text-navy/75"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div
              className="rounded-card border border-line bg-white p-6 shadow-[0_24px_60px_-50px_rgba(13,37,63,0.6)]"
              data-reveal
            >
              <p className="eyebrow">Your advisor</p>
              <div className="mt-5 flex items-center gap-4">
                <img
                  src={agent.photo.url}
                  alt={agent.photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h3 className="text-[1rem] text-ink">{agent.name}</h3>
                  <p className="text-[0.74rem] uppercase tracking-[0.12em] text-gold">
                    {agent.role}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[0.84rem] leading-[1.8] text-body">{agent.bio}</p>

              <ul className="mt-5 space-y-2.5 text-[0.84rem]">
                <li>
                  <a
                    href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-2.5 text-navy transition-colors hover:text-gold"
                  >
                    <Phone size={14} className="text-gold" aria-hidden="true" />
                    {agent.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-2.5 break-all text-navy transition-colors hover:text-gold"
                  >
                    <Mail size={14} className="shrink-0 text-gold" aria-hidden="true" />
                    {agent.email}
                  </a>
                </li>
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <Button variant="primary" onClick={() => setModal("contact")}>
                  Contact agent
                </Button>
                <Button variant="outline" onClick={() => setModal("viewing")}>
                  Schedule a viewing
                </Button>
              </div>
            </div>

            <div className="rounded-card bg-ivory p-6" data-reveal>
              <h2 className="text-[1rem] font-bold text-ink">Reference</h2>
              <dl className="mt-4 space-y-3 text-[0.84rem]">
                {[
                  ["Listing reference", property.id.toUpperCase()],
                  ["Property type", property.type],
                  ["Interior", formatSqft(property.sqft)],
                  ["Year built", `${property.year}`],
                  ["Location", `${property.city}, ${property.region}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <dt className="text-body">{label}</dt>
                    <dd className="font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="eyebrow">Similar properties</p>
              <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2.1rem)]">You may also like</h2>
            </div>
            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-navy"
            >
              <ArrowLeft
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              All properties
            </Link>
          </div>

          <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <li key={item.id}>
                <PropertyCard property={item} variant="panel" sizes={IMAGE_SIZES.third} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-[0.68rem] uppercase tracking-[0.14em] text-body">
              {property.type} · {property.city}
            </p>
            <p className="text-[0.95rem] font-extrabold text-ink">
              {formatPriceShort(property.price)}
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setModal("viewing")}>
            Schedule viewing
          </Button>
        </div>
      </div>
      <div className="h-16 lg:hidden" aria-hidden="true" />

      <LeadModal
        open={modal !== null}
        onClose={() => setModal(null)}
        mode={modal ?? "contact"}
        propertyName={property.name}
      />
    </>
  );
}
