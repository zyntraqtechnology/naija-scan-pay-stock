"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  UserCheck,
  Ban,
  CreditCard,
  MoreHorizontal,
  Copy,
  Building2,
  Wallet,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  Package,
  Users,
  Shield,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function MerchantDetailPage({ params }: { params: { merchantId: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const merchant = {
    id: params.merchantId,
    name: "Bloom Fashion Store",
    logo: "/placeholder.svg?height=60&width=60",
    status: "active",
    owner: { name: "Sarah Johnson", email: "sarah@bloomfashion.com", phone: "+234 801 234 5678" },
    businessInfo: {
      legalName: "Bloom Fashion Limited",
      rcNumber: "RC123456789",
      address: "123 Victoria Island, Lagos, Nigeria",
      industry: "Fashion & Retail",
    },
    kyc: {
      status: "verified",
      level: "Tier 2",
      verifiedAt: "2024-01-15",
      documents: ["CAC Certificate", "Tax ID", "Bank Statement"],
    },
    settlement: {
      bankName: "First Bank of Nigeria",
      accountNumber: "0123456789",
      subaccountId: "FLW_SUB_123456",
      payoutCycle: "T+1",
      mdr: "1.5%",
    },
    stores: 3,
    terminals: 5,
    lastHeartbeat: "2 minutes ago",
    kpis: {
      grossSales: 2450000,
      orders: 1256,
      refunds: 45000,
      walletBalance: 125000,
      pendingPayouts: 45000,
      chargebackRate: 0.2,
      lastActivity: "2 hours ago",
    },
  }

  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      items: 3,
      method: "QR Code",
      total: 15000,
      fees: 225,
      net: 14775,
      status: "completed",
      time: "2024-01-20 14:30",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      items: 1,
      method: "Virtual Account",
      total: 8500,
      fees: 128,
      net: 8372,
      status: "pending",
      time: "2024-01-20 13:15",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      items: 2,
      method: "Card",
      total: 22000,
      fees: 330,
      net: 21670,
      status: "completed",
      time: "2024-01-20 12:45",
    },
    {
      id: "ORD-004",
      customer: "Sarah Wilson",
      items: 4,
      method: "Cash",
      total: 12000,
      fees: 0,
      net: 12000,
      status: "refunded",
      time: "2024-01-20 11:20",
    },
    {
      id: "ORD-005",
      customer: "David Brown",
      items: 1,
      method: "QR Code",
      total: 5500,
      fees: 83,
      net: 5417,
      status: "completed",
      time: "2024-01-20 10:30",
    },
  ]

  const payouts = [
    { date: "2024-01-19", amount: 145000, destination: "First Bank ***6789", status: "completed", ref: "PAY-001" },
    { date: "2024-01-18", amount: 98500, destination: "First Bank ***6789", status: "completed", ref: "PAY-002" },
    { date: "2024-01-17", amount: 203000, destination: "First Bank ***6789", status: "completed", ref: "PAY-003" },
    { date: "2024-01-16", amount: 67800, destination: "First Bank ***6789", status: "failed", ref: "PAY-004" },
  ]

  const users = [
    {
      name: "Sarah Johnson",
      email: "sarah@bloomfashion.com",
      role: "Admin",
      lastLogin: "2 hours ago",
      status: "active",
    },
    { name: "Mike Adebayo", email: "mike@bloomfashion.com", role: "Cashier", lastLogin: "1 day ago", status: "active" },
    {
      name: "Grace Okafor",
      email: "grace@bloomfashion.com",
      role: "Cashier",
      lastLogin: "3 days ago",
      status: "inactive",
    },
  ]

  const auditLogs = [
    { time: "2024-01-20 14:35", actor: "System", action: "Order Created", entity: "ORD-001", ip: "192.168.1.1" },
    {
      time: "2024-01-20 14:30",
      actor: "sarah@bloomfashion.com",
      action: "Payment Processed",
      entity: "PAY-001",
      ip: "41.203.45.12",
    },
    {
      time: "2024-01-20 13:15",
      actor: "mike@bloomfashion.com",
      action: "Product Updated",
      entity: "PROD-123",
      ip: "41.203.45.13",
    },
    { time: "2024-01-20 12:45", actor: "System", action: "Payout Initiated", entity: "PAY-002", ip: "192.168.1.1" },
  ]

  const copyMerchantId = () => {
    navigator.clipboard.writeText(merchant.id)
    toast.success("Merchant ID copied to clipboard")
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      refunded: "bg-red-100 text-red-800",
      failed: "bg-red-100 text-red-800",
      inactive: "bg-gray-100 text-gray-800",
    }
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleEdit = (section: string) => {
    setEditingSection(section)
  }

  const handleSave = (section: string) => {
    setEditingSection(null)
    toast.success(`${section} updated successfully`)
  }

  const handleCancel = () => {
    setEditingSection(null)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/super-admin/merchants">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Merchants
          </Button>
        </Link>
      </div>

      {/* Shop Info Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={merchant.logo || "/placeholder.svg"}
            alt={merchant.name}
            className="h-16 w-16 rounded-full border-2 border-gray-200"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{merchant.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-500 font-mono">{merchant.id}</span>
              <Button variant="ghost" size="sm" onClick={copyMerchantId}>
                <Copy className="h-4 w-4" />
              </Button>
              {getStatusBadge(merchant.status)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Owner: {merchant.owner.name} • {merchant.owner.email}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <UserCheck className="h-4 w-4 mr-2" />
            Impersonate
          </Button>
          <Button variant="outline" size="sm">
            <CreditCard className="h-4 w-4 mr-2" />
            Run Payout
          </Button>
          <Button variant="outline" size="sm">
            <Ban className="h-4 w-4 mr-2" />
            Suspend
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Gross Sales</div>
            <div className="text-xl font-bold text-gray-900">₦{merchant.kpis.grossSales.toLocaleString()}</div>
            <div className="text-xs text-green-600">+15% vs last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Orders</div>
            <div className="text-xl font-bold text-gray-900">{merchant.kpis.orders.toLocaleString()}</div>
            <div className="text-xs text-green-600">+8% vs last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Refunds</div>
            <div className="text-xl font-bold text-gray-900">₦{merchant.kpis.refunds.toLocaleString()}</div>
            <div className="text-xs text-red-600">2.1% of sales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Wallet Balance</div>
            <div className="text-xl font-bold text-gray-900">₦{merchant.kpis.walletBalance.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Available now</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Pending Payouts</div>
            <div className="text-xl font-bold text-orange-600">₦{merchant.kpis.pendingPayouts.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Next: Tomorrow</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Chargeback Rate</div>
            <div className="text-xl font-bold text-green-600">{merchant.kpis.chargebackRate}%</div>
            <div className="text-xs text-gray-500">Industry avg: 0.8%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Last Activity</div>
            <div className="text-xl font-bold text-gray-900">{merchant.kpis.lastActivity}</div>
            <div className="text-xs text-green-600">Online now</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wallet">Wallet & Payouts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="risk">Risk & Compliance</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="logs">Logs & Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Info */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Information
                </CardTitle>
                {editingSection !== "business" && (
                  <Button variant="ghost" size="sm" onClick={() => handleEdit("business")}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {editingSection === "business" ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Legal Name</Label>
                      <Input defaultValue={merchant.businessInfo.legalName} />
                    </div>
                    <div>
                      <Label>RC Number</Label>
                      <Input defaultValue={merchant.businessInfo.rcNumber} />
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Textarea defaultValue={merchant.businessInfo.address} />
                    </div>
                    <div>
                      <Label>Industry</Label>
                      <Select defaultValue={merchant.businessInfo.industry}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fashion & Retail">Fashion & Retail</SelectItem>
                          <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Services">Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSave("Business Information")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Legal Name</div>
                      <div className="text-sm text-gray-900">{merchant.businessInfo.legalName}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">RC Number</div>
                      <div className="text-sm text-gray-900">{merchant.businessInfo.rcNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Address</div>
                      <div className="text-sm text-gray-900">{merchant.businessInfo.address}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Industry</div>
                      <div className="text-sm text-gray-900">{merchant.businessInfo.industry}</div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* KYC Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  KYC Status
                </CardTitle>
                {editingSection !== "kyc" && (
                  <Button variant="ghost" size="sm" onClick={() => handleEdit("kyc")}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {editingSection === "kyc" ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Status</Label>
                      <Select defaultValue={merchant.kyc.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Level</Label>
                      <Select defaultValue={merchant.kyc.level}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tier 1">Tier 1</SelectItem>
                          <SelectItem value="Tier 2">Tier 2</SelectItem>
                          <SelectItem value="Tier 3">Tier 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSave("KYC Status")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Status</span>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Level</div>
                      <div className="text-sm text-gray-900">{merchant.kyc.level}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Verified Date</div>
                      <div className="text-sm text-gray-900">{merchant.kyc.verifiedAt}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Documents</div>
                      <div className="text-sm text-gray-900">{merchant.kyc.documents.join(", ")}</div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Settlement Profile */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Settlement Profile
                </CardTitle>
                {editingSection !== "settlement" && (
                  <Button variant="ghost" size="sm" onClick={() => handleEdit("settlement")}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {editingSection === "settlement" ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Bank Name</Label>
                      <Input defaultValue={merchant.settlement.bankName} />
                    </div>
                    <div>
                      <Label>Account Number</Label>
                      <Input defaultValue={merchant.settlement.accountNumber} />
                    </div>
                    <div>
                      <Label>Payout Cycle</Label>
                      <Select defaultValue={merchant.settlement.payoutCycle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="T+1">T+1</SelectItem>
                          <SelectItem value="T+3">T+3</SelectItem>
                          <SelectItem value="Manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>MDR (%)</Label>
                      <Input defaultValue={merchant.settlement.mdr} />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSave("Settlement Profile")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Bank</div>
                      <div className="text-sm text-gray-900">{merchant.settlement.bankName}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Account Number</div>
                      <div className="text-sm text-gray-900">{merchant.settlement.accountNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Payout Cycle</div>
                      <div className="text-sm text-gray-900">{merchant.settlement.payoutCycle}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">MDR</div>
                      <div className="text-sm text-gray-900">{merchant.settlement.mdr}</div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Stores & Devices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Stores & Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Stores</span>
                  <span className="text-sm text-gray-900">{merchant.stores}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Terminals</span>
                  <span className="text-sm text-gray-900">{merchant.terminals}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Last Heartbeat</div>
                  <div className="text-sm text-green-600">{merchant.lastHeartbeat}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Orders Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Search orders..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="qr">QR Code</SelectItem>
                      <SelectItem value="va">Virtual Account</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Order #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Net</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="text-sm">{order.time}</TableCell>
                        <TableCell className="font-mono text-sm">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.method}</TableCell>
                        <TableCell>₦{order.total.toLocaleString()}</TableCell>
                        <TableCell>₦{order.fees.toLocaleString()}</TableCell>
                        <TableCell>₦{order.net.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{merchant.kpis.walletBalance.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Available for payout</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Inflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{merchant.kpis.pendingPayouts.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Processing</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{merchant.kpis.grossSales.toLocaleString()}</div>
                <div className="text-sm text-green-600">+15% vs last month</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payout History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((payout) => (
                    <TableRow key={payout.ref}>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell>₦{payout.amount.toLocaleString()}</TableCell>
                      <TableCell>{payout.destination}</TableCell>
                      <TableCell>{getStatusBadge(payout.status)}</TableCell>
                      <TableCell className="font-mono text-sm">{payout.ref}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Users & Roles
              </CardTitle>
              <Button size="sm">
                <Users className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Merchant Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Branding</h3>
                  <div>
                    <Label>Logo</Label>
                    <Input type="file" />
                  </div>
                  <div>
                    <Label>Receipt Header</Label>
                    <Input defaultValue="Bloom Fashion Store" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Delivery Settings</h3>
                  <div>
                    <Label>Default Delivery Fee</Label>
                    <Input defaultValue="1500" />
                  </div>
                  <div>
                    <Label>Free Delivery Threshold</Label>
                    <Input defaultValue="10000" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium">Flutterwave</div>
                    <div className="text-sm text-gray-500">Payment processing</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Risk & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Velocity Check</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">No violations</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Chargebacks</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">2 this month</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Holds</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">None active</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory & Catalog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">245</div>
                    <div className="text-sm text-gray-500">Total Products</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-red-500">Low Stock</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-gray-500">Categories</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">₦15K</div>
                    <div className="text-sm text-gray-500">Avg. Price</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-sm">{log.time}</TableCell>
                      <TableCell>{log.actor}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="font-mono text-sm">{log.entity}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
