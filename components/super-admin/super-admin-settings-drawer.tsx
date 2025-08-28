"use client"

import { X, Settings, CreditCard, Users, Calculator, Bell, Palette, Percent, Flag, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"

interface SuperAdminSettingsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const GeneralSettings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Company Information</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-1">Company Name</label>
            <input
              type="text"
              defaultValue="OranjPay"
              className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-1">Email</label>
            <input
              type="email"
              defaultValue="admin@oranjpay.com"
              className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-1">Address</label>
          <textarea
            defaultValue="Lagos, Victoria Island, Nigeria"
            className="w-full px-3 py-2 border border-[#d1d5e9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
            rows={3}
          />
        </div>
      </div>
    </div>

    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Default Settings</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-1">Default Currency</label>
            <select className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]">
              <option>Nigerian Naira (NGN)</option>
              <option>US Dollar (USD)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-1">Time Zone</label>
            <select className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]">
              <option>(GMT+01:00) West Central Africa</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-1">Default Delivery Fee (NGN)</label>
          <input
            type="number"
            defaultValue="500"
            className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
          />
        </div>
      </div>
    </div>
  </div>
)

const PlanSettings = () => (
  <div className="p-6">
    <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Plan</h2>
    <div className="bg-white rounded-lg border border-[#e1e5e9] p-4">
      <p className="text-[#6b7280]">Plan settings and subscription management</p>
    </div>
  </div>
)

const UsersSettings = () => (
  <div className="p-6">
    <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Users</h2>
    <div className="bg-white rounded-lg border border-[#e1e5e9] p-4">
      <p className="text-[#6b7280]">User management and permissions</p>
    </div>
  </div>
)

const BrandingSettings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Branding</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-2">Logo & Favicon</label>
          <div className="border-2 border-dashed border-[#d1d5db] rounded-lg p-4 text-center">
            <p className="text-sm text-[#6b7280]">Upload your company logo</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-2">Theme Colors</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#6b7280] mb-1">Primary</label>
              <input type="color" value="#06b6d4" className="w-full h-10 rounded border border-[#d1d5db]" />
            </div>
            <div>
              <label className="block text-xs text-[#6b7280] mb-1">Secondary</label>
              <input type="color" value="#10b981" className="w-full h-10 rounded border border-[#d1d5db]" />
            </div>
            <div>
              <label className="block text-xs text-[#6b7280] mb-1">Accent</label>
              <input type="color" value="#f59e0b" className="w-full h-10 rounded border border-[#d1d5db]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const PaymentsSettings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Payment Configuration</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-2">Flutterwave API Keys</label>
          <input
            type="password"
            placeholder="Enter your Flutterwave secret key"
            className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-2">Payment Rails</label>
          <div className="space-y-2">
            {["QR Code", "Virtual Account", "Card Payment", "Cash"].map((rail) => (
              <label key={rail} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-[#1f2937]">{rail}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-2">Settlement Cycle</label>
          <select className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]">
            <option>T+1 (Next day)</option>
            <option>T+3 (3 days)</option>
            <option>T+7 (Weekly)</option>
          </select>
        </div>
      </div>
    </div>
  </div>
)

const DiscountsPricingSettings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Global Discount Rules</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-1">Maximum Discount (%)</label>
            <input
              type="number"
              defaultValue="50"
              className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-1">Delivery Fee Override</label>
            <select className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]">
              <option>Flat Rate</option>
              <option>Percentage</option>
              <option>Free Delivery</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const TaxesComplianceSettings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Tax Configuration</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-2">VAT Rate (%)</label>
          <input
            type="number"
            defaultValue="7.5"
            className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#1f2937]">Compliance Features</label>
          {["NDPR Compliance", "GDPR Compliance", "KYC Requirements"].map((feature) => (
            <label key={feature} className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-[#1f2937]">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const NotificationsSettings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Email Templates</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        {["Order Confirmation", "Payout Notification", "Refund Processed"].map((template) => (
          <div key={template} className="flex items-center justify-between p-3 border border-[#e1e5e9] rounded-lg">
            <span className="text-sm font-medium text-[#1f2937]">{template}</span>
            <button className="px-3 py-1 text-xs bg-[#06b6d4] text-white rounded-md hover:bg-[#0891b2]">
              Edit Template
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const UsersPermissionsSettings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Role & Permission Matrix</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        <div className="grid grid-cols-4 gap-4 text-sm font-medium text-[#1f2937] border-b pb-2">
          <div>Permission</div>
          <div>Superadmin</div>
          <div>Admin</div>
          <div>Cashier</div>
        </div>
        {["View Orders", "Process Refunds", "Manage Users", "Access Reports"].map((permission) => (
          <div key={permission} className="grid grid-cols-4 gap-4 text-sm py-2">
            <div className="text-[#1f2937]">{permission}</div>
            <div>
              <input type="checkbox" defaultChecked disabled className="rounded" />
            </div>
            <div>
              <input type="checkbox" defaultChecked={permission !== "Manage Users"} className="rounded" />
            </div>
            <div>
              <input type="checkbox" defaultChecked={permission === "View Orders"} className="rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const UpdatesMaintenanceSettings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">System Updates</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[#1f2937]">Force POS App Update</p>
            <p className="text-sm text-[#6b7280]">Require all POS devices to update to latest version</p>
          </div>
          <button className="px-4 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c]">Force Update</button>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-2">Maintenance Banner</label>
          <textarea
            placeholder="Enter maintenance message for users..."
            className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
            rows={3}
          />
        </div>
      </div>
    </div>
  </div>
)

const FeatureFlagsSettings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-[#1f2937] mb-4">Feature Flags</h2>
      <div className="bg-white rounded-lg border border-[#e1e5e9] p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-3">Module Controls</label>
          <div className="space-y-3">
            {["Inventory Management", "Loyalty Programs", "Delivery Tracking", "Refund Processing"].map((feature) => (
              <div key={feature} className="flex items-center justify-between">
                <span className="text-sm text-[#1f2937]">{feature}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#06b6d4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#06b6d4]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export function SuperAdminSettingsDrawer({ isOpen, onClose }: SuperAdminSettingsDrawerProps) {
  const [activeSection, setActiveSection] = useState("General")
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()

  const settingsItems = [
    { name: "General", icon: Settings },
    { name: "Branding", icon: Palette },
    { name: "Payments", icon: CreditCard },
    { name: "Discounts & Pricing", icon: Percent },
    { name: "Taxes & Compliance", icon: Calculator },
    { name: "Notifications", icon: Bell },
    { name: "Users & Permissions", icon: Users },
    { name: "Feature Flags", icon: Flag },
    { name: "Updates & Maintenance", icon: Wrench },
  ]

  const filteredItems = settingsItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const renderContent = () => {
    switch (activeSection) {
      case "General":
        return <GeneralSettings />
      case "Branding":
        return <BrandingSettings />
      case "Payments":
        return <PaymentsSettings />
      case "Discounts & Pricing":
        return <DiscountsPricingSettings />
      case "Taxes & Compliance":
        return <TaxesComplianceSettings />
      case "Notifications":
        return <NotificationsSettings />
      case "Users & Permissions":
        return <UsersPermissionsSettings />
      case "Feature Flags":
        return <FeatureFlagsSettings />
      case "Updates & Maintenance":
        return <UpdatesMaintenanceSettings />
      default:
        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-[#1f2937] mb-4">{activeSection}</h2>
            <div className="bg-white rounded-lg border border-[#e1e5e9] p-4">
              <p className="text-[#6b7280]">{activeSection} settings coming soon</p>
            </div>
          </div>
        )
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-40 transition-all duration-300" onClick={onClose} />
      )}

      <div
        className={cn(
          "fixed inset-x-4 bottom-0 h-[85vh] max-w-6xl mx-auto bg-white border-t border-[#e1e5e9] shadow-xl z-50 transition-all duration-300 flex rounded-t-[20px]",
          isOpen ? "transform translate-y-0" : "transform translate-y-full",
        )}
      >
        <div className="w-80 bg-[#f7f7f7] border-r border-[#e1e5e9] flex flex-col rounded-tl-[20px] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#e1e5e9] bg-white rounded-tl-[20px] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#06b6d4] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0) || "OP"}
              </div>
              <div>
                <h2 className="font-semibold text-[#1f2937]">{user?.name || "OranjPay"}</h2>
                <p className="text-sm text-[#6b7280]">oranjpay.com</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-[#e1e5e9] bg-[#f7f7f7] flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent"
              />
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto bg-[#f7f7f7]">
            {filteredItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.name)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors w-full text-left",
                    activeSection === item.name
                      ? "bg-white text-[#1f2937] shadow-sm"
                      : "text-[#4b5563] hover:bg-[#f0f0f0] hover:text-[#1f2937]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="flex-1 bg-[#fafafa] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-[#e1e5e9] px-6 py-4 z-10 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[#1f2937] flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {activeSection}
            </h1>
            <button onClick={onClose} className="p-1 hover:bg-[#f3f4f6] rounded-md transition-colors">
              <X className="h-5 w-5 text-[#6b7280]" />
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </>
  )
}
