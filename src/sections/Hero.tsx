import { ArrowDown } from "lucide-react";

import { PROPERTY_HERO } from "@/data/properties";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[640px] flex-col justify-center overflow-hidden bg-navy-deep pt-[104px] text-white sm:min-h-[700px] lg:min-h-[86vh]">
      <div className="absolute inset-0 -z-10">
        <img
          src={PROPERTY_HERO.url}
          alt={PROPERTY_HERO.alt}
          width={1920}
          height={1280}
          className="animate-hero-zoom h-full w-full object-cover object-[center_58%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,25,43,0.88)_0%,rgba(11,32,55,0.55)_42%,rgba(10,26,44,0.32)_72%,rgba(8,25,43,0.72)_100%)]" />
      </div>

      <div className="shell flex flex-col items-center pb-24 pt-16 text-center sm:pb-28">
        <h1 className="animate-rise max-w-[16ch] text-[clamp(2.35rem,6.4vw,4.6rem)] leading-[1.06] font-extrabold [animation-delay:120ms]">
          Discover Exceptional
          <br />
          Homes &amp; Investments
        </h1>

        <p className="animate-rise mt-7 max-w-[62ch] text-[clamp(0.95rem,1.6vw,1.08rem)] leading-[1.85] text-white/78 [animation-delay:320ms]">
          Premium properties in prime locations. Find your dream home or the perfect investment with
          confidence.
        </p>

        <div className="animate-fade mt-14 flex flex-col items-center gap-3 text-white/55 [animation-delay:900ms]">
          <span className="animate-scroll-hint grid h-10 w-10 place-items-center rounded-full border border-white/25">
            <ArrowDown size={15} aria-hidden="true" />
          </span>
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em]">
            {SITE.tagline}
          </span>
        </div>
      </div>
    </section>
  );
}
