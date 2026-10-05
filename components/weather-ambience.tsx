import { cn } from "@/lib/utils"

interface WeatherAmbienceProps {
  condition?: string
  isNight?: boolean
}

// Low-opacity tints only: text sits on card surfaces, so contrast is preserved.
const DAY: Record<string, string> = {
  Clear: "from-sky-300/30 via-amber-200/20 to-transparent",
  Clouds: "from-slate-300/30 via-slate-200/20 to-transparent",
  Rain: "from-blue-400/25 via-slate-300/20 to-transparent",
  Drizzle: "from-teal-300/25 via-slate-200/20 to-transparent",
  Thunderstorm: "from-indigo-400/25 via-slate-400/20 to-transparent",
  Snow: "from-cyan-200/30 via-slate-100/20 to-transparent",
  Mist: "from-slate-300/30 via-slate-200/25 to-transparent",
  Fog: "from-slate-300/30 via-slate-200/25 to-transparent",
}

const NIGHT: Record<string, string> = {
  Clear: "from-indigo-500/25 via-blue-900/15 to-transparent",
  Clouds: "from-slate-600/25 via-slate-800/15 to-transparent",
  Rain: "from-blue-700/25 via-slate-800/15 to-transparent",
  Drizzle: "from-teal-700/25 via-slate-800/15 to-transparent",
  Thunderstorm: "from-indigo-700/30 via-slate-900/20 to-transparent",
  Snow: "from-cyan-700/25 via-slate-800/15 to-transparent",
  Mist: "from-slate-600/25 via-slate-800/15 to-transparent",
  Fog: "from-slate-600/25 via-slate-800/15 to-transparent",
}

const DEFAULT_GRADIENT = "from-background via-muted to-primary/10"

export function WeatherAmbience({ condition, isNight = false }: WeatherAmbienceProps) {
  const palette = isNight ? NIGHT : DAY
  const gradient = (condition && palette[condition]) || DEFAULT_GRADIENT

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", gradient)}
    />
  )
}
