import { Product } from './type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  console.error('NEXT_PUBLIC_API_BASE_URL is not defined in .env file');
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export async function getProducts(): Promise<Product[]> {
  try {
    console.log(`Fetching products from: ${API_BASE_URL}/products/get/all`);
    const response = await fetch(`${API_BASE_URL}/products/get/all`, {
      cache: 'no-store', // Ensure fresh data for debugging
    });
    if (!response.ok) {
      console.error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched products:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    console.log(`Fetching product with ID ${id} from: ${API_BASE_URL}/products/${id}`);
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'no-store', // Ensure fresh data for debugging
    });
    if (!response.ok) {
      console.warn(`Product with ID ${id} not found: ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    console.log(`Fetched product with ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}