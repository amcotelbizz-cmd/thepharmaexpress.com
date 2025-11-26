"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

export function FloatingPhone() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const phoneNumber = "+1-999-999-9999"
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  return (
    <div className="fixed bottom-8 left-8 z-[9999]">
      {/* Pulse animation ring */}
      <div className="absolute inset-0 h-16 w-16 bg-green-500 rounded-full animate-ping opacity-40"></div>
      <Button
        onClick={handleCall}
        className="relative h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-green-500 hover:bg-green-600 text-white border-4 border-white hover:scale-110 flex items-center justify-center p-0"
        aria-label={`Call us at ${phoneNumber}`}
      >
        <Phone className="h-8 w-8 text-white fill-current" />
      </Button>
    </div>
  )
}
