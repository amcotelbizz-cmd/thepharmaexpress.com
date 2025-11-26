import { Metadata } from "next"
import { generateSEO, pageKeywords } from "@/lib/seo"

export const metadata: Metadata = generateSEO({
  title: "About thepharmaexpress | Licensed Online Pharmacy for ED Medications",
  description: "Learn about thepharmaexpress, a licensed online pharmacy specializing in erectile dysfunction medications. Licensed physicians, FDA-approved medications, and discreet shipping.",
  keywords: pageKeywords.about,
  canonical: "https://thepharmaexpress.com/about",
})

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "thepharmaexpress",
              "description": "Licensed online pharmacy specializing in erectile dysfunction medications",
              "url": "https://thepharmaexpress.com",
              "foundingDate": "2020",
              "specialty": "Erectile Dysfunction Treatment",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ABC_ADDRESS_LINE",
                "addressLocality": "Burbank",
                "addressRegion": "CA",
                "postalCode": "91506",
                "addressCountry": "US"
              }
            }
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About thepharmaexpress</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                thepharmaexpress is dedicated to providing safe, effective, and affordable erectile dysfunction 
                medications through our licensed online pharmacy. We understand the sensitive nature of 
                ED treatment and strive to offer a discreet, professional service that puts your health 
                and privacy first.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Licensed Medical Professionals</h2>
              <p className="text-gray-600 leading-relaxed">
                All prescriptions are reviewed and approved by licensed physicians in your state. 
                Our medical team consists of experienced doctors who specialize in men's health 
                and erectile dysfunction treatment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">FDA-Approved Medications</h2>
              <p className="text-gray-600 leading-relaxed">
                We only provide FDA-approved medications including Sildenafil, Tadalafil, and Vardenafil. 
                All medications are sourced from licensed pharmacies and undergo strict quality control 
                measures to ensure safety and efficacy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy & Discretion</h2>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is our top priority. All shipments are discreetly packaged with no 
                identifying information about the contents. Our consultation process is completely 
                confidential and HIPAA-compliant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">thepharmaexpress Healthcare</h3>
                <p className="text-gray-600">ABC_ADDRESS_LINE</p>
                <p className="text-gray-600">Burbank, CA 91506</p>
                <p className="text-gray-600 mt-2">Phone: 1 (999) 999-9999</p>
                <p className="text-gray-600">Email: sales@thepharmaexpress.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
