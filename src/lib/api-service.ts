import { ApiProduct, Product } from '@/lib/type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000');

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

async function fetchWithTimeout<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
}


function transformProduct(apiProduct: ApiProduct): Product {
  const now = new Date();
  const auctionEnd = new Date(apiProduct.auctionEnd);
  const status = auctionEnd < now ? 'expired' : 'active';
  
  return {
    ...apiProduct,
    status,
    imageUrl: apiProduct.imageUrl || '/placeholder.jpg'
  };
}


export const getProducts = async (): Promise<Product[]> => {
  const response = await fetchWithTimeout<ApiProduct[]>('/api/products');
  return response.map(transformProduct);
};

export const getProduct = async (id: number): Promise<Product | undefined> => {
  try {
    const product = await fetchWithTimeout<ApiProduct>(`/api/products/${id}`);
    return transformProduct(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
};