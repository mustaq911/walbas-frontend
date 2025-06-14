import { getProducts } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import Filters from '@/components/product/Filters';

export default async function ProductsPage() {
  const products = await getProducts();

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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Refine Your Search
                </h2>
                <Filters />
              </div>
              
              {/* Featured Auction Banner */}
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
            {/* Sorting Controls */}
            <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium text-gray-700 dark:text-gray-300">{products.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm text-gray-600 dark:text-gray-300">Sort by:</label>
                <select 
                  id="sort"
                  className="bg-gray-50 border border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  <option value="newest">Newest First</option>
                  <option value="ending">Ending Soonest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Try adjusting your search filters
                </p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  Previous
                </button>
                <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-indigo-600 dark:bg-gray-800 dark:border-gray-600 dark:text-indigo-400">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  3
                </button>
                <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  Next
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}