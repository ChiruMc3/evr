const SUPABASE_BASE = 'https://hakpiwzfbwzjteaysete.supabase.co/storage/v1/object/public/evr_assets';

const generateImagesByCategory = () => {
  const categories = {
    babyShowers: [],
    heroImages: [],
    modelShoots: [],
    preWedding: [],
    podcasts: [],
    weddings: [],
    haldi: [],
    vratham: [],
    pooja: [],
  };

  // b1 to b11 - Baby Showers (11 images) - WebP format
  for (let i = 1; i <= 11; i++) {
    categories.babyShowers.push(`${SUPABASE_BASE}/b${i}.webp`);
  }

  // herobg - Hero Image (1 image) - WebP format
  categories.heroImages.push(`${SUPABASE_BASE}/herobg.webp`);

  // m1 to m6 - Model Shoots (6 images) - WebP format
  const modelFiles = ['m1.webp', 'm2.webp', 'm3.webp', 'm4.webp', 'm5.webp', 'm6.webp'];
  modelFiles.forEach(file => {
    categories.modelShoots.push(`${SUPABASE_BASE}/${file}`);
  });

  // pw11 to pw44 - Pre Wedding (34 images) - WebP format
  for (let i = 10; i <= 44; i++) {
    categories.preWedding.push(`${SUPABASE_BASE}/pw${i}.webp`);
  }

  // New categories - add images when available
  // podcasts: podcast cover images, studio shots
  // weddings: wedding ceremony, reception, moments
  // haldi: haldi ceremony, turmeric rituals
  // vratham: religious ceremony coverage
  // pooja: prayer ceremony, temple events

  return categories;
};

export const imageCategories = generateImagesByCategory();

// Debug logging
// if (typeof window !== 'undefined') {
//   console.log('📸 Image Categories Loaded:', {
//     babyShowers: imageCategories.babyShowers.length,
//     heroImages: imageCategories.heroImages.length,
//     modelShoots: imageCategories.modelShoots.length,
//     preWedding: imageCategories.preWedding.length,
//     podcasts: imageCategories.podcasts.length,
//     weddings: imageCategories.weddings.length,
//     haldi: imageCategories.haldi.length,
//     vratham: imageCategories.vratham.length,
//     pooja: imageCategories.pooja.length,
//     total: Object.values(imageCategories).reduce((sum, arr) => sum + arr.length, 0),
//   });
// }
