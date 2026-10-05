"use client"

import { useSettings } from "@/hooks/use-settings"
import type { UnitSystem } from "@/lib/settings"
import { cn } from "@/lib/utils"

const OPTIONS: { value: UnitSystem; label: string; title: string }[] = [
  { value: "metric", label: "°C", title: "Celsius, km/h, km" },
  { value: "imperial", label: "°F", title: "Fahrenheit, mph, miles" },
]

export function UnitsToggle() {
  const { units, setUnits } = useSettings()

  return (
    <div
      role="group"
      aria-label="Temperature units"
      className="bg-muted/60 border-border/50 flex items-center rounded-full border p-0.5"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.title}
          aria-pressed={units === option.value}
          onClick={() => setUnits(option.value)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition-all active:scale-95",
            units === option.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
