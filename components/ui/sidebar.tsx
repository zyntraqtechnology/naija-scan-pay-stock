"use client"

import { Button } from "@/components/ui/button"
import React, { createContext, useContext, useState, forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define the SidebarContext
interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  expandSidebar: () => void
  collapseSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    // Update CSS custom property for sidebar width
    document.documentElement.style.setProperty("--sidebar-width", !isCollapsed ? "70px" : "256px")

    // Add or remove class from main content
    const mainContent = document.querySelector(".admin-content")
    if (mainContent) {
      if (!isCollapsed) {
        mainContent.classList.add("sidebar-collapsed")
      } else {
        mainContent.classList.remove("sidebar-collapsed")
      }
    }
  }

  const expandSidebar = () => {
    setIsCollapsed(false)
    document.documentElement.style.setProperty("--sidebar-width", "256px")

    const mainContent = document.querySelector(".admin-content")
    if (mainContent) {
      mainContent.classList.remove("sidebar-collapsed")
    }
  }

  const collapseSidebar = () => {
    setIsCollapsed(true)
    document.documentElement.style.setProperty("--sidebar-width", "70px")

    const mainContent = document.querySelector(".admin-content")
    if (mainContent) {
      mainContent.classList.add("sidebar-collapsed")
    }
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, expandSidebar, collapseSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const sidebarVariants = cva(
  "fixed z-50 flex h-screen shrink-0 flex-col bg-background data-[collapsible=icon]:w-16 data-[collapsible=offcanvas]:shadow-2xl data-[collapsible=offcanvas]:transition-transform data-[collapsible=offcanvas]:data-[state=open]:translate-x-0 data-[collapsible=offcanvas]:data-[state=closed]:-translate-x-full",
  {
    variants: {
      variant: {
        inset: "border-r",
      },
      collapsible: {
        offcanvas: "left-0 w-80",
        icon: "w-60",
      },
    },
    compoundVariants: [
      {
        collapsible: "icon",
        variant: "inset",
        className: "group-has-data-[collapsible=icon]/sidebar-wrapper:translate-x-0",
      },
    ],
    defaultVariants: {
      collapsible: "icon",
    },
  },
)

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {
  collapsible?: "icon" | "offcanvas"
  variant?: "inset"
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(({ className, collapsible, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-collapsible={collapsible}
      className={cn(sidebarVariants({ collapsible, variant }), className)}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex flex-1 flex-col gap-2 p-4", className)} {...props} />
  },
)
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("shrink-0 border-t", className)} {...props} />
  },
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("shrink-0", className)} {...props} />
  },
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
  },
)
SidebarMenu.displayName = "SidebarMenu"

// This is the component that was missing - SidebarMenuItemButton
const SidebarMenuItemButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative flex h-9 w-full items-center gap-2 rounded-md px-3 text-sm font-medium duration-200 ease-linear",
        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      data-active={isActive}
      {...props}
    />
  )
})
SidebarMenuItemButton.displayName = "SidebarMenuItemButton"

const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("relative", className)} {...props} />
  },
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute right-1.5 top-1.5 opacity-0 group-hover:opacity-100", className)}
        {...props}
      />
    )
  },
)
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { collapsible?: boolean }>(
  ({ className, collapsible, ...props }, ref) => {
    return <div ref={ref} data-collapsible={collapsible} className={cn("flex flex-col gap-2", className)} {...props} />
  },
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
  },
)
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-3 text-sm font-medium text-muted-foreground group-data-[collapsible=icon]:hidden", className)}
        {...props}
      />
    )
  },
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        className={cn("p-0 data-[state=open]:bg-muted", className)}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    )
  },
)
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("group/sidebar-wrapper flex flex-1 flex-col", className)} {...props} />
  },
)
SidebarInset.displayName = "SidebarInset"

const SidebarMenuItemIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("shrink-0", className)} {...props} />
  },
)
SidebarMenuItemIcon.displayName = "SidebarMenuItemIcon"

const SidebarMenuItemText = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex-1 truncate", className)} {...props} />
  },
)
SidebarMenuItemText.displayName = "SidebarMenuItemText"

const SidebarMenuButton = SidebarMenuItemButton

// Export all components, including SidebarMenuButton
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton, // Now properly defined as alias
  SidebarMenuItem,
  SidebarMenuItemButton,
  SidebarMenuItemIcon,
  SidebarMenuItemText,
  SidebarMenuAction,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarInset,
}
