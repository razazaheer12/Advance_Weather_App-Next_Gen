"use client"

import dynamic from "next/dynamic"
import { Heart, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WeatherIcon } from "@/components/weather-icon"
import { HourlyForecast } from "@/components/hourly-forecast"
import { DailyForecast } from "@/components/daily-forecast"
import { WeatherDetails } from "@/components/weather-details"
import { useFavorites } from "@/hooks/use-favorites"
import { useSettings } from "@/hooks/use-settings"
import { getDailyForecast } from "@/lib/forecast"
import { formatTemp } from "@/lib/units"
import { type WeatherData, type ForecastData } from "@/lib/weather"
import { cn } from "@/lib/utils"

// Recharts is heavy; keep it out of the initial bundle
const TemperatureChart = dynamic(
  () => import("@/components/temperature-chart").then((mod) => mod.TemperatureChart),
  {
    ssr: false,
    loading: () => <div className="bg-muted/40 h-36 animate-pulse rounded-xl" aria-hidden="true" />,
  },
)

interface WeatherDashboardProps {
  weather: WeatherData
  forecast: ForecastData | null
}

export function WeatherDashboard({ weather: currentWeather, forecast: forecastData }: WeatherDashboardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { units } = useSettings()
  const favorited = isFavorite(currentWeather)
  const condition = currentWeather.weather[0]
  // The /weather snapshot's temp_min/max are the instantaneous range, not the
  // day's — today's real high/low comes from the 3-hourly forecast buckets.
  const today = forecastData ? getDailyForecast(forecastData, 1)[0] : undefined
  const high = today ? today.max : currentWeather.temp_max
  const low = today ? today.min : currentWeather.temp_min

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Hero */}
      <Card className="bg-card/90 border-border/50 shadow-xl rounded-3xl overflow-hidden backdrop-blur-sm">
        <CardContent className="p-6 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {currentWeather.country} ·{" "}
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </span>
              </div>
              <h2 className="text-foreground mt-1 truncate text-3xl font-bold tracking-tight md:text-4xl">
                {currentWeather.name}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(currentWeather)}
              aria-pressed={favorited}
              aria-label={
                favorited
                  ? `Remove ${currentWeather.name} from favorites`
                  : `Add ${currentWeather.name} to favorites`
              }
              className={cn(
                "h-10 w-10 shrink-0 rounded-full transition-transform active:scale-90",
                favorited ? "text-red-500" : "text-muted-foreground",
              )}
            >
              <Heart
                aria-hidden="true"
                className={cn("h-5 w-5 transition-transform duration-200", favorited && "scale-110 fill-current")}
              />
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-5">
              <WeatherIcon
                icon={condition?.icon}
                description={condition?.description}
                className="text-primary h-20 w-20 md:h-24 md:w-24"
              />
              <div>
                <div className="text-foreground text-6xl font-bold tracking-tight md:text-7xl">
                  {formatTemp(currentWeather.temp, units)}
                </div>
                <p className="text-muted-foreground mt-1 text-lg capitalize">{condition?.description}</p>
              </div>
            </div>
            <div className="text-foreground flex gap-8 text-sm md:ml-auto">
              <div>
                <div className="text-muted-foreground text-xs font-medium">Feels like</div>
                <div className="mt-0.5 text-base font-semibold">{formatTemp(currentWeather.feels_like, units)}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs font-medium">High / Low</div>
                <div className="mt-0.5 text-base font-semibold">
                  {formatTemp(high, units)} / {formatTemp(low, units)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {forecastData && <HourlyForecast forecast={forecastData} />}

      {forecastData && (
        <div className="grid gap-6 lg:grid-cols-2">
          <DailyForecast forecast={forecastData} />
          <TemperatureChart forecast={forecastData} />
        </div>
      )}

      <WeatherDetails weather={currentWeather} />
    </div>
  )
}
