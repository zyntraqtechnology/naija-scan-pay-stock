"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreHorizontal, ArrowUpDown, Plus, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const orderMetrics = [
  { label: "Orders", value: "0", change: "—" },
  { label: "Items ordered", value: "0", change: "—" },
  { label: "Returns", value: "NGN 0", change: "—" },
  { label: "Orders fulfilled", value: "0", change: "—" },
  { label: "Orders delivered", value: "0", change: "—" },
  { label: "Order to fulfill", value: "0", change: "—" },
]

const orders = [
  {
    id: "#1008GY",
    date: "Aug 12 at 10:05 pm",
    customer: "Ehinomen Ewaiefoh",
    channel: "Online Store",
    total: "₦79,916.75",
    paymentStatus: "Paid",
    fulfillmentStatus: "Fulfilled",
    items: "11 items",
    deliveryStatus: "Agungi, Chevron, Idado, Igboe...",
    deliveryMethod: "Standard",
  },
  {
    id: "#1007GY",
    date: "Aug 6 at 4:42 pm",
    customer: "chiommy Chiommy",
    channel: "Online Store",
    total: "₦24,500.00",
    paymentStatus: "Paid",
    fulfillmentStatus: "Unfulfilled",
    items: "1 item",
    deliveryStatus: "Badore, Ado Road",
    deliveryMethod: "Standard",
  },
  {
    id: "#1006GY",
    date: "Jul 31 at 7:45 am",
    customer: "Homa Jo-ella",
    channel: "Online Store",
    total: "₦13,000.00",
    paymentStatus: "Paid",
    fulfillmentStatus: "Unfulfilled",
    items: "1 item",
    deliveryStatus: "Badore, Ado Road",
    deliveryMethod: "Standard",
  },
  {
    id: "#1005GY",
    date: "Jul 30 at 11:01 am",
    customer: "Stephanie Pever",
    channel: "Online Store",
    total: "₦27,000.00",
    paymentStatus: "Paid",
    fulfillmentStatus: "Unfulfilled",
    items: "2 items",
    deliveryStatus: "EVERY STATE ACROSS NIGERIA OU...",
    deliveryMethod: "Standard",
  },
  {
    id: "#1004GY",
    date: "Jul 30 at 10:58 am",
    customer: "Kwaghga Mimi",
    channel: "Online Store",
    total: "₦39,250.00",
    paymentStatus: "Paid",
    fulfillmentStatus: "Fulfilled",
    items: "2 items",
    deliveryStatus: "EVERY STATE ACROSS NIGERIA OU...",
    deliveryMethod: "Standard",
  },
  {
    id: "#1003GY",
    date: "Jul 14 at 1:32 pm",
    customer: "Jay Ejiofobiri",
    channel: "Online Store",
    total: "₦31,525.00",
    paymentStatus: "Paid",
    fulfillmentStatus: "Fulfilled",
    items: "4 items",
    deliveryStatus: "Ikota, VGC, Orchid, Mega Chic...",
    deliveryMethod: "Standard",
  },
  {
    id: "#1002GY",
    date: "Jul 11 at 2:45 pm",
    customer: "Jay Ejiofobiri",
    channel: "Online Store",
    total: "₦23,785.00",
    paymentStatus: "Paid",
    fulfillmentStatus: "Fulfilled",
    items: "4 items",
    deliveryStatus: "Ikota, VGC, Orchid, Mega Chic...",
    deliveryMethod: "Standard",
  },
  {
    id: "#1001GY",
    date: "May 20 at 9:26 am",
    customer: "Glory Pever",
    channel: "Online Store",
    total: "₦0.00",
    paymentStatus: "Paid",
    fulfillmentStatus: "Unfulfilled",
    items: "0 items",
    deliveryStatus: "Lagos Island, Marina",
    deliveryMethod: "Standard",
  },
]

export default function SuperAdminOrders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map((order) => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  return (
    <div className="p-6 space-y-6 bg-[#fafafa] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">Orders</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-white border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb] shadow-sm"
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
              <SelectItem value="bulk-edit">Bulk edit</SelectItem>
              <SelectItem value="archive">Archive</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8 bg-[#111827] hover:bg-[#1f2937] text-white rounded-md px-3 font-medium">
            Create order
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {orderMetrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-sm text-[#6b7280] mb-1 font-medium">{metric.label}</div>
            <div className="text-2xl font-semibold text-[#111827] mb-1">{metric.value}</div>
            <div className="text-sm text-[#9ca3af]">{metric.change}</div>
            <div className="w-full bg-[#e5e7eb] rounded-full h-1 mt-2">
              <div className="bg-[#3b82f6] h-1 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="bg-white border border-[#e5e7eb] shadow-sm rounded-lg">
        <CardContent className="p-0">
          {/* Filter Tabs */}
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
                  value="unfulfilled"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#111827] data-[state=active]:bg-transparent text-[#374151] data-[state=active]:text-[#111827] font-medium"
                >
                  Unfulfilled
                </TabsTrigger>
                <TabsTrigger
                  value="unpaid"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#111827] data-[state=active]:bg-transparent text-[#374151] data-[state=active]:text-[#111827] font-medium"
                >
                  Unpaid
                </TabsTrigger>
                <TabsTrigger
                  value="open"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#111827] data-[state=active]:bg-transparent text-[#374151] data-[state=active]:text-[#111827] font-medium"
                >
                  Open
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#111827] data-[state=active]:bg-transparent text-[#374151] data-[state=active]:text-[#111827] font-medium"
                >
                  Archived
                </TabsTrigger>
                <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0 hover:bg-[#f9fafb]">
                  <Plus className="h-4 w-4" />
                </Button>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              {/* Search and Filter Bar */}
              <div className="flex items-center gap-4 p-4 border-b border-[#e5e7eb]">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
                  <Input
                    placeholder="Search orders"
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

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                    <tr>
                      <th className="w-12 p-3 text-left">
                        <Checkbox checked={selectedOrders.length === orders.length} onCheckedChange={handleSelectAll} />
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Order</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Date</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Customer</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Channel</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Total</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Payment status</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Fulfillment status</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Items</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Delivery status</th>
                      <th className="p-3 text-left text-sm font-medium text-[#6b7280]">Delivery method</th>
                      <th className="w-12 p-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3f4f6]">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#f9fafb] transition-colors">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#2563eb] hover:text-[#1d4ed8] cursor-pointer">
                              {order.id}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">{order.date}</td>
                        <td className="p-3 text-sm text-[#111827] font-medium">{order.customer}</td>
                        <td className="p-3 text-sm text-[#6b7280]">{order.channel}</td>
                        <td className="p-3 text-sm font-medium text-[#111827]">{order.total}</td>
                        <td className="p-3">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs font-medium",
                              order.paymentStatus === "Paid" && "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]",
                            )}
                          >
                            ● {order.paymentStatus}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs font-medium",
                              order.fulfillmentStatus === "Fulfilled" && "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]",
                              order.fulfillmentStatus === "Unfulfilled" &&
                                "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
                            )}
                          >
                            {order.fulfillmentStatus === "Unfulfilled" && "⚠ "}
                            {order.fulfillmentStatus}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">{order.items}</td>
                        <td className="p-3 text-sm text-[#6b7280] max-w-48 truncate">{order.deliveryStatus}</td>
                        <td className="p-3 text-sm text-[#6b7280]">{order.deliveryMethod}</td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#f3f4f6]">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center p-4 border-t border-[#e5e7eb]">
                <p className="text-sm text-[#6b7280]">
                  Learn more about{" "}
                  <a href="#" className="text-[#2563eb] hover:text-[#1d4ed8] font-medium">
                    orders
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
