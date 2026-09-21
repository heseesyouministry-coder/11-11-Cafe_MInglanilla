export type DrinkCategory = 
  | 'all'
  | 'espresso'
  | 'blended-coffee'
  | 'blended-non-coffee'
  | 'savory'
  | 'pastries';

export interface Drink3DConfig {
  cupType: 'paper' | 'glass' | 'mug';
  cupColor: string;
  sleeveColor: string;
  liquidColor: string;
  foamColor?: string;
  hasLatteArt: boolean;
  latteArtType?: 'heart' | 'rosetta' | 'cloud' | 'mocha-swirl' | 'matcha-layer';
  hasIce: boolean;
  hasSteam: boolean;
  toppingColor?: string;
  toppingType?: 'none' | 'cacao-dust' | 'oreo-crumbs' | 'biscoff-drizzle' | 'caramel-drizzle' | 'fruit-puree';
}

export interface MenuItem {
  id: string;
  name: string;
  category: DrinkCategory;
  price: number;
  description: string;
  image: string;
  driveImageId?: string;
  driveThumbnailUrl?: string;
  fallbackImage?: string;
  tag?: string;
  isSignature?: boolean;
  isPopular?: boolean;
  temperature?: ('Hot' | 'Iced')[];
  rating: number;
  reviewsCount: number;
  calories?: string;
  caffeineLevel?: 'None' | 'Low' | 'Medium' | 'High';
  tastingNotes?: string[];
  config3D: Drink3DConfig;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  temperature: 'Hot' | 'Iced';
  sweetness: '0%' | '25%' | '50%' | '75%' | '100%';
  milkChoice: 'Whole Milk' | 'Oat Milk (+₱25)' | 'Almond Milk (+₱25)' | 'Soy Milk (+₱20)';
  specialInstructions?: string;
}

export interface WishItem {
  id: string;
  name: string;
  text: string;
  timestamp: string;
  category: 'Career' | 'Love' | 'Peace' | 'Studies' | 'Creativity';
  likes: number;
}

export interface ReservationDetails {
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  tableType: 'Quiet Study Nook' | 'Window Sofa' | 'Main Cafe Table' | 'Outdoor Balcony';
  notes?: string;
}
