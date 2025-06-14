import ProductCard from '../../../components/product/ProductCard';
import Link from 'next/link';

// Mock data - replace with API later
const featuredProducts = [
  {
    id: 1,
    title: "Vintage Camera",
    price: 50,
    currentBid: 75,
    imageUrl: "/next.svg", // Replace with actual images
    endTime: new Date(Date.now() + 86400000) // 1 day from now
  },
  {
    id: 2,
    title: "Antique Watch",
    price: 100,
    currentBid: 120,
    imageUrl: "/next.svg",
    endTime: new Date(Date.now() + 172800000) // 2 days from now
  },
  {
    id: 3,
    title: "Rare Painting",
    price: 200,
    currentBid: 250,
    imageUrl: "/next.svg",
    endTime: new Date(Date.now() + 259200000) // 3 days from now
  }
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Unique Items</h1>
          <p className="text-xl mb-8">Bid on exclusive products or buy them instantly</p>
          <Link 
            href="/products" 
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Browse Auctions
          </Link>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Auctions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}