import { useEffect } from "react";

/**
 * Fades sections in as they enter the viewport.
 * Re-scan whenever `key` changes (e.g. the route), so new pages animate too.
 */
export function useScrollReveal(key?: string) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const show = (node: HTMLElement) => node.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.92) show(node);
      else observer.observe(node);
    });

    return () => observer.disconnect();
  }, [key]);
}
