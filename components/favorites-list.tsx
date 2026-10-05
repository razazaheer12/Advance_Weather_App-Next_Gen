"use client"

import { Heart, MapPin, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WeatherIcon } from "@/components/weather-icon"
import { useFavorites } from "@/hooks/use-favorites"
import { useSettings } from "@/hooks/use-settings"
import { formatTemp } from "@/lib/units"

interface FavoritesListProps {
  onSelect: (cityName: string) => void
}

export function FavoritesList({ onSelect }: FavoritesListProps) {
  const { favorites, loading, removeFavorite, refreshAll } = useFavorites()
  const { units } = useSettings()

  if (favorites.length === 0) return null

  return (
    <section className="animate-fade-in-up mt-10 w-full text-left" style={{ animationDelay: "80ms" }}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-muted-foreground flex items-center gap-1.5 text-sm font-semibold">
          <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          Favorite Cities
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshAll}
          disabled={loading}
          aria-label="Refresh favorite cities weather"
          className="text-muted-foreground h-7 px-2 text-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
          Refresh
        </Button>
      </div>

      <div className="bg-card/80 border-border/50 divide-border/50 divide-y overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="group flex items-center gap-2 px-4 py-3">
            <button
              type="button"
              onClick={() => onSelect(favorite.name)}
              className="hover:bg-accent/50 flex flex-1 items-center gap-3 rounded-md py-1 text-left transition-colors"
            >
              {favorite.weather ? (
                <WeatherIcon
                  icon={favorite.weather.weather[0]?.icon}
                  description={favorite.weather.weather[0]?.description}
                  className="text-primary h-7 w-7 shrink-0"
                />
              ) : (
                <MapPin className="text-muted-foreground h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span className="min-w-0 flex-1">
                <span className="text-foreground block truncate text-sm font-medium">
                  {favorite.name}, {favorite.country}
                </span>
                {favorite.weather && (
                  <span className="text-muted-foreground block truncate text-xs capitalize">
                    {favorite.weather.weather[0]?.description}
                  </span>
                )}
              </span>
              {favorite.weather && (
                <span className="text-primary shrink-0 text-lg font-bold">
                  {formatTemp(favorite.weather.temp, units)}
                </span>
              )}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFavorite(favorite.id)}
              aria-label={`Remove ${favorite.name} from favorites`}
              className="text-muted-foreground hover:text-destructive h-8 w-8 shrink-0 opacity-60 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
