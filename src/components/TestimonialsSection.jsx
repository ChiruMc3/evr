import { motion } from 'framer-motion';
import testimonials from '../data/testimonials';

function Initials({ name }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-500 text-sm font-bold flex-shrink-0">
      {initials}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-center mb-3">
          Client <span className="text-yellow-500">Love</span>
        </h2>
        <p className="text-center text-neutral-400 max-w-xl mx-auto mb-12 text-base sm:text-lg">
          Hear what our couples and clients say
        </p>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              className="min-w-[80vw] sm:min-w-[65vw] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/50 p-6 shadow-xl flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3 text-yellow-500 text-sm">
                {'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}
              </div>

              <p className="italic text-neutral-400 leading-relaxed mb-5 text-sm sm:text-base flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <footer className="flex items-center gap-3">
                <Initials name={t.name} />
                <div>
                  <strong className="text-white block text-sm">{t.name}</strong>
                  <span className="text-yellow-500 text-xs">{t.event}</span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
