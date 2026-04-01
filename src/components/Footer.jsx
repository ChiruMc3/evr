import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import SITE_CONFIG from '../config/siteConfig';

function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-golden/20 py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold text-golden-light hover:text-golden">
            <FiCamera className="text-golden" />
            {SITE_CONFIG.brand.name}
          </Link>
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            {['Portfolio', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-cream/60 hover:text-golden transition-colors duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.brand.name}. All rights reserved.
          </p>
        </div>

        {/* Brand Section */}
        <div className="text-center my-12 pt-12 border-t border-golden/20">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gradient mb-2">
            {SITE_CONFIG.brand.name}
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto">
            {SITE_CONFIG.brand.description}
          </p>
        </div>

        {/* Contact Info - Using SITE_CONFIG */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[
            {
              label: 'Phone',
              value: SITE_CONFIG.contact.phone,
              href: SITE_CONFIG.getPhoneLink(SITE_CONFIG.contact.phone),
            },
            {
              label: 'Email',
              value: SITE_CONFIG.getEmailDisplay(),
              href: SITE_CONFIG.getEmailLink(),
            },
            {
              label: 'Address',
              value: SITE_CONFIG.contact.address,
              href: null,
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <p className="text-sm text-cream/70 mb-1">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-golden font-semibold hover:text-golden/80 transition-colors"
                  aria-label={item.label}
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-golden font-semibold">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
