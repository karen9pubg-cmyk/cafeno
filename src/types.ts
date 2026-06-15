/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'drinks' | 'bakery' | 'beans';
  subCategory: string; // e.g. "Espresso Bar", "Iced Drinks", "Artisan Bakery"
  price: number;
  image: string;
  rating: number;
  tags: string[]; // e.g. ["Best Seller", "Seasonal", "Vegan", "Gluten-Free"]
  isBestSeller?: boolean;
  isSeasonal?: boolean;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    caffeine: string; // e.g. "High", "Medium", "None"
  };
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string; // e.g. "Freelance Designer", "Graduate Student"
  rating: number; // 1-5 stars
  text: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'coffee' | 'interior' | 'moments';
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  price: number;
  spotsLeft: number;
  category: string; // e.g. "Workshop", "Social", "Music"
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize: 'small' | 'medium' | 'large';
  selectedMilk?: string; // e.g. "Oat Milk", "Almond Milk", "None"
  sweetnessLevel?: string; // e.g. "Regular", "Less Sweet", "No Sugar"
  specialNotes?: string;
}
