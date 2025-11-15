import { imagesRepository } from "@/lib/repositories/images.repository";
import Header from "@/components/header";
import Hero from "@/components/hero";
import StrapiGalleryView from "@/components/strapi-gallery-view";
import CTABooking from "@/components/cta-booking";
import Footer from "@/components/footer";
import type { GalleryImage } from "@/types/strapi";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await imagesRepository.getCategories();
  return categories.map((category) => ({
    category: category.name.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Fetch data for this category
  let images: GalleryImage[] = [];
  try {
    images = await imagesRepository.getGalleryImagesByCategory(category);
    
    // If no images found, show 404
    if (images.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    notFound();
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
        categoryName={category}
      />

      <CTABooking />
      <Footer />
    </main>
  );
}
