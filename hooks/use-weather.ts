"use client"

import { useState, useCallback, useRef } from "react"
import {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherByCoords,
  WeatherError,
  type WeatherData,
  type ForecastData,
} from "@/lib/weather"
import { cityCacheKey, coordsCacheKey, readWeatherCache, writeWeatherCache } from "@/lib/weather-cache"

function isNetworkError(error: unknown): boolean {
  return error instanceof WeatherError && error.kind === "network"
}

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [staleSince, setStaleSince] = useState<number | null>(null)
  const requestIdRef = useRef(0)

  const commitSuccess = (
    requestId: number,
    weather: WeatherData,
    forecastData: ForecastData | null,
    cacheKey: string,
  ) => {
    if (requestId !== requestIdRef.current) return
    setCurrentWeather(weather)
    setForecast(forecastData)
    const cachedAt = weather.cachedAt ?? forecastData?.cachedAt ?? null
    if (cachedAt !== null) {
      // Served from the service worker cache: keep the original timestamp.
      setStaleSince(cachedAt)
    } else {
      setStaleSince(null)
      writeWeatherCache(cacheKey, weather, forecastData)
    }
  }

  const commitFailure = (requestId: number, err: unknown, cacheKey: string) => {
    if (requestId !== requestIdRef.current) return
    if (isNetworkError(err)) {
      const entry = readWeatherCache(cacheKey)
      if (entry) {
        setCurrentWeather(entry.weather)
        setForecast(entry.forecast)
        setStaleSince(entry.savedAt)
        setError(null)
        return
      }
    }
    setError(err)
    setCurrentWeather(null)
    setForecast(null)
    setStaleSince(null)
  }

  const fetchWeatherByCity = useCallback(async (city: string) => {
    const requestId = ++requestIdRef.current
    const cacheKey = cityCacheKey(city)
    setLoading(true)
    setError(null)

    try {
      const [weatherData, forecastData] = await Promise.all([getCurrentWeather(city), getWeatherForecast(city)])
      commitSuccess(requestId, weatherData, forecastData, cacheKey)
    } catch (err) {
      commitFailure(requestId, err, cacheKey)
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false)
      }
    }
  }, [])

  const fetchWeatherByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError(new Error("Geolocation is not supported by this browser"))
      return
    }

    const requestId = ++requestIdRef.current
    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const cacheKey = coordsCacheKey(latitude, longitude)
        try {
          const weatherData = await getWeatherByCoords(latitude, longitude)

          // Also fetch forecast for the detected city
          const forecastData = await getWeatherForecast(weatherData.name)

          commitSuccess(requestId, weatherData, forecastData, cacheKey)
        } catch (err) {
          commitFailure(requestId, err, cacheKey)
        } finally {
          if (requestId === requestIdRef.current) {
            setLoading(false)
          }
        }
      },
      () => {
        if (requestId !== requestIdRef.current) return
        setError(new Error("Unable to retrieve your location"))
        setLoading(false)
      },
    )
  }, [])

  return {
    currentWeather,
    forecast,
    loading,
    error,
    staleSince,
    fetchWeatherByCity,
    fetchWeatherByLocation,
  }
}
