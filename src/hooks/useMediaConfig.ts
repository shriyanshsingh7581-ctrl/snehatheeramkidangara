import { useState, useEffect } from 'react';
import { DEFAULT_IMAGES, SiteImagesConfig } from '../config/siteConfig';

const STORAGE_KEY = 'snehatheeram_media_config_v1';

export function useMediaConfig() {
  const [images, setImages] = useState<SiteImagesConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_IMAGES,
          ...parsed,
          heroSanctuary: { ...DEFAULT_IMAGES.heroSanctuary, ...(parsed.heroSanctuary || {}) },
          everyMotherLove: { ...DEFAULT_IMAGES.everyMotherLove, ...(parsed.everyMotherLove || {}) },
          kuttanadCampus: { ...DEFAULT_IMAGES.kuttanadCampus, ...(parsed.kuttanadCampus || {}) },
          nutritiousMeals: { ...DEFAULT_IMAGES.nutritiousMeals, ...(parsed.nutritiousMeals || {}) },
        };
      }
    } catch {
      // Fallback to default config if localStorage is unavailable
    }
    return DEFAULT_IMAGES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch {
      // Ignore storage quota errors
    }
  }, [images]);

  const updateImages = (next: SiteImagesConfig) => {
    setImages(next);
  };

  const resetImages = () => {
    setImages(DEFAULT_IMAGES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return {
    images,
    updateImages,
    resetImages,
  };
}
