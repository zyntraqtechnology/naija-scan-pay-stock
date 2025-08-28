import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import {
  TrendingUp,
  Users,
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  Wallet,
  RefreshCw,
  Shield,
  Truck,
  Tag,
  Zap,
} from "lucide-react"

export default function SuperAdminDashboard() {
  const kpiData = [
    {
      title: "Gross Sales",
      value: "₦12,847,920",
      change: "+15.7%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: DollarSign,
    },
    {
      title: "Successful Payments",
      value: "45,892",
      change: "+12.5%",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: CheckCircle2,
    },
    {
      title: "Refunds",
      value: "₦234,560",
      change: "-2.3%",
      color: "text-red-600",
      bgColor: "bg-red-50",
      icon: RefreshCw,
    },
    {
      title: "Payouts Sent",
      value: "₦8,945,230",
      change: "+18.2%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: Wallet,
    },
    {
      title: "Wallet Balance",
      value: "₦2,456,780",
      change: "+5.4%",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      icon: CreditCard,
    },
    {
      title: "Active Merchants",
      value: "1,247",
      change: "+8.2%",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      icon: Users,
    },
  ]

  const topMerchants = [
    {
      merchant: "TechHub Electronics",
      orders: "2,847",
      grossSales: "₦847,920",
      refunds: "₦12,450",
      payouts: "₦835,470",
    },
    {
      merchant: "Fashion Forward Store",
      orders: "1,923",
      grossSales: "₦623,450",
      refunds: "₦8,230",
      payouts: "₦615,220",
    },
    {
      merchant: "Grocery Plus Market",
      orders: "1,654",
      grossSales: "₦445,230",
      refunds: "₦5,670",
      payouts: "₦439,560",
    },
    { merchant: "BookWorm Library", orders: "1,234", grossSales: "₦334,120", refunds: "₦3,450", payouts: "₦330,670" },
    { merchant: "Coffee Corner Cafe", orders: "987", grossSales: "₦234,560", refunds: "₦2,340", payouts: "₦232,220" },
  ]

  const recentOrders = [
    {
      time: "2 mins ago",
      orderId: "ORD-8472",
      merchant: "TechHub Electronics",
      customer: "John Doe",
      method: "QR",
      total: "₦45,200",
      status: "completed",
    },
    {
      time: "5 mins ago",
      orderId: "ORD-8471",
      merchant: "Fashion Forward",
      customer: "Jane Smith",
      method: "Card",
      total: "₦23,450",
      status: "completed",
    },
    {
      time: "8 mins ago",
      orderId: "ORD-8470",
      merchant: "Grocery Plus",
      customer: "Mike Johnson",
      method: "Virtual Account",
      total: "₦12,300",
      status: "pending",
    },
    {
      time: "12 mins ago",
      orderId: "ORD-8469",
      merchant: "BookWorm Library",
      customer: "Sarah Wilson",
      method: "Cash",
      total: "₦8,750",
      status: "completed",
    },
    {
      time: "15 mins ago",
      orderId: "ORD-8468",
      merchant: "Coffee Corner",
      customer: "David Brown",
      method: "QR",
      total: "₦5,600",
      status: "completed",
    },
  ]

  const riskAlerts = [
    { type: "velocity", message: "High transaction velocity detected for TechHub Electronics", severity: "medium" },
    { type: "chargebacks", message: "2 new chargebacks reported in last 24h", severity: "high" },
    { type: "webhookFailures", message: "15 webhook failures in last hour", severity: "low" },
  ]

  const deliveryData = [
    { merchant: "TechHub Electronics", deliveries: "234", avgCost: "₦850", totalCost: "₦198,900" },
    { merchant: "Fashion Forward", deliveries: "189", avgCost: "₦750", totalCost: "₦141,750" },
    { merchant: "Grocery Plus", deliveries: "156", avgCost: "₦650", totalCost: "₦101,400" },
  ]

  const activeDiscounts = [
    { code: "WELCOME20", scope: "Global", type: "Percentage", ends: "Jan 31", redemptions: "1,234" },
    { code: "NEWUSER", scope: "New Users", type: "Fixed Amount", ends: "Feb 15", redemptions: "567" },
    { code: "BULK50", scope: "Bulk Orders", type: "Percentage", ends: "Mar 1", redemptions: "89" },
  ]

  const quickActions = [
    { title: "Approve Merchant", icon: CheckCircle2, color: "bg-green-50 text-green-600" },
    { title: "Create Discount", icon: Tag, color: "bg-blue-50 text-blue-600" },
    { title: "Settle Now", icon: Wallet, color: "bg-purple-50 text-purple-600" },
    { title: "Force App Update", icon: RefreshCw, color: "bg-orange-50 text-orange-600" },
    { title: "Send Announcement", icon: AlertCircle, color: "bg-yellow-50 text-yellow-600" },
    { title: "Add Admin", icon: Users, color: "bg-indigo-50 text-indigo-600" },
  ]

  const systemHealth = [
    { metric: "Flutterwave Status", value: "Operational", status: "good" },
    { metric: "Last Webhook", value: "2 mins ago", status: "good" },
    { metric: "Webhook Failures (24h)", value: "3", status: "warning" },
    { metric: "Latency P95", value: "245ms", status: "good" },
    { metric: "Last Reconciliation", value: "1 hour ago", status: "good" },
    { metric: "Exceptions Count", value: "12", status: "warning" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <select className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm">
              <option>All Merchants</option>
              <option>TechHub Electronics</option>
              <option>Fashion Forward Store</option>
            </select>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">{kpi.title}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-900">{kpi.value}</span>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {kpi.change}
                      </Badge>
                    </div>
                  </div>
                </div>
                {/* Mini sparkline chart */}
                <div className="mt-3 h-8 flex items-end space-x-1">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-gradient-to-t ${kpi.bgColor} rounded-sm`}
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartAreaInteractive />
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { method: "QR Code", percentage: 45, color: "bg-blue-500" },
                  { method: "Virtual Account", percentage: 30, color: "bg-green-500" },
                  { method: "Card", percentage: 20, color: "bg-purple-500" },
                  { method: "Cash", percentage: 5, color: "bg-orange-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{item.method}</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className={`${item.color} h-1.5 rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Wallet Balance</p>
                  <p className="text-lg font-semibold">₦2,456,780</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Pending Inflows</p>
                  <p className="text-lg font-semibold">₦845,230</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Pending Payouts</p>
                  <p className="text-lg font-semibold">₦1,234,560</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Upcoming Settlements</p>
                  <p className="text-lg font-semibold">₦3,456,890</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          {riskAlerts.map((alert, index) => (
            <Card
              key={index}
              className={`border-l-4 ${alert.severity === "high" ? "border-red-500 bg-red-50" : alert.severity === "medium" ? "border-yellow-500 bg-yellow-50" : "border-blue-500 bg-blue-50"}`}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield
                      className={`h-4 w-4 ${alert.severity === "high" ? "text-red-600" : alert.severity === "medium" ? "text-yellow-600" : "text-blue-600"}`}
                    />
                    <span className="text-sm">{alert.message}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Top Merchants</CardTitle>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {topMerchants.map((merchant, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white text-xs font-medium">
                      {merchant.merchant.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{merchant.merchant}</p>
                      <p className="text-xs text-gray-500">{merchant.orders} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{merchant.grossSales}</p>
                      <p className="text-xs text-gray-500">{merchant.refunds} refunds</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Recent Orders</CardTitle>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {recentOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-md flex items-center justify-center text-white text-xs font-medium">
                      {order.method.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{order.orderId}</p>
                      <p className="text-xs text-gray-500">
                        {order.merchant} • {order.customer}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{order.total}</p>
                      <div className="flex items-center space-x-1">
                        <Badge
                          variant={order.status === "completed" ? "secondary" : "outline"}
                          className={`text-xs ${order.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <CardTitle className="text-base font-medium">Delivery Costs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {deliveryData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.merchant}</p>
                      <p className="text-xs text-gray-500">{item.deliveries} deliveries</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{item.totalCost}</p>
                      <p className="text-xs text-gray-500">Avg: {item.avgCost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-green-600" />
                <CardTitle className="text-base font-medium">Active Discounts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {activeDiscounts.map((discount, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{discount.code}</p>
                      <p className="text-xs text-gray-500">
                        {discount.scope} • {discount.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{discount.redemptions}</p>
                      <p className="text-xs text-gray-500">Ends {discount.ends}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-center space-y-2 bg-transparent"
                  >
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-center">{action.title}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <CardTitle className="text-base font-medium">System Health</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {systemHealth.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
                  >
                    <p className="text-sm text-gray-700">{item.metric}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{item.value}</span>
                      <div
                        className={`w-2 h-2 rounded-full ${item.status === "good" ? "bg-green-500" : "bg-yellow-500"}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
