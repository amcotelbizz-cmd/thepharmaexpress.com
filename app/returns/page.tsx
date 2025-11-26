"use client"

import React from "react"

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-primary">Returns &amp; Refunds Policy</h1>
      <div className="space-y-6 text-sm md:text-base">
        <p>
          We want you to be completely satisfied with your purchase. If you are not satisfied, please review our returns and refunds policy below.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Returns</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Returns are accepted within 30 days of delivery.</li>
          <li>Items must be unused, in original packaging, and in the same condition as received.</li>
          <li>To initiate a return, please contact our support team with your order details.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Refunds</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Once your return is received and inspected, we will notify you of the approval or rejection of your refund.</li>
          <li>If approved, your refund will be processed to your original payment method within 5-7 business days.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Exchanges</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We only replace items if they are defective or damaged. Please contact us for assistance.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Shipping Costs</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.</li>
        </ul>
        <p className="mt-8">For any questions about returns or refunds, please contact us via our Contact page.</p>
      </div>
    </div>
  )
}
