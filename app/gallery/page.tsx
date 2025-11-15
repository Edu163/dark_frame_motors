import { imagesRepository } from "@/lib/repositories/images.repository";
import Header from "@/components/header";
import Hero from "@/components/hero";
import StrapiGalleryView from "@/components/strapi-gallery-view";
import CTABooking from "@/components/cta-booking";
import Footer from "@/components/footer";
import type { GalleryImage } from "@/types/strapi";

export default async function GalleryPage() {
  // Fetch all images for main gallery
  let images: GalleryImage[] = [];
  try {
    images = await imagesRepository.getGalleryImages();
  } catch (error) {
    console.error("Error fetching images:", error);
    images = [];
  }

  // Fetch categories and tags for filters
  const [categories, tags] = await Promise.all([
    imagesRepository.getCategories(),
    imagesRepository.getTags(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <StrapiGalleryView 
        initialImages={images} 
        categories={categories} 
        tags={tags}
      />

      <CTABooking />
      <Footer />
    </main>
  );
}
