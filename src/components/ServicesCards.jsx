import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { packages } from '../data/services';

export default function ServicesCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
      {packages.map((pkg, i) => (
        <motion.div
          key={pkg.name}
          className={`relative rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 bg-neutral-900/80 backdrop-blur-xl border shadow-xl ${
            pkg.popular
              ? 'border-yellow-500/60 shadow-yellow-500/5'
              : 'border-neutral-800/50 hover:border-neutral-700'
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
        >
          {pkg.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-semibold px-5 py-1 rounded-full shadow-lg shadow-yellow-500/20">
              Most Popular
            </span>
          )}
          <h3 className="font-['Playfair_Display'] text-xl mb-1">{pkg.name}</h3>
          <p className="text-3xl font-bold text-yellow-500 mb-6">{pkg.price}</p>
          <ul className="text-left space-y-2.5 mb-8">
            {pkg.features.map((f) => (
              <li key={f} className="text-neutral-400 text-sm flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5 flex-shrink-0">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className={`inline-flex w-full justify-center items-center py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
              pkg.popular
                ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20'
                : 'border border-white/20 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20'
            }`}
          >
            Choose Plan
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
