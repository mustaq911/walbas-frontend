'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('You must agree to the terms and conditions');
      return;
    }

    try {
      // Replace with actual checkout logic
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod }),
      });

      if (response.ok) {
        router.push('/checkout/success');
      } else {
        alert('Checkout failed');
      }
    } catch {
      alert('An error occurred during checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                <span>PayPal</span>
              </label>
            </div>
            
            <div className="mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the Terms and Conditions</span>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Complete Purchase
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {/* Order summary component would go here */}
        </div>
      </div>
    </div>
  );
}