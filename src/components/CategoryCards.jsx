import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const cats = [
  { label: 'Weddings', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', filter: 'weddings' },
  { label: 'Pre-weddings', img: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', filter: 'pre-weddings' },
  { label: 'Events', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', filter: 'events' },
  { label: 'Portraits', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', filter: 'portraits' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function CategoryCards() {
  return (
    <section id="next-section" className="py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="font-['Playfair_Display'] text-3xl md:text-4xl text-center mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What We <span className="text-yellow-500">Capture</span>
        </motion.h2>
        <motion.p
          className="text-center text-neutral-400 max-w-xl mx-auto mb-12 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Specializing in moments that matter most
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {cats.map((c, i) => (
            <motion.div
              key={c.filter}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link to={`/portfolio?cat=${c.filter}`} className="group block">
                <div className="rounded-2xl overflow-hidden bg-neutral-900/80 border border-neutral-800/50 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-yellow-500/10 group-hover:border-yellow-500/30">
                  <div className="overflow-hidden aspect-[3/4] relative">
                    <img
                      src={c.img}
                      alt={c.label}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-yellow-500 text-xs font-medium uppercase tracking-wider">Explore →</span>
                    </div>
                  </div>
                  <h3 className="text-center py-4 font-['Playfair_Display'] text-sm sm:text-base group-hover:text-yellow-500 transition-colors duration-300">
                    {c.label}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
