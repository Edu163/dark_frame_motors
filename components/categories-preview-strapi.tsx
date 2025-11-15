"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Categorías estáticas (mismas que categories-preview.tsx)
const categories = [
  { id: "autos", name: "AUTOS", image: "/autos.jpg", span: "md:col-span-1 md:row-span-1" },
  { id: "motos", name: "MOTOS", image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65", span: "md:col-span-1 md:row-span-1" },
  { id: "pilotos", name: "PILOTOS", image: "https://images.unsplash.com/photo-1761942943730-c31590bb5c1b", span: "md:col-span-1 md:row-span-1" },
];

export default function CategoriesPreviewStrapi() {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    // Redirigir a la galería con ruta dinámica
    router.push(`/gallery/${categoryId}`);
  };

  return (
    <section id="galeria" className="py-20 px-6 bg-card scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl font-black mb-12 tracking-tighter">
          MOTOR, LENTE y ASFALTO
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[420px]">
          {categories.map((category, idx) => (
            <CategoryCard
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              title={category.name}
              src={category.image}
              span={category.span}
              priority={idx < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  src,
  title,
  onClick,
  span,
  priority = false,
}: {
  src: string;
  title: string;
  onClick: () => void;
  span?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden transition-all duration-300 cursor-pointer ${span ?? ""}`}
    >
      {/* Reserva de espacio y placeholder */}
      <div className="absolute inset-0 bg-muted/30" />

      <Image
        src={src}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
        className={`object-cover transition-transform saturate-0 duration-300 group-hover:scale-110 transition-opacity ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        priority={priority}
      />

      {/* Scrim adaptativo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/60 group-hover:via-black/20 transition-all duration-300" />

      {/* Título */}
      <div className="absolute bottom-0 left-0 p-6">
        <h4 className="text-2xl md:text-3xl font-black tracking-wider text-white group-hover:bg-gradient-to-r group-hover:from-[#C62828] group-hover:to-[#EB7A3F] group-hover:bg-clip-text group-hover:text-transparent group-hover:scale-105 transition-all duration-300 origin-bottom-left">
          {title}
        </h4>
      </div>
    </button>
  );
}
