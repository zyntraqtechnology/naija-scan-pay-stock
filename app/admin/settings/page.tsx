"use client"

import { useState } from "react"
import {
  Building,
  Globe,
  Lock,
  Plus,
  Save,
  User,
  Bell,
  Shield,
  CreditCard,
  Settings,
  Palette,
  Database,
} from "lucide-react"

import { OranjButton } from "@/components/ui/oranj-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminHeader } from "@/components/admin/admin-header"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("OranjPay Store")
  const [email, setEmail] = useState("contact@oranjpay.com")
  const [phone, setPhone] = useState("+234 123 456 7890")
  const [address, setAddress] = useState("123 Lagos Street, Nigeria")
  const [currency, setCurrency] = useState("NGN")
  const [taxRate, setTaxRate] = useState("7.5")
  const { user } = useAuth()

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="Settings"
        description={`Configure your store settings, ${user?.name || "User"}`}
        actions={
          <OranjButton variant="primary">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </OranjButton>
        }
      />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-6">
            {/* Business Information */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                    <Building className="h-5 w-5 text-[#635BFF]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Business Information</CardTitle>
                    <CardDescription>Update your business details and preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="business-name" className="text-sm font-medium">
                      Business Name
                    </Label>
                    <Input
                      id="business-name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="focus:ring-[#635BFF] focus:border-[#635BFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="business-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:ring-[#635BFF] focus:border-[#635BFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="business-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="focus:ring-[#635BFF] focus:border-[#635BFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-website" className="text-sm font-medium">
                      Website
                    </Label>
                    <Input
                      id="business-website"
                      placeholder="https://www.example.com"
                      className="focus:ring-[#635BFF] focus:border-[#635BFF]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-address" className="text-sm font-medium">
                    Business Address
                  </Label>
                  <Textarea
                    id="business-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="focus:ring-[#635BFF] focus:border-[#635BFF] min-h-[80px]"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="business-currency" className="text-sm font-medium">
                      Default Currency
                    </Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="business-currency" className="focus:ring-[#635BFF] focus:border-[#635BFF]">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">🇳🇬 Nigerian Naira (₦)</SelectItem>
                        <SelectItem value="USD">🇺🇸 US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">🇪🇺 Euro (€)</SelectItem>
                        <SelectItem value="GBP">🇬🇧 British Pound (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-tax" className="text-sm font-medium">
                      Default Tax Rate (%)
                    </Label>
                    <Input
                      id="business-tax"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="focus:ring-[#635BFF] focus:border-[#635BFF]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branding */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                    <Palette className="h-5 w-5 text-[#635BFF]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Branding & Appearance</CardTitle>
                    <CardDescription>Customize your brand identity and visual elements</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Business Logo</Label>
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-[#635BFF]/20 to-[#635BFF]/5 border-2 border-dashed border-[#635BFF]/30 flex items-center justify-center">
                      <Building className="h-8 w-8 text-[#635BFF]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <OranjButton variant="outline" className="border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF]/5">
                        Upload New Logo
                      </OranjButton>
                      <p className="text-xs text-muted-foreground">Recommended: 200x200px, PNG or JPG</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="receipt-header" className="text-sm font-medium">
                      Receipt Header Message
                    </Label>
                    <Textarea
                      id="receipt-header"
                      placeholder="Thank you for shopping with us!"
                      className="focus:ring-[#635BFF] focus:border-[#635BFF] min-h-[60px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receipt-footer" className="text-sm font-medium">
                      Receipt Footer Message
                    </Label>
                    <Textarea
                      id="receipt-footer"
                      placeholder="Please come again!"
                      className="focus:ring-[#635BFF] focus:border-[#635BFF] min-h-[60px]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-[#635BFF]/5 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                      <Settings className="h-4 w-4 text-[#635BFF]" />
                    </div>
                    <div>
                      <div className="font-medium">Show Logo on Receipts</div>
                      <div className="text-sm text-muted-foreground">
                        Display your business logo on printed receipts
                      </div>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            {/* Payment Methods */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                    <CreditCard className="h-5 w-5 text-[#635BFF]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Payment Methods</CardTitle>
                    <CardDescription>Configure accepted payment options for your store</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-green-50 to-transparent border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <div className="h-4 w-4 bg-green-600 rounded"></div>
                      </div>
                      <div>
                        <div className="font-medium">Cash Payments</div>
                        <div className="text-sm text-muted-foreground">Accept cash at checkout</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 cursor-default">Active</Badge>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-blue-50 to-transparent border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Card Payments</div>
                        <div className="text-sm text-muted-foreground">Credit & debit cards</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-700 cursor-default">Active</Badge>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-purple-50 to-transparent border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <div className="h-4 w-4 bg-purple-600 rounded"></div>
                      </div>
                      <div>
                        <div className="font-medium">QR Code Payments</div>
                        <div className="text-sm text-muted-foreground">Mobile payments via QR</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-700 cursor-default">Active</Badge>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-orange-50 to-transparent border-orange-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <div className="h-4 w-4 bg-orange-600 rounded"></div>
                      </div>
                      <div>
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-muted-foreground">Direct bank transfers</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="cursor-default">
                        Inactive
                      </Badge>
                      <Switch className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <OranjButton variant="outline" className="border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF]/5">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </OranjButton>
                </div>
              </CardContent>
            </Card>

            {/* Tax Configuration */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                    <Database className="h-5 w-5 text-[#635BFF]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Tax Configuration</CardTitle>
                    <CardDescription>Set up tax rates and calculation methods</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-[#635BFF]/5 to-transparent">
                    <div>
                      <div className="font-medium">Enable Tax Calculation</div>
                      <div className="text-sm text-muted-foreground">Automatically calculate taxes on transactions</div>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">Include Tax in Prices</div>
                      <div className="text-sm text-muted-foreground">Display prices with tax included</div>
                    </div>
                    <Switch className="data-[state=checked]:bg-[#635BFF]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-tax-rate" className="text-sm font-medium">
                    Default Tax Rate (%)
                  </Label>
                  <Input
                    id="default-tax-rate"
                    defaultValue="7.5"
                    className="focus:ring-[#635BFF] focus:border-[#635BFF] max-w-xs"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                      <User className="h-5 w-5 text-[#635BFF]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">User Management</CardTitle>
                      <CardDescription>Manage user accounts and permissions</CardDescription>
                    </div>
                  </div>
                  <OranjButton variant="primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </OranjButton>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-[#635BFF]/5 to-transparent border">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[#635BFF] text-white cursor-default">6</Badge>
                    <div>
                      <div className="font-medium">Active Users</div>
                      <div className="text-sm text-muted-foreground">Currently active in your system</div>
                    </div>
                  </div>
                  <OranjButton variant="outline" className="border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF]/5">
                    <User className="mr-2 h-4 w-4" />
                    Manage All
                  </OranjButton>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#635BFF] to-[#635BFF]/70 flex items-center justify-center text-white font-semibold">
                        SJ
                      </div>
                      <div>
                        <div className="font-medium">Sarah Johnson</div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-[#635BFF] text-white text-xs cursor-default">Admin</Badge>
                          <span className="text-sm text-muted-foreground">sarah@oranjpay.com</span>
                        </div>
                      </div>
                    </div>
                    <OranjButton variant="ghost" size="sm" className="text-[#635BFF] hover:bg-[#635BFF]/5">
                      Edit
                    </OranjButton>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold">
                        MC
                      </div>
                      <div>
                        <div className="font-medium">Michael Chen</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="cursor-default">
                            Cashier
                          </Badge>
                          <span className="text-sm text-muted-foreground">michael@oranjpay.com</span>
                        </div>
                      </div>
                    </div>
                    <OranjButton variant="ghost" size="sm" className="text-[#635BFF] hover:bg-[#635BFF]/5">
                      Edit
                    </OranjButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                    <Bell className="h-5 w-5 text-[#635BFF]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Notification Preferences</CardTitle>
                    <CardDescription>Configure how and when you receive notifications</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1 bg-blue-100 rounded">
                      <div className="h-2 w-2 bg-blue-600 rounded"></div>
                    </div>
                    <Label className="text-base font-medium">Email Notifications</Label>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 ml-6">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="text-sm">Low stock alerts</div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="text-sm">New transactions</div>
                      <Switch className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="text-sm">Daily sales reports</div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="text-sm">User account changes</div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1 bg-green-100 rounded">
                      <div className="h-2 w-2 bg-green-600 rounded"></div>
                    </div>
                    <Label className="text-base font-medium">System Notifications</Label>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 ml-6">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="text-sm">Low stock alerts</div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="text-sm">New transactions</div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="text-sm">User login activity</div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="text-sm">System updates</div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email" className="text-sm font-medium">
                    Notification Email Address
                  </Label>
                  <Input
                    id="notification-email"
                    type="email"
                    defaultValue="alerts@oranjpay.com"
                    className="focus:ring-[#635BFF] focus:border-[#635BFF] max-w-md"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                    <Shield className="h-5 w-5 text-[#635BFF]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Security Settings</CardTitle>
                    <CardDescription>Configure security options for your account</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-red-50 to-transparent border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Lock className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">Extra security layer</div>
                      </div>
                    </div>
                    <OranjButton variant="outline" className="border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF]/5">
                      Enable
                    </OranjButton>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-[#635BFF]/5 to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                        <Shield className="h-4 w-4 text-[#635BFF]" />
                      </div>
                      <div>
                        <div className="font-medium">Strong Passwords</div>
                        <div className="text-sm text-muted-foreground">Require complex passwords</div>
                      </div>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-yellow-50 to-transparent border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <div className="h-4 w-4 bg-yellow-600 rounded"></div>
                      </div>
                      <div>
                        <div className="font-medium">Session Timeout</div>
                        <div className="text-sm text-muted-foreground">Auto-logout after 30 minutes</div>
                      </div>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#635BFF]" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Lock className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">Change Password</div>
                        <div className="text-sm text-muted-foreground">Update your account password</div>
                      </div>
                    </div>
                    <OranjButton variant="outline" className="border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF]/5">
                      Change
                    </OranjButton>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#635BFF]/10 rounded-lg">
                    <Globe className="h-5 w-5 text-[#635BFF]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Data Privacy</CardTitle>
                    <CardDescription>Manage data privacy and retention settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">Customer Data Retention</div>
                      <div className="text-sm text-muted-foreground">Store customer data for 1 year</div>
                    </div>
                    <OranjButton variant="ghost" size="sm" className="text-[#635BFF] hover:bg-[#635BFF]/5">
                      Configure
                    </OranjButton>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">Transaction History</div>
                      <div className="text-sm text-muted-foreground">Store transactions for 5 years</div>
                    </div>
                    <OranjButton variant="ghost" size="sm" className="text-[#635BFF] hover:bg-[#635BFF]/5">
                      Configure
                    </OranjButton>
                  </div>
                </div>

                <div className="pt-4">
                  <OranjButton
                    variant="outline"
                    className="w-full border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF]/5"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Privacy Policy Settings
                  </OranjButton>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
