// src/components/product/Filters.tsx
'use client';

import { useState } from 'react';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';

export default function Filters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [categories, setCategories] = useState<string[]>([]);

  const availableCategories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Collectibles',
    'Art & Antiques',
    'Jewelry',
    'Sports',
    'Toys'
  ];

  const toggleCategory = (category: string) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setCategories([]);
  };

  return (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        <button 
          onClick={resetFilters}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Reset all
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 dark:text-white">Price Range</h3>
        <div className="px-2">
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={handlePriceChange}
            minStepsBetweenThumbs={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 dark:text-white">Categories</h3>
        <div className="space-y-2">
          {availableCategories.map(category => (
            <label key={category} className="flex items-center space-x-3 py-1.5 cursor-pointer">
              <Checkbox
                checked={categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                id={`category-${category}`}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 dark:text-white">Auction Status</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 py-1.5 cursor-pointer">
            <Checkbox id="status-active" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Active Auctions</span>
          </label>
          <label className="flex items-center space-x-3 py-1.5 cursor-pointer">
            <Checkbox id="status-upcoming" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Upcoming Auctions</span>
          </label>
          <label className="flex items-center space-x-3 py-1.5 cursor-pointer">
            <Checkbox id="status-ended" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Ended Auctions</span>
          </label>
        </div>
      </div>

      {/* Condition Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 dark:text-white">Item Condition</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 py-1.5 cursor-pointer">
            <Checkbox id="condition-new" />
            <span className="text-sm text-gray-700 dark:text-gray-300">New</span>
          </label>
          <label className="flex items-center space-x-3 py-1.5 cursor-pointer">
            <Checkbox id="condition-used" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Used</span>
          </label>
          <label className="flex items-center space-x-3 py-1.5 cursor-pointer">
            <Checkbox id="condition-refurbished" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Refurbished</span>
          </label>
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition text-sm font-medium">
          Apply Filters
        </button>
        <button 
          onClick={resetFilters}
          className="flex-1 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );
}