import { notFound } from "next/navigation"
import { Metadata } from "next"
import { products } from "@/lib/products"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id)
  
  if (!product) {
    return {
      title: "Product Not Found | thepharmaexpress",
      description: "The requested product was not found.",
    }
  }

  return {
    title: `${product.name} | Buy Online | $${product.price} | thepharmaexpress`,
    description: `${product.description} Available in multiple quantities. Starting at $${product.price}. FDA-approved with doctor consultation and discreet shipping.`,
    keywords: [
      product.name.toLowerCase(),
      product.category || "ED medication",
      "ED medication",
      "online pharmacy",
      "prescription medicine",
      "doctor consultation",
      `${product.name} price`,
      `buy ${product.name} online`
    ],
    openGraph: {
      title: `${product.name} | Buy Online | $${product.price} | thepharmaexpress`,
      description: `${product.description} Available in multiple quantities. Starting at $${product.price}.`,
      url: `https://thepharmaexpress.com/products/${product.id}`,
      images: [
        {
          url: `https://thepharmaexpress.com${product.image}`,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `https://thepharmaexpress.com/products/${product.id}`,
    },
  }
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)
  
  if (!product) {
    notFound()
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": `https://thepharmaexpress.com${product.image}`,
    "url": `https://thepharmaexpress.com/products/${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "thepharmaexpress"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "thepharmaexpress"
      }
    },
    "category": product.category || "ED Medication",
    "mpn": product.id
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Available Quantities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.variations.map((variation, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{variation}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">${product.price}</p>
                      <Button className="w-full mt-2">Add to Cart</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
              <p className="text-blue-800 text-sm">
                This medication requires a prescription. Our licensed physicians will review your information 
                and provide a consultation before dispensing any medication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
