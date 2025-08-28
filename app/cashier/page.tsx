"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Menu,
  LogOut,
  Settings,
  CreditCard,
  X,
  ChevronDown,
  User,
  Smartphone,
  Building,
  Banknote,
  MapPin,
  LayoutGrid,
  List,
  UserCircle,
  Home,
  FileText,
  HelpCircle,
  Bell,
  Trash2,
  Award,
  Tag,
  Truck,
  Pause,
  Signal,
  ListOrdered,
  BarChart4,
  Calendar,
  RotateCcw,
  Filter,
  ChevronUp,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Combobox } from "@/components/ui/combobox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DynamicTimeDisplay } from "@/components/cashier/dynamic-time-display"
import { QRCodeDisplay } from "@/components/cashier/qr-code-display"
import { ReceiptModal } from "@/components/cashier/receipt-modal"
import { Badge } from "@/components/ui/badge"

// Mock product data
const products = [
  {
    id: 1,
    name: "Coca-Cola",
    price: 250,
    category: "Drinks",
    image: "/products/coca-cola.png",
    stock: 122,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 2,
    name: "Chivita Juice",
    price: 500,
    category: "Drinks",
    image: "/products/juice-chivita.png",
    stock: 85,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 3,
    name: "Beef Sausage",
    price: 1200,
    category: "Food",
    image: "/products/beef-sausage.png",
    stock: 37,
    type: "Product",
    saleType: "Wholesale",
  },
  {
    id: 4,
    name: "Whisky",
    price: 5000,
    category: "Alcohol",
    image: "/products/whisky.png",
    stock: 15,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 5,
    name: "Dettol Soap",
    price: 350,
    category: "Toiletries",
    image: "/products/dettol.png",
    stock: 200,
    type: "Product",
    saleType: "Wholesale",
  },
  {
    id: 6,
    name: "Nivea Lotion",
    price: 1800,
    category: "Cosmetics",
    image: "/products/nivea.png",
    stock: 42,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 7,
    name: "Joy Soap",
    price: 250,
    category: "Toiletries",
    image: "/products/joy-soap.png",
    stock: 150,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 8,
    name: "Delivery Service",
    price: 1000,
    category: "Services",
    image: "/diverse-delivery-network.png",
    stock: 999,
    type: "Service",
    saleType: "Retail",
  },
  {
    id: 9,
    name: "Gift Wrapping",
    price: 500,
    category: "Services",
    image: "/festive-gift-wrapping.png",
    stock: 999,
    type: "Service",
    saleType: "Retail",
  },
]

// Extract unique categories
const categories = ["All", ...new Set(products.map((product) => product.category))]

// Product types
const productTypes = [
  { label: "All", value: "all" },
  { label: "Products", value: "Product" },
  { label: "Services", value: "Service" },
]

// Sale types
const saleTypes = [
  { label: "All", value: "all" },
  { label: "Retail", value: "Retail" },
  { label: "Wholesale", value: "Wholesale" },
]

// Cart item type
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  sku?: string
}

interface HeldOrder {
  id: string
  items: CartItem[]
  total: number
  timestamp: Date
}

interface Order {
  id: string
  items: CartItem[]
  total: number
  timestamp: Date
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

interface Bank {
  name: string
  code: string
  logo: string
  ussd?: string
}

const banks: Bank[] = [
  {
    name: "First Bank",
    code: "011",
    logo: "https://zyntraqtech.com/wp-content/uploads/2025/03/First_Bank_of_Nigeria_logo.png",
    ussd: "*894#",
  },
  { name: "GTBank", code: "058", logo: "https://zyntraqtech.com/wp-content/uploads/2025/05/images.png", ussd: "*737#" },
  {
    name: "Access Bank",
    code: "044",
    logo: "https://zyntraqtech.com/wp-content/uploads/2025/03/Access-Bank-New-Identity-1024x247-1.png",
    ussd: "*901#",
  },
  {
    name: "Zenith Bank",
    code: "057",
    logo: "https://zyntraqtech.com/wp-content/uploads/2025/03/zenith-bank-logo_1.png",
    ussd: "*966#",
  },
  {
    name: "Stanbic IBTC",
    code: "057",
    logo: "https://zyntraqtech.com/wp-content/uploads/2025/03/Stanbic-ibtc-3.png",
    ussd: "*966#",
  },
  {
    name: "UBA",
    code: "033",
    logo: "https://zyntraqtech.com/wp-content/uploads/2025/05/United_Bank_for_Africa_logo.svg.png",
    ussd: "*919#",
  },
  {
    name: "Wema Bank",
    code: "035",
    logo: "https://zyntraqtech.com/wp-content/uploads/2025/05/Wema-Bank-Logo-scaled.png",
    ussd: "*945#",
  },
  {
    name: "Sterling Bank",
    code: "232",
    logo: "https://zyntraqtech.com/wp-content/uploads/2025/05/SterlingLogo-scaled.png",
    ussd: "*822#",
  },
  {
    name: "Fidelity Bank",
    code: "070",
    logo: "https://zyntraqtech.com/wp-content/uploads/2025/03/fidelity-bank-nigeria-icon-1745x2048-ildkqybv.png",
    ussd: "*770#",
  },
]

export default function CashierPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, logout } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mounted, setMounted] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [isBankTransferOpen, setIsBankTransferOpen] = useState(false)
  const [isHeldOrdersOpen, setIsHeldOrdersOpen] = useState(false)
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false)
  const [heldOrders, setHeldOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<HeldOrder | null>(null)
  const [virtualAccount, setVirtualAccount] = useState<string>("")
  const [loadingVirtualAccount, setLoadingVirtualAccount] = useState(false)
  const [selectedBank, setSelectedBank] = useState<string>("")
  const [verifyingPayment, setVerifyingPayment] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [shopName, setShopName] = useState("OranjPay Demo Store")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [editingQuantity, setEditingQuantity] = useState<number | null>(null)
  const [quantityValue, setQuantityValue] = useState<string>("")
  const [discount, setDiscount] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false)
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false)
  const [isLoyaltyDialogOpen, setIsLoyaltyDialogOpen] = useState(false)
  const [discountValue, setDiscountValue] = useState("")
  const [deliveryValue, setDeliveryValue] = useState("")
  const [loyaltyValue, setLoyaltyValue] = useState("")
  const [selectedQrBank, setSelectedQrBank] = useState<string>(banks[0].code)
  const [selectedProductType, setSelectedProductType] = useState("all")
  const [selectedSaleType, setSelectedSaleType] = useState("all")
  const [isPrinting, setPrinting] = useState(false)
  const receiptRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null)
  const [discountType, setDiscountType] = useState<"amount" | "percentage">("amount")
  const [loyaltyType, setLoyaltyType] = useState<"giftCard" | "loyalty">("loyalty")
  const [giftCardCode, setGiftCardCode] = useState("")
  const [customerSearch, setCustomerSearch] = useState("")
  const [copied, setCopied] = useState(false)
  const [currentView, setCurrentView] = useState<"products" | "cart">("products")
  const [cartSummaryExpanded, setCartSummaryExpanded] = useState(false)

  // Refs and state for scroll functionality
  const cartContainerRef = useRef<HTMLDivElement>(null)
  const cartSummaryRef = useRef<HTMLDivElement>(null)

  const paymentMethods: PaymentMethod[] = [
    {
      id: "qr",
      name: "QR Code",
      icon: <Smartphone className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "card",
      name: "Card Payment",
      icon: <CreditCard className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Building className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "cash",
      name: "Cash",
      icon: <Banknote className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-600",
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate virtual account when bank transfer modal opens
  useEffect(() => {
    if (isBankTransferOpen) {
      setLoadingVirtualAccount(true)
      setVirtualAccount("")
      setSelectedBank(banks[0].code)
      setVerifyingPayment(false)
      setPaymentVerified(false)
      setCopied(false)

      // Simulate loading virtual account
      const timer = setTimeout(() => {
        setVirtualAccount(
          "9" +
            Math.floor(Math.random() * 1000000000)
              .toString()
              .padStart(9, "0"),
        )
        setLoadingVirtualAccount(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isBankTransferOpen])

  // Simulate payment verification
  useEffect(() => {
    if (verifyingPayment) {
      const timer = setTimeout(() => {
        setPaymentVerified(true)
        setVerifyingPayment(false)

        // Show receipt after payment is verified
        const completeTimer = setTimeout(() => {
          handlePaymentComplete()
        }, 1500)

        return () => clearTimeout(completeTimer)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [verifyingPayment])

  if (!mounted) {
    return null
  }

  // Filter products based on category, search query, product type, and sale type
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProductType = selectedProductType === "all" || product.type === selectedProductType
    const matchesSaleType = selectedSaleType === "all" || product.saleType === selectedSaleType
    return matchesCategory && matchesSearch && matchesProductType && matchesSaleType
  })

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vat = subtotal * 0.08 // 8% VAT
  const serviceCharge = 0 // 0% Service Charge
  const total = subtotal + vat + deliveryFee - discount - loyaltyPoints
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Add item to cart
  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.id !== productId)
      }
    })
  }

  // Delete product from cart
  const deleteFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    setDiscount(0)
    setDeliveryFee(0)
    setLoyaltyPoints(0)
  }

  // Hold order
  const holdOrder = () => {
    if (cart.length === 0) return

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      items: [...cart],
      total: cartTotal,
      timestamp: new Date(),
    }

    setHeldOrders((prev) => [...prev, newOrder])
    clearCart()
  }

  // Restore a held order
  const restoreOrder = (order: Order) => {
    setCart(order.items)
    setHeldOrders((prev) => prev.filter((o) => o.id !== order.id))
    setIsHeldOrdersOpen(false)
  }

  const cancelOrder = (orderId: string) => {
    setOrderToCancel(orderId)
    setIsConfirmCancelOpen(true)
  }

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      setHeldOrders((prev) => prev.filter((o) => o.id !== orderToCancel))
      setOrderToCancel(null)
    }
    setIsConfirmCancelOpen(false)
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Handle navigation
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  // Handle payment method selection
  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId)
    setIsPaymentModalOpen(false)

    // Open the appropriate modal directly
    if (methodId === "qr") {
      setIsQrModalOpen(true)
    } else if (methodId === "bank") {
      setIsBankTransferOpen(true)
    } else if (methodId === "cash" || methodId === "card") {
      // For cash and card payment methods, just complete the payment
      handlePaymentComplete()
    }
  }

  // Handle payment completion
  const handlePaymentComplete = () => {
    setIsQrModalOpen(false)
    setIsBankTransferOpen(false)
    setIsReceiptModalOpen(true)
  }

  // Handle receipt close
  const handleReceiptClose = () => {
    setIsReceiptModalOpen(false)
    clearCart()
  }

  // Handle quantity input change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setQuantityValue(value)
    }
  }

  // Handle quantity input blur
  const handleQuantityBlur = (id: number) => {
    if (quantityValue !== "") {
      const newQuantity = Number.parseInt(quantityValue)
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity)
      }
    }
    setEditingQuantity(null)
    setQuantityValue("")
  }

  // Start editing quantity
  const startEditingQuantity = (id: number, currentQty: number) => {
    setEditingQuantity(id)
    setQuantityValue(currentQty.toString())
  }

  // Apply discount
  const applyDiscount = () => {
    if (discountValue) {
      if (discountType === "amount") {
        setDiscount(Number(discountValue))
      } else {
        // Calculate percentage discount
        const percentageDiscount = (Number(discountValue) / 100) * subtotal
        setDiscount(percentageDiscount)
      }
    }
    setIsDiscountDialogOpen(false)
  }

  // Apply delivery fee
  const applyDeliveryFee = () => {
    if (deliveryValue) {
      setDeliveryFee(Number(deliveryValue))
    }
    setIsDeliveryDialogOpen(false)
  }

  // Apply loyalty points
  const applyLoyaltyPoints = () => {
    if (loyaltyValue) {
      setLoyaltyPoints(Number(loyaltyValue))
    }
    setIsLoyaltyDialogOpen(false)
  }

  // Calculate cart total
  const cartTotal = subtotal + vat + deliveryFee - discount - loyaltyPoints

  // Copy account number to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // Handle print receipt
  const handlePrint = () => {
    setPrinting(true)

    // Create a printable version of the receipt
    const receiptContent = receiptRef.current?.innerHTML || ""
    const printWindow = window.open("", "_blank")

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body {
                font-family: 'Courier New', monospace;
                width: 300px;
                margin: 0 auto;
                padding: 10px;
              }
              .receipt-header {
                text-align: center;
                margin-bottom: 10px;
              }
              .receipt-item {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
              }
              .receipt-total {
                font-weight: bold;
                margin-top: 10px;
                border-top: 1px dashed #000;
                padding-top: 10px;
              }
              .receipt-footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
              }
              .dotted-line {
                border-top: 1px dashed #000;
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            ${receiptContent}
          </body>
        </html>
      `)

      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }

    setTimeout(() => {
      setPrinting(false)
    }, 2000)
  }

  // Generate receipt number
  const receiptNumber = `R-${Math.floor(100000 + Math.random() * 900000)}`
  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()

  // Format date for held orders
  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Check if product is in cart
  const isProductInCart = (productId: number) => {
    return cart.some((item) => item.id === productId)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden bg-[#635bff] text-white p-3 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mobileContourPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M0,70 Q25,20 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M0,30 Q25,80 50,30 T100,30" fill="none" stroke="currentColor" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobileContourPattern)" />
          </svg>
        </div>

        <div className="flex justify-between items-center relative z-10 mb-3">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-[#635bff]/80 p-1.5 h-8 w-8"
              onClick={() => setIsMainMenuOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="px-2 py-1 rounded-full bg-[#042f2e] text-[#2bcdb8] text-xs flex items-center min-w-0 max-w-[140px]">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{shopName}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DynamicTimeDisplay className="text-xs" />
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-[#635bff]/80 relative p-1.5 h-8 w-8"
              onClick={() => setIsHeldOrdersOpen(true)}
            >
              <Pause className="h-4 w-4" />
              {heldOrders.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 text-white flex items-center justify-center">
                  {heldOrders.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="relative z-10">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            ref={searchInputRef}
            placeholder="Search products..."
            className="pl-9 pr-9 bg-white border-white text-black placeholder:text-gray-500 text-sm h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={clearSearch}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-[#635bff] text-[#2bcdb8] p-3 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="desktopContourPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M0,70 Q25,20 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M0,30 Q25,80 50,30 T100,30" fill="none" stroke="currentColor" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#desktopContourPattern)" />
          </svg>
        </div>

        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center min-w-0 flex-1">
            <div className="mr-4 px-3 py-1 rounded-full bg-[#042f2e] text-[#2bcdb8] text-sm flex items-center flex-shrink-0">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span className="truncate max-w-[200px]">{shopName}</span>
            </div>
            <div className="relative flex-1 max-w-[600px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                ref={searchInputRef}
                placeholder="Search products..."
                className="pl-10 pr-10 bg-white border-white text-black placeholder:text-gray-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
            <DynamicTimeDisplay className="mr-2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-[#635bff]/80 hover:text-gray-100 min-w-0">
                  <UserCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate max-w-[80px] xl:max-w-[100px] hidden sm:inline">Cashier: John</span>
                  <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center p-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">John Doe</p>
                    <p className="text-xs text-gray-500 truncate">john.doe@oranjpay.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/admin/reports")}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Reports</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              className="bg-white text-black border-white hover:bg-gray-100 relative flex-shrink-0"
              onClick={() => setIsHeldOrdersOpen(true)}
            >
              <Pause className="mr-2 h-4 w-4" />
              <span className="hidden xl:inline">Held Orders</span>
              <span className="xl:hidden">Held</span>
              {heldOrders.length > 0 && (
                <Badge className="ml-2 bg-red-600 text-white text-xs">{heldOrders.length}</Badge>
              )}
            </Button>
            <Button
              variant="outline"
              className="bg-white text-black border-white hover:bg-gray-100 h-10 w-10 p-0 flex-shrink-0"
              onClick={() => setIsMainMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col w-full h-full">
          {/* Mobile Categories */}
          <div className="p-2 border-b flex overflow-x-auto space-x-2 bg-white scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={
                  selectedCategory === category
                    ? "bg-[#635bff] hover:bg-[#635bff]/90 text-white text-xs px-3 h-7 whitespace-nowrap flex-shrink-0"
                    : "text-black border-gray-300 hover:bg-gray-100 hover:text-black text-xs px-3 h-7 whitespace-nowrap flex-shrink-0"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Mobile Filter Bar */}
          <div className="px-2 py-1.5 border-b flex justify-between items-center bg-white">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 text-xs h-7 px-2 bg-transparent"
              onClick={() => setIsFiltersOpen(true)}
            >
              <Filter className="h-3 w-3" />
              <span>Filters</span>
            </Button>
            <div className="flex space-x-1">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-3 w-3" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setViewMode("list")}
              >
                <List className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Mobile Products Grid */}
          <div className="flex-1 overflow-y-auto p-2 pb-20">
            <div className={viewMode === "grid" ? "grid grid-cols-3 gap-2" : "flex flex-col space-y-2"}>
              {filteredProducts.map((product) =>
                viewMode === "grid" ? (
                  <Card
                    key={product.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow overflow-hidden ${
                      isProductInCart(product.id) ? "ring-2 ring-[#635bff] bg-[#635bff]/5" : ""
                    }`}
                    onClick={() => addToCart(product)}
                  >
                    <div className="relative h-24 w-full">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-0.5 left-0.5 bg-white/90 rounded text-xs px-1 py-0.5 text-gray-600">
                        {product.type === "Product" ? "P" : "S"}
                      </div>
                      <div className="absolute bottom-0.5 left-0.5 px-1 py-0.5 rounded bg-green-600 text-white text-xs">
                        {product.stock}
                      </div>
                    </div>
                    <CardContent className="p-2">
                      <h3 className="font-medium text-xs mb-1 leading-tight">{product.name}</h3>
                      <p className="font-bold text-xs text-[#635bff] mb-2">₦{product.price.toLocaleString()}</p>

                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            const existingItem = cart.find((item) => item.id === product.id)
                            if (existingItem && existingItem.quantity > 1) {
                              updateQuantity(product.id, existingItem.quantity - 1)
                            } else if (existingItem) {
                              deleteFromCart(product.id)
                            }
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="text-xs font-medium min-w-[16px] text-center">
                          {cart.find((item) => item.id === product.id)?.quantity || 0}
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addToCart(product)
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div
                    key={product.id}
                    className={`flex items-center bg-white rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow ${
                      isProductInCart(product.id) ? "ring-2 ring-[#635bff] bg-[#635bff]/5" : ""
                    }`}
                    onClick={() => addToCart(product)}
                  >
                    <div className="relative h-12 w-12 mr-3 flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                      <div className="absolute top-0 left-0 bg-white/90 rounded text-xs px-1 py-0.5 text-gray-600">
                        {product.type === "Product" ? "P" : "S"}
                      </div>
                      <div className="absolute bottom-0 right-0 px-1 py-0.5 rounded-tl bg-green-600 text-white text-xs">
                        {product.stock}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-sm flex-1 leading-tight">{product.name}</h3>
                        <p className="font-bold text-sm text-[#635bff] ml-2 flex-shrink-0">
                          ₦{product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500 flex-1">{product.category}</p>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation()
                              const existingItem = cart.find((item) => item.id === product.id)
                              if (existingItem && existingItem.quantity > 1) {
                                updateQuantity(product.id, existingItem.quantity - 1)
                              } else if (existingItem) {
                                deleteFromCart(product.id)
                              }
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="text-xs font-medium min-w-[16px] text-center">
                            {cart.find((item) => item.id === product.id)?.quantity || 0}
                          </span>

                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              addToCart(product)
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-1 overflow-hidden">
          {/* Products Section */}
          <div className="w-3/4 flex flex-col h-full">
            {/* Categories */}
            <div className="p-2 border-b flex overflow-x-auto space-x-2 bg-white scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedCategory === category
                      ? "bg-[#635bff] hover:bg-[#635bff]/90 text-white text-xs px-3 h-8 whitespace-nowrap flex-shrink-0"
                      : "text-black border-gray-300 hover:bg-gray-100 hover:text-black text-xs px-3 h-8 whitespace-nowrap flex-shrink-0"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Filter options */}
            <div className="p-2 border-b flex justify-between items-center bg-white">
              <div className="flex space-x-2">
                <Combobox
                  options={productTypes}
                  value={selectedProductType}
                  onChange={setSelectedProductType}
                  placeholder="Product Type"
                  className="w-32 xl:w-40"
                />
                <Select value={selectedSaleType} onValueChange={setSelectedSaleType}>
                  <SelectTrigger className="w-32 xl:w-40">
                    <SelectValue placeholder="Sale Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {saleTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  className="h-9 w-9 p-0"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  className="h-9 w-9 p-0"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4"
                    : "flex flex-col space-y-3"
                }
              >
                {filteredProducts.map((product) =>
                  viewMode === "grid" ? (
                    <Card
                      key={product.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full max-w-[200px] mx-auto ${
                        isProductInCart(product.id) ? "ring-2 ring-[#635bff] bg-[#635bff]/5" : ""
                      }`}
                      onClick={() => addToCart(product)}
                    >
                      <div className="relative h-40 w-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-white/90 rounded-lg text-gray-600 px-2 py-1 text-xs">
                          {product.type}
                        </div>
                        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-green-600 text-white text-xs">
                          {product.stock}
                        </div>
                      </div>
                      <CardContent className="p-3 flex flex-col justify-between flex-1">
                        <div className="flex flex-col w-full mb-3">
                          <h3 className="font-medium text-sm mb-1 leading-tight">{product.name}</h3>
                          <p className="font-bold text-sm text-[#635bff]">₦{product.price.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation()
                              const existingItem = cart.find((item) => item.id === product.id)
                              if (existingItem && existingItem.quantity > 1) {
                                e.preventDefault()
                                updateQuantity(product.id, existingItem.quantity - 1)
                              } else if (existingItem) {
                                e.preventDefault()
                                deleteFromCart(product.id)
                              }
                            }}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          {editingQuantity === product.id ? (
                            <input
                              type="text"
                              className="w-10 h-8 text-center border rounded text-sm"
                              value={quantityValue}
                              onChange={handleQuantityChange}
                              onBlur={() => handleQuantityBlur(product.id)}
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <input
                              type="text"
                              className="w-10 h-8 text-center border border-gray-200 rounded text-sm cursor-pointer"
                              value={cart.find((item) => item.id === product.id)?.quantity || 0}
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                const qty = cart.find((item) => item.id === product.id)?.quantity || 0
                                startEditingQuantity(product.id, qty)
                              }}
                              readOnly
                            />
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              addToCart(product)
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div
                      key={product.id}
                      className={`flex items-center bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow ${
                        isProductInCart(product.id) ? "ring-2 ring-[#635bff] bg-[#635bff]/5" : ""
                      }`}
                      onClick={() => addToCart(product)}
                    >
                      <div className="relative h-16 w-16 mr-4 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                        <div className="absolute top-1 left-1 bg-white/90 rounded-lg text-gray-600 px-2 py-1 text-xs">
                          {product.type}
                        </div>
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-tl-md bg-green-600 text-white text-xs">
                          {product.stock}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-base">{product.name}</h3>
                          <p className="font-bold text-base text-[#635bff] flex-shrink-0 ml-4">
                            ₦{product.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <div className="flex items-center space-x-3 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 bg-transparent"
                              onClick={(e) => {
                                e.stopPropagation()
                                const existingItem = cart.find((item) => item.id === product.id)
                                if (existingItem && existingItem.quantity > 1) {
                                  e.preventDefault()
                                  updateQuantity(product.id, existingItem.quantity - 1)
                                } else if (existingItem) {
                                  e.preventDefault()
                                  deleteFromCart(product.id)
                                }
                              }}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            {editingQuantity === product.id ? (
                              <input
                                type="text"
                                className="w-10 h-8 text-center border rounded"
                                value={quantityValue}
                                onChange={handleQuantityChange}
                                onBlur={() => handleQuantityBlur(product.id)}
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                            ) : (
                              <input
                                type="text"
                                className="w-10 h-8 text-center border border-gray-200 rounded cursor-pointer"
                                value={cart.find((item) => item.id === product.id)?.quantity || 0}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  e.preventDefault()
                                  const qty = cart.find((item) => item.id === product.id)?.quantity || 0
                                  startEditingQuantity(product.id, qty)
                                }}
                                readOnly
                              />
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 bg-transparent"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                addToCart(product)
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Desktop Cart Section */}
          <div className="w-1/4 border-l flex flex-col h-full bg-gray-50">
            <div className="p-4 border-b bg-white flex justify-between items-center">
              <h2 className="text-lg font-bold">Current Order</h2>
              {cart.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={clearCart}
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col" ref={cartContainerRef}>
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 flex-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="w-12 h-12 relative mr-3 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm truncate">{item.name}</h3>
                            <p className="text-sm text-[#635bff]">
                              ₦{item.price.toLocaleString()} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          {editingQuantity === item.id ? (
                            <input
                              type="text"
                              className="w-10 h-8 text-center border rounded text-sm"
                              value={quantityValue}
                              onChange={handleQuantityChange}
                              onBlur={() => handleQuantityBlur(item.id)}
                              autoFocus
                            />
                          ) : (
                            <input
                              type="text"
                              className="w-10 h-8 text-center border border-gray-200 rounded text-sm cursor-pointer"
                              value={item.quantity}
                              onClick={() => startEditingQuantity(item.id, item.quantity)}
                              readOnly
                            />
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => deleteFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="mt-4 pt-4 border-t" ref={cartSummaryRef}>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>₦{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Discount:</span>
                        <span className="text-red-500">-₦{discount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery Fee:</span>
                        <span>₦{deliveryFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>VAT (8%):</span>
                        <span>₦{vat.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service Charge (0%):</span>
                        <span>₦{serviceCharge.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Loyalty Points:</span>
                        <span className="text-red-500">-₦{loyaltyPoints.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base mt-3 pt-3 border-t">
                        <span>Total:</span>
                        <span>₦{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Cart Footer */}
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs bg-transparent"
                  onClick={() => setIsLoyaltyDialogOpen(true)}
                >
                  <Award className="h-3.5 w-3.5 mr-1" />
                  Loyalty
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs bg-transparent"
                  onClick={() => setIsDiscountDialogOpen(true)}
                >
                  <Tag className="h-3.5 w-3.5 mr-1" />
                  Discount
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs bg-transparent"
                  onClick={() => setIsDeliveryDialogOpen(true)}
                >
                  <Truck className="h-3.5 w-3.5 mr-1" />
                  Delivery
                </Button>
              </div>

              <div className="flex flex-col space-y-2">
                <Button
                  className="w-full bg-[#635bff] text-white hover:bg-[#635bff]/90 text-lg py-6 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                  onClick={() => setIsPaymentModalOpen(true)}
                  disabled={cart.length === 0}
                >
                  Checkout {itemCount} (₦{total.toLocaleString()})
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={holdOrder}>
                  <Pause className="mr-2 h-5 w-5" />
                  Hold Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Summary - Floating */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-white border-t shadow-lg z-30">
        {cart.length > 0 && (
          <div className="p-3">
            {/* Collapsed Summary */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setCartSummaryExpanded(!cartSummaryExpanded)}
            >
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 relative bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMobileCartOpen(true)
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-[#635bff] text-white flex items-center justify-center">
                    {itemCount}
                  </Badge>
                </Button>
                <div>
                  <p className="text-sm font-medium">{itemCount} items</p>
                  <p className="text-xs text-gray-500">Tap to view cart</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="font-bold text-lg">₦{total.toLocaleString()}</p>
                </div>
                <ChevronUp className={`h-4 w-4 transition-transform ${cartSummaryExpanded ? "rotate-180" : ""}`} />
              </div>
            </div>

            {/* Expanded Summary */}
            {cartSummaryExpanded && (
              <div className="mt-3 pt-3 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Discount:</span>
                    <span className="text-red-500">-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee:</span>
                    <span>₦{deliveryFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>VAT (8%):</span>
                  <span>₦{vat.toLocaleString()}</span>
                </div>
                {loyaltyPoints > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Loyalty Points:</span>
                    <span className="text-red-500">-₦{loyaltyPoints.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-8 text-xs bg-transparent"
                    onClick={() => setIsLoyaltyDialogOpen(true)}
                  >
                    <Award className="h-3 w-3 mr-1" />
                    Loyalty
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-8 text-xs bg-transparent"
                    onClick={() => setIsDiscountDialogOpen(true)}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    Discount
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-8 text-xs bg-transparent"
                    onClick={() => setIsDeliveryDialogOpen(true)}
                  >
                    <Truck className="h-3 w-3 mr-1" />
                    Delivery
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="flex items-center justify-between p-3">
          <Button
            variant="outline"
            size="sm"
            onClick={holdOrder}
            disabled={cart.length === 0}
            className="flex items-center space-x-1 bg-transparent"
          >
            <Pause className="h-4 w-4" />
            <span>Hold</span>
          </Button>

          <Button
            className="bg-[#635bff] text-white hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)] flex items-center space-x-2 px-6 py-3"
            onClick={() => setIsPaymentModalOpen(true)}
            disabled={cart.length === 0}
          >
            <span>Checkout</span>
            {cart.length > 0 && <span>₦{total.toLocaleString()}</span>}
          </Button>
        </div>
      </div>

      {/* Mobile Cart Sheet */}
      <Sheet open={isMobileCartOpen} onOpenChange={setIsMobileCartOpen}>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Cart Items ({itemCount})</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
                <ShoppingCart className="h-12 w-12 mb-4" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="w-12 h-12 relative mr-3 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm truncate">{item.name}</h3>
                            <p className="text-sm text-[#635bff]">
                              ₦{item.price.toLocaleString()} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium min-w-[20px] text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => deleteFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-[#635bff] text-white hover:bg-[#635bff]/90"
                    onClick={() => {
                      setIsMobileCartOpen(false)
                      setIsPaymentModalOpen(true)
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Filters Sheet */}
      <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <SheetContent side="bottom" className="h-[60vh]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Product Type</label>
              <Select value={selectedProductType} onValueChange={setSelectedProductType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sale Type</label>
              <Select value={selectedSaleType} onValueChange={setSelectedSaleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sale type" />
                </SelectTrigger>
                <SelectContent>
                  {saleTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedProductType("all")
                  setSelectedSaleType("all")
                }}
              >
                Clear Filters
              </Button>
              <Button className="flex-1 bg-[#635bff] hover:bg-[#635bff]/90" onClick={() => setIsFiltersOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Select Payment Method</h2>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-md transition-shadow ${method.color} cursor-pointer`}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                >
                  {method.icon}
                  <span className="mt-2 text-sm text-center">{method.name}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="ghost" onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent className="sm:max-w-[90vw] max-w-full w-full h-[90vh] sm:h-auto p-0 rounded-lg">
          <div className="flex flex-col sm:flex-row h-full">
            {/* Left side - Bank selection */}
            <div className="w-full sm:w-1/2 p-6 flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-2xl">QR Code Payment</DialogTitle>
                <DialogDescription>Scan this QR code with your banking app to pay</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4 flex-1 overflow-y-auto">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Bank</label>
                  <Select value={selectedQrBank} onValueChange={setSelectedQrBank}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          <div className="flex items-center">
                            <div className="w-6 h-6 relative mr-2 flex-shrink-0">
                              <Image
                                src={bank.logo || "/placeholder.svg"}
                                alt={bank.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>{bank.name}</span>
                            {bank.ussd && <span className="ml-2 text-xs text-gray-500">{bank.ussd}</span>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">
                    Open your banking app, scan the QR code, and confirm the payment. The payment will be automatically
                    verified once received.
                  </p>
                </div>

                <Button
                  className="w-full bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                  onClick={handlePaymentComplete}
                >
                  Complete Payment
                </Button>
              </div>
            </div>

            {/* Right side - QR Code */}
            <div className="w-full sm:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-6">
              <QRCodeDisplay
                value={`oranjpay:payment:${total}:${Date.now()}`}
                size={250}
                amount={total}
                bankName={banks.find((b) => b.code === selectedQrBank)?.name || "OranjPay Bank"}
                accountName="OranjPay Merchant"
                accountNumber="0123456789"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bank Transfer Modal */}
      <Dialog open={isBankTransferOpen} onOpenChange={setIsBankTransferOpen}>
        <DialogContent className="sm:max-w-[90vw] max-w-full w-full h-[90vh] sm:h-auto p-0 rounded-lg">
          <div className="flex flex-col sm:flex-row h-full">
            {/* Left side - Bank selection */}
            <div className="w-full sm:w-1/2 p-6 flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-2xl">Bank Transfer Payment</DialogTitle>
                <DialogDescription>Transfer to this account to complete your payment</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4 flex-1 overflow-y-auto">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Bank</label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          <div className="flex items-center">
                            <div className="w-6 h-6 relative mr-2 flex-shrink-0">
                              <Image
                                src={bank.logo || "/placeholder.svg"}
                                alt={bank.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>{bank.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Virtual Account Number</label>
                  <div className="flex items-center justify-between border rounded-md p-5 bg-gray-50">
                    {loadingVirtualAccount ? (
                      <div className="w-full flex justify-center">
                        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    ) : (
                      <>
                        <span className="text-3xl font-mono font-bold">{virtualAccount}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(virtualAccount)}
                          className="h-10 w-10 p-0 ml-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </Button>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {loadingVirtualAccount
                      ? "Loading account details..."
                      : `Account Name: OranjPay Demo Store - ${banks.find((b) => b.code === selectedBank)?.name}`}
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">
                    Please make a transfer of ₦{total.toLocaleString()} to the account number above. The payment will be
                    automatically verified once received.
                  </p>
                </div>

                <Button
                  className="w-full bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                  onClick={handlePaymentComplete}
                >
                  Complete Payment
                </Button>
              </div>
            </div>

            {/* Right side - Instructions */}
            <div className="w-full sm:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-6 overflow-y-auto">
              <div className="max-w-md text-center">
                <h3 className="text-2xl font-bold mb-6">How to Pay</h3>

                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-[#635bff]/20 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-lg">1</span>
                    </div>
                    <h4 className="font-medium mb-2">Select Your Bank</h4>
                    <p className="text-gray-600 text-sm">Choose your bank from the dropdown menu on the left</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-[#635bff]/20 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-lg">2</span>
                    </div>
                    <h4 className="font-medium mb-2">Copy Account Number</h4>
                    <p className="text-gray-600 text-sm">Copy the generated virtual account number</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-[#635bff]/20 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-lg">3</span>
                    </div>
                    <h4 className="font-medium mb-2">Make Transfer</h4>
                    <p className="text-gray-600 text-sm">Transfer ₦{total.toLocaleString()} to the account number</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-[#635bff]/20 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-lg">4</span>
                    </div>
                    <h4 className="font-medium mb-2">Verify Payment</h4>
                    <p className="text-gray-600 text-sm">Click "Complete Payment" once you've made the transfer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Held Orders Sheet */}
      <Sheet open={isHeldOrdersOpen} onOpenChange={setIsHeldOrdersOpen}>
        <SheetContent className="sm:max-w-[500px] w-full">
          <SheetHeader>
            <SheetTitle>Held Orders</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col">
            {heldOrders.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
                <Pause className="h-10 w-10 mb-4" />
                <p>No held orders</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {heldOrders.map((order) => (
                  <div key={order.id} className="p-4 border-b bg-white rounded-lg shadow-sm mb-3">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-lg">{order.id}</h3>
                        <p className="text-gray-500 text-xs">
                          {order.timestamp.toLocaleDateString()} {order.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-bold text-[#635bff]">₦{order.total.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-2 group relative">
                          {order.items.slice(0, 4).map((item, index) => (
                            <Avatar key={`${item.id}-${index}`} className="border-2 border-white w-8 h-8">
                              <AvatarImage src={item.image || "/placeholder.svg"} alt={item.name} />
                              <AvatarFallback className="text-xs">{item.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                          {order.items.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white relative">
                              <span className="text-xs font-medium">+{order.items.length - 4}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {order.items.map((item) => item.name).join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-3">
                      <Button className="flex-1" onClick={() => restoreOrder(order)}>
                        Restore Order
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 bg-transparent"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel Order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Menu Sheet */}
      <Sheet open={isMainMenuOpen} onOpenChange={setIsMainMenuOpen}>
        <SheetContent className="sm:max-w-[500px] w-full">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col">
            <div className="flex items-center mb-4">
              <Signal className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-green-500">System Online</span>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                variant="outline"
                className="flex items-center justify-start h-16 text-base px-4 bg-transparent"
                onClick={() => {
                  setIsMainMenuOpen(false)
                  setIsHeldOrdersOpen(true)
                }}
              >
                <Pause className="h-10 w-10 mr-4 text-purple-600 flex-shrink-0" />
                <span>Held Orders</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4 bg-transparent">
                <ListOrdered className="h-10 w-10 mr-4 text-blue-600 flex-shrink-0" />
                <span>Section Order</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4 bg-transparent">
                <BarChart4 className="h-10 w-10 mr-4 text-green-600 flex-shrink-0" />
                <span>Sales</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4 bg-transparent">
                <Calendar className="h-10 w-10 mr-4 text-amber-600 flex-shrink-0" />
                <span>End of Day</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4 bg-transparent">
                <CreditCard className="h-10 w-10 mr-4 text-indigo-600 flex-shrink-0" />
                <span>Payments</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4 bg-transparent">
                <RotateCcw className="h-10 w-10 mr-4 text-rose-600 flex-shrink-0" />
                <span>Returns</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4 bg-transparent">
                <Settings className="h-10 w-10 mr-4 text-teal-600 flex-shrink-0" />
                <span>Settings</span>
              </Button>

              <Button
                variant="ghost"
                className="flex items-center justify-start h-16 text-base px-4 mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-10 w-10 mr-4 flex-shrink-0" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Receipt Modal */}
      <ReceiptModal isOpen={isReceiptModalOpen} onClose={handleReceiptClose} cartItems={cart} total={total} />

      {/* Confirm Cancel Order Modal */}
      <Dialog open={isConfirmCancelOpen} onOpenChange={setIsConfirmCancelOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription>Are you sure you want to cancel this order?</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>This action cannot be undone.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="ghost" onClick={() => setIsConfirmCancelOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmCancelOrder} className="w-full sm:w-auto">
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discount Dialog */}
      <Dialog open={isDiscountDialogOpen} onOpenChange={setIsDiscountDialogOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle>Apply Discount</DialogTitle>
            <DialogDescription>Enter the discount amount or percentage.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="discountType" className="text-right">
                Type
              </label>
              <Select value={discountType} onValueChange={setDiscountType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="discount" className="text-right">
                Discount
              </label>
              <Input
                id="discount"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="ghost" onClick={() => setIsDiscountDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={applyDiscount} className="w-full sm:w-auto">
              Apply Discount
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delivery Fee Dialog */}
      <Dialog open={isDeliveryDialogOpen} onOpenChange={setIsDeliveryDialogOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle>Apply Delivery Fee</DialogTitle>
            <DialogDescription>Enter the delivery fee amount.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="deliveryFee" className="text-right">
                Delivery Fee
              </label>
              <Input
                id="deliveryFee"
                value={deliveryValue}
                onChange={(e) => setDeliveryValue(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="ghost" onClick={() => setIsDeliveryDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={applyDeliveryFee} className="w-full sm:w-auto">
              Apply Delivery Fee
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Loyalty Points Dialog */}
      <Dialog open={isLoyaltyDialogOpen} onOpenChange={setIsLoyaltyDialogOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle>Apply Loyalty Points</DialogTitle>
            <DialogDescription>Enter the loyalty points amount.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="loyaltyType" className="text-right">
                Type
              </label>
              <Select value={loyaltyType} onValueChange={setLoyaltyType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loyalty">Loyalty Points</SelectItem>
                  <SelectItem value="giftCard">Gift Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {loyaltyType === "giftCard" ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="giftCardCode" className="text-right">
                  Gift Card Code
                </label>
                <Input
                  id="giftCardCode"
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value)}
                  className="col-span-3"
                />
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="loyaltyPoints" className="text-right">
                  Loyalty Points
                </label>
                <Input
                  id="loyaltyPoints"
                  value={loyaltyValue}
                  onChange={(e) => setLoyaltyValue(e.target.value)}
                  className="col-span-3"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="ghost" onClick={() => setIsLoyaltyDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={applyLoyaltyPoints} className="w-full sm:w-auto">
              Apply Loyalty Points
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
