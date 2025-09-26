"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { Loader2, MapPin, Droplets, Wind, Eye, Thermometer } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCurrentWeather, getWeatherForecast, type WeatherData, type ForecastData } from "@/lib/weather"

export default function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchWeatherByCity = useCallback(async (city: string) => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const [weatherData, forecast] = await Promise.all([getCurrentWeather(city), getWeatherForecast(city)])
      setCurrentWeather(weatherData)
      setForecastData(forecast)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
      setCurrentWeather(null)
      setForecastData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWeatherByCity("London")
  }, [fetchWeatherByCity])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      fetchWeatherByCity(searchQuery.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-primary/10">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
            Weather<span className="text-primary">Flow</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium">Your modern weather companion</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for any city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-6 pr-32 text-lg bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-lg focus:shadow-xl transition-all duration-300"
            />
            <Button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="text-muted-foreground text-lg mt-6 font-medium">Fetching weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="max-w-md mx-auto bg-card/90 backdrop-blur-sm border-destructive/20 shadow-xl">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-destructive" />
              </div>
              <p className="text-destructive font-semibold mb-2">Unable to fetch weather data</p>
              <p className="text-muted-foreground text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {currentWeather && !loading && (
          <div className="max-w-6xl mx-auto">
            {/* Main Weather Card */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-2xl rounded-2xl mb-8 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      {currentWeather.name}, {currentWeather.country}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Today</div>
                    <div className="text-sm font-medium text-foreground">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-center md:text-left">
                    <div className="text-6xl font-bold text-primary mb-2">{Math.round(currentWeather.temp)}°</div>
                    <p className="text-xl text-muted-foreground capitalize font-medium mb-4">
                      {currentWeather.weather[0]?.description}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Thermometer className="h-4 w-4" />
                      <span>Feels like {Math.round(currentWeather.feels_like)}°C</span>
                    </div>
                  </div>

                  {/* Weather Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <Droplets className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{currentWeather.humidity}%</div>
                      <div className="text-sm text-muted-foreground">Humidity</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <Wind className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">
                        {Math.round(currentWeather.wind_speed || 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Wind km/h</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <Eye className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">
                        {Math.round(currentWeather.visibility || 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Visibility km</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <Thermometer className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">
                        {Math.round(currentWeather.pressure || 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Pressure hPa</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            {forecastData && (
              <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-xl rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">5-Day Forecast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {forecastData.list
                      .filter((_, index) => index % 8 === 0)
                      .slice(0, 5)
                      .map((day, index) => (
                        <div
                          key={index}
                          className="text-center p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-200"
                        >
                          <div className="text-sm font-medium text-muted-foreground mb-2">
                            {index === 0
                              ? "Today"
                              : new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
                          </div>
                          <div className="text-2xl font-bold text-primary mb-1">{Math.round(day.main.temp)}°</div>
                          <div className="text-xs text-muted-foreground capitalize">{day.weather[0]?.description}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
