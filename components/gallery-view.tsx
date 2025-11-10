"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

interface GalleryViewProps {
  category: string
  onBack: () => void
}

type GalleryItem = string | { src: string; ratio?: number; tags?: string[] }

const galleryImages: Record<string, GalleryItem[]> = {
  motos: [
    { src: "https://images.unsplash.com/photo-1609630875171-b1321377ee65", ratio: 0.667, tags: ["dia"] },
    { src: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f", ratio: 0.667, tags: ["noche"] },
    { src: "https://plus.unsplash.com/premium_photo-1661869085660-3252fcd3e505", ratio: 0.667, tags: ["dia"] },
    { src: "https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f", ratio: 0.667, tags: ["noche"] },
    { src: "https://images.unsplash.com/photo-1612387843849-bc3fe8cc9183", ratio: 0.667, tags: ["dia"] },
    { src: "https://images.unsplash.com/photo-1591531851461-fe7a2e8e7c3e", ratio: 0.667, tags: ["lluvia"] },
    { src: "https://images.unsplash.com/photo-1547054728-fcb8828cc832", ratio: 0.667, tags: ["noche"] },
    { src: "https://plus.unsplash.com/premium_photo-1661897325546-5747eef13150", ratio: 0.667, tags: ["dia"] },
    { src: "https://images.unsplash.com/photo-1611873189125-324514ebd94e", ratio: 0.667, tags: ["lluvia"] },
  ],
  carros: [
    { src: "https://source.unsplash.com/featured/?street%20car%20photography%20black%20night", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?classic%20car%20chrome%20detail%20urban", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?car%20headlight%20night%20street%20photography", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?muscle%20car%20street%20racing", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?car%20window%20reflection%20urban", tags: ["lluvia"] },
    { src: "https://source.unsplash.com/featured/?lowrider%20car%20street%20parking", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?car%20wheel%20rim%20chrome%20detail", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?sports%20car%20night%20street", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?vintage%20car%20street%20parking%20lot", tags: ["lluvia"] },
  ],
  pilotos: [
    { src: "https://source.unsplash.com/featured/?motorcycle%20rider%20portrait%20leather%20cool", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?driver%20sunglasses%20portrait%20street", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?pilot%20racing%20suit%20portrait%20dark", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?biker%20gang%20portrait%20urban", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?female%20rider%20motorcycle%20portrait", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?male%20driver%20cool%20portrait%20street", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?helmet%20portrait%20motorcycle%20detail", tags: ["lluvia"] },
    { src: "https://source.unsplash.com/featured/?rider%20profile%20dark%20moody%20portrait", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?racing%20driver%20suit%20portrait", tags: ["dia"] },
  ],
  pistas: [
    { src: "https://source.unsplash.com/featured/?racing%20track%20asphalt%20curves%20speed", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?road%20racing%20track%20straight%20fast", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?street%20race%20circuit%20lines%20detail", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?road%20markings%20perspective%20racing", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?racing%20track%20finish%20line%20detail", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?road%20curve%20banking%20racing%20track", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?street%20circuit%20overhead%20racing", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?racing%20track%20pit%20lane%20detail", tags: ["lluvia"] },
    { src: "https://source.unsplash.com/featured/?drift%20track%20tire%20marks%20detail", tags: ["lluvia"] },
  ],
  noche: [
    { src: "https://source.unsplash.com/featured/?night%20street%20photography%20dark%20urban%20lights", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?city%20night%20street%20lights%20vehicles", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?night%20racing%20street%20lights%20dark", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?urban%20night%20photography%20neon%20lights", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?night%20traffic%20street%20photography%20bokeh", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?street%20night%20shadows%20dark%20moody", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?night%20car%20lights%20trail%20photography", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?dark%20street%20photography%20urban%20night", tags: ["noche"] },
    { src: "https://source.unsplash.com/featured/?night%20motorcycle%20street%20photography%20lights", tags: ["noche"] },
  ],
  dia: [
    { src: "https://source.unsplash.com/featured/?daytime%20street%20photography%20sunlight%20vehicles", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?sunny%20street%20photography%20cars%20parked", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?bright%20daylight%20street%20photography%20urban", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?daytime%20racing%20street%20photography", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?sunny%20motorcycle%20street%20photography", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?afternoon%20street%20photography%20shadows", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?golden%20hour%20street%20photography%20vehicles", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?daylight%20street%20photography%20urban%20details", tags: ["dia"] },
    { src: "https://source.unsplash.com/featured/?bright%20street%20photography%20colorful%20cars", tags: ["dia"] },
  ],
}

export default function GalleryView({ category, onBack }: GalleryViewProps) {
  const [filter, setFilter] = useState<string | null>(null)
  
  const raw = galleryImages[category as keyof typeof galleryImages] || []
  const allImages = raw.map((it) => (typeof it === 'string' ? { src: `https://source.unsplash.com/featured/?${it}`, tags: [] } : it))
  
  // Filter images based on selected filter
  const images = filter ? allImages.filter(img => img.tags?.includes(filter)) : allImages

  return (
    <section className="min-h-screen pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
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

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter(null)}
              className={`px-6 py-2 text-sm font-black tracking-widest transition-all duration-300 ${
                filter === null
                  ? "bg-gradient-to-r from-[#C62828] to-[#EB7A3F] text-white"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent"
              }`}
            >
              TODAS
            </button>
            <button
              onClick={() => setFilter("dia")}
              className={`px-6 py-2 text-sm font-black tracking-widest transition-all duration-300 ${
                filter === "dia"
                  ? "bg-gradient-to-r from-[#C62828] to-[#EB7A3F] text-white"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent"
              }`}
            >
              DÍA
            </button>
            <button
              onClick={() => setFilter("noche")}
              className={`px-6 py-2 text-sm font-black tracking-widest transition-all duration-300 ${
                filter === "noche"
                  ? "bg-gradient-to-r from-[#C62828] to-[#EB7A3F] text-white"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent"
              }`}
            >
              NOCHE
            </button>
            <button
              onClick={() => setFilter("lluvia")}
              className={`px-6 py-2 text-sm font-black tracking-widest transition-all duration-300 ${
                filter === "lluvia"
                  ? "bg-gradient-to-r from-[#C62828] to-[#EB7A3F] text-white"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent"
              }`}
            >
              LLUVIA
            </button>
          </div>
        </div>

        {/* Masonry style using CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {images.map((item, idx) => (
            <MasonryItem key={idx} src={item.src} presetRatio={item.ratio} alt={`Gallery ${idx}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MasonryItem({ src, alt, presetRatio }: { src: string; alt: string; presetRatio?: number }) {
  // Start with preset ratio if provided to avoid layout shift
  const [ratio, setRatio] = useState(presetRatio ?? 0.66) // height / width (aprox 3:2)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="mb-4 break-inside-avoid rounded-lg overflow-hidden">
      <div
        className="relative w-full bg-muted/30"
        style={{ paddingBottom: `${ratio * 100}%` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`object-cover transition-transform duration-300 hover:scale-[1.02] transition-opacity ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={(e) => {
            const el = e.currentTarget as HTMLImageElement
            if (el.naturalWidth > 0) {
              setRatio(el.naturalHeight / el.naturalWidth)
            }
            setLoaded(true)
          }}
        />
      </div>
    </div>
  )
}
