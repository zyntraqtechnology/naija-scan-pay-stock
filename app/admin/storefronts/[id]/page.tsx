"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OranjButton } from "@/components/ui/oranj-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModernUpload } from "@/components/ui/modern-upload"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Calendar,
  CreditCard,
  Printer,
  Settings,
  Trash,
  Save,
  User,
  Banknote,
  Receipt,
  Smartphone,
  Wifi,
  Landmark,
  Plus,
  MoreHorizontal,
  Edit,
  BarChart3,
  FileText,
  Monitor,
} from "lucide-react"
import Link from "next/link"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useRef } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample storefront data
const storefronts = [
  {
    id: "1",
    name: "Main Store",
    address: "123 Lagos Street, Lagos, Nigeria",
    manager: "Sarah Johnson",
    employees: 5,
    status: "Active",
    createdAt: "Jan 15, 2023",
    coordinates: [3.3792, 6.5244], // Lagos coordinates
    email: "main@oranjpay.com",
    phone: "+234 123 456 7890",
    openingHours: "8:00 AM - 8:00 PM",
    terminals: 3,
    printers: 2,
    paymentMethods: ["Cash", "Card", "Transfer", "USSD"],
    image: "/modern-store-interior.png",
    logo: "/shoprite-logo.png",
    bankAccounts: [
      { bank: "GTBank", accountNumber: "0123456789", accountName: "OranjPay Main" },
      { bank: "Wema Bank", accountNumber: "9876543210", accountName: "OranjPay Operations" },
    ],
    staff: [
      { name: "Sarah Johnson", role: "Manager", email: "sarah@oranjpay.com" },
      { name: "John Doe", role: "Cashier", email: "john@oranjpay.com" },
      { name: "Jane Smith", role: "Cashier", email: "jane@oranjpay.com" },
      { name: "Michael Brown", role: "Inventory", email: "michael@oranjpay.com" },
      { name: "Lisa Wong", role: "Customer Service", email: "lisa@oranjpay.com" },
    ],
  },
  {
    id: "2",
    name: "Branch Store",
    address: "456 Abuja Road, Abuja, Nigeria",
    manager: "Michael Chen",
    employees: 3,
    status: "Active",
    createdAt: "Mar 10, 2023",
    coordinates: [7.4951, 9.0579] as [number, number], // Abuja coordinates
    email: "branch@oranjpay.com",
    phone: "+234 987 654 3210",
    openingHours: "9:00 AM - 7:00 PM",
    terminals: 2,
    printers: 1,
    paymentMethods: ["Cash", "Card", "Transfer"],
    image: "/retail-store-interior.png",
    logo: "/shoprite-logo.png",
    bankAccounts: [{ bank: "Access Bank", accountNumber: "1122334455", accountName: "OranjPay Branch" }],
    staff: [
      { name: "Michael Chen", role: "Manager", email: "michael.c@oranjpay.com" },
      { name: "David Wilson", role: "Cashier", email: "david@oranjpay.com" },
      { name: "Emma Johnson", role: "Customer Service", email: "emma@oranjpay.com" },
    ],
  },
  {
    id: "3",
    name: "Mall Kiosk",
    address: "Ikeja City Mall, Lagos, Nigeria",
    manager: "Jessica Williams",
    employees: 2,
    status: "Inactive",
    createdAt: "Apr 5, 2023",
    coordinates: [3.3421, 6.6194], // Ikeja coordinates
    email: "kiosk@oranjpay.com",
    phone: "+234 555 123 4567",
    openingHours: "10:00 AM - 9:00 PM",
    terminals: 1,
    printers: 1,
    paymentMethods: ["Cash", "Card"],
    image: "/mall-kiosk.png",
    logo: "/shoprite-logo.png",
    bankAccounts: [{ bank: "First Bank", accountNumber: "5544332211", accountName: "OranjPay Kiosk" }],
    staff: [
      { name: "Jessica Williams", role: "Manager", email: "jessica@oranjpay.com" },
      { name: "Robert Taylor", role: "Cashier", email: "robert@oranjpay.com" },
    ],
  },
]

export default function StorefrontDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const storefront = storefronts.find((store) => store.id === id)
  const [activeTab, setActiveTab] = useState("details")
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  // Initialize map
  useEffect(() => {
    if (!storefront) return

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmFyYW5nYXltbyIsImEiOiJjbWJxZHBzenAwMmdrMmtzZmloemphb284In0.U22j37ppYT1IMyC2lXVBzw"

    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: storefront.coordinates as [number, number],
        zoom: 14,
      })

      map.current.on("load", () => {
        // Add marker for the storefront
        const markerEl = document.createElement("div")
        markerEl.className = "custom-marker"
        markerEl.style.width = "30px"
        markerEl.style.height = "30px"
        markerEl.style.borderRadius = "50%"
        markerEl.style.backgroundColor = "#8B5CF6"
        markerEl.style.border = "3px solid white"
        markerEl.style.boxShadow = "0 3px 6px rgba(0,0,0,0.3)"

        // Add marker to map
        new mapboxgl.Marker(markerEl).setLngLat(storefront.coordinates as [number, number]).addTo(map.current!)
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [storefront])

  if (!storefront) {
    return (
      <div className="flex flex-col w-full items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Storefront not found</h1>
        <p className="mb-6">The storefront you are looking for does not exist.</p>
        <Link href="/admin/storefronts" passHref>
          <OranjButton>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Storefronts
          </OranjButton>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title={storefront.name}
        description={`Manage storefront details and settings`}
        breadcrumb={[
          { title: "Storefronts", href: "/admin/storefronts" },
          { title: storefront.name, href: `/admin/storefronts/${id}` },
        ]}
      />

      <div className="p-4 md:p-6 space-y-6 w-full">
        {/* Top Action Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center">
            <Link href="/admin/storefronts" passHref>
              <OranjButton variant="outline" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </OranjButton>
            </Link>
            <Badge
              className={
                storefront.status === "Active"
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-red-100 text-red-800 hover:bg-red-200"
              }
            >
              {storefront.status}
            </Badge>
          </div>
          <div className="flex gap-2">
            <OranjButton variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </OranjButton>
            <OranjButton size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
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
                  <CardDescription>Basic information about this storefront location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Storefront Name</Label>
                      <Input id="name" defaultValue={storefront.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue={storefront.status.toLowerCase()}>
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
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue={storefront.address} rows={2} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={storefront.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={storefront.phone} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hours">Opening Hours</Label>
                      <Input id="hours" defaultValue={storefront.openingHours} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">Manager</Label>
                      <Select defaultValue={storefront.manager}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select manager" />
                        </SelectTrigger>
                        <SelectContent>
                          {storefront.staff.map((staff) => (
                            <SelectItem key={staff.email} value={staff.name}>
                              {staff.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Storefront Image</Label>
                    <ModernUpload
                      accept="image/*"
                      maxSize={5}
                      defaultPreview={storefront.image}
                      description="Upload a photo of your storefront (max 5MB)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Store Logo</Label>
                    <ModernUpload
                      accept="image/*"
                      maxSize={2}
                      defaultPreview={storefront.logo}
                      description="Upload your store logo (max 2MB)"
                    />
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
                      Click and drag to move the map. Click on the marker to set the exact location.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Quick Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        Staff Members
                      </div>
                      <span className="font-medium">{storefront.employees}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        POS Terminals
                      </div>
                      <span className="font-medium">{storefront.terminals}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Printer className="mr-2 h-4 w-4 text-muted-foreground" />
                        Receipt Printers
                      </div>
                      <span className="font-medium">{storefront.printers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        Created On
                      </div>
                      <span className="font-medium">{storefront.createdAt}</span>
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
                <CardDescription>Configure which payment methods are accepted at this location</CardDescription>
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
                      <Switch id="cash" defaultChecked={storefront.paymentMethods.includes("Cash")} />
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
                      <Switch id="card" defaultChecked={storefront.paymentMethods.includes("Card")} />
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
                      <Switch id="transfer" defaultChecked={storefront.paymentMethods.includes("Transfer")} />
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
                      <Switch id="ussd" defaultChecked={storefront.paymentMethods.includes("USSD")} />
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
                    Staff Members
                  </CardTitle>
                  <CardDescription>Manage employees assigned to this storefront</CardDescription>
                </div>
                <OranjButton size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Staff
                </OranjButton>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {storefront.staff.map((staff, index) => (
                    <div
                      key={staff.email}
                      className={`flex items-center justify-between p-4 rounded-lg ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] mr-3">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{staff.name}</h3>
                          <p className="text-sm text-muted-foreground">{staff.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-gray-100">
                          {staff.role}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <OranjButton variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </OranjButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terminals Tab */}
          <TabsContent value="terminals" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                    POS Terminals
                  </CardTitle>
                  <CardDescription>Manage point of sale terminals at this location</CardDescription>
                </div>
                <OranjButton size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Terminal
                </OranjButton>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: storefront.terminals }).map((_, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] mr-3">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Terminal {index + 1}</h3>
                          <p className="text-sm text-muted-foreground">
                            {index === 0 ? "Main Counter" : `Counter ${index + 1}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Online
                        </Badge>
                        <Link href={`/admin/pos/terminal-settings?id=${index + 1}&store=${storefront.id}`} passHref>
                          <OranjButton size="sm" variant="outline">
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </OranjButton>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Printer className="mr-2 h-5 w-5 text-[#8B5CF6]" />
                    Receipt Printers
                  </CardTitle>
                  <CardDescription>Manage receipt printers at this location</CardDescription>
                </div>
                <OranjButton size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Printer
                </OranjButton>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: storefront.printers }).map((_, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] mr-3">
                          <Printer className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Printer {index + 1}</h3>
                          <p className="text-sm text-muted-foreground">
                            {index === 0 ? "Main Counter" : `Counter ${index + 1}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Connected
                        </Badge>
                        <Link href={`/admin/pos/printer-settings?id=${index + 1}&store=${storefront.id}`} passHref>
                          <OranjButton size="sm" variant="outline">
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </OranjButton>
                        </Link>
                      </div>
                    </div>
                  ))}
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
                    Bank Accounts
                  </CardTitle>
                  <CardDescription>Manage bank accounts associated with this storefront</CardDescription>
                </div>
                <OranjButton size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </OranjButton>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {storefront.bankAccounts.map((account, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] mr-3">
                          <Landmark className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{account.bank}</h3>
                          <p className="text-sm text-muted-foreground">
                            {account.accountNumber} • {account.accountName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <OranjButton variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </OranjButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
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
                <CardDescription>Configure receipt settings for this storefront</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="header">Receipt Header</Label>
                      <Input id="header" defaultValue={storefront.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="footer">Receipt Footer</Label>
                      <Input id="footer" defaultValue="Thank you for shopping with us!" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Custom Message</Label>
                    <Textarea id="message" defaultValue="Come again soon!" rows={2} />
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
              <CardFooter className="flex justify-end gap-2">
                <Link href={`/admin/pos/receipt-settings?store=${storefront.id}`} passHref>
                  <OranjButton>
                    <Settings className="mr-2 h-4 w-4" />
                    Advanced Settings
                  </OranjButton>
                </Link>
              </CardFooter>
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
                      <Input id="wifi" defaultValue="OranjPay-Store" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">WiFi Password</Label>
                      <Input id="password" type="password" defaultValue="********" />
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
                <CardTitle>Storefront Performance</CardTitle>
                <CardDescription>View performance metrics for this storefront</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-muted-foreground">Analytics charts will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
