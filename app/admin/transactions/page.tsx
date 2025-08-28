"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TransactionDetailsSheet } from "@/components/admin/transaction-details-sheet"
import { ArrowLeft, Download, Search } from "lucide-react"

// Mock transaction data
const transactions = [
  {
    id: "262596121281",
    date: "4/29/2025, 4:21:03 PM",
    paymentType: "N/A",
    amount: 24686.0,
    customer: "N/A",
    cashier: "Walter",
    store: "Jazz Shop",
    status: "CANCELED" as const,
    entryDate: "4/29/2025, 4:21:03 PM",
    items: [{ name: "Chivita", quantity: 2, unit: "bunch(es)", unitPrice: 12343, totalPrice: 24686 }],
  },
  {
    id: "739544676216",
    date: "4/29/2025, 1:30:53 PM",
    paymentType: "N/A",
    amount: 12343.0,
    customer: "N/A",
    cashier: "Walter",
    store: "Jazz Shop",
    status: "CANCELED" as const,
    entryDate: "4/29/2025, 1:30:53 PM",
  },
  {
    id: "473543756141",
    date: "4/21/2025, 11:59:49 AM",
    paymentType: "cash",
    amount: 12343.0,
    customer: "N/A",
    cashier: "Walter",
    store: "Jazz Shop",
    status: "COMPLETED" as const,
    entryDate: "4/21/2025, 11:59:49 AM",
  },
  {
    id: "365857952642",
    date: "4/11/2025, 3:07:40 PM",
    paymentType: "N/A",
    amount: 12343.0,
    customer: "N/A",
    cashier: "Walter",
    store: "Jazz Shop",
    status: "CANCELED" as const,
    entryDate: "4/11/2025, 3:07:40 PM",
  },
  {
    id: "647132371978",
    date: "4/11/2025, 2:59:34 PM",
    paymentType: "transfer",
    amount: 123430.0,
    customer: "N/A",
    cashier: "Walter",
    store: "Jazz Shop",
    status: "COMPLETED" as const,
    entryDate: "4/11/2025, 2:59:34 PM",
  },
]

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<"instore" | "online">("instore")
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof transactions)[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [startDate, setStartDate] = useState("2nd May, 2025")
  const [endDate, setEndDate] = useState("8th May, 2025")

  // Format currency
  const formatCurrency = (amount: number) => {
    return `NGN ${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">COMPLETED</span>
      case "CANCELED":
        return <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">CANCELED</span>
      case "PENDING":
        return <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-600">PENDING</span>
      default:
        return <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">{status}</span>
    }
  }

  const handleTransactionClick = (transaction: (typeof transactions)[0]) => {
    setSelectedTransaction(transaction)
    setIsDetailsOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Sales Transaction</h1>
        <p className="text-gray-500">View, filter, and generate reports and invoices for your sales transactions.</p>
      </div>

      <div className="mb-6 border-b">
        <div className="flex">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "instore" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("instore")}
          >
            Instore Sales
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "online" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("online")}
          >
            Online Orders
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-lg border p-2">
          <Input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border-0 text-sm"
          />
          <span className="text-sm text-gray-500">to</span>
          <Input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border-0 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 text-purple-600">
            <Download className="h-4 w-4" />
            Export End Of Day
          </Button>
          <Button variant="default" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600">
            <ArrowLeft className="h-4 w-4" />
            Returns
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <div className="flex rounded-lg border">
            <Input
              type="text"
              placeholder="Search for a transaction by (Order Number, Transaction Ref)"
              className="rounded-l-lg border-0 text-sm"
            />
            <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <select className="rounded-lg border px-4 py-2 text-sm">
            <option>All stores</option>
            <option>Jazz Shop</option>
            <option>Downtown Store</option>
          </select>
          <select className="rounded-lg border px-4 py-2 text-sm">
            <option>Select Initiator</option>
            <option>Walter</option>
            <option>John</option>
          </select>
          <select className="rounded-lg border px-4 py-2 text-sm">
            <option>Status</option>
            <option>COMPLETED</option>
            <option>CANCELED</option>
            <option>PENDING</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-500">
              <th className="px-4 py-3">Order No & Date</th>
              <th className="px-4 py-3">Payment Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Cashier</th>
              <th className="px-4 py-3">Store</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Order Entry Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="px-4 py-3">
                  <button
                    className="text-left text-sm font-medium text-purple-600 hover:underline"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    {transaction.id}
                  </button>
                  <div className="text-xs text-gray-500">{transaction.date}</div>
                </td>
                <td className="px-4 py-3 text-sm">{transaction.paymentType}</td>
                <td className="px-4 py-3 text-sm">{formatCurrency(transaction.amount)}</td>
                <td className="px-4 py-3 text-sm">{transaction.customer}</td>
                <td className="px-4 py-3 text-sm">{transaction.cashier}</td>
                <td className="px-4 py-3 text-sm">{transaction.store}</td>
                <td className="px-4 py-3">{getStatusBadge(transaction.status)}</td>
                <td className="px-4 py-3">
                  <div className="text-sm">{transaction.entryDate}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTransaction && (
        <TransactionDetailsSheet
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  )
}
