# 🚀 Guía de Uso Rápido

## Opción 1: Usar la Página de Galería (Más Simple)

Ya está lista en `/gallery`. Solo navega a:

```
http://localhost:3000/gallery
```

### Filtros por URL:

```
/gallery?category=motos
/gallery?tag=día
```

---

## Opción 2: Integrar en tu Página Principal

Reemplaza tu página actual con esta versión que usa Strapi:

```tsx
// app/page.tsx
import { imagesRepository } from "@/lib/repositories/images.repository";
import Header from "@/components/header";
import Hero from "@/components/hero";
import CTABooking from "@/components/cta-booking";
import Footer from "@/components/footer";
import StrapiGalleryView from "@/components/strapi-gallery-view";

// ISR: Revalidar cada 60 segundos
export const revalidate = 60;

export default async function Home() {
  // Fetch data from Strapi
  const images = await imagesRepository.getGalleryImages();
  const categories = await imagesRepository.getCategories();
  const tags = await imagesRepository.getTags();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      
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
```

---

## Opción 3: Solo Mostrar Imágenes de una Categoría

```tsx
// app/motos/page.tsx
import { imagesRepository } from "@/lib/repositories/images.repository";
import GalleryGrid from "@/components/gallery-grid";

export const revalidate = 60;

export default async function MotosPage() {
  const images = await imagesRepository.getGalleryImagesByCategory("motos");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Fotografía de Motos</h1>
      <GalleryGrid images={images} />
    </div>
  );
}
```

---

## Opción 4: Usar el Repository Directamente

```tsx
import { imagesRepository } from "@/lib/repositories/images.repository";

// Obtener todas las imágenes
const allImages = await imagesRepository.getGalleryImages();

// Filtrar por categoría
const motosImages = await imagesRepository.getGalleryImagesByCategory("motos");

// Filtrar por tag
const dayImages = await imagesRepository.getGalleryImagesByTag("día");

// Obtener categorías disponibles
const categories = await imagesRepository.getCategories();
// [{ id: "iyalj2k6py6upmkrsxevweme", name: "motos" }, ...]

// Obtener tags disponibles
const tags = await imagesRepository.getTags();
// [{ id: "nqaxzglbgas3cva301g7npuk", name: "día" }, ...]
```

---

## 🎨 Personalización

### Cambiar tiempo de revalidación

```tsx
// Revalidar cada 5 minutos
export const revalidate = 300;

// Revalidar cada hora
export const revalidate = 3600;

// Sin revalidación (solo build time)
export const revalidate = false;
```

### Cambiar URL de Strapi

```tsx
// lib/repositories/images.repository.ts
const STRAPI_API_URL = "https://tu-strapi.com/api";
```

### Agregar más filtros

```tsx
// En el repository, agregar nuevo método:
async getImagesByMultipleFilters(category?: string, tag?: string) {
  let url = `${this.baseUrl}/images?populate=*`;
  
  if (category) {
    url += `&filters[category][name][$eq]=${category}`;
  }
  
  if (tag) {
    url += `&filters[types][tag][$eq]=${tag}`;
  }
  
  const response = await fetch(url, { next: { revalidate: 60 } });
  return await response.json();
}
```

---

## 🔄 Revalidación Manual

Crear webhook en Strapi que llame a tu API cuando se actualice contenido:

```tsx
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Validar secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    revalidatePath('/gallery');
    revalidatePath('/');
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return Response.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
```

Luego en Strapi, configurar webhook:
```
URL: https://tu-sitio.com/api/revalidate?secret=TU_SECRET
Evento: Entry Update, Entry Create, Entry Delete
```

---

## 📱 Responsive

Los componentes ya son responsive:

- **Mobile**: 1 columna
- **Tablet**: 2 columnas
- **Desktop**: 3 columnas
- **Large Desktop**: 4 columnas

---

## 🎯 Testing Local

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Visita:
```
http://localhost:3000/gallery
```

3. Prueba los filtros en la UI o por URL:
```
http://localhost:3000/gallery?category=motos
http://localhost:3000/gallery?tag=día
```

---

## 🐛 Troubleshooting

### Las imágenes no cargan

Verifica que el dominio esté en `next.config.mjs`:
```javascript
hostname: 'best-treasure-2ffc2f3cd9.media.strapiapp.com'
```

### Error de CORS

Strapi debe permitir tu dominio. En Strapi:
```
Settings → CORS → Add your domain
```

### Datos no se actualizan

- Verifica el `revalidate` time
- Limpia cache: `rm -rf .next`
- Rebuild: `npm run build`

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
vercel deploy
```

Las páginas ISR funcionan automáticamente en Vercel.

### Otros Providers

Asegúrate que soporten ISR de Next.js:
- Netlify (con Next.js Runtime)
- AWS Amplify
- Cloudflare Pages

---

## 📊 Performance

Con ISR obtienes:

- ⚡ **Tiempo de carga**: ~100ms (páginas estáticas)
- 🔄 **Actualización**: Cada 60s en background
- 📈 **SEO**: 100% indexable
- 💰 **Costo**: Mínimo (menos requests a Strapi)
