"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ForecastData, getWeatherIconUrl } from "@/lib/weather"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ForecastCarouselProps {
  forecast: ForecastData
}

export function ForecastCarousel({ forecast }: ForecastCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const itemsToShow = 6
  const maxIndex = Math.max(0, forecast.list.length - itemsToShow)

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0))
  }

  const visibleItems = forecast.list.slice(startIndex, startIndex + itemsToShow)

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Hourly Forecast</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={prevSlide} disabled={startIndex === 0} className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              disabled={startIndex >= maxIndex}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              className="text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                })}
              </div>
              <img
                src={getWeatherIconUrl(item.weather[0]?.icon) || "/placeholder.svg"}
                alt={item.weather[0]?.description}
                className="w-12 h-12 mx-auto mb-2"
              />
              <div className="font-bold text-sm text-primary mb-1">{Math.round(item.main.temp)}°</div>
              <div className="text-xs text-muted-foreground">{Math.round(item.main.humidity)}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
