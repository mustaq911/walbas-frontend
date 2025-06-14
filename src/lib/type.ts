// src/lib/types.ts
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currentBid?: number;
  imageUrl: string;
  endTime: string;
  status: 'active' | 'sold' | 'expired';
  sellerId?: string;
  condition?: string;
  category?: string;
}

export interface Seller {
  name: string;
  rating: number;
  joinDate: string;
  avatar: string;
}