// src/components/product/CountdownTimer.tsx
"use client";

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endTime: Date | string;
  compact?: boolean;
}

export default function CountdownTimer({ endTime, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endTime);
      const now = new Date();
      const difference = end.getTime() - now.getTime();

      if (difference <= 0) {
        return compact ? 'Ended' : 'Auction ended';
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      if (compact) {
        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m ${seconds}s`;
      } else {
        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        return `${hours}h ${minutes}m ${seconds}s`;
      }
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, compact]);

  return (
    <span className={`font-medium ${compact ? 'text-sm' : 'text-base'} ${
      timeLeft.includes('Ended') ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'
    }`}>
      {timeLeft}
    </span>
  );
}