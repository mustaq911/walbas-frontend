'use client';

import Image from 'next/image';

interface Seller {
  name: string;
  rating: number;
  joinDate: string;
  avatar: string;
}

interface ProductDetailsProps {
  product: {
    title: string;
    description: string;
    condition?: string;
    seller?: Seller;
    price: number;
    currentBid?: number;
    category?: string;
  };
  isAuctionEnded?: boolean;
}

export default function ProductDetails({ 
  product, 
  isAuctionEnded = false
}: ProductDetailsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      {/* Header with category */}
      {product.category && (
        <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full mb-4">
          {product.category}
        </span>
      )}

      {/* Product title and description */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {product.title}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {product.description}
      </p>

      {/* Condition and seller info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {product.condition && (
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Condition</p>
            <p className="font-medium">{product.condition}</p>
          </div>
        )}
        {product.seller && (
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Seller</p>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden relative">
                <Image
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{product.seller.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {product.seller.rating} ★
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Price/bid information */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        {product.currentBid ? (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isAuctionEnded ? 'Final Price' : 'Current Bid'}
            </p>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              ${product.currentBid.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400">Starting Price</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${product.price.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </p>
          </>
        )}
      </div>
    </div>
  );
}