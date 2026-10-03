import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";

/**
 * Pointer-driven 3D tilt. Writes CSS custom properties on the element so the
 * transform stays in the stylesheet (and out of React's render cycle).
 */
export function useTilt(max = 7) {
  const ref = useRef<HTMLElement | null>(null);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.setProperty("--tilt-x", `${(-py * max).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${(px * max).toFixed(2)}deg`);
      element.style.setProperty("--glow-x", `${((px + 0.5) * 100).toFixed(1)}%`);
      element.style.setProperty("--glow-y", `${((py + 0.5) * 100).toFixed(1)}%`);
    },
    [max]
  );

  const onPointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
