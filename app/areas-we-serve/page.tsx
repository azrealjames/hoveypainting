import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Areas We Serve - Professional Painting Services in Denver Metro",
  description:
    "Hovey Painting serves Denver, Aurora, Centennial, Parker, Highlands Ranch, Littleton, and surrounding Colorado communities. Find out if we service your area.",
  keywords: [
    "painting services Denver",
    "painting services Aurora",
    "painting services Centennial",
    "painting services Parker",
    "painting services Highlands Ranch",
    "painting services Littleton",
    "painter near me",
    "house painter Denver",
    "commercial painter Colorado",
  ],
  openGraph: {
    title: "Areas We Serve - Hovey Painting",
    description:
      "Professional painting services throughout the Denver metro area and surrounding Colorado communities.",
    url: "https://hoveypainting.com/areas-we-serve",
  },
}

// JSON-LD for Service Area
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Hovey Painting",
  description: "Professional painting services throughout the Denver metro area",
  telephone: "+17203510209",
  email: "hoveypainting@yahoo.com",
  areaServed: [
    {
      "@type": "City",
      name: "Denver",
      addressRegion: "CO",
      addressCountry: "US",
    },
    {
      "@type": "City",
      name: "Aurora",
      addressRegion: "CO",
      addressCountry: "US",
    },
    {
      "@type": "City",
      name: "Centennial",
      addressRegion: "CO",
      addressCountry: "US",
    },
    {
      "@type": "City",
      name: "Parker",
      addressRegion: "CO",
      addressCountry: "US",
    },
    {
      "@type": "City",
      name: "Highlands Ranch",
      addressRegion: "CO",
      addressCountry: "US",
    },
    {
      "@type": "City",
      name: "Littleton",
      addressRegion: "CO",
      addressCountry: "US",
    },
  ],
}

const serviceAreas = [
  {
    region: "Denver Metro Area",
    cities: [
      {
        name: "Denver",
        zip: "80014, 80202, 80203, 80204, 80205, 80206, 80207, 80209, 80210, 80211, 80212, 80218, 80219, 80220, 80221, 80222, 80223, 80224, 80226, 80227, 80230, 80231, 80232, 80235, 80236, 80237, 80238, 80239, 80246, 80247, 80249, 80264",
      },
      {
        name: "Aurora",
        zip: "80010, 80011, 80012, 80013, 80014, 80015, 80016, 80017, 80018, 80019, 80040, 80041, 80042, 80044, 80045, 80046, 80047",
      },
      { name: "Centennial", zip: "80015, 80016, 80112, 80121, 80122" },
      { name: "Lakewood", zip: "80123, 80214, 80215, 80226, 80227, 80228, 80232, 80235" },
      { name: "Arvada", zip: "80001, 80002, 80003, 80004, 80005, 80007" },
      { name: "Westminster", zip: "80003, 80020, 80021, 80030, 80031, 80234" },
      { name: "Thornton", zip: "80023, 80229, 80233, 80241, 80260" },
      { name: "Broomfield", zip: "80020, 80021, 80023, 80038" },
      { name: "Commerce City", zip: "80022, 80037, 80640" },
    ],
  },
  {
    region: "South Metro",
    cities: [
      { name: "Highlands Ranch", zip: "80126, 80129, 80130" },
      {
        name: "Littleton",
        zip: "80120, 80121, 80122, 80123, 80125, 80126, 80127, 80128, 80129, 80160, 80161, 80162, 80163, 80165, 80166",
      },
      { name: "Englewood", zip: "80110, 80111, 80112, 80113, 80150, 80151, 80155" },
      { name: "Parker", zip: "80134, 80138" },
      { name: "Castle Rock", zip: "80104, 80108, 80109" },
      { name: "Lone Tree", zip: "80124" },
      { name: "Greenwood Village", zip: "80111, 80121" },
      { name: "Ken Caryl", zip: "80127" },
      { name: "Roxborough", zip: "80125" },
    ],
  },
  {
    region: "Mountain Communities",
    cities: [
      { name: "Golden", zip: "80401, 80402, 80403, 80419, 80439" },
      { name: "Morrison", zip: "80465" },
      { name: "Evergreen", zip: "80439" },
      { name: "Conifer", zip: "80433" },
      { name: "Bailey", zip: "80421" },
    ],
  },
  {
    region: "East Metro",
    cities: [
      { name: "Elizabeth", zip: "80107" },
      { name: "Franktown", zip: "80116" },
      { name: "Sedalia", zip: "80135" },
    ],
  },
]

export default function AreasWeServePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/hovey-logo-primary.png"
                alt="Hovey Painting"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/#about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link href="/#services" className="text-sm font-medium hover:text-primary">
                Services
              </Link>
              <Link href="/#portfolio" className="text-sm font-medium hover:text-primary">
                Portfolio
              </Link>
              <Link href="/#testimonials" className="text-sm font-medium hover:text-primary">
                Testimonials
              </Link>
              <Link href="/#contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </nav>
            <Button asChild className="hidden md:inline-flex">
              <Link href="/#quote-form">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" className="md:hidden bg-transparent">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <MapPin className="h-16 w-16 text-primary" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Areas We Serve</h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl">
                  Proudly serving the Denver metro area and surrounding Colorado communities with professional painting
                  services for over 35 years.
                </p>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="space-y-12">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">{area.region}</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {area.cities.map((city, cityIndex) => (
                        <div key={cityIndex} className="rounded-lg border bg-card p-6 shadow-sm">
                          <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">ZIP Codes:</span> {city.zip}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Service Area Info */}
              <div className="mt-16 rounded-lg border bg-muted p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Don't See Your Area?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're always expanding our service area! If you don't see your city or ZIP code listed, please contact
                  us. We may still be able to serve your location.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <a href="tel:7203510209">
                      <Phone className="mr-2 h-5 w-5" />
                      Call (720) 351-0209
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/#quote-form">
                      <Mail className="mr-2 h-5 w-5" />
                      Request a Quote
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Services Offered */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-8">Services Available in All Areas</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border p-6">
                    <h3 className="font-semibold text-lg mb-2">Residential Interior Painting</h3>
                    <p className="text-sm text-muted-foreground">
                      Transform your home's interior with professional painting services.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h3 className="font-semibold text-lg mb-2">Residential Exterior Painting</h3>
                    <p className="text-sm text-muted-foreground">
                      Enhance your home's curb appeal with durable exterior painting.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h3 className="font-semibold text-lg mb-2">Commercial Painting</h3>
                    <p className="text-sm text-muted-foreground">
                      Professional painting for offices, retail spaces, and commercial properties.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h3 className="font-semibold text-lg mb-2">Cabinet Refinishing</h3>
                    <p className="text-sm text-muted-foreground">
                      Give your cabinets a fresh new look without replacement.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h3 className="font-semibold text-lg mb-2">Deck & Fence Staining</h3>
                    <p className="text-sm text-muted-foreground">Protect and beautify your outdoor wooden surfaces.</p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h3 className="font-semibold text-lg mb-2">Color Consultation</h3>
                    <p className="text-sm text-muted-foreground">
                      Expert advice to help you choose the perfect colors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="mt-16 bg-primary/5 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Hovey Painting?</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">35+ Years of Experience</h3>
                      <p className="text-sm text-muted-foreground">
                        Family-owned and operated since 1988, bringing decades of expertise to every project.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Licensed & Insured</h3>
                      <p className="text-sm text-muted-foreground">
                        Fully licensed and insured for your peace of mind and protection.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Quality Materials</h3>
                      <p className="text-sm text-muted-foreground">
                        We use only premium paints from Sherwin-Williams and Benjamin Moore.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Free Estimates</h3>
                      <p className="text-sm text-muted-foreground">
                        Get a free, no-obligation quote for your painting project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full border-t bg-background py-6">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/hovey-logo-primary.png"
                alt="Hovey Painting"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Hovey Painting. All rights reserved. Family-owned and operated for over
              35 years.
            </p>
            <div className="flex gap-4">
              <Link href="/areas-we-serve" className="text-sm hover:underline underline-offset-4">
                Areas We Serve
              </Link>
              <Link href="/#contact" className="text-sm hover:underline underline-offset-4">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
