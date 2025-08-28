"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MoreHorizontal, ArrowUpDown, Plus, Download } from "lucide-react"
import Link from "next/link"

const customers = [
  {
    id: "1",
    name: "Chosneal Okwilagwe",
    email: "",
    emailSubscription: "",
    location: "",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "2",
    name: "Ehinomen Ewaiefoh",
    email: "",
    emailSubscription: "Not subscribed",
    location: "Jahi FC, Nigeria",
    orders: "1 order",
    amountSpent: "₦79,916.75",
  },
  {
    id: "3",
    name: "Amelia James",
    email: "",
    emailSubscription: "Not subscribed",
    location: "",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "4",
    name: "chiommy Chiommy",
    email: "",
    emailSubscription: "Not subscribed",
    location: "ikeja LA, Nigeria",
    orders: "1 order",
    amountSpent: "₦24,500.00",
  },
  {
    id: "5",
    name: "Ati Luper",
    email: "",
    emailSubscription: "Not subscribed",
    location: "Markurdi-Wurukum BE, Nigeria",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "6",
    name: "Aisha Salau",
    email: "",
    emailSubscription: "",
    location: "Lagos LA, Nigeria",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "7",
    name: "Homa Jo-ella",
    email: "",
    emailSubscription: "Not subscribed",
    location: "port harcourt RI, Nigeria",
    orders: "1 order",
    amountSpent: "₦13,000.00",
  },
  {
    id: "8",
    name: "+234 813 975 3991",
    email: "",
    emailSubscription: "",
    location: "LA, Nigeria",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "9",
    name: "Ekeh Chiderah",
    email: "",
    emailSubscription: "Not subscribed",
    location: "Onitsha AN, Nigeria",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "10",
    name: "Gifty Nwachukwu",
    email: "",
    emailSubscription: "Not subscribed",
    location: "Lagos LA, Nigeria",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "11",
    name: "Cynthia Ekeh",
    email: "",
    emailSubscription: "",
    location: "Asaba DE, Nigeria",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "12",
    name: "+234 903 876 7010",
    email: "",
    emailSubscription: "",
    location: "FC, Nigeria",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "13",
    name: "Frances~riana",
    email: "",
    emailSubscription: "Not subscribed",
    location: "DE, Nigeria",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
  {
    id: "14",
    name: "adedayoiretomiwa@gmail.com",
    email: "",
    emailSubscription: "Not subscribed",
    location: "AB, Nigeria",
    orders: "0 orders",
    amountSpent: "₦0.00",
  },
]

export default function SuperAdminCustomers() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(customers.map((customer) => customer.id))
    } else {
      setSelectedCustomers([])
    }
  }

  const handleSelectCustomer = (customerId: string, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId])
    } else {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-8 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-8 bg-transparent">
            Import
          </Button>
          <Button size="sm" className="h-8 bg-gray-900 hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Add customer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6">
        <div>
          <span className="text-2xl font-semibold text-gray-900">24</span>
          <span className="text-gray-600 ml-2">customers</span>
        </div>
        <div className="text-sm text-gray-600">100% of your customer base</div>
      </div>

      {/* Customers Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          {/* Search and Filter Bar */}
          <div className="flex items-center gap-4 p-4 border-b border-gray-200">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search customers" className="pl-10 h-8 bg-white border-gray-300" />
            </div>
            <Select defaultValue="add-filter">
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add-filter">Add filter</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="spent">Amount spent</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              <ArrowUpDown className="h-4 w-4 mr-2" />
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 p-3 text-left">
                    <Checkbox
                      checked={selectedCustomers.length === customers.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">Customer name</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">Email subscription</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">Location</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">Orders</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">Amount spent</th>
                  <th className="w-12 p-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedCustomers.includes(customer.id)}
                        onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked as boolean)}
                      />
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/super-admin/customers/${customer.id}`}
                        className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        {customer.name}
                      </Link>
                    </td>
                    <td className="p-3">
                      {customer.emailSubscription && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          {customer.emailSubscription}
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 text-sm text-gray-600">{customer.location}</td>
                    <td className="p-3 text-sm text-gray-600">{customer.orders}</td>
                    <td className="p-3 text-sm font-medium text-gray-900">{customer.amountSpent}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center p-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">1-24</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
