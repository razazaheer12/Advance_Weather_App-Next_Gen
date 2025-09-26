"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type WeatherData, getWeatherIconUrl, formatTime } from "@/lib/weather"
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun, Moon, Heart } from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const isCurrentlyFavorite = isFavorite(weather)

  const handleFavoriteToggle = () => {
    if (isCurrentlyFavorite) {
      const cityId = `${weather.name}-${weather.country}`
      removeFavorite(cityId)
    } else {
      addFavorite(weather)
    }
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-foreground">
            {weather.name}, {weather.country}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Live
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteToggle}
              className={`h-8 w-8 p-0 ${
                isCurrentlyFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"
              }`}
            >
              <Heart className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Weather Display */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src={getWeatherIconUrl(weather.weather[0]?.icon) || "/placeholder.svg"}
                alt={weather.weather[0]?.description}
                className="w-24 h-24 drop-shadow-lg"
              />
            </div>
            <div className="text-6xl font-bold text-primary mb-2 tracking-tight">{weather.temp}°</div>
            <div className="text-xl text-muted-foreground capitalize font-medium mb-1">
              {weather.weather[0]?.description}
            </div>
            <div className="text-sm text-muted-foreground">Feels like {weather.feels_like}°C</div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Thermometer className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">High / Low</div>
              <div className="text-sm text-muted-foreground">
                {weather.temp_max}° / {weather.temp_min}°
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm font-medium">Humidity</div>
              <div className="text-sm text-muted-foreground">{weather.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Wind className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-sm font-medium">Wind Speed</div>
              <div className="text-sm text-muted-foreground">{weather.wind_speed} m/s</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Gauge className="h-5 w-5 text-orange-500" />
            <div>
              <div className="text-sm font-medium">Pressure</div>
              <div className="text-sm text-muted-foreground">{weather.pressure} hPa</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Eye className="h-5 w-5 text-purple-500" />
            <div>
              <div className="text-sm font-medium">Visibility</div>
              <div className="text-sm text-muted-foreground">
                {weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : "N/A"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Wind className="h-5 w-5 text-gray-500" style={{ transform: `rotate(${weather.wind_deg}deg)` }} />
            <div>
              <div className="text-sm font-medium">Wind Direction</div>
              <div className="text-sm text-muted-foreground">{weather.wind_deg}°</div>
            </div>
          </div>
        </div>

        {/* Sunrise/Sunset */}
        <div className="flex justify-between items-center pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <div>
              <div className="text-sm font-medium">Sunrise</div>
              <div className="text-sm text-muted-foreground">{formatTime(weather.sunrise, weather.timezone)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-indigo-500" />
            <div>
              <div className="text-sm font-medium">Sunset</div>
              <div className="text-sm text-muted-foreground">{formatTime(weather.sunset, weather.timezone)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
