"use client"

import { useState } from "react"
import { Heart, MapPin, Droplets, RefreshCw, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFavorites } from "@/hooks/use-favorites"
import { getWeatherIconUrl } from "@/lib/weather"

interface FavoritesListProps {
  onCitySelect: (cityName: string) => void
  className?: string
}

export function FavoritesList({ onCitySelect, className = "" }: FavoritesListProps) {
  const { favorites, loading, removeFavorite, updateFavoritesWeather } = useFavorites()
  const [isExpanded, setIsExpanded] = useState(false)

  if (favorites.length === 0) {
    return (
      <Card className={`bg-white/95 backdrop-blur-sm border-white/30 shadow-xl ${className}`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-red-500" />
            Favorite Cities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No favorite cities yet</p>
            <p className="text-sm text-muted-foreground mt-1">Add cities to your favorites for quick access</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const displayedFavorites = isExpanded ? favorites : favorites.slice(0, 3)

  return (
    <Card className={`bg-white/95 backdrop-blur-sm border-white/30 shadow-xl ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-red-500" />
            Favorite Cities
            <Badge variant="secondary" className="ml-2">
              {favorites.length}
            </Badge>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={updateFavoritesWeather} disabled={loading} className="h-8 w-8 p-0">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full">
          <div className="space-y-3">
            {displayedFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => onCitySelect(favorite.name)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">
                        {favorite.name}, {favorite.country}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Added {new Date(favorite.addedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {favorite.weather && (
                    <div className="flex items-center gap-2 ml-auto">
                      <img
                        src={getWeatherIconUrl(favorite.weather.weather[0]?.icon) || "/placeholder.svg"}
                        alt={favorite.weather.weather[0]?.description}
                        className="w-8 h-8"
                      />
                      <div className="text-right">
                        <div className="font-bold text-primary text-sm">{favorite.weather.temp}°C</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Droplets className="h-3 w-3" />
                          {favorite.weather.humidity}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFavorite(favorite.id)
                  }}
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          {favorites.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full mt-3 text-sm"
            >
              {isExpanded ? "Show Less" : `Show ${favorites.length - 3} More`}
            </Button>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
