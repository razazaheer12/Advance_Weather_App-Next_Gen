"use client"

import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const current = mounted ? theme : "system"

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="bg-muted/60 border-border/50 flex items-center rounded-full border p-0.5"
    >
      {THEMES.map((option) => (
        <button
          key={option.value}
          type="button"
          title={`${option.label} theme`}
          aria-label={`${option.label} theme`}
          aria-pressed={current === option.value}
          onClick={() => setTheme(option.value)}
          className={cn(
            "rounded-full p-1.5 transition-all active:scale-95",
            current === option.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <option.icon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
