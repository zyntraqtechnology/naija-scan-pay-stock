"use client"

import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { motion } from "framer-motion"
import { Smartphone } from "lucide-react" // for phone icon

interface QRCodeDisplayProps {
  value: string
  size?: number
  amount?: number
  bankName?: string
  accountName?: string
  accountNumber?: string
}

export function QRCodeDisplay({
  value,
  size = 300,
  amount = 0,
  bankName = "",
  accountName = "OranjPay Merchant",
  accountNumber = "",
}: QRCodeDisplayProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Scan with phone text */}
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <Smartphone className="h-4 w-4 mr-2 text-gray-500" />
        <span>Scan this QR code with your banking app to pay</span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          {/* Scanner animation */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-70 z-10"
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          {/* QR Code */}
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <QRCodeSVG value={value} size={size} />
          </div>
        </div>

        {/* Amount and Bank Details */}
        <div className="mt-4 md:mt-0 text-center md:text-left">
          <p className="text-gray-500 text-lg mb-2">Amount</p>
          <p className="text-4xl font-bold mb-4">₦{amount.toLocaleString()}</p>

          {/* Bank details */}
          {(bankName || accountNumber) && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full max-w-xs">
              <h3 className="text-lg font-medium mb-2">Bank Details</h3>
              <div className="space-y-2">
                {bankName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">{bankName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="font-medium">{accountName}</span>
                </div>
                {accountNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-mono font-medium">{accountNumber}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
