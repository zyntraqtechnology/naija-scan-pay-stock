"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { FileText, Printer, Smartphone, X, Mail, Share2, Download, MessageCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TransactionItem {
  name: string
  quantity: number
  unit: string
  unitAmount: number
  totalAmount: number
}

interface TransactionDetailsProps {
  isOpen: boolean
  onClose: () => void
  transaction: {
    id: string
    date: string
    status: string
    customer: string
    cashier: string
    store: string
    paymentType: string
    total: number
    items?: TransactionItem[]
  } | null
}

export function TransactionDetailsSheet({ isOpen, onClose, transaction }: TransactionDetailsProps) {
  const [activeTab, setActiveTab] = useState("instore")

  if (!transaction) return null

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-600"
      case "CANCELED":
        return "bg-red-100 text-red-600"
      default:
        return "bg-red-100 text-red-600"
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-[60%] max-w-[800px] sm:max-w-none p-0">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h2 className="text-xl font-bold">Sales Transaction</h2>
              <p className="text-sm text-gray-500">
                View, filter, and generate reports and invoices for your sales transactions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90 text-white">
                <FileText className="h-4 w-4 mr-2" />
                Generate Invoice
              </Button>
              <SheetClose className="rounded-full p-2 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </SheetClose>
            </div>
          </div>

          <div className="border-b">
            <Tabs defaultValue="instore" onValueChange={setActiveTab}>
              <TabsList className="bg-transparent h-auto p-0">
                <TabsTrigger
                  value="instore"
                  className={`px-6 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none ${
                    activeTab === "instore" ? "border-b-2 border-[#635BFF] text-[#635BFF]" : ""
                  }`}
                >
                  Instore Sales
                </TabsTrigger>
                <TabsTrigger
                  value="online"
                  className={`px-6 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none ${
                    activeTab === "online" ? "border-b-2 border-[#635BFF] text-[#635BFF]" : ""
                  }`}
                >
                  Online Orders
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>

            <div className="border rounded-lg overflow-hidden mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-4 border-b md:border-b-0 md:border-r">
                  <div className="text-sm text-gray-500">Cashier Checkout:</div>
                  <div className="font-medium">N/A</div>
                </div>
                <div className="p-4 border-b md:border-b-0 md:border-r">
                  <div className="text-sm text-gray-500">Payment Status:</div>
                  <div className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600">NOT PAID</div>
                </div>
                <div className="p-4">{/* Empty cell for grid alignment */}</div>
              </div>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="p-4 border-b md:border-b-0 md:border-r">
                  <div className="text-sm text-gray-500">Order ID:</div>
                  <div className="font-medium">{transaction.id}</div>
                </div>
                <div className="p-4 border-b md:border-b-0 md:border-r">
                  <div className="text-sm text-gray-500">Order Date:</div>
                  <div className="font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {transaction.date}
                  </div>
                </div>
                <div className="p-4 border-b md:border-b-0 md:border-r">
                  <div className="text-sm text-gray-500">Transaction Ref:</div>
                  <div className="font-medium">N/A</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500">Order Status:</div>
                  <div className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600">CANCELED</div>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-4 border-b md:border-b-0 md:border-r">
                  <div className="text-sm text-gray-500">Delivery Type:</div>
                  <div className="font-medium">PICK UP</div>
                </div>
                <div className="p-4 border-b md:border-b-0 md:border-r">
                  <div className="text-sm text-gray-500">Cashier:</div>
                  <div className="font-medium">{transaction.cashier}</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500">Customer:</div>
                  <div className="font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    N/A
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 border-b md:border-b-0 md:border-r">
                  <div className="text-sm text-gray-500">Store Name:</div>
                  <div className="font-medium">{transaction.store}</div>
                </div>
                <div className="p-4">{/* Empty cell for grid alignment */}</div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-3 px-4 font-medium">ITEM</th>
                    <th className="py-3 px-4 font-medium">QUANTITY</th>
                    <th className="py-3 px-4 font-medium">UNIT(S)</th>
                    <th className="py-3 px-4 font-medium">UNIT AMOUNT</th>
                    <th className="py-3 px-4 font-medium">TOTAL AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        Chivita
                        <svg className="ml-2 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </td>
                    <td className="py-3 px-4">2</td>
                    <td className="py-3 px-4">bunch(es)</td>
                    <td className="py-3 px-4">
                      NGN{" "}
                      {(transaction.total / 2).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-4">
                      NGN{" "}
                      {transaction.total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="py-3 px-4 text-right font-medium">
                      Subtotal:
                    </td>
                    <td className="py-3 px-4">
                      NGN{" "}
                      {transaction.total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  NGN{" "}
                  {transaction.total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Gift Card:</span>
                <span>NGN 0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Loyalty Point:</span>
                <span>NGN 0.00</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-4 border-t">
            <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
              <Printer className="h-4 w-4 mr-2" />
              Print Sales Receipt
            </Button>
            <Button variant="outline" className="flex-1">
              <Smartphone className="h-4 w-4 mr-2" />
              Print on POS
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-10 p-0">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
