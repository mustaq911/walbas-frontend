// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Gavel, Trophy, History, Heart} from "lucide-react";

// const Axi = axios.create({
//   baseURL: "",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Axi.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [categories] = useState([
//     "Home Products", "Home Improvement", "Printers",
//     "Restaurant & Catering", "Hair Care & Salon",
//     "Weight Management", "Computer Accessories",
//     "DVD & Home Theater", "PC Desktops", "Televisions"
//   ]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState("browse");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await Axi.get("/api/products/get/all");
//         setProducts(response.data);
//       } catch (err) {
//         setError("Failed to fetch products. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handlePlaceBid = (productId: number) => {
//     router.push(`/product/${productId}`);
//   };

//   // Timer logic
//   const calculateTimeLeft = (endTime: string) => {
//     const now = new Date();
//     const end = new Date(endTime);
//     const difference = end.getTime() - now.getTime();
//     return difference > 0 ? Math.floor(difference / 1000) : 0;
//   };

//   const [timeLeft, setTimeLeft] = useState<{ [key: number]: number }>({});
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const newTimeLeft = products.reduce((acc: { [key: number]: number }, product: any) => {
//         if (product.status === "ONGOING") {
//           acc[product.id] = calculateTimeLeft(product.auctionEnd);
//         }
//         return acc;
//       }, {});
//       setTimeLeft(newTimeLeft);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [products]);

//   const formatTime = (seconds: number) => {
//     if (seconds <= 0) return "Auction Ended";
//     const days = Math.floor(seconds / (3600 * 24));
//     const hours = Math.floor((seconds % (3600 * 24)) / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${days}d ${hours}h ${minutes}m ${secs}s`;
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
//     </div>
//   );
//   if (error) return (
//     <div className="text-center py-10 text-red-600 bg-red-50 rounded-lg mx-auto max-w-2xl">{error}</div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
//         {/* Left Sidebar */}
//         <aside className="w-full md:w-1/4 space-y-6">
//           {/* Categories */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-3 border-b pb-2">Browse Auctions</h3>
//             <div className="space-y-4">
//               <div>
//                 <h4 className="font-medium text-gray-700 mb-2">Category</h4>
//                 <ul className="space-y-1">
//                   {categories.map((category) => (
//                     <li key={category}>
//                       <a
//                         href="#"
//                         className="block py-1 text-sm text-gray-600 hover:text-blue-600"
//                       >
//                         {category}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h4 className="font-medium text-gray-700 mb-2">My Profile</h4>
//                 <ul className="space-y-1">
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center space-x-2 py-1 text-sm text-gray-600 hover:text-blue-600"
//                       onClick={(e) => { e.preventDefault(); setActiveTab("mybids"); }}
//                     >
//                       <Gavel size={16} className="w-4 h-4" />
//                       <span>My Bids</span>
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center space-x-2 py-1 text-sm text-gray-600 hover:text-blue-600"
//                       onClick={(e) => { e.preventDefault(); setActiveTab("mybids"); }}
//                     >
//                       <Trophy size={16} className="w-4 h-4" />
//                       <span>Won Items</span>
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center space-x-2 py-1 text-sm text-gray-600 hover:text-blue-600"
//                       onClick={(e) => { e.preventDefault(); setActiveTab("mybids"); }}
//                     >
//                       <History size={16} className="w-4 h-4" />
//                       <span>Purchase History</span>
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center space-x-2 py-1 text-sm text-gray-600 hover:text-blue-600"
//                       onClick={(e) => { e.preventDefault(); setActiveTab("mybids"); }}
//                     >
//                       <Heart size={16} className="w-4 h-4" />
//                       <span>Watchlist</span>
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Ending Soon Section */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-3 border-b pb-2">Ending Soon</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-sm text-blue-600 hover:underline">Qualified Sellers</a></li>
//               <li><a href="#" className="text-sm text-blue-600 hover:underline">Featured</a></li>
//               <li><a href="#" className="text-sm text-blue-600 hover:underline">Advanced</a></li>
//               <li><a href="#" className="text-sm text-blue-600 hover:underline">Search Electronics</a></li>
//             </ul>
//           </div>
//         </aside>

//         {/* Main Content Area */}
//         <main className="w-full md:w-3/4">

//           {/* Products Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {products.map((product: any) => (
//               <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-100">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.title}
//                   className="w-full h-40 object-contain mb-3 bg-gray-100 p-2 rounded"
//                   onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
//                 />
//                 <h3 className="text-md font-semibold mb-1">{product.title}</h3>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-gray-600">Quantity:</span>
//                   <span className="font-medium">{product.quantity || 14}</span>
//                 </div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-gray-600">Current Bid:</span>
//                   <span className="font-medium text-green-600">CAD ${product.basePrice.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm mb-2">
//                   <span className="text-gray-600">Per Unit:</span>
//                   <span className="font-medium">CAD {((product.basePrice / (product.quantity || 14)).toFixed(2))}</span>
//                 </div>
//                 <div className="flex justify-between items-center text-xs mb-3">
//                   <span className={`px-2 py-1 rounded ${product.status === "ONGOING" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                     {product.status}
//                   </span>
//                   {product.status === "ONGOING" && (
//                     <span className="text-gray-700">{formatTime(timeLeft[product.id] || 0)}</span>
//                   )}
//                 </div>
//                 {product.status === "ONGOING" && (
//                   <button
//                     onClick={() => handlePlaceBid(product.id)}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
//                   >
//                     Place Bid
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           {products.length === 0 && (
//             <div className="bg-white p-8 rounded-lg shadow text-center">
//               <p className="text-gray-600">No products available at the moment.</p>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { ChevronDown, ChevronUp, Filter } from "lucide-react";

// const Axi = axios.create({
//   baseURL: "",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Axi.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ---------------- Category Filter ----------------
// const CategoryFilter = ({ categories, onCategoryChange, selectedCategory }) => {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const safeCategories = Array.isArray(categories) ? categories : [];
//   const safeSelectedCategory = selectedCategory || "";
//   const safeOnCategoryChange =
//     typeof onCategoryChange === "function" ? onCategoryChange : () => {};

//   // Filter categories by name
//   const filteredCategories = safeCategories.filter((category) => {
//     if (!category || typeof category.name !== "string") return false;
//     return category.name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   const handleCategorySelect = (categoryName: string) => {
//     const newCategory =
//       safeSelectedCategory === categoryName ? "" : categoryName;
//     safeOnCategoryChange(newCategory);
//   };

//   const clearFilter = () => {
//     safeOnCategoryChange("");
//     setSearchTerm("");
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3 border-b pb-2">
//         <div className="flex items-center space-x-2">
//           <Filter className="w-4 h-4 text-black" />
//           <h3 className="text-lg font-semibold text-black">Filter</h3>
//         </div>
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           {isExpanded ? (
//             <ChevronUp className="w-4 h-4" />
//           ) : (
//             <ChevronDown className="w-4 h-4" />
//           )}
//         </button>
//       </div>

//       {isExpanded && (
//         <div className="space-y-4">
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="font-medium text-gray-700">Category</h4>
//               {safeSelectedCategory && (
//                 <button
//                   onClick={clearFilter}
//                   className="text-xs text-blue-600 hover:text-blue-800 underline"
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>

//             {/* Search */}
//             <div className="mb-3">
//               <input
//                 type="text"
//                 placeholder="Search categories..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Selected Category Display */}
//             {safeSelectedCategory && (
//               <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-blue-800">
//                     Filtered by: {safeSelectedCategory}
//                   </span>
//                   <button
//                     onClick={clearFilter}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     ×
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Categories List */}
//             <div className="max-h-64 overflow-y-auto">
//               <ul className="space-y-1">
//                 {filteredCategories.length > 0 ? (
//                   <>
//                     <li>
//                       <button
//                         onClick={() => handleCategorySelect("")}
//                         className={`block w-full text-left py-2 px-2 text-sm rounded transition-colors ${
//                           safeSelectedCategory === ""
//                             ? "bg-blue-100 text-blue-800 font-medium"
//                             : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
//                         }`}
//                       >
//                         All Categories
//                       </button>
//                     </li>

//                     {filteredCategories.map((category) => (
//                       <li key={category.id}>
//                         <button
//                           onClick={() => handleCategorySelect(category.name)}
//                           className={`block w-full text-left py-2 px-2 text-sm rounded transition-colors ${
//                             safeSelectedCategory === category.name
//                               ? "bg-blue-100 text-blue-800 font-medium"
//                               : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
//                           }`}
//                         >
//                           {category.name}
//                         </button>
//                       </li>
//                     ))}
//                   </>
//                 ) : (
//                   <li className="py-2 text-sm text-gray-500 text-center">
//                     {safeCategories.length === 0
//                       ? "No categories available"
//                       : "No categories found"}
//                   </li>
//                 )}
//               </ul>
//             </div>

//             {/* Category Count */}
//             <div className="mt-2 pt-2 border-t text-xs text-gray-500">
//               {filteredCategories.length > 0 && safeCategories.length > 0 && (
//                 <span>
//                   Showing {filteredCategories.length} of {safeCategories.length}{" "}
//                   categories
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ---------------- Product Page ----------------
// export default function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const [timeLeft, setTimeLeft] = useState<{ [key: number]: number }>({});

//   // Fetch Products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await Axi.get("/api/products/get/all");
//         setProducts(response.data);
//       } catch (err) {
//         setError("Failed to fetch products. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Fetch Categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await Axi.get("/api/category/get/all");
//         const cats = Array.isArray(response.data)
//           ? response.data
//           : response.data.data;
//         setCategories(cats);
//       } catch (err) {
//         setError("Failed to fetch Categories. Please try again.");
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handlePlaceBid = (productId: number) => {
//     router.push(`/product/${productId}`);
//   };

//   // Filter products by category name
//   const filteredProducts = selectedCategory
//     ? products.filter((product) => product.category?.name === selectedCategory)
//     : products;

//   // Timer logic
//   const calculateTimeLeft = (endTime: string) => {
//     const now = new Date();
//     const end = new Date(endTime);
//     const difference = end.getTime() - now.getTime();
//     return difference > 0 ? Math.floor(difference / 1000) : 0;
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-10 text-red-600 bg-red-50 rounded-lg mx-auto max-w-2xl">
//         {error}
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
//         {/* Sidebar */}
//         {/* Sidebar */}
//         <aside className="w-full md:w-1/4 space-y-6">
//           {/* Category Filter */}
//           <CategoryFilter
//             categories={categories}
//             selectedCategory={selectedCategory}
//             onCategoryChange={setSelectedCategory}
//           />

//           {/* Ending Soon Section */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-3 border-b pb-2">
//               Ending Soon
//             </h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-sm text-blue-600 hover:underline">
//                   Qualified Sellers
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-sm text-blue-600 hover:underline">
//                   Featured
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-sm text-blue-600 hover:underline">
//                   Advanced
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-sm text-blue-600 hover:underline">
//                   Search Electronics
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </aside>

//         {/* Main */}
//         <main className="w-full md:w-3/4">
//           {selectedCategory && (
//             <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//               <p className="text-blue-800 text-sm">
//                 Showing {filteredProducts.length} products in "
//                 {selectedCategory}" category
//               </p>
//             </div>
//           )}

//           {/* Products Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredProducts.map((product: any) => (
//               <div
//                 key={product.id}
//                 className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-100"
//               >
//                 <img
//                   src={product.imageUrl}
//                   alt={product.title}
//                   className="w-full h-40 object-contain mb-3 bg-gray-100 p-2 rounded"
//                   onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
//                 />
//                 <h3 className="text-md font-semibold mb-1">{product.title}</h3>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-gray-600">Quantity:</span>
//                   <span className="font-medium">{product.quantity || 14}</span>
//                 </div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-gray-600">Current Bid:</span>
//                   <span className="font-medium text-green-600">
//                     CAD ${product.basePrice.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm mb-2">
//                   <span className="text-gray-600">Per Unit:</span>
//                   <span className="font-medium">
//                     CAD{" "}
//                     {(product.basePrice / (product.quantity || 14)).toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center text-xs mb-3">
//                   <span
//                     className={`px-2 py-1 rounded ${
//                       product.status === "ONGOING"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {product.status}
//                   </span>
//                   {product.status === "ONGOING" && (
//                     <span className="text-gray-700">
//                       {formatTime(timeLeft[product.id] || 0)}
//                     </span>
//                   )}
//                 </div>
//                 {product.status === "ONGOING" && (
//                   <button
//                     onClick={() => handlePlaceBid(product.id)}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
//                   >
//                     Place Bid
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           {filteredProducts.length === 0 && !loading && (
//             <div className="bg-white p-8 rounded-lg shadow text-center">
//               <p className="text-gray-600">
//                 {selectedCategory
//                   ? `No products available in "${selectedCategory}" category.`
//                   : "No products available at the moment."}
//               </p>
//               {selectedCategory && (
//                 <button
//                   onClick={() => setSelectedCategory("")}
//                   className="mt-2 text-blue-600 hover:text-blue-800 underline"
//                 >
//                   Show all products
//                 </button>
//               )}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

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

// Helper function to format time
const formatTime = (seconds) => {
  if (seconds <= 0) return "Ended";
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
};

// ---------------- Category Filter ----------------
const CategoryFilter = ({ categories, onCategoryChange, selectedCategory }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeSelectedCategory = selectedCategory || "";
  const safeOnCategoryChange =
    typeof onCategoryChange === "function" ? onCategoryChange : () => {};

  // Filter categories by name
  const filteredCategories = safeCategories.filter((category) => {
    if (!category || typeof category.name !== "string") return false;
    return category.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleCategorySelect = (categoryName) => {
    const newCategory =
      safeSelectedCategory === categoryName ? "" : categoryName;
    safeOnCategoryChange(newCategory);
  };

  const clearFilter = () => {
    safeOnCategoryChange("");
    setSearchTerm("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b pb-2">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-black" />
          <h3 className="text-lg font-semibold text-black">Filter</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">Category</h4>
              {safeSelectedCategory && (
                <button
                  onClick={clearFilter}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Selected Category Display */}
            {safeSelectedCategory && (
              <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800">
                    Filtered by: {safeSelectedCategory}
                  </span>
                  <button
                    onClick={clearFilter}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Categories List */}
            <div className="max-h-64 overflow-y-auto">
              <ul className="space-y-1">
                {filteredCategories.length > 0 ? (
                  <>
                    <li>
                      <button
                        onClick={() => handleCategorySelect("")}
                        className={`block w-full text-left py-2 px-2 text-sm rounded transition-colors ${
                          safeSelectedCategory === ""
                            ? "bg-blue-100 text-blue-800 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                        }`}
                      >
                        All Categories
                      </button>
                    </li>

                    {filteredCategories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => handleCategorySelect(category.name)}
                          className={`block w-full text-left py-2 px-2 text-sm rounded transition-colors ${
                            safeSelectedCategory === category.name
                              ? "bg-blue-100 text-blue-800 font-medium"
                              : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                          }`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </>
                ) : (
                  <li className="py-2 text-sm text-gray-500 text-center">
                    {safeCategories.length === 0
                      ? "No categories available"
                      : "No categories found"}
                  </li>
                )}
              </ul>
            </div>

            {/* Category Count */}
            <div className="mt-2 pt-2 border-t text-xs text-gray-500">
              {filteredCategories.length > 0 && safeCategories.length > 0 && (
                <span>
                  Showing {filteredCategories.length} of {safeCategories.length}{" "}
                  categories
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------------- Product Page ----------------
export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({});

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axi.get("/api/products/get/all");
        setProducts(response.data);
        
        // Initialize timers for ongoing auctions
        const timers = {};
        response.data.forEach((product) => {
          if (product.status === "ONGOING" && product.auctionEnd) {
            timers[product.id] = calculateTimeLeft(product.auctionEnd);
          }
        });
        setTimeLeft(timers);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axi.get("/api/category/get/all");
        const cats = Array.isArray(response.data)
          ? response.data
          : response.data.data;
        setCategories(cats || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch Categories. Please try again.");
      }
    };
    fetchCategories();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = { ...prevTimeLeft };
        let hasChanges = false;

        Object.keys(newTimeLeft).forEach((productId) => {
          if (newTimeLeft[productId] > 0) {
            newTimeLeft[productId] -= 1;
            hasChanges = true;
          }
        });

        return hasChanges ? newTimeLeft : prevTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePlaceBid = (productId) => {
    router.push(`/product/${productId}`);
  };

  // Filter products by category name
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryName === selectedCategory)
    : products;

  // Timer logic
  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end.getTime() - now.getTime();
    return difference > 0 ? Math.floor(difference / 1000) : 0;
  };

  // Image error handler
  const handleImageError = (e) => {
    e.currentTarget.src = "/placeholder.jpg";
    e.currentTarget.onerror = null; // Prevent infinite loop
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-600 bg-red-50 rounded-lg mx-auto max-w-2xl">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 space-y-6">
          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Ending Soon Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">
              Ending Soon
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Qualified Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Featured
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Advanced
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Search Electronics
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main */}
        <main className="w-full md:w-3/4">
          {selectedCategory && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                Showing {filteredProducts.length} products in "
                {selectedCategory}" category
              </p>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-100"
              >
                {/* Product Image with better error handling */}
                <div className="w-full h-40 mb-3 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title || 'Product image'}
                      className="w-full h-full object-contain"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span className="text-sm">No image available</span>
                    </div>
                  )}
                </div>

                <h3 className="text-md font-semibold mb-1 line-clamp-2">
                  {product.title}
                </h3>
                
                {/* Category Display */}
                {product.categoryName && (
                  <div className="mb-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {product.categoryName}
                    </span>
                  </div>
                )}
                
               {/* <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{product.quantity || "N/A"}</span>
                </div> */}
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Current Bid:</span>
                  <span className="font-medium text-green-600">
                    CAD ${product.basePrice?.toFixed(2) || "0.00"}
                  </span>
                </div>
                {product.quantity && (
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Per Unit:</span>
                    <span className="font-medium">
                      CAD {(product.basePrice / product.quantity).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs mb-3">
                  <span
                    className={`px-2 py-1 rounded ${
                      product.status === "ONGOING"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                  {product.status === "ONGOING" && (
                    <span className="text-gray-700">
                      {formatTime(timeLeft[product.id] || 0)}
                    </span>
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

          {filteredProducts.length === 0 && !loading && (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600">
                {selectedCategory
                  ? `No products available in "${selectedCategory}" category.`
                  : "No products available at the moment."}
              </p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory("")}
                  className="mt-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Show all products
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}