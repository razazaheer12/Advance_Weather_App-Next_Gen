import { readJSON, writeJSON } from "@/lib/storage"
import type { ForecastData, WeatherData } from "@/lib/weather"

const CACHE_KEY = "weatherflow:weather-cache"
const MAX_ENTRIES = 12

export interface WeatherCacheEntry {
  weather: WeatherData
  forecast: ForecastData | null
  savedAt: number
}

type WeatherCacheMap = Record<string, WeatherCacheEntry>

export function cityCacheKey(city: string): string {
  return `city:${city.trim().toLowerCase()}`
}

export function coordsCacheKey(lat: number, lon: number): string {
  return `coords:${lat.toFixed(2)},${lon.toFixed(2)}`
}

export function readWeatherCache(key: string): WeatherCacheEntry | null {
  const map = readJSON<WeatherCacheMap>(CACHE_KEY, {})
  return map[key] ?? null
}

export function writeWeatherCache(key: string, weather: WeatherData, forecast: ForecastData | null): void {
  const map = readJSON<WeatherCacheMap>(CACHE_KEY, {})
  map[key] = { weather, forecast, savedAt: Date.now() }
  const pruned = Object.entries(map)
    .sort((a, b) => b[1].savedAt - a[1].savedAt)
    .slice(0, MAX_ENTRIES)
  writeJSON(CACHE_KEY, Object.fromEntries(pruned))
}
