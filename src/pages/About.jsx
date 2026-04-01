import { motion } from 'framer-motion';
import { imageCategories } from '../config/imageUrls';
import LazyImage from '../components/LazyImage';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function About() {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {/* Main About Section - reduce padding */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6">
                About EVR Photography
              </h1>
              <p className="text-cream/80 mb-4 leading-relaxed">
                What started as a hobby in a small town grew into a lifelong dedication to visual storytelling.
                EVR Photography is built on the belief that every person, every moment, and every place has a
                story worth preserving.
              </p>
              <p className="mt-4 text-cream/60 leading-relaxed">
                We combine technical expertise with an intuitive creative eye, ensuring that each photograph
                isn't just an image — it's an emotion captured in light.
              </p>
            </motion.div>

            {/* Image - prevent overlap on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full h-auto"
            >
              <LazyImage
                src={imageCategories?.heroImages?.[0]}
                alt="About EVR"
                className="w-full rounded-xl"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="btn-primary"
            >
              Book a Session
            </motion.button>
          </div>
        </div>
      </section>

      {/* Philosophy Section - remove large gap */}
      <section className="py-12 md:py-16 px-6 bg-navy-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient text-center mb-12">
            Our Philosophy
          </h2>
          <blockquote className="mt-8 text-xl sm:text-2xl italic text-cream/80 leading-relaxed">
            &ldquo;Photography is the art of making memories tangible. We don&rsquo;t just take pictures —
            we create heirlooms.&rdquo;
          </blockquote>
          <p className="mt-6 text-golden-muted font-semibold">— EVR Photography</p>
        </div>
      </section>

      {/* Decorative images - fixed positioning, no overlap */}
      <div className="relative">
        <section className="py-12 md:py-16 px-6">
          {/* Main content */}
        </section>
      </div>
    </motion.main>
  );
}
