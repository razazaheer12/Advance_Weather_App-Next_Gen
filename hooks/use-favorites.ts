"use client"

import { useState, useEffect, useCallback } from "react"
import { getCurrentWeather, type WeatherData } from "@/lib/weather"

export interface FavoriteCity {
  id: string
  name: string
  country: string
  addedAt: number
  weather?: WeatherData
}

const FAVORITES_STORAGE_KEY = "weather-app-favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([])
  const [loading, setLoading] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (stored) {
        const parsedFavorites = JSON.parse(stored)
        setFavorites(parsedFavorites)
      }
    } catch (error) {
      console.error("Error loading favorites:", error)
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error("Error saving favorites:", error)
    }
  }, [favorites])

  // Add a city to favorites
  const addFavorite = useCallback((weather: WeatherData) => {
    const cityId = `${weather.name}-${weather.country}`

    setFavorites((prev) => {
      // Check if already exists
      if (prev.some((fav) => fav.id === cityId)) {
        return prev
      }

      const newFavorite: FavoriteCity = {
        id: cityId,
        name: weather.name,
        country: weather.country,
        addedAt: Date.now(),
        weather: weather,
      }

      return [...prev, newFavorite]
    })
  }, [])

  // Remove a city from favorites
  const removeFavorite = useCallback((cityId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== cityId))
  }, [])

  // Check if a city is favorited
  const isFavorite = useCallback(
    (weather: WeatherData) => {
      const cityId = `${weather.name}-${weather.country}`
      return favorites.some((fav) => fav.id === cityId)
    },
    [favorites],
  )

  // Update weather data for all favorites
  const updateFavoritesWeather = useCallback(async () => {
    if (favorites.length === 0) return

    setLoading(true)

    try {
      const updatedFavorites = await Promise.all(
        favorites.map(async (favorite) => {
          try {
            const weather = await getCurrentWeather(favorite.name)
            return { ...favorite, weather }
          } catch (error) {
            console.error(`Error updating weather for ${favorite.name}:`, error)
            return favorite // Keep existing data if update fails
          }
        }),
      )

      setFavorites(updatedFavorites)
    } catch (error) {
      console.error("Error updating favorites weather:", error)
    } finally {
      setLoading(false)
    }
  }, [favorites])

  // Get favorite by city name
  const getFavoriteByName = useCallback(
    (cityName: string) => {
      return favorites.find((fav) => fav.name.toLowerCase() === cityName.toLowerCase())
    },
    [favorites],
  )

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    updateFavoritesWeather,
    getFavoriteByName,
  }
}
