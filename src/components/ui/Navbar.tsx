'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { UserCircleIcon, ShoppingCartIcon, BellIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Replace with actual logout function
  const handleLogout = () => {
    // Clear auth token
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg dark:bg-gray-800' : 'bg-white/90 backdrop-blur-sm dark:bg-gray-800/90'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-400 bg-clip-text text-transparent">
              Walbas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/products" 
              className={`px-3 py-2 font-medium transition-colors ${pathname === '/products' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'}`}
            >
              Products
            </Link>
            {/* <Link 
              href="/categories" 
              className={`px-3 py-2 font-medium transition-colors ${pathname === '/categories' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'}`}
            >
              Categories
            </Link> */}
            <Link 
              href="/about" 
              className={`px-3 py-2 font-medium transition-colors ${pathname === '/about' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'}`}
            >
              About
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 relative">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <button className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 relative">
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 dark:bg-gray-700">
                      <Link 
                        href="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        Dashboard
                      </Link>
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        My Profile
                      </Link>
                      <Link 
                        href="/my-bids" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        My Bids
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login" 
                  className={`px-4 py-2 font-medium transition-colors ${pathname === '/login' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'}`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-3">
            <Link 
              href="/products" 
              className={`block px-3 py-2 rounded-lg transition-colors ${pathname === '/products' ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Auctions
            </Link>
            <Link 
              href="/categories" 
              className={`block px-3 py-2 rounded-lg transition-colors ${pathname === '/categories' ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className={`block px-3 py-2 rounded-lg transition-colors ${pathname === '/about' ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              About
            </Link>

            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`block px-3 py-2 rounded-lg transition-colors ${pathname === '/dashboard' ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/my-bids" 
                  className={`block px-3 py-2 rounded-lg transition-colors ${pathname === '/my-bids' ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  My Bids
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`block px-3 py-2 rounded-lg transition-colors ${pathname === '/login' ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="block px-3 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}