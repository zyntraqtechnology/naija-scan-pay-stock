import React from 'react'
import { ProtectedRoute } from '../../components/auth/protected-route'

export function SuperAdminDashboard() {
  return (
    <ProtectedRoute requiredRole="super-admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the super admin dashboard</p>
      </div>
    </ProtectedRoute>
  )
}