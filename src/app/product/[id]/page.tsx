import Image from 'next/image';
import ProductDetails from '@/components/product/ProductDetails';
import BidHistory from '@/components/product/BidHistory';
import BidForm from '@/components/product/BidForm';
import { getProduct } from '@/lib/api';

// Using public folder approach
const defaultAvatar = '/default-avatar.jpg';

export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const productId = params.id;
  const product = await getProduct(productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-4 mb-6">
            The product you&#39;re looking for doesn&#39;t exist or has been removed.
          </p>
          <a
            href="/products"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Browse Auctions
          </a>
        </div>
      </div>
    );
  }

  const isAuctionEnded = new Date(product.endTime) < new Date();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Product Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">
            {product.title}
          </h1>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <ProductDetails 
              product={{
                ...product,
                seller: product.sellerId ? {
                  name: "Seller Name",
                  rating: 4.8,
                  joinDate: "2020-05-15",
                  avatar: defaultAvatar // Use the public path
                } : undefined
              }} 
              isAuctionEnded={isAuctionEnded}
            />
            
            <BidForm 
              productId={productId} 
              currentBid={product.currentBid} 
              isAuctionEnded={isAuctionEnded}
            />
          </div>
        </div>
        
        {/* Bid History */}
        <div className="mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bid History</h2>
            </div>
            <BidHistory productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
}