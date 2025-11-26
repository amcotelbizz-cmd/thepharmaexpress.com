import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: "clothing",
    name: "Clothing",
    image: "/placeholder.svg?height=400&width=400&text=Clothing",
    count: 42,
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/placeholder.svg?height=400&width=400&text=Electronics",
    count: 38,
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/placeholder.svg?height=400&width=400&text=Accessories",
    count: 24,
  },
  {
    id: "home",
    name: "Home & Living",
    image: "/placeholder.svg?height=400&width=400&text=Home",
    count: 36,
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-1"
        >
          <div className="relative aspect-square w-full">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white">
              <h3 className="text-lg md:text-xl font-bold group-hover:translate-x-2 transition-transform duration-300">
                {category.name}
              </h3>
              <p className="text-xs md:text-sm opacity-90 mt-1">{category.count} products</p>
              <span className="mt-2 inline-block text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop Now →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
