"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ForecastData } from "@/lib/weather"

interface TemperatureChartProps {
  forecastData: ForecastData
}

export function TemperatureChart({ forecastData }: TemperatureChartProps) {
  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return (
      <Card className="w-full bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Temperature Trend</CardTitle>
          <CardDescription>24-hour temperature forecast</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <p className="text-muted-foreground">No forecast data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const chartData = forecastData.list.slice(0, 8).map((item) => {
    const date = new Date(item.dt * 1000)
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
    })
    const day = date.getDate()

    return {
      time: `${day}/${time}h`,
      fullTime: date.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      temperature: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      humidity: item.main.humidity,
    }
  })

  return (
    <Card className="w-full bg-white/95 backdrop-blur-sm border-white/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Temperature Trend</CardTitle>
        <CardDescription>24-hour temperature forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6b7280" }}
                label={{ value: "°C", angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelFormatter={(value, payload) => {
                  const item = payload?.[0]?.payload
                  return item ? `Time: ${item.fullTime}` : `Time: ${value}`
                }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 6, fill: "#3b82f6" }}
                name="Temperature (°C)"
              />
              <Line
                type="monotone"
                dataKey="feelsLike"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3, fill: "#f59e0b" }}
                activeDot={{ r: 5, fill: "#f59e0b" }}
                name="Feels Like (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
