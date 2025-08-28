"use client"

import { useState } from "react"
import {
  CreditCard,
  Printer,
  QrCode,
  Settings,
  Wallet,
  Monitor,
  Wifi,
  WifiOff,
  Users,
  TrendingUp,
  Clock,
  Receipt,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AdminHeader } from "@/components/admin/admin-header"

export default function POSPage() {
  const [activeTerminal, setActiveTerminal] = useState("terminal-1")
  const [selectedBranch, setSelectedBranch] = useState("main-branch")

  const branches = [
    { id: "main-branch", name: "Main Branch - Lagos", terminals: 3, status: "online" },
    { id: "ikeja-branch", name: "Ikeja Branch", terminals: 2, status: "online" },
    { id: "abuja-branch", name: "Abuja Branch", terminals: 2, status: "offline" },
  ]

  const terminals = {
    "main-branch": [
      {
        id: "terminal-1",
        name: "Terminal 1 - Main Counter",
        cashier: "Sarah Johnson",
        status: "online",
        transactions: 24,
        sales: 45500,
      },
      {
        id: "terminal-2",
        name: "Terminal 2 - Side Counter",
        cashier: "Michael Chen",
        status: "online",
        transactions: 18,
        sales: 32100,
      },
      {
        id: "terminal-3",
        name: "Terminal 3 - Mobile",
        cashier: "Unassigned",
        status: "idle",
        transactions: 0,
        sales: 0,
      },
    ],
    "ikeja-branch": [
      {
        id: "terminal-4",
        name: "Terminal 1 - Main Counter",
        cashier: "Adebayo Ogun",
        status: "online",
        transactions: 31,
        sales: 67200,
      },
      {
        id: "terminal-5",
        name: "Terminal 2 - Express Lane",
        cashier: "Fatima Yusuf",
        status: "online",
        transactions: 42,
        sales: 28900,
      },
    ],
    "abuja-branch": [
      {
        id: "terminal-6",
        name: "Terminal 1 - Main Counter",
        cashier: "Unassigned",
        status: "offline",
        transactions: 0,
        sales: 0,
      },
      {
        id: "terminal-7",
        name: "Terminal 2 - Side Counter",
        cashier: "Unassigned",
        status: "offline",
        transactions: 0,
        sales: 0,
      },
    ],
  }

  const currentBranch = branches.find((b) => b.id === selectedBranch)
  const currentTerminals = terminals[selectedBranch] || []
  const currentTerminal = currentTerminals.find((t) => t.id === activeTerminal) || currentTerminals[0]

  const quickActions = [
    {
      title: "Launch Cashier",
      description: "Start POS session",
      icon: Monitor,
      color: "bg-gradient-to-br from-[#635BFF] via-[#7C3AED] to-[#8B5CF6]",
      textColor: "text-white",
      action: () => window.open("/cashier", "_blank"),
      special: true,
    },
    {
      title: "Print Reports",
      description: "Generate sales reports",
      icon: Printer,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      textColor: "text-white",
      action: () => handlePrintReports(),
    },
    {
      title: "Terminal Settings",
      description: "Configure terminal",
      icon: Settings,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-white",
      action: () => handleTerminalSettings(),
    },
    {
      title: "Receipt Settings",
      description: "Customize receipts",
      icon: Receipt,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-white",
      href: `/admin/pos/receipt-settings?branch=${selectedBranch}`,
    },
    {
      title: "Printer Setup",
      description: "Configure printers",
      icon: Wrench,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-white",
      href: `/admin/pos/printer-settings?branch=${selectedBranch}`,
    },
    {
      title: "Open Cash Drawer",
      description: "Manual cash access",
      icon: Wallet,
      color: "bg-gradient-to-br from-gray-600 to-gray-700",
      textColor: "text-white",
      action: () => handleOpenCashDrawer(),
    },
  ]

  const handlePrintReports = () => {
    // Implementation for printing reports
    console.log("Printing reports for", currentTerminal?.name)
  }

  const handleTerminalSettings = () => {
    // Implementation for terminal settings
    console.log("Opening terminal settings for", currentTerminal?.name)
  }

  const handleOpenCashDrawer = () => {
    // Implementation for opening cash drawer
    console.log("Opening cash drawer for", currentTerminal?.name)
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="Point of Sale Management"
        description="Manage terminals, branches, and POS operations across your store network"
      />

      <div className="flex-1 space-y-6 p-4 md:p-8">
        {/* Branch Selection */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">POS Dashboard</h2>
            <p className="text-muted-foreground">Monitor and manage your point of sale terminals</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="min-w-[200px]">
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="shadow-sm border-gray-200 hover:border-gray-300 transition-colors">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent className="shadow-lg border-gray-200">
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id} className="hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${branch.status === "online" ? "bg-green-500" : "bg-red-500"}`}
                        />
                        {branch.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Branch Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Monitor className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Terminals</p>
                  <p className="text-2xl font-bold">
                    {currentTerminals.filter((t) => t.status === "online").length}/{currentTerminals.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Sales</p>
                  <p className="text-2xl font-bold">
                    ₦{currentTerminals.reduce((sum, t) => sum + t.sales, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">{currentTerminals.reduce((sum, t) => sum + t.transactions, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${currentBranch?.status === "online" ? "bg-green-100" : "bg-red-100"}`}>
                  {currentBranch?.status === "online" ? (
                    <Wifi className="h-6 w-6 text-green-600" />
                  ) : (
                    <WifiOff className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Branch Status</p>
                  <Badge variant={currentBranch?.status === "online" ? "default" : "destructive"} className="mt-1">
                    {currentBranch?.status === "online" ? "Online" : "Offline"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Terminal Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Terminal Management</CardTitle>
                <CardDescription>Select and monitor individual terminals in {currentBranch?.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={activeTerminal} onValueChange={setActiveTerminal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select terminal" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentTerminals.map((terminal) => (
                      <SelectItem key={terminal.id} value={terminal.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              terminal.status === "online"
                                ? "bg-green-500"
                                : terminal.status === "idle"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          {terminal.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {currentTerminal && (
                  <div className="rounded-lg border p-6 bg-gradient-to-br from-gray-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{currentTerminal.name}</h3>
                      <Badge
                        variant={
                          currentTerminal.status === "online"
                            ? "default"
                            : currentTerminal.status === "idle"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {currentTerminal.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Cashier:</span>
                          <span className="text-sm font-medium">{currentTerminal.cashier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Transactions Today:</span>
                          <span className="text-sm font-medium">{currentTerminal.transactions}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Sales Today:</span>
                          <span className="text-sm font-medium">₦{currentTerminal.sales.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last Activity:</span>
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {currentTerminal.status === "online" ? "2 min ago" : "Offline"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Essential POS operations and management tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => {
                    const ActionButton = (
                      <div
                        key={index}
                        className={`${action.color} ${action.textColor} rounded-xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg group relative overflow-hidden ${
                          action.special
                            ? "shadow-md shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
                            : ""
                        }`}
                        onClick={action.action}
                      >
                        {action.special && (
                          <>
                            {/* Subtle animated overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 animate-pulse"></div>
                            {/* Gentle shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
                          </>
                        )}
                        <div className="flex flex-col items-center text-center space-y-3 relative z-10">
                          <div
                            className={`p-3 ${action.special ? "bg-white/15 backdrop-blur-sm" : "bg-white/20"} rounded-lg group-hover:bg-white/30 transition-colors`}
                          >
                            <action.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{action.title}</h3>
                            <p className="text-xs opacity-90 mt-1">{action.description}</p>
                          </div>
                        </div>
                      </div>
                    )

                    return action.href ? (
                      <Link key={index} href={action.href}>
                        {ActionButton}
                      </Link>
                    ) : (
                      ActionButton
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods & Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Active payment options for this terminal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Cash", icon: Wallet, status: "active", color: "green" },
                  { name: "Card", icon: CreditCard, status: "active", color: "blue" },
                  { name: "QR Code", icon: QrCode, status: "active", color: "purple" },
                ].map((method, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-${method.color}-100 flex items-center justify-center`}>
                        <method.icon className={`h-5 w-5 text-${method.color}-600`} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{method.name}</div>
                        <div className="text-xs text-muted-foreground">Payment processing</div>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                      Active
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest transactions on this terminal</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="transactions">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                  </TabsList>
                  <TabsContent value="transactions" className="space-y-3 mt-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium text-sm">Transaction #{1000 + i}</div>
                          <div className="text-xs text-muted-foreground">
                            {i === 1 ? "2 min ago" : i === 2 ? "15 min ago" : i === 3 ? "32 min ago" : "1 hour ago"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">₦{(Math.random() * 5000 + 1000).toFixed(0)}</div>
                          <div className="text-xs text-muted-foreground">
                            {i % 3 === 0 ? "Card" : i % 3 === 1 ? "Cash" : "QR"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="events" className="space-y-3 mt-4">
                    {[
                      { event: "Terminal Login", time: "3 hours ago", user: "Sarah Johnson" },
                      { event: "Cash Drawer Opened", time: "2 hours ago", user: "Manual Operation" },
                      { event: "Receipt Printed", time: "1 hour ago", user: "Transaction #1003" },
                    ].map((event, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium text-sm">{event.event}</div>
                          <div className="text-xs text-muted-foreground">{event.time}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{event.user}</div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
