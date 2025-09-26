"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ForecastData, getWeatherIconUrl } from "@/lib/weather"

interface WeeklyForecastProps {
  forecast: ForecastData
}

export function WeeklyForecast({ forecast }: WeeklyForecastProps) {
  // Group forecast data by day (taking one entry per day, preferably around noon)
  const dailyForecasts = forecast.list.reduce(
    (acc, item) => {
      const date = new Date(item.dt * 1000)
      const dateKey = date.toDateString()

      // Prefer entries around noon (12:00) for daily forecast
      if (
        !acc[dateKey] ||
        Math.abs(date.getHours() - 12) < Math.abs(new Date(acc[dateKey].dt * 1000).getHours() - 12)
      ) {
        acc[dateKey] = item
      }

      return acc
    },
    {} as Record<string, (typeof forecast.list)[0]>,
  )

  const weeklyData = Object.values(dailyForecasts).slice(0, 7)

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {weeklyData.map((item, index) => {
            const date = new Date(item.dt * 1000)
            const isToday = index === 0

            return (
              <div
                key={item.dt}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="min-w-[80px]">
                    <div className="font-medium text-sm">
                      {isToday ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>

                  <img
                    src={getWeatherIconUrl(item.weather[0]?.icon) || "/placeholder.svg"}
                    alt={item.weather[0]?.description}
                    className="w-10 h-10"
                  />

                  <div className="flex-1">
                    <div className="text-sm font-medium capitalize">{item.weather[0]?.description}</div>
                    <div className="text-xs text-muted-foreground">Humidity: {item.main.humidity}%</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-primary">{Math.round(item.main.temp_max)}°</div>
                  <div className="text-sm text-muted-foreground">{Math.round(item.main.temp_min)}°</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
