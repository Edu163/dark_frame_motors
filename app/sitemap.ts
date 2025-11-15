import { MetadataRoute } from "next";
import { imagesRepository } from "@/lib/repositories/images.repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://darkframemotors.com"; // Cambia esto por tu dominio real

  // Obtener todas las categorías dinámicamente
  const categories = await imagesRepository.getCategories();

  // Rutas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Rutas dinámicas de categorías
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/gallery/${category.name.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
