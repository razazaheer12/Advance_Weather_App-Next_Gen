"use client"

import { CloudOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getWeatherErrorCopy } from "@/lib/weather"

interface ErrorStateProps {
  error: unknown
  retrying?: boolean
  onRetry: () => void
}

export function ErrorState({ error, retrying = false, onRetry }: ErrorStateProps) {
  const copy = getWeatherErrorCopy(error)

  return (
    <Card className="bg-card/90 border-destructive/20 animate-fade-in-up mx-auto max-w-md shadow-xl backdrop-blur-sm">
      <CardContent className="flex flex-col items-center pt-8 pb-8 text-center">
        <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <CloudOff className="text-destructive h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-foreground mb-1 font-semibold">{copy.title}</p>
        <p className="text-muted-foreground mb-6 text-sm">{copy.hint}</p>
        <Button onClick={onRetry} disabled={retrying} className="rounded-lg px-6">
          <RefreshCw className={`h-4 w-4 ${retrying ? "animate-spin" : ""}`} aria-hidden="true" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}
