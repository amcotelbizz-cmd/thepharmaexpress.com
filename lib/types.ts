export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images: string[]
  variations: string[]
  category?: string
  featured?: boolean
  inStock?: boolean
  rating?: number
}
