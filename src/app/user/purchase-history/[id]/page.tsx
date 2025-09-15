/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";

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

interface Invoice {
  id: number;
  invoiceNumber: string | null;
  amount: number;
  invoiceDate: string;
  dueDate: string;
  productId: number;
  status: string;
  userId: number;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { id } = useParams();

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      // const res = await fetch(`api/invoice/user/${id}`);
      const response = await Axi.get(`api/invoice/user/${id}`);

      // if (!res.ok) throw new Error("Failed to fetch invoices");
      // const data = await res.json();
      setInvoices(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [id]);

  const filtered = invoices.filter(
    (inv) =>
      inv.id.toString().includes(search) ||
      (inv.productId && inv.productId.toString().includes(search))
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📄 My Invoices</h1>
          {/* <span className="text-gray-600">Welcome, asdf</span> */}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by invoice # or prod"
            className="border border-gray-300 rounded-lg px-3 py-2 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchInvoices}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
          <span className="ml-auto text-gray-500">
            Total: {filtered.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Invoice #</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Invoice Date</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Product ID</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{inv.id}</td>
                    <td className="px-4 py-2">
                      {inv.invoiceNumber ?? `#${inv.id}`}
                    </td>
                    <td className="px-4 py-2">${inv.amount.toFixed(2)}</td>
                    <td className="px-4 py-2">{inv.invoiceDate}</td>
                    <td className="px-4 py-2">{inv.dueDate}</td>
                    <td className="px-4 py-2">{inv.productId}</td>
                    <td className="px-4 py-2 text-green-600 font-semibold">
                      {inv.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
