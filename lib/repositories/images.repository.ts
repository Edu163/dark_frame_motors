import type { StrapiImagesResponse, ImageEntry, GalleryImage } from "@/types/strapi";

const STRAPI_API_URL = "https://best-treasure-2ffc2f3cd9.strapiapp.com/api";

/**
 * Repository for managing image data from Strapi CMS
 */
export class ImagesRepository {
  private baseUrl: string;

  constructor(baseUrl: string = STRAPI_API_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch all images from Strapi with populated relations
   */
  async getAllImages(): Promise<StrapiImagesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/images?populate=*&pagination[pageSize]=100`, {
        next: {
          tags: ["images"],
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  }

  /**
   * Fetch images with pagination
   */
  async getImagesPaginated(page: number = 1, pageSize: number = 100): Promise<StrapiImagesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/images?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        {
          next: {
            tags: ["images"],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching paginated images:", error);
      throw error;
    }
  }

  /**
   * Fetch images filtered by category
   */
  async getImagesByCategory(categoryName: string): Promise<StrapiImagesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/images?populate=*&filters[category][name][$eq]=${categoryName}`,
        {
          next: {
            tags: ["images"],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch images by category: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching images by category:", error);
      throw error;
    }
  }

  /**
   * Fetch images filtered by tag
   */
  async getImagesByTag(tagName: string): Promise<StrapiImagesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/images?populate=*&filters[types][tag][$eq]=${tagName}`,
        {
          next: {
            tags: ["images"],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch images by tag: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching images by tag:", error);
      throw error;
    }
  }

  /**
   * Transform Strapi image entry to simplified gallery image
   */
  transformToGalleryImage(entry: ImageEntry): GalleryImage {
    const { image, category, types } = entry;

    return {
      id: entry.id,
      documentId: entry.documentId,
      name: entry.name,
      alt: entry.alt,
      url: image.url,
      thumbnailUrl: image.formats.thumbnail?.url || image.url,
      mediumUrl: image.formats.medium?.url || image.url,
      largeUrl: image.formats.large?.url || image.url,
      width: image.width,
      height: image.height,
      category: category.name,
      categoryId: category.documentId,
      tags: types.map((type) => type.tag),
    };
  }

  /**
   * Get all images transformed for gallery display
   */
  async getGalleryImages(): Promise<GalleryImage[]> {
    const response = await this.getAllImages();
    return response.data.map((entry) => this.transformToGalleryImage(entry));
  }

  /**
   * Get gallery images filtered by category
   */
  async getGalleryImagesByCategory(categoryName: string): Promise<GalleryImage[]> {
    const response = await this.getImagesByCategory(categoryName);
    return response.data.map((entry) => this.transformToGalleryImage(entry));
  }

  /**
   * Get gallery images filtered by tag
   */
  async getGalleryImagesByTag(tagName: string): Promise<GalleryImage[]> {
    const response = await this.getImagesByTag(tagName);
    return response.data.map((entry) => this.transformToGalleryImage(entry));
  }

  /**
   * Get unique categories from all images
   */
  async getCategories(): Promise<Array<{ id: string; name: string }>> {
    const response = await this.getAllImages();
    const categoriesMap = new Map<string, { id: string; name: string }>();

    response.data.forEach((entry) => {
      const { category } = entry;
      if (!categoriesMap.has(category.documentId)) {
        categoriesMap.set(category.documentId, {
          id: category.documentId,
          name: category.name,
        });
      }
    });

    return Array.from(categoriesMap.values());
  }

  /**
   * Get unique tags from all images
   */
  async getTags(): Promise<Array<{ id: string; name: string }>> {
    const response = await this.getAllImages();
    const tagsMap = new Map<string, { id: string; name: string }>();

    response.data.forEach((entry) => {
      entry.types.forEach((type) => {
        if (!tagsMap.has(type.documentId)) {
          tagsMap.set(type.documentId, {
            id: type.documentId,
            name: type.tag,
          });
        }
      });
    });

    return Array.from(tagsMap.values());
  }
}

// Export singleton instance
export const imagesRepository = new ImagesRepository();
