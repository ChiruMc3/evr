import { motion } from 'framer-motion';

const points = [
  { icon: '📸', title: '5+ Years Experience', desc: 'Hundreds of successful shoots across India.' },
  { icon: '🎨', title: 'Creative Vision', desc: 'Every frame is crafted as a work of art.' },
  { icon: '⚡', title: 'Quick Delivery', desc: 'Sneak peeks in 48 hrs, full gallery in 2-3 weeks.' },
  { icon: '💎', title: 'Premium Quality', desc: 'Top-tier gear and meticulous post-processing.' },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 lg:py-24 bg-neutral-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-center mb-3">
          Why Choose <span className="text-yellow-500">Us</span>
        </h2>
        <p className="text-center text-neutral-400 max-w-xl mx-auto mb-12 text-base sm:text-lg">
          What sets EVR Photography apart
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {points.map((p, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/50 p-6 sm:p-8 text-center shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-3xl sm:text-4xl block mb-4">{p.icon}</span>
              <h3 className="font-['Playfair_Display'] text-sm sm:text-base mb-2">{p.title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
