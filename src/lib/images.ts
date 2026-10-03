const CDN = "https://images.unsplash.com/photo-";

/** Build a single responsive image URL from an Unsplash photo id. */
export function photo(id: string, width: number, quality = 72) {
  return `${CDN}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/** Responsive srcSet for a photo, so small screens never download desktop files. */
export function photoSet(id: string, widths: number[] = [640, 960, 1280, 1600]) {
  return widths.map((w) => `${photo(id, w)} ${w}w`).join(", ");
}

export type ImageAsset = {
  url: string;
  srcSet?: string;
  alt: string;
};

/** A CDN image with a responsive srcSet. */
export function unsplash(id: string, alt: string): ImageAsset {
  return { url: photo(id, 1600), srcSet: photoSet(id), alt };
}

/** A bundled image imported from `src/assets`. */
export function local(url: string, alt: string): ImageAsset {
  return { url, alt };
}

export const IMAGE_SIZES = {
  full: "100vw",
  half: "(min-width: 1024px) 50vw, 100vw",
  third: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  quarter: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
} as const;
