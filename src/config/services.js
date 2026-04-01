/**
 * Service packages and homepage service cards configuration
 * CRITICAL: HOME_SERVICES must be exported for Home.jsx
 */

export const SERVICES = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    icon: 'ring',
    shortDescription: 'Complete wedding day coverage capturing every magical moment from candid interactions to formal portraits.',
    fullDescription:
      'Comprehensive wedding photography services covering pre-wedding preparations, ceremony, and reception. We capture emotions, details, and candid moments that tell your unique love story.',
    packages: [
      {
        id: 'wedding-essential',
        name: 'Essential Wedding',
        price: '₹50,000',
        duration: '8 hours',
        includes: [
          'Full-day coverage (8 hours)',
          '2 photographers',
          'Digital photos (500+)',
          '1 USB with all high-res images',
          '30-day editing turnaround',
          'Wedding story video (3-5 min)',
        ],
      },
      {
        id: 'wedding-premium',
        name: 'Premium Wedding',
        price: '₹75,000',
        duration: '12 hours',
        popular: true,
        includes: [
          'Full-day coverage (12 hours)',
          '2-3 photographers',
          'Digital photos (800+)',
          'Premium photo album (40-50 pages)',
          '2 USB sets with all images',
          '20-day editing turnaround',
          'Wedding story video (5-7 min)',
          'Engagement session included',
        ],
      },
      {
        id: 'wedding-luxury',
        name: 'Luxury Wedding',
        price: '₹1,00,000+',
        duration: '16+ hours',
        includes: [
          'Multi-day coverage (Mehendi, Sangeet, Wedding)',
          '3-4 photographers',
          'Digital photos (1500+)',
          'Premium leather-bound album (60+ pages)',
          'Coffee table book edition',
          '3 USB sets with all images',
          '15-day editing turnaround',
          'Cinematic wedding film (15-20 min)',
          'Pre-wedding engagement shoot',
          'Drone photography',
          'Same-day edits at reception',
        ],
      },
    ],
  },
  {
    id: 'preWedding',
    title: 'Pre-Wedding Shoot',
    icon: 'camera',
    shortDescription: 'Capture your love story with scenic locations and professional styling guidance in a relaxed setting.',
    fullDescription:
      'Romantic pre-wedding shoots at scenic locations with personalized styling and direction. Perfect for engagement announcements and keeping cherished memories of your journey together.',
    packages: [
      {
        id: 'prewedding-standard',
        name: 'Pre-Wedding Shoot',
        price: '₹20,000 - ₹40,000',
        duration: '4-8 hours',
        includes: [
          '4-8 hours of coverage',
          '2 locations or outdoor setup',
          'Digital photos (200-400)',
          'Professional styling guidance',
          '15-day editing turnaround',
          'Highlight video (2-3 min)',
        ],
      },
    ],
  },
  {
    id: 'event',
    title: 'Event Coverage',
    icon: 'calendar',
    shortDescription: 'Professional coverage for all your special celebrations - baby showers, birthdays, corporate events, and more.',
    fullDescription:
      'From intimate baby showers to grand corporate galas, we capture the joy, energy, and special moments of your event with professionalism and creativity.',
    packages: [
      {
        id: 'baby-shower',
        name: 'Baby Shower Package',
        price: '₹15,000 - ₹25,000',
        duration: '4-6 hours',
        includes: [
          '4-6 hours coverage',
          '1-2 photographers',
          'Digital photos (150-250)',
          'Candid + posed shots',
          'Same-day digital delivery',
          'Highlight reel (1-2 min)',
        ],
      },
      {
        id: 'event-standard',
        name: 'Event Coverage (Standard)',
        price: '₹10,000 - ₹20,000',
        duration: '4-6 hours',
        includes: [
          '4-6 hours coverage',
          '1 photographer',
          'Digital photos (100-200)',
          'High-res images',
          '7-day turnaround',
        ],
      },
    ],
  },
  {
    id: 'portrait',
    title: 'Portrait Sessions',
    icon: 'user',
    shortDescription: 'Professional headshots, family portraits, and maternity photos in studio or outdoor settings.',
    fullDescription:
      'Personalized portrait sessions designed to bring out your best self. Perfect for family memories, professional headshots, maternity celebrations, and special milestones.',
    packages: [
      {
        id: 'portrait-session',
        name: 'Portrait Session',
        price: '₹8,000 - ₹15,000',
        duration: '2 hours',
        includes: [
          '2-hour session',
          '1 location or in-studio',
          'Digital photos (50-100)',
          'Professional retouching',
          'Print-ready files',
        ],
      },
    ],
  },
];

/**
 * Homepage service cards (short version)
 * Used in Home.jsx Services section
 * ✅ CRITICAL: This MUST be exported for Home.jsx line 7 import
 */
export const HOME_SERVICES = [
  {
    title: 'Wedding Photography',
    description:
      'Complete wedding day coverage capturing every magical moment, emotion, and celebration with artistic excellence.',
  },
  {
    title: 'Portrait Sessions',
    description:
      'Professional headshots and family portraits designed to showcase your best self in studio or outdoor environments.',
  },
  {
    title: 'Event Photography',
    description:
      'Comprehensive coverage of all your special occasions - from intimate gatherings to grand celebrations, we capture it all.',
  },
];

/**
 * Frequently Asked Questions about services
 */
export const SERVICE_FAQS = [
  {
    question: 'What is your booking process?',
    answer:
      'Simply fill out our inquiry form or contact us via WhatsApp. We\'ll discuss your requirements, availability, and provide a customized quote within 24 hours. A 30% advance payment secures your booking.',
  },
  {
    question: 'How soon can we get our photos?',
    answer:
      'Standard turnaround is 15-30 days depending on your package. We can also provide same-day edits for weddings and preview images within 24-48 hours.',
  },
  {
    question: 'Do you offer travel outside the city?',
    answer:
      'Yes, we cover destinations worldwide. Travel costs (flights, accommodation, transport) are additional and billed separately. Destination weddings are our specialty!',
  },
  {
    question: 'Can we request specific shots or locations?',
    answer:
      'Absolutely! We work with you before the event to plan shots, locations, and special moments you want captured. Your vision is our priority.',
  },
  {
    question: 'What happens if you get sick on the wedding day?',
    answer:
      'We have backup photographers who are fully trained and have worked with us for years. Your day will be covered professionally in any circumstance.',
  },
  {
    question: 'Do you offer videography?',
    answer:
      'Yes, we offer cinematic wedding films and event videos. This can be added to any package or booked separately.',
  },
  {
    question: 'Can we print photos later?',
    answer:
      'Yes! All packages include print-ready, high-resolution digital files. You can print anytime from any service. We also offer premium printing through our partners.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'Advance payments are non-refundable but can be transferred to another date within 1 year. If we cancel due to unforeseen circumstances, full refund is provided.',
  },
];
