import { motion } from 'framer-motion';
import { imageCategories } from '../config/imageUrls';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function BabyShowers() {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen section-padding"
    >
      <h1 className="text-5xl font-serif font-bold text-gradient mb-12">Baby Showers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageCategories.babyShowers.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="overflow-hidden rounded-lg aspect-square"
          >
            <img src={src} alt={`Baby Shower ${i + 1}`} className="h-full w-full object-cover hover:scale-105 transition-transform" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
