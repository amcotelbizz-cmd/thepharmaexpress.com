"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Minus, Plus } from "lucide-react"

interface BuyNowModalProps {
  product: Product
  onClose: () => void
  onProceedToCheckout: (product: Product, quantity: number, variation: string) => void
}

export default function BuyNowModal({ product, onClose, onProceedToCheckout }: BuyNowModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [variation, setVariation] = useState(product.variations[0])

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

  const handleConfirm = () => {
    onProceedToCheckout(product, quantity, variation)
  }

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Buy Now: {product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>

          {/* Variation Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Variation</label>
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
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Confirm Button */}
          <Button className="w-full" onClick={handleConfirm}>
            Confirm & Checkout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
