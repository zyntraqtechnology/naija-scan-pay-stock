"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ArrowUpDown, Plus, Download, Upload } from "lucide-react"
import Image from "next/image"

const inventoryItems = [
  {
    id: "1",
    name: "18k titanium bow necklace",
    variant: "18k big bow",
    image: "/placeholder.svg",
    sku: "No SKU",
    unavailable: 0,
    committed: 0,
    available: 1,
    onHand: 1,
  },
  {
    id: "2",
    name: "18k titanium bow necklace",
    variant: "18k small bow",
    image: "/placeholder.svg",
    sku: "No SKU",
    unavailable: 0,
    committed: 0,
    available: 1,
    onHand: 1,
  },
  {
    id: "3",
    name: "Aura loop Gold ring",
    variant: "7",
    image: "/placeholder.svg",
    sku: "No SKU",
    unavailable: 0,
    committed: 0,
    available: 0,
    onHand: 0,
  },
  {
    id: "4",
    name: "Aura loop Gold ring",
    variant: "8",
    image: "/placeholder.svg",
    sku: "No SKU",
    unavailable: 0,
    committed: 0,
    available: 0,
    onHand: 0,
  },
  {
    id: "5",
    name: "Aura loop Gold ring",
    variant: "9",
    image: "/placeholder.svg",
    sku: "No SKU",
    unavailable: 0,
    committed: 0,
    available: 0,
    onHand: 0,
  },
  {
    id: "6",
    name: "Aura loop Gold ring",
    variant: "10",
    image: "/placeholder.svg",
    sku: "No SKU",
    unavailable: 0,
    committed: 0,
    available: 0,
    onHand: 0,
  },
  {
    id: "7",
    name: "Baroque Pearl Crest Cuff",
    variant: "Gold",
    image: "/placeholder.svg",
    sku: "No SKU",
    unavailable: 0,
    committed: 0,
    available: 1,
    onHand: 1,
  },
  {
    id: "8",
    name: "Blush Bloom Ring",
    variant: "7",
    image: "/placeholder.svg",
    sku: "No SKU",
    unavailable: 0,
    committed: 0,
    available: 0,
    onHand: 0,
  },
  {
    id: "9",
    name: "Blush Bloom Ring",
    variant: "8",
    image: "/placeholder.svg",
    sku: "No SKU",
    unavailable: 0,
    committed: 0,
    available: 0,
    onHand: 0,
  },
]

export default function SuperAdminInventory() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [inventoryData, setInventoryData] = useState(inventoryItems)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(inventoryData.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId])
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    }
  }

  const handleQuantityChange = (itemId: string, field: "available" | "onHand", value: string) => {
    const numValue = Number.parseInt(value) || 0
    setInventoryData((prev) => prev.map((item) => (item.id === itemId ? { ...item, [field]: numValue } : item)))
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
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
        </div>
      </div>

      {/* Inventory Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="all"
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
                >
                  All
                </TabsTrigger>
                <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              {/* Search and Filter Bar */}
              <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search inventory" className="pl-10 h-8 bg-white border-gray-300" />
                </div>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>

              {/* Inventory Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="w-12 p-3 text-left">
                        <Checkbox
                          checked={selectedItems.length === inventoryData.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Product</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">SKU</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Unavailable</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Committed</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Available</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">On hand</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {inventoryData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-600">{item.variant}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{item.sku}</td>
                        <td className="p-3 text-sm text-gray-600">{item.unavailable}</td>
                        <td className="p-3 text-sm text-gray-600">{item.committed}</td>
                        <td className="p-3">
                          <Input
                            type="number"
                            value={item.available}
                            onChange={(e) => handleQuantityChange(item.id, "available", e.target.value)}
                            className="w-16 h-8 text-center border-gray-300"
                            min="0"
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            value={item.onHand}
                            onChange={(e) => handleQuantityChange(item.id, "onHand", e.target.value)}
                            className="w-16 h-8 text-center border-gray-300"
                            min="0"
                          />
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
