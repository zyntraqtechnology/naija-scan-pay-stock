import React from 'react'
import { ProtectedRoute } from '../../components/auth/protected-route'

export function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin dashboard</p>
      </div>
    </ProtectedRoute>
  )
}