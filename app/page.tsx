import Header from "@/components/header";
import Hero from "@/components/hero";
import CategoriesPreviewStrapi from "@/components/categories-preview-strapi";
import CTABooking from "@/components/cta-booking";
import Footer from "@/components/footer";
import ScrollToHash from "@/components/scroll-to-hash";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ScrollToHash />
      <Header />
      <Hero />

      {/* Categories Preview - Redirige a /gallery/[category] */}
      <CategoriesPreviewStrapi />

      <CTABooking />
      <Footer />
    </main>
  );
}
