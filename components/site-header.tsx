"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, ChevronDown, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"

export function SiteHeader() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cart } = useCart()
  const phoneNumber = "+1-999-999-9999"

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/categories",
      label: "Categories",
      active: pathname === "/categories",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
    {
      href: "/about",
      label: "About Us",
      active: pathname === "/about",
    },
  ]

  // Product categories based on your actual products
  const categoryRoutes = [
    // ED Medications
    {
      href: "/categories/sildenafil",
      label: "Sildenafil",
      description: "ED medication (25mg - 200mg)"
    },
    {
      href: "/categories/tadalafil",
      label: "Tadalafil",
      description: "ED medication (20mg - 80mg)"
    },
    {
      href: "/categories/vardenafil",
      label: "Vardenafil",
      description: "ED medication (20mg - 60mg)"
    },
    // Pain Medications
    {
      href: "/categories/hydrocodone",
      label: "Hydrocodone",
      description: "Pain relief medication"
    },
    {
      href: "/categories/oxycodone",
      label: "Oxycodone",
      description: "Pain relief medication"
    },
    {
      href: "/categories/oxycontin",
      label: "Oxycontin",
      description: "Extended-release pain relief"
    },
    {
      href: "/categories/percocet",
      label: "Percocet",
      description: "Combination pain relief"
    },
    {
      href: "/categories/tramadol",
      label: "Tramadol",
      description: "Moderate pain relief"
    },
    // Anti-Anxiety Medications
    {
      href: "/categories/xanax",
      label: "Xanax",
      description: "Anti-anxiety medication"
    },
    {
      href: "/categories/alprazolam",
      label: "Alprazolam",
      description: "Generic Xanax"
    },
    {
      href: "/categories/ativan",
      label: "Ativan",
      description: "Anti-anxiety & sleep aid"
    },
    {
      href: "/categories/valium",
      label: "Valium",
      description: "Anti-anxiety medication"
    },
    // Sleep Aids
    {
      href: "/categories/ambien",
      label: "Ambien",
      description: "Sleep aid medication"
    },
    {
      href: "/categories/zolpidem",
      label: "Zolpidem",
      description: "Generic Ambien"
    },
    // ADHD Medication
    {
      href: "/categories/adderall",
      label: "Adderall",
      description: "ADHD medication"
    }
  ]

  // Support/Info pages that exist
  const supportRoutes = [
    {
      href: "/faq",
      label: "FAQ",
    },
    {
      href: "/returns",
      label: "Returns & Refunds",
    },
    {
      href: "/privacy",
      label: "Privacy Policy",
    },
    {
      href: "/terms",
      label: "Terms & Conditions",
    },
  ]

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Call Us Banner for Mobile */}
      <div className="md:hidden bg-gray-800 text-white text-center py-2 px-4">
        <button 
          onClick={handleCall}
          className="flex items-center justify-center gap-2 w-full text-sm font-medium hover:bg-gray-900 py-1 px-2 rounded transition-colors"
        >
          <Phone className="h-4 w-4" />
          {phoneNumber}
        </button>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled ? "bg-white shadow-sm" : "bg-white"
        }`}
      >
      <div className="container flex h-16 items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-1">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] max-w-[280px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="text-lg font-bold text-gray-900">
                        The Pharma Express
                      </span>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <nav className="p-4 space-y-2">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                          route.active 
                            ? "text-primary bg-primary/10" 
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {route.label}
                      </Link>
                    ))}
                    
                    {/* Product Categories for mobile */}
                    <div className="pt-6">
                      <ScrollArea className="h-[400px] pr-3">
                        <div>
                          {/* ED Medications */}
                          <div className="px-4 pb-2">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              ED Medications
                            </h3>
                          </div>
                          <div className="space-y-1 mb-4">
                            {categoryRoutes.slice(0, 3).map((category) => (
                              <Link
                                key={category.href}
                                href={category.href}
                                className="block py-2 px-4 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <div>
                                  <div className="font-medium">{category.label}</div>
                                  <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          
                          {/* Pain Medications */}
                          <div className="px-4 pb-2">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Pain Medications
                            </h3>
                          </div>
                          <div className="space-y-1 mb-4">
                            {categoryRoutes.slice(3, 8).map((category) => (
                              <Link
                                key={category.href}
                                href={category.href}
                                className="block py-2 px-4 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <div>
                                  <div className="font-medium">{category.label}</div>
                                  <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          
                          {/* Anti-Anxiety Medications */}
                          <div className="px-4 pb-2">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Anti-Anxiety
                            </h3>
                          </div>
                          <div className="space-y-1 mb-4">
                            {categoryRoutes.slice(8, 12).map((category) => (
                              <Link
                                key={category.href}
                                href={category.href}
                                className="block py-2 px-4 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <div>
                                  <div className="font-medium">{category.label}</div>
                                  <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          
                          {/* Sleep & ADHD Medications */}
                          <div className="px-4 pb-2">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Sleep & ADHD
                            </h3>
                          </div>
                          <div className="space-y-1 mb-4">
                            {categoryRoutes.slice(12).map((category) => (
                              <Link
                                key={category.href}
                                href={category.href}
                                className="block py-2 px-4 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <div>
                                  <div className="font-medium">{category.label}</div>
                                  <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </ScrollArea>
                      
                      {/* View All Link */}
                      <div className="mt-4 px-4">
                        <Link 
                          href="/categories"
                          className="block py-3 px-4 text-sm font-medium text-primary hover:bg-gray-50 rounded-lg transition-colors text-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          View All Categories
                        </Link>
                      </div>
                    </div>

                    {/* Support/Info for mobile */}
                    <div className="pt-6">
                      <div className="px-4 pb-3">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Support & Info
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {supportRoutes.map((support) => (
                          <Link
                            key={support.href}
                            href={support.href}
                            className="block py-3 px-4 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {support.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>

                <div className="p-4 border-t border-gray-200">
                  <Button 
                    onClick={handleCall}
                    variant="outline" 
                    className="w-full mb-3 text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {phoneNumber}
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart {cartItemCount > 0 && `(${cartItemCount})`}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">
              The Pharma Express
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 ml-6">
            {routes.map((route) => {
              if (route.label === "Categories") {
                return (
                  <DropdownMenu key={route.href}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="text-sm font-medium transition-colors hover:text-primary h-auto p-0 flex items-center gap-1"
                      >
                        {route.label}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-80 mt-2">
                      <ScrollArea className="h-[400px]">
                        <div className="p-1">
                          {/* ED Medications */}
                          <div className="px-3 pt-2 pb-1">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ED Medications</h3>
                          </div>
                          {categoryRoutes.slice(0, 3).map((category) => (
                            <DropdownMenuItem key={category.href} asChild className="p-0">
                              <Link href={category.href} className="flex flex-col items-start p-3 w-full">
                                <span className="font-medium text-sm">{category.label}</span>
                                <span className="text-xs text-gray-500 mt-1">{category.description}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                          
                          {/* Pain Medications */}
                          <DropdownMenuSeparator />
                          <div className="px-3 pt-2 pb-1">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pain Medications</h3>
                          </div>
                          {categoryRoutes.slice(3, 8).map((category) => (
                            <DropdownMenuItem key={category.href} asChild className="p-0">
                              <Link href={category.href} className="flex flex-col items-start p-3 w-full">
                                <span className="font-medium text-sm">{category.label}</span>
                                <span className="text-xs text-gray-500 mt-1">{category.description}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                          
                          {/* Anti-Anxiety Medications */}
                          <DropdownMenuSeparator />
                          <div className="px-3 pt-2 pb-1">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Anti-Anxiety</h3>
                          </div>
                          {categoryRoutes.slice(8, 12).map((category) => (
                            <DropdownMenuItem key={category.href} asChild className="p-0">
                              <Link href={category.href} className="flex flex-col items-start p-3 w-full">
                                <span className="font-medium text-sm">{category.label}</span>
                                <span className="text-xs text-gray-500 mt-1">{category.description}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                          
                          {/* Sleep & ADHD Medications */}
                          <DropdownMenuSeparator />
                          <div className="px-3 pt-2 pb-1">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sleep & ADHD</h3>
                          </div>
                          {categoryRoutes.slice(12).map((category) => (
                            <DropdownMenuItem key={category.href} asChild className="p-0">
                              <Link href={category.href} className="flex flex-col items-start p-3 w-full">
                                <span className="font-medium text-sm">{category.label}</span>
                                <span className="text-xs text-gray-500 mt-1">{category.description}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </ScrollArea>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="p-0">
                        <Link href="/categories" className="font-medium p-3 w-full">View All Categories</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    route.active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {route.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Call Us button for desktop */}
          <Button 
            onClick={handleCall}
            variant="ghost" 
            className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 h-auto px-3 py-2"
          >
            <Phone className="h-4 w-4" />
            {phoneNumber}
          </Button>

          {/* Support dropdown for desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="hidden md:flex text-sm font-medium transition-colors hover:text-primary h-auto p-0 items-center gap-1"
              >
                Support
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-2">
              {supportRoutes.map((support) => (
                <DropdownMenuItem key={support.href} asChild className="p-0">
                  <Link href={support.href} className="w-full p-3 text-sm">{support.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
    </>
  )
}
