"use client"

import { History, WifiOff } from "lucide-react"

interface OfflineIndicatorProps {
  isOnline: boolean
  staleSince: number | null
}

function formatStaleTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function OfflineIndicator({ isOnline, staleSince }: OfflineIndicatorProps) {
  if (isOnline && staleSince === null) {
    return null
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-in mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3"
    >
      <div className="flex items-start gap-3">
        <WifiOff className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="text-sm">
          <p className="font-medium text-foreground">
            {isOnline ? "Couldn't refresh just now" : "You're offline"}
          </p>
          {staleSince !== null ? (
            <p className="mt-0.5 flex items-center gap-1.5 text-muted-foreground">
              <History className="h-3.5 w-3.5 shrink-0" />
              Showing last updated weather · {formatStaleTime(staleSince)}
            </p>
          ) : (
            <p className="mt-0.5 text-muted-foreground">
              Search and refresh are unavailable until you reconnect.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
