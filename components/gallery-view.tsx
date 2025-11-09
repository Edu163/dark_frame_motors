"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

interface GalleryViewProps {
  category: string
  onBack: () => void
}

const galleryImages = {
  motos: [
    "https://images.unsplash.com/photo-1609630875171-b1321377ee65",
    "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f",
    "https://plus.unsplash.com/premium_photo-1661869085660-3252fcd3e505",
    "https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f",
    "https://images.unsplash.com/photo-1612387843849-bc3fe8cc9183",
    "https://images.unsplash.com/photo-1591531851461-fe7a2e8e7c3e",
    "https://images.unsplash.com/photo-1547054728-fcb8828cc832",
    "https://plus.unsplash.com/premium_photo-1661897325546-5747eef13150",
    "https://images.unsplash.com/photo-1611873189125-324514ebd94e",
  ],
  carros: [
    "street%20car%20photography%20black%20night",
    "classic%20car%20chrome%20detail%20urban",
    "car%20headlight%20night%20street%20photography",
    "muscle%20car%20street%20racing",
    "car%20window%20reflection%20urban",
    "lowrider%20car%20street%20parking",
    "car%20wheel%20rim%20chrome%20detail",
    "sports%20car%20night%20street",
    "vintage%20car%20street%20parking%20lot",
  ],
  pilotos: [
    "motorcycle%20rider%20portrait%20leather%20cool",
    "driver%20sunglasses%20portrait%20street",
    "pilot%20racing%20suit%20portrait%20dark",
    "biker%20gang%20portrait%20urban",
    "female%20rider%20motorcycle%20portrait",
    "male%20driver%20cool%20portrait%20street",
    "helmet%20portrait%20motorcycle%20detail",
    "rider%20profile%20dark%20moody%20portrait",
    "racing%20driver%20suit%20portrait",
  ],
  pistas: [
    "racing%20track%20asphalt%20curves%20speed",
    "road%20racing%20track%20straight%20fast",
    "street%20race%20circuit%20lines%20detail",
    "road%20markings%20perspective%20racing",
    "racing%20track%20finish%20line%20detail",
    "road%20curve%20banking%20racing%20track",
    "street%20circuit%20overhead%20racing",
    "racing%20track%20pit%20lane%20detail",
    "drift%20track%20tire%20marks%20detail",
  ],
  noche: [
    "night%20street%20photography%20dark%20urban%20lights",
    "city%20night%20street%20lights%20vehicles",
    "night%20racing%20street%20lights%20dark",
    "urban%20night%20photography%20neon%20lights",
    "night%20traffic%20street%20photography%20bokeh",
    "street%20night%20shadows%20dark%20moody",
    "night%20car%20lights%20trail%20photography",
    "dark%20street%20photography%20urban%20night",
    "night%20motorcycle%20street%20photography%20lights",
  ],
  dia: [
    "daytime%20street%20photography%20sunlight%20vehicles",
    "sunny%20street%20photography%20cars%20parked",
    "bright%20daylight%20street%20photography%20urban",
    "daytime%20racing%20street%20photography",
    "sunny%20motorcycle%20street%20photography",
    "afternoon%20street%20photography%20shadows",
    "golden%20hour%20street%20photography%20vehicles",
    "daylight%20street%20photography%20urban%20details",
    "bright%20street%20photography%20colorful%20cars",
  ],
}

export default function GalleryView({ category, onBack }: GalleryViewProps) {
  const images = galleryImages[category as keyof typeof galleryImages] || []

  return (
    <section className="min-h-screen pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-12">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold hover:text-accent transition">
            <ArrowLeft size={20} />
            ATRÁS
          </button>
          <h2 className="text-4xl font-black tracking-tighter uppercase">
            {category === "motos" && "Motos"}
            {category === "carros" && "Carros"}
            {category === "pilotos" && "Pilotos"}
            {category === "pistas" && "Pistas"}
            {category === "noche" && "Noche"}
            {category === "dia" && "Día"}
          </h2>
        </div>

        {/* Masonry style using CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {images.map((src, idx) => (
            <MasonryItem key={idx} src={src} alt={`Gallery ${idx}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MasonryItem({ src, alt }: { src: string; alt: string }) {
  const [ratio, setRatio] = useState(1) // height / width

  return (
    <div className="mb-4 break-inside-avoid rounded-lg overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: `${ratio * 100}%` }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 hover:scale-[1.02]"
          onLoadingComplete={(img) => {
            if (img.naturalWidth > 0) {
              setRatio(img.naturalHeight / img.naturalWidth)
            }
          }}
          unoptimized
        />
      </div>
    </div>
  )
}
