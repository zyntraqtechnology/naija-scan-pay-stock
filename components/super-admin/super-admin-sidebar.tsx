"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Home,
  ShoppingBag,
  BarChart3,
  Settings,
  Store,
  FileText,
  Wallet,
  ClipboardList,
  UserCheck,
  Shield,
  Database,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Truck,
  Percent,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationStructure = [
  {
    title: "Main",
    items: [{ name: "Dashboard", href: "/super-admin/dashboard", icon: Home }],
  },
  {
    title: "Business Management",
    items: [
      {
        name: "Merchants",
        href: "/super-admin/merchants",
        icon: Store,
      },
      {
        name: "Users & Roles",
        href: "/super-admin/users-roles",
        icon: UserCheck,
        subItems: [
          { name: "Admins", href: "/super-admin/users-roles/admins" },
          { name: "Cashiers", href: "/super-admin/users-roles/cashiers" },
          { name: "Superadmin Staff", href: "/super-admin/users-roles/superadmin" },
          { name: "Permissions Matrix", href: "/super-admin/users-roles/permissions" },
        ],
      },
    ],
  },
  {
    title: "Payments & Orders",
    items: [
      {
        name: "Orders",
        href: "/super-admin/orders",
        icon: ShoppingBag,
        badge: "3",
        subItems: [
          { name: "All Orders", href: "/super-admin/orders" },
          { name: "Pending", href: "/super-admin/orders/pending" },
          { name: "Completed", href: "/super-admin/orders/completed" },
          { name: "Refunds / Disputes", href: "/super-admin/orders/refunds" },
          { name: "Delivery Orders", href: "/super-admin/orders/delivery" },
        ],
      },
      {
        name: "Wallet & Payouts",
        href: "/super-admin/wallet-payouts",
        icon: Wallet,
        subItems: [
          { name: "Superadmin Wallet", href: "/super-admin/wallet-payouts/superadmin" },
          { name: "Subaccounts Wallets", href: "/super-admin/wallet-payouts/subaccounts" },
          { name: "Payout History", href: "/super-admin/wallet-payouts/history" },
          { name: "Reconciliation", href: "/super-admin/wallet-payouts/reconciliation" },
        ],
      },
      {
        name: "Discounts & Delivery",
        href: "/super-admin/discounts-delivery",
        icon: Percent,
        subItems: [
          { name: "Global Discounts", href: "/super-admin/discounts-delivery/global" },
          { name: "Merchant Discounts", href: "/super-admin/discounts-delivery/merchant" },
          { name: "Delivery Charges", href: "/super-admin/discounts-delivery/charges" },
        ],
      },
    ],
  },
  {
    title: "Analytics & Reports",
    items: [
      { name: "Sales Reports", href: "/super-admin/sales-reports", icon: TrendingUp },
      { name: "Wallet & Payout Reports", href: "/super-admin/wallet-reports", icon: BarChart3 },
      { name: "Delivery Cost Reports", href: "/super-admin/delivery-reports", icon: Truck },
      { name: "Custom Export Builder", href: "/super-admin/export-builder", icon: FileText },
      { name: "Scheduled Reports", href: "/super-admin/scheduled-reports", icon: ClipboardList },
    ],
  },
  {
    title: "Risk & Compliance",
    items: [
      { name: "Suspicious Activity Alerts", href: "/super-admin/suspicious-activity", icon: AlertTriangle },
      { name: "Blacklists", href: "/super-admin/blacklists", icon: Shield },
      { name: "KYC / AML Review", href: "/super-admin/kyc-aml", icon: UserCheck },
      { name: "Settlement Holds", href: "/super-admin/settlement-holds", icon: RefreshCw },
    ],
  },
  {
    title: "Logs & Support",
    items: [
      {
        name: "Logs & Audit",
        href: "/super-admin/logs-audit",
        icon: Database,
        subItems: [
          { name: "API/System Logs", href: "/super-admin/logs-audit/api" },
          { name: "Audit Trail", href: "/super-admin/logs-audit/trail" },
        ],
      },
      {
        name: "Support Tools",
        href: "/super-admin/support-tools",
        icon: HelpCircle,
        subItems: [
          { name: "Impersonate Merchant", href: "/super-admin/support-tools/impersonate" },
          { name: "Diagnostics", href: "/super-admin/support-tools/diagnostics" },
          { name: "Support Tickets", href: "/super-admin/support-tools/tickets" },
        ],
      },
    ],
  },
]

interface SuperAdminSidebarProps {
  onSettingsClick: () => void
}

export function SuperAdminSidebar({ onSettingsClick }: SuperAdminSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null)

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const isItemActive = (href: string, subItems?: any[]) => {
    if (pathname === href) return true
    if (subItems) {
      return subItems.some((subItem) => pathname === subItem.href)
    }
    return false
  }

  const renderNavItem = (item: any) => {
    const isActive = isItemActive(item.href, item.subItems)
    const isExpanded = expandedItems.includes(item.name)
    const hasSubItems = item.subItems && item.subItems.length > 0

    return (
      <div key={item.name}>
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors relative cursor-pointer",
            isActive
              ? "bg-[#e8e8e8] text-[#1f2937] font-semibold"
              : "text-[#4b5563] hover:bg-[#f0f0f0] hover:text-[#1f2937]",
          )}
          onClick={() => (hasSubItems ? toggleExpanded(item.name) : null)}
        >
          {hasSubItems ? (
            <>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate">{item.name}</span>
              {item.badge && (
                <span className="bg-[#d1d5db] text-[#374151] text-xs px-2 py-0.5 rounded-full font-medium min-w-[20px] text-center flex-shrink-0 mr-1">
                  {item.badge}
                </span>
              )}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              )}
            </>
          ) : (
            <Link href={item.href} className="flex items-center gap-3 w-full">
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate">{item.name}</span>
              {item.badge && (
                <span className="bg-[#d1d5db] text-[#374151] text-xs px-2 py-0.5 rounded-full font-medium min-w-[20px] text-center flex-shrink-0">
                  {item.badge}
                </span>
              )}
            </Link>
          )}
        </div>

        {hasSubItems && isExpanded && (
          <div className="ml-6 mt-1 space-y-1 relative">
            {item.subItems.map((subItem: any, index: number) => {
              const isSubActive = pathname === subItem.href
              return (
                <div key={subItem.name} className="relative">
                  <Link
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors relative",
                      isSubActive
                        ? "bg-white text-[#1f2937] font-semibold shadow-sm"
                        : "text-[#6b7280] hover:bg-[#f0f0f0] hover:text-[#1f2937]",
                    )}
                  >
                    <span className="truncate">{subItem.name}</span>
                  </Link>

                  {isSubActive && (
                    <>
                      <div
                        className="absolute left-[-16px] top-1/2 w-4 h-[18px] transform -translate-y-1/2"
                        style={{
                          borderLeft: "1.5px solid #d8dadf",
                          borderBottom: "1.5px solid #d8dadf",
                          borderBottomLeftRadius: "12px",
                        }}
                      />
                      <div
                        className="absolute left-[-16px] bottom-[18px] w-0"
                        style={{
                          borderLeft: "1.5px solid #d8dadf",
                          height: `${(item.subItems.length - index - 1) * 36 + 12}px`,
                        }}
                      />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const renderNavSection = (section: any) => (
    <div key={section.title} className="pt-6">
      <div className="flex items-center justify-between px-3 mb-3">
        <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider truncate">{section.title}</h3>
      </div>
      <div className="space-y-1">{section.items.map(renderNavItem)}</div>
    </div>
  )

  return (
    <div className="w-64 bg-[#f7f7f7] border-r border-[#e1e5e9] flex flex-col fixed left-0 top-14 h-[calc(100vh-56px)] z-10">
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">{navigationStructure.map(renderNavSection)}</nav>
      <div className="border-t border-[#e1e5e9] p-3 flex-shrink-0 bg-[#f7f7f7]">
        <button
          onClick={onSettingsClick}
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors w-full text-left",
            "text-[#4b5563] hover:bg-[#f0f0f0] hover:text-[#1f2937]",
          )}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">Settings</span>
        </button>
      </div>
    </div>
  )
}
