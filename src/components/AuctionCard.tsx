import Link from 'next/link';
import Image from 'next/image';


interface AuctionCardProps {
  auction: {
    id: string;
    title: string;
    imageUrl: string;
    finalPrice: number;
    wonAt: Date;
    status: 'paid' | 'shipped' | 'delivered';
  };
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const statusColors = {
    paid: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800'
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/product/${auction.id}`}>
        <div className="aspect-square bg-gray-100 relative">
          <Image
            src={auction.imageUrl}
            alt={auction.title}
            className="w-full h-full object-contain p-4"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-lg mb-2 line-clamp-1">{auction.title}</h3>
          
          <div className="mb-2">
            <p className="text-sm text-gray-600">Winning Price</p>
            <p className="font-bold">${auction.finalPrice.toFixed(2)}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-gray-600">Won On</p>
            <p className="font-medium">
              {new Date(auction.wonAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[auction.status]}`}>
              {auction.status}
            </span>
            <button className="text-blue-600 text-sm hover:underline">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}