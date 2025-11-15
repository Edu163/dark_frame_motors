"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import type { GalleryImage } from "@/types/strapi";

interface StrapiGalleryViewProps {
  initialImages: GalleryImage[];
  categories: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
  categoryName?: string;
}

export default function StrapiGalleryView({
  initialImages,
  tags,
  categoryName,
}: StrapiGalleryViewProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filter images based on selected tag (estado local, no URL)
  const images = filter
    ? initialImages.filter((img) => img.tags?.includes(filter))
    : initialImages;

  return (
    <section className="min-h-screen pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm font-bold hover:text-accent transition"
            >
              <ArrowLeft size={20} />
              ATRÁS
            </button>
            <h2 className="text-4xl font-black tracking-tighter uppercase">
              {categoryName || "GALERÍA"}
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
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setFilter(tag.name)}
                className={`px-6 py-2 text-sm font-black tracking-widest transition-all duration-300 uppercase ${
                  filter === tag.name
                    ? "bg-gradient-to-r from-[#C62828] to-[#EB7A3F] text-white"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry style using CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {images.map((image) => (
            <MasonryItem
              key={image.documentId}
              src={image.mediumUrl}
              alt={image.alt}
              width={image.width}
              height={image.height}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron imágenes con los filtros seleccionados
            </p>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}

function MasonryItem({
  src,
  alt,
  width,
  height,
  onClick,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const ratio = height / width;

  return (
    <button
      onClick={onClick}
      className="mb-4 break-inside-avoid rounded-lg overflow-hidden w-full cursor-zoom-in"
    >
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
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </button>
  );
}

function ImageModal({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Cerrar"
      >
        <X size={24} className="text-white" />
      </button>

      {/* Image container */}
      <div
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={image.largeUrl || image.url}
            alt={image.alt}
            fill
            sizes="90vw"
            className={`object-contain transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            quality={95}
          />
        </div>
      </div>
    </div>
  );
}
