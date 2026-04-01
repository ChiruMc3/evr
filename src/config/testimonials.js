export const EXTENDED_TESTIMONIALS = [
  // Weddings
  {
    name: 'Priya & Arjun',
    role: 'Wedding Couple',
    text: 'EVR Productions captured every magical moment of our wedding day with such elegance and authenticity. We couldn\'t be happier with the final photos!',
    rating: 5,
    category: 'wedding',
  },
  {
    name: 'Sarah & Michael',
    role: 'Destination Wedding',
    text: 'They flew to Bangkok for our destination wedding and handled the logistics perfectly. The photos are absolutely stunning—like looking through a dream.',
    rating: 5,
    category: 'wedding',
  },
  {
    name: 'Rajesh & Anjali',
    role: 'Traditional Wedding',
    text: 'From mehendi to reception, every moment was captured beautifully. The team was discreet, professional, and made us feel at ease throughout the day.',
    rating: 5,
    category: 'wedding',
  },

  // Pre-Wedding
  {
    name: 'Rohan & Divya',
    role: 'Pre-Wedding Shoot',
    text: 'From concept to execution, EVR Productions made us feel comfortable and confident. The results are beyond our expectations. Worth every penny!',
    rating: 5,
    category: 'preWedding',
  },
  {
    name: 'Ananya & Dev',
    role: 'Pre-Wedding Shoot',
    text: 'They suggested the most beautiful locations and made the entire shoot feel natural and fun. We got the romance and chemistry we wanted in every frame.',
    rating: 5,
    category: 'preWedding',
  },

  // Baby Showers
  {
    name: 'Sneha Sharma',
    role: 'Baby Shower Client',
    text: 'The team\'s professionalism and creative vision transformed our baby shower into a beautiful memory. Highly recommended!',
    rating: 5,
    category: 'babyShower',
  },
  {
    name: 'Neha Gupta',
    role: 'Baby Shower & Maternity',
    text: 'We did both maternity photos and baby shower coverage. They made me feel confident and beautiful during pregnancy. The photos are treasured keepsakes!',
    rating: 5,
    category: 'babyShower',
  },

  // Events
  {
    name: 'Vikram & Neha',
    role: 'Haldi Ceremony',
    text: 'The energy and warmth captured in our haldi photos is incredible. EVR Productions knows how to bring joy to life!',
    rating: 5,
    category: 'event',
  },
  {
    name: 'Pooja Malhotra',
    role: 'Corporate Event',
    text: 'Professional, prompt, and delivered amazing shots for our company gala. They captured the essence of the event perfectly.',
    rating: 5,
    category: 'event',
  },

  // Portraits
  {
    name: 'Aisha Khan',
    role: 'Portrait Client',
    text: 'A true professional! The attention to detail and passion for photography really shows in every frame. Worth every moment!',
    rating: 5,
    category: 'portrait',
  },
  {
    name: 'Sarita Patel',
    role: 'Family Portrait',
    text: 'Working with EVR was a delightful experience. They made our family shoot feel natural and relaxed. Exceptional work!',
    rating: 5,
    category: 'portrait',
  },

  // Model Shoots
  {
    name: 'Zara Singh',
    role: 'Model Portfolio',
    text: 'They understood my vision for my portfolio and delivered stunning shots. Professional direction, amazing photos. Definitely booking again!',
    rating: 5,
    category: 'modelShoot',
  },
];

// Shuffle testimonials for variety
export const getRandomTestimonials = (count = 6, category = null) => {
  const filtered = category
    ? EXTENDED_TESTIMONIALS.filter((t) => t.category === category)
    : EXTENDED_TESTIMONIALS;

  return filtered.sort(() => Math.random() - 0.5).slice(0, count);
};
