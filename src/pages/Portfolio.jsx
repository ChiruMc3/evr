import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { imageCategories } from '../config/imageUrls';
import MasonryGallery from '../components/MasonryGallery';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Define available categories with metadata
const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'All Work', key: null },
  { id: 'weddings', label: 'Weddings', key: 'weddings' },
  { id: 'preWedding', label: 'Pre-Wedding', key: 'preWedding' },
  { id: 'babyShowers', label: 'Baby Showers', key: 'babyShowers' },
  { id: 'modelShoots', label: 'Model Shoots', key: 'modelShoots' },
  { id: 'events', label: 'Events', key: 'events' },
  { id: 'haldi', label: 'Haldi', key: 'haldi' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isDataReady, setIsDataReady] = useState(false);
  const [categoriesData, setCategoriesData] = useState({
    weddings: [],
    preWedding: [],
    babyShowers: [],
    modelShoots: [],
    events: [],
    haldi: [],
  });

  // Keep syncing until image data is actually available (mobile-safe)
  useEffect(() => {
    let mounted = true;

    const readCategories = () => ({
      weddings: imageCategories?.weddings || [],
      preWedding: imageCategories?.preWedding || [],
      babyShowers: imageCategories?.babyShowers || [],
      modelShoots: imageCategories?.modelShoots || [],
      events: imageCategories?.events || [],
      haldi: imageCategories?.haldi || [],
    });

    const sync = () => {
      if (!mounted) return false;
      const next = readCategories();
      const total = Object.values(next).flat().length;
      setCategoriesData(next);

      if (total > 0) {
        setIsDataReady(true);
        return true;
      }
      return false;
    };

    if (sync()) return () => {};

    const interval = setInterval(() => {
      if (sync()) clearInterval(interval);
    }, 300);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Ensure image data exists
  const allCategories = categoriesData;

  // Get all images flattened
  const allImages = useMemo(
    () => Object.values(allCategories).flat(),
    [allCategories]
  );

  // Get filtered images based on active category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') {
      return allImages;
    }
    const category = PORTFOLIO_CATEGORIES.find((c) => c.id === activeCategory);
    return category?.key ? allCategories[category.key] : [];
  }, [activeCategory, allCategories, allImages]);

  // Calculate category counts for badge display
  const categoryCounts = useMemo(
    () =>
      PORTFOLIO_CATEGORIES.reduce((acc, cat) => {
        if (cat.key) {
          acc[cat.id] = allCategories[cat.key]?.length || 0;
        } else {
          acc['all'] = allImages.length;
        }
        return acc;
      }, {}),
    [allCategories, allImages]
  );

  // Filter out categories with no images
  const availableCategories = PORTFOLIO_CATEGORIES.filter(
    (cat) => categoryCounts[cat.id] > 0 || cat.id === 'all'
  );

  // Recalculate masonry layout after images/category change (desktop fix)
  useEffect(() => {
    if (filteredImages.length > 0) {
      window.dispatchEvent(new Event('resize'));
    }
  }, [activeCategory, filteredImages.length]);

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-6 bg-gradient-to-b from-navy-900 to-navy-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-4"
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 max-w-2xl mx-auto text-lg"
          >
            Explore our collection of beautiful moments captured across different events and categories
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 md:py-12 px-6 bg-navy-800/20 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 justify-center md:justify-start md:flex-wrap">
            {!isDataReady ? (
              <p className="text-cream/60 text-center w-full">Loading categories...</p>
            ) : availableCategories.length > 0 ? (
              availableCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-golden text-navy-900'
                      : 'bg-navy-800/50 text-golden border border-golden/30 hover:border-golden/60'
                  }`}
                  aria-pressed={activeCategory === category.id}
                  aria-label={`Filter by ${category.label}`}
                >
                  {category.label}
                  {categoryCounts[category.id] > 0 && (
                    <span className="text-xs opacity-70">({categoryCounts[category.id]})</span>
                  )}
                </motion.button>
              ))
            ) : (
              <p className="text-cream/60 text-center w-full">No categories available</p>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {!isDataReady ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-cream/70"
            >
              Loading portfolio...
            </motion.div>
          ) : filteredImages.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${filteredImages.length}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <MasonryGallery images={filteredImages} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="inline-block">
                <p className="text-6xl mb-4">📸</p>
                <h3 className="text-2xl font-semibold text-cream mb-2">
                  No images in this category yet
                </h3>
                <p className="text-cream/60 mb-8 max-w-md">
                  {activeCategory === 'all'
                    ? 'Portfolio is being updated. Check back soon!'
                    : `We don't have any ${
                        PORTFOLIO_CATEGORIES.find((c) => c.id === activeCategory)?.label.toLowerCase()
                      } photos available yet.`}
                </p>

                {/* CTAs */}
                <div className="flex gap-4 justify-center flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory('all')}
                    className="btn-secondary"
                  >
                    View All Work
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => (window.location.href = '/contact')}
                    className="btn-primary"
                  >
                    Request Custom Package
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </motion.main>
  );
}
