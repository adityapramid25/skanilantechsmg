import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownResult extends TimeLeft {
  isExpired: boolean;
}

export function useCountdown(endTime: string | null): CountdownResult {
  const [currentTime, setCurrentTime] = useState<number>(() => new Date().getTime());

  useEffect(() => {
    if (!endTime) return;
    
    // Update current time once immediately to ensure it catches up
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentTime(new Date().getTime());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (!endTime) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const difference = new Date(endTime).getTime() - currentTime;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}
