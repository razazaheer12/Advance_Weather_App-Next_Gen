import { Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherIcon } from "@/components/weather-icon"
import { getDailyForecast } from "@/lib/forecast"
import type { ForecastData } from "@/lib/weather"

interface DailyForecastProps {
  forecast: ForecastData
}

export function DailyForecast({ forecast }: DailyForecastProps) {
  const days = getDailyForecast(forecast, 5)
  const weekMin = Math.min(...days.map((day) => day.min))
  const weekMax = Math.max(...days.map((day) => day.max))
  const span = Math.max(weekMax - weekMin, 1)

  return (
    <Card className="bg-card/90 border-border/50 shadow-sm backdrop-blur-sm">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-foreground text-base font-semibold">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-4">
        <div className="divide-border/50 divide-y">
          {days.map((day) => {
            const left = ((day.min - weekMin) / span) * 100
            const width = ((day.max - day.min) / span) * 100
            return (
              <div key={day.key} className="grid grid-cols-[3rem_1.5rem_1fr_auto] items-center gap-3 py-3">
                <span className="text-foreground text-sm font-medium">{day.label}</span>
                <WeatherIcon icon={day.icon} description={day.description} className="text-primary h-5 w-5" />
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-muted-foreground truncate text-sm capitalize">{day.description}</span>
                  {day.pop > 0 && (
                    <span className="text-sky-600 flex shrink-0 items-center gap-0.5 text-xs font-medium dark:text-sky-400">
                      <Droplets className="h-3 w-3" aria-hidden="true" />
                      {day.pop}%
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground w-8 text-right text-sm">{day.min}°</span>
                  <div className="bg-muted relative h-1.5 w-14 overflow-hidden rounded-full md:w-24" aria-hidden="true">
                    <div
                      className="from-primary/60 to-primary absolute inset-y-0 rounded-full bg-gradient-to-r"
                      style={{ left: `${left}%`, width: `${Math.max(width, 8)}%` }}
                    />
                  </div>
                  <span className="text-foreground w-8 text-sm font-semibold">{day.max}°</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
