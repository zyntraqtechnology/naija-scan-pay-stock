"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OranjButton } from "@/components/ui/oranj-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModernUpload } from "@/components/ui/modern-upload"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  CreditCard,
  Settings,
  Save,
  Banknote,
  Receipt,
  Smartphone,
  Wifi,
  Landmark,
  Plus,
  FileText,
  Monitor,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useRef } from "react"

export default function AddStorefrontPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>([3.3792, 6.5244]) // Default to Lagos

  // Initialize map
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmFyYW5nYXltbyIsImEiOiJjbWJxZHBzenAwMmdrMmtzZmloemphb284In0.U22j37ppYT1IMyC2lXVBzw"

    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: selectedLocation,
        zoom: 14,
      })

      let marker: mapboxgl.Marker

      map.current.on("load", () => {
        // Add initial marker
        const markerEl = document.createElement("div")
        markerEl.className = "custom-marker"
        markerEl.style.width = "30px"
        markerEl.style.height = "30px"
        markerEl.style.borderRadius = "50%"
        markerEl.style.backgroundColor = "#8B5CF6"
        markerEl.style.border = "3px solid white"
        markerEl.style.boxShadow = "0 3px 6px rgba(0,0,0,0.3)"
        markerEl.style.cursor = "pointer"

        marker = new mapboxgl.Marker(markerEl, { draggable: true }).setLngLat(selectedLocation).addTo(map.current!)

        // Update location when marker is dragged
        marker.on("dragend", () => {
          const lngLat = marker.getLngLat()
          setSelectedLocation([lngLat.lng, lngLat.lat])
        })
      })

      // Click to place marker
      map.current.on("click", (e) => {
        const { lng, lat } = e.lngLat
        setSelectedLocation([lng, lat])
        if (marker) {
          marker.setLngLat([lng, lat])
        }
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [selectedLocation])

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving new storefront...")
    router.push("/admin/storefronts")
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="Add New Storefront"
        description="Create a new storefront location"
        breadcrumb={[
          { title: "Storefronts", href: "/admin/storefronts" },
          { title: "Add New", href: "/admin/storefronts/add" },
        ]}
      />

      <div className="p-4 md:p-6 space-y-6 w-full">
        {/* Top Action Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Link href="/admin/storefronts" passHref>
            <OranjButton variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Storefronts
            </OranjButton>
          </Link>
          <div className="flex gap-2">
            <OranjButton variant="outline" size="sm">
              Save as Draft
            </OranjButton>
            <OranjButton size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Create Storefront
            </OranjButton>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Details</span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Staff</span>
            </TabsTrigger>
            <TabsTrigger value="terminals" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">Terminals</span>
            </TabsTrigger>
            <TabsTrigger value="banking" className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              <span className="hidden sm:inline">Banking</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                    Storefront Information
                  </CardTitle>
                  <CardDescription>Basic information about this new storefront location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Storefront Name *</Label>
                      <Input id="name" placeholder="Enter storefront name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue="active">
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea id="address" placeholder="Enter full address" rows={2} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="store@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+234 xxx xxx xxxx" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hours">Opening Hours</Label>
                      <Input id="hours" placeholder="e.g., 8:00 AM - 8:00 PM" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">Manager</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select manager" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarah">Sarah Johnson</SelectItem>
                          <SelectItem value="michael">Michael Chen</SelectItem>
                          <SelectItem value="jessica">Jessica Williams</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Storefront Image</Label>
                    <ModernUpload
                      accept="image/*"
                      maxSize={5}
                      description="Upload a photo of your storefront (max 5MB)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Store Logo</Label>
                    <ModernUpload accept="image/*" maxSize={2} description="Upload your store logo (max 2MB)" />
                  </div>
                </CardContent>
              </Card>

              {/* Right Column - Map & Quick Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-[#8B5CF6]" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div ref={mapContainer} className="w-full h-[200px] rounded-md overflow-hidden mb-4" />
                    <div className="text-sm text-muted-foreground">
                      Click on the map to set the exact location, or drag the marker to adjust.
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Coordinates: {selectedLocation[1].toFixed(6)}, {selectedLocation[0].toFixed(6)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Setup Checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                      Basic Information
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                      Staff Assignment
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                      Terminal Setup
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                      Banking Configuration
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Configure which payment methods will be accepted at this location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 border-2 border-green-200 bg-green-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Banknote className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <Label htmlFor="cash" className="font-medium text-green-800">
                            Cash
                          </Label>
                          <p className="text-xs text-green-600">Physical currency</p>
                        </div>
                      </div>
                      <Switch id="cash" defaultChecked />
                    </div>
                  </Card>

                  <Card className="p-4 border-2 border-blue-200 bg-blue-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="card" className="font-medium text-blue-800">
                            Card
                          </Label>
                          <p className="text-xs text-blue-600">Debit & Credit</p>
                        </div>
                      </div>
                      <Switch id="card" defaultChecked />
                    </div>
                  </Card>

                  <Card className="p-4 border-2 border-purple-200 bg-purple-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Landmark className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <Label htmlFor="transfer" className="font-medium text-purple-800">
                            Transfer
                          </Label>
                          <p className="text-xs text-purple-600">Bank transfer</p>
                        </div>
                      </div>
                      <Switch id="transfer" defaultChecked />
                    </div>
                  </Card>

                  <Card className="p-4 border-2 border-orange-200 bg-orange-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Smartphone className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <Label htmlFor="ussd" className="font-medium text-orange-800">
                            USSD
                          </Label>
                          <p className="text-xs text-orange-600">Mobile banking</p>
                        </div>
                      </div>
                      <Switch id="ussd" />
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                    Staff Assignment
                  </CardTitle>
                  <CardDescription>Assign staff members to this new storefront</CardDescription>
                </div>
                <OranjButton size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Staff
                </OranjButton>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No staff members assigned yet.</p>
                  <p className="text-sm">Click "Add Staff" to assign employees to this storefront.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terminals Tab */}
          <TabsContent value="terminals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                  Terminal Configuration
                </CardTitle>
                <CardDescription>Set up POS terminals and printers for this storefront</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="terminals">Number of POS Terminals</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of terminals" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Terminal</SelectItem>
                        <SelectItem value="2">2 Terminals</SelectItem>
                        <SelectItem value="3">3 Terminals</SelectItem>
                        <SelectItem value="4">4 Terminals</SelectItem>
                        <SelectItem value="5">5+ Terminals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="printers">Number of Receipt Printers</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of printers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Printer</SelectItem>
                        <SelectItem value="2">2 Printers</SelectItem>
                        <SelectItem value="3">3 Printers</SelectItem>
                        <SelectItem value="4">4 Printers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-800 mb-2">Setup Note:</p>
                  <p>
                    Terminal and printer configuration can be completed after the storefront is created. You'll be able
                    to configure each device individually in the storefront management page.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Banking Tab */}
          <TabsContent value="banking" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Landmark className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                    Bank Account Setup
                  </CardTitle>
                  <CardDescription>Configure bank accounts for this storefront</CardDescription>
                </div>
                <OranjButton size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </OranjButton>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Landmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No bank accounts configured yet.</p>
                  <p className="text-sm">Click "Add Account" to set up banking for this storefront.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                  Receipt Settings
                </CardTitle>
                <CardDescription>Configure default receipt settings for this storefront</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="header">Receipt Header</Label>
                      <Input id="header" placeholder="Store name or custom header" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="footer">Receipt Footer</Label>
                      <Input id="footer" placeholder="Thank you message" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Custom Message</Label>
                    <Textarea id="message" placeholder="Additional message for customers" rows={2} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="showLogo" defaultChecked />
                      <Label htmlFor="showLogo">Show Logo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="showAddress" defaultChecked />
                      <Label htmlFor="showAddress">Show Address</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="showContact" defaultChecked />
                      <Label htmlFor="showContact">Show Contact Info</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wifi className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                  Network Settings
                </CardTitle>
                <CardDescription>Configure network settings for this storefront</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wifi">WiFi Network</Label>
                      <Input id="wifi" placeholder="Network name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">WiFi Password</Label>
                      <Input id="password" type="password" placeholder="Network password" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="offlineMode" />
                    <Label htmlFor="offlineMode">Enable Offline Mode</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                  Analytics Setup
                </CardTitle>
                <CardDescription>Configure analytics and reporting for this storefront</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="enableAnalytics" defaultChecked />
                    <Label htmlFor="enableAnalytics">Enable Analytics Tracking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="dailyReports" defaultChecked />
                    <Label htmlFor="dailyReports">Daily Sales Reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="inventoryTracking" defaultChecked />
                    <Label htmlFor="inventoryTracking">Inventory Tracking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="customerInsights" />
                    <Label htmlFor="customerInsights">Customer Insights</Label>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground bg-gray-50 p-4 rounded-lg">
                  <p>Analytics will be available once the storefront is created and starts processing transactions.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
