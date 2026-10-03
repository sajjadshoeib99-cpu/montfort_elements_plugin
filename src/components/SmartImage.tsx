import type { ImageAsset } from "@/lib/images";
import { cn } from "@/lib/utils";

type Props = {
  image: ImageAsset;
  sizes?: string;
  className?: string;
  /** Above-the-fold images skip lazy loading. */
  eager?: boolean;
};

/**
 * Single image primitive: responsive srcSet, lazy loading by default and a
 * neutral placeholder so large photography never causes layout shift.
 */
export function SmartImage({ image, sizes, className, eager = false }: Props) {
  return (
    <img
      src={image.url}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      alt={image.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
