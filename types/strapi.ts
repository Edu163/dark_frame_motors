// Strapi Image Formats
export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiImageFormats {
  large?: StrapiImageFormat;
  small?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  thumbnail?: StrapiImageFormat;
}

// Strapi Image
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: StrapiImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Category
export interface Category {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Type/Tag
export interface ImageType {
  id: number;
  documentId: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Image Entry
export interface ImageEntry {
  id: number;
  documentId: string;
  name: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiImage;
  category: Category;
  types: ImageType[];
}

// API Response
export interface StrapiImagesResponse {
  data: ImageEntry[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Simplified types for UI
export interface GalleryImage {
  id: number;
  documentId: string;
  name: string;
  alt: string;
  url: string;
  thumbnailUrl: string;
  mediumUrl: string;
  largeUrl: string;
  width: number;
  height: number;
  category: string;
  categoryId: string;
  tags: string[];
}
