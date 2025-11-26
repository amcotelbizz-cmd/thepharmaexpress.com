"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, ArrowRight } from "lucide-react"

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
  const [shippingMethod, setShippingMethod] = useState<string>("Standard (3-5 business days)");
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  
  useEffect(() => {
    // Get the order information from localStorage
    const storedOrderNumber = localStorage.getItem('lastOrderNumber');
    const storedOrderInfo = localStorage.getItem('lastOrderInfo');
    
    if (storedOrderNumber) {
      setOrderNumber(storedOrderNumber);
      
      // Set the current date in a readable format
      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(now);
      setOrderDate(formattedDate);
      
      // Get customer information if available
      if (storedOrderInfo) {
        try {
          const orderInfo = JSON.parse(storedOrderInfo);
          setCustomerInfo(orderInfo.customerInfo);
          
          // Set payment method if available
          if (orderInfo.paymentInfo && orderInfo.paymentInfo.cardType) {
            setPaymentMethod(`${orderInfo.paymentInfo.cardType} Card`);
          }
          
          // Set shipping method if available
          if (orderInfo.shippingMethod) {
            setShippingMethod(orderInfo.shippingMethod);
          }
        } catch (error) {
          console.error("Error parsing order information:", error);
        }
      }
    } else {
      // Fallback if no order number is found (should not happen in normal flow)
      const fallbackOrderNumber = `ORD-${Date.now()}`;
      setOrderNumber(fallbackOrderNumber);
      setOrderDate(new Date().toLocaleString());
    }
  }, []);

  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Your order has been received and is now being processed. We'll send you a confirmation email shortly.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-8 w-full max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">Order Details</span>
            </div>
            <div className="grid grid-cols-1 gap-3 text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-mono font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{orderDate}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{paymentMethod} {customerInfo?.paymentInfo?.lastFour ? `(**** **** **** ${customerInfo.paymentInfo.lastFour})` : ''}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">{shippingMethod}</span>
              </div>
              
              {customerInfo && (
                <>
                  <div className="pt-2 pb-1">
                    <span className="font-medium">Shipping Address:</span>
                  </div>
                  <div className="pl-2 text-sm space-y-1 pb-2 border-b">
                    <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                    <p>{customerInfo.address}</p>
                    {customerInfo.address2 && <p>{customerInfo.address2}</p>}
                    <p>{customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}</p>
                    <p>{customerInfo.email}</p>
                    <p>{customerInfo.phone}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
