// src/components/product/ProductCard.tsx
"use client";

import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import CountdownTimer from './CountdownTimer';
import { ProductCardProps } from '@/lib/type';

export default function ProductCard({
  id,
  title,
  description,
  category,
  imageUrl,
  basePrice,
  auctionEnd,
  status
}: ProductCardProps) {
  const isAuctionEnded = status === 'expired';

  return (
    <div className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative aspect-square bg-gray-100">
        <Link href={`/product/${id}`} className="block h-full w-full">
          <SafeImage 
            src={imageUrl} 
            alt={title}
            className="group-hover:scale-105 transition-transform duration-300"
          />
          
          <span className={`absolute top-2 right-2 text-white px-2 py-1 rounded-md text-xs font-bold ${
            isAuctionEnded ? 'bg-red-500' : 'bg-green-500'
          }`}>
            {isAuctionEnded ? 'Auction Ended' : 'Live'}
          </span>
        </Link>
      </div>
      
      <div className="p-4">
        <span className="inline-block mb-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
          {category}
        </span>
        
        <Link href={`/product/${id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-indigo-600 transition">
            {title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {description}
          </p>
        </Link>
        
        <div className="space-y-1 mb-3">
          <p className="text-sm text-gray-500">Starting Price</p>
          <p className="text-xl font-bold text-gray-900">
            ${basePrice.toFixed(2)}
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-right w-full">
            <p className="text-xs text-gray-500">
              {isAuctionEnded ? 'Ended' : 'Ends in'}
            </p>
            <CountdownTimer endTime={auctionEnd} compact />
          </div>
        </div>
        
        <Link
          href={`/product/${id}`}
          className="block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition text-center text-sm font-medium"
        >
          {isAuctionEnded ? 'View Details' : 'Place Bid'}
        </Link>
      </div>
    </div>
  );
}