"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Printer,
  Wifi,
  Usb,
  Bluetooth,
  Save,
  ArrowLeft,
  Eye,
  Scissors,
  DollarSign,
  FlaskConical,
  Play,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin/admin-header"
import { OranjButton } from "@/components/ui/oranj-button"
import { Badge } from "@/components/ui/badge"

export default function PrinterSettingsPage() {
  const searchParams = useSearchParams()
  const branchId = searchParams.get("branch") || "main-branch"

  const [selectedPrinter, setSelectedPrinter] = useState("receipt-printer-1")
  const [printerSettings, setPrinterSettings] = useState({
    name: "Receipt Printer 1",
    type: "thermal",
    connection: "usb",
    ipAddress: "192.168.1.100",
    port: "9100",
    paperWidth: "80mm",
    autocut: true,
    cashDrawer: true,
    testMode: false,
  })

  const printers = [
    { id: "receipt-printer-1", name: "Receipt Printer 1", type: "Thermal", status: "online", connection: "USB" },
    { id: "receipt-printer-2", name: "Receipt Printer 2", type: "Thermal", status: "offline", connection: "Network" },
    { id: "kitchen-printer", name: "Kitchen Printer", type: "Impact", status: "online", connection: "Network" },
  ]

  const handleSaveSettings = () => {
    console.log("Saving printer settings:", printerSettings)
    // Implementation for saving settings
  }

  const handleTestPrint = () => {
    console.log("Testing printer:", selectedPrinter)
    // Implementation for test print
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="Printer Settings"
        description={`Configure printer settings for ${branchId.replace("-", " ")}`}
      />

      <div className="flex-1 space-y-6 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/pos">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to POS
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Printer Configuration</h2>
              <p className="text-muted-foreground">Manage printer settings and connections</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleTestPrint}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300"
            >
              <Play className="mr-2 h-4 w-4" />
              Test Print
            </Button>
            <OranjButton onClick={handleSaveSettings} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </OranjButton>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Printer Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Available Printers</CardTitle>
              <CardDescription>Select a printer to configure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {printers.map((printer) => (
                <div
                  key={printer.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPrinter === printer.id ? "border-[#635BFF] bg-[#635BFF]/5" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedPrinter(printer.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Printer className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{printer.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {printer.type} • {printer.connection}
                        </div>
                      </div>
                    </div>
                    <Badge variant={printer.status === "online" ? "default" : "secondary"}>{printer.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Printer Configuration */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Printer Configuration</CardTitle>
                <CardDescription>Configure settings for the selected printer</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="connection">Connection</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4 mt-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="printer-name">Printer Name</Label>
                        <Input
                          id="printer-name"
                          value={printerSettings.name}
                          onChange={(e) => setPrinterSettings({ ...printerSettings, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="printer-type">Printer Type</Label>
                        <Select
                          value={printerSettings.type}
                          onValueChange={(value) => setPrinterSettings({ ...printerSettings, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="thermal">Thermal Printer</SelectItem>
                            <SelectItem value="impact">Impact Printer</SelectItem>
                            <SelectItem value="inkjet">Inkjet Printer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paper-width">Paper Width</Label>
                      <Select
                        value={printerSettings.paperWidth}
                        onValueChange={(value) => setPrinterSettings({ ...printerSettings, paperWidth: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="58mm">58mm</SelectItem>
                          <SelectItem value="80mm">80mm</SelectItem>
                          <SelectItem value="112mm">112mm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="autocut">Auto Cut</Label>
                          <p className="text-sm text-muted-foreground">Automatically cut paper after printing</p>
                        </div>
                        <Switch
                          id="autocut"
                          checked={printerSettings.autocut}
                          onCheckedChange={(checked) => setPrinterSettings({ ...printerSettings, autocut: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="cash-drawer">Cash Drawer Control</Label>
                          <p className="text-sm text-muted-foreground">Enable cash drawer opening via printer</p>
                        </div>
                        <Switch
                          id="cash-drawer"
                          checked={printerSettings.cashDrawer}
                          onCheckedChange={(checked) => setPrinterSettings({ ...printerSettings, cashDrawer: checked })}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="connection" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="connection-type">Connection Type</Label>
                      <Select
                        value={printerSettings.connection}
                        onValueChange={(value) => setPrinterSettings({ ...printerSettings, connection: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usb">
                            <div className="flex items-center gap-2">
                              <Usb className="h-4 w-4" />
                              USB Connection
                            </div>
                          </SelectItem>
                          <SelectItem value="network">
                            <div className="flex items-center gap-2">
                              <Wifi className="h-4 w-4" />
                              Network (Ethernet/WiFi)
                            </div>
                          </SelectItem>
                          <SelectItem value="bluetooth">
                            <div className="flex items-center gap-2">
                              <Bluetooth className="h-4 w-4" />
                              Bluetooth
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {printerSettings.connection === "network" && (
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="ip-address">IP Address</Label>
                          <Input
                            id="ip-address"
                            value={printerSettings.ipAddress}
                            onChange={(e) => setPrinterSettings({ ...printerSettings, ipAddress: e.target.value })}
                            placeholder="192.168.1.100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="port">Port</Label>
                          <Input
                            id="port"
                            value={printerSettings.port}
                            onChange={(e) => setPrinterSettings({ ...printerSettings, port: e.target.value })}
                            placeholder="9100"
                          />
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Connection Status</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-green-700">Connected and ready</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="test-mode">Test Mode</Label>
                          <p className="text-sm text-muted-foreground">Enable test mode for debugging</p>
                        </div>
                        <Switch
                          id="test-mode"
                          checked={printerSettings.testMode}
                          onCheckedChange={(checked) => setPrinterSettings({ ...printerSettings, testMode: checked })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Print Density</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Print Speed</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="fast">Fast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Advanced Settings</h4>
                      <p className="text-sm text-yellow-700">
                        These settings should only be modified by technical personnel. Incorrect settings may cause
                        printing issues.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Print Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Print Preview
              </CardTitle>
              <CardDescription>Live preview of printed output</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Paper Width Indicator */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Paper Width:</span>
                  <Badge variant="outline">{printerSettings.paperWidth}</Badge>
                </div>

                {/* Print Preview Container */}
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 relative overflow-hidden">
                  {/* Paper width simulation */}
                  <div
                    className={`mx-auto bg-white shadow-sm border rounded font-mono text-xs leading-relaxed ${
                      printerSettings.paperWidth === "58mm"
                        ? "max-w-[180px]"
                        : printerSettings.paperWidth === "80mm"
                          ? "max-w-[250px]"
                          : "max-w-[320px]"
                    }`}
                    style={{
                      fontFamily:
                        printerSettings.type === "thermal"
                          ? "monospace"
                          : printerSettings.type === "impact"
                            ? "courier"
                            : "sans-serif",
                    }}
                  >
                    <div className="p-3 space-y-2">
                      {/* Business Header */}
                      <div className="text-center space-y-1">
                        <div className="font-bold text-sm">ORANJPAY STORE</div>
                        <div className="text-xs">123 Lagos Street, Victoria Island</div>
                        <div className="text-xs">Lagos, Nigeria</div>
                        <div className="text-xs">Tel: +234 123 456 7890</div>
                        <div className="text-xs">Email: store@oranjpay.com</div>
                      </div>

                      {/* Separator */}
                      <div className="border-t border-dashed border-gray-400 my-2"></div>

                      {/* Receipt Info */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Receipt #:</span>
                          <span>POS001234</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span>{new Date().toLocaleTimeString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cashier:</span>
                          <span>Sarah J.</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Terminal:</span>
                          <span>{printerSettings.name}</span>
                        </div>
                      </div>

                      {/* Separator */}
                      <div className="border-t border-dashed border-gray-400 my-2"></div>

                      {/* Items */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Coca Cola 500ml</span>
                          <span>₦500.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bread (Sliced)</span>
                          <span>₦300.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Milk 1L</span>
                          <span>₦800.00</span>
                        </div>
                      </div>

                      {/* Separator */}
                      <div className="border-t border-dashed border-gray-400 my-2"></div>

                      {/* Totals */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>₦1,600.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (7.5%):</span>
                          <span>₦120.00</span>
                        </div>
                        <div className="flex justify-between font-bold border-t border-gray-400 pt-1">
                          <span>TOTAL:</span>
                          <span>₦1,720.00</span>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="border-t border-dashed border-gray-400 my-2"></div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Payment:</span>
                          <span>Cash</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Paid:</span>
                          <span>₦2,000.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Change:</span>
                          <span>₦280.00</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-dashed border-gray-400 my-2"></div>
                      <div className="text-center text-xs space-y-1">
                        <div>Thank you for shopping with us!</div>
                        <div>Please come again soon</div>
                        <div className="mt-2">
                          <div className="text-xs">Powered by OranjPay</div>
                        </div>
                      </div>

                      {/* Auto-cut indicator */}
                      {printerSettings.autocut && (
                        <div className="border-t-2 border-gray-400 mt-3 pt-1">
                          <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                            <Scissors className="h-3 w-3" />
                            Auto Cut
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Printer Type Indicator */}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {printerSettings.type.charAt(0).toUpperCase() + printerSettings.type.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Print Quality Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Print Quality:</span>
                    <div className="flex items-center gap-2">
                      {printerSettings.type === "thermal" && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs">High</span>
                        </div>
                      )}
                      {printerSettings.type === "impact" && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-xs">Medium</span>
                        </div>
                      )}
                      {printerSettings.type === "inkjet" && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-xs">Very High</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Print Speed:</span>
                    <div className="flex items-center gap-2">
                      {printerSettings.type === "thermal" && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs">Fast</span>
                        </div>
                      )}
                      {printerSettings.type === "impact" && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-xs">Slow</span>
                        </div>
                      )}
                      {printerSettings.type === "inkjet" && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-xs">Medium</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {printerSettings.cashDrawer && (
                    <div className="p-2 bg-green-50 rounded text-xs text-green-700 flex items-center gap-2">
                      <DollarSign className="h-3 w-3" />
                      Cash drawer will open after printing
                    </div>
                  )}

                  {printerSettings.testMode && (
                    <div className="p-2 bg-yellow-50 rounded text-xs text-yellow-700 flex items-center gap-2">
                      <FlaskConical className="h-3 w-3" />
                      Test mode enabled - prints will include debug info
                    </div>
                  )}
                </div>

                {/* Connection Status */}
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Connection:</span>
                    <div className="flex items-center gap-2">
                      {printerSettings.connection === "usb" && <Usb className="h-3 w-3" />}
                      {printerSettings.connection === "network" && <Wifi className="h-3 w-3" />}
                      {printerSettings.connection === "bluetooth" && <Bluetooth className="h-3 w-3" />}
                      <span className="text-xs capitalize">{printerSettings.connection}</span>
                    </div>
                  </div>
                  {printerSettings.connection === "network" && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {printerSettings.ipAddress}:{printerSettings.port}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
