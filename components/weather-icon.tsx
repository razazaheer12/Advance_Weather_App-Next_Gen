import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_MAP: Record<string, LucideIcon> = {
  "01d": Sun,
  "01n": Moon,
  "02d": CloudSun,
  "02n": CloudMoon,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudDrizzle,
  "09n": CloudDrizzle,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,
}

interface WeatherIconProps {
  icon?: string
  description?: string
  className?: string
}

export function WeatherIcon({ icon, description, className }: WeatherIconProps) {
  const Icon = ICON_MAP[icon ?? ""] ?? CloudSun

  return (
    <Icon
      aria-hidden={description ? undefined : true}
      aria-label={description}
      role={description ? "img" : undefined}
      className={cn("shrink-0", className)}
    />
  )
}
