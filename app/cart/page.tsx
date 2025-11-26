"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useQuickView } from "@/lib/quick-view-context"

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const { setQuickViewProduct } = useQuickView()
  const [promoCode, setPromoCode] = useState("")

  // Custom pricing logic for pills
  function getPillPrice(qty: number) {
    if (qty === 100) return 100
    if (qty === 200) return 180
    if (qty === 300) return 240
    if (qty === 500) return 480
    return qty * 1 // fallback: $1 per pill
  }

  // Calculate totals
  const subtotal = cart.reduce((total, item) => {
    if (item.product.variations && item.product.variations.some(v => v.includes('pills')) && item.variation.includes('pills')) {
      const qty = parseInt(item.variation);
      if (qty === 100) return total + 100 * item.quantity;
      if (qty === 200) return total + 180 * item.quantity;
      if (qty === 300) return total + 240 * item.quantity;
      if (qty === 500) return total + 480 * item.quantity;
      return total + qty * item.quantity;
    }
    return total + item.product.price * item.quantity;
  }, 0);

  const grandTotal = subtotal

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(index, newQuantity)
  }

  const handleRemoveItem = (index: number) => {
    removeFromCart(index)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Promo code applied",
      description: `Promo code "${promoCode}" has been applied to your order`,
    })
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive",
      })
      return
    }

    router.push("/checkout")
  }

  return (
    <div className="bg-gray-50 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2 p-0 md:p-2">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Continue Shopping</span>
              <span className="md:hidden">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl md:text-3xl font-bold">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-10 md:py-16 bg-white rounded-xl shadow-sm">
            <ShoppingBag className="h-16 w-16 md:h-20 md:w-20 mx-auto text-gray-300 mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
              Looks like you haven't added anything to your cart yet. Browse our products and find something you'll
              love!
            </p>
            <Button asChild size="lg">
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 md:p-6 border-b">
                  <div className="grid grid-cols-12 gap-2 md:gap-4">
                    <div className="col-span-6">
                      <h3 className="font-semibold text-gray-700 text-sm md:text-base">Product</h3>
                    </div>
                    <div className="col-span-2 text-center">
                      <h3 className="font-semibold text-gray-700 text-sm md:text-base">Price</h3>
                    </div>
                    <div className="col-span-2 text-center">
                      <h3 className="font-semibold text-gray-700 text-sm md:text-base">Qty</h3>
                    </div>
                    <div className="col-span-2 text-right">
                      <h3 className="font-semibold text-gray-700 text-sm md:text-base">Total</h3>
                    </div>
                  </div>
                </div>

                <div className="divide-y">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.variation}`}
                      className="p-4 md:p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-2 md:gap-4 items-center">
                        <div className="col-span-6">
                          <div className="flex items-center gap-2 md:gap-4">
                            <div className="relative h-14 w-14 md:h-20 md:w-20 flex-shrink-0 rounded-md overflow-hidden border">
                              <Image
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div onClick={() => setQuickViewProduct(item.product)} className="cursor-pointer">
                                <h4 className="font-medium hover:text-primary transition-colors text-xs md:text-base line-clamp-1">
                                  {item.product.name}
                                </h4>
                              </div>
                              <p className="text-xs text-gray-500 mb-1">Variation: {item.variation}</p>
                              <button
                                onClick={() => handleRemoveItem(index)}
                                className="text-xs text-red-500 flex items-center mt-1 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2 text-center">
                          <span className="font-medium text-xs md:text-base">{
                            item.product.variations && item.product.variations.some(v => v.includes('pills')) && item.variation.includes('pills')
                              ? (() => {
                                  const qty = parseInt(item.variation);
                                  if (qty === 100) return "$100.00";
                                  if (qty === 200) return "$180.00";
                                  if (qty === 300) return "$240.00";
                                  if (qty === 500) return "$480.00";
                                  return `$${qty}.00`;
                                })()
                              : `$${item.product.price.toFixed(2)}`
                          }</span>
                        </div>

                        <div className="col-span-2">
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 md:h-8 md:w-8 rounded-full"
                              onClick={() => handleQuantityChange(index, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-2.5 w-2.5 md:h-3 md:w-3" />
                            </Button>
                            <span className="w-6 md:w-10 text-center text-xs md:text-base">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 md:h-8 md:w-8 rounded-full"
                              onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            >
                              <Plus className="h-2.5 w-2.5 md:h-3 md:w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="col-span-2 text-right">
                          <span className="font-medium text-xs md:text-base">{
                            item.product.variations && item.product.variations.some(v => v.includes('pills')) && item.variation.includes('pills')
                              ? (() => {
                                  const qty = parseInt(item.variation);
                                  if (qty === 100) return `$${(100 * item.quantity).toFixed(2)}`;
                                  if (qty === 200) return `$${(180 * item.quantity).toFixed(2)}`;
                                  if (qty === 300) return `$${(240 * item.quantity).toFixed(2)}`;
                                  if (qty === 500) return `$${(480 * item.quantity).toFixed(2)}`;
                                  return `$${(qty * item.quantity).toFixed(2)}`;
                                })()
                              : `$${(item.product.price * item.quantity).toFixed(2)}`
                          }</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Summary</h2>
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex justify-between font-bold text-base md:text-lg">
                    <span>Grand Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
