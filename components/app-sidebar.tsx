"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ArrowUpCircleIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: PieChart },
  { title: "Analytics", url: "/analytics", icon: Bot },
  { title: "Inventory", url: "/inventory", icon: BookOpen },
  { title: "Settings", url: "/settings", icon: Settings2 },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="p-4">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Main Navigation</div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <a 
                  key={item.title}
                  href={item.url} 
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}