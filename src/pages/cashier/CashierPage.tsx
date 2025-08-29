import React from 'react'
import { ProtectedRoute } from '../../components/auth/protected-route' 

export function CashierPage() {
  return (
    <ProtectedRoute requiredRole="cashier">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Cashier Dashboard</h1>
        <p className="text-gray-600">Welcome to the cashier interface</p>
      </div>
    </ProtectedRoute>
  )
}