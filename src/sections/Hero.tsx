import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

import { PROPERTY_HERO } from "@/data/properties";
import { SITE } from "@/lib/site";
import { usePrefersReducedMotion, useScrollVideoScrub } from "@/lib/scrollVideo";
import { cn } from "@/lib/utils";

/**
 * Scroll-scrubbed hero clip.
 *
 * Encoding matters more than anything else for a scrubbed video: a seek has to decode
 * from the nearest keyframe, so a clip with one long GOP stutters no matter how tidy the
 * JavaScript is. This file is H.264 High, silent, 1168x768, and re-encoded with a
 * keyframe every 8 frames (~0.33 s) and scene-cut keyframes disabled — random access
 * stays cheap while the bitrate stays reasonable. Keep that profile if the clip is ever
 * replaced; a phone-sized variant is served below 768px and a VP9 WebM sits behind the
 * MP4 for browsers without H.264.
 */
const CLIP = {
  desktop: { webm: "/videos/hero-scroll.webm", mp4: "/videos/hero-scroll.mp4" },
  mobile: "/videos/hero-scroll-mobile.mp4",
  poster: "/videos/hero-poster.jpg",
};

/**
 * Picks the single file this device should scrub, once per mount. A `<source media>`
 * list would re-run resource selection whenever the viewport crosses the breakpoint,
 * which can abort a load mid-flight and leave the element stalled; a plain `src` is
 * predictable. `src` is assigned via state so the element never re-picks on resize.
 */
function pickClip() {
  if (window.matchMedia("(max-width: 767px)").matches) return CLIP.mobile;
  const probe = document.createElement("video");
  // H.264 first: it is hardware-decoded almost everywhere, which keeps seeks cheap.
  return probe.canPlayType('video/mp4; codecs="avc1.42E01E"') ? CLIP.desktop.mp4 : CLIP.desktop.webm;
}

/** Roughly 24vh of scrolling per second of footage, rounded so metadata never shifts the layout. */
const DEFAULT_PIN_VH = 220;
const pinHeight = (seconds: number) =>
  seconds > 0 ? Math.min(320, Math.max(160, Math.round((seconds * 24) / 20) * 20)) : DEFAULT_PIN_VH;

/** Headline, supporting copy and the scroll cue — shared by the cinematic and static hero. */
function HeroCopy({ ready }: { ready: boolean }) {
  return (
    <>
      <h1 className="animate-rise max-w-[16ch] text-[clamp(2.35rem,6.4vw,4.6rem)] leading-[1.06] font-extrabold [animation-delay:120ms]">
        Discover Exceptional
        <br />
        Homes &amp; Investments
      </h1>

      <p className="animate-rise mt-7 max-w-[62ch] text-[clamp(0.95rem,1.6vw,1.08rem)] leading-[1.85] text-white/78 [animation-delay:320ms]">
        Premium properties in prime locations. Find your dream home or the perfect investment with
        confidence.
      </p>

      {ready && (
        <div className="animate-fade mt-14 flex flex-col items-center gap-3 text-white/55 [animation-delay:200ms]">
          <span className="animate-scroll-hint grid h-10 w-10 place-items-center rounded-full border border-white/25">
            <ArrowDown size={15} aria-hidden="true" />
          </span>
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em]">
            {SITE.tagline}
          </span>
        </div>
      )}
    </>
  );
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const [clip] = useState(pickClip);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const cinematic = !reducedMotion && !failed;

  // Metadata is the only thing React needs from the clip — it sizes the scrub. Progress
  // to currentTime is handled off the React tree in useScrollVideoScrub.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !cinematic) return;

    const onMetadata = () => setDuration(Number.isFinite(video.duration) ? video.duration : 0);
    video.addEventListener("loadedmetadata", onMetadata);
    if (video.readyState >= 1) onMetadata();

    return () => video.removeEventListener("loadedmetadata", onMetadata);
  }, [cinematic]);

  useScrollVideoScrub({
    sectionRef,
    videoRef,
    contentRef: copyRef,
    enabled: cinematic && ready,
  });

  // Reduced motion, or a clip that will not load: the original static hero, unchanged.
  if (!cinematic) {
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
          <HeroCopy ready />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-hero-stage
      style={{ height: `${pinHeight(duration) + 100}vh` }}
      className="relative bg-navy-deep"
    >
      <div className="sticky top-0 h-screen overflow-hidden isolate supports-[height:100svh]:h-[100svh]">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={clip}
            poster={CLIP.poster}
            preload="auto"
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out",
              ready ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Covers the video until it can seek: the clip's own first frame, so the reveal
              is invisible, swapped for the original hero photograph if the clip fails. */}
          <img
            src={failed ? PROPERTY_HERO.url : CLIP.poster}
            alt=""
            aria-hidden="true"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out",
              ready && !failed ? "opacity-0" : "opacity-100",
            )}
          />

          {/* Light wash only: enough for the nav and copy to read, never enough to flatten the footage. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,35,0.55)_0%,rgba(6,20,35,0.16)_26%,rgba(6,20,35,0.04)_54%,rgba(8,25,43,0.55)_100%)]" />

          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 bottom-9 flex flex-col items-center gap-3 transition-opacity duration-500",
              ready ? "opacity-0" : "opacity-100",
            )}
          >
            <span className="h-px w-16 animate-pulse bg-gold-soft/80" />
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-white/55">
              Preparing experience
            </span>
          </div>
        </div>

        <div
          ref={copyRef}
          className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center pb-16 pt-[86px] text-center will-change-[opacity,transform]"
        >
          <div className="shell flex flex-col items-center">
            <HeroCopy ready={ready} />
          </div>
        </div>
      </div>
    </section>
  );
}
