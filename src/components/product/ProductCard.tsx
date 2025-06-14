// src/components/product/ProductCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import CountdownTimer from './CountdownTimer';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  currentBid?: number;
  imageUrl: string;
  endTime: Date | string;
  condition?: string;
  bidsCount?: number;
  isWatched?: boolean;
  category?: string;
}

export default function ProductCard({
  id,
  title,
  price,
  currentBid,
  imageUrl,
  endTime,
  condition = 'Good',
  bidsCount = 0,
  isWatched: initialWatched = false,
  category = 'General'
}: ProductCardProps) {
  const [isWatched, setIsWatched] = useState(initialWatched);
  const hasBids = currentBid !== undefined && currentBid > 0;
  const isAuctionEnded = new Date(endTime) < new Date();

  const toggleWatchlist = () => {
    setIsWatched(!isWatched);
    // Here you would typically call an API to update the watchlist status
  };

  return (
    <div className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
      <div className="relative">
        {/* Product Image */}
        <Link href={`/product/${id}`} className="block aspect-square bg-gray-100 dark:bg-gray-700 relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          
          {/* Auction status badge */}
          {isAuctionEnded ? (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              Auction Ended
            </span>
          ) : (
            <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              Live
            </span>
          )}
        </Link>
        
        {/* Watchlist button */}
        <button 
          onClick={toggleWatchlist}
          className="absolute top-2 left-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label={isWatched ? "Remove from watchlist" : "Add to watchlist"}
        >
          {isWatched ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Category tag */}
        <span className="inline-block mb-2 px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full">
          {category}
        </span>
        
        {/* Product title */}
        <Link href={`/product/${id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            {title}
          </h3>
        </Link>
        
        {/* Price/Bid information */}
        <div className="mb-3">
          {hasBids ? (
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Bid</p>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                ${currentBid?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {bidsCount} {bidsCount === 1 ? 'bid' : 'bids'}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Starting Price</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          )}
        </div>
        
        {/* Condition and Time */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Condition</p>
            <p className="text-sm font-medium">{condition}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isAuctionEnded ? 'Ended' : 'Ends in'}
            </p>
            <CountdownTimer endTime={endTime} compact />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/product/${id}`}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition text-center text-sm font-medium"
          >
            {isAuctionEnded ? 'View Details' : 'Place Bid'}
          </Link>
          <button className="flex-1 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 py-2 px-4 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-sm font-medium">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}