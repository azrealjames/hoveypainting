"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Facebook, CheckCircle, PaintBucket, Home, Building2, Paintbrush, Copy, Check } from "lucide-react"
import { processFormSubmission } from "./actions"
import { useActionState } from "react"
import { useState } from "react"

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
              <Link href="#about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link href="#services" className="text-sm font-medium hover:text-primary">
                Services
              </Link>
              <Link href="#portfolio" className="text-sm font-medium hover:text-primary">
                Portfolio
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
                Testimonials
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </nav>
            <Button asChild className="hidden md:inline-flex">
              <Link href="#contact">Get a Quote</Link>
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
                    <Link
                      href="#about"
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="#services"
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Services
                    </Link>
                    <Link
                      href="#portfolio"
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Portfolio
                    </Link>
                    <Link
                      href="#testimonials"
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Testimonials
                    </Link>
                    <Link
                      href="#contact"
                      className="text-lg font-medium hover:text-primary py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-4 border-t">
                  <Button asChild className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="#contact">Get a Quote</Link>
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
                  <Button asChild size="lg">
                    <Link href="#contact">Request a Quote</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#portfolio">View Our Work</Link>
                  </Button>
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
                <div className="mx-auto grid aspect-square w-full max-w-[400px] grid-cols-2 gap-2 overflow-hidden rounded-xl">
                  <Image
                    src="/blank-canvas-prep.png"
                    width={200}
                    height={200}
                    alt="Before painting"
                    className="h-full w-full object-cover"
                    loading="eager"
                    priority
                  />
                  <Image
                    src="/colorful-studio-mess.png"
                    width={200}
                    height={200}
                    alt="After painting"
                    className="h-full w-full object-cover"
                    loading="eager"
                    priority
                  />
                  <div className="flex items-center justify-center bg-muted/50 text-sm font-medium">Before</div>
                  <div className="flex items-center justify-center bg-primary/10 text-sm font-medium text-primary">
                    After
                  </div>
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
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <Home className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Residential Interior</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Transform your living spaces with our expert interior painting services.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <Home className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Residential Exterior</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Enhance your home's curb appeal with our durable exterior painting.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <Building2 className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Commercial Painting</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Professional painting solutions for offices, retail spaces, and more.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <Paintbrush className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Cabinet Refinishing</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Give your cabinets a fresh new look without the cost of replacement.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <Paintbrush className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Deck & Fence Staining</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Protect and beautify your outdoor wooden surfaces.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
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
                <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
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
                <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
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
                <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
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
                <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
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
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Request a Quote</h3>
                  <form action={formAction} className="grid gap-4">
                    {state?.message && (
                      <div
                        className={`p-4 rounded-md ${state.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                      >
                        {state.message}
                      </div>
                    )}
                    <div className="grid gap-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      <Input id="name" name="name" placeholder="Enter your name" required />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Phone
                      </label>
                      <Input id="phone" name="phone" placeholder="Enter your phone number" required />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="service"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Service Needed
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
                        Project Details
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
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
