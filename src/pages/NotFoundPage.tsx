import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/Button";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES } from "@/data/properties";
import { IMAGE_SIZES } from "@/lib/images";

const suggestions = PROPERTIES.filter((property) => property.featured).slice(0, 3);

export default function NotFoundPage() {
  return (
    <>
      <section className="bg-navy pb-16 pt-[150px] text-white lg:pb-20 lg:pt-[180px]">
        <div className="shell max-w-[720px]">
          <p className="eyebrow animate-fade">Page not found</p>
          <h1 className="animate-rise mt-4 text-[clamp(1.9rem,4vw,2.9rem)] [animation-delay:80ms]">
            This address is no longer on the market
          </h1>
          <p className="animate-rise mt-5 max-w-[52ch] text-[0.95rem] leading-[1.85] text-white/65 [animation-delay:180ms]">
            The page you were looking for has moved or sold. Explore our current listings instead, or
            call us and we will point you in the right direction.
          </p>
          <div className="animate-fade mt-8 flex flex-wrap gap-3 [animation-delay:260ms]">
            <ButtonLink to="/properties" variant="light">
              Browse properties
              <ArrowRight size={15} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/" variant="gold">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-20">
        <div className="shell">
          <h2 className="text-[1.25rem] text-ink">Featured right now</h2>
          <ul className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} variant="panel" sizes={IMAGE_SIZES.third} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
