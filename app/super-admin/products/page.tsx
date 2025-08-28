"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreHorizontal, ArrowUpDown, Plus, Download, Upload, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const products = [
  {
    id: "1",
    name: "Charm Fancy Satchel Bag",
    image: "/leather-satchel-bag.png",
    status: "Active",
    inventory: "1 in stock for 5 variants",
    category: "Satchel Bags",
    channels: "1",
  },
  {
    id: "2",
    name: "Vancieef ins Bracelets",
    image: "/gold-bracelet.png",
    status: "Active",
    inventory: "19 in stock for 6 variants",
    category: "Bracelets",
    channels: "1",
  },
  {
    id: "3",
    name: "REAL GOLD PLATED BRACELETS",
    image: "/placeholder-5ak5o.png",
    status: "Active",
    inventory: "2 in stock for 3 variants",
    category: "Bracelets",
    channels: "1",
  },
  {
    id: "4",
    name: "Small Cute Tote Bag",
    image: "/small-tote-bag.png",
    status: "Active",
    inventory: "2 in stock for 2 variants",
    category: "Shopper Bags",
    channels: "1",
  },
  {
    id: "5",
    name: "Garden of eden petals necklace set",
    image: "/placeholder-7qc6m.png",
    status: "Active",
    inventory: "2 in stock for 2 variants",
    category: "Necklaces",
    channels: "1",
  },
  {
    id: "6",
    name: "Gold bracelet with diamond studs",
    image: "/sparkling-diamond-bracelet.png",
    status: "Active",
    inventory: "2 in stock for 1 variant",
    category: "Bracelets",
    channels: "1",
  },
  {
    id: "7",
    name: "LV gold Bracelet Stacked",
    image: "/stacked-bracelet.png",
    status: "Active",
    inventory: "1 in stock for 1 variant",
    category: "Bracelets",
    channels: "1",
  },
  {
    id: "8",
    name: "Stanley Cup 40oz Tumbler Cup",
    image: "/stainless-steel-tumbler.png",
    status: "Active",
    inventory: "1 in stock for 1 variant",
    category: "Tumblers",
    channels: "1",
  },
  {
    id: "9",
    name: "Cute Strawberry bag charms",
    image: "/strawberry-keychain.png",
    status: "Active",
    inventory: "6 in stock for 5 variants",
    category: "Keychains",
    channels: "1",
  },
]

export default function SuperAdminProducts() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((product) => product.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-8 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-8 bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Select defaultValue="more-actions">
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="more-actions">More actions</SelectItem>
              <SelectItem value="bulk-edit">Bulk edit</SelectItem>
              <SelectItem value="archive">Archive</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8 bg-gray-900 hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Add product
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Average sell-through rate</h3>
              <Select defaultValue="30-days">
                <SelectTrigger className="w-20 h-6 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30-days">30 days</SelectItem>
                  <SelectItem value="7-days">7 days</SelectItem>
                  <SelectItem value="90-days">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">10.76%</div>
            <div className="text-sm text-gray-500">—</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Products by days of inventory remaining</h3>
            <div className="text-sm text-gray-500">No data</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-4">ABC product analysis</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-600">NGN 0.00 A</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span className="text-sm text-gray-600">NGN 0.00 B</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                  <span className="text-sm text-gray-600">NGN 0.00 C</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="all"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="draft"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
                >
                  Draft
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
                >
                  Archived
                </TabsTrigger>
                <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              {/* Search and Filter Bar */}
              <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search products" className="pl-10 h-8 bg-white border-gray-300" />
                </div>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View as
                </Button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="w-12 p-3 text-left">
                        <Checkbox
                          checked={selectedProducts.length === products.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Product</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Status</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Inventory</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Category</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Channels</th>
                      <th className="w-12 p-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="secondary"
                            className={cn("text-xs", product.status === "Active" && "bg-green-100 text-green-800")}
                          >
                            {product.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{product.inventory}</td>
                        <td className="p-3 text-sm text-gray-600">{product.category}</td>
                        <td className="p-3 text-sm text-gray-600">{product.channels}</td>
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
              <div className="flex items-center justify-between p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    ←
                  </Button>
                  <span className="text-sm text-gray-600">1-50</span>
                  <Button variant="outline" size="sm">
                    →
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
