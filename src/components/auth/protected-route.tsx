"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "super-admin" | "admin" | "cashier" // Added super-admin role
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Check if user is logged in
      if (!user) {
        navigate("/login")
        return
      }

      // Check if user has required role
      if (requiredRole && user.role !== requiredRole) {
        // Super admin has access to everything
        if (user.role === "super-admin") {
          setIsAuthorized(true)
          return
        }

        // Redirect based on user role
        if (user.role === "admin") {
          navigate("/admin/dashboard")
        } else if (user.role === "cashier") {
          navigate("/cashier")
        } else {
          navigate("/super-admin/dashboard")
        }
        return
      }

      setIsAuthorized(true)
    }
  }, [user, isLoading, requiredRole, navigate])

  if (isLoading || !isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
