"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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

export default function ProductViewPage() {
  const { id } = useParams();
  type Product = {
    id: number;
    title: string;
    description: string;
    basePrice: number;
    category: string;
    status: string;
    auctionEnd: string;
    imageUrl: string;
    // Add other fields as needed
  };
  const [product, setProduct] = useState<Product | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Timer state and logic
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const calculateTimeLeft = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end.getTime() - now.getTime();
    return difference > 0 ? Math.floor(difference / 1000) : 0; // Return seconds
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axi.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.status === "ONGOING") {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(product.auctionEnd));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [product]);

  const handlePlaceBid = async () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("id");

    if (!token || !userId) {
      toast.error("Please sign in to place a bid.", {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
      });
      router.push("/login");
      return;
    }

    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      setError("Please enter a valid bid amount.");
      return;
    }

    setLoading(true);
    try {
      const response = await Axi.post("/api/bids", {
        productId: parseInt(id as string),
        userId: parseInt(userId),
        bidAmount: parseFloat(bidAmount),
      });
      if (response.status === 200) {
        toast.success("Bidding done successfully!", {
          position: "top-right",
          autoClose: 3000,
          className: "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200",
        });
        setBidAmount("");
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to place bid. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "Auction Ended";
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!product) return <div className="text-center py-10 text-gray-600">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="md:w-2/3 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <div className="space-y-2">
              <p className="text-indigo-600 font-medium">Base Price: ${product.basePrice.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm text-gray-500">
                Status: <span className={product.status === "ONGOING" ? "text-green-600" : "text-red-600"}>{product.status}</span>
              </p>
              <p className="text-sm text-gray-500">Auction Ends: {new Date(product.auctionEnd).toLocaleDateString()}</p>
              {product.status === "ONGOING" && (
                <p className="text-sm text-gray-700">Time Left: {formatTime(timeLeft)}</p>
              )}
            </div>
            {product.status === "ONGOING" && (
              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-gray-700">Enter Bid Amount</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your bid"
                    min="0"
                    step="0.01"
                  />
                  <button
                    onClick={handlePlaceBid}
                    disabled={loading}
                    className="w-full sm:w-auto bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
                  >
                    {loading ? "Placing..." : "Place Bid"}
                  </button>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </div>
            )}
          </div>
          <div className="md:w-1/3">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}