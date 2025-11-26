"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  cta: string
  ctaLink: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/slider-medical-1.jpg",
    title: "Regain Your Confidence",
    subtitle: "Professional ED medications prescribed by licensed doctors. Discreet, effective, and FDA-approved treatments.",
    cta: "Consult Now",
    ctaLink: "#featured-products",
  },
  {
    id: 2,
    image: "/images/slider-confidence.jpg",
    title: "Trusted Medical Solutions",
    subtitle: "Quality Sildenafil, Tadalafil, and Levitra tablets delivered safely to your door with complete privacy.",
    cta: "Shop Treatments",
    ctaLink: "#featured-products",
  },
  {
    id: 3,
    image: "/images/slider-medical-3.jpg",
    title: "Professional Healthcare",
    subtitle: "Expert consultation and genuine medications. Take control of your intimate health with confidence.",
    cta: "Browse Products",
    ctaLink: "#featured-products",
  },
  {
    id: 4,
    image: "/images/slider-pharmacy.jpg",
    title: "Licensed Pharmacy",
    subtitle: "Certified medications from a trusted pharmacy. Fast, secure delivery with 24/7 customer support.",
    cta: "Order Now",
    ctaLink: "#featured-products",
  },
]


export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback(
    (index: number) => {
      if (!isAnimating) {
        setIsAnimating(true)
        setCurrentSlide(index)
        setTimeout(() => {
          setIsAnimating(false)
        }, 500) // Match this with the CSS transition duration
      }
    },
    [isAnimating],
  )

  const nextSlide = useCallback(() => {
    const newIndex = (currentSlide + 1) % slides.length
    goToSlide(newIndex)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length
    goToSlide(newIndex)
  }, [currentSlide, goToSlide])

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent z-10" />
            <Image
              src={slide.image || "/images/slider-fallback.jpg"}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container px-4 md:px-6 mx-auto">
                <div className="max-w-xl space-y-3 md:space-y-5 animate-fade-in-up">
                  <h2 className="text-sm md:text-base font-medium text-primary-foreground bg-primary inline-block px-3 py-1 rounded-full">
                    Licensed Medical
                  </h2>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">{slide.title}</h1>
                  <p className="text-base md:text-xl text-gray-200 max-w-md">{slide.subtitle}</p>
                  <div className="pt-2 md:pt-4">
                    <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                      <a href={slide.ctaLink}>{slide.cta}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none",
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
