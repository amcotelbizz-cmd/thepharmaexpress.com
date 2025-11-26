"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function CartSection() {
  const { cart, updateQuantity, removeFromCart } = useCart()

  // Calculate totals
  const subtotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

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

  const handleContactSales = () => {
    const contactSection = document.querySelector("#contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div>
      {cart.length === 0 ? (
        <div className="text-center py-10 md:py-16 bg-white rounded-xl shadow-sm">
          <ShoppingBag className="h-16 w-16 md:h-20 md:w-20 mx-auto text-gray-300 mb-4 md:mb-6" />
          <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
            Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
          </p>
          <Button
            size="lg"
            onClick={() => {
              const productsSection = document.querySelector("#featured-products")
              if (productsSection) {
                productsSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Browse Products
          </Button>
        </div>
      ) : (
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
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-md overflow-hidden border">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium hover:text-primary transition-colors text-sm md:text-base line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-500 mb-1">Variation: {item.variation}</p>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-xs md:text-sm text-red-500 flex items-center mt-1 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    <span className="font-medium text-sm md:text-base">${item.product.price.toFixed(2)}</span>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 md:h-8 md:w-8 rounded-full"
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 md:w-10 text-center text-sm md:text-base">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 md:h-8 md:w-8 rounded-full"
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="col-span-2 text-right">
                    <span className="font-medium text-sm md:text-base">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 md:p-6 bg-gray-50 border-t">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Shipping and taxes will be calculated by our sales team</p>
              </div>
              <Button size="lg" onClick={handleContactSales}>
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
