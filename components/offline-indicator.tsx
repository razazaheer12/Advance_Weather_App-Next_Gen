"use client"

import { WifiOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { usePWA } from "@/hooks/use-pwa"

export function OfflineIndicator() {
  const { isOnline } = usePWA()

  if (isOnline) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <Badge variant="destructive" className="bg-red-500/90 backdrop-blur-sm text-white border-red-400/30">
        <WifiOff className="h-3 w-3 mr-1" />
        Offline Mode
      </Badge>
    </div>
  )
}
