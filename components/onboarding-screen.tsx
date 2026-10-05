"use client"

import { Cloud, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoMark } from "@/components/logo"

interface OnboardingScreenProps {
  onComplete: () => void
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  return (
    <div className="bg-gradient-to-b from-background via-background to-primary/10 relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Cloud
        aria-hidden="true"
        className="text-primary/10 animate-float-slow absolute left-[12%] top-[18%] h-24 w-24"
      />
      <Sun
        aria-hidden="true"
        className="text-amber-400/15 animate-float-slow absolute right-[14%] top-[30%] h-20 w-20"
        style={{ animationDelay: "1.5s" }}
      />
      <Cloud
        aria-hidden="true"
        className="text-primary/10 animate-float-slow absolute bottom-[20%] right-[20%] h-16 w-16"
        style={{ animationDelay: "3s" }}
      />

      <LogoMark className="text-primary animate-fade-in mb-6 h-20 w-20" />
      <h1 className="text-foreground animate-fade-in-up text-4xl font-bold tracking-tight md:text-5xl">WeatherFlow</h1>
      <p className="text-muted-foreground animate-fade-in-up mt-3 text-lg font-medium" style={{ animationDelay: "100ms" }}>
        Your weather, beautifully simplified.
      </p>
      <p className="text-muted-foreground/80 animate-fade-in-up mt-1 text-sm" style={{ animationDelay: "180ms" }}>
        Fast forecasts. Anywhere.
      </p>
      <Button size="lg" onClick={onComplete} className="animate-fade-in-up mt-10 rounded-xl px-8" style={{ animationDelay: "260ms" }}>
        Get Started
      </Button>
    </div>
  )
}
