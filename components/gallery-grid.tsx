"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/types/strapi";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.documentId}
            className="group cursor-pointer overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
            onClick={() => setSelectedImage(image)}
          >
            <AspectRatio ratio={image.width / image.height}>
              <Image
                src={image.mediumUrl}
                alt={image.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-2 line-clamp-1">
                {image.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {image.category}
                </Badge>
                {image.tags.slice(0, 2).map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative w-full" style={{ aspectRatio: selectedImage.width / selectedImage.height }}>
                <Image
                  src={selectedImage.largeUrl}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedImage.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{selectedImage.category}</Badge>
                  {selectedImage.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Dimensiones: {selectedImage.width} × {selectedImage.height}px
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
