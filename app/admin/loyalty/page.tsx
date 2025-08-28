"use client"

import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Gift,
  TrendingUp,
  Star,
  Award,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Crown,
  Zap,
  Target,
  BarChart2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export default function LoyaltyProgramPage() {
  const loyaltyStats = [
    {
      title: "Active Members",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Points Issued",
      value: "156,420",
      change: "+8.2%",
      icon: Star,
      color: "text-[#635BFF]",
      bgColor: "bg-[#635BFF]/10",
    },
    {
      title: "Rewards Redeemed",
      value: "1,234",
      change: "+15.3%",
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Program Revenue",
      value: "₦2.4M",
      change: "+22.1%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const recentRedemptions = [
    {
      id: 1,
      customer: "Sarah Johnson",
      reward: "10% Off Next Purchase",
      points: 500,
      date: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      customer: "Michael Chen",
      reward: "Free Coffee",
      points: 200,
      date: "4 hours ago",
      status: "completed",
    },
    {
      id: 3,
      customer: "Emma Wilson",
      reward: "Free Delivery",
      points: 300,
      date: "6 hours ago",
      status: "pending",
    },
    {
      id: 4,
      customer: "David Brown",
      reward: "₦500 Store Credit",
      points: 1000,
      date: "1 day ago",
      status: "completed",
    },
  ]

  const loyaltyTiers = [
    {
      name: "Bronze",
      members: 1847,
      minPoints: 0,
      maxPoints: 999,
      benefits: ["1x Points", "Birthday Reward"],
      color: "bg-amber-100 text-amber-800",
      icon: Target,
    },
    {
      name: "Silver",
      members: 756,
      minPoints: 1000,
      maxPoints: 4999,
      benefits: ["1.5x Points", "Free Delivery", "Early Access"],
      color: "bg-gray-100 text-gray-800",
      icon: Award,
    },
    {
      name: "Gold",
      members: 244,
      minPoints: 5000,
      maxPoints: 9999,
      benefits: ["2x Points", "Priority Support", "Exclusive Offers"],
      color: "bg-yellow-100 text-yellow-800",
      icon: Crown,
    },
    {
      name: "Platinum",
      members: 47,
      minPoints: 10000,
      maxPoints: null,
      benefits: ["3x Points", "Personal Shopper", "VIP Events"],
      color: "bg-[#635BFF]/10 text-[#635BFF]",
      icon: Zap,
    },
  ]

  const topCustomers = [
    { name: "Alice Cooper", points: 15420, tier: "Platinum", spent: "₦245,000" },
    { name: "Bob Martinez", points: 12850, tier: "Platinum", spent: "₦198,500" },
    { name: "Carol Davis", points: 9650, tier: "Gold", spent: "₦156,200" },
    { name: "Daniel Kim", points: 8420, tier: "Gold", spent: "₦134,800" },
    { name: "Eva Rodriguez", points: 7890, tier: "Gold", spent: "₦125,600" },
  ]

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="Loyalty Program"
        description="Manage your customer loyalty program and rewards"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/loyalty/analytics">
                <BarChart2 className="h-4 w-4 mr-2" />
                Analytics
              </Link>
            </Button>
            <Button asChild className="bg-[#635BFF] hover:bg-[#635BFF]/90">
              <Link href="/admin/loyalty/rewards/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Reward
              </Link>
            </Button>
          </div>
        }
      />

      <div className="p-4 md:p-6 space-y-6 w-full">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loyaltyStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Loyalty Tiers */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#635BFF]" />
                  Loyalty Tiers
                </CardTitle>
                <CardDescription>Manage your customer loyalty tiers and benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loyaltyTiers.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-gray-100">
                        <tier.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{tier.name}</h3>
                          <Badge className={tier.color}>{tier.members} members</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {tier.minPoints}
                          {tier.maxPoints ? ` - ${tier.maxPoints}` : "+"} points
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tier.benefits.map((benefit, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Top Customers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#635BFF]" />
                Top Customers
              </CardTitle>
              <CardDescription>Highest point earners this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-[#635BFF] to-purple-600 text-white text-xs">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{customer.name}</p>
                      <p className="text-xs text-gray-600">{customer.points.toLocaleString()} points</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        customer.tier === "Platinum"
                          ? "bg-[#635BFF]/10 text-[#635BFF]"
                          : customer.tier === "Gold"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {customer.tier}
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">{customer.spent}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-[#635BFF]" />
              Recent Redemptions
            </CardTitle>
            <CardDescription>Latest reward redemptions from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRedemptions.map((redemption) => (
                <div key={redemption.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {redemption.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{redemption.customer}</p>
                      <p className="text-sm text-gray-600">{redemption.reward}</p>
                      <p className="text-xs text-gray-500">{redemption.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-[#635BFF]">-{redemption.points} pts</p>
                      <Badge
                        className={
                          redemption.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {redemption.status}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-[#635BFF] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Manage Customers</h3>
              <p className="text-sm text-gray-600 mb-4">View and manage loyalty program members</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/loyalty/customers">View Customers</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Gift className="h-8 w-8 text-[#635BFF] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Rewards Catalog</h3>
              <p className="text-sm text-gray-600 mb-4">Create and manage available rewards</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/loyalty/rewards">Manage Rewards</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <BarChart2 className="h-8 w-8 text-[#635BFF] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Program Analytics</h3>
              <p className="text-sm text-gray-600 mb-4">Track performance and engagement</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/loyalty/analytics">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
