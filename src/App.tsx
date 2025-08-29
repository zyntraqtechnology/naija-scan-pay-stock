import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from './contexts/auth-context'
import { Toaster } from './components/ui/use-toast'
import { UpdatedHomepage } from './components/updated-homepage'
import { LoginPage } from './pages/LoginPage'
import { AdminDashboard } from './pages/admin/Dashboard'
import { CashierPage } from './pages/cashier/CashierPage'
import { SuperAdminDashboard } from './pages/super-admin/Dashboard'
import { cn } from './lib/utils'
import './styles/globals.css'

function App() {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<UpdatedHomepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/cashier" element={<CashierPage />} />
              <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App