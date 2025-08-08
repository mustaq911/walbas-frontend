"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

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
  const [categories] = useState(["Furniture", "Home Appliance", "Baby Item", "Electronics", "Fashion"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (selectedCategory) {
        setLoading(true);
        try {
          const response = await Axi.get(`/api/products/search?category=${selectedCategory}&page=1&size=10`);
          setProducts(response.data.content);
        } catch (err) {
          setError("Failed to fetch products by category. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProductsByCategory();
  }, [selectedCategory]);

  const handlePlaceBid = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  // Timer logic
  const calculateTimeLeft = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end.getTime() - now.getTime();
    return difference > 0 ? Math.floor(difference / 1000) : 0; // Return seconds
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
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Right Section */}
        <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setSelectedCategory(category); }}
                  className={`block text-gray-600 hover:text-blue-600 ${selectedCategory === category ? "text-blue-800 font-medium" : ""}`}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Center Section */}
        <main className="w-full md:w-2/4 bg-white p-6 rounded-lg shadow flex-1">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800">Build Your Business</h2>
            <p className="text-gray-600">One Pallet at a Time.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.map((product: any) => (
              <div key={product.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <img src={product.imageUrl} alt={product.title} className="w-full h-32 object-cover mb-2" />
                <h3 className="text-md font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">Quantity in Lot: {product.quantity || 14}</p>
                <p className="text-sm text-green-600">Current Bid: CAD ${product.basePrice.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Per Unit Price: CAD {((product.basePrice / (product.quantity || 14)).toFixed(2))}</p>
                <p className="text-sm text-gray-500">
                  Status: <span className={product.status === "ONGOING" ? "text-green-600" : "text-red-600"}>{product.status}</span>
                </p>
                {product.status === "ONGOING" && (
                  <p className="text-sm text-gray-700">Time Left: {formatTime(timeLeft[product.id] || 0)}</p>
                )}
                {product.status === "ONGOING" && (
                  <button
                    onClick={() => handlePlaceBid(product.id)}
                    className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition-colors"
                  >
                    Place Bid
                  </button>
                )}
              </div>
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center py-10 text-gray-600">No products available.</div>
          )}
        </main>
      </div>
    </div>
  );
}