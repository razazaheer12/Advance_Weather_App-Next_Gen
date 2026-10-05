// Weather API service for OpenWeatherMap integration

const BASE_URL = "https://api.openweathermap.org/data/2.5"

export type WeatherErrorKind = "city_not_found" | "network" | "api"

export class WeatherError extends Error {
  readonly kind: WeatherErrorKind

  constructor(kind: WeatherErrorKind, message: string) {
    super(message)
    this.name = "WeatherError"
    this.kind = kind
  }
}

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  if (!key) {
    throw new WeatherError("api", "Weather API key is not configured.")
  }
  return key
}

export function getWeatherErrorCopy(error: unknown): { title: string; hint: string } {
  if (error instanceof WeatherError) {
    switch (error.kind) {
      case "city_not_found":
        return {
          title: "Couldn't find that city.",
          hint: "Try checking the spelling or search for another city.",
        }
      case "network":
        return {
          title: "Unable to update weather.",
          hint: "Check your connection and try again.",
        }
      case "api":
        return {
          title: "Weather data is temporarily unavailable.",
          hint: "Please try again in a moment.",
        }
    }
  }
  return {
    title: "Something went wrong.",
    hint: "Please try again.",
  }
}

async function fetchWeatherJson(url: string, notFoundMessage: string): Promise<{ data: any; cachedAt: number | null }> {
  let response: Response
  try {
    response = await fetch(url)
  } catch {
    throw new WeatherError("network", "Unable to update weather.")
  }

  if (response.status === 404) {
    throw new WeatherError("city_not_found", notFoundMessage)
  }

  if (!response.ok) {
    throw new WeatherError("api", "Weather data is temporarily unavailable.")
  }

  // The service worker stamps cached API responses so the UI can label them.
  const cachedAtHeader = response.headers.get("x-weatherflow-cached-at")
  const parsed = cachedAtHeader ? Number(cachedAtHeader) : null
  const cachedAt = parsed !== null && Number.isFinite(parsed) ? parsed : null

  const data = await response.json()
  return { data, cachedAt }
}

export interface WeatherData {
  name: string
  country: string
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  humidity: number
  pressure: number
  visibility: number
  wind_speed: number
  wind_deg: number
  weather: {
    main: string
    description: string
    icon: string
  }[]
  sunrise: number
  sunset: number
  timezone: number
  cachedAt?: number | null
}

export interface ForecastData {
  list: {
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      humidity: number
    }
    weather: {
      main: string
      description: string
      icon: string
    }[]
    wind: {
      speed: number
      deg: number
    }
    pop?: number
    dt_txt: string
  }[]
  city: {
    name: string
    country: string
    timezone: number
  }
  cachedAt?: number | null
}

function mapCurrentWeather(data: any): WeatherData {
  return {
    name: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    temp_min: Math.round(data.main.temp_min),
    temp_max: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    visibility: data.visibility,
    wind_speed: data.wind.speed,
    wind_deg: data.wind.deg,
    weather: data.weather,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
  }
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  const { data, cachedAt } = await fetchWeatherJson(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${getApiKey()}&units=metric`,
    `Weather data not found for ${city}`,
  )
  return { ...mapCurrentWeather(data), cachedAt }
}

export async function getWeatherForecast(city: string): Promise<ForecastData> {
  const { data, cachedAt } = await fetchWeatherJson(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${getApiKey()}&units=metric`,
    `Forecast data not found for ${city}`,
  )
  return { ...data, cachedAt }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const { data, cachedAt } = await fetchWeatherJson(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${getApiKey()}&units=metric`,
    "Weather data not found for your location",
  )
  return { ...mapCurrentWeather(data), cachedAt }
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export function formatTime(timestamp: number, timezone: number): string {
  const date = new Date((timestamp + timezone) * 1000)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })
}

export function getWeatherBackground(weatherMain: string): string {
  const weatherBackgrounds: Record<string, string> = {
    Clear: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
    Clouds: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
    Rain: "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800",
    Drizzle: "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700",
    Thunderstorm: "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
    Snow: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
    Mist: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
    Fog: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
  }

  return weatherBackgrounds[weatherMain] || "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
}
