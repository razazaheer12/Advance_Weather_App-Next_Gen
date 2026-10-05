"use client"

import { Heart } from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"

interface FavoritesBarProps {
  onSelect: (cityName: string) => void
  activeCityId?: string
}

export function FavoritesBar({ onSelect, activeCityId }: FavoritesBarProps) {
  const { favorites } = useFavorites()

  if (favorites.length === 0) return null

  return (
    <div
      aria-label="Favorite cities"
      className="animate-fade-in -mt-2 mb-6 flex gap-2 overflow-x-auto pb-1"
    >
      {favorites.map((favorite) => {
        const isActive = favorite.id === activeCityId
        return (
          <button
            key={favorite.id}
            type="button"
            onClick={() => onSelect(favorite.name)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground border-transparent shadow-sm"
                : "bg-card/80 border-border/50 text-foreground hover:bg-accent shadow-sm backdrop-blur-sm",
            )}
          >
            <Heart
              className={cn("h-3 w-3", isActive ? "fill-current" : "text-red-400 fill-current")}
              aria-hidden="true"
            />
            <span className="font-medium">{favorite.name}</span>
            {favorite.weather && (
              <span className={cn("text-xs", isActive ? "opacity-90" : "text-muted-foreground")}>
                {Math.round(favorite.weather.temp)}°
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
