import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ images, current, onClose }) {
  const [index, setIndex] = useState(current);

  useEffect(() => { setIndex(current); }, [current]);

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setIndex((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length]);

  useEffect(() => {
    if (index === null) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [index, onClose, prev, next]);

  if (index === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-6 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-800/50 flex items-center justify-center text-white hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-6 text-neutral-500 text-sm font-medium z-10">
          <span className="text-white">{index + 1}</span> / {images.length}
        </div>

        {/* Prev */}
        <button
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-900/80 border border-neutral-800/50 flex items-center justify-center text-white hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300 z-10"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4L6 9l5 5" /></svg>
        </button>

        {/* Image */}
        <motion.img
          key={index}
          src={images[index]?.src}
          alt={images[index]?.alt || images[index]?.title || ''}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next */}
        <button
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-900/80 border border-neutral-800/50 flex items-center justify-center text-white hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300 z-10"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 4l5 5-5 5" /></svg>
        </button>

        {/* Caption */}
        <div className="absolute bottom-6 left-0 right-0 text-center z-10">
          <p className="font-['Playfair_Display'] text-white text-sm sm:text-base">{images[index]?.title}</p>
          <p className="text-yellow-500 text-xs uppercase tracking-wider mt-1">
            {images[index]?.categoryLabel || images[index]?.category}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
