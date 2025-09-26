// Weather API service for OpenWeatherMap integration

const API_KEY = "ec53262774f7fafbb7a1b1531ac01d6d"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

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
    dt_txt: string
  }[]
  city: {
    name: string
    country: string
    timezone: number
  }
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

    if (!response.ok) {
      throw new Error(`Weather data not found for ${city}`)
    }

    const data = await response.json()

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
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

export async function getWeatherForecast(city: string): Promise<ForecastData> {
  try {
    const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

    if (!response.ok) {
      throw new Error(`Forecast data not found for ${city}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    throw error
  }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

    if (!response.ok) {
      throw new Error("Weather data not found for coordinates")
    }

    const data = await response.json()

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
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error)
    throw error
  }
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
