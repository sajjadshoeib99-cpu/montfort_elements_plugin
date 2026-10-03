import { useEffect, useState, type RefObject } from "react";

type ScrollVideoOptions = {
  /** Tall wrapper whose scroll progress drives the timeline. */
  sectionRef: RefObject<HTMLElement | null>;
  /** The paused `<video>` we scrub — never played. */
  videoRef: RefObject<HTMLVideoElement | null>;
  /** Optional hero copy that drifts away over the first slice of the scrub. */
  contentRef?: RefObject<HTMLElement | null>;
  /** Scrub only once the clip can seek and motion is allowed. */
  enabled: boolean;
};

/** The clip is 24 fps, so a jump below one frame cannot change what is drawn. */
const MIN_SEEK = 0.02;
/** Per-frame approach to the scroll target: direct enough to feel attached, damped enough to stay fluid. */
const SMOOTHING = 0.2;
/** Once the eased playhead is this close, snap to the exact frame (guarantees a true 0 / true end). */
const SETTLE = 0.004;
/** Share of the scrub over which the hero copy fades and lifts away. */
const COPY_FADE = 0.3;

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

/**
 * Turns scroll position into the video timeline: the scroll handler only wakes a
 * `requestAnimationFrame` loop, the loop reads the current scroll offset, eases the
 * playhead towards it and issues a single seek once the previous one has landed.
 *
 * Nothing here touches React state, so scrubbing never re-renders the tree. The
 * video itself is never played — the timeline is only ever seeked.
 */
export function useScrollVideoScrub({
  sectionRef,
  videoRef,
  contentRef,
  enabled,
}: ScrollVideoOptions) {
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !enabled) return;

    let frame = 0;
    let progress = 0;
    let target = 0; // where the scroll says the playhead should be
    let playhead = 0; // where it actually is, eased towards `target`
    let applied = -1; // last value written to video.currentTime
    let primed = false;

    const render = () => {
      frame = 0;

      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      // Progress across the pinned phase only: the sticky viewport holds the screen
      // for (section height - viewport height) px, so progress reaches 1 exactly when
      // the pin releases — on the clip's final frame.
      const pinnedDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      progress = clamp01(-section.getBoundingClientRect().top / pinnedDistance);
      target = progress * duration;

      if (primed) {
        playhead += (target - playhead) * SMOOTHING;
        if (Math.abs(target - playhead) < SETTLE) playhead = target;
      } else {
        // First paint after load (or after the clip becomes seekable): land on the
        // right frame immediately instead of easing in from the start.
        primed = true;
        playhead = target;
      }

      // One seek at a time. Writing currentTime while a previous seek is still in
      // flight makes browsers queue jumps — the main cause of stutter — so we wait for
      // the decoder and skip anything smaller than a frame. Once the eased playhead has
      // arrived, the exact frame is written anyway, so the timeline really does reach 0
      // and the true end rather than stopping half a frame short.
      const moved = Math.abs(playhead - applied);
      const settled = Math.abs(target - playhead) < SETTLE;
      if (!video.seeking && (moved > MIN_SEEK || (settled && moved > 0))) {
        applied = playhead;
        video.currentTime = playhead;
      }

      const copy = contentRef?.current;
      if (copy) {
        const fade = clamp01(1 - progress / COPY_FADE);
        copy.style.opacity = String(fade);
        copy.style.transform = `translate3d(0, ${((1 - fade) * -20).toFixed(2)}px, 0)`;
      }

      // Keep looping only while something is still moving.
      if (Math.abs(target - playhead) > SETTLE || video.seeking) frame = requestAnimationFrame(render);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onScroll = () => wake();
    // Belt and braces: the clip is never meant to play on its own.
    const stayPaused = () => video.pause();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    video.addEventListener("play", stayPaused);

    wake();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("play", stayPaused);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionRef, videoRef, contentRef, enabled]);
}

/** True when the visitor asked for less motion — the hero then renders its static form. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
