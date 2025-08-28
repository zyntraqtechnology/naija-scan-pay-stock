"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MoreHorizontal, Printer, Edit, MapPin, Package, CreditCard } from "lucide-react"
import Link from "next/link"

export default function OrderDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/super-admin/orders">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900">#{params.id}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ● Paid
            </Badge>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              ⚠ Unfulfilled
            </Badge>
          </div>
          <span className="text-sm text-gray-600">August 6, 2025 at 4:42 pm from Online Store</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Refund
          </Button>
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  ⚠ Unfulfilled
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">Badore, Ado Road</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <h3 className="font-medium text-gray-900">Garden of Eden Set</h3>
                    <p className="text-sm text-gray-600">Gold</p>
                    <p className="text-xs text-gray-500 font-mono">
                      _essential_preorder_campaign_id: 0344033b-7398-43f0-957d-8289778e6d5d
                    </p>
                    <p className="text-xs text-gray-500">Note: Preorder</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600">₦20,000.00</span>
                    <span className="text-gray-400">×</span>
                    <span className="text-gray-600">1</span>
                    <span className="font-medium">₦20,000.00</span>
                  </div>
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
                    Fulfill item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <CardTitle className="text-lg">Paid</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>1 item</span>
                <span className="font-medium">₦20,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-sm text-gray-500">Badore, Ado Road (0.0 kg; Items 0.0 kg, Package 0.0 kg)</span>
                <span className="font-medium">₦3,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span className="text-sm text-gray-500">VAT 7.5%</span>
                <span className="font-medium">₦1,500.00</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₦24,500.00</span>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-medium">
                  <span>Paid</span>
                  <span>₦24,500.00</span>
                </div>
              </div>
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
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
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
                      <Package className="h-3 w-3 text-white" />
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
          {/* Notes */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Notes</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add notes about this order..."
                className="min-h-24"
                defaultValue="please ma help me and add a note on it
Congratulations on reaching 17 million followers
This is a small token from my heart to celebrate this big moment with you I really love you, and I'm genuinely happy to call you my fave.

With love,
Bestie Boy (from TikTok)
Proud Speedometer member 💜"
              />
            </CardContent>
          </Card>

          {/* Customer */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Customer</CardTitle>
              <Button variant="ghost" size="sm">
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-blue-600">chiommy Chiommy</p>
                <p className="text-sm text-gray-600">1 order</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Contact information</h4>
                <p className="text-sm text-blue-600">peaceokechwu929@gmail.com</p>
                <p className="text-sm text-gray-600">No phone number</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Shipping address</h4>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  <p>chiommy Chiommy</p>
                  <p>lagos</p>
                  <p>ikeja LA</p>
                  <p>Nigeria</p>
                  <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                    View map
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Billing address</h4>
                <p className="text-sm text-gray-600">No billing address provided</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
