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
import { ArrowLeft, CheckCircle2, Hash, Phone, Save, Settings, Smartphone, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function UssdConfigurePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("banks")
  const [testingMode, setTestingMode] = useState(false)
  const [testingInProgress, setTestingInProgress] = useState(false)
  const [testResult, setTestResult] = useState<"success" | "failure" | null>(null)

  // Bank selection state
  const [selectedBanks, setSelectedBanks] = useState<string[]>(["gtbank", "firstbank"])

  // USSD settings
  const [ussdEnabled, setUssdEnabled] = useState(true)
  const [transactionLimit, setTransactionLimit] = useState("100000")
  const [sessionTimeout, setSessionTimeout] = useState("5")

  const banks = [
    { id: "gtbank", name: "GTBank", code: "*737#", logo: "/generic-bank-logo.png" },
    { id: "firstbank", name: "First Bank", code: "*894#", logo: "/generic-african-bank-logo.png" },
    { id: "zenith", name: "Zenith Bank", code: "*966#", logo: "/generic-bank-logo.png" },
    { id: "access", name: "Access Bank", code: "*901#", logo: "/access-bank-logo.png" },
    { id: "uba", name: "UBA", code: "*919#", logo: "/generic-bank-logo.png" },
    { id: "stanbic", name: "Stanbic IBTC", code: "*909#", logo: "/generic-bank-logo.png" },
    { id: "union", name: "Union Bank", code: "*826#", logo: "/union-bank-logo.png" },
    { id: "fcmb", name: "FCMB", code: "*329#", logo: "/generic-geometric-logo.png" },
    { id: "sterling", name: "Sterling Bank", code: "*822#", logo: "/generic-bank-logo.png" },
    { id: "wema", name: "Wema Bank", code: "*945#", logo: "/generic-bank-logo.png" },
  ]

  const toggleBankSelection = (bankId: string) => {
    if (selectedBanks.includes(bankId)) {
      setSelectedBanks(selectedBanks.filter((id) => id !== bankId))
    } else {
      setSelectedBanks([...selectedBanks, bankId])
    }
  }

  const handleTestUssd = () => {
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
        title="USSD Configuration"
        description="Configure USSD payment settings for your business"
        breadcrumb={[
          { title: "Payments", href: "/admin/payments" },
          { title: "USSD Configuration", href: "/admin/payments/ussd/configure" },
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
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
              {ussdEnabled ? "USSD Enabled" : "USSD Disabled"}
            </Badge>
          </div>
          <Button onClick={handleSaveSettings} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <Save className="mr-2 h-4 w-4" />
            Save Configuration
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="banks" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span>Bank Selection</span>
            </TabsTrigger>
            <TabsTrigger value="commands" className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              <span>USSD Commands</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Testing</span>
            </TabsTrigger>
          </TabsList>

          {/* Bank Selection Tab */}
          <TabsContent value="banks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5 text-orange-600" />
                  Nigerian Banks
                </CardTitle>
                <CardDescription>Select which banks to enable for USSD payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {banks.map((bank) => (
                    <div
                      key={bank.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedBanks.includes(bank.id)
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleBankSelection(bank.id)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="relative w-12 h-12 mb-3">
                          <Image
                            src={bank.logo || "/placeholder.svg"}
                            alt={bank.name}
                            fill
                            className="object-contain"
                            sizes="48px"
                          />
                        </div>
                        <h3 className="font-medium text-sm">{bank.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{bank.code}</p>
                        {selectedBanks.includes(bank.id) && (
                          <div className="mt-2 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Selected Banks</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedBanks.length} of {banks.length} banks selected
                      </p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">{selectedBanks.length} Banks</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedBanks([])}>
                  Clear All
                </Button>
                <Button variant="outline" onClick={() => setSelectedBanks(banks.map((bank) => bank.id))}>
                  Select All
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>USSD Codes</CardTitle>
                <CardDescription>Standard USSD codes for selected banks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedBanks.length > 0 ? (
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left p-3 text-sm font-medium">Bank</th>
                            <th className="text-left p-3 text-sm font-medium">USSD Code</th>
                            <th className="text-left p-3 text-sm font-medium">Payment Format</th>
                          </tr>
                        </thead>
                        <tbody>
                          {banks
                            .filter((bank) => selectedBanks.includes(bank.id))
                            .map((bank) => (
                              <tr key={bank.id} className="border-t">
                                <td className="p-3 text-sm">
                                  <div className="flex items-center gap-2">
                                    <div className="relative w-6 h-6">
                                      <Image
                                        src={bank.logo || "/placeholder.svg"}
                                        alt={bank.name}
                                        fill
                                        className="object-contain"
                                        sizes="24px"
                                      />
                                    </div>
                                    {bank.name}
                                  </div>
                                </td>
                                <td className="p-3 text-sm font-mono">{bank.code}</td>
                                <td className="p-3 text-sm font-mono">
                                  {bank.code.replace("#", "")}*000*AMOUNT*REFERENCE#
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No banks selected. Please select at least one bank.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* USSD Commands Tab */}
          <TabsContent value="commands" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hash className="mr-2 h-5 w-5 text-orange-600" />
                  USSD Command Structure
                </CardTitle>
                <CardDescription>Standard USSD payment commands for customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg border bg-orange-50/50">
                  <h3 className="font-medium text-lg mb-4">Payment Flow Example</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-medium mr-4 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Customer dials bank USSD code</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          For example, GTBank customers dial *737# on their mobile phone
                        </p>
                        <div className="p-3 rounded bg-white border font-mono text-sm">*737#</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-medium mr-4 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Customer selects "Transfer" or "Payments" option</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          The bank menu appears and customer selects the appropriate option
                        </p>
                        <div className="p-3 rounded bg-white border text-sm">
                          <p>1. Transfer</p>
                          <p>2. Airtime</p>
                          <p>3. Check Balance</p>
                          <p>4. Payments</p>
                          <p className="mt-2 text-orange-600">Customer selects: 1</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-medium mr-4 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Customer enters merchant account number</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Customer enters your business account number
                        </p>
                        <div className="p-3 rounded bg-white border text-sm">
                          <p>Enter account number:</p>
                          <p className="mt-2 text-orange-600">Customer enters: 0123456789</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-medium mr-4 flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Customer enters amount</h4>
                        <p className="text-sm text-muted-foreground mb-2">Customer enters the payment amount</p>
                        <div className="p-3 rounded bg-white border text-sm">
                          <p>Enter amount:</p>
                          <p className="mt-2 text-orange-600">Customer enters: 5000</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-medium mr-4 flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Customer confirms payment</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Customer confirms the transaction details and enters PIN
                        </p>
                        <div className="p-3 rounded bg-white border text-sm">
                          <p>Pay ₦5,000.00 to OranjPay Store?</p>
                          <p>1. Yes</p>
                          <p>2. No</p>
                          <p className="mt-2 text-orange-600">Customer selects: 1</p>
                          <p className="mt-2">Enter PIN:</p>
                          <p className="text-orange-600">Customer enters: ****</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-medium mr-4 flex-shrink-0">
                        6
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Transaction complete</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Customer receives confirmation and your system is notified
                        </p>
                        <div className="p-3 rounded bg-white border text-sm">
                          <p className="text-green-600">
                            Transaction successful! ₦5,000.00 sent to OranjPay Store. Ref: USSD12345678
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">USSD Code Examples</h3>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 text-sm font-medium">Bank</th>
                          <th className="text-left p-3 text-sm font-medium">Direct Payment Format</th>
                          <th className="text-left p-3 text-sm font-medium">Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3 text-sm">GTBank</td>
                          <td className="p-3 text-sm font-mono">*737*1*AMOUNT*ACCOUNT#</td>
                          <td className="p-3 text-sm font-mono">*737*1*5000*0123456789#</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">First Bank</td>
                          <td className="p-3 text-sm font-mono">*894*AMOUNT*ACCOUNT#</td>
                          <td className="p-3 text-sm font-mono">*894*5000*0123456789#</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">Zenith Bank</td>
                          <td className="p-3 text-sm font-mono">*966*AMOUNT*ACCOUNT#</td>
                          <td className="p-3 text-sm font-mono">*966*5000*0123456789#</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">Access Bank</td>
                          <td className="p-3 text-sm font-mono">*901*1*AMOUNT*ACCOUNT#</td>
                          <td className="p-3 text-sm font-mono">*901*1*5000*0123456789#</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Instructions</CardTitle>
                <CardDescription>Instructions to display to your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg border bg-gray-50">
                  <h3 className="font-medium mb-4">How to Pay with USSD</h3>
                  <div className="space-y-3 text-sm">
                    <p>1. Dial your bank's USSD code on your mobile phone</p>
                    <p>2. Select "Transfer" or "Payments" from the menu</p>
                    <p>
                      3. Enter our account number: <span className="font-mono">0123456789</span>
                    </p>
                    <p>
                      4. Enter the amount: <span className="font-mono">₦5,000</span>
                    </p>
                    <p>5. Confirm the payment and enter your PIN</p>
                    <p>6. You'll receive a confirmation SMS</p>
                  </div>
                  <div className="mt-4 p-3 rounded bg-orange-100 border border-orange-200">
                    <p className="text-sm text-orange-800">
                      <strong>Note:</strong> USSD charges may apply based on your mobile network provider
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-orange-600" />
                  USSD Settings
                </CardTitle>
                <CardDescription>Configure USSD payment settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Enable USSD Payments</h3>
                    <p className="text-sm text-muted-foreground">Allow customers to pay using USSD codes</p>
                  </div>
                  <Switch checked={ussdEnabled} onCheckedChange={setUssdEnabled} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transaction-limit">Transaction Limit (₦)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                    <Input
                      id="transaction-limit"
                      value={transactionLimit}
                      onChange={(e) => setTransactionLimit(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Maximum amount allowed per USSD transaction</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    How long to wait for payment confirmation before timing out
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Additional Settings</h3>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium">Auto-confirm Payments</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically confirm payments when bank notification is received
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send SMS notifications to customers for payment status
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium">Email Receipts</h4>
                      <p className="text-sm text-muted-foreground">Send email receipts for successful USSD payments</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium">Duplicate Payment Protection</h4>
                      <p className="text-sm text-muted-foreground">Prevent duplicate payments within 5 minutes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your business account details for USSD payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-name">Account Name</Label>
                    <Input id="account-name" value="OranjPay Store" readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input id="account-number" value="0123456789" readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input id="bank-name" value="GTBank" readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sort-code">Sort Code</Label>
                    <Input id="sort-code" value="058152036" readOnly />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This is the account customers will transfer money to when making USSD
                    payments. Ensure this information is correct.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testing Tab */}
          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-orange-600" />
                  Test USSD Payment
                </CardTitle>
                <CardDescription>Test your USSD payment setup with a simulated transaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-gray-50">
                  {testingInProgress ? (
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-orange-200 opacity-25"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Phone className="h-12 w-12 text-orange-500 animate-pulse" />
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Testing in Progress</h3>
                      <p className="text-sm text-muted-foreground">Simulating USSD payment...</p>
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
                            USSD payment processed successfully. Your setup is working correctly.
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <XCircle className="h-8 w-8 text-red-600" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Test Failed</h3>
                          <p className="text-sm text-muted-foreground">
                            USSD payment test failed. Please check your bank configuration and settings.
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-orange-200">
                        <Phone className="h-12 w-12 text-orange-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Test USSD Payment</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Run a test transaction to verify your USSD payment setup
                      </p>
                      <Button
                        onClick={handleTestUssd}
                        disabled={!ussdEnabled || selectedBanks.length === 0}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        Start Test Transaction
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Test Instructions</h3>
                  <div className="p-4 rounded-lg border bg-orange-50">
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Use a test phone number: +234 800 000 0000</li>
                      <li>Dial the USSD code for any selected bank</li>
                      <li>Follow the prompts to make a test payment</li>
                      <li>Use test amount: ₦1,000.00</li>
                      <li>Use test PIN: 1234</li>
                    </ol>
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
                          <th className="text-left p-3 text-sm font-medium">Bank</th>
                          <th className="text-left p-3 text-sm font-medium">Amount</th>
                          <th className="text-left p-3 text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testResult === "success" && (
                          <tr className="border-t">
                            <td className="p-3 text-sm">Just now</td>
                            <td className="p-3 text-sm">GTBank</td>
                            <td className="p-3 text-sm">₦1,000.00</td>
                            <td className="p-3 text-sm">
                              <Badge className="bg-green-100 text-green-800">Success</Badge>
                            </td>
                          </tr>
                        )}
                        {testResult === "failure" && (
                          <tr className="border-t">
                            <td className="p-3 text-sm">Just now</td>
                            <td className="p-3 text-sm">GTBank</td>
                            <td className="p-3 text-sm">₦1,000.00</td>
                            <td className="p-3 text-sm">
                              <Badge className="bg-red-100 text-red-800">Failed</Badge>
                            </td>
                          </tr>
                        )}
                        <tr className="border-t">
                          <td className="p-3 text-sm">10:23 AM</td>
                          <td className="p-3 text-sm">First Bank</td>
                          <td className="p-3 text-sm">₦2,500.00</td>
                          <td className="p-3 text-sm">
                            <Badge className="bg-green-100 text-green-800">Success</Badge>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">10:15 AM</td>
                          <td className="p-3 text-sm">Zenith Bank</td>
                          <td className="p-3 text-sm">₦1,800.00</td>
                          <td className="p-3 text-sm">
                            <Badge className="bg-green-100 text-green-800">Success</Badge>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">09:47 AM</td>
                          <td className="p-3 text-sm">Access Bank</td>
                          <td className="p-3 text-sm">₦3,200.00</td>
                          <td className="p-3 text-sm">
                            <Badge className="bg-green-100 text-green-800">Success</Badge>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">09:32 AM</td>
                          <td className="p-3 text-sm">UBA</td>
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
