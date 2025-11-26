import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProductsByCategory } from "@/lib/products"
import { Metadata } from "next"
import { generateSEO, pageKeywords } from "@/lib/seo"

export const metadata: Metadata = generateSEO({
  title: "Medication Categories | thepharmaexpress",
  description: "Browse our medication categories. Choose from pain relief, anti-anxiety, sleep aids, and ED medications.",
  keywords: pageKeywords.categories,
  canonical: "https://thepharmaexpress.com/categories",
})

const categories = [
  // ED Medications
  {
    id: "sildenafil",
    title: "Sildenafil",
    description: "The original ED treatment with proven effectiveness",
    details: "Available in 25mg, 50mg, 100mg, 120mg, 150mg, and 200mg strengths",
    image: "/images/sildenafil-100.webp",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "tadalafil", 
    title: "Tadalafil",
    description: "Long-lasting treatment with up to 36 hours of effectiveness",
    details: "Available in 20mg, 40mg, 60mg, and 80mg strengths",
    image: "/images/calis-20.webp",
    color: "from-green-500 to-green-600"
  },
  {
    id: "vardenafil",
    title: "Vardenafil", 
    description: "Fast-acting solution for on-demand results",
    details: "Available in 20mg, 40mg, and 60mg strengths",
    image: "/images/lavitra-20.webp",
    color: "from-purple-500 to-purple-600"
  },
  // Pain Medications
  {
    id: "hydrocodone",
    title: "Hydrocodone",
    description: "Effective pain relief for moderate to severe pain",
    details: "Available in various strengths and combinations",
    image: "/images/Hydrocodone/HYDROCODONE10.jpg",
    color: "from-red-500 to-red-600"
  },
  {
    id: "oxycodone",
    title: "Oxycodone",
    description: "Potent pain relief for moderate to severe pain",
    details: "Available in multiple strengths for tailored pain management",
    image: "/images/Oxycodone/oxycodone30mg-300x225.jpg",
    color: "from-orange-500 to-orange-600"
  },
  {
    id: "oxycontin",
    title: "Oxycontin",
    description: "Long-acting pain relief for around-the-clock management",
    details: "Extended-release formulation for lasting relief",
    image: "/images/Oxycontin/Oxycontin40mg-300x225.jpg",
    color: "from-amber-500 to-amber-600"
  },
  {
    id: "percocet",
    title: "Percocet",
    description: "Combination pain medication for effective relief",
    details: "Contains oxycodone and acetaminophen for dual-action relief",
    image: "/images/Percocet/Percocet10_325mg-300x225.jpg",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    id: "tramadol",
    title: "Tramadol",
    description: "Moderate pain relief with lower risk of dependency",
    details: "Synthetic opioid for moderate to moderately severe pain",
    image: "/images/Tramadol/tramadol200mg-2.jpg",
    color: "from-lime-500 to-lime-600"
  },
  // Anti-Anxiety Medications
  {
    id: "xanax",
    title: "Xanax",
    description: "Fast-acting relief for anxiety and panic disorders",
    details: "Available in multiple strengths and formulations",
    image: "/images/Xanax/Xanax2mg-300x225.jpg",
    color: "from-teal-500 to-teal-600"
  },
  {
    id: "alprazolam",
    title: "Alprazolam",
    description: "Generic Xanax for anxiety and panic disorders",
    details: "More affordable alternative with the same effectiveness",
    image: "/images/Alprazolam/ALPRAZOLAM2MG.jpg",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    id: "ativan",
    title: "Ativan",
    description: "Relief for anxiety, insomnia, and seizures",
    details: "Intermediate-acting benzodiazepine for multiple uses",
    image: "/images/Ativan/ativan-2mg-300x225.jpg",
    color: "from-sky-500 to-sky-600"
  },
  {
    id: "valium",
    title: "Valium",
    description: "Long-acting relief for anxiety, muscle spasms, and seizures",
    details: "Versatile medication with multiple therapeutic uses",
    image: "/images/Valium/Valium-10mg-1.png",
    color: "from-indigo-500 to-indigo-600"
  },
  // Sleep Aids
  {
    id: "ambien",
    title: "Ambien",
    description: "Fast-acting sleep aid for insomnia",
    details: "Helps you fall asleep quickly and stay asleep",
    image: "/images/Ambien/Ambien10mg-300x225.jpg",
    color: "from-violet-500 to-violet-600"
  },
  {
    id: "zolpidem",
    title: "Zolpidem",
    description: "Generic Ambien for insomnia treatment",
    details: "More affordable alternative for better sleep",
    image: "/images/Zolpidem/Zolpidem-10mg.png",
    color: "from-purple-500 to-purple-600"
  },
  // ADHD Medications
  {
    id: "adderall",
    title: "Adderall",
    description: "ADHD and narcolepsy treatment",
    details: "Available in immediate and extended-release formulations",
    image: "/images/Adderall/Adderall30mg.jpg",
    color: "from-fuchsia-500 to-fuchsia-600"
  }
]

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Product Categories
            </h1>
            <p className="text-gray-600 text-lg">
              Explore our comprehensive range of medications. Choose the treatment that's right for you.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const productCount = getProductsByCategory(category.id).length
              return (
                <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-24 bg-gradient-to-r ${category.color}`} />
                  <CardHeader>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">{category.details}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        {productCount} Products Available
                      </span>
                      <Button asChild size="sm">
                        <Link href={`/categories/${category.id}`}>
                          View Products
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Why Choose Our Products?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">FDA</span>
                </div>
                <h3 className="font-semibold mb-2">FDA Approved</h3>
                <p className="text-sm text-gray-600">All medications are FDA-approved and safe</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">24h</span>
                </div>
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Quick and discreet shipping</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Private & Secure</h3>
                <p className="text-sm text-gray-600">Your privacy is our priority</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
