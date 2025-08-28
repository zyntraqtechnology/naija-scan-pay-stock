"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const stripeButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
        selected: "bg-[#635bff] text-white hover:bg-[#635bff]/90",
      },
      size: {
        default: "h-9 px-3 py-2",
        sm: "h-8 px-2 py-1.5",
        lg: "h-10 px-4 py-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface StripeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof stripeButtonVariants> {
  hasDropdown?: boolean
}

const StripeButton = React.forwardRef<HTMLButtonElement, StripeButtonProps>(
  ({ className, variant, size, hasDropdown, children, ...props }, ref) => {
    return (
      <button
        className={cn(stripeButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {hasDropdown && <ChevronDown className="ml-2 h-4 w-4" />}
      </button>
    )
  }
)
StripeButton.displayName = "StripeButton"

export { StripeButton, stripeButtonVariants }