"use client"

import React from "react"

export default function CancellationRefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary text-center tracking-tight">Cancellation & Refund Policy</h1>
        <div className="space-y-8">
          <section>
            <p className="mb-3 leading-relaxed text-center text-gray-500">Thanks for shopping at <span className="font-semibold">thepharmaexpress.com</span>.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 mt-6">Returns & Refunds</h2>
            <p className="mb-3 leading-relaxed">For safety reasons, we cannot accept returns of prescription products for reuse or resale. If you feel we have made an error with your order, please contact us.</p>
            <p className="mb-3 leading-relaxed">Some items in our store may be offered to you as a subscription. This cancellation policy lays out how you can change or cancel these kinds of purchases.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 mt-6">Subscriptions</h2>
            <p className="mb-3 leading-relaxed">When you purchase a subscription you'll receive repeat deliveries. These are based on the subscription duration and frequency that you select.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 mt-6">Payments</h2>
            <p className="mb-3 leading-relaxed">Your payment details will be stored securely and you'll be charged for each of these deliveries.</p>
            <p className="mb-3 leading-relaxed">Some subscriptions may auto-renew at the end of their duration. If you don't want to renew a subscription you can cancel it.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 mt-6">Cancel or Update Subscription</h2>
            <p className="mb-3 leading-relaxed">If you want to cancel or change your subscription, you can do it at any time. Your order confirmation emails have links to your order. You can manage your subscription from there.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 mt-6">Shipping</h2>
            <p className="mb-3 leading-relaxed">Shipping costs are non­refundable.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
