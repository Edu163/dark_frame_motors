"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import CategoriesPreview from "@/components/categories-preview"
import GalleryView from "@/components/gallery-view"
import Pricing from "@/components/pricing"
import Footer from "@/components/footer"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />

      {!selectedCategory ? (
        <>
          <CategoriesPreview onSelectCategory={setSelectedCategory} />
          <Pricing />
        </>
      ) : (
        <GalleryView category={selectedCategory} onBack={() => setSelectedCategory(null)} />
      )}

      <Footer />
    </main>
  )
}
