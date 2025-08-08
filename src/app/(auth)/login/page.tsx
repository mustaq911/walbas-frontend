"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

const AxiNoAuth = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.length < 1) {
      setError("Username must be at least 1 character");
      toast.error("Username must be at least 1 character", {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
      });
      return;
    }

    if (password.length < 1) {
      setError("Password must be at least 1 character");
      toast.error("Password must be at least 1 character", {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await AxiNoAuth.post(
        `/api/user/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&role=CUSTOMER`,
        {},
        {
          timeout: 5000,
        }
      );

      if (response.status === 200) {
        console.log("Login response data:", response.data); // Debug response structure
        const user = response.data;

        // Validate response data
        if (!user || !user.userId || !user.token) {
          throw new Error("Invalid response: Missing userId or token");
        }

        const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
        const cookieOptions = {
          path: "/",
          expires: maxAge / (24 * 60 * 60),
          sameSite: "lax" as const,
          secure: process.env.NODE_ENV === "production" && process.env.HTTPS_ENABLED === "true" ? true : false,
        };

        Cookies.set("token", user.token, cookieOptions);
        Cookies.set("username", user.username || username, cookieOptions);
        Cookies.set("id", user.userId.toString(), cookieOptions);
        console.log("Cookies set:", {
          token: Cookies.get("token"),
          username: Cookies.get("username"),
          id: Cookies.get("id"),
        });

        toast.success(`Welcome back, ${user.username || "User"}!`, {
          position: "top-right",
          autoClose: 3000,
          className: "bg-green-50 text-green-800 font-semibold dark:bg-green-900 dark:text-green-200",
        });

        setTimeout(() => {
          router.push("/products");
        }, 1000);
      } else {
        setError(response.data.message || "Invalid username or password");
        toast.error(response.data.message || "Invalid username or password", {
          position: "top-right",
          autoClose: 3000,
          className: "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
        });
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "An error occurred during login";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
      });
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    // try {
    //   window.location.href = "/api/auth/google";
    // } catch (err) {
    //   toast.error("Google login failed", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     className: "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
    //   });
    //   console.error("Google login error:", err);
    // } finally {
    //   setIsGoogleLoading(false);
    // }
  };

  const handleFacebookLogin = async () => {
    setIsFacebookLoading(true);
    // try {
    //   window.location.href = "/api/auth/facebook";
    // } catch (err) {
    //   toast.error("Facebook login failed", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     className: "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
    //   });
    //   console.error("Facebook login error:", err);
    // } finally {
    //   setIsFacebookLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-indigo-100 mt-1">Login to your Walbas account</p>
        </div>

        <div className="p-6">
          {error && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 text-red-700 rounded-lg dark:bg-red-900 dark:text-red-200">
              <ExclamationCircleIcon className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                  required
                  minLength={1}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Forgot password?
                </Link>
              </div>
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
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline"
            >
              Sign up
            </Link>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className={`w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 ${
                  isGoogleLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isGoogleLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-gray-400"
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
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={isFacebookLoading}
                className={`w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 ${
                  isFacebookLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isFacebookLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-gray-400"
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
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Facebook</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}