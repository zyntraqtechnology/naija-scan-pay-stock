"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Nfc,
  RefreshCw,
  Save,
  Settings,
  ShieldCheck,
  Wifi,
  WifiOff,
  XCircle,
} from "lucide-react"
import Link from "next/link"

export default function TapToPayConfigurePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("hardware")
  const [terminalConnected, setTerminalConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [connectionProgress, setConnectionProgress] = useState(0)
  const [selectedTerminal, setSelectedTerminal] = useState("verifone")
  const [testingMode, setTestingMode] = useState(false)
  const [testingInProgress, setTestingInProgress] = useState(false)
  const [testResult, setTestResult] = useState<"success" | "failure" | null>(null)

  // Payment method toggles
  const [visaEnabled, setVisaEnabled] = useState(true)
  const [mastercardEnabled, setMastercardEnabled] = useState(true)
  const [applePayEnabled, setApplePayEnabled] = useState(true)
  const [googlePayEnabled, setGooglePayEnabled] = useState(true)
  const [samsungPayEnabled, setSamsungPayEnabled] = useState(false)
  const [verveEnabled, setVerveEnabled] = useState(true)

  // Security settings
  const [singleTransactionLimit, setSingleTransactionLimit] = useState("50000")
  const [dailyTransactionLimit, setDailyTransactionLimit] = useState("500000")
  const [requirePinAbove, setRequirePinAbove] = useState("10000")
  const [fraudDetectionEnabled, setFraudDetectionEnabled] = useState(true)

  const terminals = [
    { id: "verifone", name: "Verifone P400", description: "Popular NFC-enabled terminal" },
    { id: "ingenico", name: "Ingenico Move/5000", description: "Advanced contactless terminal" },
    { id: "pax", name: "PAX A920", description: "Android-based smart terminal" },
    { id: "square", name: "Square Terminal", description: "All-in-one payment terminal" },
  ]

  const handleConnectTerminal = () => {
    setConnecting(true)
    setConnectionProgress(0)

    const interval = setInterval(() => {
      setConnectionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setConnecting(false)
          setTerminalConnected(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleDisconnectTerminal = () => {
    setTerminalConnected(false)
    setConnectionProgress(0)
  }

  const handleTestTransaction = () => {
    setTestingInProgress(true)
    setTestResult(null)

    // Simulate a test transaction
    setTimeout(() => {
      setTestingInProgress(false)
      setTestResult(Math.random() > 0.2 ? "success" : "failure")
    }, 3000)
  }

  const handleSaveSettings = () => {
    // Save settings logic would go here
    router.push("/admin/payments")
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="NFC/Tap to Pay Configuration"
        description="Configure contactless payment settings for your terminals"
        breadcrumb={[
          { title: "Payments", href: "/admin/payments" },
          { title: "Tap to Pay Configuration", href: "/admin/payments/tap-to-pay/configure" },
        ]}
      />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin/payments" passHref>
              <Button variant="outline" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Payments
              </Button>
            </Link>
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">
              {terminalConnected ? "Terminal Connected" : "Terminal Disconnected"}
            </Badge>
          </div>
          <Button onClick={handleSaveSettings} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <Save className="mr-2 h-4 w-4" />
            Save Configuration
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="hardware" className="flex items-center gap-2">
              <Nfc className="h-4 w-4" />
              <span>Hardware Setup</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment Settings</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Security & Limits</span>
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Testing & Monitoring</span>
            </TabsTrigger>
          </TabsList>

          {/* Hardware Setup Tab */}
          <TabsContent value="hardware" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Nfc className="mr-2 h-5 w-5 text-teal-600" />
                  Terminal Selection
                </CardTitle>
                <CardDescription>Select and connect your NFC-enabled payment terminal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {terminals.map((terminal) => (
                    <div
                      key={terminal.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedTerminal === terminal.id
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTerminal(terminal.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-teal-100 rounded-lg">
                            <Nfc className="h-5 w-5 text-teal-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{terminal.name}</h3>
                            <p className="text-sm text-muted-foreground">{terminal.description}</p>
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full ${
                            selectedTerminal === terminal.id ? "bg-teal-500" : "bg-gray-200"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Connection Status</h3>
                      <p className="text-sm text-muted-foreground">
                        {terminalConnected
                          ? "Terminal is connected and ready to accept payments"
                          : "Terminal is disconnected"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {terminalConnected ? (
                        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          Disconnected
                        </Badge>
                      )}
                    </div>
                  </div>

                  {connecting && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Connecting to terminal...</span>
                        <span className="text-sm font-medium">{connectionProgress}%</span>
                      </div>
                      <Progress value={connectionProgress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">NFC Module</h3>
                      <p className="text-sm text-muted-foreground">
                        {terminalConnected ? "NFC module is active" : "NFC module is inactive"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {terminalConnected ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Signal Strength</h3>
                      <p className="text-sm text-muted-foreground">
                        {terminalConnected ? "Excellent signal strength" : "No signal"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {terminalConnected ? (
                        <Wifi className="h-5 w-5 text-green-600" />
                      ) : (
                        <WifiOff className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {terminalConnected ? (
                  <Button variant="outline" onClick={handleDisconnectTerminal}>
                    Disconnect Terminal
                  </Button>
                ) : (
                  <Button
                    onClick={handleConnectTerminal}
                    disabled={connecting}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {connecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {connecting ? "Connecting..." : "Connect Terminal"}
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common terminal management actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" disabled={!terminalConnected} className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Terminal Settings
                  </Button>
                  <Button variant="outline" disabled={!terminalConnected} className="justify-start">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Security Check
                  </Button>
                  <Button variant="outline" disabled={!terminalConnected} className="justify-start">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restart Terminal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-teal-600" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Configure which contactless payment methods to accept</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-blue-600"
                        >
                          <rect width="18" height="14" x="3" y="5" rx="2" />
                          <path d="M3 10h18" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Visa</h3>
                        <p className="text-sm text-muted-foreground">Accept Visa contactless cards</p>
                      </div>
                    </div>
                    <Switch checked={visaEnabled} onCheckedChange={setVisaEnabled} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-red-600"
                        >
                          <rect width="18" height="14" x="3" y="5" rx="2" />
                          <path d="M3 10h18" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Mastercard</h3>
                        <p className="text-sm text-muted-foreground">Accept Mastercard contactless cards</p>
                      </div>
                    </div>
                    <Switch checked={mastercardEnabled} onCheckedChange={setMastercardEnabled} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-gray-800"
                        >
                          <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
                          <path d="M12 19v2" />
                          <path d="M12 3V1" />
                          <path d="m4.93 4.93 1.41 1.41" />
                          <path d="m17.66 17.66 1.41 1.41" />
                          <path d="M19 12h2" />
                          <path d="M3 12h2" />
                          <path d="m17.66 6.34 1.41-1.41" />
                          <path d="m4.93 19.07 1.41-1.41" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Apple Pay</h3>
                        <p className="text-sm text-muted-foreground">Accept Apple Pay mobile wallet</p>
                      </div>
                    </div>
                    <Switch checked={applePayEnabled} onCheckedChange={setApplePayEnabled} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-blue-600"
                        >
                          <path d="M6 9h12l-5 7H6z" />
                          <path d="m2 14 4-5" />
                          <path d="m22 14-4-5" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Google Pay</h3>
                        <p className="text-sm text-muted-foreground">Accept Google Pay mobile wallet</p>
                      </div>
                    </div>
                    <Switch checked={googlePayEnabled} onCheckedChange={setGooglePayEnabled} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-blue-800"
                        >
                          <path d="M6 9h12l-5 7H6z" />
                          <path d="m2 14 4-5" />
                          <path d="m22 14-4-5" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Samsung Pay</h3>
                        <p className="text-sm text-muted-foreground">Accept Samsung Pay mobile wallet</p>
                      </div>
                    </div>
                    <Switch checked={samsungPayEnabled} onCheckedChange={setSamsungPayEnabled} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-green-600"
                        >
                          <rect width="18" height="14" x="3" y="5" rx="2" />
                          <path d="M3 10h18" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Verve</h3>
                        <p className="text-sm text-muted-foreground">Accept Verve contactless cards</p>
                      </div>
                    </div>
                    <Switch checked={verveEnabled} onCheckedChange={setVerveEnabled} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general contactless payment settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Enable Contactless Payments</h3>
                    <p className="text-sm text-muted-foreground">Allow customers to pay using contactless methods</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Mobile Wallets</h3>
                    <p className="text-sm text-muted-foreground">Accept payments from mobile wallet apps</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Auto Receipt</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically print receipts for contactless transactions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Payment Timeout</h3>
                    <p className="text-sm text-muted-foreground">
                      Cancel contactless payment if not completed within 30 seconds
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security & Limits Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5 text-teal-600" />
                  Transaction Limits
                </CardTitle>
                <CardDescription>Set maximum transaction amounts for contactless payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="single-transaction-limit">Single Transaction Limit (₦)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                      <Input
                        id="single-transaction-limit"
                        value={singleTransactionLimit}
                        onChange={(e) => setSingleTransactionLimit(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maximum amount allowed for a single contactless transaction
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daily-transaction-limit">Daily Transaction Limit (₦)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                      <Input
                        id="daily-transaction-limit"
                        value={dailyTransactionLimit}
                        onChange={(e) => setDailyTransactionLimit(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maximum total amount allowed for contactless transactions per day
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="require-pin-above">Require PIN Above (₦)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                    <Input
                      id="require-pin-above"
                      value={requirePinAbove}
                      onChange={(e) => setRequirePinAbove(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Transactions above this amount will require PIN verification
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Features</CardTitle>
                <CardDescription>Configure security settings for contactless payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Fraud Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically detect and prevent suspicious transactions
                    </p>
                  </div>
                  <Switch checked={fraudDetectionEnabled} onCheckedChange={setFraudDetectionEnabled} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Velocity Checks</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor and limit the frequency of transactions from the same card
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Geolocation Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Verify transaction location matches customer's typical patterns
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Transaction Alerts</h3>
                    <p className="text-sm text-muted-foreground">Send notifications for unusual transaction patterns</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance & Certification</CardTitle>
                <CardDescription>Security compliance information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border bg-green-50 flex items-center justify-center">
                    <div className="text-center">
                      <ShieldCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-medium">EMV Compliant</h3>
                      <p className="text-xs text-muted-foreground">Meets global EMV standards</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border bg-blue-50 flex items-center justify-center">
                    <div className="text-center">
                      <ShieldCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-medium">PCI DSS Level 1</h3>
                      <p className="text-xs text-muted-foreground">Highest level of PCI compliance</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border bg-purple-50 flex items-center justify-center">
                    <div className="text-center">
                      <ShieldCheck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-medium">AES-256 Encryption</h3>
                      <p className="text-xs text-muted-foreground">Bank-grade data security</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testing & Monitoring Tab */}
          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="mr-2 h-5 w-5 text-teal-600" />
                  Test Transactions
                </CardTitle>
                <CardDescription>Test your contactless payment setup with simulated transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-gray-50">
                  {testingInProgress ? (
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-teal-200 opacity-25"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Nfc className="h-12 w-12 text-teal-500 animate-pulse" />
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Testing in Progress</h3>
                      <p className="text-sm text-muted-foreground">Simulating contactless payment...</p>
                    </div>
                  ) : testResult ? (
                    <div className="text-center">
                      {testResult === "success" ? (
                        <>
                          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Test Successful</h3>
                          <p className="text-sm text-muted-foreground">
                            Contactless payment processed successfully. Terminal is ready for use.
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <XCircle className="h-8 w-8 text-red-600" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Test Failed</h3>
                          <p className="text-sm text-muted-foreground">
                            Contactless payment test failed. Please check terminal connection and settings.
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-teal-200">
                        <Nfc className="h-12 w-12 text-teal-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Test NFC Payment</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Run a test transaction to verify your contactless payment setup
                      </p>
                      <Button
                        onClick={handleTestTransaction}
                        disabled={!terminalConnected}
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        Start Test Transaction
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Test Cards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-1 bg-blue-100 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-blue-600"
                          >
                            <rect width="18" height="14" x="3" y="5" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                        </div>
                        <h4 className="font-medium">Visa Test Card</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Card #: 4111 1111 1111 1111</p>
                      <p className="text-sm text-muted-foreground">Exp: 12/25 CVV: 123</p>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-1 bg-red-100 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-red-600"
                          >
                            <rect width="18" height="14" x="3" y="5" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                        </div>
                        <h4 className="font-medium">Mastercard Test</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Card #: 5555 5555 5555 4444</p>
                      <p className="text-sm text-muted-foreground">Exp: 12/25 CVV: 123</p>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-1 bg-gray-100 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-gray-800"
                          >
                            <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
                            <path d="M12 19v2" />
                            <path d="M12 3V1" />
                          </svg>
                        </div>
                        <h4 className="font-medium">Mobile Wallet</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Use test wallet on mobile device</p>
                      <p className="text-sm text-muted-foreground">Follow device instructions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Monitor</CardTitle>
                <CardDescription>View recent test transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch id="testing-mode" checked={testingMode} onCheckedChange={setTestingMode} />
                      <Label htmlFor="testing-mode">Testing Mode</Label>
                    </div>
                    <Badge className={testingMode ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
                      {testingMode ? "Test Mode" : "Live Mode"}
                    </Badge>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 text-sm font-medium">Time</th>
                          <th className="text-left p-3 text-sm font-medium">Card Type</th>
                          <th className="text-left p-3 text-sm font-medium">Amount</th>
                          <th className="text-left p-3 text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testResult === "success" && (
                          <tr className="border-t">
                            <td className="p-3 text-sm">Just now</td>
                            <td className="p-3 text-sm">Test Card</td>
                            <td className="p-3 text-sm">₦1,000.00</td>
                            <td className="p-3 text-sm">
                              <Badge className="bg-green-100 text-green-800">Success</Badge>
                            </td>
                          </tr>
                        )}
                        {testResult === "failure" && (
                          <tr className="border-t">
                            <td className="p-3 text-sm">Just now</td>
                            <td className="p-3 text-sm">Test Card</td>
                            <td className="p-3 text-sm">₦1,000.00</td>
                            <td className="p-3 text-sm">
                              <Badge className="bg-red-100 text-red-800">Failed</Badge>
                            </td>
                          </tr>
                        )}
                        <tr className="border-t">
                          <td className="p-3 text-sm">10:23 AM</td>
                          <td className="p-3 text-sm">Visa</td>
                          <td className="p-3 text-sm">₦2,500.00</td>
                          <td className="p-3 text-sm">
                            <Badge className="bg-green-100 text-green-800">Success</Badge>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">10:15 AM</td>
                          <td className="p-3 text-sm">Mastercard</td>
                          <td className="p-3 text-sm">₦1,800.00</td>
                          <td className="p-3 text-sm">
                            <Badge className="bg-green-100 text-green-800">Success</Badge>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">09:47 AM</td>
                          <td className="p-3 text-sm">Apple Pay</td>
                          <td className="p-3 text-sm">₦3,200.00</td>
                          <td className="p-3 text-sm">
                            <Badge className="bg-green-100 text-green-800">Success</Badge>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">09:32 AM</td>
                          <td className="p-3 text-sm">Visa</td>
                          <td className="p-3 text-sm">₦5,000.00</td>
                          <td className="p-3 text-sm">
                            <Badge className="bg-red-100 text-red-800">Failed</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
