"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Facebook, CheckCircle, Home, Building2, Paintbrush, Copy, Check } from "lucide-react"
import { processFormSubmission } from "./actions"
import { useActionState } from "react"
import { useState, useEffect } from "react"
import { BeforeAfterSlider } from "@/components/before-after-slider"

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HousePainter",
  "@id": "https://hoveypainting.com",
  name: "Hovey Painting",
  description:
    "Family-owned and operated painting services with over 35 years of experience. Specializing in interior, exterior, residential and commercial painting services.",
  url: "https://hoveypainting.com",
  telephone: "+17203510209",
  email: "hoveypainting@yahoo.com",
  foundingDate: "1990",
  founder: {
    "@type": "Person",
    name: "Brad Hovey",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Colorado",
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
  priceRange: "$$",
  sameAs: ["https://www.hoveypainting.com", "https://www.facebook.com/HoveyPainting"],
  areaServed: ["Aurora, CO", "Denver, CO", "Centennial, CO", "Parker, CO", "Highlands Ranch, CO"],
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

export default function LandingPageClient() {
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

  useEffect(() => {
    const updateFavicon = (section: string) => {
      const faviconMap: Record<string, string> = {
        about: "/favicon-about.jpg",
        services: "/favicon-services.jpg",
        portfolio: "/favicon-portfolio.jpg",
        testimonials: "/favicon-testimonials.jpg",
        contact: "/favicon-contact.jpg",
        "quote-form": "/favicon-quote.jpg",
      }

      const faviconPath = faviconMap[section] || "/favicon.svg"

      // Update or create favicon link element
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
      if (!link) {
        link = document.createElement("link")
        link.rel = "icon"
        document.head.appendChild(link)
      }
      link.href = faviconPath
    }

    // Set up Intersection Observer for sections
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          if (sectionId) {
            updateFavicon(sectionId)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all main sections
    const sections = ["about", "services", "portfolio", "testimonials", "contact", "quote-form"]
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    // Set initial favicon
    updateFavicon("")

    return () => {
      observer.disconnect()
    }
  }, [])

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
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity mx-2.5">
              <Image
                src="/hovey-logo-primary.png"
                alt="Hovey Painting"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            <nav aria-label="Primary" className="hidden md:flex gap-6">
              {["about", "services", "portfolio", "testimonials", "contact"].map((id) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(id)
                  }}
                  className="text-sm font-medium hover:text-primary"
                >
                  {id[0].toUpperCase() + id.slice(1)}
                </Link>
              ))}
            </nav>

            <Button onClick={() => scrollToSection("quote-form")} className="hidden md:inline-flex my-0 mx-[10px]">
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
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src="/hovey-logo-primary.png"
                      alt="Hovey Painting"
                      width={200}
                      height={60}
                      className="h-12 w-auto"
                    />
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
          <section className="w-full py-24 md:py-32 lg:py-40 xl:py-48 bg-cream flex items-center justify-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                  <Image
                    src="/hovey-icon.png"
                    alt="Hovey Painting Icon"
                    width={240}
                    height={240}
                    className="h-40 md:h-48 w-auto"
                    priority
                  />
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-tight">
                    HOVEY
                    <br />
                    PAINTING
                  </h1>
                </div>

                {/* Tagline */}
                <p className="text-charcoal font-medium text-base md:text-lg lg:text-xl tracking-widest uppercase">
                  FAMILY-OWNED • EXPERTLY FINISHED SINCE 1989
                </p>
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
                    src="/interior-grey-room-arched-door.jpg"
                    width={400}
                    height={300}
                    alt="Interior painting - grey walls with arched doorway and white trim"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <Image
                    src="/interior-grey-dining-room.jpg"
                    width={400}
                    height={300}
                    alt="Interior painting - grey dining room with elegant chandelier"
                    className="aspect-video rounded-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <Image
                    src="/interior-grey-room-alcove.jpg"
                    width={400}
                    height={300}
                    alt="Interior painting - grey room with arched alcove feature"
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
                      "Hovey Painting's exterior painting service transformed our house's appearance. The team was
                      thorough and the results were stunning."
                    </p>
                  </div>
                  <p className="font-semibold">- John Smith, Homeowner</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-cream">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We'd love to hear from you! Please feel free to reach out for any inquiries or to schedule a quote.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 md:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="flex-1">(720) 351-0209</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="flex-1">hoveypainting@yahoo.com</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyEmailToClipboard()}
                      aria-label="Copy email address"
                    >
                      {emailCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-primary flex-shrink-0" />
                    <a
                      href="https://www.facebook.com/HoveyPainting"
                      className="flex-1 hover:text-primary transition-colors"
                    >
                      Follow us on Facebook
                    </a>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <form action={formAction}>
                    <div className="space-y-4">
                      <Input type="text" name="name" placeholder="Your Name" required />
                      <Input type="email" name="email" placeholder="Your Email" required />
                      <Textarea name="message" placeholder="Your Message" required />
                    </div>
                    <Button type="submit" className="mt-6">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Quote Form Section */}
          <section id="quote-form" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get a Quote</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Fill out the form below to get a free estimate for your painting project.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 md:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="flex-1">(720) 351-0209</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="flex-1">hoveypainting@yahoo.com</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyEmailToClipboard()}
                      aria-label="Copy email address"
                    >
                      {emailCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-primary flex-shrink-0" />
                    <a
                      href="https://www.facebook.com/HoveyPainting"
                      className="flex-1 hover:text-primary transition-colors"
                    >
                      Follow us on Facebook
                    </a>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <form action={formAction}>
                    <div className="space-y-4">
                      <Input type="text" name="name" placeholder="Your Name" required />
                      <Input type="email" name="email" placeholder="Your Email" required />
                      <Input type="text" name="phone" placeholder="Your Phone Number" required />
                      <Textarea name="message" placeholder="Your Message" required />
                    </div>
                    <Button type="submit" className="mt-6">
                      Get Quote
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Sticky Button */}
        {showStickyButton && (
          <Button onClick={() => scrollToSection("quote-form")} className="fixed bottom-4 right-4 z-50">
            Get a Quote
          </Button>
        )}
      </div>
    </>
  )
}
