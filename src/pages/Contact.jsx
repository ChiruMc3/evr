import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaPinterest, FaSpinner } from 'react-icons/fa';
import { useAppContext } from '../hooks/useAppContext';
import SITE_CONFIG from '../config/siteConfig';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Map social platform names to icons
const SOCIAL_ICONS = {
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  YouTube: FaYoutube,
  Pinterest: FaPinterest,
};

// Canonical WhatsApp number for chat + send inquiry
const WHATSAPP_INQUIRY_NUMBER = '+91 99517 18375';
const getInquiryWhatsAppBase = () => `https://wa.me/${WHATSAPP_INQUIRY_NUMBER.replace(/\D/g, '')}`;

export default function Contact() {
  const { formState, updateFormState, resetFormState } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [touched, setTouched] = useState({
    service: false,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formState.submitError) {
      updateFormState({ submitError: null });
    }
  };

  // Reset form after success
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      service: '',
      message: '',
    });
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      updateFormState({
        submitError: 'Please enter your full name.',
        isSubmitting: false,
      });
      return false;
    }

    if (!formData.email.trim()) {
      updateFormState({
        submitError: 'Please enter your email address.',
        isSubmitting: false,
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      updateFormState({
        submitError: 'Please enter a valid email address.',
        isSubmitting: false,
      });
      return false;
    }

    if (!formData.service) {
      updateFormState({
        submitError: 'Please select a service type.',
        isSubmitting: false,
      });
      return false;
    }

    if (!formData.message.trim()) {
      updateFormState({
        submitError: 'Please enter your message.',
        isSubmitting: false,
      });
      return false;
    }

    return true;
  };

  const buildWhatsAppUrl = () => {
    const serviceLabelMap = {
      wedding: 'Wedding Photography',
      preWedding: 'Pre-Wedding Shoot',
      babyShower: 'Baby Shower',
      event: 'Event Photography',
      portrait: 'Portrait Session',
      customPackage: 'Custom Package',
    };

    const text = [
      'Hello EVR Productions,',
      '',
      'New Inquiry Details:',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Service: ${serviceLabelMap[formData.service] || formData.service}`,
      `Message: ${formData.message}`,
    ].join('\n');

    return `${getInquiryWhatsAppBase()}?text=${encodeURIComponent(text)}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    updateFormState({ isSubmitting: true, submitError: null, submitSuccess: false });

    try {
      const whatsappUrl = buildWhatsAppUrl();
      const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      if (!popup) {
        // Fallback when popup is blocked
        window.location.href = whatsappUrl;
      }

      updateFormState({
        isSubmitting: false,
        submitSuccess: true,
        submitError: null,
      });

      clearForm();
      setTouched({ service: false });
      setTimeout(() => resetFormState(), 3000);
    } catch (error) {
      updateFormState({
        isSubmitting: false,
        submitSuccess: false,
        submitError: `Unable to open WhatsApp. Please contact us at ${SITE_CONFIG.contact.email}`,
      });
    }
  };

  // Prevent stale disabled state after HMR/navigation
  useEffect(() => {
    resetFormState();
  }, [resetFormState]);

  const enabledSocial = SITE_CONFIG.getEnabledSocialLinks();

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-6 bg-gradient-to-b from-navy-900 to-navy-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 max-w-2xl mx-auto text-lg"
          >
            Ready to book or have questions? We'd love to hear from you. Get in touch with us today.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: FaPhone,
                label: 'Phone',
                value: SITE_CONFIG.contact.phone,
                href: SITE_CONFIG.getPhoneLink(),
              },
              {
                icon: FaEnvelope,
                label: 'Email',
                value: SITE_CONFIG.contact.email,
                href: SITE_CONFIG.getEmailLink(),
              },
              {
                icon: FaMapMarkerAlt,
                label: 'Address',
                value: SITE_CONFIG.contact.address,
                href: null,
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-lg bg-navy-800/30 border border-golden/20 hover:border-golden/50 transition-all text-center ${
                    item.href ? 'cursor-pointer hover:bg-navy-800/50' : ''
                  }`}
                  onClick={() => item.href && window.open(item.href)}
                  role={item.href ? 'button' : 'region'}
                  tabIndex={item.href ? 0 : -1}
                  onKeyDown={(e) => {
                    if (item.href && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      window.open(item.href);
                    }
                  }}
                  aria-label={item.label}
                >
                  <IconComponent className="text-3xl mb-2 text-golden mx-auto" />
                  <p className="text-sm text-cream/70 mb-2">{item.label}</p>
                  <p className="text-golden font-semibold text-lg break-all">{item.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form - FIXED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy-800/30 border border-golden/20 rounded-xl p-8 md:p-12 relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-2">
              Send us a Message
            </h2>
            <p className="text-cream/70 mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              className="space-y-6 relative z-20 pointer-events-auto"
            >
              {/* Name Field - FIXED */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-cream mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  aria-required="true"
                  aria-label="Full Name"
                  disabled={formState.isSubmitting}
                  autoComplete="off"
                  style={fieldStyle}
                  className="w-full px-4 py-3 bg-navy-600 border-2 border-golden/40 rounded-lg text-white placeholder-gray-300 cursor-text focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-20 pointer-events-auto"
                />
              </div>

              {/* Email Field - FIXED */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-cream mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  aria-required="true"
                  aria-label="Email Address"
                  disabled={formState.isSubmitting}
                  autoComplete="off"
                  style={fieldStyle}
                  className="w-full px-4 py-3 bg-navy-600 border-2 border-golden/40 rounded-lg text-white placeholder-gray-300 cursor-text focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-20 pointer-events-auto"
                />
              </div>

              {/* Service Select - FIXED */}
              <div>
                <label htmlFor="contact-service" className="block text-sm font-semibold text-cream mb-2">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  onBlur={() => setTouched((prev) => ({ ...prev, service: true }))}
                  required
                  aria-required="true"
                  aria-label="Service Type"
                  aria-invalid={touched.service && !formData.service ? 'true' : 'false'}
                  disabled={formState.isSubmitting}
                  autoComplete="off"
                  style={fieldStyle}
                  className="w-full px-4 py-3 bg-navy-600 border-2 border-golden/40 rounded-lg text-white cursor-pointer focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none relative z-20 pointer-events-auto"
                >
                  <option value="" disabled className="bg-navy-800 text-white">Select a service...</option>
                  <option value="wedding" className="bg-navy-800 text-white">Wedding Photography</option>
                  <option value="preWedding" className="bg-navy-800 text-white">Pre-Wedding Shoot</option>
                  <option value="babyShower" className="bg-navy-800 text-white">Baby Shower</option>
                  <option value="event" className="bg-navy-800 text-white">Event Photography</option>
                  <option value="portrait" className="bg-navy-800 text-white">Portrait Session</option>
                  <option value="customPackage" className="bg-navy-800 text-white">Custom Package</option>
                </select>
              </div>

              {/* Message Field - FIXED */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-cream mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project, event date, and any specific requirements..."
                  required
                  aria-required="true"
                  aria-label="Message"
                  rows="6"
                  disabled={formState.isSubmitting}
                  autoComplete="off"
                  style={fieldStyle}
                  className="w-full px-4 py-3 bg-navy-600 border-2 border-golden/40 rounded-lg text-white placeholder-gray-300 cursor-text focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed relative z-20 pointer-events-auto"
                />
              </div>

              {/* Error Message */}
              {formState.submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-start gap-3"
                  role="alert"
                  aria-live="assertive"
                >
                  <span className="text-lg flex-shrink-0 mt-0.5">⚠️</span>
                  <span>{formState.submitError}</span>
                </motion.div>
              )}

              {/* Success Message */}
              {formState.submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-start gap-3"
                  role="status"
                  aria-live="polite"
                >
                  <span className="text-lg flex-shrink-0 mt-0.5">✓</span>
                  <span>Thank you for your inquiry! We'll get back to you within 24 hours.</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formState.isSubmitting}
                whileHover={{ scale: formState.isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: formState.isSubmitting ? 1 : 0.95 }}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
              >
                {formState.isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Inquiry'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Alternative Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-golden/20"
          >
            <h3 className="text-lg font-semibold text-golden mb-6">Quick Contact Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.a
                href={getInquiryWhatsAppBase()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30 hover:border-green-500/60 transition-all"
                aria-label="Contact us on WhatsApp"
              >
                <FaWhatsapp className="text-2xl text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-cream/70">Chat on WhatsApp</p>
                  <p className="text-green-400 font-semibold">+91 99517 18375</p>
                </div>
              </motion.a>

              <motion.a
                href={SITE_CONFIG.getEmailLink()}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/60 transition-all"
                aria-label="Contact us via email"
              >
                <FaEnvelope className="text-2xl text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-cream/70">Send Email</p>
                  <p className="text-blue-400 font-semibold">24h response</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      {enabledSocial && enabledSocial.length > 0 && (
        <section className="py-16 px-6 bg-navy-800/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold text-golden mb-8"
            >
              Follow Us
            </motion.h3>
            <div className="flex gap-4 justify-center flex-wrap">
              {enabledSocial.map((link, idx) => {
                const IconComponent = SOCIAL_ICONS[link.name] || FaInstagram;
                return (
                  <motion.a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-navy-700/50 border border-golden/30 hover:border-golden/60 flex items-center justify-center text-lg text-golden transition-all"
                    aria-label={`Follow us on ${link.name}`}
                    title={link.name}
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </motion.main>
  );
}

// Force readable field text/caret and override browser autofill white overlay
const fieldStyle = {
  color: '#ffffff',
  WebkitTextFillColor: '#ffffff',
  caretColor: '#ffffff',
  backgroundColor: 'rgba(63, 82, 121, 1)',
  WebkitBoxShadow: '0 0 0 1000px rgba(63, 82, 121, 1) inset',
  boxShadow: '0 0 0 1000px rgba(63, 82, 121, 1) inset',
  transition: 'background-color 9999s ease-in-out 0s',
};
