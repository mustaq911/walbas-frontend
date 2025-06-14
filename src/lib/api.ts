// src/lib/api.ts

// Type Definitions
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currentBid?: number;
  imageUrl: string;
  endTime: string; // ISO string format
  status: 'active' | 'sold' | 'expired';
  sellerId?: string;
  condition?: string;
  category?: string;
}

interface Bid {
  id: string;
  amount: number;
  bidder?: string;
  product: {
    id: string;
    title: string;
    imageUrl: string;
    endTime: string;
    currentBid?: number;
  };
  createdAt: string;
}

interface WonAuction {
  id: string;
  title: string;
  imageUrl: string;
  finalPrice: number;
  wonAt: string;
  status: 'paid' | 'shipped' | 'delivered';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'seller';
  createdAt: string;
  avatar?: string;
}

// Mock Data
const mockProducts: Product[] = [
  {
    id: 'p1',
    title: 'Antique Watch',
    description: 'Vintage wristwatch from the 1920s in excellent condition',
    price: 100,
    currentBid: 120,
    imageUrl: '/images/watch.jpg',
    endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    status: 'active',
    sellerId: 'u2',
    condition: 'Excellent',
    category: 'Collectibles'
  },
  {
    id: 'p2',
    title: 'Vintage Camera',
    description: 'Classic film camera from the 1970s, fully functional',
    price: 150,
    imageUrl: '/images/camera.jpg',
    endTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: 'expired',
    sellerId: 'u3',
    condition: 'Good',
    category: 'Electronics'
  },
  {
    id: 'p3',
    title: 'Signed Baseball',
    description: 'Baseball signed by legendary player, comes with certificate',
    price: 200,
    currentBid: 250,
    imageUrl: '/images/baseball.jpg',
    endTime: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
    status: 'active',
    sellerId: 'u4',
    condition: 'Mint',
    category: 'Sports'
  }
];

const mockBids: Bid[] = [
  {
    id: '1',
    amount: 120,
    bidder: 'user123',
    product: {
      id: 'p1',
      title: 'Antique Watch',
      imageUrl: '/images/watch.jpg',
      endTime: new Date(Date.now() + 3600000).toISOString(),
      currentBid: 120
    },
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: '2',
    amount: 110,
    bidder: 'user456',
    product: {
      id: 'p1',
      title: 'Antique Watch',
      imageUrl: '/images/watch.jpg',
      endTime: new Date(Date.now() + 3600000).toISOString(),
      currentBid: 120
    },
    createdAt: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: '3',
    amount: 250,
    bidder: 'user789',
    product: {
      id: 'p3',
      title: 'Signed Baseball',
      imageUrl: '/images/baseball.jpg',
      endTime: new Date(Date.now() + 86400000).toISOString(),
      currentBid: 250
    },
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

const mockWonAuctions: WonAuction[] = [
  {
    id: '101',
    title: 'Antique Watch',
    imageUrl: '/images/watch.jpg',
    finalPrice: 150,
    wonAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'shipped'
  },
  {
    id: '102',
    title: 'Rare Painting',
    imageUrl: '/images/painting.jpg',
    finalPrice: 500,
    wonAt: new Date(Date.now() - 172800000).toISOString(),
    status: 'delivered'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
    avatar: '/admin-avatar.jpg'
  },
  {
    id: '2',
    name: 'Seller One',
    email: 'seller1@example.com',
    role: 'seller',
    createdAt: new Date().toISOString(),
    avatar: '/seller1-avatar.jpg'
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
    avatar: '/user-avatar.jpg'
  }
];

// Product API Functions
export const getProducts = async (): Promise<Product[]> => {
  return mockProducts;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return mockProducts.filter(p => p.status === 'active').slice(0, 3);
};

export const getProduct = async (id: string): Promise<Product | undefined> => {
  return mockProducts.find(product => product.id === id);
};

export const getProductsBySeller = async (sellerId: string): Promise<Product[]> => {
  return mockProducts.filter(product => product.sellerId === sellerId);
};

// Bid API Functions
export const getBidsForProduct = async (productId: string): Promise<Bid[]> => {
  return mockBids
    .filter(bid => bid.product.id === productId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getActiveBids = async (): Promise<Bid[]> => {
  return mockBids.filter(bid => 
    new Date(bid.product.endTime) > new Date()
  );
};

export const getUserBids = async (userId: string): Promise<Bid[]> => {
  return mockBids.filter(bid => bid.bidder === userId);
};

export const placeBid = async (productId: string, amount: number, bidder?: string): Promise<Bid> => {
  const product = mockProducts.find(p => p.id === productId);
  if (!product) throw new Error('Product not found');
  
  if (product.currentBid && amount <= product.currentBid) {
    throw new Error('Bid amount must be higher than current bid');
  }

  const newBid: Bid = {
    id: Math.random().toString(36).substring(7),
    amount,
    bidder,
    product,
    createdAt: new Date().toISOString(),
  };
  
  mockBids.push(newBid);
  product.currentBid = amount;
  
  return newBid;
};

// Auction API Functions
export const getWonAuctions = async (userId?: string): Promise<WonAuction[]> => {
  return userId 
    ? mockWonAuctions.filter(auction => auction.id.includes(userId))
    : mockWonAuctions;
};

// User API Functions
export const getUsers = async (): Promise<User[]> => {
  return mockUsers;
};

export const getUser = async (id: string): Promise<User | undefined> => {
  return mockUsers.find(user => user.id === id);
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const newUser: User = {
    id: Math.random().toString(36).substring(7),
    ...userData,
    createdAt: new Date().toISOString()
  };
  mockUsers.push(newUser);
  return newUser;
};

// Admin API Functions
export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  const newProduct: Product = {
    id: Math.random().toString(36).substring(7),
    ...productData,
    status: 'active'
  };
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Product not found');
  
  mockProducts[index] = { ...mockProducts[index], ...productData };
  return mockProducts[index];
};

export const deleteProduct = async (id: string): Promise<void> => {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProducts.splice(index, 1);
  }
};

// Utility Functions
export const getCategories = async (): Promise<string[]> => {
  const categories = new Set<string>();
  mockProducts.forEach(product => {
    if (product.category) categories.add(product.category);
  });
  return Array.from(categories);
};