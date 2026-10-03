import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Brand } from "./Brand";
import { NAV_LINKS, PHONE } from "@/lib/site";
import heroVideo from "@/assets/hero-scrub.mp4";
import heroPoster from "@/assets/hero-poster.jpg";

/** Time constant (seconds) for easing the scrub toward the scroll target. */
const SMOOTHING_TAU = 0.085;
/** Smallest time change worth a new seek (~a quarter of a 24fps frame). */
const SEEK_EPSILON = 0.01;
/** Safety valve: never stay blocked on a seek that never reports back. */
const SEEK_WATCHDOG_MS = 250;
/** Vertical framing inside the stage — mirrors the CSS `object-position`. */
const FRAME_BIAS = 0.56;

type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const runwayRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current as VideoWithFrameCallback | null;
    const canvas = canvasRef.current;
    const runway = runwayRef.current;
    if (!video || !canvas || !runway) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Never autoplay — the clip is only ever scrubbed by scroll position.
    video.pause();

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    let frameId = 0;
    let rvfcId = 0;
    let progress = 0;
    let initialized = false;
    let lastTick = performance.now();
    let runwayTop = 0;
    let scrollable = 0;
    let stageW = 0;
    let stageH = 0;
    let targetTime = 0;
    let seeking = false;
    let seekStartedAt = 0;
    let videoReady = false;

    /**
     * Frames are blitted onto a canvas rather than left to the <video> layer:
     * seeked video frames are frequently not re-painted when the element sits
     * inside a transformed/perspective context, which is exactly what made the
     * scrub look like it was ticking. A canvas repaints on every draw.
     */
    const paint = (source: CanvasImageSource, sw: number, sh: number) => {
      if (!sw || !sh || !stageW || !stageH) return;
      const scale = Math.max(stageW / sw, stageH / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      ctx.drawImage(source, (stageW - dw) / 2, (stageH - dh) * FRAME_BIAS, dw, dh);
    };

    const drawVideoFrame = () => {
      if (video.readyState < 2 || !video.videoWidth) return false;
      paint(video, video.videoWidth, video.videoHeight);
      videoReady = true;
      return true;
    };

    const poster = new Image();
    poster.src = heroPoster;
    const drawPoster = () => {
      if (videoReady) return;
      paint(poster, poster.naturalWidth, poster.naturalHeight);
    };
    if (poster.complete) drawPoster();
    else poster.addEventListener("load", drawPoster);

    const measure = () => {
      runwayTop = runway.offsetTop;
      scrollable = Math.max(runway.offsetHeight - window.innerHeight, 0);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      stageW = Math.round(canvas.clientWidth * dpr);
      stageH = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== stageW) canvas.width = stageW;
      if (canvas.height !== stageH) canvas.height = stageH;
      if (!drawVideoFrame()) drawPoster();
    };
    measure();
    window.addEventListener("resize", measure);

    // Seek chaining: issue the next seek the moment the previous one lands, so
    // the decoder is never idle and never has two seeks fighting each other.
    const pump = () => {
      if (seeking) {
        if (performance.now() - seekStartedAt < SEEK_WATCHDOG_MS) return;
        seeking = false;
      }
      if (!Number.isFinite(video.duration)) return;
      if (Math.abs(video.currentTime - targetTime) < SEEK_EPSILON) return;
      seeking = true;
      seekStartedAt = performance.now();
      try {
        video.currentTime = targetTime;
      } catch {
        seeking = false;
      }
    };

    const onSeeked = () => {
      seeking = false;
      drawVideoFrame();
      pump();
    };
    video.addEventListener("seeked", onSeeked);

    // Where the browser supports it, draw on the presented frame instead — that
    // is the earliest moment the decoded picture is actually available.
    const onVideoFrame = () => {
      drawVideoFrame();
      rvfcId = video.requestVideoFrameCallback?.(onVideoFrame) ?? 0;
    };
    if (video.requestVideoFrameCallback) rvfcId = video.requestVideoFrameCallback(onVideoFrame);

    const render = () => {
      frameId = requestAnimationFrame(render);

      const target =
        scrollable > 0 ? clamp((window.scrollY - runwayTop) / scrollable, 0, 1) : 0;

      const now = performance.now();
      const dt = Math.min((now - lastTick) / 1000, 0.05);
      lastTick = now;

      if (!initialized) {
        progress = target;
        initialized = true;
      }
      // Frame-rate independent easing so the scrub reads the same at 60 and 120Hz.
      progress += (target - progress) * (1 - Math.exp(-dt / SMOOTHING_TAU));
      const p = clamp(progress, 0, 1);

      // 3D dolly-in: the scene pushes toward the viewer as you scroll.
      const media = mediaRef.current;
      if (media) {
        const scale = 1 + p * 0.38;
        const depth = p * 70;
        const tilt = p * -6;
        media.style.transform =
          `translate3d(0, 0, ${depth.toFixed(2)}px) rotateX(${tilt.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      }

      const content = contentRef.current;
      if (content) {
        content.style.opacity = clamp(1 - p * 1.5, 0, 1).toFixed(3);
        content.style.transform = `translate3d(0, ${(p * -38).toFixed(2)}px, 0)`;
      }

      const duration = video.duration;
      if (duration && Number.isFinite(duration)) {
        targetTime = p * (duration - 0.001);
        pump();
      }
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      if (rvfcId) video.cancelVideoFrameCallback?.(rvfcId);
      window.removeEventListener("resize", measure);
      video.removeEventListener("seeked", onSeeked);
      poster.removeEventListener("load", drawPoster);
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
          <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
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
