"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, QrCode, Building, Check, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const availableBanks = [
  { id: "gtbank", name: "GTBank", code: "058", logo: "/gtbank-logo-abstract.png" },
  { id: "firstbank", name: "First Bank", code: "011", logo: "/abstract-geometric-logo.png" },
  { id: "access", name: "Access Bank", code: "044", logo: "/abstract-geometric-logo.png" },
  { id: "zenith", name: "Zenith Bank", code: "057", logo: "/abstract-geometric-logo.png" },
  { id: "uba", name: "UBA", code: "033", logo: "/abstract-geometric-logo.png" },
  { id: "wema", name: "Wema Bank", code: "035", logo: "/wema-bank-logo-abstract.png" },
  { id: "sterling", name: "Sterling Bank", code: "232", logo: "/sterling-bank-abstract.png" },
  { id: "fidelity", name: "Fidelity Bank", code: "070", logo: "/stylized-financial-institution-logo.png" },
]

export default function QRConfigurePage() {
  const router = useRouter()
  const [selectedBank, setSelectedBank] = useState<string>("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)
  const [qrExpiry, setQrExpiry] = useState("15")
  const [autoRefresh, setAutoRefresh] = useState(true)

  const handleAccountNumberChange = async (value: string) => {
    setAccountNumber(value)
    setAccountName("")
    setIsVerified(false)

    if (value.length === 10 && selectedBank) {
      setIsVerifying(true)
      // Simulate API call to verify account
      setTimeout(() => {
        setAccountName("John Doe Business Account") // Mock response
        setIsVerified(true)
        setIsVerifying(false)
      }, 1500)
    }
  }

  const handleSave = () => {
    // Save configuration logic here
    router.push("/admin/payments")
  }

  const selectedBankData = availableBanks.find((bank) => bank.id === selectedBank)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configure QR Code Payment</h2>
          <p className="text-muted-foreground">Set up your bank account for QR code payments</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Bank Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Select Your Bank
              </CardTitle>
              <CardDescription>Choose the bank where you want to receive QR code payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {availableBanks.map((bank) => (
                  <div
                    key={bank.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedBank === bank.id ? "border-[#8B5CF6] bg-purple-50" : "hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedBank(bank.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={bank.logo || "/placeholder.svg"} alt={bank.name} className="w-8 h-8 rounded" />
                        <div>
                          <div className="font-medium">{bank.name}</div>
                          <div className="text-sm text-muted-foreground">Code: {bank.code}</div>
                        </div>
                      </div>
                      {selectedBank === bank.id && (
                        <div className="p-1 bg-[#8B5CF6] rounded-full">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedBank && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>Selected:</strong> {selectedBankData?.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Details */}
          {selectedBank && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Account Details
                </CardTitle>
                <CardDescription>Enter your account number to verify your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter your 10-digit account number"
                    value={accountNumber}
                    onChange={(e) => handleAccountNumberChange(e.target.value)}
                    maxLength={10}
                    disabled={isVerifying}
                  />
                  {isVerifying && <p className="text-sm text-blue-600">Verifying account details...</p>}
                </div>

                {accountName && (
                  <div className="space-y-2">
                    <Label>Account Name</Label>
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">{accountName}</span>
                      {isVerified && <Check className="h-4 w-4 text-green-600 ml-auto" />}
                    </div>
                  </div>
                )}

                {isVerified && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Account verified successfully!</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">QR code payments will be credited to this account.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* QR Code Settings */}
          {isVerified && (
            <Card>
              <CardHeader>
                <CardTitle>QR Code Settings</CardTitle>
                <CardDescription>Configure how QR codes behave for your customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Enable QR Code Payments</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to pay using QR codes</p>
                  </div>
                  <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry">QR Code Expiry Time (minutes)</Label>
                  <Select value={qrExpiry} onValueChange={setQrExpiry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    QR codes will automatically expire after this time for security
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Auto-refresh QR Codes</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically generate new QR codes when they expire
                    </p>
                  </div>
                  <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Preview
              </CardTitle>
              <CardDescription>How customers will see the QR payment option</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3">
                      <QrCode className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">Scan to Pay</p>
                    <p className="text-xs text-muted-foreground">₦2,500.00</p>
                  </div>
                </div>

                {selectedBankData && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Payment Bank:</p>
                    <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                      <img
                        src={selectedBankData.logo || "/placeholder.svg"}
                        alt={selectedBankData.name}
                        className="w-6 h-6 rounded"
                      />
                      <Badge variant="secondary" className="text-xs">
                        {selectedBankData.name}
                      </Badge>
                    </div>
                  </div>
                )}

                {isVerified && (
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Account: {accountName}</p>
                    <p>• Expires in {qrExpiry} minutes</p>
                    <p>• {autoRefresh ? "Auto-refreshes" : "Manual refresh required"}</p>
                    <p>• {isEnabled ? "Currently enabled" : "Currently disabled"}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {isVerified && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">Ready to Go!</h4>
                    <p className="text-sm text-green-800">
                      Your QR code payment system is configured and ready to accept payments.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={handleSave} disabled={!isVerified}>
          Save Configuration
        </Button>
      </div>
    </div>
  )
}
