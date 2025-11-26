"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Minus, Plus, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface AddToCartPopupProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, quantity: number, variation: string) => void
}

export default function AddToCartPopup({ product, isOpen, onClose, onAddToCart }: AddToCartPopupProps) {
  const [quantity, setQuantity] = useState(1)
  const [variation, setVariation] = useState(product.variations[0])
  const router = useRouter()
  const { addToCart } = useCart()

  // Helper to get price for selected variation
  const getVariationPrice = (variation: string) => {
    if (product.variations && variation && variation.includes('pills')) {
      const qty = parseInt(variation)
      if (qty === 100) return 100
      if (qty === 200) return 180
      if (qty === 300) return 240
      if (qty === 500) return 480
      return qty
    }
    return product.price
  }

  const price = getVariationPrice(variation)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleVariationChange = (value: string) => {
    setVariation(value)
  }

  const handleAddToCart = () => {
    onAddToCart({ ...product, price }, quantity, variation)
    setQuantity(1) // Reset quantity for next time
    onClose()
  }
  
  const handleBuyNow = () => {
    addToCart({ ...product, price }, quantity, variation)
    onClose()
    router.push('/checkout')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-base">{product.name}</h3>
              <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
            </div>
          </div>

          {/* Variation Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Variation</label>
            <Select value={variation} onValueChange={handleVariationChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select variation" />
              </SelectTrigger>
              <SelectContent>
                {product.variations.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-l-md rounded-r-none"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-9 px-4 flex items-center justify-center border-y">
                <span className="text-center w-8">{quantity}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-r-md rounded-l-none"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium">Total:</span>
            <span className="font-bold text-lg">${(price * quantity).toFixed(2)}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button className="flex-1" variant="secondary" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
