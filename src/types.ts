export type ScreenId = 'discover' | 'detail' | 'cart' | 'profile' | 'custom_html';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  tag?: string;
  description: string;
  features: string[];
  colors: { name: string; hex: string }[];
  sizes?: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  itemsCount: number;
  total: number;
  status: 'In Transit' | 'Delivered' | 'Processing';
  estimatedDelivery: string;
  thumbnailUrl: string;
}

export interface ExtractedImage {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export interface CustomScreenData {
  id: string;
  title: string;
  description: string;
  rawHtml: string;
  extractedImages: ExtractedImage[];
  themeColor: string;
}
