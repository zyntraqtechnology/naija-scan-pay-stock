"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  UserCheck,
  CreditCard,
  Copy,
  ArrowUpDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function MerchantsPage() {
  const router = useRouter()
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [kycFilter, setKycFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const merchants = [
    {
      id: "MERCH001",
      name: "Bloom Fashion Store",
      logo: "/placeholder.svg?height=40&width=40",
      owner: { name: "Sarah Johnson", email: "sarah@bloomfashion.com" },
      status: "active",
      kyc: "verified",
      stores: 3,
      orders: 1256,
      grossSales: 2450000,
      walletBalance: 125000,
      pendingPayout: 45000,
      lastActivity: "2 hours ago",
    },
    {
      id: "MERCH002",
      name: "Tech Hub Electronics",
      logo: "/placeholder.svg?height=40&width=40",
      owner: { name: "Michael Chen", email: "mike@techhub.ng" },
      status: "active",
      kyc: "verified",
      stores: 2,
      orders: 892,
      grossSales: 1890000,
      walletBalance: 89000,
      pendingPayout: 32000,
      lastActivity: "1 day ago",
    },
    {
      id: "MERCH003",
      name: "Mama's Kitchen",
      logo: "/placeholder.svg?height=40&width=40",
      owner: { name: "Grace Adebayo", email: "grace@mamaskitchen.ng" },
      status: "pending",
      kyc: "unverified",
      stores: 1,
      orders: 234,
      grossSales: 450000,
      walletBalance: 12000,
      pendingPayout: 0,
      lastActivity: "3 days ago",
    },
    {
      id: "MERCH004",
      name: "AutoParts Direct",
      logo: "/placeholder.svg?height=40&width=40",
      owner: { name: "David Okafor", email: "david@autoparts.ng" },
      status: "suspended",
      kyc: "verified",
      stores: 4,
      orders: 567,
      grossSales: 890000,
      walletBalance: 0,
      pendingPayout: 0,
      lastActivity: "1 week ago",
    },
  ]

  const merchantMetrics = [
    { label: "Active Merchants", value: "1,247", change: "+12%" },
    { label: "Gross Sales (30d)", value: "₦45.2M", change: "+8%" },
    { label: "Pending KYC", value: "23", change: "—" },
    { label: "Pending Payouts", value: "₦2.1M", change: "—" },
  ]

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch =
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || merchant.status === statusFilter
    const matchesKyc = kycFilter === "all" || merchant.kyc === kycFilter

    return matchesSearch && matchesStatus && matchesKyc
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMerchants(filteredMerchants.map((m) => m.id))
    } else {
      setSelectedMerchants([])
    }
  }

  const handleSelectMerchant = (merchantId: string, checked: boolean) => {
    if (checked) {
      setSelectedMerchants([...selectedMerchants, merchantId])
    } else {
      setSelectedMerchants(selectedMerchants.filter((id) => id !== merchantId))
    }
  }

  const handleExport = () => {
    const csvContent = [
      [
        "Merchant ID",
        "Name",
        "Owner",
        "Email",
        "Status",
        "KYC",
        "Stores",
        "Orders",
        "Gross Sales",
        "Wallet Balance",
        "Last Activity",
      ],
      ...filteredMerchants.map((merchant) => [
        merchant.id,
        merchant.name,
        merchant.owner.name,
        merchant.owner.email,
        merchant.status,
        merchant.kyc,
        merchant.stores.toString(),
        merchant.orders.toString(),
        merchant.grossSales.toString(),
        merchant.walletBalance.toString(),
        merchant.lastActivity,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `merchants-export-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleRowClick = (merchantId: string, e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('input[type="checkbox"]') ||
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("a")
    ) {
      return
    }
    router.push(`/super-admin/merchants/${merchantId}`)
  }

  return (
    <div className="p-6 space-y-6 bg-[#fafafa] min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">Merchants</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-white border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb] shadow-sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Select defaultValue="more-actions">
            <SelectTrigger className="w-32 h-8 text-sm bg-white border-[#d1d5db] shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="more-actions">More actions</SelectItem>
              <SelectItem value="bulk-approve">Bulk approve</SelectItem>
              <SelectItem value="bulk-suspend">Bulk suspend</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="h-8 bg-[#111827] hover:bg-[#1f2937] text-white rounded-md px-3 font-medium"
            asChild
          >
            <Link href="/super-admin/merchants/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Merchant
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {merchantMetrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-sm text-[#6b7280] mb-1 font-medium">{metric.label}</div>
            <div className="text-2xl font-semibold text-[#111827] mb-1">{metric.value}</div>
            <div className="text-sm text-[#9ca3af]">{metric.change}</div>
            <div className="w-full bg-[#e5e7eb] rounded-full h-1 mt-2">
              <div className="bg-[#3b82f6] h-1 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-white border border-[#e5e7eb] shadow-sm rounded-lg">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-[#e5e7eb]">
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="all"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#111827] data-[state=active]:bg-transparent text-[#374151] data-[state=active]:text-[#111827] font-medium"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#111827] data-[state=active]:bg-transparent text-[#374151] data-[state=active]:text-[#111827] font-medium"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#111827] data-[state=active]:bg-transparent text-[#374151] data-[state=active]:text-[#111827] font-medium"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="suspended"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#111827] data-[state=active]:bg-transparent text-[#374151] data-[state=active]:text-[#111827] font-medium"
                >
                  Suspended
                </TabsTrigger>
                <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0 hover:bg-[#f9fafb]">
                  <Plus className="h-4 w-4" />
                </Button>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="flex items-center gap-4 p-4 border-b border-[#e5e7eb]">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
                  <Input
                    placeholder="Search merchants"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-8 bg-white border-[#d1d5db] text-[#111827] placeholder-[#9ca3af] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-white border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-white border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]"
                >
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                    <tr>
                      <th className="w-12 p-3 text-left">
                        <Checkbox
                          checked={
                            selectedMerchants.length === filteredMerchants.length && filteredMerchants.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Merchant</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Owner</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Status</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">KYC</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Stores</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Orders</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Gross Sales</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Wallet Balance</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Last Activity</th>
                      <th className="w-12 p-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3f4f6]">
                    {filteredMerchants.map((merchant) => (
                      <tr
                        key={merchant.id}
                        className="hover:bg-[#f9fafb] transition-colors cursor-pointer"
                        onClick={(e) => handleRowClick(merchant.id, e)}
                      >
                        <td className="p-3">
                          <Checkbox
                            checked={selectedMerchants.includes(merchant.id)}
                            onCheckedChange={(checked) => handleSelectMerchant(merchant.id, checked as boolean)}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={merchant.logo || "/placeholder.svg"}
                              alt={merchant.name}
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <div className="font-medium text-[#2563eb] hover:text-[#1d4ed8]">{merchant.name}</div>
                              <div className="text-xs text-[#6b7280]">{merchant.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="text-sm font-medium text-[#111827]">{merchant.owner.name}</div>
                            <div className="text-xs text-[#6b7280]">{merchant.owner.email}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs font-medium",
                              merchant.status === "active" && "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]",
                              merchant.status === "pending" && "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
                              merchant.status === "suspended" && "bg-[#fee2e2] text-[#991b1b] border-[#fecaca]",
                            )}
                          >
                            ● {merchant.status.charAt(0).toUpperCase() + merchant.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs font-medium",
                              merchant.kyc === "verified" && "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]",
                              merchant.kyc === "unverified" && "bg-[#f3f4f6] text-[#374151] border-[#d1d5db]",
                            )}
                          >
                            {merchant.kyc === "verified" ? "Verified" : "Unverified"}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">{merchant.stores}</td>
                        <td className="p-3 text-sm font-medium text-[#111827]">{merchant.orders.toLocaleString()}</td>
                        <td className="p-3 text-sm font-medium text-[#111827]">
                          ₦{merchant.grossSales.toLocaleString()}
                        </td>
                        <td className="p-3 text-sm font-medium text-[#111827]">
                          ₦{merchant.walletBalance.toLocaleString()}
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">{merchant.lastActivity}</td>
                        <td className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#f3f4f6]">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/super-admin/merchants/${merchant.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Impersonate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Run Payout
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Merchant ID
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-center p-4 border-t border-[#e5e7eb]">
                <p className="text-sm text-[#6b7280]">
                  Learn more about{" "}
                  <a href="#" className="text-[#2563eb] hover:text-[#1d4ed8] font-medium">
                    merchants
                  </a>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
