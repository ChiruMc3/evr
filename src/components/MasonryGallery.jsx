import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useCallback, useMemo, useRef, useState, memo, forwardRef } from 'react';
import LazyImage from './LazyImage';
import ImageLightbox from './ImageLightbox';

const GalleryItem = memo(forwardRef(function GalleryItem({ src, index, isInView, onImageClick }, ref) {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 20 }}
      transition={{ 
        duration: 0.6,
        delay: isInView ? (index % 12) * 0.08 : 0,
        ease: 'easeOut',
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="break-inside-avoid mb-3 relative group overflow-hidden cursor-pointer bg-navy-800"
      style={{
        display: 'inline-block',
        width: '100%',
        breakInside: 'avoid',
        willChange: 'transform',
      }}
      onClick={() => onImageClick(index)}
    >
      <LazyImage 
        src={src} 
        alt={`Gallery ${index + 1}`}
        className="w-full h-auto block"
        imageClass="group-hover:scale-105 transition-transform duration-700 w-full h-auto cursor-pointer"
      />
      
      {/* Blur overlay with View Photo text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      >
        <span className="text-white font-ui font-bold text-lg">View Photo</span>
      </motion.div>
    </motion.div>
  );
}));

function MasonryGallery({ images = [] }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = useCallback((index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const galleryItems = useMemo(() => {
    return images.map((src, index) => (
      <GalleryItem
        key={src}
        src={src}
        index={index}
        isInView={isInView}
        onImageClick={handleImageClick}
      />
    ));
  }, [images, isInView, handleImageClick]);

  return (
    <>
      <motion.div 
        ref={containerRef}
        layout 
        className="w-full"
        style={{
          columnCount: 'auto',
          columnWidth: '350px',
          columnGap: '0.75rem',
          columnFill: 'balance',
        }}
      >
        <AnimatePresence mode="popLayout">
          {galleryItems}
        </AnimatePresence>
      </motion.div>

      <ImageLightbox 
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
      />
    </>
  );
}

export default memo(MasonryGallery);
