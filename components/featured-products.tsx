"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/components/ui/use-toast"
import QuickViewModal from "@/components/quick-view-modal"
import BuyNowModal from "@/components/buy-now-modal"
import AddToCartPopup from "@/components/add-to-cart-popup"
import { ShoppingCart, Star, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useQuickView } from "@/lib/quick-view-context"

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { quickViewProduct, setQuickViewProduct } = useQuickView()
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null)
  const [addToCartProduct, setAddToCartProduct] = useState<Product | null>(null)

  const handleQuickView = (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setQuickViewProduct(product)
  }

  const handleBuyNow = (product: Product) => {
    setBuyNowProduct(product)
  }

  // Instead of directly adding to cart, open the AddToCartPopup for user to select variation and quantity
  const handleAddToCartClick = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAddToCartProduct(product)
  }

  // Only add to cart, do not redirect
  const handleAddToCart = (product: Product, quantity: number, variation: string) => {
    addToCart(product, quantity, variation)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${variation}) added to your cart`,
    })
    handleCloseModals()
  }

  // Helper to get price for selected variation
  const getVariationPrice = (product: Product, variation: string) => {
    // Pills pricing logic (example, adjust as needed)
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

  const handleCloseModals = () => {
    setQuickViewProduct(null)
    setBuyNowProduct(null)
    setAddToCartProduct(null)
  }

  const handleProceedToCheckout = (product: Product, quantity: number, variation: string) => {
    addToCart(product, quantity, variation)
    router.push("/cart") // Go to cart page instead of checkout
    handleCloseModals()
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
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleQuickView(product)}
            className="group relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full cursor-pointer"
          >
            <div className="relative pt-[100%] w-full bg-gray-100">
              {product.featured && <Badge className="absolute top-2 left-2 z-10 bg-primary text-xs">Featured</Badge>}
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Quick view eye icon */}
              <button
                onClick={(e) => handleQuickView(product, e)}
                className="absolute bottom-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-20 transition-all duration-200 hover:scale-110"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4 text-gray-700" />
              </button>

              {/* Desktop hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={(e) => handleQuickView(product, e)}
                >
                  Quick View
                </Button>
              </div>
            </div>
            <div className="p-3 md:p-4 flex flex-col flex-grow">
              <div className="flex items-center mb-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">({getReviewCount(product.id)})</span>
              </div>

              <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-2 flex-grow">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-sm md:text-base">${product.price.toFixed(2)}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs h-8 px-2 md:px-3 hover:bg-primary hover:text-white transition-colors"
                  onClick={(e) => handleAddToCartClick(product, e)}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" /> Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={handleCloseModals}
          onProceedToCheckout={handleProceedToCheckout}
          onAddToCart={handleAddToCart}
        />
      )}

      {buyNowProduct && (
        <BuyNowModal
          product={buyNowProduct}
          onClose={handleCloseModals}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {addToCartProduct && (
        <AddToCartPopup
          product={addToCartProduct}
          isOpen={!!addToCartProduct}
          onClose={handleCloseModals}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  )
}
