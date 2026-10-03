import { useMemo, useState } from "react";
import { Heart, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/Button";
import { PropertyCard } from "@/components/PropertyCard";
import {
  PRICE_BOUNDS,
  PROPERTIES,
  PROPERTY_LOCATIONS,
  PROPERTY_TYPES,
  type Property,
} from "@/data/properties";
import { useFavorites } from "@/lib/favorites";
import { formatPriceShort } from "@/lib/format";
import { IMAGE_SIZES } from "@/lib/images";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "size" | "newest";
type ViewKey = "all" | "featured" | "saved";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "size", label: "Largest first" },
  { value: "newest", label: "Newest first" },
];

const BED_OPTIONS = [0, 2, 3, 4, 5];
const BATH_OPTIONS = [0, 2, 3, 4, 5];

const SORTS: Record<SortKey, (a: Property, b: Property) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  size: (a, b) => b.sqft - a.sqft,
  newest: (a, b) => b.year - a.year,
};

const PRICE_STEP = 50_000;

export default function PropertiesPage() {
  const { favorites } = useFavorites();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All locations");
  const [type, setType] = useState("All types");
  const [minPrice, setMinPrice] = useState(PRICE_BOUNDS.min);
  const [maxPrice, setMaxPrice] = useState(PRICE_BOUNDS.max);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<ViewKey>("all");

  const reset = () => {
    setQuery("");
    setLocation("All locations");
    setType("All types");
    setMinPrice(PRICE_BOUNDS.min);
    setMaxPrice(PRICE_BOUNDS.max);
    setBeds(0);
    setBaths(0);
    setSort("featured");
    setView("all");
  };

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return PROPERTIES.filter((property) => {
      if (view === "featured" && !property.featured) return false;
      if (view === "saved" && !favorites.includes(property.id)) return false;

      if (needle) {
        const haystack = [
          property.name,
          property.city,
          property.region,
          property.country,
          property.type,
          property.summary,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      if (location !== "All locations" && `${property.city}, ${property.region}` !== location)
        return false;
      if (type !== "All types" && property.type !== type) return false;
      if (property.price < minPrice || property.price > maxPrice) return false;
      if (beds && property.beds < beds) return false;
      if (baths && property.baths < baths) return false;

      return true;
    }).sort(SORTS[sort]);
  }, [beds, baths, favorites, location, maxPrice, minPrice, query, sort, type, view]);

  const activeFilters =
    (query ? 1 : 0) +
    (location !== "All locations" ? 1 : 0) +
    (type !== "All types" ? 1 : 0) +
    (minPrice !== PRICE_BOUNDS.min || maxPrice !== PRICE_BOUNDS.max ? 1 : 0) +
    (beds ? 1 : 0) +
    (baths ? 1 : 0) +
    (view !== "all" ? 1 : 0);

  return (
    <>
      <section className="bg-navy pb-16 pt-[136px] text-white lg:pb-20 lg:pt-[168px]">
        <div className="shell">
          <p className="eyebrow animate-fade">Our portfolio</p>
          <h1 className="animate-rise mt-4 max-w-[18ch] text-[clamp(2rem,4.4vw,3.1rem)] [animation-delay:80ms]">
            Find the property that fits the life you are building
          </h1>
          <p className="animate-rise mt-5 max-w-[54ch] text-[0.95rem] leading-[1.85] text-white/65 [animation-delay:200ms]">
            Search our current listings by location, type, budget and size — or call us and we will
            shortlist for you.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-10 lg:py-14">
        <div className="shell">
          <div className="rounded-card border border-line bg-white p-5 shadow-[0_24px_60px_-50px_rgba(13,37,63,0.6)] sm:p-7">
            <div className="flex items-center gap-2.5 text-navy">
              <SlidersHorizontal size={16} aria-hidden="true" />
              <h2 className="text-[0.95rem] font-bold">Refine your search</h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2">
                <label htmlFor="filter-search" className="sr-only">
                  Search properties
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/35"
                  />
                  <input
                    id="filter-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by name, city or feature"
                    className="field h-11 pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="filter-location" className="sr-only">
                  Location
                </label>
                <select
                  id="filter-location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="field h-11"
                >
                  {["All locations", ...PROPERTY_LOCATIONS].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filter-type" className="sr-only">
                  Property type
                </label>
                <select
                  id="filter-type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="field h-11"
                >
                  {["All types", ...PROPERTY_TYPES].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-navy/60">
                  Price range
                </legend>
                <div className="rounded-[10px] border border-line px-4 py-3">
                  <div className="flex items-center justify-between text-[0.78rem] font-semibold text-navy">
                    <span>{formatPriceShort(minPrice)}</span>
                    <span>{formatPriceShort(maxPrice)}</span>
                  </div>
                  <div className="mt-2.5 flex flex-col gap-3">
                    <label className="sr-only" htmlFor="filter-min-price">
                      Minimum price
                    </label>
                    <input
                      id="filter-min-price"
                      type="range"
                      className="range-input"
                      min={PRICE_BOUNDS.min}
                      max={PRICE_BOUNDS.max}
                      step={PRICE_STEP}
                      value={minPrice}
                      onChange={(event) =>
                        setMinPrice(Math.min(Number(event.target.value), maxPrice - PRICE_STEP))
                      }
                    />
                    <label className="sr-only" htmlFor="filter-max-price">
                      Maximum price
                    </label>
                    <input
                      id="filter-max-price"
                      type="range"
                      className="range-input"
                      min={PRICE_BOUNDS.min}
                      max={PRICE_BOUNDS.max}
                      step={PRICE_STEP}
                      value={maxPrice}
                      onChange={(event) =>
                        setMaxPrice(Math.max(Number(event.target.value), minPrice + PRICE_STEP))
                      }
                    />
                  </div>
                </div>
              </fieldset>

              <div>
                <span className="mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.16em] text-navy/60">
                  Bedrooms
                </span>
                <div className="flex flex-wrap gap-2">
                  {BED_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBeds(option)}
                      aria-pressed={beds === option}
                      className={cn(
                        "h-9 rounded-[8px] border px-3.5 text-[0.75rem] font-semibold transition-colors duration-300",
                        beds === option
                          ? "border-navy bg-navy text-white"
                          : "border-line text-navy/70 hover:border-navy/40",
                      )}
                    >
                      {option === 0 ? "Any" : `${option}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.16em] text-navy/60">
                  Bathrooms
                </span>
                <div className="flex flex-wrap gap-2">
                  {BATH_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBaths(option)}
                      aria-pressed={baths === option}
                      className={cn(
                        "h-9 rounded-[8px] border px-3.5 text-[0.75rem] font-semibold transition-colors duration-300",
                        baths === option
                          ? "border-navy bg-navy text-white"
                          : "border-line text-navy/70 hover:border-navy/40",
                      )}
                    >
                      {option === 0 ? "Any" : `${option}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    { key: "all", label: "All properties" },
                    { key: "featured", label: "Featured" },
                    { key: "saved", label: `Saved (${favorites.length})` },
                  ] as { key: ViewKey; label: string }[]
                ).map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setView(option.key)}
                    aria-pressed={view === option.key}
                    className={cn(
                      "inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.75rem] font-semibold transition-colors duration-300",
                      view === option.key
                        ? "bg-navy text-white"
                        : "bg-shell text-navy/70 hover:bg-navy/10",
                    )}
                  >
                    {option.key === "saved" ? <Heart size={13} aria-hidden="true" /> : null}
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="filter-sort" className="text-[0.75rem] font-semibold text-navy/60">
                  Sort by
                </label>
                <select
                  id="filter-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortKey)}
                  className="field h-10 w-auto min-w-[190px] py-0"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-baseline justify-between gap-4">
            <p className="text-[0.85rem] text-body" aria-live="polite">
              <span className="font-bold text-ink">{results.length}</span>{" "}
              {results.length === 1 ? "property" : "properties"} available
              {activeFilters > 0 ? ` · ${activeFilters} filter${activeFilters === 1 ? "" : "s"} applied` : ""}
            </p>
            {activeFilters > 0 ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 text-[0.78rem] font-semibold text-navy underline-offset-4 hover:underline"
              >
                <RotateCcw size={13} aria-hidden="true" />
                Reset filters
              </button>
            ) : null}
          </div>

          {results.length > 0 ? (
            <ul className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((property, index) => (
                <li
                  key={property.id}
                  data-reveal
                  style={{ "--reveal-delay": `${Math.min(index, 6) * 70}ms` } as React.CSSProperties}
                >
                  <PropertyCard
                    property={property}
                    variant="panel"
                    sizes={IMAGE_SIZES.third}
                    eager={index < 3}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-9 rounded-card border border-dashed border-navy/20 bg-white px-6 py-16 text-center">
              <h3 className="text-[1.15rem] text-ink">No properties match those filters</h3>
              <p className="mx-auto mt-3 max-w-[44ch] text-[0.88rem] leading-[1.8] text-body">
                Try widening the price range or clearing a filter — or tell us what you are looking
                for and we will search off-market.
              </p>
              <div className="mt-7 flex justify-center">
                <Button variant="outline" onClick={reset}>
                  <RotateCcw size={14} aria-hidden="true" />
                  Reset filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
