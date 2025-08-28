"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const chartData = [
  { date: "2024-07-22", sessions: 45, sales: 12000 },
  { date: "2024-07-23", sessions: 52, sales: 15600 },
  { date: "2024-07-24", sessions: 38, sales: 9800 },
  { date: "2024-07-25", sessions: 67, sales: 18900 },
  { date: "2024-07-26", sessions: 73, sales: 21400 },
  { date: "2024-07-27", sessions: 61, sales: 17200 },
  { date: "2024-07-28", sessions: 89, sales: 25600 },
  { date: "2024-07-29", sessions: 95, sales: 28100 },
  { date: "2024-07-30", sessions: 78, sales: 22300 },
  { date: "2024-07-31", sessions: 102, sales: 31200 },
  { date: "2024-08-01", sessions: 87, sales: 24800 },
  { date: "2024-08-02", sessions: 94, sales: 27500 },
  { date: "2024-08-03", sessions: 156, sales: 45200 },
  { date: "2024-08-04", sessions: 142, sales: 41800 },
  { date: "2024-08-05", sessions: 178, sales: 52600 },
  { date: "2024-08-06", sessions: 165, sales: 48900 },
  { date: "2024-08-07", sessions: 189, sales: 56700 },
  { date: "2024-08-08", sessions: 203, sales: 61200 },
  { date: "2024-08-09", sessions: 234, sales: 71400 },
  { date: "2024-08-10", sessions: 267, sales: 82100 },
  { date: "2024-08-11", sessions: 298, sales: 93600 },
  { date: "2024-08-12", sessions: 345, sales: 108900 },
  { date: "2024-08-13", sessions: 389, sales: 124700 },
  { date: "2024-08-14", sessions: 423, sales: 138200 },
  { date: "2024-08-15", sessions: 456, sales: 151800 },
  { date: "2024-08-16", sessions: 512, sales: 172400 },
  { date: "2024-08-17", sessions: 578, sales: 195600 },
  { date: "2024-08-18", sessions: 634, sales: 218900 },
  { date: "2024-08-19", sessions: 689, sales: 241300 },
  { date: "2024-08-20", sessions: 742, sales: 263700 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  sessions: {
    label: "Sessions",
    color: "hsl(var(--chart-1))",
  },
  sales: {
    label: "Sales (NGN)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")
  const chartRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  React.useEffect(() => {
    console.log("[v0] Chart component mounted")
    console.log("[v0] Chart data length:", chartData.length)
    console.log("[v0] Chart config:", chartConfig)

    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect()
      console.log("[v0] Chart container dimensions:", {
        width: rect.width,
        height: rect.height,
        visible: rect.width > 0 && rect.height > 0,
      })
    }

    // Check if Recharts is available
    console.log("[v0] Recharts AreaChart available:", typeof AreaChart)
    console.log("[v0] ChartContainer available:", typeof ChartContainer)
  }, [])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-08-20")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  console.log("[v0] ChartAreaInteractive rendering, timeRange:", timeRange)
  console.log("[v0] Filtered data length:", filteredData.length)
  console.log("[v0] First data item:", filteredData[0])

  return (
    <Card className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <CardHeader className="relative pb-2">
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="@[767px]/card:hidden flex w-40" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-0 sm:px-6 pb-4">
        <div
          ref={chartRef}
          className="w-full h-[200px] border border-red-200"
          style={{ minHeight: "200px", backgroundColor: "#f9fafb" }}
        >
          <ChartContainer config={chartConfig} className="w-full h-full">
            <AreaChart
              data={filteredData}
              width={800}
              height={300}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <defs>
                <linearGradient id="fillSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    indicator="dot"
                    formatter={(value, name) => {
                      if (name === "sales") {
                        return [`₦${Number(value).toLocaleString()}`, "Sales"]
                      }
                      return [value, name === "sessions" ? "Sessions" : name]
                    }}
                  />
                }
              />
              <Area dataKey="sales" type="monotone" fill="url(#fillSales)" stroke="#06b6d4" strokeWidth={2} />
              <Area dataKey="sessions" type="monotone" fill="url(#fillSessions)" stroke="#3b82f6" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
