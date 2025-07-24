'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export default function BidButton({ productId, basePrice, title }: { productId: number; basePrice: number; title: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleOpenModal = () => {
    const username = Cookies.get('username');
    if (!username) {
      toast.info('Please log in to place a bid.', {
        position: 'top-right',
        autoClose: 2000,
        className: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      });
      setTimeout(() => {
        router.push('/login');
      }, 1000);
      return;
    }
    setIsModalOpen(true);
  };

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= basePrice) {
      setError(`Bid amount must be greater than $${basePrice.toFixed(2)}`);
      return;
    }

    const userId = Cookies.get('id');
    if (!userId) {
      toast.error('User ID not found. Please log in again.', {
        position: 'top-right',
        autoClose: 2000,
        className: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200',
      });
      setTimeout(() => {
        router.push('/login');
      }, 1000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          userId: parseInt(userId),
          amount,
        }),
        signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000')),
      });

      if (response.ok) {
        await response.json(); // Parse response to confirm success
        toast.success(`Your bid of $${amount.toFixed(2)} on "${title}" was placed successfully!`, {
          position: 'top-right',
          autoClose: 3000,
          className: 'bg-green-50 text-green-800 font-semibold dark:bg-green-900 dark:text-green-200',
        });
        setIsModalOpen(false);
        setBidAmount('');
      } else {
        const errorData = await response.json();
        if (response.status === 500 && errorData.error === 'Internal Server Error' && errorData.path === '/bids') {
          toast.error('You have already made a bid on this product.', {
            position: 'top-right',
            autoClose: 3000,
            className: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200',
          });
        } else {
          toast.error(errorData.message || 'Failed to place bid.', {
            position: 'top-right',
            autoClose: 3000,
            className: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200',
          });
        }
      }
    } catch (err) {
      toast.error('An error occurred while placing the bid.', {
        position: 'top-right',
        autoClose: 3000,
        className: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200',
      });
      console.error('Bid error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        disabled={isLoading}
        className={`w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition flex items-center justify-center ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Placing Bid...
          </>
        ) : (
          'Place Bid'
        )}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Place a Bid on {title}
            </h2>
            <form onSubmit={handleBid} className="space-y-4">
              <div>
                <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                  Bid Amount ($)
                </label>
                <input
                  id="bidAmount"
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={`Enter amount greater than $${basePrice.toFixed(2)}`}
                  step="0.01"
                  min={basePrice + 0.01}
                  required
                />
                {error && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setBidAmount('');
                    setError('');
                  }}
                  className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Submitting...' : 'Submit Bid'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}