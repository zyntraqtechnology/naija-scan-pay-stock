"use client"

import type React from "react"
import { useState } from "react"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { SuperAdminSidebar } from "@/components/super-admin/super-admin-sidebar"
import { SuperAdminHeader } from "@/components/super-admin/super-admin-header"
import { SuperAdminSettingsDrawer } from "@/components/super-admin/super-admin-settings-drawer"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <ProtectedRoute requiredRole="super-admin">
      <div className="min-h-screen bg-white">
        <SuperAdminHeader />
        <div className="flex pt-14">
          <SuperAdminSidebar onSettingsClick={() => setIsSettingsOpen(true)} />
          <main className="flex-1 ml-64 min-h-[calc(100vh-56px)] overflow-y-auto bg-white">{children}</main>
        </div>
        {isSettingsOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />}
        <SuperAdminSettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </ProtectedRoute>
  )
}
