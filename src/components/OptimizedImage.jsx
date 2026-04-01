import { memo, useState } from 'react';
import { srcSet as generateSrcSet, defaultSizes } from '../utils/image';

function OptimizedImage({ id, src, alt = '', className = '', sizes = defaultSizes, aspectH = 600 }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-navy-light/30" />
      )}
      <img
        src={src}
        srcSet={id ? generateSrcSet(id, aspectH) : undefined}
        sizes={id ? sizes : undefined}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

export default memo(OptimizedImage);
