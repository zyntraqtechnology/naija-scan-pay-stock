"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  CreditCard,
  Users,
  Package,
  ShoppingCart,
  UserCheck,
  Truck,
  Receipt,
  MapPin,
  Grid3X3,
  Globe,
  Bell,
  Database,
  Languages,
  Shield,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

const settingsNavigation = [
  { name: "General", href: "/super-admin/settings", icon: Settings, current: true },
  { name: "Plan", href: "/super-admin/settings/plan", icon: Package },
  { name: "Billing", href: "/super-admin/settings/billing", icon: CreditCard },
  { name: "Users", href: "/super-admin/settings/users", icon: Users },
  { name: "Payments", href: "/super-admin/settings/payments", icon: CreditCard },
  { name: "Checkout", href: "/super-admin/settings/checkout", icon: ShoppingCart },
  { name: "Customer accounts", href: "/super-admin/settings/customer-accounts", icon: UserCheck },
  { name: "Shipping and delivery", href: "/super-admin/settings/shipping", icon: Truck },
  { name: "Taxes and duties", href: "/super-admin/settings/taxes", icon: Receipt },
  { name: "Locations", href: "/super-admin/settings/locations", icon: MapPin },
  { name: "Apps and sales channels", href: "/super-admin/settings/apps", icon: Grid3X3 },
  { name: "Domains", href: "/super-admin/settings/domains", icon: Globe },
  { name: "Customer events", href: "/super-admin/settings/customer-events", icon: Users },
  { name: "Notifications", href: "/super-admin/settings/notifications", icon: Bell },
  { name: "Metafields and metaobjects", href: "/super-admin/settings/metafields", icon: Database },
  { name: "Languages", href: "/super-admin/settings/languages", icon: Languages },
  { name: "Customer privacy", href: "/super-admin/settings/customer-privacy", icon: Shield },
  { name: "Policies", href: "/super-admin/settings/policies", icon: FileText },
]

export default function SuperAdminSettings() {
  const [activeSection, setActiveSection] = useState("general")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Settings Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">GB</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Gy Bloom</div>
              <div className="text-sm text-gray-600">gybloom.com</div>
            </div>
          </div>

          <div className="relative mb-4">
            <Input placeholder="Search" className="pl-8 h-8 bg-gray-50 border-gray-300" />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 text-gray-400">🔍</div>
            </div>
          </div>

          <nav className="space-y-1">
            {settingsNavigation.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveSection(item.name.toLowerCase().replace(/\s+/g, "-"))}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors text-left",
                  item.current ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-gray-400" />
              <h1 className="text-2xl font-semibold text-gray-900">General</h1>
            </div>
            <Button variant="outline" size="sm">
              ✕
            </Button>
          </div>

          <div className="space-y-8">
            {/* Store Details */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Store details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store name</Label>
                    <Input id="store-name" defaultValue="Gy Bloom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email</Label>
                    <Input id="store-email" type="email" defaultValue="gybloom.shop@gmail.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" defaultValue="09164497274" />
                </div>

                <div className="space-y-4">
                  <Label>Billing address</Label>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-900">
                      <div>GyBloom, Orchid Road, 106104 Lekki Lagos, Nigeria</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Store Defaults */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Store defaults</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Currency display</Label>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">
                        To manage the currencies customers see, go to{" "}
                        <button className="text-blue-600 hover:text-blue-800">Markets</button>
                      </span>
                      <Select defaultValue="ngn">
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ngn">Nigerian Naira (NGN ₦)</SelectItem>
                          <SelectItem value="usd">US Dollar (USD $)</SelectItem>
                          <SelectItem value="eur">Euro (EUR €)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label>Backup Region</Label>
                    <div className="mt-2">
                      <Select defaultValue="nigeria">
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nigeria">Nigeria</SelectItem>
                          <SelectItem value="ghana">Ghana</SelectItem>
                          <SelectItem value="kenya">Kenya</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-600 mt-1">
                        Determines settings for customers outside of your markets.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Unit system</Label>
                      <div className="mt-2">
                        <Select defaultValue="metric">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="metric">Metric system</SelectItem>
                            <SelectItem value="imperial">Imperial system</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Default weight unit</Label>
                      <div className="mt-2">
                        <Select defaultValue="kg">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kilogram (kg)</SelectItem>
                            <SelectItem value="g">Gram (g)</SelectItem>
                            <SelectItem value="lb">Pound (lb)</SelectItem>
                            <SelectItem value="oz">Ounce (oz)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label>Time zone</Label>
                    <div className="mt-2">
                      <Select defaultValue="west-central-africa">
                        <SelectTrigger className="w-64">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="west-central-africa">(GMT+01:00) West Central Africa</SelectItem>
                          <SelectItem value="utc">(GMT+00:00) UTC</SelectItem>
                          <SelectItem value="eastern">(GMT-05:00) Eastern Time</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-600 mt-1">
                        Sets the time for when orders and analytics are recorded
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-gray-600">
                      To change your user level time zone and language visit your{" "}
                      <button className="text-blue-600 hover:text-blue-800">account settings</button>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
