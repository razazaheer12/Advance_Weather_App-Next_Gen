import { Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherIcon } from "@/components/weather-icon"
import { formatHourLabel, getHourlyForecast } from "@/lib/forecast"
import type { ForecastData } from "@/lib/weather"

interface HourlyForecastProps {
  forecast: ForecastData
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  const hourly = getHourlyForecast(forecast, 8)
  const timezone = forecast.city?.timezone ?? 0

  return (
    <Card className="bg-card/90 border-border/50 shadow-sm backdrop-blur-sm">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-foreground text-base font-semibold">Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5">
        <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
          {hourly.map((hour, index) => (
            <div
              key={hour.dt}
              className="bg-muted/40 flex min-w-[76px] snap-start flex-col items-center gap-2 rounded-2xl px-3 py-4"
            >
              <span className="text-muted-foreground text-xs font-medium">
                {index === 0 ? "Now" : formatHourLabel(hour.dt, timezone)}
              </span>
              <WeatherIcon icon={hour.icon} description={hour.description} className="text-primary h-6 w-6" />
              <span className="text-foreground text-base font-bold">{hour.temp}°</span>
              <span
                className={
                  hour.pop > 0
                    ? "text-sky-600 flex items-center gap-0.5 text-xs font-medium dark:text-sky-400"
                    : "text-transparent text-xs"
                }
                aria-hidden={hour.pop > 0 ? undefined : true}
              >
                <Droplets className="h-3 w-3" aria-hidden="true" />
                {hour.pop}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
