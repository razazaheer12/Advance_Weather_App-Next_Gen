"use client"

import { useState } from "react"
import { Download, X, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePWA } from "@/hooks/use-pwa"

export function PWAInstallPrompt() {
  const { isInstallable, installApp } = usePWA()
  const [isDismissed, setIsDismissed] = useState(false)

  if (!isInstallable || isDismissed) {
    return null
  }

  const handleInstall = async () => {
    const success = await installApp()
    if (success) {
      setIsDismissed(true)
    }
  }

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white/95 backdrop-blur-sm border-white/30 shadow-xl z-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
            <Download className="h-5 w-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm mb-1">Install Weather App</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Add to your home screen for quick access and offline use
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Smartphone className="h-3 w-3" />
              <span>Works offline</span>
              <Monitor className="h-3 w-3 ml-2" />
              <span>Desktop & mobile</span>
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={handleInstall} className="flex-1 h-8 text-xs">
                Install
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-8 w-8 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
