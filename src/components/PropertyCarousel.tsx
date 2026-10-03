import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

/**
 * Editorial property rail: large lead card plus narrower neighbours, with
 * native swipe, mouse drag, arrow buttons and keyboard control.
 */
export function PropertyCarousel({ properties }: { properties: Property[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      setAtStart(track.scrollLeft <= 6);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 6);
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [properties.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-rail-card]");
    const step = card ? card.offsetWidth + 18 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, startX: event.clientX, startLeft: track.scrollLeft, moved: false };
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const track = trackRef.current;
    if (!drag.current.active || !track) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    if (drag.current.moved) track.scrollLeft = drag.current.startLeft - delta;
  };

  const onPointerUp = () => {
    drag.current.active = false;
    setDragging(false);
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        data-reveal
        role="region"
        aria-label="Featured properties carousel"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByCard(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByCard(-1);
          }
        }}
        className={cn(
          "hide-scrollbar flex snap-x snap-mandatory gap-[18px] overflow-x-auto overscroll-x-contain pb-2",
          dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab",
        )}
      >
        {properties.map((property, index) => (
          <li
            key={property.id}
            data-rail-card
            className={cn(
              "shrink-0 snap-start",
              index === 0
                ? "w-[80%] sm:w-[56%] lg:w-[45%]"
                : "w-[80%] sm:w-[38%] lg:w-[23.5%]",
            )}
          >
            <PropertyCard
              property={property}
              variant="overlay"
              sizes={index === 0 ? "(min-width: 1024px) 45vw, 80vw" : "(min-width: 1024px) 24vw, 80vw"}
              className="h-[380px] sm:h-[430px] lg:h-[470px]"
            />
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-center justify-center gap-3 lg:justify-end">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous properties"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next properties"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
