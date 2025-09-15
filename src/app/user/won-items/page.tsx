// // 'use client';

// // import { useState, useEffect } from 'react';
// // import Image from 'next/image';
// // import axios from 'axios';
// // import Cookies from "js-cookie";

// // const Axi = axios.create({
// //   baseURL: "",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // Axi.interceptors.request.use(
// //   (config) => {
// //     const token = Cookies.get("token");
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );


// // const OngoingAuctions = () => {
// //   const [auctions, setAuctions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Fetch auctions data from API
// //   useEffect(() => {
// //     const fetchAuctions = async () => {
// //       try {
// //         const response = await Axi.get("/api/products/get/allAuctionDetails");
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch auctions');
// //         }
// //         const data = await response.json();
// //         setAuctions(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAuctions();
// //   }, []);

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-GB', {
// //       day: '2-digit',
// //       month: '2-digit',
// //       year: 'numeric'
// //     });
// //   };

// //   const formatTime = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleTimeString('en-GB', {
// //       hour: '2-digit',
// //       minute: '2-digit',
// //       second: '2-digit',
// //       hour12: false
// //     });
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status.toLowerCase()) {
// //       case 'ongoing':
// //         return 'bg-green-100 text-green-800';
// //       case 'completed':
// //         return 'bg-gray-100 text-gray-800';
// //       case 'pending':
// //         return 'bg-yellow-100 text-yellow-800';
// //       default:
// //         return 'bg-blue-100 text-blue-800';
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-xl font-semibold text-gray-600">Loading auctions...</div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-xl font-semibold text-red-600">Error: {error}</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-6">
// //           <h1 className="text-3xl font-bold text-gray-900">Ongoing Auctions</h1>
// //           <div className="flex items-center space-x-2">
// //             <span className="text-gray-600">👤 Welcome, asdf</span>
// //           </div>
// //         </div>

// //         {/* Auctions Grid */}
// //         <div className="space-y-6">
// //           {auctions.map((auction) => (
// //             <div key={auction.id} className="bg-white rounded-lg shadow-md border border-gray-200">
// //               {/* Auction Header */}
// //               <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
// //                 <h2 className="text-xl font-semibold text-gray-800">
// //                   {auction.productName} - {auction.id}
// //                 </h2>
// //               </div>

// //               <div className="p-4">
// //                 <div className="flex flex-col lg:flex-row gap-6">
// //                   {/* Product Image */}
// //                   <div className="flex-shrink-0">
// //                     <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
// //                       {auction.imageUrl ? (
// //                         <Image
// //                           src={auction.imageUrl}
// //                           alt={auction.productName}
// //                           width={128}
// //                           height={128}
// //                           className="w-full h-full object-cover"
// //                         />
// //                       ) : (
// //                         <div className="w-full h-full flex items-center justify-center text-gray-400">
// //                           No Image
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Auction Details */}
// //                   <div className="flex-1">
// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                           Base Price:
// //                         </label>
// //                         <div className="text-lg font-semibold text-gray-900">
// //                           ${auction.basePrice}
// //                         </div>
// //                       </div>

// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                           Auction Start:
// //                         </label>
// //                         <div className="text-sm text-gray-900">
// //                           <div>{formatDate(auction.startDate)}</div>
// //                           <div>{formatTime(auction.startDate)}</div>
// //                         </div>
// //                       </div>

// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                           Auction End:
// //                         </label>
// //                         <div className="text-sm text-gray-900">
// //                           <div>{formatDate(auction.endDate)}</div>
// //                           <div>{formatTime(auction.endDate)}</div>
// //                         </div>
// //                       </div>

// //                       <div className="flex flex-col items-start space-y-2">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Status:
// //                           </label>
// //                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(auction.status)}`}>
// //                             {auction.status.toUpperCase()}
// //                           </span>
// //                         </div>
// //                         <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
// //                           Bid Now
// //                         </button>
// //                       </div>
// //                     </div>

// //                     {/* Bids Table */}
// //                     {auction.bids && auction.bids.length > 0 && (
// //                       <div className="border border-gray-300 rounded-lg overflow-hidden">
// //                         <table className="min-w-full divide-y divide-gray-200">
// //                           <thead className="bg-gray-50">
// //                             <tr>
// //                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                 Bid Amount
// //                               </th>
// //                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                 User ID
// //                               </th>
// //                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                 User Name
// //                               </th>
// //                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                 Bid Time
// //                               </th>
// //                             </tr>
// //                           </thead>
// //                           <tbody className="bg-white divide-y divide-gray-200">
// //                             {auction.bids.map((bid, index) => (
// //                               <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// //                                 <td className="px-4 py-2 text-sm font-medium text-gray-900">
// //                                   ${bid.amount}
// //                                 </td>
// //                                 <td className="px-4 py-2 text-sm text-gray-900">
// //                                   {bid.userId}
// //                                 </td>
// //                                 <td className="px-4 py-2 text-sm text-gray-900">
// //                                   {bid.userName}
// //                                 </td>
// //                                 <td className="px-4 py-2 text-sm text-gray-900">
// //                                   {formatDate(bid.bidTime)}, {formatTime(bid.bidTime)}
// //                                 </td>
// //                               </tr>
// //                             ))}
// //                           </tbody>
// //                         </table>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {auctions.length === 0 && (
// //           <div className="text-center py-12">
// //             <div className="text-gray-500 text-xl">No ongoing auctions found</div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default OngoingAuctions;

// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import axios from 'axios';
// import Cookies from "js-cookie";

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

// const OngoingAuctions = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch auctions data from API
//   useEffect(() => {
//     const fetchAuctions = async () => {
//       try {
//         const response = await Axi.get("/api/products/get/allAuctionDetails");
//         // With axios, response.data contains the parsed JSON data
//         // No need to check response.ok or call response.json()
//         setAuctions(response.data);
//       } catch (err) {
//         // Axios provides better error information
//         setError(err.response?.data?.message || err.message || 'Failed to fetch auctions');
//         console.error('Error fetching auctions:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAuctions();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-GB', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: false
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'ongoing':
//         return 'bg-green-100 text-green-800';
//       case 'completed':
//         return 'bg-gray-100 text-gray-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-blue-100 text-blue-800';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-xl font-semibold text-gray-600">Loading auctions...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-xl font-semibold text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">Ongoing Auctions</h1>
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-600">👤 Welcome, asdf</span>
//           </div>
//         </div>

//         {/* Auctions Grid */}
//         <div className="space-y-6">
//           {auctions.map((auction) => (
//             <div key={auction.id} className="bg-white rounded-lg shadow-md border border-gray-200">
//               {/* Auction Header */}
//               <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {auction.productName} - {auction.id}
//                 </h2>
//               </div>

//               <div className="p-4">
//                 <div className="flex flex-col lg:flex-row gap-6">
//                   {/* Product Image */}
//                   <div className="flex-shrink-0">
//                     <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
//                       {auction.imageUrl ? (
//                         <Image
//                           src={auction.imageUrl}
//                           alt={auction.productName}
//                           width={128}
//                           height={128}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-gray-400">
//                           No Image
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Auction Details */}
//                   <div className="flex-1">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Base Price:
//                         </label>
//                         <div className="text-lg font-semibold text-gray-900">
//                           ${auction.basePrice}
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Auction Start:
//                         </label>
//                         <div className="text-sm text-gray-900">
//                           <div>{formatDate(auction.startDate)}</div>
//                           <div>{formatTime(auction.startDate)}</div>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Auction End:
//                         </label>
//                         <div className="text-sm text-gray-900">
//                           <div>{formatDate(auction.endDate)}</div>
//                           <div>{formatTime(auction.endDate)}</div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start space-y-2">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Status:
//                           </label>
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(auction.status)}`}>
//                             {auction.status.toUpperCase()}
//                           </span>
//                         </div>
//                         <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
//                           Bid Now
//                         </button>
//                       </div>
//                     </div>

//                     {/* Bids Table */}
//                     {auction.bids && auction.bids.length > 0 && (
//                       <div className="border border-gray-300 rounded-lg overflow-hidden">
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead className="bg-gray-50">
//                             <tr>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Bid Amount
//                               </th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 User ID
//                               </th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 User Name
//                               </th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Bid Time
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {auction.bids.map((bid, index) => (
//                               <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                 <td className="px-4 py-2 text-sm font-medium text-gray-900">
//                                   ${bid.amount}
//                                 </td>
//                                 <td className="px-4 py-2 text-sm text-gray-900">
//                                   {bid.userId}
//                                 </td>
//                                 <td className="px-4 py-2 text-sm text-gray-900">
//                                   {bid.userName}
//                                 </td>
//                                 <td className="px-4 py-2 text-sm text-gray-900">
//                                   {formatDate(bid.bidTime)}, {formatTime(bid.bidTime)}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {auctions.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-gray-500 text-xl">No ongoing auctions found</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OngoingAuctions;

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
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

const OngoingAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch auctions data from API
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await Axi.get("/api/products/get/allAuctionDetails");
        setAuctions(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch auctions');
        console.error('Error fetching auctions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status.toLowerCase()) {
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading auctions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Ongoing Auctions</h1>
          <div className="flex items-center space-x-2">
            {/* <span className="text-gray-600">👤 Welcome, asdf</span> */}
          </div>
        </div>

        {/* Auctions Grid */}
        <div className="space-y-6">
          {auctions.map((auction) => (
            <div key={auction.product?.id || auction.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              {/* Auction Header */}
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  {auction.product?.title || auction.title || 'Product'} - ID: {auction.product?.id || auction.id}
                </h2>
              </div>

              <div className="p-4">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
                      {auction.product?.imageUrl || auction.imageUrl ? (
                        <Image
                          src={auction.product?.imageUrl || auction.imageUrl}
                          alt={auction.product?.title || auction.title || 'Product'}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Auction Details */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Base Price:
                        </label>
                        <div className="text-lg font-semibold text-gray-900">
                          ${auction.product?.basePrice || auction.basePrice || 'N/A'}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Auction Start:
                        </label>
                        <div className="text-sm text-gray-900">
                          <div>{formatDate(auction.product?.auctionStart || auction.auctionStart)}</div>
                          <div>{formatTime(auction.product?.auctionStart || auction.auctionStart)}</div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Auction End:
                        </label>
                        <div className="text-sm text-gray-900">
                          <div>{formatDate(auction.product?.auctionEnd || auction.auctionEnd)}</div>
                          <div>{formatTime(auction.product?.auctionEnd || auction.auctionEnd)}</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start space-y-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status:
                          </label>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(auction.product?.status || auction.status)}`}>
                            {(auction.product?.status || auction.status || 'UNKNOWN').toUpperCase()}
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                          Bid Now
                        </button>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description:
                        </label>
                        <div className="text-sm text-gray-900">
                          {auction.product?.description || auction.description || 'No description available'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Highest Bid:
                        </label>
                        <div className="text-sm text-gray-900">
                          ${auction.product?.highestBid || auction.highestBid || '0'}
                        </div>
                      </div>
                    </div>

                    {/* Bids Table */}
                    {auction.bids && auction.bids.length > 0 && (
                      <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bid Amount
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User ID
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User Name
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bid Time
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {auction.bids.map((bid, index) => (
                              <tr key={bid.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                  ${bid.bidAmount || bid.amount}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {bid.userId}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {bid.username || bid.userName || 'Unknown'}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {formatDate(bid.bidTime)}, {formatTime(bid.bidTime)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {auctions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl">No ongoing auctions found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OngoingAuctions;