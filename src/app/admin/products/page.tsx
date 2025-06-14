import { getProducts } from '@/lib/api';
import ProductsTable from '@/components/admin/ProductsTable';
import Link from 'next/link';

export default async function AdminProductsPage() {
  const products = await getProducts(); // Now properly imported

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>
      
      <ProductsTable products={products} />
    </div>
  );
}