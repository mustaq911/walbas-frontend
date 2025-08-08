"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

const AxiNoAuth = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await AxiNoAuth.post(
        `api/user/register?username=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}&role=CUSTOMER`,
        {},
        {
          timeout: 5000,
        }
      );

      if (response.status === 200) {
        const user = response.data;
        const maxAge = 30 * 24 * 60 * 60;
        const cookieOptions = {
          path: "/",
          expires: maxAge / (24 * 60 * 60),
          sameSite: "lax" as const,
          secure: process.env.NODE_ENV === "production" && process.env.HTTPS_ENABLED === "true" ? true : false,
        };
        Cookies.set("token", user.id.toString(), cookieOptions);
        Cookies.set("username", user.username, cookieOptions);
        Cookies.set("id", user.id.toString(), cookieOptions);
        Cookies.set("email", user.email || "", cookieOptions);
        console.log("Cookies set:", {
          token: Cookies.get("token"),
          username: Cookies.get("username"),
          id: Cookies.get("id"),
          email: Cookies.get("email"),
        });

        toast.success("Successfully user created!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred during registration");
      toast.error(error.response?.data?.message || "An error occurred during registration", {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Join Walbas</h1>
          <p className="text-indigo-100 mt-1">Create your auction account</p>
        </div>

        <div className="p-6">
          {error && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              <ExclamationCircleIcon className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
                minLength={4}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
                minLength={4}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition flex items-center justify-center ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}