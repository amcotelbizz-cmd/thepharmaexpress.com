"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Minus, Plus, ShoppingCart, Star, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-media-query"

interface QuickViewModalProps {
  product: Product
  onClose: () => void
  onProceedToCheckout: (product: Product, quantity: number, variation: string) => void
  onAddToCart: (product: Product, quantity: number, variation: string) => void
}

export default function QuickViewModal({ product, onClose, onProceedToCheckout, onAddToCart }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [variation, setVariation] = useState(product.variations[0])
  const [currentImage, setCurrentImage] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

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

  const handleProceedToCheckout = () => {
    onProceedToCheckout(product, quantity, variation)
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity, variation)
  }

  // Generate a deterministic review count between 10 and 39 based on product id
  const getReviewCount = (productId: string) => {
    let hash = 0
    for (let i = 0; i < productId.length; i++) {
      hash = productId.charCodeAt(i) + ((hash << 5) - hash)
    }
    return (Math.abs(hash) % 30) + 10
  }

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent
        className={`p-0 overflow-hidden rounded-xl ${
          isMobile ? "w-[95%] max-w-[95%] h-[90vh] max-h-[90vh]" : "sm:max-w-[900px]"
        }`}
      >
        <DialogClose className="absolute right-4 top-4 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className={`grid grid-cols-1 ${isMobile ? "overflow-y-auto" : "md:grid-cols-2"}`}>
          {/* Product Images */}
          <div className="p-4 md:p-8 bg-gray-50">
            <div className="relative h-64 md:h-80 w-full mb-3 md:mb-6 rounded-lg overflow-hidden">
              <Image
                src={product.images[currentImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
              />
              {product.featured && (
                <Badge className="absolute top-2 left-2 bg-primary hover:bg-primary text-xs">Featured</Badge>
              )}
            </div>
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-14 w-14 md:h-16 md:w-16 cursor-pointer rounded-md overflow-hidden border-2 flex-shrink-0 ${
                    currentImage === index ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4 md:p-8">
            <DialogHeader className="mb-2">
              <div className="text-xs md:text-sm text-primary font-medium uppercase tracking-wider mb-1">
                {product.category}
              </div>
              <DialogTitle className="text-xl md:text-2xl font-bold">{product.name}</DialogTitle>
            </DialogHeader>

            <div className="flex items-center mb-3 md:mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 md:h-4 md:w-4 ${i < Math.floor(product.rating || 0) ? "fill-current" : ""}`}
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm text-gray-500">({getReviewCount(product.id)} reviews)</span>
            </div>

            <div className="mt-3 md:mt-4">
              <p className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-primary">${product.price.toFixed(2)}</p>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{product.description}</p>

              <div className="space-y-4 md:space-y-6">
                {/* Variation Selector */}
                <div>
                  <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Variation</label>
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
                  <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Quantity</label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 md:h-10 md:w-10 rounded-l-md rounded-r-none"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                    <div className="w-10 md:w-12 h-8 md:h-10 flex items-center justify-center border-y text-sm md:text-base">
                      {quantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 md:h-10 md:w-10 rounded-r-md rounded-l-none"
                      onClick={increaseQuantity}
                    >
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 md:gap-4">
                  <Button className="flex-1 text-xs md:text-sm h-9 md:h-10" onClick={handleAddToCart}>
                    <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    className="flex-1 text-xs md:text-sm h-9 md:h-10"
                    variant="secondary"
                    onClick={handleProceedToCheckout}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Product features */}
                <div className="pt-4 md:pt-6 border-t">
                  <h4 className="font-medium text-sm md:text-base mb-2 md:mb-3">Product Features</h4>
                  <ul className="space-y-1 md:space-y-2">
                    {[
                      "Premium quality materials",
                      "Ethically sourced and manufactured",
                      "Free shipping on orders over $50",
                      "30-day money-back guarantee",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-gray-700 mr-1 md:mr-2 mt-0.5" />
                        <span className="text-xs md:text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
