import Link from 'next/link';
import CountdownTimer from '@/components/product/CountdownTimer';

interface BidCardProps {
  bid: {
    id: string;
    amount: number;
    product: {
      id: string;
      title: string;
      imageUrl: string;
      endTime: Date;
      currentBid?: number;
    };
    createdAt: Date;
  };
}

export default function BidCard({ bid }: BidCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/product/${bid.product.id}`}>
        <div className="aspect-square bg-gray-100 relative">
          <img
            src={bid.product.imageUrl}
            alt={bid.product.title}
            className="w-full h-full object-contain p-4"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-lg mb-2 line-clamp-1">{bid.product.title}</h3>
          
          <div className="mb-2">
            <p className="text-sm text-gray-600">Your Bid</p>
            <p className="font-bold">${bid.amount.toFixed(2)}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-gray-600">Current Highest</p>
            <p className="font-medium">
              ${bid.product.currentBid?.toFixed(2) || (bid.amount + 5).toFixed(2)}
            </p>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-gray-600">Time Left</p>
            <CountdownTimer endTime={new Date(bid.product.endTime)} className="text-sm" />
          </div>
          
          <button className="w-full bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700 transition">
            Increase Bid
          </button>
        </div>
      </Link>
    </div>
  );
}