// Display-side unit conversion. The API is always queried in metric;
// values are converted only at render time so stored/cached data stays canonical.

import type { UnitSystem } from "@/lib/settings"

const KM_PER_MILE = 1.609344

export function toTemp(celsius: number, units: UnitSystem): number {
  return units === "metric" ? celsius : (celsius * 9) / 5 + 32
}

export function formatTemp(celsius: number, units: UnitSystem): string {
  return `${Math.round(toTemp(celsius, units))}°`
}

export function tempUnitLabel(units: UnitSystem): string {
  return units === "metric" ? "°C" : "°F"
}

// OWM metric wind speed is m/s
export function formatWind(speedMs: number, units: UnitSystem): string {
  const kmh = speedMs * 3.6
  return units === "metric" ? `${Math.round(kmh)} km/h` : `${Math.round(kmh / KM_PER_MILE)} mph`
}

// OWM visibility is meters
export function formatVisibility(meters: number | undefined, units: UnitSystem): string | null {
  if (meters === undefined || meters === null || meters <= 0) return null
  const km = meters / 1000
  return units === "metric" ? `${km.toFixed(1)} km` : `${(km / KM_PER_MILE).toFixed(1)} mi`
}
