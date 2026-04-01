/**
 * Centralized site configuration
 * Single source of truth for all business data
 */

export const SITE_CONFIG = {
  // Brand Name - Standardized everywhere
  brand: {
    name: 'EVR Productions',
    tagline: 'Capturing life\'s most beautiful moments with elegance and authenticity',
    description:
      'Award-winning photography services specializing in weddings, events, and portraits.',
  },

  // Contact Information - UPDATED ADDRESS
  contact: {
    // Primary phone
    phone: '+91 99517 18375',
    // Secondary/WhatsApp phone label value
    whatsappNumber: '+91 95508 23413',
    // Required exact WhatsApp base link
    whatsappLinkBase: 'https://wa.me/919951718375',
    address: 'Hyderabad, India',

    // Email obfuscated parts (do not render plain literal directly in UI)
    emailUser: 'evrproductions',
    emailDomain: 'gmail.com',
  },

  // Social Media Links
  social: {
    instagram: {
      name: 'Instagram',
      url: 'https://instagram.com/evr.productionss',
      enabled: true,
    },
    facebook: {
      name: 'Facebook',
      url: 'https://facebook.com/evrproductions',
      enabled: false,
    },
    youtube: {
      name: 'YouTube',
      url: 'https://youtube.com/@evrproductions',
      enabled: false,
    },
    pinterest: {
      name: 'Pinterest',
      url: 'https://pinterest.com/evrproductions',
      enabled: false,
    },
  },

  // Get enabled social links only
  getEnabledSocialLinks: () => {
    return Object.values(SITE_CONFIG.social)
      .filter((link) => link.enabled && link.url)
      .map(({ name, url }) => ({ name, url }));
  },

  // WhatsApp Message Templates
  whatsappTemplates: {
    general:
      'Hi! I\'m interested in your photography services. Can you please provide more information?',
    wedding:
      'Hi! I\'m interested in wedding photography. Can you share your wedding package details?',
    preWedding: 'Hi! I\'d like to inquire about pre-wedding shoot services.',
    babyShower: 'Hi! I\'m interested in baby shower photography.',
    event: 'Hi! I\'d like to discuss event photography for my upcoming event.',
    portrait: 'Hi! I\'m interested in portrait photography services.',
    customPackage: 'Hi! I\'d like to inquire about a custom photography package.',
  },

  // Helper: Get WhatsApp link
  getWhatsAppLink: (service: keyof typeof SITE_CONFIG.whatsappTemplates = 'general', formData?: any) => {
    const base = SITE_CONFIG.contact.whatsappLinkBase;
    const message =
      formData
        ? [
            'Hello EVR Productions,',
            '',
            'New Inquiry Details:',
            `Name: ${formData.name || ''}`,
            `Email: ${formData.email || ''}`,
            `Service: ${formData.service || ''}`,
            `Message: ${formData.message || ''}`,
          ].join('\n')
        : (SITE_CONFIG.whatsappTemplates[service] || SITE_CONFIG.whatsappTemplates.general);

    const separator = base.includes('?') ? '&' : '?';
    return `${base}${separator}text=${encodeURIComponent(message)}`;
  },

  // Helper: Get email link
  getEmailLink: (subject = 'Photography Inquiry') => {
    return `mailto:${SITE_CONFIG.getEmailAddress()}?subject=${encodeURIComponent(subject)}`;
  },

  // Helper: Get phone link
  getPhoneLink: (rawPhone = SITE_CONFIG.contact.phone) => {
    const digits = String(rawPhone).replace(/\D/g, '');
    return `tel:+${digits}`;
  },

  getEmailAddress: () => {
    return `${SITE_CONFIG.contact.emailUser}@${SITE_CONFIG.contact.emailDomain}`;
  },

  getEmailDisplay: () => {
    return `${SITE_CONFIG.contact.emailUser}@${SITE_CONFIG.contact.emailDomain}`;
  },
};

export default SITE_CONFIG;
