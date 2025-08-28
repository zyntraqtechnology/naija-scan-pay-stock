"use client"

import * as React from "react"
import { Search, Calendar, SmilePlus, Calculator, User, CreditCard, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function CommandSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const isMac = typeof navigator !== "undefined" ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm text-gray-700 w-full border shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:ring-opacity-50"
      >
        <div className="flex items-center">
          <Search className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-gray-500">Search dashboard...</span>
        </div>
        <div className="flex items-center text-xs text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">
          <span>{isMac ? "⌘" : "CTRL"}</span>
          <span className="ml-1">K</span>
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen} className="rounded-xl shadow-xl border border-gray-200">
        <CommandInput placeholder="Search dashboard..." className="h-12" />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/dashboard"))}>
              <User className="mr-2 h-5 w-5" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/orders"))}>
              <CreditCard className="mr-2 h-5 w-5" />
              <span>Orders</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/products"))}>
              <Settings className="mr-2 h-5 w-5" />
              <span>Products</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tools">
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/calendar"))}>
              <Calendar className="mr-2 h-5 w-5" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Search Emoji"))}>
              <SmilePlus className="mr-2 h-5 w-5" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Calculator"))}>
              <Calculator className="mr-2 h-5 w-5" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
