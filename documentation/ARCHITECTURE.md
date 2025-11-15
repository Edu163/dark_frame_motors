# Arquitectura ISR con Patrón Repository para Strapi

## 📋 Descripción General

Esta implementación utiliza **Incremental Static Regeneration (ISR)** de Next.js 15 junto con el **patrón Repository** para consumir imágenes desde Strapi CMS.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐         ┌──────────────┐              │
│  │  /gallery    │         │  /api/images │              │
│  │  (ISR Page)  │         │  (API Route) │              │
│  └──────┬───────┘         └──────┬───────┘              │
│         │                        │                       │
│         └────────┬───────────────┘                       │
│                  │                                       │
│         ┌────────▼────────┐                             │
│         │  Repository     │                             │
│         │  Pattern Layer  │                             │
│         └────────┬────────┘                             │
│                  │                                       │
│         ┌────────▼────────┐                             │
│         │  Strapi CMS API │                             │
│         │  (External)     │                             │
│         └─────────────────┘                             │
└─────────────────────────────────────────────────────────┘
```

## 📁 Estructura de Archivos

```
dark_frame/
├── app/
│   ├── gallery/
│   │   └── page.tsx              # Página ISR con galería
│   └── api/
│       └── images/
│           └── route.ts          # API Route para filtrado
├── lib/
│   └── repositories/
│       └── images.repository.ts  # Repository Pattern
├── types/
│   └── strapi.ts                 # TypeScript types
└── components/
    ├── gallery-grid.tsx          # Grid de imágenes
    ├── gallery-filters.tsx       # Filtros de categoría/tags
    └── strapi-gallery-view.tsx   # Vista completa (opcional)
```

## 🔑 Componentes Principales

### 1. Types (`types/strapi.ts`)

Define todos los tipos TypeScript para la respuesta de Strapi:

- `StrapiImagesResponse` - Respuesta completa de la API
- `ImageEntry` - Entrada individual de imagen
- `GalleryImage` - Tipo simplificado para UI
- `Category`, `ImageType` - Tipos auxiliares

### 2. Repository (`lib/repositories/images.repository.ts`)

Implementa el patrón Repository con los siguientes métodos:

```typescript
class ImagesRepository {
  // Obtener todas las imágenes
  getAllImages(): Promise<StrapiImagesResponse>
  
  // Obtener imágenes con paginación
  getImagesPaginated(page, pageSize): Promise<StrapiImagesResponse>
  
  // Filtrar por categoría
  getImagesByCategory(categoryName): Promise<StrapiImagesResponse>
  
  // Filtrar por tag
  getImagesByTag(tagName): Promise<StrapiImagesResponse>
  
  // Transformar a formato de galería
  getGalleryImages(): Promise<GalleryImage[]>
  
  // Obtener categorías únicas
  getCategories(): Promise<Array<{id, name}>>
  
  // Obtener tags únicos
  getTags(): Promise<Array<{id, name}>>
}
```

### 3. Página ISR (`app/gallery/page.tsx`)

Características:

- **ISR con revalidación cada 60 segundos**
- **Server Component** para mejor SEO
- **generateStaticParams** para pre-renderizar categorías comunes
- Filtrado por URL params (`?category=motos&tag=día`)

```typescript
export const revalidate = 60; // ISR config

export async function generateStaticParams() {
  const categories = await imagesRepository.getCategories();
  return categories.map(cat => ({ category: cat.name }));
}
```

### 4. Componentes UI

#### `GalleryGrid`
- Grid responsivo de imágenes
- Modal para vista detallada
- Optimización con Next.js Image

#### `GalleryFilters`
- Filtros por categoría y tags
- Client Component con navegación
- Limpieza de filtros

## 🚀 Uso

### Opción 1: Página Dedicada (Recomendado)

Navega a `/gallery` para ver la galería completa con ISR.

```tsx
// La página se regenera cada 60 segundos automáticamente
// URL: /gallery
// URL: /gallery?category=motos
// URL: /gallery?tag=día
```

### Opción 2: Integración en Página Existente

```tsx
import { imagesRepository } from "@/lib/repositories/images.repository";
import StrapiGalleryView from "@/components/strapi-gallery-view";

export const revalidate = 60;

export default async function Page() {
  const images = await imagesRepository.getGalleryImages();
  const categories = await imagesRepository.getCategories();
  const tags = await imagesRepository.getTags();

  return (
    <StrapiGalleryView
      initialImages={images}
      categories={categories}
      tags={tags}
    />
  );
}
```

### Opción 3: API Route

```typescript
// GET /api/images
// GET /api/images?category=motos
// GET /api/images?tag=día

const response = await fetch('/api/images?category=motos');
const images = await response.json();
```

## ⚙️ Configuración ISR

### Revalidación

```typescript
// Revalidar cada 60 segundos
export const revalidate = 60;

// O en fetch individual
fetch(url, {
  next: { revalidate: 60 }
});
```

### On-Demand Revalidation

Para revalidar bajo demanda (ej: cuando se actualiza contenido en Strapi):

```typescript
// En un webhook o API route
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  revalidatePath('/gallery');
  return Response.json({ revalidated: true });
}
```

## 🎨 Ventajas de esta Arquitectura

### 1. **ISR (Incremental Static Regeneration)**
- ✅ Páginas estáticas ultra-rápidas
- ✅ Actualización automática sin rebuild
- ✅ Mejor SEO que CSR
- ✅ Menor carga en Strapi

### 2. **Repository Pattern**
- ✅ Separación de responsabilidades
- ✅ Fácil testing y mocking
- ✅ Cambio de CMS sin afectar UI
- ✅ Transformación de datos centralizada

### 3. **Type Safety**
- ✅ TypeScript end-to-end
- ✅ Autocompletado en IDE
- ✅ Menos errores en runtime

## 🔧 Configuración Next.js

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      { 
        protocol: 'https', 
        hostname: 'best-treasure-2ffc2f3cd9.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
}
```

## 📊 Flujo de Datos

```
1. Usuario visita /gallery
   ↓
2. Next.js verifica cache estático
   ↓
3. Si cache válido (< 60s) → Sirve estático
   ↓
4. Si cache expirado:
   - Sirve estático (stale)
   - Regenera en background
   - Actualiza cache
   ↓
5. Repository consulta Strapi
   ↓
6. Transforma datos a GalleryImage[]
   ↓
7. Renderiza componentes
```

## 🎯 Mejores Prácticas

1. **Usar Server Components por defecto**
   - Solo Client Components cuando necesites interactividad

2. **Configurar revalidate apropiadamente**
   - 60s para contenido que cambia frecuentemente
   - 3600s (1h) para contenido estático

3. **Optimizar imágenes**
   - Usar formatos de Strapi (thumbnail, medium, large)
   - Configurar `sizes` en Next.js Image

4. **Manejo de errores**
   - Try/catch en repository
   - Fallbacks en UI

## 🔄 Actualización de Contenido

### Automática (ISR)
El contenido se actualiza automáticamente cada 60 segundos.

### Manual (On-Demand)
Crear webhook en Strapi que llame a:

```bash
POST /api/revalidate
```

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';

export async function POST() {
  revalidatePath('/gallery');
  return Response.json({ revalidated: true });
}
```

## 📝 Ejemplo de Respuesta Strapi

```json
{
  "data": [
    {
      "id": 17,
      "documentId": "kdce8di8a01q6dt2k2f6d1uk",
      "name": "Motos 1",
      "alt": "Motos 1",
      "image": {
        "url": "https://...",
        "formats": {
          "thumbnail": { "url": "..." },
          "medium": { "url": "..." },
          "large": { "url": "..." }
        }
      },
      "category": { "name": "motos" },
      "types": [{ "tag": "día" }]
    }
  ]
}
```

## 🚦 Testing

```typescript
// Mock del repository para tests
const mockRepository = {
  getGalleryImages: jest.fn().mockResolvedValue([...]),
  getCategories: jest.fn().mockResolvedValue([...]),
};
```

## 📚 Referencias

- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [Strapi API](https://docs.strapi.io/dev-docs/api/rest)
