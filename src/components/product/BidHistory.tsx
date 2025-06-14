'use client';

import { useEffect, useState } from 'react';
import { getBidsForProduct } from '@/lib/api';

interface Bid {
  id: string;
  bidder?: string;
  amount: number;
  createdAt: string;
}

interface BidHistoryProps {
  productId: string;
}

export default function BidHistory({ productId }: BidHistoryProps) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const data = await getBidsForProduct(productId);
        setBids(data);
      } catch (error) {
        console.error('Error fetching bids:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [productId]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading bid history...
      </div>
    );
  }

  if (bids.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        No bids have been placed yet.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {bids.map((bid) => (
        <div key={bid.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          <div className="flex justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {bid.bidder || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(bid.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                ${bid.amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}