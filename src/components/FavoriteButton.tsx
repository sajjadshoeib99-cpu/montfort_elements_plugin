import { Heart } from "lucide-react";

import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

type Props = {
  propertyId: string;
  label?: string;
  className?: string;
};

export function FavoriteButton({ propertyId, label = "Save property", className }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(propertyId);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from saved properties" : label}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(propertyId);
      }}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-all duration-300",
        active
          ? "border-gold bg-gold text-navy-deep"
          : "border-white/45 bg-white/15 text-white hover:border-gold hover:bg-white/25",
        className,
      )}
    >
      <Heart size={16} strokeWidth={2} className={active ? "fill-current" : undefined} />
    </button>
  );
}
