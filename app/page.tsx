import LandingPageClient from "./landing-page-client"

export const metadata = {
  title: "Hovey Painting | Interior & Exterior Painters in Denver Metro",
  description: "Family-owned since 1988. Interior, exterior, residential, and commercial painting. Free estimates.",
  openGraph: {
    url: "https://www.hoveypainting.com",
    title: "Hovey Painting",
    description: "Trusted Denver-area painters since 1988.",
    images: [{ url: "/exterior-home-painting.jpg", width: 1200, height: 630, alt: "Exterior repaint" }],
  },
  alternates: { canonical: "https://www.hoveypainting.com" },
}

export default function LandingPage() {
  return <LandingPageClient />
}
