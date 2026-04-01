import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const ThumbnailItem = memo(function ThumbnailItem({ img, index, isActive, onSelect }) {
  return (
    <motion.button
      key={index}
      whileHover={{ scale: 1.05 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      className={`h-16 w-16 rounded-lg overflow-hidden transition-all flex-shrink-0 ${
        isActive ? 'ring-2 ring-golden' : 'opacity-60 hover:opacity-100'
      }`}
      style={{ willChange: 'transform' }}
    >
      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
    </motion.button>
  );
});

function ImageLightbox({ images, initialIndex = 0, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedImages, setLoadedImages] = useState(new Set([initialIndex]));

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setLoadedImages(prev => new Set([...prev, nextIndex, prevIndex]));
  }, [currentIndex, isOpen, images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleSelectThumbnail = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeydown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isOpen, goToNext, goToPrevious, onClose]);

  const currentImage = useMemo(() => images[currentIndex], [images, currentIndex]);

  const visibleThumbnails = useMemo(() => {
    const start = Math.max(0, currentIndex - 5);
    const end = Math.min(images.length, currentIndex + 6);
    return images.slice(start, end).map((img, idx) => ({
      img,
      actualIndex: start + idx,
    }));
  }, [images, currentIndex]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full flex items-center justify-center"
            style={{ willChange: 'opacity' }}
          >
            <img
              src={currentImage}
              alt={`Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              loading="eager"
              onError={(e) => {
                if (e.target.src.endsWith('.webp')) {
                  e.target.src = e.target.src.replace(/\.webp$/i, '.jpg');
                }
              }}
              style={{ willChange: 'auto' }}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-golden transition-colors z-10 p-2"
            aria-label="Close lightbox"
            style={{ willChange: 'transform' }}
          >
            <FaTimes size={32} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-golden transition-colors z-10 p-2"
            aria-label="Previous image"
            style={{ willChange: 'transform' }}
          >
            <FaChevronLeft size={40} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-golden transition-colors z-10 p-2"
            aria-label="Next image"
            style={{ willChange: 'transform' }}
          >
            <FaChevronRight size={40} />
          </motion.button>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-lg">
            {currentIndex + 1} / {images.length}
          </div>

          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-2xl overflow-x-auto px-4">
            {visibleThumbnails.map(({ img, actualIndex }) => (
              <ThumbnailItem
                key={actualIndex}
                img={img}
                index={actualIndex}
                isActive={actualIndex === currentIndex}
                onSelect={handleSelectThumbnail}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(ImageLightbox);
