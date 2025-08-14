"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Clock, DollarSign, Tag, Calendar, Info } from "lucide-react";

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
    condition?: string;
    quantity?: number;
    seller?: string;
  };
  const [product, setProduct] = useState<Product | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const calculateTimeLeft = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end.getTime() - now.getTime();
    return difference > 0 ? Math.floor(difference / 1000) : 0;
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
        className: "bg-red-50 text-red-700",
      });
      router.push("/login");
      return;
    }

    if (!bidAmount || parseFloat(bidAmount) <= (product?.basePrice || 0)) {
      setError(`Bid must be higher than $${product?.basePrice.toFixed(2)}`);
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
        toast.success("Bid placed successfully!", {
          position: "top-right",
          autoClose: 3000,
          className: "bg-green-50 text-green-800",
        });
        setBidAmount("");
        setError("");
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to place bid. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-50 text-red-700",
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
    return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m ${secs}s`;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Product not found</h3>
        <p className="mt-1 text-sm text-gray-500">The product you're looking for doesn't exist or may have been removed.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.category}</span>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="relative h-96 w-full bg-gray-100 rounded-xl overflow-hidden group">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+Image";
                    e.currentTarget.className = "w-full h-full object-cover";
                  }}
                />
                {product.status === "ONGOING" && (
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                    LIVE
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                  <p className="text-indigo-600 font-medium mt-1">{product.category}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.status === "ONGOING" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.status}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-gray-700">Base Price: </span>
                  <span className="ml-2 font-bold text-indigo-600">${product.basePrice.toFixed(2)}</span>
                </div>

                {product.quantity && (
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="text-gray-700">Quantity: </span>
                    <span className="ml-2 font-medium">{product.quantity}</span>
                  </div>
                )}

                {product.condition && (
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="text-gray-700">Condition: </span>
                    <span className="ml-2 font-medium">{product.condition}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-gray-700">Auction Ends: </span>
                  <span className="ml-2 font-medium">
                    {new Date(product.auctionEnd).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {product.status === "ONGOING" && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="text-gray-700">Time Left: </span>
                    <span className="ml-2 font-medium text-red-600 animate-pulse">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                )}
              </div>

              {product.status === "ONGOING" && (
                <div className="mt-10">
                  <div className="mb-4">
                    <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Place Your Bid (Minimum: ${product.basePrice.toFixed(2)})
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="bidAmount"
                        id="bidAmount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        min={product.basePrice}
                        step="0.01"
                      />
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                  </div>

                  <button
                    onClick={handlePlaceBid}
                    disabled={loading}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Place Bid"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Specifications</h3>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-gray-600 w-32">Category</span>
                    <span className="text-gray-900">{product.category}</span>
                  </li>
                  {product.condition && (
                    <li className="flex">
                      <span className="text-gray-600 w-32">Condition</span>
                      <span className="text-gray-900">{product.condition}</span>
                    </li>
                  )}
                  {product.quantity && (
                    <li className="flex">
                      <span className="text-gray-600 w-32">Quantity</span>
                      <span className="text-gray-900">{product.quantity}</span>
                    </li>
                  )}
                  <li className="flex">
                    <span className="text-gray-600 w-32">Auction Status</span>
                    <span className={`font-medium ${
                      product.status === "ONGOING" ? "text-green-600" : "text-red-600"
                    }`}>
                      {product.status}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Auction Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">Auction started</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-5 w-5 ${
                      product.status === "COMPLETED" ? "text-indigo-500" : "text-gray-300"
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm ${
                        product.status === "COMPLETED" ? "text-gray-700" : "text-gray-500"
                      }`}>
                        Auction ended {product.status === "COMPLETED" ? "" : "(ends " + new Date(product.auctionEnd).toLocaleDateString() + ")"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}