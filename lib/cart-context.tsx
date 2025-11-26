"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/types"

export type CartItem = {
  product: Product
  quantity: number
  variation: string
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product, quantity: number, variation: string) => void
  removeFromCart: (index: number) => void
  updateQuantity: (index: number, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string, variation: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, quantity: number, variation: string) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.variation === variation,
      )

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      } else {
        // Add new item if it doesn't exist
        return [...prevCart, { product, quantity, variation }]
      }
    })
  }

  const removeFromCart = (index: number) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart]
      updatedCart.splice(index, 1)
      return updatedCart
    })
  }

  const updateQuantity = (index: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart]
      updatedCart[index].quantity = quantity
      return updatedCart
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (productId: string, variation: string) => {
    return cart.some((item) => item.product.id === productId && item.variation === variation)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
