export const METADATA = {
  site: {
    title: 'EVR Productions | Professional Photography Services',
    description:
      'Award-winning wedding, event, and portrait photography. Capture your life\'s beautiful moments with elegance and authenticity.',
    image: '/og-image.jpg',
    url: 'https://evrproductions.com',
    siteName: 'EVR Productions',
    locale: 'en_IN',
  },
  pages: {
    home: {
      title: 'EVR Productions | Professional Photography Services',
      description:
        'Capturing life\'s most beautiful moments with elegance and authenticity. Wedding photography, portraits, events.',
      path: '/',
    },
    portfolio: {
      title: 'Portfolio | EVR Productions',
      description:
        'Browse our stunning portfolio of wedding, event, and portrait photography. See our best work.',
      path: '/portfolio',
    },
    services: {
      title: 'Services & Pricing | EVR Productions',
      description:
        'Explore wedding photography packages, event coverage, portrait sessions, and custom packages with transparent pricing.',
      path: '/services',
    },
    about: {
      title: 'About Us | EVR Productions',
      description:
        '10+ years of photography expertise. Meet the creative team behind EVR Productions.',
      path: '/about',
    },
    contact: {
      title: 'Contact Us | EVR Productions',
      description:
        'Get in touch with EVR Productions for inquiries, bookings, and custom package requests. Quick response guaranteed.',
      path: '/contact',
    },
  },
  keywords: [
    'wedding photography',
    'event photography',
    'portrait photography',
    'professional photographer',
    'candid photography',
    'pre-wedding shoot',
    'baby shower photography',
    'family portraits',
  ],
};

// React Helmet helper
export const getMetaTags = (page) => {
  const pageData = METADATA.pages[page] || METADATA.pages.home;
  return {
    title: pageData.title,
    meta: [
      { name: 'description', content: pageData.description },
      { name: 'keywords', content: METADATA.keywords.join(', ') },
      { property: 'og:title', content: pageData.title },
      { property: 'og:description', content: pageData.description },
      { property: 'og:image', content: METADATA.site.image },
      { property: 'og:url', content: `${METADATA.site.url}${pageData.path}` },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageData.title },
      { name: 'twitter:description', content: pageData.description },
    ],
  };
};
