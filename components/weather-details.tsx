import { Droplets, Eye, Gauge, Sunrise, Sunset, Thermometer, Wind, type LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatVisibility, formatWind } from "@/lib/forecast"
import { formatTime, type WeatherData } from "@/lib/weather"

interface WeatherDetailsProps {
  weather: WeatherData
}

interface Metric {
  icon: LucideIcon
  label: string
  value: string
}

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const visibility = formatVisibility(weather.visibility)

  const metrics: Metric[] = [
    { icon: Thermometer, label: "Feels like", value: `${Math.round(weather.feels_like)}°` },
    { icon: Droplets, label: "Humidity", value: `${weather.humidity}%` },
    { icon: Wind, label: "Wind", value: formatWind(weather.wind_speed) },
    ...(visibility ? [{ icon: Eye, label: "Visibility", value: visibility } as Metric] : []),
    { icon: Gauge, label: "Pressure", value: `${weather.pressure} hPa` },
    { icon: Sunrise, label: "Sunrise", value: formatTime(weather.sunrise, weather.timezone) },
    { icon: Sunset, label: "Sunset", value: formatTime(weather.sunset, weather.timezone) },
  ]

  return (
    <Card className="bg-card/90 border-border/50 shadow-sm backdrop-blur-sm">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-foreground text-base font-semibold">Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 px-6 pb-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-muted/40 rounded-2xl p-4">
            <div className="text-muted-foreground mb-2 flex items-center gap-1.5 text-xs font-medium">
              <metric.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {metric.label}
            </div>
            <div className="text-foreground text-lg font-semibold">{metric.value}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
