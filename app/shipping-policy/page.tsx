"use client"

import React from "react"

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary text-center tracking-tight">Shipping Policy</h1>
        <div className="space-y-8">
          <section>
            <p className="mb-3 leading-relaxed text-center text-gray-500">Thank you for visiting and shopping at <span className="font-semibold">thepharmaexpress.com</span>. Following are the terms and conditions that constitute our Shipping Policy.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 mt-6">Domestic Shipping Policy</h2>
            <h3 className="text-xl font-semibold text-primary mb-2 mt-4">Shipment processing time</h3>
            <p className="mb-3 leading-relaxed">All orders are processed and shipped within 1 or 2 business days. To avoid any delays, be sure to respond to our emails in a timely manner. Orders are not shipped or delivered on weekends or holidays.</p>
            <p className="mb-3 leading-relaxed">If we are experiencing a high volume of orders, shipments may be delayed. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.</p>
            <h3 className="text-xl font-semibold text-primary mb-2 mt-4">Shipping rates & delivery estimates</h3>
            <p className="mb-3 leading-relaxed">Shipping charges for your order will be calculated and displayed at checkout.</p>
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b font-semibold">Shipment method</th>
                    <th className="px-4 py-2 border-b font-semibold">Estimated delivery time</th>
                    <th className="px-4 py-2 border-b font-semibold">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b">First Class USPS</td>
                    <td className="px-4 py-2 border-b">3-5 Business Days</td>
                    <td className="px-4 py-2 border-b">Free</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">Overnight UPS</td>
                    <td className="px-4 py-2 border-b">Next Business Day (if ordered by 12pm EST)</td>
                    <td className="px-4 py-2 border-b">$27</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">Pick up at Pharmacy</td>
                    <td className="px-4 py-2 border-b">Usually same day (In LA area only)</td>
                    <td className="px-4 py-2 border-b">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-3 leading-relaxed text-yellow-700 font-semibold">IMPORTANT: To avoid any delays to your order, please promptly respond to any emails or text messages sent by our support team.</p>
            <h3 className="text-xl font-semibold text-primary mb-2 mt-4">Shipment Destinations</h3>
            <p className="mb-3 leading-relaxed">We can ship to all US states, except for Alaska, North Dakota, Minnesota, and South Carolina.</p>
            <h3 className="text-xl font-semibold text-primary mb-2 mt-4">Shipment to P.O. boxes or APO/FPO addresses</h3>
            <p className="mb-3 leading-relaxed">thepharmaexpress.com ships to addresses within the U.S., U.S. Territories, and APO/FPO/DPO addresses.</p>
            <h3 className="text-xl font-semibold text-primary mb-2 mt-4">Shipment confirmation & Order tracking</h3>
            <p className="mb-3 leading-relaxed">You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
            <h3 className="text-xl font-semibold text-primary mb-2 mt-4">Customs, Duties and Taxes</h3>
            <p className="mb-3 leading-relaxed">thepharmaexpress.com is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
            <h3 className="text-xl font-semibold text-primary mb-2 mt-4">Damages</h3>
            <p className="mb-3 leading-relaxed">thepharmaexpress.com is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
            <p className="mb-3 leading-relaxed">Please save all packaging materials and damaged goods before filing a claim.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 mt-6">International Shipping Policy</h2>
            <p className="mb-3 leading-relaxed">We currently do not ship outside the U.S.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 mt-6">Returns Policy</h2>
            <p className="mb-3 leading-relaxed">Our Cancellation & Refund Policy provides detailed information about options and procedures for returning your order. <a href="/cancellation-refund-policy" className="text-blue-600 underline hover:text-blue-800">See Cancellation & Refund Policy page for details.</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
