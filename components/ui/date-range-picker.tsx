"use client"

import * as React from "react"
import { format, subDays, addMonths } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
}

export function DateRangePicker({ date, onDateChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [leftMonth, setLeftMonth] = React.useState<Date>(date?.from || new Date())

  // Ensure right month is always the next month after left
  const rightMonth = React.useMemo(() => {
    return addMonths(leftMonth, 1)
  }, [leftMonth])

  // Custom handler to ensure a date is always selected
  const handleDateSelect = (newRange: DateRange | undefined) => {
    // If trying to clear selection, keep the previous selection
    if (!newRange || (!newRange.from && !newRange.to)) {
      return
    }

    // If only selecting a single date, make it both from and to
    if (newRange.from && !newRange.to) {
      newRange.to = newRange.from
    }

    onDateChange(newRange)
  }

  const presets = [
    {
      name: "Custom",
      isSelected: true,
    },
    {
      name: "Today",
      getValue: () => {
        const today = new Date()
        return {
          from: today,
          to: today,
        }
      },
    },
    {
      name: "Yesterday",
      getValue: () => {
        const yesterday = subDays(new Date(), 1)
        return {
          from: yesterday,
          to: yesterday,
        }
      },
    },
    {
      name: "Last 7 days",
      getValue: () => ({
        from: subDays(new Date(), 6),
        to: new Date(),
      }),
    },
    {
      name: "Last 30 days",
      getValue: () => ({
        from: subDays(new Date(), 29),
        to: new Date(),
      }),
    },
    {
      name: "Last 90 days",
      getValue: () => ({
        from: subDays(new Date(), 89),
        to: new Date(),
      }),
    },
    {
      name: "Week to date",
      getValue: () => {
        const today = new Date()
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay())
        return {
          from: startOfWeek,
          to: today,
        }
      },
    },
    {
      name: "Month to date",
      getValue: () => {
        const today = new Date()
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        return {
          from: startOfMonth,
          to: today,
        }
      },
    },
  ]

  const handlePresetClick = (preset: (typeof presets)[0]) => {
    if (preset.getValue) {
      const newRange = preset.getValue()
      onDateChange(newRange)
      // Update the left month when selecting a preset
      if (newRange.from) {
        setLeftMonth(newRange.from)
      }
    }
  }

  // Update left month when date changes externally
  React.useEffect(() => {
    if (date?.from) {
      setLeftMonth(date.from)
    }
  }, [date?.from])

  const getDisplayText = () => {
    if (!date?.from) return <span>Pick a date range</span>

    // Check if the current selection matches any preset
    if (date.from && date.to) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const yesterday = subDays(today, 1)

      // Check for Today preset
      if (
        date.from.getDate() === today.getDate() &&
        date.from.getMonth() === today.getMonth() &&
        date.from.getFullYear() === today.getFullYear() &&
        date.to.getDate() === today.getDate() &&
        date.to.getMonth() === today.getMonth() &&
        date.to.getFullYear() === today.getFullYear()
      ) {
        return "Today"
      }

      // Check for Yesterday preset
      if (
        date.from.getDate() === yesterday.getDate() &&
        date.from.getMonth() === yesterday.getMonth() &&
        date.from.getFullYear() === yesterday.getFullYear() &&
        date.to.getDate() === yesterday.getDate() &&
        date.to.getMonth() === yesterday.getMonth() &&
        date.to.getFullYear() === yesterday.getFullYear()
      ) {
        return "Yesterday"
      }

      // Check for Last 7 days
      const last7Days = subDays(today, 6)
      if (
        date.from.getDate() === last7Days.getDate() &&
        date.from.getMonth() === last7Days.getMonth() &&
        date.from.getFullYear() === last7Days.getFullYear() &&
        date.to.getDate() === today.getDate() &&
        date.to.getMonth() === today.getMonth() &&
        date.to.getFullYear() === today.getFullYear()
      ) {
        return "Last 7 days"
      }

      // Default to date range format
      return (
        <>
          {format(date.from, "MMM d")}–{format(date.to, "MMM d, yyyy")}
        </>
      )
    }

    return format(date.from, "MMM d, yyyy")
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal bg-white border-gray-200 text-sm px-3 py-1.5 h-auto",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-3.5 w-3.5 text-gray-500" />
            {getDisplayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <div className="border-r p-2 space-y-2 w-[160px] max-h-[350px] overflow-y-auto">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  variant={preset.isSelected ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal text-sm",
                    preset.isSelected && "bg-indigo-50 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-600",
                  )}
                  onClick={() => preset.getValue && handlePresetClick(preset)}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
            <div className="p-2">
              <div className="flex gap-2 mb-2">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md text-sm"
                    value={date?.from ? format(date.from, "MMMM d, yyyy") : ""}
                    readOnly
                  />
                </div>
                <div className="flex items-center">→</div>
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md text-sm"
                    value={date?.to ? format(date.to, "MMMM d, yyyy") : ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex gap-4">
                {/* Left Calendar */}
                <div className="flex flex-col">
                  <DayPicker
                    mode="range"
                    defaultMonth={leftMonth}
                    month={leftMonth}
                    onMonthChange={setLeftMonth}
                    selected={date}
                    onSelect={handleDateSelect}
                    numberOfMonths={1}
                    className="border-none"
                    showOutsideDays={false}
                    modifiersClassNames={{
                      selected: "bg-indigo-600 text-white",
                      range_start: "rounded-l-md",
                      range_end: "rounded-r-md",
                      range_middle: "bg-indigo-50",
                    }}
                    captionLayout="dropdown-buttons"
                  />
                </div>
                {/* Right Calendar */}
                <div className="flex flex-col">
                  <DayPicker
                    mode="range"
                    defaultMonth={rightMonth}
                    month={rightMonth}
                    onMonthChange={(month) => setLeftMonth(addMonths(month, -1))}
                    selected={date}
                    onSelect={handleDateSelect}
                    numberOfMonths={1}
                    className="border-none"
                    showOutsideDays={false}
                    modifiersClassNames={{
                      selected: "bg-indigo-600 text-white",
                      range_start: "rounded-l-md",
                      range_end: "rounded-r-md",
                      range_middle: "bg-indigo-50",
                    }}
                    captionLayout="dropdown-buttons"
                  />
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
