"use client"

import { useState, useEffect } from "react"

interface TimeDisplayProps {
  className?: string
}

export function DynamicTimeDisplay({ className = "" }: TimeDisplayProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time as HH:MM:SS AM/PM
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })

  // Get hours for sun/moon position
  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const isDaytime = hours >= 6 && hours < 18

  // Calculate sun/moon position
  const calculatePosition = () => {
    let timeProgress

    if (isDaytime) {
      // Day time: 6am to 6pm
      timeProgress = hours - 6 + minutes / 60
      // Convert to percentage (0-100) where 0 is 6am and 100 is 6pm
      return (timeProgress / 12) * 100
    } else {
      // Night time: 6pm to 6am
      if (hours >= 18) {
        timeProgress = hours - 18 + minutes / 60
      } else {
        timeProgress = hours + 6 + minutes / 60
      }
      // Convert to percentage (0-100) where 0 is 6pm and 100 is 6am
      return (timeProgress / 12) * 100
    }
  }

  const celestialPosition = calculatePosition()

  // Determine sky color based on time
  const getSkyColor = () => {
    if (isDaytime) {
      if (hours < 8) {
        // Dawn: 6am-8am (dark blue to light blue)
        return "from-blue-900 via-blue-600 to-blue-400"
      } else if (hours < 16) {
        // Day: 8am-4pm (light blue)
        return "from-blue-500 via-blue-400 to-blue-300"
      } else {
        // Dusk: 4pm-6pm (orange/red)
        return "from-orange-500 via-red-400 to-purple-700"
      }
    } else {
      // Night: 6pm-6am (dark blue to black)
      return "from-blue-950 via-blue-950 to-black"
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-md h-8 w-32 flex items-center justify-center ${className}`}>
      {/* Black background */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Sky gradient overlay - subtle color at top that fades to transparent */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getSkyColor()} opacity-30`}></div>

      {/* Stars (only visible at night) */}
      {!isDaytime && (
        <div className="absolute inset-0">
          <div className="absolute h-0.5 w-0.5 rounded-full bg-white top-1 left-2 opacity-70"></div>
          <div className="absolute h-0.5 w-0.5 rounded-full bg-white top-2 left-5 opacity-90"></div>
          <div className="absolute h-0.5 w-0.5 rounded-full bg-white top-1.5 left-8 opacity-80"></div>
          <div className="absolute h-0.5 w-0.5 rounded-full bg-white top-3 left-3 opacity-60"></div>
          <div className="absolute h-0.5 w-0.5 rounded-full bg-white top-4 left-10 opacity-70"></div>
          <div className="absolute h-0.5 w-0.5 rounded-full bg-white top-1 left-14 opacity-90"></div>
          <div className="absolute h-0.5 w-0.5 rounded-full bg-white top-2.5 left-18 opacity-80"></div>
          <div className="absolute h-0.5 w-0.5 rounded-full bg-white top-1 left-20 opacity-70"></div>
          <div className="absolute h-0.5 w-0.5 rounded-full bg-white top-4 left-22 opacity-90"></div>
        </div>
      )}

      {/* Clouds (only visible during day) */}
      {isDaytime && (
        <div className="absolute inset-0">
          <div className="absolute h-1 w-4 rounded-full bg-white top-1.5 left-3 opacity-40"></div>
          <div className="absolute h-1 w-5 rounded-full bg-white top-2 left-14 opacity-30"></div>
          <div className="absolute h-1 w-3 rounded-full bg-white top-2.5 left-8 opacity-20"></div>
        </div>
      )}

      {/* Building silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex items-end">
        {/* Modern mall/shop buildings silhouette */}
        <div className="w-full flex items-end justify-center">
          <div className="h-2 w-2 bg-black border-t border-l border-r border-gray-700 rounded-t-sm"></div>
          <div className="h-1.5 w-3 bg-black border-t border-l border-r border-gray-700 rounded-t-sm"></div>
          <div className="h-2 w-2 bg-black border-t border-l border-r border-gray-700 rounded-t-sm"></div>
          <div className="h-1.5 w-3 bg-black border-t border-l border-r border-gray-700 rounded-t-sm"></div>
          <div className="h-1.5 w-2 bg-black border-t border-l border-r border-gray-700 rounded-t-sm"></div>
          <div className="h-2 w-3 bg-black border-t border-l border-r border-gray-700 rounded-t-sm"></div>
          <div className="h-1.5 w-2 bg-black border-t border-l border-r border-gray-700 rounded-t-sm"></div>
        </div>
      </div>

      {/* Sun/Moon */}
      <div
        className="absolute"
        style={{
          left: `${celestialPosition}%`,
          top: isDaytime
            ? `${Math.sin((celestialPosition / 100) * Math.PI) * 60 + 20}%`
            : `${Math.sin((celestialPosition / 100) * Math.PI) * 60 + 20}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {isDaytime ? (
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/50"></div>
        ) : (
          <div className="h-2 w-2 rounded-full bg-gray-200 shadow-lg shadow-gray-200/30"></div>
        )}
      </div>

      {/* Time display */}
      <div className="relative z-10 font-mono font-bold text-white text-shadow-md text-xs tracking-tight">
        {formattedTime}
      </div>
    </div>
  )
}
