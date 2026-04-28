export type PriceRange = '$' | '$$' | '$$$';

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CakeShop {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  description: string;
  imageUrl: string;
  specialties: string[];
  priceRange: PriceRange;
  openingHours: string;
  phone: string;
  website: string;
  featured: boolean;
  reviews: Review[];
  createdAt: string;
  lat?: number;
  lng?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImageUrl: string;
  tags: string[];
  publishedAt: string;
  createdAt: string;
}
