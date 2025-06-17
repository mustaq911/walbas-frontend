// src/app/(public)/products/page.tsx
import { getProducts } from '@/lib/api-service';
import ProductCard from '@/components/product/ProductCard';
import Filters from '@/components/product/Filters';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Product } from '@/lib/type';

interface ProductsPageProps {
  searchParams?: {
    category?: string;
    sort?: string;
    search?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Destructure searchParams at the start to avoid direct access
  const { category, sort = 'newest', search } = searchParams || {};
  
  let products: Product[] = [];
  let error = '';

  try {
    // Attempt to fetch products
    const fetchedProducts = await getProducts();
    products = fetchedProducts || [];
    
    // Apply filters if products were fetched successfully
    if (category) {
      products = products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      const searchTerm = search.toLowerCase();
      products = products.filter(
        product => 
          product.title.toLowerCase().includes(searchTerm) ||
          (product.description && product.description.toLowerCase().includes(searchTerm)) ||
          product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    switch (sort) {
      case 'newest':
        products.sort((a, b) => new Date(b.auctionStart).getTime() - new Date(a.auctionStart).getTime());
        break;
      case 'ending':
        products.sort((a, b) => new Date(a.auctionEnd).getTime() - new Date(b.auctionEnd).getTime());
        break;
      case 'price-low':
        products.sort((a, b) => (a.basePrice || 0) - (b.basePrice || 0));
        break;
      case 'price-high':
        products.sort((a, b) => (b.basePrice || 0) - (a.basePrice || 0));
        break;
      default:
        products.sort((a, b) => new Date(b.auctionStart).getTime() - new Date(a.auctionStart).getTime());
    }
  } catch (err) {
    console.error('Failed to fetch products:', err);
    error = err instanceof Error ? err.message : 'Failed to load products. Please try again later.';
    products = [];
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Discover Amazing Auctions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Bid on unique items from around the world. Find something special today!
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Refine Your Search
                </h2>
                <Suspense fallback={<LoadingSpinner />}>
                  <Filters />
                </Suspense>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 rounded-xl text-white">
                <h3 className="font-bold mb-2">Featured Auction</h3>
                <p className="text-sm mb-3">Rare collectible ending soon!</p>
                <button className="w-full bg-white text-indigo-600 py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-100 transition">
                  View Item
                </button>
              </div>
            </div>
          </aside>
          
          {/* Main Product Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium text-gray-700 dark:text-gray-300">{products.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm text-gray-600 dark:text-gray-300">Sort by:</label>
                <select 
                  id="sort"
                  className="bg-gray-50 border border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  defaultValue={sort}
                >
                  <option value="newest">Newest First</option>
                  <option value="ending">Ending Soonest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    basePrice={product.basePrice}
                    imageUrl={product.imageUrl}
                    auctionEnd={product.auctionEnd}
                    category={product.category}
                    status={product.status}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {error ? 'Error loading products' : 'No products found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {error ? 'Please try again later' : 'Try adjusting your search filters'}
                </p>
                {!error && (
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}