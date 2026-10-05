"use client"

import { useState, useEffect } from "react"
import { useWeather } from "@/hooks/use-weather"
import { useOnboarding } from "@/hooks/use-onboarding"
import { useFavorites } from "@/hooks/use-favorites"
import { useRecentSearches } from "@/hooks/use-recent-searches"
import { usePWA } from "@/hooks/use-pwa"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { SearchBar } from "@/components/search-bar"
import { EmptyState } from "@/components/empty-state"
import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { WeatherDashboard } from "@/components/weather-dashboard"
import { FavoritesBar } from "@/components/favorites-bar"
import { FavoritesList } from "@/components/favorites-list"
import { RecentSearches } from "@/components/recent-searches"
import { OfflineIndicator } from "@/components/offline-indicator"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { UpdateNotification } from "@/components/update-notification"
import { Logo, LogoMark } from "@/components/logo"

export default function WeatherApp() {
  const { status, completeOnboarding } = useOnboarding()
  const { currentWeather, forecast, loading, error, staleSince, fetchWeatherByCity } = useWeather()
  const { updateFavoriteWeather } = useFavorites()
  const { addRecent } = useRecentSearches()
  const { isInstallable, isInstalled, isOnline, updateAvailable, installApp, reloadToUpdate } = usePWA()
  const [searchQuery, setSearchQuery] = useState("")
  const [lastQuery, setLastQuery] = useState("")

  const handleSearch = (query: string) => {
    setLastQuery(query)
    fetchWeatherByCity(query)
  }

  const handleSelectCity = (cityName: string) => {
    setSearchQuery(cityName)
    handleSearch(cityName)
  }

  // Record successful searches and keep favorite snapshots fresh
  useEffect(() => {
    if (!currentWeather || loading) return
    addRecent({ name: currentWeather.name, country: currentWeather.country })
    updateFavoriteWeather(currentWeather)
  }, [currentWeather, loading, addRecent, updateFavoriteWeather])

  if (status === "loading") {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <LogoMark className="text-primary animate-fade-in h-16 w-16" />
      </div>
    )
  }

  if (status === "onboarding") {
    return <OnboardingScreen onComplete={completeOnboarding} />
  }

  const showError = Boolean(error) && !loading
  const showDashboard = Boolean(currentWeather) && !showError
  const showEmpty = !loading && !showError && !showDashboard

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-primary/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <OfflineIndicator isOnline={isOnline} staleSince={staleSince} />
        {!showEmpty && (
          <header className="animate-fade-in mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Logo className="justify-center md:justify-start" />
            <SearchBar
              value={searchQuery}
              onValueChange={setSearchQuery}
              onSubmit={handleSearch}
              loading={loading}
              className="w-full md:max-w-sm"
            />
          </header>
        )}

        <main>
          {loading && !currentWeather ? (
            <LoadingState />
          ) : showError ? (
            <ErrorState error={error} retrying={loading} onRetry={() => lastQuery && handleSearch(lastQuery)} />
          ) : showDashboard && currentWeather ? (
            <>
              <FavoritesBar
                onSelect={handleSelectCity}
                activeCityId={`${currentWeather.name}-${currentWeather.country}`}
              />
              <div
                key={`${currentWeather.name}-${currentWeather.country}`}
                className={`animate-fade-in transition-opacity duration-300 ${loading ? "opacity-60" : "opacity-100"}`}
              >
                <WeatherDashboard weather={currentWeather} forecast={forecast} />
              </div>
            </>
          ) : (
            <EmptyState className="pt-10 md:pt-20">
              <SearchBar
                size="lg"
                value={searchQuery}
                onValueChange={setSearchQuery}
                onSubmit={handleSearch}
                loading={loading}
              />
              <FavoritesList onSelect={handleSelectCity} />
              <RecentSearches onSelect={handleSelectCity} />
            </EmptyState>
          )}
        </main>
      </div>

      <PWAInstallPrompt isInstallable={isInstallable} isInstalled={isInstalled} onInstall={installApp} />
      <UpdateNotification visible={updateAvailable} onReload={reloadToUpdate} />
    </div>
  )
}
