// src/lib/api-service.ts
import { ApiProduct, Product } from '@/lib/type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000');

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

async function fetchWithTimeout<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Remove leading slash if present to avoid double slashes
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const url = `${API_BASE_URL}/${normalizedEndpoint}`;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    clearTimeout(id);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    clearTimeout(id);
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

function transformProduct(apiProduct: ApiProduct): Product {
  const now = new Date();
  const auctionEnd = new Date(apiProduct.auctionEnd);
  const status = auctionEnd < now ? 'expired' : 'active';
  
  return {
    ...apiProduct,
    status,
    imageUrl: apiProduct.imageUrl || '/placeholder.jpg',
    basePrice: apiProduct.basePrice || 0,
    auctionStart: apiProduct.auctionStart || new Date().toISOString(),
    auctionEnd: apiProduct.auctionEnd || new Date(Date.now() + 86400000).toISOString(), // Default to 1 day from now
    description: apiProduct.description || 'No description available'
  };
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetchWithTimeout<ApiProduct[]>('api/products');
    return response.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const product = await fetchWithTimeout<ApiProduct>(`api/products/${id}`);
    return transformProduct(product);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};