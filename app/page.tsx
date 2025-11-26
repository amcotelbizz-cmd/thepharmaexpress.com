import { Button } from "@/components/ui/button"
import { ShoppingBag, Truck, CreditCard, LifeBuoy, Star } from "lucide-react"
import { products } from "@/lib/products"
import FeaturedProducts from "@/components/featured-products"
import ImageSlider from "@/components/image-slider"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "thepharmaexpress - Buy ED Medications Online | Sildenafil, Tadalafil, Vardenafil",
  description: "Shop premium erectile dysfunction medications online. FDA-approved Sildenafil (25mg-200mg), Tadalafil (20mg-80mg), and Vardenafil (20mg-60mg). Doctor consultation included.",
  keywords: [
    "buy ED medication online",
    "sildenafil for sale",
    "tadalafil online",
    "vardenafil prescription",
    "erectile dysfunction treatment",
    "online ED pharmacy",
    "men's health medication",
    "prescription ED drugs"
  ],
  openGraph: {
    title: "thepharmaexpress - Buy ED Medications Online | Sildenafil, Tadalafil, Vardenafil",
    description: "Shop premium erectile dysfunction medications online. FDA-approved medications with doctor consultation and discreet shipping.",
    url: "https://thepharmaexpress.com",
    images: [
      {
        url: "/images/thepharmaexpress-logo.png",
        width: 1200,
        height: 630,
        alt: "thepharmaexpress - Premium ED Medications Online",
      },
    ],
  },
  alternates: {
    canonical: "https://thepharmaexpress.com",
  },
}

export default function Home() {
  // Get all products
  const allProducts = products

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": allProducts.slice(0, 6).map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.description,
                "image": `https://thepharmaexpress.com${product.image}`,
                "url": `https://thepharmaexpress.com/products/${product.id}`,
                "offers": {
                  "@type": "Offer",
                  "price": product.price,
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                },
                "brand": {
                  "@type": "Brand",
                  "name": "thepharmaexpress"
                }
              }
            }))
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "thepharmaexpress",
            "description": "Online pharmacy specializing in erectile dysfunction medications",
            "url": "https://thepharmaexpress.com",
            "telephone": "+1-999-999-9999",
            "email": "sales@thepharmaexpress.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ABC_ADDRESS_LINE",
              "addressLocality": "Burbank",
              "addressRegion": "CA",
              "postalCode": "91506",
              "addressCountry": "US"
            },
            "openingHours": "Mo-Fr 09:00-18:00",
            "medicalSpecialty": "Urology"
          })
        }}
      />
      
      <div className="flex flex-col min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative overflow-hidden">
        <ImageSlider />
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-10 md:py-16 bg-gray-50 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200&text=Pattern')",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10">
            <div>
              <span className="text-primary font-medium text-sm md:text-base">Our Products</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">Shop All Products</h2>
              <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Quality products at great prices</p>
            </div>
          </div>

          <FeaturedProducts products={allProducts} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="text-primary font-medium text-sm md:text-base">Why Choose Us</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">Why Shop With Us</h2>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              We're committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="flex flex-col items-center text-center p-4 md:p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We source only the highest quality products for our customers.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 md:p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                <Truck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Fast Shipping</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Get your orders delivered quickly with our expedited shipping.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 md:p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Shop with confidence with our secure payment methods.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 md:p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                <LifeBuoy className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Our customer service team is always ready to help you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <span className="text-primary font-medium text-sm md:text-base">Your Health Matters</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 mb-4">Premium ED Medications Made Accessible</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  At thepharmaexpress, we understand that men's health is a sensitive topic. That's why we've created a discreet, convenient, and affordable way to access FDA-approved medications for erectile dysfunction.
                </p>
                <p className="text-gray-600">
                  Our prescription medications are sourced from trusted manufacturers and shipped directly to your door in discreet packaging. No awkward pharmacy visits, no judgement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>FDA-approved medications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Discreet packaging guaranteed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Fast shipping nationwide</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Competitive pricing</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button className="mr-4" asChild>
                    <Link href="/categories">Shop Now</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg bg-white border">
              <div className="grid grid-cols-1 gap-y-4 p-4">
                <div className="p-6 bg-gray-100 rounded-lg border border-gray-300 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 text-lg text-center">Sildenafil</h4>
                  <div className="text-center mt-3">
                    <p className="text-gray-700 font-medium">25mg - 200mg</p>
                    <p className="text-gray-600 mt-2">Works for 4-6 hours</p>
                    <div className="mt-3 pt-2 border-t border-gray-300">
                      <Link href="/categories/sildenafil" className="text-gray-800 hover:underline text-sm font-medium">View Options →</Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-800 text-lg text-center">Tadalafil</h4>
                  <div className="text-center mt-3">
                    <p className="text-gray-700 font-medium">20mg - 80mg</p>
                    <p className="text-gray-600 mt-2">Long-lasting - up to 36 hours</p>
                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <Link href="/categories/tadalafil" className="text-gray-700 hover:underline text-sm font-medium">View Options →</Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-200 rounded-lg border border-gray-400 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 text-lg text-center">Vardenafil</h4>
                  <div className="text-center mt-3">
                    <p className="text-gray-700 font-medium">20mg - 60mg</p>
                    <p className="text-gray-600 mt-2">Rapid onset of action</p>
                    <div className="mt-3 pt-2 border-t border-gray-400">
                      <Link href="/categories/vardenafil" className="text-gray-800 hover:underline text-sm font-medium">View Options →</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="text-primary font-medium text-sm md:text-base">Customer Testimonials</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">What Our Customers Say</h2>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              Hear from men who have regained their confidence with our products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                  <Image 
                    src="/images/testimonials/testimonial-1.jpg" 
                    alt="John D." 
                    width={48} 
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">John D.</h4>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">
                "After trying several options, Sildenafil from thepharmaexpress has been the most effective for me. The ordering process was simple and the discreet packaging was much appreciated."
              </p>
              <p className="text-sm text-gray-500">Customer since 2023</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                  <Image 
                    src="/images/testimonials/testimonial-2.jpg" 
                    alt="Robert M." 
                    width={48} 
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Robert M.</h4>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">
                "Tadalafil has been a game-changer for me. The 36-hour window makes spontaneity possible again. Great service, quick delivery, and excellent results!"
              </p>
              <p className="text-sm text-gray-500">Customer since 2022</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                  <Image 
                    src="/images/testimonials/testimonial-3.jpg" 
                    alt="Michael T." 
                    width={48} 
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">
                "I've been using Vardenafil for 6 months now. The fast-acting formula works perfectly for my needs. The customer service team was also very helpful when I had questions."
              </p>
              <p className="text-sm text-gray-500">Customer since 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="text-primary font-medium text-sm md:text-base">Common Questions</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              Get answers to the most common questions about our products and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How do I know which medication is right for me?</h3>
              <p className="text-gray-600">
                Each medication has different onset times and durations. Sildenafil works for 4-6 hours, Tadalafil for up to 36 hours, and Vardenafil has a rapid onset. We recommend discussing with a healthcare provider to find the best option for your needs.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Is my order packaged discreetly?</h3>
              <p className="text-gray-600">
                Yes, all orders are shipped in plain, unmarked packaging with no indication of the contents or that it's from a pharmacy. Your privacy is our top priority.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How quickly will I receive my order?</h3>
              <p className="text-gray-600">
                Most orders are processed within 24-48 hours and delivered within 3-5 business days via expedited shipping. We also offer express shipping options at checkout.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <a href="/faq">View All FAQs</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
