import Image from "next/image"

const LandingPageClient = () => {
  return (
    <div>
      {/* Other sections of the landing page */}

      {/* Residential Interior portfolio section */}
      <div className="portfolio-section">
        <h2>Residential Interior</h2>
        <div className="portfolio-images">
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

      {/* Other sections of the landing page */}
    </div>
  )
}

export default LandingPageClient
