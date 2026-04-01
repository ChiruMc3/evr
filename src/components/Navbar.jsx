import { useState, useEffect, memo, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera } from 'react-icons/fi';

const links = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const ticking = useRef(false);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        ticking.current = false;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500
        ${scrolled
          ? 'h-16 bg-navy-dark/90 backdrop-blur-lg shadow-lg shadow-black/20'
          : 'h-20 bg-transparent'
        }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo with icon */}
        <Link to="/" className="flex items-center gap-2 text-xl font-serif font-bold tracking-wide text-golden-light hover:text-golden transition-colors">
          <FiCamera className="text-golden" />
          EVR Productions
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { to: '/', label: 'HOME' },
            { to: '/portfolio', label: 'PORTFOLIO' },
            { to: '/services', label: 'SERVICES' },
            { to: '/about', label: 'ABOUT' },
            { to: '/contact', label: 'CONTACT' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-cream/80 hover:text-golden transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-golden transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-golden transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-golden transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-full bg-navy-dark/95 backdrop-blur-xl border-t border-golden/10 md:hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-8">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`text-base font-medium uppercase tracking-widest transition-colors
                      ${pathname === to ? 'text-golden' : 'text-cream/70 hover:text-golden-light'}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default memo(Navbar);
