import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SignatureStrip({ images = [] }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!images.length) return;
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto scrollbar-hide" ref={scrollRef}>
      <div className="flex gap-2 py-4">
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="w-72 h-80 flex-shrink-0 overflow-hidden rounded"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <img
              src={typeof src === 'string' ? src : src?.src || ''}
              alt={`Highlight ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
