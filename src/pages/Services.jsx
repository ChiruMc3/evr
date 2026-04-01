import { useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const WHATSAPP_INQUIRE_NUMBER = '919951718375';

const ServicePackage = memo(function ServicePackage({ name, features }) {
  const handleWhatsApp = useCallback(() => {
    const message = `Hi! I'm interested in the ${name} package for EVR Productions.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_INQUIRE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-xl bg-navy-800/30 hover:bg-navy-800/50 transition-all border border-golden/20 hover:border-golden/50"
    >
      <h3 className="text-2xl font-ui font-bold text-golden mb-6">{name}</h3>
      
      <div className="mb-8">
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-cream/85 font-body">
              <span className="text-golden mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsApp}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full
                   bg-golden text-navy-900 font-ui font-bold
                   transition-all duration-300 ease-out
                   hover:bg-golden-dark hover:shadow-lg hover:shadow-golden/20"
      >
        <FaWhatsapp size={20} />
        Inquire Now
      </motion.button>
    </motion.div>
  );
});

const AddonCard = memo(function AddonCard({ title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl bg-navy-800/30 border border-golden/20 hover:border-golden/50 transition-all"
    >
      <h4 className="text-lg font-ui font-bold text-golden mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-cream/70 text-sm flex items-start gap-2 font-body">
            <span className="text-golden">+</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
});

function Services() {
  const packages = useMemo(() => [
    {
      name: 'Package A',
      features: [
        'Full day coverage (8 hours)',
        'Single camera operator',
        'Basic editing',
        'Digital files delivery',
      ],
    },
    {
      name: 'Package B',
      features: [
        'Full day coverage (12 hours)',
        'Dual camera operators',
        'Professional editing',
        '4K video quality',
        'Same day edit highlight',
      ],
    },
    {
      name: 'Package C',
      features: [
        'Multi-day coverage',
        'Three camera operators',
        'Premium editing suite',
        '4K + 8K video quality',
        'Cinematic color grading',
        'Motion graphics & effects',
        'USB & cloud delivery',
      ],
    },
  ], []);

  const addons = useMemo(() => [
    {
      title: 'Basic Add-ons',
      items: [
        'Pre-event shoot',
        'Highlight reel',
        'Additional operator',
      ],
    },
    {
      title: 'Premium Add-ons',
      items: [
        'Drone footage',
        'Cinematic color grading',
        'Motion graphics intro',
        'Extended edit (longer cut)',
      ],
    },
    {
      title: 'Professional Add-ons',
      items: [
        'Drone footage with transitions',
        'Custom opening sequence',
        'Live streaming setup',
        'Post-event photography album',
        'Soundscape design',
      ],
    },
  ], []);

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      <section className="py-10 md:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Packages Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-hero text-golden-light mb-4"
              >
                Our Service Packages
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-cream/70 font-body"
              >
                Choose the perfect package for your event
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <ServicePackage key={idx} {...pkg} />
              ))}
            </div>
          </div>

          {/* Add-ons Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-ui font-bold text-golden-light mb-4"
              >
                Add-ons & Extras
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-cream/70 font-body"
              >
                Enhance your package with premium add-ons
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {addons.map((addon, idx) => (
                <AddonCard key={idx} {...addon} />
              ))}
            </div>
          </div>

          {/* Custom Packages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy-800/40 rounded-xl p-8 md:p-12 text-center border-2 border-golden/40 mt-20 mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-ui font-bold text-golden mb-4">Custom Packages</h2>
            <p className="text-cream/85 font-body mb-8 max-w-2xl mx-auto">
              Need something specific? We create custom packages tailored to your event requirements and vision.
            </p>
            <motion.button
              onClick={() => {
                const message = 'I need a custom package for my event';
                const whatsappUrl = `https://wa.me/${WHATSAPP_INQUIRE_NUMBER}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full
                         bg-golden text-navy-900 font-ui font-bold text-base
                         transition-all duration-300 ease-out
                         hover:bg-golden-dark hover:shadow-lg hover:shadow-golden/20"
            >
              <FaWhatsapp size={20} />
              Contact Us on WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}

export default Services;
