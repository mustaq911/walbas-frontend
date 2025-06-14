import Link from 'next/link';

interface ProductsTableProps {
  products: {
    id: string;
    title: string;
    price: number;
    status: 'active' | 'sold' | 'expired';
    endTime: string;
  }[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/product/${product.id}`} className="text-blue-600 hover:underline">
                  {product.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' :
                  product.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(product.endTime).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link 
                  href={`/admin/products/edit/${product.id}`}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}