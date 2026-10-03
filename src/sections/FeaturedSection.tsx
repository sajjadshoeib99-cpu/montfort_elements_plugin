import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { PropertyCarousel } from "@/components/PropertyCarousel";
import { PROPERTIES } from "@/data/properties";

const featured = PROPERTIES.filter((property) => property.featured);

export function FeaturedSection() {
  return (
    <section id="featured" className="scroll-mt-24 bg-white pb-20 pt-4 lg:pb-28">
      <div className="shell">
        <div className="flex flex-col items-center text-center" data-reveal>
          <p className="eyebrow">Featured</p>
          <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.85rem)]">Featured Properties</h2>
          <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-[1.85] text-body">
            A short, considered selection of homes currently available through Horizon.
          </p>
        </div>

        <div className="mt-12">
          <PropertyCarousel properties={featured} />
        </div>

        <div className="mt-10 flex justify-center" data-reveal>
          <Link
            to="/properties"
            className="group inline-flex items-center gap-3 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-navy"
          >
            Browse all properties
            <span className="grid h-9 w-9 place-items-center rounded-full border border-navy/20 transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
