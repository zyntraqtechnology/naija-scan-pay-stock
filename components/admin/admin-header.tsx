"use client"
import { Bell, Search } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import Image from "next/image"
import { CommandSearch } from "./command-search"

interface AdminHeaderProps {
  title?: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const { toggleSidebar, isCollapsed } = useSidebar()

  return (
    <header className="sticky top-0 z-30 border-b bg-[#f1f1f1]">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={toggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
          >
            <Image
              src={
                isCollapsed
                  ? "https://zyntraqtech.com/wp-content/uploads/2025/04/sidebar-open.svg"
                  : "https://zyntraqtech.com/wp-content/uploads/2025/04/sidebar-close.svg"
              }
              alt="Toggle sidebar"
              width={24}
              height={24}
              className="h-5 w-5 text-[#635BFF]"
            />
            <span className="sr-only">Toggle sidebar</span>
          </button>

          {(title || description) && (
            <div className="mr-4 max-w-[200px] md:max-w-[300px]">
              {title && <h1 className="text-xl font-semibold truncate">{title}</h1>}
              {description && <p className="text-sm text-muted-foreground truncate">{description}</p>}
            </div>
          )}

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md">
              <CommandSearch />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button
              onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </button>
          </div>
          <div className="relative">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              <span className="sr-only">Notifications</span>
            </button>
          </div>

          <div className="h-8 w-8 rounded-full bg-[#635BFF] flex items-center justify-center text-white font-medium">
            {title && title.length > 0 ? title.charAt(0) : "U"}
          </div>
        </div>
      </div>
    </header>
  )
}
