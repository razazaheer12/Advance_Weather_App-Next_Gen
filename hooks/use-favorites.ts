"use client"

import { useState, useCallback, useSyncExternalStore } from "react"
import { createPersistentStore } from "@/lib/storage"
import { getCurrentWeather, type WeatherData } from "@/lib/weather"

export interface FavoriteCity {
  id: string
  name: string
  country: string
  addedAt: number
  weather?: WeatherData
}

// Kept from the original implementation so existing users' favorites survive
const FAVORITES_STORAGE_KEY = "weather-app-favorites"

const store = createPersistentStore<FavoriteCity[]>(FAVORITES_STORAGE_KEY, [])

export function makeFavoriteId(name: string, country: string): string {
  return `${name}-${country}`
}

export function useFavorites() {
  const favorites = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)
  const [loading, setLoading] = useState(false)

  const addFavorite = useCallback((weather: WeatherData) => {
    store.set((prev) => {
      const id = makeFavoriteId(weather.name, weather.country)
      if (prev.some((fav) => fav.id === id)) return prev
      return [
        ...prev,
        {
          id,
          name: weather.name,
          country: weather.country,
          addedAt: Date.now(),
          weather,
        },
      ]
    })
  }, [])

  const removeFavorite = useCallback((cityId: string) => {
    store.set((prev) => prev.filter((fav) => fav.id !== cityId))
  }, [])

  const toggleFavorite = useCallback((weather: WeatherData) => {
    store.set((prev) => {
      const id = makeFavoriteId(weather.name, weather.country)
      if (prev.some((fav) => fav.id === id)) {
        return prev.filter((fav) => fav.id !== id)
      }
      return [
        ...prev,
        {
          id,
          name: weather.name,
          country: weather.country,
          addedAt: Date.now(),
          weather,
        },
      ]
    })
  }, [])

  const isFavorite = useCallback(
    (weather: WeatherData) => favorites.some((fav) => fav.id === makeFavoriteId(weather.name, weather.country)),
    [favorites],
  )

  // Refresh the stored snapshot for a city (called after a successful fetch)
  const updateFavoriteWeather = useCallback((weather: WeatherData) => {
    store.set((prev) => {
      const id = makeFavoriteId(weather.name, weather.country)
      if (!prev.some((fav) => fav.id === id)) return prev
      return prev.map((fav) => (fav.id === id ? { ...fav, weather } : fav))
    })
  }, [])

  // Re-fetch current conditions for every favorite
  const refreshAll = useCallback(async () => {
    const current = store.getSnapshot()
    if (current.length === 0) return

    setLoading(true)
    try {
      const updated = await Promise.all(
        current.map(async (favorite) => {
          try {
            return { ...favorite, weather: await getCurrentWeather(favorite.name) }
          } catch {
            return favorite // Keep existing snapshot if a refresh fails
          }
        }),
      )
      store.set(updated)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    updateFavoriteWeather,
    refreshAll,
  }
}
