import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Users,
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Play,
  X,
} from "lucide-react"

export default function SuperAdminDashboardV2() {
  // Demo data for OranjPay metrics
  const kpiData = [
    {
      title: "Total transactions processed",
      value: "45,892",
      change: "+12.5%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      chartColor: "stroke-blue-500",
    },
    {
      title: "Active merchants onboarded",
      value: "1,247",
      change: "+8.2%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      chartColor: "stroke-purple-500",
    },
    {
      title: "Total revenue processed",
      value: "₦2,847,920",
      change: "+15.7%",
      color: "text-green-600",
      bgColor: "bg-green-50",
      chartColor: "stroke-green-500",
    },
  ]

  const topMerchants = [
    { name: "TechHub Electronics", transactions: "2,847", revenue: "₦847,920", status: "active" },
    { name: "Fashion Forward Store", transactions: "1,923", revenue: "₦623,450", status: "active" },
    { name: "Grocery Plus Market", transactions: "1,654", revenue: "₦445,230", status: "active" },
    { name: "BookWorm Library", transactions: "1,234", revenue: "₦334,120", status: "active" },
    { name: "Coffee Corner Cafe", transactions: "987", revenue: "₦234,560", status: "active" },
  ]

  const recentTransactions = [
    { id: "TXN-8472", merchant: "TechHub Electronics", amount: "₦45,200", status: "completed", time: "2 mins ago" },
    { id: "TXN-8471", merchant: "Fashion Forward Store", amount: "₦23,450", status: "completed", time: "5 mins ago" },
    { id: "TXN-8470", merchant: "Grocery Plus Market", amount: "₦12,300", status: "pending", time: "8 mins ago" },
    { id: "TXN-8469", merchant: "BookWorm Library", amount: "₦8,750", status: "completed", time: "12 mins ago" },
    { id: "TXN-8468", merchant: "Coffee Corner Cafe", amount: "₦5,600", status: "completed", time: "15 mins ago" },
  ]

  const onboardingSteps = [
    { title: "Setup payment gateway", description: "Configure Flutterwave integration and API keys", completed: true },
    {
      title: "Add merchant verification",
      description: "Set up KYC requirements and document verification",
      completed: true,
    },
    {
      title: "Configure settlement rules",
      description: "Define payout schedules and fee structures",
      completed: false,
    },
    { title: "Enable QR code payments", description: "Activate QR code generation for merchants", completed: false },
    {
      title: "Launch merchant dashboard",
      description: "Deploy merchant-facing analytics and controls",
      completed: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with merchant selector */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option>All Merchants</option>
              <option>TechHub Electronics</option>
              <option>Fashion Forward Store</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    {index === 0 && <CreditCard className={`h-5 w-5 ${kpi.color}`} />}
                    {index === 1 && <Users className={`h-5 w-5 ${kpi.color}`} />}
                    {index === 2 && <DollarSign className={`h-5 w-5 ${kpi.color}`} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-semibold text-gray-900">{kpi.value}</span>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {kpi.change}
                      </Badge>
                    </div>
                  </div>
                </div>
                {/* Mini sparkline chart area */}
                <div className="mt-4 h-12 flex items-end space-x-1">
                  {[...Array(20)].map((_, i) => (
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

        {/* Progress Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-50">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Transaction Volume vs Limit</h3>
                  <p className="text-sm text-gray-600">Monthly processing capacity</p>
                </div>
              </div>
              <div className="flex items-center justify-center h-32">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-8 border-gray-200 border-t-orange-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-semibold">75%</div>
                      <div className="text-xs text-gray-500">Used</div>
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="text-sm text-gray-600">Available Capacity</div>
                  <div className="text-lg font-semibold">₦2.5M of ₦10M used</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-pink-50">
                    <TrendingUp className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Settlement processed vs. pending</h3>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Jan 31</span>
              </div>
              <div className="flex items-center justify-center h-32">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-8 border-gray-200 border-t-pink-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-semibold">2.1M</div>
                      <div className="text-xs text-gray-500">Processed</div>
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="text-sm text-gray-600">Pending Settlement</div>
                  <div className="text-lg font-semibold">₦450K Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Banner */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-800">
                  3 merchants require KYC verification.{" "}
                  <Button variant="link" className="p-0 h-auto text-blue-600 underline">
                    Review Merchants
                  </Button>
                </span>
              </div>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Top 5 Performing Merchants</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Showing 1-5 of 1,247 results</span>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {topMerchants.map((merchant, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      {merchant.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{merchant.name}</p>
                      <p className="text-sm text-gray-500">{merchant.transactions} transactions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{merchant.revenue}</p>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        Active
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Showing 1-5 of 45,892 results</span>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {recentTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      {transaction.merchant.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{transaction.id}</p>
                      <p className="text-sm text-gray-500">{transaction.merchant}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{transaction.amount}</p>
                      <div className="flex items-center space-x-1">
                        <Badge
                          variant={transaction.status === "completed" ? "secondary" : "outline"}
                          className={`text-xs ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{transaction.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-lg font-medium">Key Platform Setup</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {onboardingSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-500" : "bg-gray-200"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    ) : (
                      <Clock className="h-3 w-3 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-700"}`}>{step.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-sm">
                    {step.completed ? "Completed" : "Show me"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-pink-50">
                  <Play className="h-5 w-5 text-pink-600" />
                </div>
                <CardTitle className="text-lg font-medium">Getting Started</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Play className="h-6 w-6 mr-2" />
                      Play Video
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">3:24</div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Watch this video to get started quickly, or check out our{" "}
                    <Button variant="link" className="p-0 h-auto text-blue-600 underline">
                      full Getting Started guide
                    </Button>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
