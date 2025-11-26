"use client"

import React from "react"

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-primary">Frequently Asked Questions (FAQ)</h1>
      <div className="space-y-6 text-sm md:text-base">
        <div>
          <h2 className="text-lg font-semibold mb-2">How do I place an order?</h2>
          <p>Browse our products, add items to your cart, and proceed to checkout. Follow the prompts to complete your purchase.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">What payment methods do you accept?</h2>
          <p>We accept major credit/debit cards and other payment methods as listed at checkout.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">How can I track my order?</h2>
          <p>Once your order ships, you will receive a confirmation email with tracking information.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">What is your return policy?</h2>
          <p>Returns are accepted within 30 days of delivery. Please see our Returns &amp; Refunds page for details.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">How do I contact customer support?</h2>
          <p>You can reach us via the Contact page for any questions or assistance.</p>
        </div>
      </div>
    </div>
  )
}
