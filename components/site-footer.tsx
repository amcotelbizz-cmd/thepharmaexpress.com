import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-gray-100 border-t relative">
      <div
        className="absolute inset-0 bg-opacity-5"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200&text=Pattern')",
        }}
      ></div>
      <div className="container py-8 md:py-12 px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-3 md:space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl md:text-2xl font-bold text-gray-900">
                The Pharma Express
              </span>
            </Link>
            <p className="text-sm text-gray-600">Your one-stop shop for quality products at affordable prices.</p>
          </div>

          <div className="order-3 md:order-2 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-sm text-gray-600 hover:text-primary">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation-refund-policy" className="text-sm text-gray-600 hover:text-primary">
                  Cancellation &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/telemedicine-consent" className="text-sm text-gray-600 hover:text-primary">
                  Telemedicine Consent
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
