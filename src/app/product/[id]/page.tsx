import { getProduct } from '@/lib/api-service';
import Image from 'next/image';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Await params to resolve the Promise
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md text-center p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="text-gray-600 mt-4 mb-6">
            The product you&#39;re looking for doesn&#39;t exist.
          </p>
          <a
            href="/products"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  const isAuctionEnded = new Date(product.auctionEnd) < new Date();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="mb-4">
                <span className="text-sm text-gray-500">Category:</span>
                <span className="ml-2 text-gray-700">{product.category}</span>
              </div>

              <div className="text-2xl font-bold mb-4">
                ${product.basePrice.toFixed(2)}
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-500">Auction ends:</span>
                <span className="ml-2 text-gray-700">
                  {new Date(product.auctionEnd).toLocaleString()}
                </span>
              </div>

              {isAuctionEnded ? (
                <button
                  className="w-full py-3 bg-gray-300 text-gray-700 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Auction Ended
                </button>
              ) : (
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Place Bid
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}