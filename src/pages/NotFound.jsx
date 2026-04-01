import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCameraOff } from 'react-icons/fi';
import { imageCategories } from '../config/imageUrls';
import MasonryGallery from '../components/MasonryGallery';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function NotFound() {
  const bgImages = imageCategories.babyShowers.slice(0, 6);

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative isolate min-h-screen flex flex-col items-center justify-center section-padding text-center overflow-hidden"
    >
      {/* Faded masonry background gallery */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <MasonryGallery images={bgImages} columns={{ default: 1, sm: 2, md: 3 }} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/40 via-navy-900/70 to-navy-900" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <FiCameraOff className="text-6xl sm:text-7xl text-golden/60 mx-auto mb-6 drop-shadow-lg" />
        </motion.div>

        <motion.span
          variants={itemVariants}
          className="text-8xl sm:text-9xl font-serif font-bold text-gradient block leading-none mb-6"
        >
          404
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-golden-light mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-cream/70 max-w-xl mx-auto mb-8 leading-relaxed"
        >
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Let&rsquo;s get you back on track.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/portfolio" className="px-6 py-3 rounded-full border border-golden/50 text-golden/80 hover:bg-golden/10 transition-all duration-300">
            View Portfolio
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-golden blur-3xl -z-5"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-golden blur-3xl -z-5"
      />
    </motion.main>
  );
}
