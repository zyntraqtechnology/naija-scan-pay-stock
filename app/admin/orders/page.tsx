"use client"

import { useState, useEffect } from "react"
import { Search, ArrowLeftRight, Printer, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { transactions } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TransactionDetailsSheet } from "@/components/admin/transaction-details-sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { addDays, format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("instore")
  const [selectedStore, setSelectedStore] = useState("All stores")
  const [selectedInitiator, setSelectedInitiator] = useState("Select Initiator")
  const [selectedStatus, setSelectedStatus] = useState("Status")
  const [openTransactionId, setOpenTransactionId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  })

  // Generate orders once instead of on every render
  const allOrders = useState(() => {
    // Convert transactions to orders format with NGN currency
    const baseOrders = transactions.map((transaction, index) => ({
      id: `${Math.floor(Math.random() * 10000000000000)}`,
      total: transaction.amount,
      status:
        transaction.status === "Completed" ? "COMPLETED" : transaction.status === "Failed" ? "CANCELED" : "NOT PAID",
      customer: "N/A",
      cashier: "Walter",
      store: "Jazz Shop",
      paymentType: Math.random() > 0.7 ? "cash" : Math.random() > 0.5 ? "transfer" : "N/A",
      date: transaction.date,
      orderEntryDate: transaction.date,
      items: [
        {
          name: "Chivita",
          quantity: 2,
          unit: "bunch(es)",
          unitAmount: transaction.amount / 2,
          totalAmount: transaction.amount,
        },
      ],
    }))

    // Generate more orders for pagination demo
    return [...Array(5)].flatMap(() => baseOrders)
  })[0]

  // Memoize filtered orders to prevent recalculation on every render
  const filteredOrders = useState(() => {
    return allOrders
      .filter((order) => {
        if (activeTab === "instore") return true
        return order.id.length % 2 === 0 // Just a simple filter for demo
      })
      .filter((order) => {
        if (!searchQuery) return true
        return order.id.toLowerCase().includes(searchQuery.toLowerCase())
      })
      .filter((order) => {
        if (selectedStore === "All stores") return true
        return order.store === selectedStore
      })
      .filter((order) => {
        if (selectedInitiator === "Select Initiator") return true
        return order.cashier === selectedInitiator
      })
      .filter((order) => {
        if (selectedStatus === "Status") return true
        return order.status === selectedStatus
      })
  })[0]

  // Update filtered orders when filters change
  useEffect(() => {
    const filtered = allOrders
      .filter((order) => {
        if (activeTab === "instore") return true
        return order.id.length % 2 === 0
      })
      .filter((order) => {
        if (!searchQuery) return true
        return order.id.toLowerCase().includes(searchQuery.toLowerCase())
      })
      .filter((order) => {
        if (selectedStore === "All stores") return true
        return order.store === selectedStore
      })
      .filter((order) => {
        if (selectedInitiator === "Select Initiator") return true
        return order.cashier === selectedInitiator
      })
      .filter((order) => {
        if (selectedStatus === "Status") return true
        return order.status === selectedStatus
      })

    // This is a workaround to avoid the useState setter in the effect
    // We're just updating the reference to filteredOrders
    Object.assign(filteredOrders, filtered)

    // Reset to first page when filters change
    setCurrentPage(0)

    // Clear selection when filters change
    setSelectedRows([])
    setSelectAll(false)
  }, [activeTab, searchQuery, selectedStore, selectedInitiator, selectedStatus, allOrders])

  // Pagination
  const paginatedOrders = filteredOrders.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
  const pageCount = Math.ceil(filteredOrders.length / rowsPerPage)

  // Handle select all checkbox - fixed to avoid infinite loop
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedRows(paginatedOrders.map((order) => order.id))
    } else {
      setSelectedRows([])
    }
  }

  const toggleRowSelection = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
      // If we're deselecting a row, make sure selectAll is false
      if (selectAll) setSelectAll(false)
    } else {
      setSelectedRows([...selectedRows, id])
      // Check if all rows are now selected
      if (selectedRows.length + 1 === paginatedOrders.length) {
        setSelectAll(true)
      }
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-600"
      case "CANCELED":
        return "bg-red-100 text-red-600"
      default:
        return "bg-yellow-100 text-yellow-600"
    }
  }

  const selectedTransaction = openTransactionId ? allOrders.find((order) => order.id === openTransactionId) : null

  const formatDateRange = () => {
    if (!date?.from) return "Select date range"
    if (!date.to) return format(date.from, "MMM d, yyyy")
    return `${format(date.from, "MMM d")} - ${format(date.to, "MMM d, yyyy")}`
  }

  return (
    <div className="flex flex-col w-full bg-[#f1f1f1]">
      <AdminHeader
        title="Sales Transaction"
        description="View, filter, and generate reports and invoices for your sales transactions."
      />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <Tabs defaultValue="instore" className="w-full" onValueChange={setActiveTab}>
            <div className="border-b mb-6">
              <TabsList className="bg-transparent border-b-0">
                <TabsTrigger
                  value="instore"
                  className={`pb-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#635BFF] data-[state=active]:text-[#635BFF] data-[state=active]:shadow-none`}
                >
                  Instore Sales
                </TabsTrigger>
                <TabsTrigger
                  value="online"
                  className={`pb-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#635BFF] data-[state=active]:text-[#635BFF] data-[state=active]:shadow-none`}
                >
                  Online Orders
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap justify-between gap-2 mb-4">
                <div className="flex-1"></div>
                <div className="flex flex-wrap gap-2 items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="bg-white flex gap-2 h-9 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{formatDateRange()}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarComponent
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" className="bg-white flex gap-2 h-9 text-sm">
                    <Printer className="h-4 w-4" />
                    Export End Of Day
                  </Button>
                  <Button className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white flex gap-2 h-9 text-sm">
                    <ArrowLeftRight className="h-4 w-4" />
                    Returns
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Order Number or Ref"
                    className="pl-9 pr-16 py-2 h-9 border-[#635BFF]/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#635BFF] hover:bg-[#635BFF]/90 text-white h-7"
                    onClick={() => setCurrentPage(0)}
                  >
                    Search
                  </Button>
                </div>
                <Select value={selectedStore} onValueChange={setSelectedStore}>
                  <SelectTrigger className="w-[150px] bg-white h-9">
                    <SelectValue placeholder="All stores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All stores">All stores</SelectItem>
                    <SelectItem value="Jazz Shop">Jazz Shop</SelectItem>
                    <SelectItem value="Main Store">Main Store</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedInitiator} onValueChange={setSelectedInitiator}>
                  <SelectTrigger className="w-[150px] bg-white h-9">
                    <SelectValue placeholder="Select Initiator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Select Initiator">Select Initiator</SelectItem>
                    <SelectItem value="Walter">Walter</SelectItem>
                    <SelectItem value="John">John</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px] bg-white h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Status">Status</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELED">Canceled</SelectItem>
                    <SelectItem value="NOT PAID">Not Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto mt-4 border rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b bg-gray-50">
                      <th className="py-2 px-4 font-medium">
                        <Checkbox
                          checked={selectAll}
                          onCheckedChange={(checked) => handleSelectAll(!!checked)}
                          className="mr-2"
                        />
                      </th>
                      <th className="py-2 px-4 font-medium">Order No & Date</th>
                      <th className="py-2 px-4 font-medium">Payment Type</th>
                      <th className="py-2 px-4 font-medium">Amount</th>
                      <th className="py-2 px-4 font-medium">Customer</th>
                      <th className="py-2 px-4 font-medium">Cashier</th>
                      <th className="py-2 px-4 font-medium">Store</th>
                      <th className="py-2 px-4 font-medium">Status</th>
                      <th className="py-2 px-4 font-medium">Order Entry Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">
                          <Checkbox
                            checked={selectedRows.includes(order.id)}
                            onCheckedChange={() => toggleRowSelection(order.id)}
                          />
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => setOpenTransactionId(order.id)}
                            className="text-[#635BFF] hover:underline font-medium"
                          >
                            {order.id}
                          </button>
                          <div className="text-xs text-gray-500">{order.date}</div>
                        </td>
                        <td className="py-2 px-4">{order.paymentType}</td>
                        <td className="py-2 px-4">
                          NGN{" "}
                          {order.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-2 px-4">{order.customer}</td>
                        <td className="py-2 px-4">{order.cashier}</td>
                        <td className="py-2 px-4">{order.store}</td>
                        <td className="py-2 px-4">
                          <Badge className={`font-normal ${getStatusBadgeClass(order.status)}`}>{order.status}</Badge>
                        </td>
                        <td className="py-2 px-4">{order.orderEntryDate}</td>
                      </tr>
                    ))}
                    {paginatedOrders.length === 0 && (
                      <tr>
                        <td colSpan={9} className="py-4 text-center text-gray-500">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing {Math.min(filteredOrders.length, 1 + currentPage * rowsPerPage)} to{" "}
                  {Math.min((currentPage + 1) * rowsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={rowsPerPage.toString()}
                    onValueChange={(value) => {
                      const newRowsPerPage = Number.parseInt(value)
                      setRowsPerPage(newRowsPerPage)
                      setCurrentPage(0)
                    }}
                  >
                    <SelectTrigger className="w-[80px] h-8">
                      <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="500">500</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm mx-2">
                      Page {currentPage + 1} of {Math.max(1, pageCount)}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
                      disabled={currentPage >= pageCount - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Transaction Details Sheet */}
      <TransactionDetailsSheet
        isOpen={!!openTransactionId}
        onClose={() => setOpenTransactionId(null)}
        transaction={selectedTransaction}
      />
    </div>
  )
}
