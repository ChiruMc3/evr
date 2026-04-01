import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const scrollToNext = (e) => {
    e.preventDefault();
    document.querySelector('#next-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <motion.p
          className="text-yellow-500 text-sm uppercase tracking-[0.2em] mb-5 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          — Professional Photography
        </motion.p>
        <motion.h1
          className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Capturing Moments<br />That Last <span className="text-yellow-500">Forever</span>
        </motion.h1>
        <motion.p
          className="text-white/70 text-base sm:text-lg mb-8 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Weddings · Pre-weddings · Events · Portraits
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link
            to="/portfolio"
            className="group px-8 py-3.5 rounded-full bg-yellow-500 text-black font-semibold text-sm hover:bg-yellow-400 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 shadow-lg shadow-yellow-500/20"
          >
            View Portfolio
          </Link>
          <Link
            to="/contact"
            className="group px-8 py-3.5 rounded-full border border-white/25 text-white font-semibold text-sm hover:border-yellow-500 hover:text-yellow-500 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-yellow-500/5"
          >
            Book a Session
          </Link>
        </motion.div>
      </div>

      {/* Scroll Arrow */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-label="Scroll to next section"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </motion.button>
    </section>
  );
}
