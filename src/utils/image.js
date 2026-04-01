const BASE = 'https://images.unsplash.com/photo-';

/**
 * Generate an Unsplash image URL with optional width/height.
 */
export function img(id, w = 800, h = 600, q = 80) {
  return `${BASE}${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;
}

/**
 * Generate a srcSet string for responsive loading.
 * Returns URLs at 400w, 800w, and 1200w.
 */
export function srcSet(id, aspectH = 600) {
  const sizes = [400, 800, 1200];
  return sizes
    .map((w) => {
      const h = Math.round((aspectH / 800) * w);
      return `${BASE}${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${w <= 400 ? 60 : 80} ${w}w`;
    })
    .join(', ');
}

/**
 * Default sizes attribute for responsive images.
 */
export const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
