"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, QrCode, Wallet, Smartphone, Building, Nfc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const paymentMethods = [
  {
    id: "cash",
    name: "Cash Payment",
    description: "Traditional cash handling - no configuration required",
    icon: <Wallet className="h-8 w-8" />,
    color: "bg-green-100 text-green-600",
    available: true,
    configRequired: false,
  },
  {
    id: "card",
    name: "Card Payment",
    description: "Credit and debit card processing via POS terminal",
    icon: <CreditCard className="h-8 w-8" />,
    color: "bg-blue-100 text-blue-600",
    available: true,
    configRequired: false,
  },
  {
    id: "qr",
    name: "QR Code Payment",
    description: "Mobile payments via QR code scanning",
    icon: <QrCode className="h-8 w-8" />,
    color: "bg-purple-100 text-purple-600",
    available: true,
    configRequired: true,
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    description: "Direct bank account transfers",
    icon: <Building className="h-8 w-8" />,
    color: "bg-indigo-100 text-indigo-600",
    available: true,
    configRequired: true,
  },
  {
    id: "ussd",
    name: "USSD Payment",
    description: "Mobile money via USSD codes",
    icon: <Smartphone className="h-8 w-8" />,
    color: "bg-orange-100 text-orange-600",
    available: true,
    configRequired: true,
  },
  {
    id: "tap-to-pay",
    name: "Tap to Pay",
    description: "Contactless NFC payments",
    icon: <Nfc className="h-8 w-8" />,
    color: "bg-teal-100 text-teal-600",
    available: true,
    configRequired: true,
  },
]

export default function AddPaymentMethodPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const handleMethodSelect = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId)
    if (!method?.available) return

    if (method.configRequired) {
      router.push(`/admin/payments/${methodId}/configure`)
    } else {
      // For cash and card, just enable them directly
      router.push("/admin/payments?enabled=" + methodId)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add Payment Method</h2>
          <p className="text-muted-foreground">Choose a payment method to add to your store</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              !method.available ? "opacity-50 cursor-not-allowed" : ""
            } ${selectedMethod === method.id ? "ring-2 ring-[#8B5CF6]" : ""}`}
            onClick={() => method.available && handleMethodSelect(method.id)}
          >
            <CardHeader className="text-center pb-2">
              <div className={`mx-auto p-4 rounded-full w-fit ${method.color}`}>{method.icon}</div>
              <CardTitle className="text-lg">{method.name}</CardTitle>
              <CardDescription className="text-sm">{method.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {method.configRequired ? (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Configuration Required
                    </span>
                  ) : (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ready to Use</span>
                  )}
                </div>
                {!method.available && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Coming Soon</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Need Help Choosing?</h3>
              <p className="text-blue-800 text-sm mb-3">
                Different payment methods work better for different types of businesses. Here's what we recommend:
              </p>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>
                  • <strong>Cash & Card:</strong> Essential for all retail businesses
                </li>
                <li>
                  • <strong>QR Code:</strong> Great for tech-savvy customers and contactless payments
                </li>
                <li>
                  • <strong>Bank Transfer:</strong> Perfect for high-value transactions
                </li>
                <li>
                  • <strong>USSD:</strong> Ideal for areas with limited smartphone adoption
                </li>
                <li>
                  • <strong>Tap to Pay:</strong> Modern contactless experience
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
