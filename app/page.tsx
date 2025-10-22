"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Facebook, CheckCircle, PaintBucket, Home, Building2, Paintbrush, Copy, Check } from "lucide-react"
import { processFormSubmission } from "./actions"
import { useActionState } from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { Badge } from "@/components/ui/badge"

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://hoveypainting.com",
  name: "Hovey Painting",
  description:
    "Family-owned and operated painting services with over 35 years of experience. Specializing in interior, exterior, residential and commercial painting services.",
  url: "https://hoveypainting.com",
  telephone: "+17203510209",
  email: "hoveypainting@yahoo.com",
  foundingDate: "1988",
  founder: {
    "@type": "Person",
    name: "Brad Hovey",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Colorado",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  sameAs: ["https://www.facebook.com/HoveyPainting"],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "4",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Sarah Johnson",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      reviewBody:
        "Brad and his team did an amazing job painting the interior of our home. They were professional, punctual, and the quality of their work exceeded our expectations.",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Michael Roberts",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      reviewBody:
        "We hired Hovey Painting to refresh the exterior of our office building. The team was efficient, minimized disruption to our business, and delivered outstanding results.",
    },
  ],
  areaServed: {
    "@type": "State",
    name: "Colorado",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Painting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Residential Interior Painting",
          description: "Transform your living spaces with our expert interior painting services.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Residential Exterior Painting",
          description: "Enhance your home's curb appeal with our durable exterior painting.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Painting",
          description: "Professional painting solutions for offices, retail spaces, and more.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cabinet Refinishing",
          description: "Give your cabinets a fresh new look without the cost of replacement.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Deck & Fence Staining",
          description: "Protect and beautify your outdoor wooden surfaces.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Color Consultation",
          description: "Expert advice to help you choose the perfect colors for your space.",
        },
      },
    ],
  },
}

export default function LandingPage() {
  const initialState = {
    message: "",
    success: null,
  }

  const [state, formAction] = useActionState(processFormSubmission, initialState)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [mobileEmailCopied, setMobileEmailCopied] = useState(false)
  const [showStickyButton, setShowStickyButton] = useState(false)

  // Form helper selections
  const [selectedRooms, setSelectedRooms] = useState<string>("")
  const [selectedSqFt, setSelectedSqFt] = useState<string>("")
  const [selectedTimeline, setSelectedTimeline] = useState<string>("")
  const [paintPeeling, setPaintPeeling] = useState<string>("")

  // Add a scroll function after the state declarations
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 64 // Height of sticky header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (about 600px)
      setShowStickyButton(window.scrollY > 600)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyEmailToClipboard = (isMobile = false) => {
    navigator.clipboard.writeText("hoveypainting@yahoo.com")
    if (isMobile) {
      setMobileEmailCopied(true)
      setTimeout(() => setMobileEmailCopied(false), 2000)
    } else {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    }
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex flex-col min-h-screen">
        {/* Header/Navigation */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <PaintBucket className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Hovey Painting</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection("about")} className="text-sm font-medium hover:text-primary">
                About
              </button>
              <button onClick={() => scrollToSection("services")} className="text-sm font-medium hover:text-primary">
                Services
              </button>
              <button onClick={() => scrollToSection("portfolio")} className="text-sm font-medium hover:text-primary">
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-sm font-medium hover:text-primary"
              >
                Testimonials
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-sm font-medium hover:text-primary">
                Contact
              </button>
            </nav>
            <Button onClick={() => scrollToSection("quote-form")} className="hidden md:inline-flex">
              Get a Quote
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-50 md:hidden animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background z-50 md:hidden shadow-xl animate-slide-in-right">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link
                    href="#"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <PaintBucket className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">Hovey Painting</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </Button>
                </div>

                {/* Mobile Menu Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => scrollToSection("about")}
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      About
                    </button>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      Services
                    </button>
                    <button
                      onClick={() => scrollToSection("portfolio")}
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      Portfolio
                    </button>
                    <button
                      onClick={() => scrollToSection("testimonials")}
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      Testimonials
                    </button>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      Contact
                    </button>
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-4 border-t">
                  <Button onClick={() => scrollToSection("quote-form")} className="w-full">
                    Get a Quote
                  </Button>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-col gap-3 text-sm">
                      <a href="tel:7203510209" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>(720) 351-0209</span>
                      </a>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="flex-1">hoveypainting@yahoo.com</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyEmailToClipboard(true)}
                          aria-label="Copy email address"
                        >
                          {mobileEmailCopied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted flex items-center justify-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Quality Painting Services for Over 35 Years
                  </h1>
                  <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
                    Family-owned and operated by Brad Hovey, providing professional painting services with a personal
                    touch since 1988.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button onClick={() => scrollToSection("quote-form")} size="lg">
                    Request a Quote
                  </Button>
                  <Button onClick={() => scrollToSection("portfolio")} variant="outline" size="lg">
                    View Our Work
                  </Button>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>
                    Serving Aurora, Denver, Centennial, Parker, Highlands Ranch…{" "}
                    <Dialog>
                      <DialogTrigger className="text-primary hover:underline font-medium">
                        View full service area
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Our Service Area</DialogTitle>
                          <DialogDescription>
                            Hovey Painting proudly serves the greater Denver metro area and surrounding communities
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-3">Denver Metro Area</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                              <p>• Denver</p>
                              <p>• Aurora</p>
                              <p>• Centennial</p>
                              <p>• Lakewood</p>
                              <p>• Arvada</p>
                              <p>• Westminster</p>
                              <p>• Thornton</p>
                              <p>• Broomfield</p>
                              <p>• Commerce City</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-3">South Metro</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                              <p>• Highlands Ranch</p>
                              <p>• Littleton</p>
                              <p>• Englewood</p>
                              <p>• Parker</p>
                              <p>• Castle Rock</p>
                              <p>• Lone Tree</p>
                              <p>• Greenwood Village</p>
                              <p>• Ken Caryl</p>
                              <p>• Roxborough</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-3">Additional Areas</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                              <p>• Golden</p>
                              <p>• Morrison</p>
                              <p>• Evergreen</p>
                              <p>• Conifer</p>
                              <p>• Bailey</p>
                              <p>• Elizabeth</p>
                              <p>• Franktown</p>
                              <p>• Sedalia</p>
                            </div>
                          </div>
                          <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground">
                              Don't see your area listed?{" "}
                              <a href="#contact" className="text-primary hover:underline font-medium">
                                Contact us
                              </a>{" "}
                              to see if we can service your location. We're always expanding our service area!
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Hovey Painting</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    With over 35 years of experience, Hovey Painting has established itself as a trusted name in the
                    painting industry. Owner Brad Hovey personally oversees each project, ensuring the highest quality
                    standards are met.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="mx-auto w-full max-w-[600px]">
                  <BeforeAfterSlider
                    beforeImage="/fire-damage-before.jpg"
                    afterImage="/fire-damage-after.jpg"
                    beforeAlt="Fire damaged carport before restoration"
                    afterAlt="Restored carport after painting and repair"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="text-xl font-bold">Family-Owned Business</h3>
                        <p className="text-muted-foreground">
                          We treat every project with the same care and attention as we would our own home.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="text-xl font-bold">Experienced Professionals</h3>
                        <p className="text-muted-foreground">
                          Our team consists of skilled painters with years of experience in the industry.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="text-xl font-bold">Quality Materials</h3>
                        <p className="text-muted-foreground">
                          We use only premium paints and materials to ensure lasting results.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Badges Strip */}
          <section className="w-full py-8 border-y bg-background">
            <div className="container px-4 md:px-6">
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12 text-sm md:text-base">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>35+ years</span>
                </div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Insured</span>
                </div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Family-owned</span>
                </div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Free estimates</span>
                </div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Lead-safe practices</span>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We offer a comprehensive range of painting services for both residential and commercial properties.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-card">
                  <Home className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Residential Interior</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Transform your living spaces with our expert interior painting services.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-card">
                  <Home className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Residential Exterior</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Enhance your home's curb appeal with our durable exterior painting.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-card">
                  <Building2 className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Commercial Painting</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Professional painting solutions for offices, retail spaces, and more.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-card">
                  <Paintbrush className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Cabinet Refinishing</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Give your cabinets a fresh new look without the cost of replacement.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-card">
                  <Paintbrush className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Deck & Fence Staining</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Protect and beautify your outdoor wooden surfaces.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-card">
                  <Paintbrush className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Color Consultation</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Expert advice to help you choose the perfect colors for your space.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Portfolio</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Browse through our completed projects to see the quality of our work.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <h3 className="text-2xl font-bold">Residential Interior</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <Image
                    src="/cozy-living-room-refresh.png"
                    width={400}
                    height={300}
                    alt="Interior painting project"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <Image
                    src="/cozy-kitchen-repaint.png"
                    width={400}
                    height={300}
                    alt="Interior painting project"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <Image
                    src="/serene-bedroom-retreat.png"
                    width={400}
                    height={300}
                    alt="Interior painting project"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <h3 className="text-2xl font-bold">Residential Exterior</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <Image
                    src="/exterior-house-painting.png"
                    width={400}
                    height={300}
                    alt="Exterior painting project"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <Image
                    src="/exterior-home-painting.jpg"
                    width={400}
                    height={300}
                    alt="Exterior painting project"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <Image
                    src="/exterior-trim-painting.jpg"
                    width={400}
                    height={300}
                    alt="Exterior painting project"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <h3 className="text-2xl font-bold">Commercial Projects</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <Image
                    src="/commercial-office-painting.jpg"
                    width={400}
                    height={300}
                    alt="Commercial painting project"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <Image
                    src="/commercial-retail-painting.jpg"
                    width={400}
                    height={300}
                    alt="Commercial painting project"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <Image
                    src="/commercial-restaurant-painting.jpg"
                    width={400}
                    height={300}
                    alt="Commercial painting project"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <h3 className="text-2xl font-bold">Restoration Projects</h3>
                <div className="mx-auto max-w-4xl">
                  <BeforeAfterSlider
                    beforeImage="/fire-damage-before.jpg"
                    afterImage="/fire-damage-after.jpg"
                    beforeAlt="Fire damaged carport before restoration"
                    afterAlt="Fully restored carport with fresh paint"
                  />
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Fire Damage Restoration: Complete carport restoration with professional painting
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Don't just take our word for it. Here's what our satisfied customers have to say.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                  <div>
                    <div className="flex gap-1 text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 italic">
                      "Brad and his team did an amazing job painting the interior of our home. They were professional,
                      punctual, and the quality of their work exceeded our expectations. We'll definitely be using Hovey
                      Painting for all our future painting needs!"
                    </p>
                  </div>
                  <p className="font-semibold">- Sarah Johnson, Homeowner</p>
                </div>
                <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                  <div>
                    <div className="flex gap-1 text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 italic">
                      "We hired Hovey Painting to refresh the exterior of our office building. The team was efficient,
                      minimized disruption to our business, and delivered outstanding results. The building looks brand
                      new!"
                    </p>
                  </div>
                  <p className="font-semibold">- Michael Roberts, Business Owner</p>
                </div>
                <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                  <div>
                    <div className="flex gap-1 text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 italic">
                      "Brad's attention to detail is unmatched. He took the time to understand exactly what we wanted
                      and delivered flawless results. Our kitchen cabinets look absolutely stunning after refinishing!"
                    </p>
                  </div>
                  <p className="font-semibold">- Jennifer and David Miller</p>
                </div>
                <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                  <div>
                    <div className="flex gap-1 text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 italic">
                      "We've used Hovey Painting for multiple projects over the years, and they never disappoint. Brad's
                      expertise and guidance on color selection has transformed our home. Highly recommend!"
                    </p>
                  </div>
                  <p className="font-semibold">- Thomas Wilson, Repeat Customer</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Ready to transform your space? Get in touch with us for a free consultation and quote.
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mx-auto max-w-3xl mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <details className="group rounded-lg border bg-card p-4 shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold">
                      How long does an interior painting project take?
                      <span className="transition group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-muted-foreground">
                      Most interior painting projects take 2-5 days depending on the size of the space and number of
                      rooms. We'll provide a detailed timeline during your free consultation and work efficiently to
                      minimize disruption to your daily routine.
                    </p>
                  </details>

                  <details className="group rounded-lg border bg-card p-4 shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold">
                      Do you help with color selection?
                      <span className="transition group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-muted-foreground">
                      We offer complimentary color consultation services. With over 35 years of experience, Brad can
                      help you choose colors that complement your space, lighting, and personal style. We'll bring
                      samples and provide expert recommendations.
                    </p>
                  </details>

                  <details className="group rounded-lg border bg-card p-4 shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold">
                      What brand of paint do you use?
                      <span className="transition group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-muted-foreground">
                      We use premium-quality paints from trusted brands like Sherwin-Williams and Benjamin Moore. These
                      professional-grade paints provide superior coverage, durability, and a beautiful finish that lasts
                      for years. We can accommodate specific brand preferences upon request.
                    </p>
                  </details>

                  <details className="group rounded-lg border bg-card p-4 shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold">
                      Do you move furniture?
                      <span className="transition group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-muted-foreground">
                      Yes, we'll carefully move and cover furniture as needed to protect your belongings. Small to
                      medium-sized furniture will be moved to the center of the room and covered with protective drop
                      cloths. We recommend removing valuable or delicate items beforehand for extra safety.
                    </p>
                  </details>

                  <details className="group rounded-lg border bg-card p-4 shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold">
                      Do you offer a warranty on your work?
                      <span className="transition group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-muted-foreground">
                      Yes! We stand behind our work with a satisfaction guarantee. If you notice any issues with our
                      workmanship within the first year, we'll return to address them at no additional cost. Your
                      complete satisfaction is our top priority.
                    </p>
                  </details>
                </div>
              </div>

              <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                    <div className="grid gap-4">
                      <a href="tel:7203510209" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>(720) 351-0209</span>
                      </a>
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="flex-1">hoveypainting@yahoo.com</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => copyEmailToClipboard()}
                          aria-label="Copy email address"
                        >
                          {emailCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>9:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Follow Us</h3>
                    <div className="flex gap-4">
                      <Link
                        href="https://www.facebook.com/HoveyPainting"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        <Facebook className="h-6 w-6" />
                        <span className="sr-only">Facebook</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div id="quote-form" className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Request a Quote</h3>
                  <form action={formAction} className="grid gap-4">
                    {state?.message && (
                      <div
                        className={`p-4 rounded-md ${state.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                      >
                        {state.message}
                      </div>
                    )}

                    {/* Quick Helper Chips */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-4 border border-dashed">
                      <p className="text-sm font-medium text-muted-foreground">
                        Quick info (optional but helpful for accurate quotes)
                      </p>

                      {/* Number of Rooms */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Number of Rooms</label>
                        <div className="flex flex-wrap gap-2">
                          {["1-2 rooms", "3-4 rooms", "5+ rooms", "Whole house"].map((option) => (
                            <Badge
                              key={option}
                              variant={selectedRooms === option ? "default" : "outline"}
                              className="cursor-pointer hover:bg-primary/90 transition-colors"
                              onClick={() => setSelectedRooms(option === selectedRooms ? "" : option)}
                            >
                              {option}
                            </Badge>
                          ))}
                        </div>
                        <input type="hidden" name="rooms" value={selectedRooms} />
                      </div>

                      {/* Square Footage */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Approximate Square Footage</label>
                        <div className="flex flex-wrap gap-2">
                          {["Under 1,000 sq ft", "1,000-2,000 sq ft", "2,000-3,000 sq ft", "3,000+ sq ft"].map(
                            (option) => (
                              <Badge
                                key={option}
                                variant={selectedSqFt === option ? "default" : "outline"}
                                className="cursor-pointer hover:bg-primary/90 transition-colors"
                                onClick={() => setSelectedSqFt(option === selectedSqFt ? "" : option)}
                              >
                                {option}
                              </Badge>
                            ),
                          )}
                        </div>
                        <input type="hidden" name="sqft" value={selectedSqFt} />
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Desired Timeline</label>
                        <div className="flex flex-wrap gap-2">
                          {["ASAP", "Within 2 weeks", "Within 1 month", "Flexible"].map((option) => (
                            <Badge
                              key={option}
                              variant={selectedTimeline === option ? "default" : "outline"}
                              className="cursor-pointer hover:bg-primary/90 transition-colors"
                              onClick={() => setSelectedTimeline(option === selectedTimeline ? "" : option)}
                            >
                              {option}
                            </Badge>
                          ))}
                        </div>
                        <input type="hidden" name="timeline" value={selectedTimeline} />
                      </div>

                      {/* Paint Condition */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Is old paint peeling or damaged?</label>
                        <div className="flex flex-wrap gap-2">
                          {["Yes", "No", "Not sure"].map((option) => (
                            <Badge
                              key={option}
                              variant={paintPeeling === option ? "default" : "outline"}
                              className="cursor-pointer hover:bg-primary/90 transition-colors"
                              onClick={() => setPaintPeeling(option === paintPeeling ? "" : option)}
                            >
                              {option}
                            </Badge>
                          ))}
                        </div>
                        <input type="hidden" name="paintPeeling" value={paintPeeling} />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name *
                      </label>
                      <Input id="name" name="name" placeholder="Enter your name" required />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email *
                      </label>
                      <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Phone *
                      </label>
                      <Input id="phone" name="phone" placeholder="Enter your phone number" required />
                    </div>
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="okToText"
                        name="okToText"
                        className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                      <label htmlFor="okToText" className="text-sm leading-tight cursor-pointer select-none">
                        OK to text me a scheduling link
                      </label>
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="service"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Service Needed *
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="interior">Interior Painting</option>
                        <option value="exterior">Exterior Painting</option>
                        <option value="commercial">Commercial Painting</option>
                        <option value="cabinet">Cabinet Refinishing</option>
                        <option value="deck">Deck & Fence Staining</option>
                        <option value="consultation">Color Consultation</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Project Details *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please describe your project"
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Submit Request
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full border-t bg-background py-6">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
            <Link href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <PaintBucket className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Hovey Painting</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Hovey Painting. All rights reserved. Family-owned and operated for over
              35 years.
            </p>
            <div className="flex gap-4">
              <Link href="/areas-we-serve" className="text-sm hover:underline underline-offset-4">
                Areas We Serve
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>

        {/* Sticky mobile CTA button */}
        {showStickyButton && (
          <div className="fixed bottom-6 right-6 z-50 md:hidden">
            <Button
              size="lg"
              className="rounded-full shadow-2xl h-14 px-6 animate-fade-in"
              onClick={() => scrollToSection("quote-form")}
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>Get Quote</span>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
