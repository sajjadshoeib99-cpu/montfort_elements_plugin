import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import { SmartImage } from "@/components/SmartImage";
import type { Property } from "@/data/properties";
import { IMAGE_SIZES } from "@/lib/images";
import { cn } from "@/lib/utils";

export function PropertyGallery({ property }: { property: Property }) {
  const images = property.images;
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const step = useCallback(
    (direction: 1 | -1) => {
      setActive((current) => (current + direction + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [lightboxOpen, step]);

  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-[1fr_132px]">
        <div className="relative overflow-hidden rounded-card bg-shell">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Open full screen gallery"
            className="group block w-full cursor-zoom-in"
          >
            <div className="aspect-[16/11] w-full sm:aspect-[16/9]">
              <SmartImage
                image={images[active]}
                sizes={IMAGE_SIZES.half}
                eager
                className="transition-transform duration-[1200ms] ease-out"
              />
            </div>
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3.5 py-2 text-[0.7rem] font-semibold text-navy opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand size={13} aria-hidden="true" />
              View full screen
            </span>
          </button>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white/88 text-navy shadow-float backdrop-blur transition-all duration-300 hover:bg-white"
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white/88 text-navy shadow-float backdrop-blur transition-all duration-300 hover:bg-white"
            >
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul className="hide-scrollbar flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
          {images.map((image, index) => (
            <li key={image.url} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show photo ${index + 1} of ${images.length}`}
                aria-current={index === active}
                className={cn(
                  "block h-[74px] w-[104px] overflow-hidden rounded-tile transition-all duration-300 lg:h-[86px] lg:w-full",
                  index === active
                    ? "ring-2 ring-gold ring-offset-2 ring-offset-white"
                    : "opacity-65 hover:opacity-100",
                )}
              >
                <SmartImage image={image} sizes="140px" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {lightboxOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${property.name} gallery`}
          className="fixed inset-0 z-[70] flex flex-col bg-navy-deep/96 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
            <p className="text-[0.78rem] font-semibold tracking-[0.02em] text-white/80">
              {property.name}
              <span className="ml-3 text-white/45">
                {active + 1} / {images.length}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-gold hover:text-gold"
              autoFocus
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-8">
            <img
              src={images[active].url}
              alt={images[active].alt}
              className="animate-fade max-h-full w-auto max-w-full rounded-tile object-contain"
            />
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors duration-300 hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors duration-300 hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>

          <ul className="hide-scrollbar flex justify-start gap-2 overflow-x-auto px-5 pb-6 sm:justify-center sm:px-8">
            {images.map((image, index) => (
              <li key={image.url} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show photo ${index + 1} of ${images.length}`}
                  aria-current={index === active}
                  className={cn(
                    "block h-14 w-20 overflow-hidden rounded-[8px] transition-all duration-300",
                    index === active ? "ring-2 ring-gold" : "opacity-50 hover:opacity-90",
                  )}
                >
                  <SmartImage image={image} sizes="120px" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
