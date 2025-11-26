import { redirect } from "next/navigation"
import { Metadata } from "next"
import { generateSEO, pageKeywords } from "@/lib/seo"

export const metadata: Metadata = generateSEO({
  title: "All ED Medications | Buy Sildenafil, Tadalafil, Vardenafil Online | thepharmaexpress",
  description: "Shop all erectile dysfunction medications online. Compare Sildenafil, Tadalafil, and Vardenafil prices and dosages. FDA-approved with doctor consultation.",
  keywords: pageKeywords.products,
  canonical: "https://thepharmaexpress.com/products",
})

export default function ProductsPage() {
  // Redirect to home page since all products are shown there
  redirect("/")
}
