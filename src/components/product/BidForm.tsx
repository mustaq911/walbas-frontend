'use client';

import { useState } from 'react';
import { placeBid } from '@/lib/api';

interface BidFormProps {
  productId: string;
  currentBid?: number;
  isAuctionEnded?: boolean;
}

export default function BidForm({ productId, currentBid, isAuctionEnded }: BidFormProps) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const bidAmount = parseFloat(amount);
      if (isNaN(bidAmount)) {
        throw new Error('Please enter a valid amount');
      }
      if (currentBid && bidAmount <= currentBid) {
        throw new Error(`Bid must be higher than $${currentBid.toFixed(2)}`);
      }

      await placeBid(productId, bidAmount);
      setSuccess('Bid placed successfully!');
      setAmount('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place bid');
    } finally {
      setLoading(false);
    }
  };

  if (isAuctionEnded) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Auction Ended</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This auction has ended. The final price was ${currentBid?.toFixed(2) || 'N/A'}
        </p>
        <button
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg font-medium"
          disabled
        >
          Bidding Closed
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Place a Bid</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Bid ($)
          </label>
          <input
            type="number"
            id="bidAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            min={currentBid ? (currentBid + 0.01).toFixed(2) : undefined}
            step="0.01"
            placeholder={currentBid ? `Minimum $${(currentBid + 0.01).toFixed(2)}` : ''}
            required
          />
          {currentBid && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Current bid: ${currentBid.toFixed(2)}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Placing Bid...' : 'Place Bid'}
        </button>
      </form>
    </div>
  );
}