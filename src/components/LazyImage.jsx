import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LazyImage({ src, alt, className = '', eager = false, imageClass = '', style = {} }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(eager);
  const [imageSrc, setImageSrc] = useState(src);
  const ref = useRef(null);

  useEffect(() => {
    if (eager) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [eager]);

  const handleError = () => {
    // Fallback to JPEG if WebP fails
    if (imageSrc.endsWith('.webp')) {
      const jpegSrc = imageSrc.replace(/\.webp$/i, '.jpg');
      setImageSrc(jpegSrc);
      console.warn(`WebP failed, falling back to JPEG: ${jpegSrc}`);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative w-full h-auto overflow-hidden bg-navy-800 ${className}`}
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        ...style,
      }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 bg-[length:200%_100%]" />
      )}
      {inView && (
        <motion.img
          src={imageSrc}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-auto block ${imageClass}`}
          fetchPriority={eager ? 'high' : 'auto'}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
        />
      )}
    </div>
  );
}
