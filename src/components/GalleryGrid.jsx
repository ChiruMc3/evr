import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function GalleryGrid({ images = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  console.log('[GalleryGrid] 🔄 Rendering with', images.length, 'images');
  console.log('[GalleryGrid] lightboxIndex:', lightboxIndex);

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {images.map((img, i) => (
          <motion.div
            key={img.id ?? i}
            variants={itemVariants}
            className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            onClick={() => {
              console.log('[GalleryGrid] 🖱️ Image clicked, index:', i);
              setLightboxIndex(i);
            }}
          >
            {/* Image */}
            <img
              src={img.src}
              alt={img.title || `Gallery ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
              onError={(e) => console.error(`[GalleryGrid] ❌ Image ${i} failed to load:`, e.target.src)}
            />

            {/* Permanent bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between">
              <div>
                {img.category && (
                  <span className="inline-block font-['Inter',sans-serif] text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-yellow-500 mb-1">
                    {img.category}
                  </span>
                )}
                {img.title && (
                  <h3 className="font-['Playfair_Display',serif] text-sm sm:text-base md:text-lg text-white leading-snug tracking-wide">
                    {img.title}
                  </h3>
                )}
              </div>

              {/* Expand icon — visible on hover */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                  />
                </svg>
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox — fixed props to match Lightbox component API */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          current={lightboxIndex}
          onClose={() => {
            console.log('[GalleryGrid] 🔴 Closing lightbox');
            setLightboxIndex(null);
          }}
        />
      )}
    </>
  );
}
