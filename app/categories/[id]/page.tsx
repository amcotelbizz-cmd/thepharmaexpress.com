import { notFound } from "next/navigation"
import { products, getProductsByCategory } from "@/lib/products"
import FeaturedProducts from "@/components/featured-products"

interface CategoryPageProps {
  params: {
    id: string
  }
}

const categoryInfo = {
  // ED Medications
  sildenafil: {
    title: "Sildenafil Products",
    description: "Effective ED medication available in multiple strengths (25mg - 200mg). Proven results for improved performance and confidence.",
    subtitle: "The original ED treatment"
  },
  tadalafil: {
    title: "Tadalafil Products", 
    description: "Long-lasting ED medication with up to 36 hours of effectiveness (20mg - 80mg). Perfect for spontaneous moments.",
    subtitle: "Extended duration treatment"
  },
  vardenafil: {
    title: "Vardenafil Products",
    description: "Fast-acting ED solution for on-demand results (20mg - 60mg). Quick onset for reliable performance.",
    subtitle: "Rapid action formula"
  },
  // Pain Medications
  hydrocodone: {
    title: "Hydrocodone Products",
    description: "Effective medication for moderate to severe pain. Available in various strengths and combinations.",
    subtitle: "Reliable pain relief"
  },
  oxycodone: {
    title: "Oxycodone Products",
    description: "Potent pain relief for moderate to severe pain. Available in multiple strengths for tailored pain management.",
    subtitle: "Strong pain management"
  },
  oxycontin: {
    title: "Oxycontin Products",
    description: "Long-acting pain relief for around-the-clock management. Extended-release formulation for lasting relief.",
    subtitle: "Extended-release pain relief"
  },
  percocet: {
    title: "Percocet Products",
    description: "Combination pain medication containing oxycodone and acetaminophen for effective dual-action relief.",
    subtitle: "Combination pain therapy"
  },
  tramadol: {
    title: "Tramadol Products",
    description: "Moderate pain relief with lower risk of dependency. Synthetic opioid for moderate to moderately severe pain.",
    subtitle: "Balanced pain management"
  },
  methadone: {
    title: "Methadone Products",
    description: "Long-acting synthetic opioid for severe pain relief and opioid dependence treatment.",
    subtitle: "Dual-purpose pain management"
  },
  norco: {
    title: "Norco Products",
    description: "Combination of hydrocodone and acetaminophen for effective pain relief with multiple strength options.",
    subtitle: "Targeted pain relief"
  },
  vicodin: {
    title: "Vicodin Products",
    description: "Well-known combination of hydrocodone and acetaminophen for reliable pain management.",
    subtitle: "Trusted pain relief"
  },
  lortab: {
    title: "Lortab Products",
    description: "Hydrocodone and acetaminophen combination available in multiple strengths for customized pain relief.",
    subtitle: "Customizable pain therapy"
  },
  roxicodone: {
    title: "Roxicodone Products",
    description: "Immediate-release oxycodone formulation for quick-onset pain relief when you need it most.",
    subtitle: "Rapid pain relief"
  },
  opana: {
    title: "Opana Products",
    description: "Oxymorphone-based medication providing potent relief for moderate to severe pain.",
    subtitle: "Powerful pain management"
  },
  // Anti-Anxiety Medications
  xanax: {
    title: "Xanax Products",
    description: "Fast-acting benzodiazepine for anxiety and panic disorders with multiple strength options.",
    subtitle: "Quick anxiety relief"
  },
  alprazolam: {
    title: "Alprazolam Products",
    description: "Generic Xanax offering the same effective anxiety relief at a more affordable price.",
    subtitle: "Affordable anxiety management"
  },
  ativan: {
    title: "Ativan Products",
    description: "Intermediate-acting benzodiazepine for anxiety, insomnia, and seizures with balanced effects.",
    subtitle: "Balanced anxiety treatment"
  },
  valium: {
    title: "Valium Products",
    description: "Long-acting benzodiazepine for anxiety, muscle spasms, and seizures with versatile applications.",
    subtitle: "Versatile anxiety solution"
  },
  // Sleep Aids
  ambien: {
    title: "Ambien Products",
    description: "Fast-acting non-benzodiazepine sleep aid that helps you fall asleep quickly and stay asleep.",
    subtitle: "Effective sleep solution"
  },
  zolpidem: {
    title: "Zolpidem Products",
    description: "Generic Ambien providing the same effective insomnia treatment at a more affordable price.",
    subtitle: "Affordable sleep aid"
  },
  // ADHD Medications
  adderall: {
    title: "Adderall Products",
    description: "Stimulant medication for ADHD and narcolepsy available in immediate and extended-release formulations.",
    subtitle: "Focus and attention support"
  },
  // Addiction Treatment
  suboxone: {
    title: "Suboxone Products",
    description: "Combination of buprenorphine and naloxone used for opioid dependence treatment and recovery.",
    subtitle: "Addiction recovery aid"
  },
  // Weight Management
  adipex: {
    title: "Adipex Products",
    description: "Weight management medication that helps suppress appetite for effective weight loss support.",
    subtitle: "Weight loss support"
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params
  const category = id.toLowerCase()
  
  // Check if category exists
  if (!categoryInfo[category as keyof typeof categoryInfo]) {
    notFound()
  }
  
  const categoryProducts = getProductsByCategory(category)
  const info = categoryInfo[category as keyof typeof categoryInfo]
  
  if (categoryProducts.length === 0) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Category Header */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm md:text-base">{info.subtitle}</span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 mb-4">{info.title}</h1>
            <p className="text-gray-600 text-lg">{info.description}</p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>✓ FDA Approved</span>
              <span>✓ Discreet Packaging</span>
              <span>✓ Fast Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Available Products ({categoryProducts.length})
            </h2>
            <p className="text-gray-600">Choose the strength that's right for you</p>
          </div>
          
          <FeaturedProducts products={categoryProducts} />
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  return [
    // ED Medications
    { id: 'sildenafil' },
    { id: 'tadalafil' },
    { id: 'vardenafil' },
    // Pain Medications
    { id: 'hydrocodone' },
    { id: 'oxycodone' },
    { id: 'oxycontin' },
    { id: 'methadone' },
    { id: 'oxymorphone' },
    { id: 'percocet' },
    { id: 'norco' },
    { id: 'vicodin' },
    { id: 'lortab' },
    { id: 'roxicodone' },
    { id: 'tramadol' },
    { id: 'tapentadol' },
    { id: 'opana' },
    // Anti-Anxiety Medications
    { id: 'xanax' },
    { id: 'alprazolam' },
    { id: 'ativan' },
    { id: 'valium' },
    { id: 'clonazepam' },
    { id: 'lorazepam' },
    { id: 'diazepam' },
    { id: 'klonopin' },
    // Sleep Aids
    { id: 'ambien' },
    { id: 'zolpidem' },
    // ADHD Medications
    { id: 'adderall' },
    { id: 'concerta' },
    { id: 'ritalin' },
    // Other Medications
    { id: 'suboxone' },
    { id: 'adipex' },
    { id: 'phentermine' },
    { id: 'soma' },
    { id: 'dilaudid' },
    { id: 'ksalol' },
    { id: 'farmapram' },
    { id: 'codeine' },
    { id: 'restoril' },
    { id: 'modafinil' },
    { id: 'belbein' },
  ]
}
