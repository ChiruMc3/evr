import { motion } from 'framer-motion';
import { useState } from 'react';
import LazyImage from './LazyImage';

/**
 * Accessible gallery image wrapper
 * Ensures every image has proper alt text, role, and keyboard navigation
 */
export default function AccessibleGalleryImage({
  src,
  alt,
  category,
  index,
  onClick,
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Fallback alt text if not provided
  const altText = alt || `${category || 'Gallery'} photo ${index + 1}`;

  // Keyboard handler for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View ${altText}`}
      whileHover={{ scale: 1.02 }}
      className={`cursor-pointer rounded-lg overflow-hidden ${className}`}
    >
      <LazyImage
        src={src}
        alt={altText}
        className="w-full h-full"
        imageClass="object-cover w-full h-full transition-transform duration-300"
      />

      {/* Hover overlay */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <p className="text-white text-sm font-semibold">View Photo</p>
        </motion.div>
      )}
    </motion.div>
  );
}
