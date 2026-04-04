'use client';

import { useState, useEffect } from 'react';

export function useRealTimeCountdown(endDateString: string) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    const endDate = new Date(endDateString).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance <= 0) {
        setIsExpired(true);
        setTimeLeft('0 Days 00:00:00');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');

      setTimeLeft(`${days} Days ${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endDateString]);

  return { timeLeft, isExpired };
}
