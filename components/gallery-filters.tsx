"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface GalleryFiltersProps {
  categories: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
  selectedCategory?: string;
  selectedTag?: string;
}

export default function GalleryFilters({
  categories,
  tags,
  selectedCategory,
  selectedTag,
}: GalleryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
      params.delete("tag"); // Clear tag when category is selected
    }
    router.push(`/gallery?${params.toString()}`);
  };

  const handleTagChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("tag");
    } else {
      params.set("tag", value);
      params.delete("category"); // Clear category when tag is selected
    }
    router.push(`/gallery?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/gallery");
  };

  const hasActiveFilters = selectedCategory || selectedTag;

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[200px]">
        <Select
          value={selectedCategory || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Select value={selectedTag || "all"} onValueChange={handleTagChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tags</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag.id} value={tag.name}>
                {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
