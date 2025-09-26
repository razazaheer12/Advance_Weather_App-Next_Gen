"use client"

import { useState, useCallback } from "react"
import {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherByCoords,
  type WeatherData,
  type ForecastData,
} from "@/lib/weather"

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeatherByCity = useCallback(async (city: string) => {
    setLoading(true)
    setError(null)

    try {
      const [weatherData, forecastData] = await Promise.all([getCurrentWeather(city), getWeatherForecast(city)])

      setCurrentWeather(weatherData)
      setForecast(forecastData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
      setCurrentWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchWeatherByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const weatherData = await getWeatherByCoords(latitude, longitude)
          setCurrentWeather(weatherData)

          // Also fetch forecast for the detected city
          const forecastData = await getWeatherForecast(weatherData.name)
          setForecast(forecastData)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to fetch weather data")
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        setError("Unable to retrieve your location")
        setLoading(false)
      },
    )
  }, [])

  return {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByLocation,
  }
}
