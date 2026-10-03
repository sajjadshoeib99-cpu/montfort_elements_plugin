import { Link } from "react-router-dom";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";

import { FavoriteButton } from "@/components/FavoriteButton";
import { SmartImage } from "@/components/SmartImage";
import type { Property } from "@/data/properties";
import { formatPriceShort, formatSqft } from "@/lib/format";
import { IMAGE_SIZES } from "@/lib/images";
import { cn } from "@/lib/utils";

type Props = {
  property: Property;
  /** `overlay` mirrors the homepage reference; `panel` is the listing layout. */
  variant?: "overlay" | "panel";
  sizes?: string;
  eager?: boolean;
  className?: string;
};

export function PropertyCard({
  property,
  variant = "panel",
  sizes = IMAGE_SIZES.third,
  eager = false,
  className,
}: Props) {
  const cover = property.images[0];
  const place = `${property.city}, ${property.region}, ${property.country}`;

  if (variant === "overlay") {
    return (
      <Link
        to={`/properties/${property.slug}`}
        className={cn(
          "group relative block h-full overflow-hidden rounded-card bg-navy-deep",
          className,
        )}
      >
        <SmartImage
          image={cover}
          sizes={sizes}
          eager={eager}
          className="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/20 to-navy-deep/5" />
        <FavoriteButton propertyId={property.id} className="absolute right-4 top-4" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="text-[1.05rem] font-bold leading-snug">{property.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <p className="flex items-center gap-1.5 text-[0.72rem] text-white/75">
              <MapPin size={12} className="shrink-0 text-gold" aria-hidden="true" />
              {place}
            </p>
            <strong className="text-[0.86rem] font-semibold">
              {formatPriceShort(property.price)}
            </strong>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/properties/${property.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-card",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-shell">
        <SmartImage
          image={cover}
          sizes={sizes}
          eager={eager}
          className="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy backdrop-blur-sm">
          {property.type}
        </span>
        <FavoriteButton propertyId={property.id} className="absolute right-4 top-4" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.06rem] font-bold text-ink transition-colors duration-300 group-hover:text-navy">
          {property.name}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] text-body">
          <MapPin size={12} className="shrink-0 text-gold" aria-hidden="true" />
          {place}
        </p>

        <dl className="mt-4 flex items-center gap-5 border-t border-line pt-4 text-[0.72rem] text-body">
          <div className="flex items-center gap-1.5">
            <BedDouble size={14} className="text-navy/45" aria-hidden="true" />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{property.beds} Beds</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={14} className="text-navy/45" aria-hidden="true" />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{property.baths} Baths</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler size={14} className="text-navy/45" aria-hidden="true" />
            <dt className="sr-only">Area</dt>
            <dd>{formatSqft(property.sqft)}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-end justify-between gap-3 pt-1">
          <strong className="text-[1.02rem] font-extrabold text-ink">
            {formatPriceShort(property.price)}
          </strong>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gold">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
}
