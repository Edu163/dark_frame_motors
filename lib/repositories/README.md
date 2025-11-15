# 📚 Repository Pattern - Images Repository

## Descripción

El `ImagesRepository` es la capa de acceso a datos que abstrae las llamadas a la API de Strapi CMS.

## Ventajas

- ✅ **Separación de responsabilidades**: La lógica de negocio no depende de Strapi
- ✅ **Fácil testing**: Puedes mockear el repository
- ✅ **Cambio de CMS**: Cambiar de Strapi a otro CMS sin tocar la UI
- ✅ **Transformación centralizada**: Convierte datos de Strapi a formato UI

## Uso

```typescript
import { imagesRepository } from "@/lib/repositories/images.repository";

// Obtener todas las imágenes transformadas
const images = await imagesRepository.getGalleryImages();

// Filtrar por categoría
const motos = await imagesRepository.getGalleryImagesByCategory("motos");

// Filtrar por tag
const dayImages = await imagesRepository.getGalleryImagesByTag("día");

// Obtener categorías disponibles
const categories = await imagesRepository.getCategories();

// Obtener tags disponibles
const tags = await imagesRepository.getTags();
```

## Métodos Disponibles

### `getAllImages()`
Retorna la respuesta completa de Strapi con todas las relaciones pobladas.

```typescript
const response = await imagesRepository.getAllImages();
// { data: [...], meta: { pagination: {...} } }
```

### `getImagesPaginated(page, pageSize)`
Obtiene imágenes con paginación.

```typescript
const page1 = await imagesRepository.getImagesPaginated(1, 12);
const page2 = await imagesRepository.getImagesPaginated(2, 12);
```

### `getImagesByCategory(categoryName)`
Filtra imágenes por nombre de categoría.

```typescript
const motos = await imagesRepository.getImagesByCategory("motos");
```

### `getImagesByTag(tagName)`
Filtra imágenes por tag.

```typescript
const dayImages = await imagesRepository.getImagesByTag("día");
```

### `getGalleryImages()`
Obtiene todas las imágenes transformadas al formato `GalleryImage[]`.

```typescript
const images = await imagesRepository.getGalleryImages();
// [{ id, name, url, thumbnailUrl, category, tags, ... }]
```

### `getGalleryImagesByCategory(categoryName)`
Obtiene imágenes filtradas y transformadas.

```typescript
const motos = await imagesRepository.getGalleryImagesByCategory("motos");
```

### `getGalleryImagesByTag(tagName)`
Obtiene imágenes filtradas por tag y transformadas.

```typescript
const dayImages = await imagesRepository.getGalleryImagesByTag("día");
```

### `getCategories()`
Obtiene lista única de categorías.

```typescript
const categories = await imagesRepository.getCategories();
// [{ id: "abc123", name: "motos" }, ...]
```

### `getTags()`
Obtiene lista única de tags.

```typescript
const tags = await imagesRepository.getTags();
// [{ id: "xyz789", name: "día" }, ...]
```

## Transformación de Datos

El repository transforma datos de Strapi a un formato simplificado:

### Entrada (Strapi)
```json
{
  "id": 17,
  "name": "Motos 1",
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
```

### Salida (GalleryImage)
```json
{
  "id": 17,
  "name": "Motos 1",
  "url": "https://...",
  "thumbnailUrl": "https://...",
  "mediumUrl": "https://...",
  "largeUrl": "https://...",
  "category": "motos",
  "tags": ["día"]
}
```

## ISR Configuration

Todos los métodos usan ISR con revalidación de 60 segundos:

```typescript
fetch(url, {
  next: { revalidate: 60 }
});
```

## Testing

Ejemplo de mock para tests:

```typescript
jest.mock("@/lib/repositories/images.repository", () => ({
  imagesRepository: {
    getGalleryImages: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: "Test Image",
        url: "https://test.com/image.jpg",
        category: "test",
        tags: ["test"],
      },
    ]),
    getCategories: jest.fn().mockResolvedValue([
      { id: "1", name: "test" },
    ]),
  },
}));
```

## Extender el Repository

Para agregar nuevos métodos:

```typescript
// En images.repository.ts
export class ImagesRepository {
  // ... métodos existentes

  async getImagesByDateRange(startDate: string, endDate: string) {
    const response = await fetch(
      `${this.baseUrl}/images?populate=*&filters[createdAt][$gte]=${startDate}&filters[createdAt][$lte]=${endDate}`,
      { next: { revalidate: 60 } }
    );
    return await response.json();
  }
}
```

## Error Handling

El repository maneja errores y los propaga:

```typescript
try {
  const images = await imagesRepository.getGalleryImages();
} catch (error) {
  console.error("Error fetching images:", error);
  // Manejar error en la UI
}
```

## Cambiar URL de Strapi

```typescript
// En images.repository.ts
const STRAPI_API_URL = "https://tu-strapi.com/api";

// O crear instancia custom
const customRepo = new ImagesRepository("https://otro-strapi.com/api");
```
