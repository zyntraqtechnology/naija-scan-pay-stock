"use client"

import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, MoreHorizontal, Eye, Edit, Gift, Star } from "lucide-react"

export default function LoyaltyCustomersPage() {
  const customers = [
    {
      id: 1,
      name: "Alice Cooper",
      email: "alice@example.com",
      phone: "+234 801 234 5678",
      points: 15420,
      tier: "Platinum",
      joinDate: "Jan 15, 2024",
      lastActivity: "2 hours ago",
      totalSpent: "₦245,000",
      redemptions: 12,
      status: "active",
    },
    {
      id: 2,
      name: "Bob Martinez",
      email: "bob@example.com",
      phone: "+234 802 345 6789",
      points: 12850,
      tier: "Platinum",
      joinDate: "Feb 3, 2024",
      lastActivity: "1 day ago",
      totalSpent: "₦198,500",
      redemptions: 8,
      status: "active",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      phone: "+234 803 456 7890",
      points: 9650,
      tier: "Gold",
      joinDate: "Mar 12, 2024",
      lastActivity: "3 days ago",
      totalSpent: "₦156,200",
      redemptions: 15,
      status: "active",
    },
    {
      id: 4,
      name: "Daniel Kim",
      email: "daniel@example.com",
      phone: "+234 804 567 8901",
      points: 8420,
      tier: "Gold",
      joinDate: "Jan 28, 2024",
      lastActivity: "1 week ago",
      totalSpent: "₦134,800",
      redemptions: 6,
      status: "inactive",
    },
    {
      id: 5,
      name: "Eva Rodriguez",
      email: "eva@example.com",
      phone: "+234 805 678 9012",
      points: 7890,
      tier: "Gold",
      joinDate: "Apr 5, 2024",
      lastActivity: "5 hours ago",
      totalSpent: "₦125,600",
      redemptions: 9,
      status: "active",
    },
    {
      id: 6,
      name: "Frank Wilson",
      email: "frank@example.com",
      phone: "+234 806 789 0123",
      points: 3450,
      tier: "Silver",
      joinDate: "May 18, 2024",
      lastActivity: "2 days ago",
      totalSpent: "₦78,900",
      redemptions: 4,
      status: "active",
    },
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "bg-[#635BFF]/10 text-[#635BFF]"
      case "Gold":
        return "bg-yellow-100 text-yellow-800"
      case "Silver":
        return "bg-gray-100 text-gray-800"
      case "Bronze":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="Loyalty Customers"
        description="Manage your loyalty program members and their rewards"
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90">
              <Gift className="h-4 w-4 mr-2" />
              Award Points
            </Button>
          </div>
        }
      />

      <div className="p-4 md:p-6 space-y-6 w-full">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Star className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Members</p>
                  <p className="text-2xl font-bold">2,456</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Points</p>
                  <p className="text-2xl font-bold">4,250</p>
                </div>
                <div className="p-2 bg-[#635BFF]/10 rounded-full">
                  <Star className="h-5 w-5 text-[#635BFF]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">+156</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>View and manage all loyalty program members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search customers..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Customers Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Redemptions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
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
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-600">Joined {customer.joinDate}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{customer.email}</p>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-[#635BFF]" />
                          <span className="font-semibold text-[#635BFF]">{customer.points.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTierColor(customer.tier)}>{customer.tier}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                      <TableCell>{customer.redemptions}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{customer.lastActivity}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Gift className="h-4 w-4 mr-2" />
                              Award Points
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
