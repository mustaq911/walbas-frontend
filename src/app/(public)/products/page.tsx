import { getProducts } from '@/lib/api-service';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md text-center p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold">No Products Found</h1>
          <p className="text-gray-600 mt-4 mb-6">
            No products are available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-4">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <div className="mb-2">
                <span className="text-sm text-gray-500">Category:</span>
                <span className="ml-2 text-gray-700">{product.category}</span>
              </div>
              <div className="text-lg font-bold mb-2">
                ${product.basePrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                Auction ends: {new Date(product.auctionEnd).toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}