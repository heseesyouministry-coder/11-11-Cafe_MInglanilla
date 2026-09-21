import { FeaturedMenuItem, GalleryImage } from '../types';

export const FEATURED_ITEMS: FeaturedMenuItem[] = [
  {
    id: 'spanish-latte',
    name: 'Spanish Latte',
    price: 150,
    description: 'Double shot of rich espresso balanced with sweet condensed milk and velvety textured whole milk.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80',
    tag: 'Signature',
  },
  {
    id: 'matcha-cloud',
    name: 'Matcha Cloud',
    price: 180,
    description: 'Ceremonial Uji matcha whisked fresh, poured over oat milk and crowned with silky cold fruit cloud foam.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1000&q=80',
    tag: 'Guest Favorite',
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    price: 160,
    description: 'Fresh steamed milk stained with dark roast espresso, vanilla bean, and a buttery house caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=1000&q=80',
    tag: 'Classic',
  },
  {
    id: 'burnt-cheesecake',
    name: 'Burnt Cheesecake',
    price: 140,
    description: 'Basque-style caramelized golden exterior revealing a decadent, melt-in-your-mouth creamy center.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80',
    tag: 'Baked Fresh',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gallery-1',
    title: 'The Morning Pour',
    caption: 'Silky espresso crema with hand-poured heart latte art served in warm ceramic.',
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85',
    tag: 'Coffee',
  },
  {
    id: 'gallery-2',
    title: 'Natural Light & Greenery',
    caption: 'Sunlit timber tables and indoor greenery designed for slow mornings and quiet reads.',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85',
    tag: 'Space',
  },
  {
    id: 'gallery-3',
    title: 'Quiet Study Nook',
    caption: 'Thoughtfully placed power outlets, high-speed WiFi, and warm ambient desk lighting.',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    tag: 'Focus',
  },
  {
    id: 'gallery-4',
    title: 'Layered Iced Matcha',
    caption: 'Whisked organic matcha green tea floating on cold milk for slow afternoon sips.',
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=85',
    tag: 'Craft',
  },
  {
    id: 'gallery-5',
    title: 'Basque Pastry Moments',
    caption: 'Caramelized burnt cheesecake slices paired with fresh-pressed coffee.',
    url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=85',
    tag: 'Pastry',
  },
  {
    id: 'gallery-6',
    title: 'Late Night Sanctuary',
    caption: 'Soft lo-fi tones and cozy warm lighting open every night until 1:00 AM.',
    url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=85',
    tag: 'Atmosphere',
  },
  {
    id: 'gallery-7',
    title: 'Conversations at 11:11',
    caption: 'Friends sharing stories and comfortable pauses amidst the aroma of roasting beans.',
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
    tag: 'Community',
  },
];
