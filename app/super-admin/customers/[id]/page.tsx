"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MoreHorizontal, Edit, User, Circle } from "lucide-react"
import Link from "next/link"

export default function CustomerDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/super-admin/customers">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-gray-400" />
            <h1 className="text-2xl font-semibold text-gray-900">Chosneal Okwilagwe</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="more-sections">
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="more-sections">More sections</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
              <SelectItem value="addresses">Addresses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Amount spent</div>
                <div className="text-xl font-semibold text-gray-900">₦0.00</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Orders</div>
                <div className="text-xl font-semibold text-gray-900">0</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Customer since</div>
                <div className="text-xl font-semibold text-gray-900">22 days</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">RFM group</div>
                <div className="text-xl font-semibold text-gray-900">Prospects</div>
              </CardContent>
            </Card>
          </div>

          {/* Last Order Placed */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Last order placed</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded"></div>
              </div>
              <p className="text-gray-600 mb-4">This customer hasn't placed any orders yet</p>
              <Button>Create order</Button>
            </CardContent>
          </Card>

          {/* Blocks Section */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </div>
                <CardTitle className="text-lg">Blocks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                + Block
              </Button>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-medium text-white">
                    GB
                  </div>
                  <div className="flex-1">
                    <Input placeholder="Leave a comment..." className="mb-2" />
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        📎
                      </Button>
                      <Button size="sm" variant="outline">
                        😊
                      </Button>
                      <Button size="sm" variant="outline">
                        #
                      </Button>
                      <Button size="sm" variant="outline">
                        🔗
                      </Button>
                      <Button size="sm" className="ml-auto">
                        Post
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Only you and other staff can see comments</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Online Store created this customer.</p>
                      <p className="text-xs text-gray-500">11:16 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Contact information</h4>
                <p className="text-sm text-gray-600">No email address provided</p>
                <p className="text-sm text-blue-600">+234 703 884 7897</p>
                <p className="text-sm text-gray-600">Will receive notifications in English</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Default address</h4>
                <p className="text-sm text-gray-600">No address provided</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Marketing</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600">Email not subscribed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600">SMS not subscribed</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Tax details</h4>
                <p className="text-sm text-gray-600">Collect tax</p>
              </div>
            </CardContent>
          </Card>

          {/* Store Credit */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Store credit</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">No store credit</p>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Tags</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Input placeholder="Add tags..." />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
