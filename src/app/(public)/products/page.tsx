"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Gavel, Trophy, History, Heart} from "lucide-react";

const Axi = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

Axi.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories] = useState([
    "Home Products", "Home Improvement", "Printers", 
    "Restaurant & Catering", "Hair Care & Salon", 
    "Weight Management", "Computer Accessories", 
    "DVD & Home Theater", "PC Desktops", "Televisions"
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("browse");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axi.get("/api/products/get/all");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handlePlaceBid = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  // Timer logic
  const calculateTimeLeft = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end.getTime() - now.getTime();
    return difference > 0 ? Math.floor(difference / 1000) : 0;
  };

  const [timeLeft, setTimeLeft] = useState<{ [key: number]: number }>({});
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = products.reduce((acc: { [key: number]: number }, product: any) => {
        if (product.status === "ONGOING") {
          acc[product.id] = calculateTimeLeft(product.auctionEnd);
        }
        return acc;
      }, {});
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [products]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "Auction Ended";
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
    </div>
  );
  if (error) return (
    <div className="text-center py-10 text-red-600 bg-red-50 rounded-lg mx-auto max-w-2xl">{error}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/4 space-y-6">
          {/* Categories */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">Browse Auctions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Category</h4>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href="#"
                        className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">My Profile</h4>
                <ul className="space-y-1">
                  <li>
                    <a 
                      href="#" 
                      className="flex items-center space-x-2 py-1 text-sm text-gray-600 hover:text-blue-600"
                      onClick={(e) => { e.preventDefault(); setActiveTab("mybids"); }}
                    >
                      <Gavel size={16} className="w-4 h-4" />
                      <span>My Bids</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="flex items-center space-x-2 py-1 text-sm text-gray-600 hover:text-blue-600"
                      onClick={(e) => { e.preventDefault(); setActiveTab("mybids"); }}
                    >
                      <Trophy size={16} className="w-4 h-4" />
                      <span>Won Items</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="flex items-center space-x-2 py-1 text-sm text-gray-600 hover:text-blue-600"
                      onClick={(e) => { e.preventDefault(); setActiveTab("mybids"); }}
                    >
                      <History size={16} className="w-4 h-4" />
                      <span>Purchase History</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="flex items-center space-x-2 py-1 text-sm text-gray-600 hover:text-blue-600"
                      onClick={(e) => { e.preventDefault(); setActiveTab("mybids"); }}
                    >
                      <Heart size={16} className="w-4 h-4" />
                      <span>Watchlist</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ending Soon Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">Ending Soon</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-blue-600 hover:underline">Qualified Sellers</a></li>
              <li><a href="#" className="text-sm text-blue-600 hover:underline">Featured</a></li>
              <li><a href="#" className="text-sm text-blue-600 hover:underline">Advanced</a></li>
              <li><a href="#" className="text-sm text-blue-600 hover:underline">Search Electronics</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="w-full md:w-3/4">

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-40 object-contain mb-3 bg-gray-100 p-2 rounded"
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                />
                <h3 className="text-md font-semibold mb-1">{product.title}</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{product.quantity || 14}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Current Bid:</span>
                  <span className="font-medium text-green-600">CAD ${product.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Per Unit:</span>
                  <span className="font-medium">CAD {((product.basePrice / (product.quantity || 14)).toFixed(2))}</span>
                </div>
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className={`px-2 py-1 rounded ${product.status === "ONGOING" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {product.status}
                  </span>
                  {product.status === "ONGOING" && (
                    <span className="text-gray-700">{formatTime(timeLeft[product.id] || 0)}</span>
                  )}
                </div>
                {product.status === "ONGOING" && (
                  <button
                    onClick={() => handlePlaceBid(product.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
                  >
                    Place Bid
                  </button>
                )}
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600">No products available at the moment.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}