"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Chart config type
export type ChartConfig = Record<string, {
  label?: string
  color?: string
}>

// Simple chart container component
export function ChartContainer({ 
  children, 
  className,
  config = {},
  ...props 
}: {
  children: React.ReactNode
  className?: string
  config?: ChartConfig
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      {children}
    </div>
  )
}

// Simple chart tooltip component
export function ChartTooltip({ 
  children,
  ...props 
}: {
  children?: React.ReactNode
} & any) {
  return <div {...props}>{children}</div>
}

// Simple chart tooltip content
export function ChartTooltipContent({
  active = false,
  payload = [],
  label,
  ...props
}: any) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      {label && <div className="font-medium">{label}</div>}
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="h-2 w-2 rounded-full" 
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm">{item.name}: {item.value}</span>
        </div>
      ))}
    </div>
  )
}

export { ChartContainer as default }