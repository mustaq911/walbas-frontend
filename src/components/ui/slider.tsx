// src/components/ui/slider.tsx
'use client';

import * as React from 'react';

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  className?: string;
}

export function Slider({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  minStepsBetweenThumbs = 0,
  className = '',
}: SliderProps) {
  const range = max - min;
  const leftThumbPos = ((value[0] - min) / range) * 100;
  const rightThumbPos = ((value[1] - min) / range) * 100;

  const handleLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(e.target.value), value[1] - minStepsBetweenThumbs * step);
    onValueChange([newValue, value[1]]);
  };

  const handleRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(Number(e.target.value), value[0] + minStepsBetweenThumbs * step);
    onValueChange([value[0], newValue]);
  };

  return (
    <div className={`relative h-2 ${className}`}>
      {/* Track */}
      <div className="absolute h-1 w-full rounded-full bg-gray-200 dark:bg-gray-600"></div>
      
      {/* Active range */}
      <div 
        className="absolute h-1 rounded-full bg-indigo-600"
        style={{
          left: `${leftThumbPos}%`,
          width: `${rightThumbPos - leftThumbPos}%`,
        }}
      ></div>
      
      {/* Thumb for min value */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleLeftChange}
        className="absolute w-full h-2 appearance-none pointer-events-none opacity-0 z-20"
      />
      <div 
        className="absolute h-4 w-4 rounded-full bg-indigo-600 shadow-md border-2 border-white dark:border-gray-200 transform -translate-y-1/2 top-1/2 z-10 cursor-pointer"
        style={{ left: `${leftThumbPos}%` }}
      ></div>
      
      {/* Thumb for max value */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={handleRightChange}
        className="absolute w-full h-2 appearance-none pointer-events-none opacity-0 z-20"
      />
      <div 
        className="absolute h-4 w-4 rounded-full bg-indigo-600 shadow-md border-2 border-white dark:border-gray-200 transform -translate-y-1/2 top-1/2 z-10 cursor-pointer"
        style={{ left: `${rightThumbPos}%` }}
      ></div>
    </div>
  );
}