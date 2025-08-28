"use client"

import { useState } from "react"
import {
  CreditCard,
  Plus,
  QrCode,
  Settings,
  Wallet,
  TrendingUp,
  Search,
  Calendar,
  Building,
  Smartphone,
  Nfc,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { TransactionDetailsSheet } from "@/components/admin/transaction-details-sheet"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"

// Demo data for individual payment method charts
const cashData = [
  { name: "Mon", value: 12000 },
  { name: "Tue", value: 15000 },
  { name: "Wed", value: 18000 },
  { name: "Thu", value: 14000 },
  { name: "Fri", value: 22000 },
  { name: "Sat", value: 28000 },
  { name: "Sun", value: 16000 },
]

const cardData = [
  { name: "Mon", value: 8000 },
  { name: "Tue", value: 12000 },
  { name: "Wed", value: 15000 },
  { name: "Thu", value: 11000 },
  { name: "Fri", value: 18000 },
  { name: "Sat", value: 24000 },
  { name: "Sun", value: 13000 },
]

const qrData = [
  { name: "Mon", value: 5000 },
  { name: "Tue", value: 7000 },
  { name: "Wed", value: 9000 },
  { name: "Thu", value: 6000 },
  { name: "Fri", value: 11000 },
  { name: "Sat", value: 15000 },
  { name: "Sun", value: 8000 },
]

const bankTransferData = [
  { name: "Mon", value: 15000 },
  { name: "Tue", value: 18000 },
  { name: "Wed", value: 22000 },
  { name: "Thu", value: 19000 },
  { name: "Fri", value: 25000 },
  { name: "Sat", value: 30000 },
  { name: "Sun", value: 20000 },
]

const ussdData = [
  { name: "Mon", value: 3000 },
  { name: "Tue", value: 4500 },
  { name: "Wed", value: 6000 },
  { name: "Thu", value: 4000 },
  { name: "Fri", value: 7500 },
  { name: "Sat", value: 9000 },
  { name: "Sun", value: 5500 },
]

const tapToPayData = [
  { name: "Mon", value: 2000 },
  { name: "Tue", value: 3500 },
  { name: "Wed", value: 4500 },
  { name: "Thu", value: 3000 },
  { name: "Fri", value: 5500 },
  { name: "Sat", value: 7000 },
  { name: "Sun", value: 4000 },
]

// Demo data for performance comparison chart
const performanceData = [
  { name: "Jan", Cash: 45000, Card: 32000, "QR Code": 18000, "Bank Transfer": 28000, USSD: 12000, "Tap to Pay": 8000 },
  { name: "Feb", Cash: 42000, Card: 35000, "QR Code": 22000, "Bank Transfer": 32000, USSD: 15000, "Tap to Pay": 10000 },
  { name: "Mar", Cash: 48000, Card: 38000, "QR Code": 25000, "Bank Transfer": 35000, USSD: 18000, "Tap to Pay": 12000 },
  { name: "Apr", Cash: 44000, Card: 41000, "QR Code": 28000, "Bank Transfer": 38000, USSD: 20000, "Tap to Pay": 14000 },
  { name: "May", Cash: 52000, Card: 45000, "QR Code": 32000, "Bank Transfer": 42000, USSD: 23000, "Tap to Pay": 16000 },
  { name: "Jun", Cash: 49000, Card: 48000, "QR Code": 35000, "Bank Transfer": 45000, USSD: 25000, "Tap to Pay": 18000 },
]

export default function PaymentMethodsPage() {
  const router = useRouter()
  const [cashEnabled, setCashEnabled] = useState(true)
  const [cardEnabled, setCardEnabled] = useState(true)
  const [qrEnabled, setQrEnabled] = useState(true)
  const [bankTransferEnabled, setBankTransferEnabled] = useState(true)
  const [ussdEnabled, setUssdEnabled] = useState(false)
  const [tapToPayEnabled, setTapToPayEnabled] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [isTransactionSheetOpen, setIsTransactionSheetOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")

  const transactions = [
    {
      id: "TXN001",
      date: "2024-01-10 10:30 AM",
      status: "COMPLETED",
      customer: "John Doe",
      cashier: "Alice Smith",
      store: "Main Branch",
      paymentType: "Cash",
      total: 2500,
      method: "cash",
    },
    {
      id: "TXN002",
      date: "2024-01-10 11:45 AM",
      status: "COMPLETED",
      customer: "Jane Wilson",
      cashier: "Bob Johnson",
      store: "Main Branch",
      paymentType: "Card",
      total: 4200,
      method: "card",
    },
    {
      id: "TXN003",
      date: "2024-01-10 01:30 PM",
      status: "REFUNDED",
      customer: "Mike Brown",
      cashier: "Carol Davis",
      store: "Mall Branch",
      paymentType: "QR Code",
      total: 1800,
      method: "qr",
    },
    {
      id: "TXN004",
      date: "2024-01-09 03:15 PM",
      status: "COMPLETED",
      customer: "Sarah Lee",
      cashier: "David Wilson",
      store: "Downtown Branch",
      paymentType: "Bank Transfer",
      total: 8500,
      method: "bank_transfer",
    },
    {
      id: "TXN005",
      date: "2024-01-09 05:45 PM",
      status: "COMPLETED",
      customer: "Tom Anderson",
      cashier: "Eva Martinez",
      store: "Main Branch",
      paymentType: "USSD",
      total: 3200,
      method: "ussd",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesMethod = methodFilter === "all" || transaction.method === methodFilter

    return matchesSearch && matchesStatus && matchesMethod
  })

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionSheetOpen(true)
  }

  const MiniChart = ({ data, color }: { data: any[]; color: string }) => (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color.replace("#", "")})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="Payment Methods"
        description="Manage and configure payment methods for your stores"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Payment Methods", href: "/admin/payments" },
        ]}
        actions={
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => router.push("/admin/payments/add")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        }
      />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Methods</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Cash Payment Card */}
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-green-100">
                        <Wallet className="h-5 w-5 text-green-600" />
                      </div>
                      Cash
                    </CardTitle>
                    <Switch checked={cashEnabled} onCheckedChange={setCashEnabled} />
                  </div>
                  <CardDescription>Traditional cash payment handling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <MiniChart data={cashData} color="#10B981" />
                    <div className="rounded-lg border p-3 bg-green-50/50">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Today's Transactions:</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Today's Volume:</span>
                        <span className="font-medium">₦25,500.00</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">No configuration required</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card Payment Card */}
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      Card
                    </CardTitle>
                    <Switch checked={cardEnabled} onCheckedChange={setCardEnabled} />
                  </div>
                  <CardDescription>Credit and debit card processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <MiniChart data={cardData} color="#3B82F6" />
                    <div className="rounded-lg border p-3 bg-blue-50/50">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Today's Transactions:</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Today's Volume:</span>
                        <span className="font-medium">₦18,200.00</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Handled by POS terminal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* QR Code Payment Card */}
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <QrCode className="h-5 w-5 text-purple-600" />
                      </div>
                      QR Code
                    </CardTitle>
                    <Switch checked={qrEnabled} onCheckedChange={setQrEnabled} />
                  </div>
                  <CardDescription>Mobile payment via QR code scanning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <MiniChart data={qrData} color="#8B5CF6" />
                    <div className="rounded-lg border p-3 bg-purple-50/50">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Today's Transactions:</span>
                        <span className="font-medium">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Today's Volume:</span>
                        <span className="font-medium">₦12,800.00</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/admin/payments/qr/configure")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configure Bank
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Transfer Payment Card */}
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-indigo-100">
                        <Building className="h-5 w-5 text-indigo-600" />
                      </div>
                      Bank Transfer
                    </CardTitle>
                    <Switch checked={bankTransferEnabled} onCheckedChange={setBankTransferEnabled} />
                  </div>
                  <CardDescription>Direct bank account transfers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <MiniChart data={bankTransferData} color="#6366F1" />
                    <div className="rounded-lg border p-3 bg-indigo-50/50">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Today's Transactions:</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Today's Volume:</span>
                        <span className="font-medium">₦45,300.00</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/admin/payments/bank-transfer/configure")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configure Banks
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* USSD Payment Card */}
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-orange-100">
                        <Smartphone className="h-5 w-5 text-orange-600" />
                      </div>
                      USSD
                    </CardTitle>
                    <Switch checked={ussdEnabled} onCheckedChange={setUssdEnabled} />
                  </div>
                  <CardDescription>Mobile money via USSD codes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <MiniChart data={ussdData} color="#F97316" />
                    <div className="rounded-lg border p-3 bg-orange-50/50">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Today's Transactions:</span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Today's Volume:</span>
                        <span className="font-medium">₦0.00</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/admin/payments/ussd/configure")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configure USSD
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tap to Pay Card */}
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-teal-100">
                        <Nfc className="h-5 w-5 text-teal-600" />
                      </div>
                      Tap to Pay
                    </CardTitle>
                    <Switch checked={tapToPayEnabled} onCheckedChange={setTapToPayEnabled} />
                  </div>
                  <CardDescription>Contactless NFC payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <MiniChart data={tapToPayData} color="#14B8A6" />
                    <div className="rounded-lg border p-3 bg-teal-50/50">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Today's Transactions:</span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Today's Volume:</span>
                        <span className="font-medium">₦0.00</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/admin/payments/tap-to-pay/configure")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configure NFC
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Payment Method Performance
                </CardTitle>
                <CardDescription>
                  Compare transaction volumes across different payment methods over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="cardGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="qrGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="bankTransferGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="ussdGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="tapToPayGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(value: any, name: string) => [`₦${value.toLocaleString()}`, name]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="Cash" stackId="1" stroke="#10B981" fill="url(#cashGradient)" />
                      <Area type="monotone" dataKey="Card" stackId="1" stroke="#3B82F6" fill="url(#cardGradient)" />
                      <Area type="monotone" dataKey="QR Code" stackId="1" stroke="#8B5CF6" fill="url(#qrGradient)" />
                      <Area
                        type="monotone"
                        dataKey="Bank Transfer"
                        stackId="1"
                        stroke="#6366F1"
                        fill="url(#bankTransferGradient)"
                      />
                      <Area type="monotone" dataKey="USSD" stackId="1" stroke="#F97316" fill="url(#ussdGradient)" />
                      <Area
                        type="monotone"
                        dataKey="Tap to Pay"
                        stackId="1"
                        stroke="#14B8A6"
                        fill="url(#tapToPayGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Global Payment Settings</CardTitle>
                <CardDescription>Configure settings that apply to all payment methods.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Receipt Printing</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically print receipts for all transactions
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Email Receipts</div>
                      <div className="text-sm text-muted-foreground">
                        Send email receipts when customer email is provided
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Transaction Timeout</div>
                      <div className="text-sm text-muted-foreground">
                        Cancel transactions after 2 minutes of inactivity
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Offline Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Allow transactions when internet connection is unavailable
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>View and filter transaction history by payment method.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date Range
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={methodFilter} onValueChange={setMethodFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="qr">QR Code</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="ussd">USSD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-muted">
                          {transaction.method === "cash" && <Wallet className="h-4 w-4 text-green-600" />}
                          {transaction.method === "card" && <CreditCard className="h-4 w-4 text-blue-600" />}
                          {transaction.method === "qr" && <QrCode className="h-4 w-4 text-purple-600" />}
                          {transaction.method === "bank_transfer" && <Building className="h-4 w-4 text-indigo-600" />}
                          {transaction.method === "ussd" && <Smartphone className="h-4 w-4 text-orange-600" />}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.customer} • {transaction.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₦{transaction.total.toLocaleString()}</div>
                        <Badge
                          className={
                            transaction.status === "COMPLETED"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <TransactionDetailsSheet
          isOpen={isTransactionSheetOpen}
          onClose={() => setIsTransactionSheetOpen(false)}
          transaction={selectedTransaction}
        />
      </div>
    </div>
  )
}
