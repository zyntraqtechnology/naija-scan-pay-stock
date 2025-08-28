"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Save, Eye, ArrowLeft, Upload, ImageIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin/admin-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReceiptSettingsPage() {
  const searchParams = useSearchParams()
  const branchId = searchParams.get("branch") || "main-branch"

  const [receiptSettings, setReceiptSettings] = useState({
    businessName: "OranjPay Store",
    address: "123 Lagos Street, Nigeria",
    phone: "+234 123 456 7890",
    email: "contact@oranjpay.com",
    website: "www.oranjpay.com",
    taxId: "TAX123456789",
    header: "Thank you for shopping with us!",
    footer: "Please come again soon!",
    showLogo: true,
    showQrCode: true,
    showTaxBreakdown: true,
    showItemCodes: false,
    fontSize: "normal",
    paperWidth: "80mm",
    includePromo: true,
  })

  const handleSaveSettings = () => {
    console.log("Saving receipt settings:", receiptSettings)
    // Implementation for saving settings
  }

  const handlePreview = () => {
    console.log("Previewing receipt with current settings")
    // Implementation for receipt preview
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="Receipt Settings"
        description={`Customize receipt appearance for ${branchId.replace("-", " ")}`}
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
              <h2 className="text-2xl font-bold tracking-tight">Receipt Customization</h2>
              <p className="text-muted-foreground">Design and configure your receipt layout</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleSaveSettings} className="bg-[#635BFF] hover:bg-[#5148e6] text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Receipt Configuration */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Receipt Configuration</CardTitle>
                <CardDescription>Customize your receipt content and appearance</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="business">
                  <TabsList>
                    <TabsTrigger value="business">Business Info</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                  </TabsList>

                  <TabsContent value="business" className="space-y-4 mt-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input
                          id="business-name"
                          value={receiptSettings.businessName}
                          onChange={(e) => setReceiptSettings({ ...receiptSettings, businessName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={receiptSettings.phone}
                          onChange={(e) => setReceiptSettings({ ...receiptSettings, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={receiptSettings.address}
                        onChange={(e) => setReceiptSettings({ ...receiptSettings, address: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={receiptSettings.email}
                          onChange={(e) => setReceiptSettings({ ...receiptSettings, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={receiptSettings.website}
                          onChange={(e) => setReceiptSettings({ ...receiptSettings, website: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Tax ID / Registration Number</Label>
                      <Input
                        id="tax-id"
                        value={receiptSettings.taxId}
                        onChange={(e) => setReceiptSettings({ ...receiptSettings, taxId: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Business Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="layout" className="space-y-4 mt-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="paper-width">Paper Width</Label>
                        <Select
                          value={receiptSettings.paperWidth}
                          onValueChange={(value) => setReceiptSettings({ ...receiptSettings, paperWidth: value })}
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
                      <div className="space-y-2">
                        <Label htmlFor="font-size">Font Size</Label>
                        <Select
                          value={receiptSettings.fontSize}
                          onValueChange={(value) => setReceiptSettings({ ...receiptSettings, fontSize: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="show-logo">Show Logo</Label>
                          <p className="text-sm text-muted-foreground">Display business logo on receipt</p>
                        </div>
                        <Switch
                          id="show-logo"
                          checked={receiptSettings.showLogo}
                          onCheckedChange={(checked) => setReceiptSettings({ ...receiptSettings, showLogo: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="show-qr">Show QR Code</Label>
                          <p className="text-sm text-muted-foreground">Include QR code for digital receipt</p>
                        </div>
                        <Switch
                          id="show-qr"
                          checked={receiptSettings.showQrCode}
                          onCheckedChange={(checked) => setReceiptSettings({ ...receiptSettings, showQrCode: checked })}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="header-message">Header Message</Label>
                      <Textarea
                        id="header-message"
                        value={receiptSettings.header}
                        onChange={(e) => setReceiptSettings({ ...receiptSettings, header: e.target.value })}
                        placeholder="Thank you for shopping with us!"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="footer-message">Footer Message</Label>
                      <Textarea
                        id="footer-message"
                        value={receiptSettings.footer}
                        onChange={(e) => setReceiptSettings({ ...receiptSettings, footer: e.target.value })}
                        placeholder="Please come again soon!"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="tax-breakdown">Show Tax Breakdown</Label>
                          <p className="text-sm text-muted-foreground">Display detailed tax information</p>
                        </div>
                        <Switch
                          id="tax-breakdown"
                          checked={receiptSettings.showTaxBreakdown}
                          onCheckedChange={(checked) =>
                            setReceiptSettings({ ...receiptSettings, showTaxBreakdown: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="item-codes">Show Item Codes</Label>
                          <p className="text-sm text-muted-foreground">Display product SKU/barcode numbers</p>
                        </div>
                        <Switch
                          id="item-codes"
                          checked={receiptSettings.showItemCodes}
                          onCheckedChange={(checked) =>
                            setReceiptSettings({ ...receiptSettings, showItemCodes: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="promo-messages">Include Promotional Messages</Label>
                          <p className="text-sm text-muted-foreground">Show special offers and promotions</p>
                        </div>
                        <Switch
                          id="promo-messages"
                          checked={receiptSettings.includePromo}
                          onCheckedChange={(checked) =>
                            setReceiptSettings({ ...receiptSettings, includePromo: checked })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Receipt Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Receipt Preview</CardTitle>
              <CardDescription>Live preview of your receipt design</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-4 font-mono text-xs space-y-2 max-w-[250px] mx-auto">
                {receiptSettings.showLogo && (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                )}

                <div className="text-center space-y-1">
                  <div className="font-bold">{receiptSettings.businessName}</div>
                  <div className="text-xs">{receiptSettings.address}</div>
                  <div className="text-xs">{receiptSettings.phone}</div>
                  <div className="text-xs">{receiptSettings.email}</div>
                  {receiptSettings.website && <div className="text-xs">{receiptSettings.website}</div>}
                </div>

                <div className="border-t border-dashed my-2"></div>

                {receiptSettings.header && <div className="text-center text-xs">{receiptSettings.header}</div>}

                <div className="border-t border-dashed my-2"></div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Receipt #: 001234</span>
                    <span>12/01/2024</span>
                  </div>
                  <div>Cashier: Sarah Johnson</div>
                  <div>Terminal: 1</div>
                </div>

                <div className="border-t border-dashed my-2"></div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Coca Cola</span>
                    <span>₦500.00</span>
                  </div>
                  {receiptSettings.showItemCodes && <div className="text-xs text-gray-500 ml-2">SKU: CC001</div>}
                  <div className="flex justify-between">
                    <span>Bread</span>
                    <span>₦300.00</span>
                  </div>
                  {receiptSettings.showItemCodes && <div className="text-xs text-gray-500 ml-2">SKU: BR001</div>}
                </div>

                <div className="border-t border-dashed my-2"></div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₦800.00</span>
                  </div>
                  {receiptSettings.showTaxBreakdown && (
                    <div className="flex justify-between">
                      <span>Tax (7.5%):</span>
                      <span>₦60.00</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>₦860.00</span>
                  </div>
                </div>

                <div className="border-t border-dashed my-2"></div>

                <div className="space-y-1">
                  <div>Payment: Cash</div>
                  <div className="flex justify-between">
                    <span>Paid:</span>
                    <span>₦1000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Change:</span>
                    <span>₦140.00</span>
                  </div>
                </div>

                {receiptSettings.taxId && (
                  <>
                    <div className="border-t border-dashed my-2"></div>
                    <div className="text-center text-xs">Tax ID: {receiptSettings.taxId}</div>
                  </>
                )}

                {receiptSettings.footer && (
                  <>
                    <div className="border-t border-dashed my-2"></div>
                    <div className="text-center text-xs">{receiptSettings.footer}</div>
                  </>
                )}

                {receiptSettings.showQrCode && (
                  <div className="text-center mt-2">
                    <div className="w-16 h-16 bg-gray-200 rounded mx-auto flex items-center justify-center">
                      <span className="text-xs">QR</span>
                    </div>
                    <div className="text-xs mt-1">Scan for digital receipt</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
