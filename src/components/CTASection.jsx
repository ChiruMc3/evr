import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="rounded-[32px] bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/50 p-10 sm:p-14 lg:p-20 text-center shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl mb-4">
              Ready to Tell Your <span className="text-yellow-500">Story</span>?
            </h2>
            <p className="text-neutral-400 max-w-lg mx-auto mb-8 text-base sm:text-lg">
              Let&apos;s create something beautiful together
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-yellow-500 text-black font-semibold text-sm hover:bg-yellow-400 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 shadow-lg shadow-yellow-500/20"
              >
                Get in Touch
              </Link>
              <a
                href="https://wa.me/918143016498"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm hover:border-yellow-500 hover:text-yellow-500 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
