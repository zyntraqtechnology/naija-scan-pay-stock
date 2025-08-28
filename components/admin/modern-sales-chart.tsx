"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Download, Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Enhanced mock data with comparison data
const data = [
  { name: "Jan", sales: 4000, lastPeriod: 3200 },
  { name: "Feb", sales: 3000, lastPeriod: 3500 },
  { name: "Mar", sales: 5000, lastPeriod: 4200 },
  { name: "Apr", sales: 4000, lastPeriod: 3800 },
  { name: "May", sales: 7000, lastPeriod: 5500 },
  { name: "Jun", sales: 6000, lastPeriod: 5800 },
  { name: "Jul", sales: 8000, lastPeriod: 6500 },
  { name: "Aug", sales: 9000, lastPeriod: 7200 },
  { name: "Sep", sales: 8500, lastPeriod: 7800 },
  { name: "Oct", sales: 10000, lastPeriod: 8500 },
  { name: "Nov", sales: 11000, lastPeriod: 9200 },
  { name: "Dec", sales: 12500, lastPeriod: 10000 },
]

export function ModernSalesChart() {
  const [showComparison, setShowComparison] = useState(true)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-700">Sales Overview</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <Info size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 px-2 border-gray-200"
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? "Hide" : "Show"} Comparison
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-7 px-2 border-gray-200">
            <Download size={14} className="mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-[260px]" style={{ width: "100%", height: "calc(100% - 40px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => formatCurrency(value).replace("NGN", "₦")}
              width={80}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-3 shadow-lg border border-gray-100">
                      <div className="text-sm font-medium mb-1">{payload[0].payload.name}</div>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                          <span className="text-sm">This Period:</span>
                          <span className="text-sm font-medium">{formatCurrency(payload[0].value as number)}</span>
                        </div>
                        {showComparison && (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            <span className="text-sm">Last Period:</span>
                            <span className="text-sm font-medium">{formatCurrency(payload[1]?.value as number)}</span>
                          </div>
                        )}
                        {showComparison && (
                          <div className="flex items-center gap-2 mt-1 pt-1 border-t border-gray-100">
                            <span className="text-sm">Change:</span>
                            <span
                              className={`text-sm font-medium ${
                                (payload[0].value as number) > (payload[1]?.value as number)
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {(
                                (((payload[0].value as number) - (payload[1]?.value as number)) /
                                  (payload[1]?.value as number)) *
                                100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Legend
              content={() => (
                <div className="flex justify-center items-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-xs text-gray-600">This Period</span>
                  </div>
                  {showComparison && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-gray-600">Last Period</span>
                    </div>
                  )}
                </div>
              )}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            {showComparison && (
              <Line
                type="monotone"
                dataKey="lastPeriod"
                stroke="#d1d5db"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
