import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Brand } from "./Brand";
import { NAV_LINKS, PHONE } from "@/lib/site";
import heroVideo from "@/assets/hero-scrub.mp4";
import heroPoster from "@/assets/hero-poster.jpg";

/** Time constant (seconds) for easing the scrub toward the scroll target. */
const SMOOTHING_TAU = 0.08;
/** Ignore sub-frame time deltas so we never flood the decoder with seeks. */
const FRAME_EPSILON = 1 / 60;
/** Re-issue a seek if the previous one never reported back. */
const SEEK_STALL_MS = 100;

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const runwayRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const runway = runwayRef.current;
    if (!video || !runway) return;

    // Never autoplay — the video is only ever scrubbed by scroll position.
    video.pause();

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    let frameId = 0;
    let progress = 0;
    let initialized = false;
    let seeking = false;
    let seekIssuedAt = 0;
    let lastTime = performance.now();
    let runwayTop = 0;
    let scrollable = 0;

    const handleSeeked = () => {
      seeking = false;
    };
    video.addEventListener("seeked", handleSeeked);

    // Cache layout metrics (read only on resize) so the loop never forces reflow,
    // and never stalls waiting on a visibility callback.
    const measure = () => {
      runwayTop = runway.offsetTop;
      scrollable = Math.max(runway.offsetHeight - window.innerHeight, 0);
    };
    measure();
    window.addEventListener("resize", measure);

    const render = () => {
      frameId = requestAnimationFrame(render);

      // Scroll progress through the tall hero runway (0 → 1).
      const target =
        scrollable > 0 ? clamp((window.scrollY - runwayTop) / scrollable, 0, 1) : 0;

      // Ease toward the scroll target so the scrub never jumps. Damping is
      // frame-rate independent so it feels the same on 60Hz and 120Hz screens.
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!initialized) {
        progress = target;
        initialized = true;
      }
      progress += (target - progress) * (1 - Math.exp(-dt / SMOOTHING_TAU));
      const p = clamp(progress, 0, 1);

      // 3D dolly-in: the scene pushes toward the viewer as you scroll.
      if (mediaRef.current) {
        const scale = 1 + p * 0.38;
        const depth = p * 70;
        const tilt = p * -6;
        mediaRef.current.style.transform =
          `translate3d(0, 0, ${depth.toFixed(2)}px) rotateX(${tilt.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      }

      if (contentRef.current) {
        contentRef.current.style.opacity = clamp(1 - p * 1.5, 0, 1).toFixed(3);
        contentRef.current.style.transform = `translate3d(0, ${(p * -38).toFixed(2)}px, 0)`;
      }

      // Drive the video frame from scroll progress.
      const duration = video.duration;
      if (duration && Number.isFinite(duration)) {
        const time = p * (duration - 0.001);
        const stalled = Date.now() - seekIssuedAt > SEEK_STALL_MS;
        if ((!seeking || stalled) && Math.abs(time - video.currentTime) > FRAME_EPSILON) {
          seeking = true;
          seekIssuedAt = Date.now();
          try {
            video.currentTime = time;
          } catch {
            seeking = false;
          }
        }
      }
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", measure);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  return (
    <section className="hero-scroll" ref={runwayRef}>
      <div className="hero-stage">
        <div className="hero-media" ref={mediaRef}>
          <video
            ref={videoRef}
            src={heroVideo}
            poster={heroPoster}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label="Aerial view approaching a modern home"
          />
        </div>

        <div className="hero-shade" />

        <header className="site-header">
          <Brand />

          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={link.active ? "active" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a className="phone-link" href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}>
            <Phone size={15} />
            <span>{PHONE}</span>
          </a>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <div className="hero-content" ref={contentRef}>
          <h1>
            Find your place
            <br className="desktop-break" /> on the horizon
          </h1>
          <p>
            A boutique agency for exceptional homes — curating residences, land and
            investments across the coast, the mountains and the city.
          </p>
        </div>
      </div>
    </section>
  );
}
