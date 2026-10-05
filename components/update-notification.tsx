"use client"

import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UpdateNotificationProps {
  visible: boolean
  onReload: () => void
}

export function UpdateNotification({ visible, onReload }: UpdateNotificationProps) {
  if (!visible) {
    return null
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2"
    >
      <div className="animate-fade-in-up bg-card/95 border-border/60 flex items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur">
        <RefreshCw className="text-primary h-4 w-4 shrink-0" />
        <p className="text-foreground flex-1 text-sm">A new version of WeatherFlow is ready.</p>
        <Button size="sm" onClick={onReload}>
          Reload
        </Button>
      </div>
    </div>
  )
}
