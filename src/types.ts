export interface FeaturedMenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tag?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  caption: string;
  url: string;
  aspect?: string;
  tag?: string;
}
