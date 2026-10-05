// Derivations over the OpenWeatherMap 3-hourly forecast payload.
// No invented data: everything here is reduced from `forecast.list`.

import type { ForecastData } from "@/lib/weather"

export interface HourlyEntry {
  dt: number
  temp: number
  pop: number
  icon: string
  description: string
}

export interface DailyEntry {
  key: string
  label: string
  icon: string
  description: string
  min: number
  max: number
  pop: number
}

export function getHourlyForecast(forecast: ForecastData, count = 8): HourlyEntry[] {
  return forecast.list.slice(0, count).map((entry) => ({
    dt: entry.dt,
    temp: Math.round(entry.main.temp),
    pop: Math.round((entry.pop ?? 0) * 100),
    icon: entry.weather[0]?.icon ?? "01d",
    description: entry.weather[0]?.description ?? "",
  }))
}

export function getDailyForecast(forecast: ForecastData, maxDays = 5): DailyEntry[] {
  const timezone = forecast.city?.timezone ?? 0
  const buckets = new Map<string, ForecastData["list"]>()

  for (const entry of forecast.list) {
    // dt_txt is already expressed in the city's local time
    const key = entry.dt_txt.slice(0, 10)
    const bucket = buckets.get(key)
    if (bucket) {
      bucket.push(entry)
    } else {
      buckets.set(key, [entry])
    }
  }

  const days: DailyEntry[] = []
  for (const [key, entries] of buckets) {
    if (days.length >= maxDays) break

    const min = Math.min(...entries.map((entry) => entry.main.temp_min))
    const max = Math.max(...entries.map((entry) => entry.main.temp_max))
    const pop = Math.max(...entries.map((entry) => entry.pop ?? 0))
    const representative =
      entries.find((entry) => entry.dt_txt.endsWith("12:00:00")) ?? entries[Math.floor(entries.length / 2)]

    days.push({
      key,
      label:
        days.length === 0
          ? "Today"
          : new Date((entries[0].dt + timezone) * 1000).toLocaleDateString("en-US", {
              weekday: "short",
              timeZone: "UTC",
            }),
      icon: representative.weather[0]?.icon ?? "01d",
      description: representative.weather[0]?.description ?? "",
      min: Math.round(min),
      max: Math.round(max),
      pop: Math.round(pop * 100),
    })
  }

  return days
}

export function formatHourLabel(dt: number, timezone: number): string {
  return new Date((dt + timezone) * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    timeZone: "UTC",
  })
}

// OWM metric units return wind in m/s
export function formatWind(speedMs: number): string {
  return `${Math.round(speedMs * 3.6)} km/h`
}

// OWM returns visibility in meters
export function formatVisibility(meters?: number): string | null {
  if (meters === undefined || meters === null || meters <= 0) return null
  return `${(meters / 1000).toFixed(1)} km`
}
