"use client"

import { WifiOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">
            <WifiOff className="h-8 w-8 text-gray-600" />
          </div>
          <CardTitle className="text-xl">You're Offline</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            No internet connection detected. Some features may be limited, but you can still view your cached weather
            data.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-medium">Available offline:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Last viewed weather data</li>
              <li>• Favorite cities</li>
              <li>• Cached forecasts</li>
            </ul>
          </div>

          <Button onClick={handleRefresh} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
