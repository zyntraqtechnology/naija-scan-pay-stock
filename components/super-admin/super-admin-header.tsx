"use client"

import type React from "react"

import { Search, Bell, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SuperAdminHeaderProps {
  onOpenSettings?: () => void
}

export function SuperAdminHeader({ onOpenSettings }: SuperAdminHeaderProps) {
  const { user, logout } = useAuth()
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      setShowCommandPalette(true)
    }
  }

  return (
    <>
      <header className="bg-[#1a1a1a] border-b border-[#404040] px-6 py-0 h-14 flex items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between w-full">
          {/* Left side - Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <img src="https://zyntraqtech.com/wp-content/uploads/2025/04/OranjPay-White-1.png" alt="OranjPay" className="h-6 w-auto" />
              <span className="bg-white text-black px-2 py-1 rounded text-xs font-medium">Super Admin</span>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 flex justify-center px-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-10 pr-20 w-full h-8 bg-[#404040] border-[#525252] text-white text-sm placeholder-[#9ca3af] focus:bg-[#454545] focus:border-[#6b7280] rounded-md cursor-pointer"
                onClick={() => setShowCommandPalette(true)}
                onKeyDown={handleKeyDown}
                readOnly
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] text-[#9ca3af] bg-[#525252] rounded font-medium">CTRL</kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] text-[#9ca3af] bg-[#525252] rounded font-medium">K</kbd>
              </div>
            </div>
          </div>

          {/* Right side - Notifications and User */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-[#d1d5db] hover:text-white hover:bg-[#404040] rounded-md"
            >
              <Bell className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-[#d1d5db] hover:text-white hover:bg-[#404040] rounded-md"
              onClick={onOpenSettings}
            >
              <Settings className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-8 px-3 text-white hover:bg-[#404040] rounded-md"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#06b6d4] text-white text-xs font-medium">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-[#e5e7eb] shadow-lg rounded-lg">
                <DropdownMenuItem className="text-[#374151] hover:bg-[#f9fafb]">Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-[#374151] hover:bg-[#f9fafb]">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#e5e7eb]" />
                <DropdownMenuItem onClick={logout} className="text-[#dc2626] hover:bg-[#fef2f2]">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {showCommandPalette && (
        <CommandPalette isOpen={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
      )}
    </>
  )
}

function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  const menuItems = [
    { title: "Dashboard", path: "/super-admin/dashboard", category: "Main" },
    { title: "All Merchants", path: "/super-admin/merchants", category: "Business Management" },
    { title: "Admins", path: "/super-admin/users-roles/admins", category: "Users & Roles" },
    { title: "Cashiers", path: "/super-admin/users-roles/cashiers", category: "Users & Roles" },
    { title: "All Orders", path: "/super-admin/orders", category: "Payments & Orders" },
    { title: "Pending Orders", path: "/super-admin/orders/pending", category: "Payments & Orders" },
    { title: "Completed Orders", path: "/super-admin/orders/completed", category: "Payments & Orders" },
    { title: "Products", path: "/super-admin/products", category: "Business Management" },
    { title: "Customers", path: "/super-admin/customers", category: "Business Management" },
    { title: "Inventory", path: "/super-admin/inventory", category: "Business Management" },
    { title: "Settings", path: "#", category: "Settings", action: "openSettings" },
  ]

  const filteredItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleItemClick = (item: any) => {
    if (item.action === "openSettings") {
      onClose()
    } else {
      window.location.href = item.path
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
      <div className="fixed top-[20%] left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-white rounded-lg shadow-xl border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search menus, pages, and content..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              onClick={() => handleItemClick(item)}
            >
              <div className="font-medium text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-500">{item.category}</div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">No results found for "{searchQuery}"</div>
          )}
        </div>
        <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 flex justify-between">
          <span>Press Enter to navigate</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  )
}
