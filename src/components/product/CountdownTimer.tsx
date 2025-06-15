"use client";

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endTime: Date | string;
  compact?: boolean;
}

export default function CountdownTimer({ endTime, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date(endTime);
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [endTime]);

  if (compact) {
    return (
      <span className="font-medium">
        {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
        {timeLeft.hours}h {timeLeft.minutes}m
      </span>
    );
  }

  return (
    <div className="flex gap-1 text-sm font-medium">
      {timeLeft.days > 0 && (
        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {timeLeft.days}d
        </span>
      )}
      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
        {timeLeft.hours}h
      </span>
      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
        {timeLeft.minutes}m
      </span>
      {!compact && (
        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {timeLeft.seconds}s
        </span>
      )}
    </div>
  );
}