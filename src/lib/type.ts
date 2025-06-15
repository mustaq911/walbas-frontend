export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  basePrice: number;
  auctionStart: string;
  auctionEnd: string;
}

// Frontend representation with only necessary additions
export interface Product extends ApiProduct {
  status: 'active' | 'expired';
}

export interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  basePrice: number;
  auctionEnd: string;
  status: 'active' | 'expired';
}