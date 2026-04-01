import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRing, FaCamera, FaCalendarAlt } from 'react-icons/fa';
import { imageCategories } from '../config/imageUrls';
import SITE_CONFIG from '../config/siteConfig';
import { HOME_SERVICES } from '../config/services';
import MasonryGallery from '../components/MasonryGallery';
import LazyImage from '../components/LazyImage';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0, 1]);
  
  const [testimonialPaused, setTestimonialPaused] = useState(false);

  const heroImages = imageCategories?.heroImages || [];
  const preWeddingImages = imageCategories?.preWedding || [];
  const babyShowerImages = imageCategories?.babyShowers || [];
  const modelShootImages = imageCategories?.modelShoots || [];
  
  const heroSrc = heroImages[0] || '';
  
  const featuredImages = [
    ...babyShowerImages.slice(3, 5),
    ...preWeddingImages.slice(6, 11),
    ...modelShootImages.slice(4, 6),
  ];

  if (!heroSrc) {
    console.warn('No hero image available');
  }

  if (featuredImages.length === 0) {
    console.warn('No featured images available');
  }

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Hero Background */}
        {heroSrc && (
          <div className="absolute inset-0 -z-10">
            <motion.div 
              style={{ y: heroY }}
              className="absolute inset-0"
            >
              <LazyImage 
                src={heroSrc}
                alt="Hero Background"
                eager={true}
                className="absolute inset-0 w-full h-full"
                imageClass="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/60 to-navy-900"
            />
          </div>
        )}

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center md:text-left px-6 max-w-2xl mx-auto md:ml-12 md:mr-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-sans font-bold text-gradient mb-6 tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {SITE_CONFIG.brand.name}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-cream/90 mb-8 leading-relaxed max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {SITE_CONFIG.brand.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 justify-center md:justify-start flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/portfolio'}
              className="btn-primary"
              aria-label="Explore our photography portfolio"
            >
              Explore Our Portfolio
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="btn-secondary"
              aria-label="Request a free consultation"
            >
              Request Free Consultation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex justify-center">
            <motion.div className="w-1 h-2 bg-cream/40 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Featured Work Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-4"
            >
              Featured Work
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-cream/70 max-w-2xl mx-auto"
            >
              A curated selection of our most beautiful moments
            </motion.p>
          </div>

          {/* Masonry Gallery */}
          {featuredImages.length > 0 ? (
            <>
              <div className="mb-12 w-full overflow-x-hidden">
                <MasonryGallery images={featuredImages} />
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/portfolio'}
                  className="btn-primary"
                  aria-label="View our full portfolio"
                >
                  See All Our Work
                </motion.button>
              </motion.div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-cream/60">Featured images loading...</p>
            </div>
          )}
        </div>
      </section>

      {/* About the Artist Section */}
      {modelShootImages && modelShootImages.length > 0 ? (
        <section className="py-24 md:py-32 px-6 bg-navy-800/20 relative overflow-hidden">
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-golden via-transparent to-golden pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              className="h-1 w-16 bg-gradient-to-r from-golden to-transparent mx-auto mb-6"
            />

            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6">
                About the Artist
              </h2>
              <p className="text-cream/70 max-w-2xl mx-auto">
                Meet the creative vision behind EVR Photography
              </p>
            </motion.div>

            {/* Content Grid - Honeycomb on left, text on right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Left Column - Artist Image + Honeycomb (spans 5 columns) */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-5"
              >
                {/* Artist Image - Separated */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="mb-8 relative overflow-hidden cursor-pointer group"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    aspectRatio: '1 / 1',
                  }}
                >
                  {/* Thin glowing border */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      border: '2px solid rgba(212, 175, 55, 0.4)',
                      boxShadow: '0 0 15px rgba(212, 175, 55, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.1)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  />

                  <LazyImage 
                    src={heroImages[0]}
                    alt="Artist Portrait"
                    className="w-full h-full"
                    imageClass="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Artist badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                    <span className="text-golden font-semibold tracking-widest text-sm uppercase">Artist</span>
                  </div>
                </motion.div>

                {/* Honeycomb Grid - Mix of all image categories */}
                <div className="grid gap-3" style={{ 
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  perspective: '1000px',
                }}>
                  {[
                    { src: babyShowerImages.length > 0 ? babyShowerImages[Math.floor(Math.random() * babyShowerImages.length)] : '', idx: 0 },
                    { src: modelShootImages.length > 0 ? modelShootImages[Math.floor(Math.random() * modelShootImages.length)] : '', idx: 1 },
                    { src: preWeddingImages.length > 0 ? preWeddingImages[Math.floor(Math.random() * preWeddingImages.length)] : '', idx: 2 },
                    { src: babyShowerImages.length > 0 ? babyShowerImages[Math.floor(Math.random() * babyShowerImages.length)] : '', idx: 3 },
                    { src: modelShootImages.length > 0 ? modelShootImages[Math.floor(Math.random() * modelShootImages.length)] : '', idx: 4 },
                    { src: preWeddingImages.length > 0 ? preWeddingImages[Math.floor(Math.random() * preWeddingImages.length)] : '', idx: 5 },
                  ].filter(item => item.src).map((item) => (
                    <motion.div
                      key={`${item.idx}-${item.src}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [1, 1, 1],
                      }}
                      transition={{
                        y: {
                          duration: 3.5 + item.idx * 0.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: item.idx * 0.2,
                        },
                        initial: {
                          delay: 0.2 + item.idx * 0.08,
                          duration: 0.5,
                          ease: 'easeOut',
                        }
                      }}
                      className={`relative overflow-hidden cursor-pointer group ${
                        item.idx % 2 === 1 ? 'mt-6' : ''
                      }`}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        aspectRatio: '1 / 1',
                        willChange: 'transform',
                      }}
                    >
                      {/* Thin glowing border */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          border: '1.5px solid rgba(212, 175, 55, 0.3)',
                          boxShadow: '0 0 12px rgba(212, 175, 55, 0.4), inset 0 0 12px rgba(212, 175, 55, 0.08)',
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          transition: 'all 0.3s ease',
                        }}
                      />

                      {/* Glow on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          boxShadow: '0 0 20px rgba(212, 175, 55, 0.6), inset 0 0 20px rgba(212, 175, 55, 0.15)',
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        }}
                      />

                      <LazyImage 
                        src={item.src}
                        alt={`Gallery ${item.idx}`}
                        className="w-full h-full"
                        imageClass="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Text Content (spans 7 columns) */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-7"
              >
                {/* Achievement Badges */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
                    { stat: '5+', label: 'Years Experience' },
                    { stat: '10+', label: 'Happy Clients' },
                    // { stat: 'Award', label: 'Winning' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-center p-4 rounded-lg bg-navy-800/50 border border-golden/20 hover:border-golden/50 transition-all"
                    >
                      <p className="text-2xl font-bold text-golden mb-1">{item.stat}</p>
                      <p className="text-xs text-cream/70 uppercase tracking-wide">{item.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <p className="text-lg text-cream/85 leading-[1.8] font-light">
                    With over a decade of experience in photography, EVR captures the essence of every moment with passion and precision. Our approach combines technical expertise with artistic vision to create timeless images that transcend trends.
                  </p>
                  
                  <p className="text-lg text-cream/85 leading-[1.8] font-light">
                    We believe in telling your story through authentic, beautifully composed photographs that you'll treasure forever. Every frame is a conversation between artist and subject, resulting in images that evoke emotion and preserve memories with integrity.
                  </p>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.href = '/about'}
                      className="btn-secondary"
                    >
                      Learn More
                      <span className="text-lg">→</span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Testimonials Section - Continuous Scrolling with Pause */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-navy-900 to-navy-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6">
              What Our Clients Say
            </h2>
            <p className="text-cream/70 max-w-2xl mx-auto">
              Real stories from real moments we've captured together
            </p>
          </motion.div>

          {/* Testimonials Carousel - Horizontal Scroll with Pause Control */}
          <div
            className="relative group"
            onMouseEnter={() => setTestimonialPaused(true)}
            onMouseLeave={() => setTestimonialPaused(false)}
            onFocus={() => setTestimonialPaused(true)}
            onBlur={() => setTestimonialPaused(false)}
            role="region"
            aria-label="Client testimonials carousel"
            aria-live="polite"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-6"
                  animate={{ x: testimonialPaused ? 0 : ['0px', '-2400px'] }}
                  transition={{
                    duration: 40,
                    repeat: testimonialPaused ? 0 : Infinity,
                    ease: 'linear',
                    repeatType: 'loop',
                  }}
                >
                  {/* Original testimonials */}
                  {[
                    {
                      name: 'Priya & Arjun',
                      role: 'Wedding Couple',
                      text: 'EVR Productions captured every magical moment of our wedding day with such elegance and authenticity. We couldn\'t be happier with the final photos!',
                      rating: 5,
                    },
                    {
                      name: 'Sneha Sharma',
                      role: 'Baby Shower Client',
                      text: 'The team\'s professionalism and creative vision transformed our baby shower into a beautiful memory. Highly recommended!',
                      rating: 5,
                    },
                    {
                      name: 'Rohan & Divya',
                      role: 'Pre-Wedding Shoot',
                      text: 'From concept to execution, EVR Productions made us feel comfortable and confident. The results are beyond our expectations.',
                      rating: 5,
                    },
                    {
                      name: 'Aisha Khan',
                      role: 'Portrait Client',
                      text: 'A true professional! The attention to detail and passion for photography really shows in every frame. Worth every moment!',
                      rating: 5,
                    },
                    {
                      name: 'Vikram & Neha',
                      role: 'Haldi Ceremony',
                      text: 'The energy and warmth captured in our haldi photos is incredible. EVR Productions knows how to bring joy to life!',
                      rating: 5,
                    },
                    {
                      name: 'Sarita Patel',
                      role: 'Family Portrait',
                      text: 'Working with EVR was a delightful experience. They made our family shoot feel natural and relaxed. Exceptional work!',
                      rating: 5,
                    },
                  ].map((testimonial, idx) => (
                    <div
                      key={`original-${idx}`}
                      className="flex-shrink-0 w-80 p-8 rounded-xl bg-navy-800/40 border border-golden/20 hover:border-golden/50 transition-all"
                    >
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-golden text-lg" aria-hidden="true">★</span>
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-base text-cream/85 leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </p>

                      {/* Client Info */}
                      <div>
                        <p className="text-golden font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-cream/60">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}

                  {/* Duplicated for seamless loop */}
                  {[
                    {
                      name: 'Priya & Arjun',
                      role: 'Wedding Couple',
                      text: 'EVR Productions captured every magical moment of our wedding day with such elegance and authenticity. We couldn\'t be happier with the final photos!',
                      rating: 5,
                    },
                    {
                      name: 'Sneha Sharma',
                      role: 'Baby Shower Client',
                      text: 'The team\'s professionalism and creative vision transformed our baby shower into a beautiful memory. Highly recommended!',
                      rating: 5,
                    },
                    {
                      name: 'Rohan & Divya',
                      role: 'Pre-Wedding Shoot',
                      text: 'From concept to execution, EVR Productions made us feel comfortable and confident. The results are beyond our expectations.',
                      rating: 5,
                    },
                    {
                      name: 'Aisha Khan',
                      role: 'Portrait Client',
                      text: 'A true professional! The attention to detail and passion for photography really shows in every frame. Worth every moment!',
                      rating: 5,
                    },
                    {
                      name: 'Vikram & Neha',
                      role: 'Haldi Ceremony',
                      text: 'The energy and warmth captured in our haldi photos is incredible. EVR Productions knows how to bring joy to life!',
                      rating: 5,
                    },
                    {
                      name: 'Sarita Patel',
                      role: 'Family Portrait',
                      text: 'Working with EVR was a delightful experience. They made our family shoot feel natural and relaxed. Exceptional work!',
                      rating: 5,
                    },
                  ].map((testimonial, idx) => (
                    <div
                      key={`duplicate-${idx}`}
                      className="flex-shrink-0 w-80 p-8 rounded-xl bg-navy-800/40 border border-golden/20 hover:border-golden/50 transition-all"
                      aria-hidden="true"
                    >
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-golden text-lg">★</span>
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-base text-cream/85 leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </p>

                      {/* Client Info */}
                      <div>
                        <p className="text-golden font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-cream/60">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Fade edges for visual effect */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-navy-900 to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-navy-900 to-transparent pointer-events-none z-10" />

              {/* Pause indicator - visible when paused */}
              {testimonialPaused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-cream/60 pointer-events-none z-20 bg-navy-900/80 px-3 py-1 rounded-full"
                >
                  ⏸ Paused
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-4"
            >
              Our Services
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: HOME_SERVICES[0].title,
                icon: FaRing,
                description: HOME_SERVICES[0].description,
                label: 'View wedding photography services',
              },
              { 
                title: HOME_SERVICES[1].title,
                icon: FaCamera,
                description: HOME_SERVICES[1].description,
                label: 'View portrait session services',
              },
              { 
                title: HOME_SERVICES[2].title,
                icon: FaCalendarAlt,
                description: HOME_SERVICES[2].description,
                label: 'View event photography services',
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 rounded-xl bg-navy-800/30 hover:bg-navy-800/50 transition-all"
                role="article"
                aria-label={service.label}
              >
                <service.icon className="text-4xl mb-4 text-golden mx-auto" aria-hidden="true" />
                <h3 className="text-xl font-bold text-golden mb-3">{service.title}</h3>
                <p className="text-cream/70">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/services'}
              className="btn-primary"
              aria-label="View all service packages and pricing"
            >
              View All Packages & Pricing
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-navy-900 to-navy-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-6"
          >
            Ready to Capture Your Moment?
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-cream/80 mb-8 max-w-2xl mx-auto"
          >
            Let's create something beautiful together. Contact us today to discuss your photography needs.
          </motion.p>
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </motion.main>
  );
}
