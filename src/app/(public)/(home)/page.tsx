import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  basePrice: number;
  auctionEnd: string;
  status?: string; // Make status optional since it's not in the API
}

export default function ProductCard({
  id,
  title,
  description,
  category,
  imageUrl,
  basePrice,
  auctionEnd,
  status,
}: ProductCardProps) {
  const isAuctionEnded = new Date(auctionEnd) < new Date();

  return (
    <Link href={`/product/${id}`} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-4">
        <Image src={imageUrl} alt={title} fill className="object-contain" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2 line-clamp-2">{description}</p>
      <div className="mb-2">
        <span className="text-sm text-gray-500">Category:</span>
        <span className="ml-2 text-gray-700">{category}</span>
      </div>
      <div className="text-lg font-bold mb-2">${basePrice.toFixed(2)}</div>
      <div className="text-sm text-gray-500">
        Auction ends: {new Date(auctionEnd).toLocaleString()}
      </div>
      {status && (
        <div className="text-sm text-gray-500">
          Status: {status}
        </div>
      )}
      {isAuctionEnded && (
        <div className="text-sm text-red-500">Auction Ended</div>
      )}
    </Link>
  );
}