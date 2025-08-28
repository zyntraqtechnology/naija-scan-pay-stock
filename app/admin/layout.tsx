import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AuthCheck } from "@/components/auth/auth-check"
import { RouteChangeProgressBar } from "@/components/ui/progress-bar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthCheck>
      <RouteChangeProgressBar />
      <SidebarProvider>
        <div className="flex min-h-screen bg-[#f1f1f1]">
          <AdminSidebar />
          <div className="flex-1 flex flex-col ml-[70px] lg:ml-64 transition-all duration-300 ease-in-out">
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </AuthCheck>
  )
}
