import { useMemo } from 'react';

const HEIGHT_CLASSES = [
  'h-56',   // short
  'h-64',   // medium-short
  'h-72',   // medium
  'h-80',   // medium-tall
  'h-96',   // tall
  'h-[26rem]', // extra tall
];

/**
 * Assigns a dynamic height class to each image so masonry never looks uniform.
 * Uses a seeded-ish pattern based on index + title hash to stay stable across renders
 * but look random visually.
 */
export default function useMasonryLayout(images) {
  return useMemo(() => {
    return images.map((image, i) => {
      // Simple hash from title/src for stable but varied assignment
      const seed = (image.title || image.src || '')
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

      const tierIndex = (seed + i * 3) % HEIGHT_CLASSES.length;

      // Every 3rd–5th item gets "featured" (spans wider feel via extra height)
      const isFeatured = (seed + i) % 5 === 0;

      return {
        ...image,
        heightClass: isFeatured ? 'h-[28rem]' : HEIGHT_CLASSES[tierIndex],
        isFeatured,
      };
    });
  }, [images]);
}
