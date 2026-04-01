/**
 * DEPRECATED: Use siteConfig.ts instead
 * Kept for backward compatibility
 */

import SITE_CONFIG from './siteConfig';

export const CONTACT_INFO = SITE_CONFIG.contact;
export const SOCIAL_LINKS = SITE_CONFIG.getEnabledSocialLinks();
export const getWhatsAppLink = SITE_CONFIG.getWhatsAppLink;
export const getEmailLink = SITE_CONFIG.getEmailLink;
export const WHATSAPP_TEMPLATES = SITE_CONFIG.whatsappTemplates;
