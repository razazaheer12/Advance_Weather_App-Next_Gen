"use client"

import type React from "react"
import { useEffect, useState, useMemo } from "react"
import type { WeatherData } from "@/lib/weather"

interface WeatherBackgroundProps {
  weather: WeatherData | null
  children: React.ReactNode
}

export function WeatherBackground({ weather, children }: WeatherBackgroundProps) {
  const [currentWeather, setCurrentWeather] = useState<string>("Clear")
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    if (weather) {
      setCurrentWeather(weather.weather[0]?.main || "Clear")

      // Determine if it's night time
      const now = Date.now() / 1000
      const isNightTime = now < weather.sunrise || now > weather.sunset
      setIsNight(isNightTime)
    }
  }, [weather])

  const getBackgroundClass = () => {
    const baseClass = "min-h-screen transition-all duration-1000 relative overflow-hidden"

    if (isNight) {
      switch (currentWeather) {
        case "Clear":
          return `${baseClass} bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900`
        case "Clouds":
          return `${baseClass} bg-gradient-to-br from-gray-800 via-gray-900 to-black`
        case "Rain":
        case "Drizzle":
          return `${baseClass} bg-gradient-to-br from-gray-900 via-blue-900 to-black`
        case "Thunderstorm":
          return `${baseClass} bg-gradient-to-br from-purple-900 via-gray-900 to-black`
        case "Snow":
          return `${baseClass} bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900`
        default:
          return `${baseClass} bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900`
      }
    }

    switch (currentWeather) {
      case "Clear":
        return `${baseClass} bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600`
      case "Clouds":
        return `${baseClass} bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600`
      case "Rain":
        return `${baseClass} bg-gradient-to-br from-gray-600 via-blue-700 to-gray-800`
      case "Drizzle":
        return `${baseClass} bg-gradient-to-br from-gray-500 via-blue-600 to-gray-700`
      case "Thunderstorm":
        return `${baseClass} bg-gradient-to-br from-gray-800 via-purple-800 to-black`
      case "Snow":
        return `${baseClass} bg-gradient-to-br from-blue-200 via-white to-gray-300`
      case "Mist":
      case "Fog":
        return `${baseClass} bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500`
      default:
        return `${baseClass} bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600`
    }
  }

  return (
    <div className={getBackgroundClass()}>
      {/* Animated Weather Effects */}
      <WeatherEffects weather={currentWeather} isNight={isNight} />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

interface WeatherEffectsProps {
  weather: string
  isNight: boolean
}

function WeatherEffects({ weather, isNight }: WeatherEffectsProps) {
  switch (weather) {
    case "Clear":
      return isNight ? <Stars /> : <SunRays />
    case "Rain":
      return <RainDrops />
    case "Drizzle":
      return <LightRain />
    case "Snow":
      return <Snowflakes />
    case "Thunderstorm":
      return (
        <>
          <RainDrops />
          <Lightning />
        </>
      )
    case "Clouds":
      return <FloatingClouds />
    default:
      return null
  }
}

function SunRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-yellow-300/30 animate-pulse" />
      <div
        className="absolute top-16 right-16 w-40 h-40 rounded-full bg-yellow-200/20 animate-ping"
        style={{ animationDuration: "3s" }}
      />
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute top-24 right-24 w-1 h-20 bg-yellow-300/40 origin-bottom animate-pulse"
          style={{
            transform: `rotate(${i * 45}deg)`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: "2s",
          }}
        />
      ))}
    </div>
  )
}

function Stars() {
  const starPositions = useMemo(
    () =>
      [...Array(50)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 60,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {starPositions.map((star, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function RainDrops() {
  const rainPositions = useMemo(
    () =>
      [...Array(100)].map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.5 + Math.random() * 0.5,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {rainPositions.map((drop, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-8 bg-blue-300/60 animate-rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function LightRain() {
  const lightRainPositions = useMemo(
    () =>
      [...Array(50)].map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 1 + Math.random() * 1,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lightRainPositions.map((drop, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-4 bg-blue-400/40 animate-rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function Snowflakes() {
  const snowPositions = useMemo(
    () =>
      [...Array(80)].map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowPositions.map((flake, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full animate-snow opacity-80"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function Lightning() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-white/10 animate-lightning" />
    </div>
  )
}

function FloatingClouds() {
  const cloudPositions = useMemo(
    () =>
      [...Array(5)].map((_, i) => ({
        width: 60 + Math.random() * 40,
        height: 30 + Math.random() * 20,
        left: Math.random() * 100,
        top: 10 + Math.random() * 30,
        delay: i * 0.5,
        duration: 8 + Math.random() * 4,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cloudPositions.map((cloud, i) => (
        <div
          key={i}
          className="absolute bg-white/20 rounded-full animate-float"
          style={{
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            animationDelay: `${cloud.delay}s`,
            animationDuration: `${cloud.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
