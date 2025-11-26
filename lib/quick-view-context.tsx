"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { Product } from "@/lib/types"

type QuickViewContextType = {
  quickViewProduct: Product | null
  setQuickViewProduct: (product: Product | null) => void
}

const QuickViewContext = createContext<QuickViewContextType>({
  quickViewProduct: null,
  setQuickViewProduct: () => {},
})

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <QuickViewContext.Provider value={{ quickViewProduct, setQuickViewProduct }}>{children}</QuickViewContext.Provider>
  )
}

export function useQuickView() {
  const context = useContext(QuickViewContext)
  if (!context) {
    throw new Error("useQuickView must be used within a QuickViewProvider")
  }
  return context
}

// For components that don't have access to the context
export const setQuickViewProduct = (product: Product | null) => {
  console.log("This function should not be called directly. Use the context instead.")
}
