"use client"

import { useEffect, useState } from "react"
import { Download, Monitor, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { readJSON, writeJSON } from "@/lib/storage"

const DISMISS_KEY = "weatherflow:install-dismissed-at"
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000

interface PWAInstallPromptProps {
  isInstallable: boolean
  isInstalled: boolean
  onInstall: () => Promise<boolean>
}

export function PWAInstallPrompt({ isInstallable, isInstalled, onInstall }: PWAInstallPromptProps) {
  // Start hidden so a previous dismissal never flashes before storage is read.
  const [dismissed, setDismissed] = useState(true)
  const [installing, setInstalling] = useState(false)

  useEffect(() => {
    const dismissedAt = readJSON<number | null>(DISMISS_KEY, null)
    setDismissed(dismissedAt !== null && Date.now() - dismissedAt < DISMISS_COOLDOWN_MS)
  }, [])

  if (!isInstallable || isInstalled || dismissed || installing) {
    return null
  }

  const handleInstall = async () => {
    setInstalling(true)
    await onInstall()
    setInstalling(false)
  }

  const handleDismiss = () => {
    writeJSON(DISMISS_KEY, Date.now())
    setDismissed(true)
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:w-96 bg-card/95 backdrop-blur border-border/60 shadow-2xl">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 shrink-0 rounded-lg p-2">
            <Download className="text-primary h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="mb-1 text-sm font-semibold">Install WeatherFlow</h3>
            <p className="text-muted-foreground mb-3 text-xs">
              Keep WeatherFlow on your device for one-tap access and offline weather.
            </p>

            <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs">
              <Smartphone className="h-3 w-3" />
              <span>Works offline</span>
              <Monitor className="ml-2 h-3 w-3" />
              <span>Desktop & mobile</span>
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={handleInstall} className="h-8 flex-1 text-xs">
                Install
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-8 text-xs">
                Not now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
