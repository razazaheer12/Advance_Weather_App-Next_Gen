"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSettings } from "@/hooks/use-settings"
import { formatHourLabel, getHourlyForecast } from "@/lib/forecast"
import { toTemp } from "@/lib/units"
import type { ForecastData } from "@/lib/weather"

interface TemperatureChartProps {
  forecast: ForecastData
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { payload: { label: string; temp: number } }[] }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-popover text-popover-foreground rounded-md border px-2 py-1 text-xs shadow-sm">
      {payload[0].payload.label} · <span className="font-semibold">{payload[0].payload.temp}°</span>
    </div>
  )
}

export function TemperatureChart({ forecast }: TemperatureChartProps) {
  const timezone = forecast.city?.timezone ?? 0
  const { units } = useSettings()
  const data = getHourlyForecast(forecast, 8).map((hour, index) => ({
    label: index === 0 ? "Now" : formatHourLabel(hour.dt, timezone),
    temp: Math.round(toTemp(hour.temp, units)),
  }))

  return (
    <Card className="bg-card/90 border-border/50 shadow-sm backdrop-blur-sm">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-foreground text-base font-semibold">Temperature Trend</CardTitle>
        <CardDescription>Next 24 hours</CardDescription>
      </CardHeader>
      <CardContent className="text-primary h-36 w-full px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
            <defs>
              <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.25} />
                <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={1}
              tick={{ fontSize: 11, fill: "currentColor", opacity: 0.55 }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "currentColor", strokeOpacity: 0.25 }} />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="currentColor"
              strokeWidth={2}
              fill="url(#tempFill)"
              dot={false}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
