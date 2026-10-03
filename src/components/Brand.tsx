export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className ?? "brand-mark"} viewBox="0 0 38 44" aria-hidden="true">
      <path d="M5 31 19 8l14 23" />
      <path d="M11 31v-8h16v8" />
      <path d="M3 37h32" />
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="#top" aria-label="هورایزن — املاک لوکس">
      <BrandMark />
      <span className="brand-copy">
        <strong>هورایزن</strong>
        <small>املاک لوکس</small>
      </span>
    </a>
  );
}
