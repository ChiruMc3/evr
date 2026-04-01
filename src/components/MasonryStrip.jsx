import { memo } from 'react';
import ScrollReveal from './ScrollReveal';
import useMasonryLayout from '../hooks/useMasonryLayout';

const STRIP_HEIGHTS = ['h-40', 'h-52', 'h-60', 'h-44', 'h-56', 'h-48'];

function MasonryStrip({ images, cols = 2 }) {
  const items = useMasonryLayout(images);

  return (
    <div className="masonry-strip" style={{ columnCount: cols, columnGap: '0.75rem' }}>
      {items.map(({ src, title, heightClass }, i) => {
        // Use smaller heights for strips
        const h = STRIP_HEIGHTS[(title || '').length % STRIP_HEIGHTS.length + i] || STRIP_HEIGHTS[i % STRIP_HEIGHTS.length];

        return (
          <ScrollReveal key={src + i} delay={i * 0.08} variant="scaleUp">
            <div className="group relative mb-3 break-inside-avoid overflow-hidden rounded-lg">
              <div className={`relative w-full overflow-hidden ${h}`}>
                <img
                  src={src}
                  alt={title || ''}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover
                             transition-transform duration-700 ease-out
                             group-hover:scale-110"
                />
              </div>
              <div
                className="absolute inset-0 bg-navy-900/0 transition-colors duration-500
                           group-hover:bg-navy-900/60 flex items-center justify-center"
              >
                {title && (
                  <span
                    className="text-sm font-serif text-golden-light opacity-0 translate-y-3
                               transition-all duration-500
                               group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    {title}
                  </span>
                )}
              </div>
              <div className="absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-golden/0
                             transition-colors duration-500 group-hover:border-golden/40 rounded-bl-lg" />
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

export default memo(MasonryStrip);
